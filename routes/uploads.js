import { Router } from "express";
import { body, param } from 'express-validator';
import { uploadFiles } from "../controllers/uploads.js";

export const uploadFilesRouter = Router();

//GET API Route
uploadFilesRouter.post( '/', uploadFiles );