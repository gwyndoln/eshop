import { Router } from "express";
import { createType, deleteType, editType } from "../controllers/type";
import typeParser from "../middleware/typeParser";

const router = Router()

router
	.post('/', typeParser, createType)
	.patch('/', typeParser, editType)
	.delete('/', deleteType);

export default router;
