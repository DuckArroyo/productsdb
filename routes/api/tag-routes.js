const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  console.log("======================");
  console.log("All Tags");
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  console.log("======================");
  console.log("Tag ID: ", req.params.id);
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbTagData) => {
      console.log(dbTagData);
      if (!dbTagData) {
        res.status(404).json({ message: "Tag was not found" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//!In this route I believe I need to get the body.tagIds.length do I also need to map it?
router.post("/", (req, res) => {
  console.log("======================");
  console.log("Tag Post");
  Tag.create({
    id: req.params.id,
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  console.log("======================");
  console.log("Product UPDATED");
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
    //tag_name: req.body.tag_name,
  })
    .then((updatedProductTags) => {
      console.log(updatedProductTags);
      if (updatedProductTags[0] === 0)
        return res.status(404).json({ message: "Tag not found with this id!" });
      res.json(updatedProductTags);
    })

    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  console.log("======================");
  console.log("Tag DELETED");
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteTag) => {
      console.log(deleteTag);
      if (!deleteTag) {
        res.status(404).json({ message: "Tag not found with this id!" });
        return;
      }
      res.json(deleteTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
