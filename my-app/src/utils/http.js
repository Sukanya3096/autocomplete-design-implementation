export async function fetchOptions({ signal, debouncedInput }) {
  let url = "http://localhost:3000/options";
  if (debouncedInput) {
    url += "?search=" + debouncedInput;
  }
  const result = await fetch(url, { signal: signal });
  if (!result.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = result.status;
    error.info = await result.json();
    throw error;
  }
  const { options } = await result.json();

  return options;
}
