const { verifyToken } = require("../helpers/jwt");
const {
  sc_tr_answers,
  sequelize,
  sc_qs_question_items,
  sc_qs_options,
  sc_qs_optionitems,
  sc_tr_answeritems,
  sc_qs_questions,
  sc_qs_variables
} = require("../models");
const { Op, Model } = require("sequelize");
const { getOption, getOptionItems, getOptionItemNlgs } = require("./option");
const sc_qs_optionitemimage = require("../models/sc_qs_optionitemimage");
// const sc_qs_variables = require("../models/sc_qs_variables");
// const sc_qs_options = require("../models/sc_qs_options");

class Survey {
    static async getAnswerItem(payload) {
        try {
            const answer = await sc_tr_answers.findOne({where: {
                szQuestionId: payload.szQuestionId,
                szNetworkId: payload.szNetworkId,
                szTerritoryId: payload.szTerritoryId,
                szEmailRespondent: payload.szEmailRespondent
            }})
            return answer
        } catch (err) {
            console.info(err);
        }
    }
    static async getSurvey(req, res, next) {
        try{
            // const survey = await sc_qs_question_items.findAndCountAll({where: {
            //     szQuestionId: req.query.id,
            // }, 
            // include: [

            //     {
            //         model: sc_qs_options,
            //         as: 'Option',
            //         required: false,
            //         // include: [
            //         //     {model: sc_qs_optionitems, as: 'OptionItems'}
            //         // ]
            //     },
            //     // {model: sc_qs_optionitems, as: 'OptionItems'}
                
            // ],
            // logging: console.log
            // })
            
            // Step 3: Add option items association
            const survey = await sc_qs_question_items.findAll({
                where: {
                    szQuestionId: req.query.id,
                },
                raw: true,
                nest: true,
                // mapToModel: true,
                include: [
                    {
                        model: sc_qs_options,
                        as: 'Option',
                        // required: true,
                        // right: false,
                        // mapToModel: true,
                        // nest: true,
                        // raw: true,
                        include: [
                            {
                                model: sc_qs_optionitems,
                                as: 'OptionItems',
                                order: [['shItem', 'DESC']] // Order comments by creation date in descending order

                            },
                            // {model: sc_qs_optionitemimage, as: 'OptionItemsImage'}
                        ]
                    }
                ],
                logging: console.log
            });
            // Map to JavaScript objects

            const processedSurvey = survey.reduce((acc, current) => {
                // Find existing question with the same shItem
                const existingQuestion = acc.find(item => item.shItem === current.shItem);
                
                if (!existingQuestion) {
                    // If no existing question, add a new one with sorted OptionItems
                    acc.push({
                        ...current,
                        Option: {
                            ...current.Option,
                            OptionItems: Array.isArray(current.Option.OptionItems)
                                ? current.Option.OptionItems.sort((a, b) => a.shItem - b.shItem)
                                : [current.Option.OptionItems]
                        }
                    });
                } else {
                    // If question exists, merge the OptionItems
                    const newOptionItems = Array.isArray(current.Option.OptionItems)
                        ? current.Option.OptionItems.sort((a, b) => a.shItem - b.shItem)
                        : [current.Option.OptionItems];
            
                    // Merge and sort OptionItems
                    existingQuestion.Option.OptionItems = [
                        ...existingQuestion.Option.OptionItems,
                        ...newOptionItems
                    ].sort((a, b) => a.shItem - b.shItem);
                }
            
                return acc;
            }, []);
        
            // Now processedSurvey contains the data with sorted and merged OptionItems
            // console.log(processedSurvey);
            // console.info(survey, '<<< survey <<<<<')
            res.status(200).json({data: processedSurvey})
        }
        catch(err) {
            console.error('Error retrieving survey:', err);
            next(err)
        }
    }
    static async surveySubmit  (req, res)  {
        const delIfExists = (fileName, folder) => {
          const fullpath = path.join(__dirname, '..', folder, fileName);
          if (fs.existsSync(fullpath)) {
            fs.unlinkSync(fullpath);
          }
        };
        
        let userName = '';
        let userEmail = '';
        const getAuth = verifyToken(req.headers.authorization)
        // console.info(getAuth, '<<<< getauth')
        const generalUserName = req.body.generalUserName;
        const showResult = parseInt(req.body.showResult, 10);
      
        if (!getAuth) {
          if (generalUserName === '') {
            throw new Error('Invalid user name');
          }
          userName = generalUserName + new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
        } else {
          userName = getAuth.username;
          userEmail = getAuth.email;
        }
      
        const transaction = await sequelize.transaction();
        try {
          const data = req.body;
          if (!data.answercache) {
            throw new Error('Validation Error: answercache is required');
          }
      
          const answerlist = JSON.parse(data.answercache);
          console.info(answerlist, '<<< answerList')
          const survey = await sc_qs_questions.findOne({ where: { szQuestionId: req.params.questionId }, raw: true
          ,
          logging: console.log // Enable logging to debug the SQL query

          });
          const questionItems = await sc_qs_question_items.findAll({where: {szQuestionId: survey.szQuestionId}, raw: true})
          
          if (getAuth) {
            const answerDat = await sc_tr_answers.findOne({
              where: {
                szNetworkId: survey.szNetworkId,
                szQuestionId: survey.szQuestionId,
                szTerritoryId: survey.szTerritoryId,
                szEmailRespondent: userEmail
              }
            });
      
            if (answerDat) {
              await answerDat.destroy();
            }
      
            await sc_tr_answeritems.destroy({
              where: {
                szNetworkId: survey.szNetworkId,
                szQuestionId: survey.szQuestionId,
                szTerritoryId: survey.szTerritoryId,
                szEmailRespondent: userEmail
              }
            });
          }
      
          await sc_tr_answers.create({
            szNetworkId: survey.szNetworkId,
            szQuestionId: survey.szQuestionId,
            szTerritoryId: survey.szTerritoryId,
            szEmailRespondent: userEmail,
            szUsernameRespondent: userName,
            szTrnId: survey.szTrnId,
            decDuration: 0
          });
          // const question_items = await sc_qs_optionitems
          for (let key in answerlist) {
            let answerValue = answerlist[key];
            if (!answerValue || answerValue === 'dummy') continue;
      
            let imageName = '';
            const question = questionItems[key - 1];
            if (question.szAnswerStyleId === 'ANS_STY_IMG') {
              imageName = `${userName}_${req.params.questionId}_${key}`;
              if (!answerValue || answerValue === 'dummy' || answerValue === '') {
                delIfExists(`${imageName}.jpg`, 'uploads/ansimg');
                delIfExists(`${imageName}.jpeg`, 'uploads/ansimg');
                delIfExists(`${imageName}.png`, 'uploads/ansimg');
                delIfExists(`${imageName}.gif`, 'uploads/ansimg');
                continue;
              }
            }
      
            let score = 0;
            let valueId = '';
            let answer = '';
            let nlgValLogic = '';
            let nlgValLogicLargest = '';
            const option = await getOption(survey);
            let szNode1 = '';
            let szNode2 = '';
            let decNorma = 0;
            const szVariableId = question.szVariableId;
      
            if (szVariableId !== '') {
              const varDat = await sc_qs_variables.findOne({
                where: {
                  szNetworkId: survey.szNetworkId,
                  szTerritoryId: survey.szTerritoryId,
                  szVariableId: question.szVariableId
                }
              });
      
              if (varDat) {
                szNode1 = varDat.szNode1;
                szNode2 = varDat.szNode2;
                decNorma = varDat.decNorma;
              }
            }
      
            let values = [];
            // console.info('masuk', answerValue, question.szAnswerStyleId, '<<< answer')
            if (['Mul-Multiple', 'Pri-Prioritas'].includes(question.szAnswerStyleId)) {
              if (answerValue.includes('~')) {
                values = answerValue.split('~');
              } else {
                values=answerValue;
              }
            } else {
              values.push(answerValue);
            }
            let shItemNumber = 0;
            for (let aItem of values) {
              if (['Sel-Selection', 'Mul-Multiple', 'Pri-Prioritas', 'Rat-Rating'].includes(question.szAnswerStyleId)) {
                answer = aItem;
                // console.info(aItem, '<<< answer >>>>')  

                if (typeof aItem === 'string' && aItem?.includes('|')) {
                  answer = aItem.split('|')[0];
                }
                const getOptionItem = await getOptionItems(question);
                // console.info(answer, getOptionItem, '<<< apa dia')
                const optionItem = getOptionItem?.find(el => {
                  if(question.szAnswerStyleId === 'Pri-Prioritas'){
                    return el.id == answer.id
                  } else {
                    return el.id == answer
                  }
                });
                // console.info(optionItem, '<<< optionItems')
                if (optionItem) {
                  valueId = optionItem.szValueId;
                  score = optionItem.decOptionScore;
                  answer = optionItem.szOption;
                } else {
                  valueId = '';
                  score = 0;
                }
              } else {
                answer = aItem;
                if (question.szAnswerStyleId === 'Nlc-NumberLogic') {
                  const optionItemNlgs = await getOptionItemNlgs(question);
                  console.info('masuk kah??', optionItemNlgs)
                  let largestNlgTo = 0;
                  for (let nlg of optionItemNlgs) {
                    if (nlg.decNlgFrom <= answer && answer <= nlg.decNlgTo) {
                      nlgValLogic = nlg.szNlgValueLogic;
                      break;
                    } else if (largestNlgTo < nlg.decNlgFrom) {
                      largestNlgTo = nlg.decNlgFrom;
                      nlgValLogicLargest = nlg.szNlgValueLogic;
                    }
                  }
                  if (nlgValLogic === '' && answer >= largestNlgTo) {
                    nlgValLogic = nlgValLogicLargest;
                  }
                } else {
                  console.info('masuk else sini', answer)
                }
              }
              await sc_tr_answeritems.create({
                szNetworkId: survey.szNetworkId,
                szQuestionId: survey.szQuestionId,
                szTerritoryId: survey.szTerritoryId,
                szAnswer: answer,
                szEmailRespondent: userEmail,
                szUsername: userName,
                szTrnId: survey.szTrnId,
                shItem: key,
                shItemNumber,
                decScore: score,
                szNlgValueLogic: nlgValLogic,
                szValueId: valueId,
                szVariableId,
                szNode1,
                szNode2,
                decNorma,
                shItemAnswerKey: 0,
                szAnswerKey: ''
              });
      
              shItemNumber++;
            }
          }
      
          await transaction.commit();
          res.status(201).json('success')
          // if (showResult != 1) {
          //   if (getAuth) {
          //      res.redirect('/general');
          //   } else {
          //     return res.redirect('/private/auction');
          //   }
          // } else {
          //   return res.redirect(`/survey/result/${survey.szQuestionId}/${userName}`);
          // }
        } catch (error) {
          await transaction.rollback();
          throw error;
        }
      };
}
module.exports = Survey