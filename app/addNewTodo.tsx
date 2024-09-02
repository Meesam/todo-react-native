import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TODO } from "@/types/todoType";
import { API_BASE_URL } from "@/service/todo";
import { Formik } from "formik";
import * as Yup from "yup";

const todoSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter the title"),
  description: Yup.string()
    .min(2, "Too Short!")
    .required("Please enter the description"),
});

const AddNewTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: Partial<TODO>) => {
      return axios.post(`${API_BASE_URL}/addNew`, newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = (todo: Partial<TODO>) => {
    const input: Partial<TODO> = {
      title: todo.title,
      description: todo.description,
    };
    mutation.mutate(input);
  };

  return (
    <Formik
      initialValues={
        {
          title: "",
          description: "",
        } as Partial<TODO>
      }
      validationSchema={todoSchema}
      onSubmit={(values: Partial<TODO>) => {
        handleAddTodo(values);
      }}
    >
      {({
        errors,
        touched,
        values,
        handleSubmit,
        handleChange,
        setFieldTouched,
        isValid,
      }) => (
        <View
          className="flex-1 justify-center items-center bg-purple-100 px-12"
          testID="addNewTodo"
        >
          <View className="bg-purple-200 h-auto w-full p-10 flex-col rounded-md">
            <View className="mb-5">
              <TextInput
                className="border border-purple-400 rounded-md p-2 w-full"
                placeholder="Title"
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={() => setFieldTouched("title")}
                testID="title"
              />
              {errors.title && touched.title && (
                <Text className="text-red-500 text-xs">{errors.title}</Text>
              )}
            </View>

            <View className="mb-5">
              <TextInput
                className="border border-purple-400 rounded-md p-2 w-full h-28"
                placeholder="Description"
                multiline={true}
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={() => setFieldTouched("description")}
                testID="description"
              />
              {errors.description && touched.description && (
                <Text className="text-red-500 text-sm">
                  {errors.description}
                </Text>
              )}
            </View>

            <TouchableOpacity
              className="bg-purple-400 rounded-md p-2 w-full items-center"
              testID="addNewTodoButton"
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text className=" text-lg text-white font-semibold">Add New</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AddNewTodo;
