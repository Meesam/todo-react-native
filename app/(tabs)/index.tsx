import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTodos } from "@/service/todo";
import TodoListItem from "@/components/todoListItem";
import { FontAwesome } from "@expo/vector-icons";
import Search from "@/components/search";

const AllTodos = () => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const handleOnRefresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    setIsRefreshing(false);
  };

  return (
    <View className="flex-1 bg-purple-100 p-5">
      <View className="mb-5">
        <Search />
      </View>

      {isLoading && <ActivityIndicator size="large" color="purple" />}
      {isError && (
        <View className="bg-purple-300 rounded-md pb-3 flex-row items-center gap-3">
          <FontAwesome name="minus-circle" size={24} color={"purple"} />
          <Text>Couldn't fetch todos!!</Text>
        </View>
      )}
      {todos && todos.length > 0 && (
        <FlatList
          data={todos}
          renderItem={({ item }) => {
            return <TodoListItem item={item} fromDelete={false} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleOnRefresh}
            />
          }
        />
      )}
    </View>
  );
};

export default AllTodos;
