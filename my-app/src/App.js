import Autocomplete from "./components/Autocomplete";
import items from "./mock-data";
import "./App.css";
import { useState } from "react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOptions } from "./utils/http";

function App() {
  const [debouncedInput, setDebouncedInput] = useState("");
  const { data } = useQuery({
    queryKey: ["options", { search: debouncedInput }],
    queryFn: ({ signal }) => fetchOptions({ signal, debouncedInput }),
    staleTime: 50000,
    gcTime: 100000,
    enabled: debouncedInput !== "",
  });

  function debounce(func, timeout = 1000) {
    let timer;
    return (value) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func(value);
      }, timeout);
    };
  }

  const getSuggestions = debounce((input) => setDebouncedInput(input), 1000);

  return (
    <div className="App">
      <Autocomplete options={data} getOptions={getSuggestions} />
    </div>
  );
}

export default App;
