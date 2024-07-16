const { verifyToken } = require("../helpers/jwt");
const {
  sc_tr_answers,
  sequelize,
  sc_qs_question_items,
    sc_qs_options,
    sc_qs_optionitems,
    Sequelize
} = require("../models");
const { Op, Model } = require("sequelize");
const { getOption } = require("./option");
const sc_qs_optionitemimage = require("../models/sc_qs_optionitemimage");
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
}
module.exports = Survey