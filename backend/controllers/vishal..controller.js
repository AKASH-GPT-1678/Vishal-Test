import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();

const generatetoken = (user) => {
    const payload = {
        email: user.email,
        id: user.id,
    };

    const secret = "Kunal_Kamra";
    const options = { expiresIn: "3h" };

    return jwt.sign(payload, secret, options);
};

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {

        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            
            const saveUser = await prisma.user.create({
                data: {
                    email,
                    password,
                    name : email
                },
            });

            const token = generatetoken(saveUser);

            return res.status(201).json({
                message: "User created and logged in",
                user: { id: saveUser.id, email: saveUser.email },
                token,
            });
        }


        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = generatetoken(user);

        return res.status(200).json({
            message: "Login successful",
            user: { id: user.id, email: user.email },
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const saveTask = async (req, res) => {
    const user = req.user;
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized: User not logged in" });
    }

    const id = user.id;
    try {
        await prisma.user.findFirstOrThrow({
            where : {
                email : user.email
            }
        })
        const { title, description, status, priority, dueDate, responsible, isRecurring } = req.body;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                dueDate: dueDate ? new Date(dueDate) : null,
                responsible,
                isRecurring,
                userId: id
            },
        });

        return res.status(201).json({
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ error: "Failed to create task" });
    }
};

export const loadAllTasks = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ error: "Unauthorized: User not logged in" });
    }

    const id = user.id;

    try {
   
        const tasks = await prisma.task.findMany({
            where: {
                userId: id
            },
            orderBy: {
                createdAt: "desc" 
            }
        });

        return res.status(200).json({
            message: "Tasks fetched successfully",
            tasks,
        });
    } catch (error) {
        console.error("Error loading tasks:", error);
        return res.status(500).json({ error: "Failed to load tasks" });
    }
};

export const deleteTask = async (req, res) => {
    const user = req.user; // comes from middleware (decoded from token)
    if (!user) {
        return res.status(401).json({ error: "Unauthorized: User not logged in" });
    }

    const { taskId } = req.params; 

    try {
 
        const task = await prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        if (task.userId !== user.id) {
            return res.status(403).json({ error: "Forbidden: You cannot delete this task" });
        }

   
        await prisma.task.delete({
            where: { id: taskId },
        });

        return res.status(200).json({
            message: "Task deleted successfully",
            taskId,
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ error: "Failed to delete task" });
    }
};
