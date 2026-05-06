import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import TasksList from "./components/tasks-list";

export default function Index() {
  const router = useRouter();

  return (
    <>
      <TouchableOpacity
        style={{ alignItems: "center", marginBlock: 20 }}
        onPress={() => router.push("/add")}
      >
        <Text
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: 10,
            borderRadius: 5,
            width: 100,
            textAlign: "center",
          }}
        >
          Add Task
        </Text>
      </TouchableOpacity>
      <TasksList />
    </>
  );
}
