import { View, Text } from "react-native";
import React from "react";
import Search from "./search";
import { Link } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

const Header = () => {
  return (
    <Animated.View className="h-40 bg-purple-200 z-10 w-full items-stretch justify-end">
      <View className="p-5">
        <Text className=" text-xl font-bold text-purple-600 mb-3">
          All Todo
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="w-[90%]">
            <Search />
          </View>
          <View>
            <Link href="/addNewTodo">
              <FontAwesome5 name="plus" size={20} color={"purple"} />
            </Link>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default Header;
