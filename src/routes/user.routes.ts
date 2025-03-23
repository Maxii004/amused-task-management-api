import { getUsersHandler } from "@controllers/user.controller";
import express from "express";

const router = express.Router();

// User-specific routes
router.get("/", getUsersHandler);

export default router;