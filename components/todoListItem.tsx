import { View, Text } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TodoListItem = () => {
  return (
    <Animated.View className="bg-purple-300 rounded-md shadow-lg h-12 flex-row justify-between px-5">
      <View className=" flex-row gap-2 items-center">
        <MaterialIcons name="task-alt" size={24} color="purple" />
        <Text>Title</Text>
      </View>
      <View className=" flex-row gap-2 items-center">
        <MaterialIcons name="expand-more" size={24} color="purple" />
        <MaterialIcons name="delete" size={24} color="purple" />
      </View>
    </Animated.View>
  );
};

export default TodoListItem;
