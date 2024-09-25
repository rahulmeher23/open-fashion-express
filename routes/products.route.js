import { Router } from "express";
import { products } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get('/products', products);

export default productsRouter