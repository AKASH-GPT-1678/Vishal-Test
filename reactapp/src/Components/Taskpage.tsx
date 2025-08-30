
import React from "react";
import TaskForm from "./Taskform";
import axios from "axios";
export interface Task {
    id: string;
    title: string;
    description: string;
    status: "in_progress" | "completed" | "pending"; 
    priority: number;
    responsible: string;
    isRecurring: boolean;
    dueDate: string;       
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

const Taskpage = () => {

    const [showForm, setshowForm] = React.useState(false);
    const token = localStorage.getItem("token");

    
    const [savedTasks, setSavedTasks] = React.useState<Task[]>([]);
    const loadTasks = async (token: string) => {
        if (!token) {
            return [];
        }

        try {
            const response = await axios.get("https://vishal-test-production.up.railway.app/api/mytasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(" iam working");
            console.log(response.data);
            setSavedTasks(response.data.tasks);

            if (response.status === 200) {
                return response.data;

            } else {
                return [];
            }
        } catch (error) {
            console.error("Error loading tasks:", error);
            return [];
        }
    };

    const deleteTask = async (taskId: string) => {
        const token = localStorage.getItem("token");
        if(!token){
            return;
        }
        const  API_URL = "https://vishal-test-production.up.railway.app/api/deletetask";
        try {
            if (!taskId || !token) {
                throw new Error("Task ID and token are required");
            }

            const response = await axios.delete(`${API_URL}/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log("Task deleted successfully:", response.data);
                return response.data;
            } else {
                console.warn("Unexpected response:", response);
            }
        } catch (error: any) {
            console.error("Error deleting task:", error.response?.data || error.message);
            throw error;
        }
    };

    React.useEffect(() => {
        if (token) {
            loadTasks(token);
        }

    }, [])



    return (
        <div className="relative p-12 w-full">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setshowForm(!showForm)}
            >
                Add Task
            </button>

            {showForm && (
                <div className="flex justify-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <TaskForm />
                    </div>
                </div>
            )}

            <div>
                {savedTasks.map((task) => (
                    <div key={task.id} className="bg-white p-4 rounded shadow-lg my-4 flex flex-row justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <p className="text-gray-600">{task.description}</p>
                            <p>Status: {task.status}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Responsible: {task.responsible}</p>
                        </div>
                        <div>

                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTask(task.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Taskpage;
