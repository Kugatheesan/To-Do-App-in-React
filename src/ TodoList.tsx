import { useState, useEffect } from "react";
import './TodoList.css'

interface Task {
  id: number;
  text: string;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === "") return;
    const newTask = { id: Date.now(), text: taskInput };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col items-center bg-indigo-900 min-h-screen p-4">
      <h2 className="text-orange-500 text-2xl font-bold mb-4">To-Do List</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task..."
          className="p-2 w-80 border rounded"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
      <ul className="w-96">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 bg-gray-800 text-white rounded mb-2"
          >
            {task.text}
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}