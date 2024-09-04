import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCompletedTodos } from "@/service/todo";
import TodoListItem from "@/components/todoListItem";
import { FontAwesome } from "@expo/vector-icons";
import Header from "@/components/header";
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CompletedTodos = () => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const translateY = useSharedValue(0);

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["completed-todos"],
    queryFn: fetchCompletedTodos,
  });

  const handleOnRefresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ["completed-todos"] });
    setIsRefreshing(false);
  };
  const animatedHeader = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -translateY.value }],
      opacity: interpolate(translateY.value, [0, 44], [1, 0], {
        extrapolateLeft: Extrapolation.CLAMP,
      }),
    };
  });

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    translateY.value = withTiming(event.nativeEvent.contentOffset.y, {
      duration: 200,
    });
  };

  return (
    <View className="flex-1 bg-purple-100">
      {isLoading && <ActivityIndicator size="large" color="purple" />}
      {isError && (
        <View className="bg-purple-300 rounded-md pb-3 flex-row items-center gap-3">
          <FontAwesome name="minus-circle" size={24} color={"purple"} />
          <Text>Couldn't fetch todos!!</Text>
        </View>
      )}
      {todos && todos.length > 0 && (
        <FlatList
          onScroll={handleOnScroll}
          data={todos}
          renderItem={({ item }) => {
            return <TodoListItem item={item} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleOnRefresh}
            />
          }
          ListHeaderComponent={() => (
            <Header animatedHeader={animatedHeader} title="Completed Todos" />
          )}
        />
      )}
    </View>
  );
};

export default CompletedTodos;
