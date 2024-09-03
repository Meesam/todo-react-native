import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const Search = () => {
  const [query, setQuery] = React.useState("");

  const handleSearch = (text: string) => {
    setQuery(text);
  };

  return (
    <View className="flex-row justify-between">
      <TextInput
        placeholder="Search Todo"
        className="rounded-md px-5 py-2 border-purple-300 border text-base w-full"
        autoCapitalize="none"
        onChangeText={handleSearch}
        value={query}
        placeholderTextColor={"purple"}
      />
      {query != "" && (
        <TouchableOpacity
          className=" justify-center items-center right-8"
          onPress={() => setQuery("")}
        >
          <FontAwesome
            name="close"
            size={18}
            color={"purple"}
            className=" font-thin"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;
