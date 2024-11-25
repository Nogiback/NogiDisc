import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import {
  getUser,
  getUserInventory,
  getAllUserBags,
  updateUser,
  updatePassword,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userID", verifyUser, getUser);
router.get("/:userID/inventory", verifyUser, getUserInventory);
router.get("/:userID/bags", verifyUser, getAllUserBags);

router.patch("/:userID/update", verifyUser, updateUser);
router.patch("/:userID/updatePassword", verifyUser, updatePassword);
router.delete("/:userID/delete", verifyUser, deleteUser);

export default router;
