import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useTasks } from "../context/TaskContext";
import { Task } from "../types/task";

export default function TaskDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { tasks, updateTask, deleteTask } = useTasks();
  const task = tasks.find((t) => t.id === Number(id));
  // when isEditing is true, show input fields to edit title and description
  const [isEditing, setIsEditing] = useState(false);
  // when editing, we need to keep track of the new title and description values
  // when pressing the save button, we will update the task with the new values
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    );
  }

  /**
   * Handles changing the status of a task
   * This performs an update on the task with the new status value,
   * which will trigger a re-render and show the updated status badge
   *
   * @param newStatus: the new status of the task
   */
  const handleStatusChange = (newStatus: Task["status"]) => {
    updateTask(task.id, { status: newStatus });
  };

  const startEditing = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  /**
   * Saves the edited task details by calling the updateTask function from the context with the new title and description values.
   */
  const saveEdit = () => {
    updateTask(task.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  // TODO: implement
  const handleDelete = () => {};

  // if isEditing is true, show input fields to edit title and description, otherwise show the task details
  if (isEditing) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={editTitle}
          onChangeText={setEditTitle}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={editDescription}
          onChangeText={setEditDescription}
          multiline
        />
        <View style={styles.editActions}>
          <TouchableOpacity onPress={saveEdit} style={styles.saveButton}>
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelEdit} style={styles.cancelButton}>
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // if not editing, show the task details with status badge, description, and created date, along with buttons to edit, delete, and change status
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <View
        style={{
          ...styles.statusBadge,
          ...styles[task.status as keyof typeof styles],
        }}
      >
        <Text style={styles.statusText}>{task.status}</Text>
      </View>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.date}>
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={startEditing} style={styles.actionButton}>
          <Text style={styles.actionText}>Edit Task</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusActions}>
        <Text style={styles.statusLabel}>Change Status:</Text>
        {task.status !== "completed" && (
          <TouchableOpacity
            onPress={() => handleStatusChange("completed")}
            style={[styles.actionButton, styles.statusBtn]}
          >
            <Text style={styles.actionText}>Completed</Text>
          </TouchableOpacity>
        )}

        {task.status !== "canceled" && (
          <TouchableOpacity
            onPress={() => handleStatusChange("canceled")}
            style={[styles.actionButton, styles.statusBtn]}
          >
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
        )}

        {task.status !== "in-progress" && (
          <TouchableOpacity
            onPress={() => handleStatusChange("in-progress")}
            style={[styles.actionButton, styles.statusBtn]}
          >
            <Text style={styles.actionText}>In Progress</Text>
          </TouchableOpacity>
        )}

        {task.status !== "pending" && (
          <TouchableOpacity
            onPress={() => handleStatusChange("pending")}
            style={[styles.actionButton, styles.statusBtn]}
          >
            <Text style={styles.actionText}>Pending</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.backButton}>
        <Button title="Back to Tasks" onPress={() => router.push("/")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  completed: {
    backgroundColor: "#28a745",
  },
  "in-progress": {
    backgroundColor: "#ffc107",
  },
  pending: {
    backgroundColor: "#359fdc",
  },
  canceled: {
    backgroundColor: "#dc3545",
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "#999",
  },
  backButton: {
    marginBlock: 20,
  },

  actions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    maxHeight: 40,
    marginBlock: 10,
  },
  actionButton: {
    backgroundColor: "#140dcd",
    padding: 10,
    borderRadius: 8,
  },
  actionText: {
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 8,
  },
  editActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  statusActions: {
    marginTop: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  statusBtn: {
    marginBottom: 8,
  },
});
