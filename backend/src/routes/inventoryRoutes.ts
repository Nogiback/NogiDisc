import express from "express";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/", verifyUser, getAllDiscs);

router.post("/create", verifyUser, createDisc);
router.patch("/edit/discID", verifyUser, editDisc);
router.delete("/delete/discID", verifyUser, deleteDisc);

export default router;
