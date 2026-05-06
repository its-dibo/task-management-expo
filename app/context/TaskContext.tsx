import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Task } from "../types/task";

interface ITaskContext {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Create a new Project",
    description:
      "Set up a new project structure with necessary configurations and dependencies.",
    status: "completed",
    createdAt: "2024-06-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Create database schema",
    description:
      "Design and implement the database schema for the application.",
    status: "in-progress",
    createdAt: "2024-06-02T12:00:00Z",
  },
  {
    id: 3,
    title: "Implement Tasks list",
    description:
      "Build the main tasks list view with filtering and sorting capabilities.",
    status: "pending",
    createdAt: "2024-06-03T14:00:00Z",
  },
  {
    id: 4,
    title: "Implement Task details",
    description:
      "Create the detailed view for individual tasks with edit functionality.",
    status: "canceled",
    createdAt: "2024-06-04T16:00:00Z",
  },
  {
    id: 5,
    title: "Implement CRUD operations",
    description:
      "Add create, read, update, and delete functionality for tasks.",
    status: "pending",
    createdAt: "2024-06-05T18:00:00Z",
  },
  {
    id: 6,
    title: "Write unit tests",
    description: "Write comprehensive unit tests for core functionality.",
    status: "pending",
    createdAt: "2024-06-05T18:00:00Z",
  },
  {
    id: 7,
    title: "Implement authentication",
    description: "Add user authentication and authorization features.",
    status: "pending",
    createdAt: "2024-06-05T18:00:00Z",
  },
];

const TaskContext = createContext<ITaskContext | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = useCallback(
    (task: Omit<Task, "id">) => {
      const id = Math.max(0, ...tasks.map((t) => t.id)) + 1;
      setTasks((prev) => [...prev, { ...task, id }]);
    },
    [tasks],
  );

  const updateTask = useCallback((id: number, body: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...body } : task)),
    );
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
