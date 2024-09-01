import AddNewTodo from "@/app/addNewTodo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react-native";

describe("AddNewTodo", () => {
  test("render withoutError", () => {
    const component = (
      <QueryClientProvider client={new QueryClient()}>
        <AddNewTodo />
      </QueryClientProvider>
    );
    const { getByTestId } = render(component);
    getByTestId("addNewTodo");
  });

  test("render fields without Error", () => {
    const component = (
      <QueryClientProvider client={new QueryClient()}>
        <AddNewTodo />
      </QueryClientProvider>
    );
    const { getByTestId } = render(component);
    getByTestId("title");
    getByTestId("description");
    getByTestId("addNewTodoButton");
  });

  test("can enter title and description", () => {
    const component = (
      <QueryClientProvider client={new QueryClient()}>
        <AddNewTodo />
      </QueryClientProvider>
    );

    const screen = render(component);
    const titleElement = screen.getByTestId("title");
    fireEvent.changeText(titleElement, "Hello");
    expect(screen.getByDisplayValue("Hello")).toBeTruthy();

    const descriptionElement = screen.getByTestId("description");
    fireEvent.changeText(descriptionElement, "Hello desc");
    expect(screen.getByDisplayValue("Hello desc")).toBeTruthy();
  });
});
