import express, { response } from "express";
import Jwt from "jsonwebtoken";
import {GoogleGenerativeAI} from '@google/generative-ai'
import bodyParser from 'body-parser'
import {
  getAllProducts,
  getProductByID,
  createNewProduct,
  deleteProduct,
  updateProduct,
} from "./controller/products.js";

const PORT = process.env.SERVER_PORT || 6000;

const app = express();

app.use(bodyParser.json());


app.use(express.static("public"));
const auth = (req, res, next) => {
  if (req.query.password == "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};

// sample request
// // Products REST API's
// app.get("/products", getAllProducts);

// // get by id

// app.get("/products/:id", getProductByID);

// app.post("/create/products", createNewProduct);

// app.get("/in", auth, (req, res) => {
//   res.sendFile("/home/admin120/Desktop/nodejs" + "/index.html");
// });

// app.post("/getdata", (req, res) => {
//   console.log(req.body.email, req.body.password);
//   if (!req.body.email || !req.body.password) {
//     res.status(403).json({
//       succes: false,
//       message: "Both password & email is required",
//     });
//   } else {
//     res.status(201).json({
//       succes: true,
//       message: "Data created succesfully",
//     });
//   }
// });

// // for deleting a product

// app.delete("/delete/product/:id", deleteProduct);

// app.patch("/update/product/:id", updateProduct);

// console.log("STARTTT");


const genAI = new GoogleGenerativeAI("AIzaSyBH7NtCoIP9fPSgfthmQLZBUOpLnfJgF1Y");
let ans = []
async function genreatePrompt(inputPrompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(inputPrompt);
    const response = await result.response;
    const text = await response.text();
    console.log("Generated text:", text);
    return text;
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
}

app.post("/gen-prompt", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt || prompt.length === 0) {
    return res
      .status(400)
      .json({ error: "Bad Request: Missing or empty prompt" });
  }

  try {
    const generatedText = await genreatePrompt(prompt);
    res.json({ generatedText });
  } catch (error) {
    console.error("Error in generating prompt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
console.log("ENDDDD");
