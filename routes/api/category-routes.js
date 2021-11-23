const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  console.log("======================");
  console.log("All Categories");
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  console.log("======================");
  console.log("Category ID: ", req.params.id);
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => {
      console.log(dbCategoryData);
      if (!dbCategoryData) {
        res.status(404).json({ message: "Category was not found" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  console.log("======================");
  console.log("Category POST");
  console.log(req.body);

  Category.create(
    req.body
    //!re.body contains both of these parameters
    // id: req.body.id,
    // category_name: req.body.category_name,
  )
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  console.log("======================");
  console.log("Category UPDATED");
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
    // category_name: req.body.category_name,
  })

    .then((NewCategoryData) => {
      console.log(NewCategoryData);
      if (NewCategoryData[0] === 0) return res.status(404).json({ message: "Category not found with this id!" });
      res.json(NewCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  console.log("======================");
  console.log("Category DELETED");
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteCategory) => {
      console.log(deleteCategory);
      if (!deleteCategory) {
        res.status(404).json({ message: "Category not found with this id!" });
        return;
      }
      res.json(deleteCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
