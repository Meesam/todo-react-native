import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TODO } from "@/types/todoType";
import { cn } from "@/utils/classMerge";
import Entypo from "@expo/vector-icons/Entypo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "@/service/todo";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface TodoListItemProps {
  item: TODO;
  fromDelete?: boolean;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ item, fromDelete }) => {
  const height = useSharedValue(48);
  const offset = useSharedValue<number>(0);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const queryClient = useQueryClient();

  const UpdateMutation = useMutation({
    mutationFn: (newTodo: Partial<TODO>) => {
      return axios.post(`${API_BASE_URL}/updateTodo`, newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["completed-todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (newTodo: Partial<TODO> | undefined) => {
      return axios.post(`${API_BASE_URL}/updateTodo`, newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["deleted-todos"] });
    },
  });

  const handleExpand = () => {
    height.value = !isExpanded ? 48 : 120;
    setIsExpanded(!isExpanded);
  };

  const handleUpdateTodo = (item: TODO) => {
    const input: Partial<TODO> = {
      id: item.id,
      isCompleted: !item.isCompleted,
      title: item.title,
      description: item.description,
    };
    if (!fromDelete) {
      UpdateMutation.mutate(input);
    }
  };

  const animatedHeight = useAnimatedStyle(() => ({
    height: withTiming(height.value, { duration: 500 }),
    transform: [{ translateX: fromDelete ? 0 : offset.value }],
  }));

  const animatedText = useAnimatedStyle(() => ({
    opacity: withTiming(
      interpolate(height.value, [48, 80, 100, 120], [0, 0, 0, 1]),
      {
        duration: 500,
      }
    ),
  }));

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (event.translationX < 0) {
        offset.value = event.translationX;
      }
    })
    .onFinalize((event) => {
      if (event.translationX > -200) {
        offset.value = withTiming(0, { duration: 500 });
      } else {
        offset.value = withTiming(-500, { duration: 500 }, () => {
          runOnJS(deleteMutation.mutate)({ ...item, isDeleted: true });
        });
      }
    });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={animatedHeight}
          className={cn(
            `bg-purple-300 rounded-md shadow-lg mb-[0.5] mt-3 mx-5 flex-col`
          )}
          testID="todoRow"
        >
          <View className="flex-row justify-between px-5">
            <View className="flex-row gap-2 pt-3 ">
              {item.isCompleted && (
                <TouchableOpacity
                  onPress={() => handleUpdateTodo(item)}
                  testID="updateButton"
                >
                  <MaterialIcons name="task-alt" size={24} color="purple" />
                </TouchableOpacity>
              )}
              {!item.isCompleted && (
                <TouchableOpacity
                  onPress={() => handleUpdateTodo(item)}
                  testID="updateButton"
                >
                  <Entypo name="circle" size={20} color="purple" />
                </TouchableOpacity>
              )}

              <Text testID="todoTitle">{item.title}</Text>
            </View>
            <View className=" flex-row pt-3">
              <Pressable onPress={handleExpand} testID="expandButton">
                <MaterialIcons name="expand-more" size={24} color="purple" />
              </Pressable>
            </View>
          </View>
          <View className="px-5 py-5">
            <Animated.Text testID="todoDescription" style={animatedText}>
              {item.description}
            </Animated.Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default TodoListItem;
