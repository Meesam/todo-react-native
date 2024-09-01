import TodoListItem from "@/components/todoListItem";
import { TODO } from "@/types/todoType";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render } from "@testing-library/react-native";
import "@testing-library/react-native/extend-expect";

describe("TodoListItem", () => {
  let todoItem: TODO = {
    id: 1,
    title: "test Title",
    description: "test description",
    isCompleted: false,
    isDeleted: false,
    createdDate: "",
    lastModifiedDate: "",
  };

  test("render withoutError", () => {
    const component = (
      <QueryClientProvider client={new QueryClient()}>
        <TodoListItem item={todoItem} />
      </QueryClientProvider>
    );
    const { getByTestId } = render(component);
    getByTestId("todoRow");
  });

  test("render fields withoutError", () => {
    const component = (
      <QueryClientProvider client={new QueryClient()}>
        <TodoListItem item={todoItem} />
      </QueryClientProvider>
    );
    const { getByTestId, getByText } = render(component);
    const titleElement = getByTestId("todoTitle");
    const descriptionElement = getByTestId("todoDescription");
    const expandButtonElement = getByTestId("expandButton");
    const updateButtonElement = getByTestId("updateButton");
    const deleteButtonElement = getByTestId("deleteButton");
    expect(titleElement).toBeTruthy();
    expect(descriptionElement).toBeTruthy();
    expect(expandButtonElement).toBeTruthy();
    expect(updateButtonElement).toBeTruthy();
    expect(deleteButtonElement).toBeTruthy();
    expect(titleElement).toHaveTextContent("test Title");
    expect(descriptionElement).toHaveTextContent("test description");
    fireEvent.press(expandButtonElement);
  });

  test("PressUpdate button", () => {
    const onPressMockUpdate = jest.fn();
    const component = (
      <QueryClientProvider client={new QueryClient()}>
        <TodoListItem item={todoItem} />
      </QueryClientProvider>
    );
    const { getByTestId } = render(component);
    const updateButtonElement = getByTestId("updateButton");
    const deleteButtonElement = getByTestId("deleteButton");

    //expect(updateButtonElement).toBeTruthy();
    //expect(deleteButtonElement).toBeTruthy();

    fireEvent.press(updateButtonElement);
    //expect(onPressMockUpdate).toHaveBeenCalled();

    //fireEvent.press(updateButtonElement, todoItem);
    //expect(onPressMockUpdate).toHaveBeenCalled();
    //expect(onPressMockUpdate).toHaveBeenCalledWith(todoItem);
  });
});
