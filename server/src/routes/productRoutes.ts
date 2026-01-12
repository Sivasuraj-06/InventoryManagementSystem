import { Router } from "express";

import { createProduct, getProducts } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/",createProduct);

export default router;