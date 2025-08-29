import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";


const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "in_progress", "completed"]),
  priority: z
    .number()
    .min(1, "Priority must be at least 1")
    .max(5, "Priority cannot be more than 5")
    .optional(),
  dueDate: z.string().optional(),
  responsible: z.string().optional(),
  isRecurring: z.boolean(),
});


type TaskFormData = z.infer<typeof TaskSchema>;

export default function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      priority: undefined,
      dueDate: "",
      responsible: "",
      isRecurring: false,
    },
  });
  const token = localStorage.getItem("token");

  const onSubmit = async (data: TaskFormData) => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/savetask",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {

        window.location.reload();
      }
    } catch (error) {

      alert("Something want wrong");
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 max-w-2xl ">
      <input placeholder="Title" {...register("title")} className="p-2" />
      {errors.title && <span className="text-red-500">{errors.title.message}</span>}

      <textarea placeholder="Description" {...register("description")} />

      <select {...register("status")} className="p-2">
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="number"
        placeholder="Priority (1-5)"
        {...register("priority", { valueAsNumber: true })}
        className="p-2"
      />
      {errors.priority && <span className="text-red-500">{errors.priority.message}</span>}

      <input type="date" {...register("dueDate")} className="p-2" />

      <input placeholder="Responsible" {...register("responsible")} className="p-2" />

      <label>
        <input type="checkbox" {...register("isRecurring")} /> Recurring
      </label>

      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
        Save Task
      </button>
    </form>
  );
}
