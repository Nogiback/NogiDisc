import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import {
  getBag,
  createBag,
  editBag,
  deleteBag,
} from "../controllers/bagController.js";

const router = express.Router();

router.get("/:bagID", verifyUser, getBag);
router.post("/create", verifyUser, createBag);
router.patch("/edit/:bagID", verifyUser, editBag);
router.delete("/delete/:bagID", verifyUser, deleteBag);

export default router;
