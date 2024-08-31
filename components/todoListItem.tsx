import { View, Text, Pressable } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TODO } from "@/types/todoType";
import { cn } from "@/utils/classMerge";

interface TodoListItemProps {
  item: TODO;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ item }) => {
  const height = useSharedValue(48);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleExpand = () => {
    height.value = !isExpanded ? 48 : 120;
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const animatedHeight = useAnimatedStyle(() => ({
    height: withTiming(height.value, { duration: 500 }),
  }));

  const animatedText = useAnimatedStyle(() => ({
    opacity: withTiming(
      interpolate(height.value, [48, 80, 100, 120], [0, 0, 0, 1]),
      {
        duration: 500,
      }
    ),
  }));

  return (
    <Animated.View
      style={animatedHeight}
      className={cn(`bg-purple-300 rounded-md shadow-lg mb-5 flex-col`)}
    >
      <View className="flex-row justify-between px-5">
        <View className="flex-row gap-2 pt-3 ">
          <MaterialIcons name="task-alt" size={24} color="purple" />
          <Text>{item.title}</Text>
        </View>
        <View className=" flex-row gap-2 pt-3">
          <Pressable onPress={handleExpand}>
            <MaterialIcons name="expand-more" size={24} color="purple" />
          </Pressable>
          <Pressable onPress={handleDelete}>
            <MaterialIcons name="delete" size={24} color="purple" />
          </Pressable>
        </View>
      </View>
      <View className="px-5 py-5">
        <Animated.Text style={animatedText}>{item.description}</Animated.Text>
      </View>
    </Animated.View>
  );
};

export default TodoListItem;
