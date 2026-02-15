const router = require("express").Router();
const Product = require("../models/Product");

router.post("/", async(req,res)=>{
  const p = new Product(req.body);
  await p.save();
  res.json(p);
});

router.get("/", async(req,res)=>{
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
