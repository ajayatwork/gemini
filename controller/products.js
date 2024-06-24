import products from "../data.json" with { type: "json" };
import express from 'express'
const app = express();
app.use(express.json());


export const getAllProducts = (req, res) => {
  res.json(products);
};

export const getProductByID = (req, res) => {
  const id = +req?.params.id;
  const product = products.products.find((p) => p?.id === id);
  console.log("ID", id, "Product", product);
  res.json(product);
};

export const createNewProduct = (req, res) => {
  console.log(req.body);
  products.products.push(req?.body);
  res.json({ type: "post" });
};

export const deleteProduct = (req, res) => {
  const id = req?.params?.id;
  const newProds = products.products.filter((p) => p.id != id);
  products.products = newProds;
  res.json({ status: 200, message: "Product deleted sucessfully" });
};

export const updateProduct = (req, res) => {
  const id = req?.params?.id;
  const updatedProdIndex = products.products.findIndex((p) => p.id == id);
  if (updatedProdIndex != -1) {
    products.products[updatedProdIndex] = req.body;
    res.json({
      status: 200,
      message: "Product updated succesfully",
    });
  } else {
    res.json({
      status: 300,
      message: "Product id doesn't exist",
    });
  }
};
