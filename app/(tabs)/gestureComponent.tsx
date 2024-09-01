import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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
  }));

  const handleCancel = () => {
    offset.value = withSpring(0);
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-purple-100 pt-5">
      <View className=" bg-red-500">
        <GestureDetector gesture={pan}>
          <Animated.View
            className="h-14 w-full bg-purple-400 z-10 absolute"
            style={animatedStyles}
          />
        </GestureDetector>
        <View className="h-14 w-20 bg-gray-600 rounded-md items-center justify-center relative right-0 z-0">
          <Pressable onPress={handleCancel}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default GestureComponent;
