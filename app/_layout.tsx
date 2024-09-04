import { Stack } from "expo-router";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="addNewTodo"
          options={{
            title: "Add New Todo",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#e9d5ff" },
            headerBackTitleStyle: { fontSize: 20 },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "700",
              color: "#9333ea",
            },
            headerTintColor: "#9333ea",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
