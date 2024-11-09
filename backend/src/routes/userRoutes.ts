import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import {
  getAllUsers,
  getUser,
  getUserInventory,
  getAllUserBags,
  getUserBag,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyUser, getAllUsers);
router.get("/:userID", verifyUser, getUser);
router.get("/:userID/inventory", verifyUser, getUserInventory);
router.get("/:userID/bags", verifyUser, getAllUserBags);
router.get("/:userID/bags/:bagID", verifyUser, getUserBag);

router.patch("/:userID/update", verifyUser, updateUser);

export default router;
