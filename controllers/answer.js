const { verifyToken } = require("../helpers/jwt");
const {
  sc_tr_answers,
  sequelize,
  sc_qs_question_items
} = require("../models");
const { Op } = require("sequelize");

class Answer {
    static async getAnswerStyleTypes(payload) {
        try {
            const answer = await sc_tr_answers.findOne({where: {
                szAnswerStyleTypeId: payload.szAnswerStyleTypeId,
            }})
            return answer
        } catch (err) {
            console.info(err);
        }
    }
}
module.exports = Answer