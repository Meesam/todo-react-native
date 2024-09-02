import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";

const GestureComponent = () => {
  const offset = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (event.translationX < 0) {
        offset.value = event.translationX;
      }
    })
    .onFinalize((event) => {
      if (event.translationX > -200) {
        offset.value = withTiming(0, { duration: 500 });
      } else {
        offset.value = withTiming(-500, { duration: 500 });
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
    borderRadius: interpolate(offset.value, [0, -3], [0, 10], {
      extrapolateRight: "clamp",
    }),
  }));

  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, [0, -37], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    }),
  }));

  const handleCancel = () => {
    offset.value = withTiming(0, { duration: 500 });
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-purple-100 pt-5">
      <View className=" bg-red-500">
        <GestureDetector gesture={pan}>
          <Animated.View
            className="h-14 w-full bg-purple-400 justify-center pl-5 z-10"
            style={animatedStyles}
          >
            <Text>Title</Text>
          </Animated.View>
        </GestureDetector>
      </View>
      <Animated.View style={opacity} className="h-14 left-[380] bottom-10 z-0">
        <Pressable onPress={handleCancel}>
          <FontAwesome name="close" size={20} color={"black"} />
        </Pressable>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default GestureComponent;
