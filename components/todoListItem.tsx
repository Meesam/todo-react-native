import { View, Text, Pressable } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  FadeIn,
  FadeInLeft,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TODO } from "@/types/todoType";
import { cn } from "@/utils/classMerge";
import Entypo from "@expo/vector-icons/Entypo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "@/service/todo";

interface TodoListItemProps {
  item: TODO;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ item }) => {
  const height = useSharedValue(48);
  const translateRow = useSharedValue(0);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState<
    Partial<TODO> | undefined
  >();
  const queryClient = useQueryClient();

  const UpdateMutation = useMutation({
    mutationFn: (newTodo: Partial<TODO>) => {
      return axios.post(`${API_BASE_URL}/updateTodo`, newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (newTodo: Partial<TODO> | undefined) => {
      return axios.post(`${API_BASE_URL}/updateTodo`, newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleExpand = () => {
    height.value = !isExpanded ? 48 : 120;
    setIsExpanded(!isExpanded);
  };

  const handleDelete = (item: TODO) => {
    const input: Partial<TODO> = {
      id: item.id,
      isCompleted: item.isCompleted,
      title: item.title,
      description: item.description,
      isDeleted: true,
    };
    setSelectedTodo(input);
    translateRow.value = -500;
  };

  const handleUpdateTodo = (item: TODO) => {
    const input: Partial<TODO> = {
      id: item.id,
      isCompleted: !item.isCompleted,
      title: item.title,
      description: item.description,
    };
    UpdateMutation.mutate(input);
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

  const translateTowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateRow.value, { duration: 500 }, () => {
          runOnJS(deleteMutation.mutate)(selectedTodo);
        }),
      },
    ],
  }));

  return (
    <Animated.View
      style={[animatedHeight, translateTowStyle]}
      className={cn(`bg-purple-300 rounded-md shadow-lg mb-5 flex-col`)}
    >
      <View className="flex-row justify-between px-5">
        <View className="flex-row gap-2 pt-3 ">
          {item.isCompleted && (
            <Pressable onPress={() => handleUpdateTodo(item)}>
              <MaterialIcons name="task-alt" size={24} color="purple" />
            </Pressable>
          )}
          {!item.isCompleted && (
            <Pressable onPress={() => handleUpdateTodo(item)}>
              <Entypo name="circle" size={20} color="purple" />
            </Pressable>
          )}

          <Text>{item.title}</Text>
        </View>
        <View className=" flex-row gap-2 pt-3">
          <Pressable onPress={handleExpand}>
            <MaterialIcons name="expand-more" size={24} color="purple" />
          </Pressable>
          <Pressable onPress={() => handleDelete(item)}>
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
