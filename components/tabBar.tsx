import { View } from "react-native";
import React from "react";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

import TabBarButton from "./tabBarButton";

interface TabBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: any;
}

const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View className="flex-row justify-between bg-purple-500 p-2 rounded-full absolute bottom-7 mx-3 ">
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
            <TabBarButton
              key={index}
              options={options}
              label={label}
              index={index}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
            />
          );
        }
      )}
    </View>
  );
};

export default TabBar;
