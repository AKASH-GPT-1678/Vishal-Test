import express from "express";
const router = express.Router();

;

import { saveTask, loginUser, loadAllTasks ,deleteTask} from "../controllers/vishal..controller.js";


router.post("/login", loginUser);

router.post("/savetask", saveTask);
router.get("/mytasks", loadAllTasks);
router.delete("/deletetask/:taskId", deleteTask);

export default router;