import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import {
  getDisc,
  createDisc,
  editDisc,
  deleteDisc,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/:discID", verifyUser, getDisc);

router.post("/create", verifyUser, createDisc);
router.patch("/edit/:discID", verifyUser, editDisc);
router.delete("/delete/:discID", verifyUser, deleteDisc);

export default router;
