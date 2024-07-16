const { verifyToken } = require("../../helpers/jwt");
const {
  sc_tr_answers,
  sequelize,
  sc_qs_questions,
  sc_ms_users
} = require("../../models");
const { Op } = require("sequelize");

class Question {
    static async getGeneralFilter(token) {
        const currentUserName = verifyToken(token).username; // Assuming user information is stored in req.user

        try {
          const user = await sc_ms_users.findOne({ where: { szUsername: currentUserName } });

          if (!user) {
            throw new Error('User not found');
          }

          const userNetworkId = user.szNetworkId;
          const userTerritoryId = user.szTerritoryId;
          let filter = {};

          if (!user.bSuperMaster) {
            filter.szNetworkId = userNetworkId;

            if (!user.bSuperAdmin) {
              filter.szTerritoryId = userTerritoryId;
            }
          }

          return filter;
        } catch (error) {
          console.error('Error generating general filter:', error);
          throw error;
        }
    }

    static async getQuestionByType(req, res) {
        const trnId = req.params.trnId; // Assuming trnId is passed as a route parameter

        try {
            const generalFilter = await Question.getGeneralFilter(req.headers.authorization); // Call the static method directly

            let filter = {};
            if (generalFilter) {
                filter = { ...generalFilter, szTrnId: trnId };
            } else {
                filter.szTrnId = trnId;
            }

            const questions = await sc_qs_questions.findAll({ where: filter }); // Assuming sc_qs_question_items is the correct model
            return res.json({ questions });
        } catch (error) {
            console.error('Database query failed', error);
            return res.status(500).json({ error: 'Database query failed' });
        }
    }
}

module.exports = Question;