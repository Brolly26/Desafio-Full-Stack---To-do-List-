import express from "express";
import {
  getTaf,
  addTaf,
  deleteTaf,
  updateTaf
} from "../controllers/allControllers.js";

const router = express.Router();

router.get("/", getTaf);
router.post("/", addTaf);
router.delete("/:id", deleteTaf);
router.put("/:id", updateTaf);

export default router;
