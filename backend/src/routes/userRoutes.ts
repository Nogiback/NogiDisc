import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import {
  getUser,
  getUserInventory,
  getAllUserBags,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userID", verifyUser, getUser);
router.get("/:userID/inventory", verifyUser, getUserInventory);
router.get("/:userID/bags", verifyUser, getAllUserBags);

router.patch("/:userID/update", verifyUser, updateUser);
router.delete("/:userID/update", verifyUser, deleteUser);

export default router;
