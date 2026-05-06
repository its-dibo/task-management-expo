import { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Create a new Project",
    description: "Set up a new project structure with necessary configurations and dependencies.",
    status: "completed",
    createdAt: "2024-06-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Create database schema",
    description: "Design and implement the database schema for the application.",
    status: "in-progress",
    createdAt: "2024-06-02T12:00:00Z",
  },
  {
    id: 3,
    title: "Implement Tasks list",
    description: "Build the main tasks list view with filtering and sorting capabilities.",
    status: "pending",
    createdAt: "2024-06-03T14:00:00Z",
  },
  {
    id: 4,
    title: "Implement Task details",
    description: "Create the detailed view for individual tasks with edit functionality.",
    status: "canceled",
    createdAt: "2024-06-04T16:00:00Z",
  },
  {
    id: 5,
    title: "Implement CRUD operations",
    description: "Add create, read, update, and delete functionality for tasks.",
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
