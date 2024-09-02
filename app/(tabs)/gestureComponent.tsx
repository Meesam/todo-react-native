import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";

const GestureComponent = () => {
  const offset = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (event.translationX < 0) {
        offset.value = event.translationX;
      }

      console.log(event.translationX);
    })
    .onFinalize((event) => {
      if (event.translationX > -92) {
        offset.value = withSpring(0);
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
    borderRadius: interpolate(
      offset.value,
      [0, -10, -12, -15],
      [0, 0, 5, 15],
      {}
    ),
  }));

  const handleCancel = () => {
    offset.value = withSpring(0);
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-purple-100 pt-5 relative">
      <View className=" bg-red-500">
        <GestureDetector gesture={pan}>
          <Animated.View
            className="h-14 w-full bg-purple-400 z-10"
            style={animatedStyles}
          />
        </GestureDetector>
      </View>
      <View className="h-14 left-[380] bottom-10">
        <Pressable onPress={handleCancel}>
          <FontAwesome name="close" size={20} color={"black"} />
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
};

export default GestureComponent;
