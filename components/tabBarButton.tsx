import { TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

interface TabBarButtonProps {
  index: number;
  isFocused: boolean;
  options: any;
  onPress: () => void;
  onLongPress: () => void;
  label: string;
}
const TabBarButton: React.FC<TabBarButtonProps> = ({
  index,
  isFocused,
  options,
  onPress,
  onLongPress,
  label,
}) => {
  const width = useSharedValue(48);

  const opcityAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(width.value, [48, 96], [0, 1], {
        extrapolateRight: "clamp",
      }),
    };
  });

  const animatedWidth = useAnimatedStyle(() => ({
    width: width.value,
  }));

  React.useEffect(() => {
    if (isFocused) {
      width.value = withTiming(96, { duration: 300 });
    } else {
      width.value = withTiming(48, { duration: 300 });
    }
  }, [isFocused]);

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
        <Animated.View
          style={animatedWidth}
          className="items-center flex-row bg-purple-600 rounded-full h-12 p-3"
        >
          <FontAwesome5
            name="tasks"
            size={20}
            color={isFocused ? "purple" : "#c084fc"}
          />
          {isFocused && (
            <Animated.Text
              style={opcityAnimatedStyle}
              className="text-xs text-purple-300 ml-2"
            >
              All Todos
            </Animated.Text>
          )}
        </Animated.View>
      ) : label === "Completed Todos" ? (
        <Animated.View
          style={animatedWidth}
          className="items-center flex-row bg-purple-600 rounded-full h-12 p-3"
        >
          <MaterialIcons
            name="task-alt"
            size={24}
            color={isFocused ? "purple" : "#c084fc"}
          />
          {isFocused && (
            <Animated.Text
              style={opcityAnimatedStyle}
              className="text-xs text-purple-300 ml-2"
            >
              Done
            </Animated.Text>
          )}
        </Animated.View>
      ) : label === "Deleted Todos" ? (
        <Animated.View
          style={animatedWidth}
          className="items-center justify-center flex-row bg-purple-600 rounded-full h-12 p-3"
        >
          <FontAwesome
            name="tasks"
            size={24}
            color={isFocused ? "purple" : "#c084fc"}
          />
          {isFocused && (
            <Animated.Text
              style={opcityAnimatedStyle}
              className="text-xs text-purple-300 ml-2"
            >
              Deleted
            </Animated.Text>
          )}
        </Animated.View>
      ) : null}
    </TouchableOpacity>
  );
};

export default TabBarButton;
