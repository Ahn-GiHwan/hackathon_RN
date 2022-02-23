import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import Stack from "./navigation/Stack";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
