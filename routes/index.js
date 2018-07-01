var models = require("../models");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  models.sequelize
    .query(
      `SELECT
      name,
      birth_date,
      EXTRACT(YEAR FROM age(birth_date)) AS age,
      
      EXTRACT(DAY FROM birth_date) AS day_b,
      EXTRACT(MONTH FROM birth_date) AS month_b,
      (day_b || '-' || momnth_b) AS date_b,

      EXTRACT(DAY FROM now()) AS day_n,
      EXTRACT(MONTH FROM now()) AS month_n,
      (day_n || '-' || month_n) AS date_n
  FROM
      "People"
  ORDER BY
      date_b = date_n DESC,
      date_b < date_n DESC,
      date_b > date_n ASC `,
      {
        model: models.Person
      }
    )
    .then(function (people) {
      res.render("index", { title: "Celebrities, ordered by proximity", people: people });
    });
});

module.exports = router;
