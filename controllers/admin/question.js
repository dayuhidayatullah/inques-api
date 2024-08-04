const { verifyToken } = require("../../helpers/jwt");
const {
  sc_tr_answers,
  sequelize,
  sc_qs_questions,
  sc_ms_users
} = require("../../models");
const { Sequelize } = require("sequelize");
// const { Sequelize } = require('sequelize');

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
    static async getPollSummary(req, res) {
      const token = req.headers.authorization;
      const currentUserName = verifyToken(token).username;

      try {
          const user = await sc_ms_users.findOne({ where: { szUsername: currentUserName } });

          if (!user) {
              return res.status(404).json({ error: 'User not found' });
          }

          // const territoryId = user.szTerritoryId;
          const questionId = req.params.id;

          const scores = await sequelize.query(`
              SELECT szValueId, COUNT(1) as cntScore, COUNT(1)/C.totalPoint as ratio
              FROM sc_tr_answeritems D
              JOIN (
                  SELECT B.szQuestionId, COUNT(DISTINCT shItem) * B.decTargetVotes as totalPoint
                  FROM sc_tr_answeritems A
                  JOIN sc_qs_questions B ON B.szQuestionId = A.szQuestionId
                  WHERE B.szQuestionId = :questionId
                  GROUP BY B.szQuestionId, B.decTargetVotes
              ) C ON C.szQuestionId = D.szQuestionId
              WHERE D.szQuestionId = :questionId
              GROUP BY szValueId, C.totalPoint
              ORDER BY SUM(decScore) DESC
          `, {
              replacements: { questionId },
              type: sequelize.QueryTypes.SELECT
          });

          return res.json({ scores });
      } catch (error) {
          console.error('Database query failed', error);
          return res.status(500).json({ error: 'Database query failed' });
      }
    }
    static async getScoreSummary  (req, res) {
      // if (!authUser) {
      //   return { redirect: '/admin' };
      // }
    
      try {
        const user = await sc_ms_users.findOne({ where: { szUsername: verifyToken(req.headers.authorization).username } });
    
        if (!user) {
          throw new Error('User not found');
        }
    
        const territoryId = user.szTerritoryId;
        const id = req.params.trnId
        const scores = await sequelize.query(
          `SELECT szValueId, SUM(decScore) AS sumScore 
           FROM sc_tr_answeritems 
           WHERE szQuestionId = :id AND szValueId != '' 
           GROUP BY szValueId 
           ORDER BY SUM(decScore) DESC`,
          {
            type: Sequelize.QueryTypes.SELECT,
            replacements: { id }
          }
        );
        
        return res.status(200).json( { scores });
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    static async getTotalVotes(req, res) {
      // Check if the user is authenticated
      // if (!req.user) {
      //     return res.redirect('/admin');
      // }
  
      try {
          // Get the authenticated user's details
          const user = await sc_ms_users.findOne({
              where: { szUsername: verifyToken(req.headers.authorization).username }
          });
  
          if (!user) {
              return res.redirect('/admin');
          }
  
          const territoryId = user.szTerritoryId;
  
          // Execute the query using Sequelize
          const totalVotes = await sequelize.query(
              `SELECT a.decTargetVotes, COUNT(1) as answerCnt
               FROM sc_qs_questions a
               JOIN sc_tr_answers b ON a.szQuestionId = b.szQuestionId
               WHERE a.szQuestionId = :invId AND b.szTerritoryId = :territoryId
               GROUP BY a.decTargetVotes`,
              {
                  replacements: { invId: req.params.questionId, territoryId: territoryId },
                  type: sequelize.QueryTypes.SELECT
              }
          );
  
          return res.json({ totalVotes });
      } catch (error) {
          console.error('Error fetching total votes:', error);
          return res.status(500).json({ error: 'An error occurred' });
      }
    }
    static async getScoreSummaryByDate(req, res) {
      // Check if the user is authenticated
      // if (!req.user) {
      //     return res.redirect('/admin');
      // }
      console.info(req.headers.authorization, '<<< dia apa')
      try {
          // Get the authenticated user's details
          const user = await sc_ms_users.findOne({
              where: { szUsername: verifyToken(req.headers.authorization).username }
          });
  
          if (!user) {
              return res.redirect('/admin');
          }
  
          const territoryId = user.szTerritoryId;
  
          // Execute the query using Sequelize
          const scores = await sequelize.query(
              `SELECT B.szValueId, CAST(A.updated_at AS DATE) AS answerDate, 
                      SUM(decScore) as sumScore, V.szColor
               FROM sc_tr_answers A
               JOIN sc_tr_answeritems B ON B.szQuestionId = A.szQuestionId
                                        AND B.szUsername = A.szUsernameRespondent
                                        AND B.szTrnId = A.szTrnId
               JOIN sc_qs_values V ON V.szValueId = B.szValueId
               WHERE A.szQuestionId = :id AND B.szValueId != ''
               GROUP BY B.szValueId, answerDate, V.szColor
               ORDER BY SUM(decScore) DESC`,
              {
                  replacements: { id: req.params.questionId },
                  type: sequelize.QueryTypes.SELECT
              }
          );
  
          return res.json({ scores });
      } catch (error) {
          console.error('Error fetching score summary:', error);
          return res.status(500).json({ error: 'An error occurred' });
      }
  }
}

module.exports = Question;