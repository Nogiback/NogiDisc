import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import { createBag, editBag, deleteBag } from "../controllers/bagController.js";

const router = express.Router();

router.post("/create", verifyUser, createBag);
router.patch("/edit/:discID", verifyUser, editBag);
router.delete("/delete/:discID", verifyUser, deleteBag);

export default router;
