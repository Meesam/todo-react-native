import { View, Text } from "react-native";
import React from "react";
import TodoListItem from "@/components/todoListItem";

const AllTodos = () => {
  return (
    <View className="flex-1 bg-purple-100 p-5">
      <TodoListItem />
    </View>
  );
};

export default AllTodos;
