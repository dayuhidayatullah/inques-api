const {
  sc_qs_options,
  sc_qs_optionitems,
  sc_qs_optionitemimage,
  sc_qs_optionitemnlgs,
  sc_ms_users, 
  sequelize
} = require("../models");
const { Op } = require("sequelize");
// const multer = require('multer');
// const sz_ms_users = require("../models/sz_ms_users");
const { verifyToken } = require("../helpers/jwt");
const path = require("path");
const fs = require('fs')
const sharp = require('sharp')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

class Option {
    static async getOption(payload) {
        try {
            const answer = await sc_qs_options.findOne({where: {
                szOptionId: payload.szOptionId,
            }})
            return answer
        } catch (err) {
            console.info(err);
        }
    }
    static async getOptionItems(req, res, next) {
        try {
            const optionItems = await sc_qs_optionitems.findAll({where: {
                szOptionId: req.query.szOptionId,
            }, include: [
              {model: 'sc_qs_optionitemimage',as: 'OptionItemImages',  where: {szOptionId: req.query.szOptionId}}
            ]})
            res.status(200).json({ data: optionItems })
        } catch (err) {
            console.info(err);
        }
    }
    static async getOptionItemImage(req, res, next) {
        try {
            console.info(req.query, '<<< params')
            const optionItemImages = await sc_qs_optionitemimage.findAll({where: {szOptionId: req.query.szOptionId}, raw: true, order: [['shItem', 'ASC']]})
            const processeditemImages = optionItemImages.map((item) => {
              console.info(item.imgPath)
              const existingImage = fs.readFileSync(`uploads/${item.imgPath}`, 'base64') || null
              return {
                ...item,
                imgOption: `data:image/jpeg;base64,${existingImage}`
              }
            })
            // console.info(processeditemImages, '<<<< optionImages')
            res.status(200).json({data: processeditemImages})
        } catch (err){
            console.info(err)
        }
    }
    static async saveOption(req, res, next) {
      // console.info(req, '<<< apa req')
        let {
            optionId,
            desc,
            isSelection,
            selectionType,
            isMultiple,
            isPriority,
            isRating,
            ratingType,
            ratingScale,
            ratingNode1,
            ratingNode2,
            isNumLogic,
            itemNo,
            itemOpt,
            hasImage,
            itemScore,
            itemValId,
            nlgNo,
            nlgFrom,
            nlgTo,
            nlgValLogic
          } = req.body;
          console.info(req.files, '.........')
          let aimgFile = req.files;
          const user = await sc_ms_users.findOne({ where: { szUsername: verifyToken(req.headers.authorization).username } });
          console.info(user, '<<<<< userrr')
          if (Number(isRating)) {
            selectionType = ratingType;
          }
        
          const optionItems = [];
          const optionNlgs = [];
          console.info('sampe SIni ??? ', optionId)
          if (itemNo && !Number(isNumLogic)) {
            console.info('masuk SINI KAH ????')
            itemNo.forEach((_, i) => {
              optionItems.push({
                szOptionId: optionId,
                shItem: itemNo[i],
                szOption: itemOpt[i],
                bImageOption: hasImage[i],
                decOptionScore: itemScore[i],
                szValueId: itemValId[i] || ""
              });
            });
            optionItems.sort((a, b) => a.itemNo - b.itemNo);
          }
        
          if (nlgNo && isNumLogic) {
            nlgNo.forEach((_, i) => {
              optionNlgs.push({
                optionId,
                itemNo: nlgNo[i],
                nlgFrom: nlgFrom[i],
                nlgTo: nlgTo[i],
                nlgValLogic: nlgValLogic[i]
              });
            });
            optionNlgs.sort((a, b) => a.itemNo - b.itemNo);
          }
        
          try {
            await sequelize.transaction(async (t) => {
              const optionGet = await sc_qs_options.findOne({where: {szOptionId: optionId}})
              if(optionGet){
                await sc_qs_options.update({
                    szOptionId: optionId,
                    szDescOption: desc,
                    bSelection: isSelection,
                    bMultiple: isMultiple,
                    bPrioritas: isPriority,
                    bRating: isRating,
                    bNumberLogic: isNumLogic,
                    szAnswerStyleTypeId: selectionType,
                    decRatingScale: ratingScale,
                    szRatingNode1: ratingNode1,
                    szRatingNode2: ratingNode2,
                    szAuthor: user.szUsername,
                    szNetworkId: user.szNetworkId,
                    szTerritoryId: user.szTerritoryId
                  }, { transaction: t, where: {
                    szOptionId: optionId
                  } });
            
              } else {
                 await sc_qs_options.create({
                szOptionId: optionId,
                szDescOption: desc,
                bSelection: isSelection,
                bMultiple: isMultiple,
                bPrioritas: isPriority,
                bRating: isRating,
                bNumberLogic: isNumLogic,
                szAnswerStyleTypeId: selectionType,
                decRatingScale: ratingScale,
                szRatingNode1: ratingNode1,
                szRatingNode2: ratingNode2,
                szAuthor: user.szUsername,
                szNetworkId: user.szNetworkId,
                szTerritoryId: user.szTerritoryId
              }, { transaction: t, where: {
                szOptionId: optionId
              } });
                console.info(optionGet, '<<<< option get')
              }
              // await sc_qs_options.upsert({
              //   szOptionId: optionId,
              //   szDescOption: desc,
              //   bSelection: isSelection,
              //   bMultiple: isMultiple,
              //   bPrioritas: isPriority,
              //   bRating: isRating,
              //   bNumberLogic: isNumLogic,
              //   szAnswerStyleTypeId: selectionType,
              //   decRatingScale: ratingScale,
              //   szRatingNode1: ratingNode1,
              //   szRatingNode2: ratingNode2,
              //   szAuthor: user.szUsername,
              //   szNetworkId: user.szNetworkId,
              //   szTerritoryId: user.szTerritoryId
              // }, { transaction: t, where: {
              //   szOptionId: optionId
              // } });
        
              await sc_qs_optionitems.destroy({ where: { szOptionId: optionId }, transaction: t });
              await sc_qs_optionitemnlgs.destroy({ where: { szOptionId: optionId }, transaction: t });
              console.info(optionItems, '<<<< apadah')
              if (!Number(isNumLogic)) {
                await sc_qs_optionitems.bulkCreate(optionItems, { transaction: t });
        
                const ashItemNotToDel = [];
                if (aimgFile) {
                  for (let key in aimgFile) {
                    const file = aimgFile[key];
                    const ext = path.extname(file.originalname);
                    const itemNo = parseInt(key) + 1;
                    console.info(file, '<<<< fileee')
                    // const resizedImageBuffer = await sharp(file.buffer)
                    // .resize({ width: 250, height: 250, fit: 'contain',background: 'tranparent', , withoutEnlargement: true}) // Resize to 200x200 pixels
                    // .toFormat('jpeg')
                    // .jpeg({ quality: 100 })
                    // .toBuffer();
                    const filename = `${optionId}_${itemNo}${ext}`;
                    const fullpath = path.join('uploads/', filename);
        
                    if (fs.existsSync(fullpath)) {
                      fs.unlinkSync(fullpath);
                    }
                    fs.writeFileSync(fullpath, file.buffer);
                    const checkItemImageFound = await sc_qs_optionitemimage.findOne({where: {szOptionId: optionId, shitem: itemNo, ImgPath: filename}, transaction: t})
                    console.info(checkItemImageFound, itemNo, filename, optionId, '<<<< cinta k')
                    if(!checkItemImageFound){
                      await sc_qs_optionitemimage.create({
                        szOptionId: optionId,
                        shItem: itemNo,
                        imgPath: filename
                      }, { transaction: t, where: {szOptionId: optionId} })
                    }
        
                    ashItemNotToDel.push(itemNo);
                  }
                }
        
                await sc_qs_optionitemimage.destroy({
                  where: {
                    szOptionId: optionId,
                    shItem: { [Op.notIn]:   ashItemNotToDel }
                  },
                  transaction: t
                });
              } else {
                await sc_qs_optionitemimage.destroy({ where: { szOptionId: optionId }, transaction: t });
                await sc_qs_optionitemnlgs.bulkCreate(optionNlgs, { transaction: t });
              }
            });
        
            res.send('Success');
          } catch (error) {
            res.status(500).send('Failed');
            throw error;
          }
    }
}
module.exports = Option