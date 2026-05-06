import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { tasks } from "../data/tasks";

export default function TaskDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    );
  }

  // todo: implement
  const changeStatus = (newStatus: string) => () => {};

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
        <TouchableOpacity
          onPress={() => router.push(`/edit/${task.id}`)}
          style={styles.actionButton}
        >
          <Text style={styles.actionText}>Edit Task</Text>
        </TouchableOpacity>

        {task.status !== "completed" && (
          <TouchableOpacity
            onPress={changeStatus("completed")}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>mark as completed</Text>
          </TouchableOpacity>
        )}

        {task.status !== "canceled" && (
          <TouchableOpacity
            onPress={changeStatus("canceled")}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>cancel</Text>
          </TouchableOpacity>
        )}

        {task.status !== "in-progress" && (
          <TouchableOpacity
            onPress={changeStatus("in-progress")}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>mark as in progress</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.backButton}>
        <Button title="Back to Tasks" onPress={() => router.back()} />
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
});
