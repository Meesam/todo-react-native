import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TODO } from "@/types/todoType";
import { API_BASE_URL } from "@/service/todo";

const AddNewTodo = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: Partial<TODO>) => {
      return axios.post(`${API_BASE_URL}/addNew`, newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = () => {
    const input: Partial<TODO> = {
      title: title,
      description: description,
    };
    mutation.mutate(input);
    setTitle("");
    setDescription("");
  };

  return (
    <View className="flex-1 justify-center items-center bg-purple-100 px-12">
      <View className="bg-purple-200 h-auto w-full p-10 flex-col rounded-md">
        <TextInput
          className="border border-purple-400 rounded-md p-2 w-full mb-5"
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          className="border border-purple-400 rounded-md p-2 w-full h-28 mb-5"
          placeholder="Description"
          multiline={true}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Button title="Add New Todo" color={"purple"} onPress={handleAddTodo} />
      </View>
    </View>
  );
};

export default AddNewTodo;
