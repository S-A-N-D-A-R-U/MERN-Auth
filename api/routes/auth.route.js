import express from "express";
import { signin, signup } from "../controllers/auth.contriller.js";


const router = express.Router();

router.post("/signup", signup)
router.post("/signin", signin)

export default router;
