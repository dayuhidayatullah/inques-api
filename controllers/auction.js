const { verifyToken } = require("../helpers/jwt");
const {
  sc_ms_respondents,
  sc_qs_questions,
  sc_qs_configs,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

class Auction {
  static async PrivateAuction(req, res, next) {
    // console.info(verifyToken(req.headers.access_token));
      try {
      console.info(req.headers)
      const getDataRespondents = await sc_ms_respondents.findOne({
        where: {
          szUsernameRespondent: verifyToken(req.headers.authorization).username,
        },
      });
      // console.info(getDataRespondents, ">>>>> getDataResponse");
      if (getDataRespondents) {
        const today = new Date();
        const getDataQuestions =
          await sc_qs_questions.findAll({
            where: {
              bActive: 1,
              szNetworkId: getDataRespondents.szNetworkId,
              szTerritoryId: getDataRespondents.szTerritoryId,
              dtmStart: { [Op.lte]: today },
              dtmEnd: { [Op.gt]: today },
            },
          });
        const getDataConfigs = await sc_qs_configs.findAll({
          where: {
            szIssue: "Private",
            [Op.or]: [
              { szUserClass: getDataRespondents.szPersonnelArea },
              { szUserClass: "" },
            ],
          },
        });
        // console.info(getDataConfigs, '<<< congiig')
        const response = getDataQuestions.map((el) => {
          return {
            szDescQuestion: el.szDescQuestion,
            config: getDataConfigs.find(config => el.szQuestionId === config.szQuestionId),
            szTerritoryId: getDataRespondents.szTerritoryId
            // szIntroduction: getDataConfigs.find(config => el.szQuestionId === config.szQuestionId),
            // szInstruction: getDataConfigs.find(config => el.szQuestionId === config.szQuestionId)
          };
        });
        res.status(200).json(response);
      }
    } catch (err) {
      console.info(err, "<<<< error");

      next(err);
    }
    // sc_ms_respondents
    //   .findOne({
    //     where: {
    //       szUsernameRespondent: verifyToken(req.headers.access_token).username,
    //     },
    //   })
    //   .then((respondent) => {
    //     console.info(respondent, "<<<<< respondents");

    //     if (respondent) {
    //       const today = new Date();
    //       sc_qs_question
    //         .findAll({
    //           include: [
    //             {
    //               model: ScQsConfig,
    //               where: {
    //                 szIssue: "Private",
    //                 bActive: 1,
    //                 szNetworkId: respondent.szNetworkId,
    //                 szTerritoryId: respondent.szTerritoryId,
    //                 [Op.or]: [
    //                   { szUserClass: respondent.szPersonnelArea },
    //                   { szUserClass: "" },
    //                 ],
    //                 dtmStart: { [Op.lte]: today },
    //                 dtmEnd: { [Op.gt]: today },
    //               },
    //             },
    //           ],
    //         })
    //         .then((surveys) => {
    //           // surveys will contain the desired results
    //           res.status(200).json(surveys);
    //           console.info(surveys, "<<<< surveys");
    //         })
    //         .catch((err) => {
    //           // Handle errors
    //         });
    //     } else {
    //       // Handle case when respondent is not found
    //     }
    //   })
    //   .catch((err) => {
    //     // Handle errors
    //   });
  }
  static async GeneralAuction() {}
}
module.exports = Auction;
