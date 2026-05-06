import { useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { tasks } from "../data/tasks";
import { Task } from "../types/task";

export default function TasksList() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(`/task/${item.id}`)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList data={tasks} style={{ margin: 20 }} renderItem={renderItem} />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
