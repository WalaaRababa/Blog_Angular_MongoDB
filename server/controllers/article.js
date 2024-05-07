const Article = require("../models/article");

const getAllArticle = (req, res) => {
  Article.find({})
    .then((result) => {
      res.status(200).json({
        message: "all article",
        articles: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};
const getArticleById = (req, res) => {
  const { id } = req.params;
  Article.findById(id)
    .then((result) => {
      res.status(200).json({
        message: `article that has id =>${id}`,
        article: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};
const getArticleByAuthorId = (req, res) => {
  const { author } = req.query;
  Article.find({ idAuthor: author })
    .then((result) => {
      if (result.length == 0) {
        res.status(200).json({
          message: `article that has id =>${author} not found`,
        });
      } else {
        res.status(200).json({
          message: `article that has id =>${author}`,
          articles: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};
const deleteArticleByID = (req, res) => {
  const { id } = req.params;
  Article.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        message: `article that has id =>${id} deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};
module.exports = {
  getArticleByAuthorId,
  getAllArticle,
  getArticleById,
  deleteArticleByID,
};
