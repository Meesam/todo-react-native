import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "All Todos",
          tabBarIcon: () => (
            <FontAwesome5 name="tasks" size={24} color={"purple"} />
          ),
          tabBarActiveTintColor: "purple",
        }}
      />
      <Tabs.Screen
        name="completedTodo"
        options={{
          title: "Completed Todos",
          tabBarIcon: () => (
            <MaterialIcons name="task-alt" size={24} color="purple" />
          ),
          tabBarActiveTintColor: "purple",
        }}
      />
      <Tabs.Screen
        name="deletedTodo"
        options={{
          title: "Deleted Todos",
          tabBarIcon: () => (
            <FontAwesome name="tasks" size={24} color={"purple"} />
          ),
          tabBarActiveTintColor: "purple",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
