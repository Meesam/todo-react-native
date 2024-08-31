import { View, Text, FlatList, Pressable, Platform } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/service/todo";
import TodoListItem from "@/components/todoListItem";
import { TODO } from "@/types/todoType";

const AllTodos = () => {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <View className="flex-1 bg-purple-100 p-5">
      {todos && todos.length > 0 && (
        <FlatList
          data={todos}
          renderItem={({ item }) => {
            return <TodoListItem item={item} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default AllTodos;
