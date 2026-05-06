import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTasks } from "./context/TaskContext";
import { Task } from "./types/task";

export default function AddTask() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("pending");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSave = () => {
    if (!title.trim()) {
      setError("Title is required.");
      Alert.alert("Validation Error", "Title is required.");
      return;
    }

    const id = addTask({
      title: title.trim(),
      description: description.trim(),
      status,
      createdAt: new Date().toISOString(),
    });
    router.push(`/task/${id}`);
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        multiline
      />
      <Text style={styles.label}>Status</Text>
      <select
        style={styles.select}
        onChange={(ev) => setStatus(ev.target.value as Task["status"])}
        value={status}
      >
        <option value="pending" style={styles.option}>
          Pending
        </option>
        <option value="in-progress" style={styles.option}>
          In Progress
        </option>
        <option value="completed" style={styles.option}>
          Completed
        </option>
        <option value="canceled" style={styles.option}>
          Canceled
        </option>
      </select>

      {error && <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text>}

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.backButton}>
        <Button title="Back to Tasks" onPress={handleCancel} />
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
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
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  select: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  option: {
    padding: 12,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: "#007bff",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedOptionText: {
    color: "#fff",
  },
  actions: {
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
  actionText: {
    color: "#fff",
  },
  backButton: {
    marginTop: 20,
  },
});
