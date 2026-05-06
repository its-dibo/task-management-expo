import { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Create a new Project",
    status: "completed",
    createdAt: "2024-06-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Create database schema",
    status: "in-progress",
    createdAt: "2024-06-02T12:00:00Z",
  },
  {
    id: 3,
    title: "Implement Tasks list",
    status: "pending",
    createdAt: "2024-06-03T14:00:00Z",
  },
  {
    id: 4,
    title: "Implement Task details",
    status: "canceled",
    createdAt: "2024-06-04T16:00:00Z",
  },
  {
    id: 5,
    title: "Implement CRUD operations",
    status: "pending",
    createdAt: "2024-06-05T18:00:00Z",
  },
  {
    id: 6,
    title: "Write unit tests",
    status: "pending",
    createdAt: "2024-06-05T18:00:00Z",
  },
  {
    id: 7,
    title: "Implement authentication",
    status: "pending",
    createdAt: "2024-06-05T18:00:00Z",
  },
];
