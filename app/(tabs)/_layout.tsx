import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerRight: (props) => {
          return (
            <View className="pr-5">
              <Link href="/addNewTodo">
                <FontAwesome5 name="plus" size={20} color={"purple"} />
              </Link>
            </View>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "All Todos",
          tabBarIcon: (props) => (
            <FontAwesome5
              name="tasks"
              size={24}
              color={props.focused ? "purple" : "gray"}
            />
          ),
          tabBarActiveTintColor: "purple",
        }}
      />
      <Tabs.Screen
        name="completedTodo"
        options={{
          title: "Completed Todos",
          tabBarIcon: (props) => (
            <MaterialIcons
              name="task-alt"
              size={24}
              color={props.focused ? "purple" : "gray"}
            />
          ),
          tabBarActiveTintColor: "purple",
        }}
      />
      <Tabs.Screen
        name="deletedTodo"
        options={{
          title: "Deleted Todos",
          tabBarIcon: (props) => (
            <FontAwesome
              name="tasks"
              size={24}
              color={props.focused ? "purple" : "gray"}
            />
          ),
          tabBarActiveTintColor: "purple",
        }}
      />
      <Tabs.Screen
        name="gestureComponent"
        options={{
          title: "Gesture",
          tabBarIcon: (props) => (
            <FontAwesome
              name="user"
              size={24}
              color={props.focused ? "purple" : "gray"}
            />
          ),
          tabBarActiveTintColor: "purple",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
