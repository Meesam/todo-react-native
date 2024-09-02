import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

interface TabBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: any;
}

const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View className="flex-row justify-between bg-purple-500 p-3 rounded-full absolute bottom-7 mx-3 ">
      {state.routes.map(
        (route: { key: string | number; name: any }, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 items-center justify-center"
            >
              {label === "All Todos" ? (
                <FontAwesome5
                  name="tasks"
                  size={20}
                  color={isFocused ? "purple" : "#c084fc"}
                />
              ) : label === "Completed Todos" ? (
                <MaterialIcons
                  name="task-alt"
                  size={24}
                  color={isFocused ? "purple" : "#c084fc"}
                />
              ) : label === "Deleted Todos" ? (
                <FontAwesome
                  name="tasks"
                  size={24}
                  color={isFocused ? "purple" : "#c084fc"}
                />
              ) : label === "Gesture" ? (
                <FontAwesome5
                  name="user"
                  size={20}
                  color={isFocused ? "purple" : "#c084fc"}
                />
              ) : null}
            </TouchableOpacity>
          );
        }
      )}
    </View>
  );
};

export default TabBar;
