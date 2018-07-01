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
      (date_part(DAY FROM birth_date) || '-' || date_part(MONTH FROM birth_date)) as fecha
  FROM
      "People"
  ORDER BY
      fecha ASC `,
      {
        model: models.Person
      }
    )
    .then(function (people) {
      res.render("index", { title: "Celebrities, ordered by proximity", people: people });
    });
});

module.exports = router;
