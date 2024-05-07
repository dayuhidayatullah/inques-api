const { verifyToken } = require("../helpers/jwt");
const {
  sc_ms_respondents,
  sc_qs_question,
  sc_qs_configs,
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
        console.info(getDataRespondents, "<<<< respondents");

        const getDataQuestion = await sc_qs_question.findAll({
          include: [
            {
              model: sc_qs_configs,
              where: {
                szIssue: "Private",
                bActive: 1,
                szNetworkId: respondent.szNetworkId,
                szTerritoryId: respondent.szTerritoryId,
                [Op.or]: [
                  { szUserClass: respondent.szPersonnelArea },
                  { szUserClass: "" },
                ],
                dtmStart: { [Op.lte]: today },
                dtmEnd: { [Op.gt]: today },
              },
            },
          ],
        });
        res.status(200).json(getDataQuestion);
        console.info(getDataQuestion, "<<<<< getDataQuestion");
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
