const { verifyToken } = require("../helpers/jwt");
const {
  sc_ms_respondents,
  sc_qs_question,
  sc_qs_configs,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

class Auction {
  static async PrivateAuction(req, res, next) {
    // console.info(verifyToken(req.headers.access_token));
    try {
      const getDataRespondents = await sc_ms_respondents.findOne({
        where: {
          szUsernameRespondent: verifyToken(req.headers.access_token).username,
        },
      });
      console.info(getDataRespondents, ">>>>> getDataResponse");
      if (getDataRespondents) {
        const today = new Date();
        const getDataQuestions =
          // await sc_qs_question.findAll({
          //   where: {
          //     [Op.exists]: sequelize.literal(`
          //         SELECT 1
          //         FROM sc_qs_configs
          //         WHERE sc_qs_questions.szQuestionId = sc_qs_configs.szQuestionId
          //           AND szIssue = 'Private'
          //           AND bActive = 1
          //           AND szNetworkId = '${getDataRespondents.szNetworkId}'
          //           AND szTerritoryId = '${getDataRespondents.szTerritoryId}'
          //           AND (szUserClass = '' OR szUserClass = '${getDataRespondents.szPersonnelArea}')
          //           AND dtmStart <= '${today}'
          //           AND dtmEnd > '${today}'
          //       `),
          //   },
          //   replacements: {
          //     szUserClass: getDataRespondents.szPersonnelArea,
          //     today: today,
          //   },
          //   raw: true, // If you only want raw data
          // });
          await sc_qs_question.findAll({
            where: {
              bActive: 1,
              szNetworkId: getDataRespondents.szNetworkId,
              szTerritoryId: getDataRespondents.szTerritoryId,
              dtmStart: { [Op.lte]: today },
              dtmEnd: { [Op.gt]: today },
            },
            //   include: [
            //     {
            //       model: sc_qs_configs,
            //       where: {
            //         szIssue: "Private",
            //         [Op.or]: [
            //           { szUserClass: getDataRespondents.szPersonnelArea },
            //           { szUserClass: "" },
            //         ],
            //         // dtmStart: { [Op.lte]: today },
            //         // dtmEnd: { [Op.gt]: today },
            //       },
            //     },
            //   ],
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
        const response = getDataQuestions.map((el) => {
          return {
            szDescQuestion: el.szDescQuestion,
            szIntroduction: getDataConfigs.find(
              (config) => config.szQuestionId === el.szQuestionId
            )?.szIntroduction,
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
