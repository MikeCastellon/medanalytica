import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AuthProvider } from "./Hooks/AuthContext";
import { CustomRouter } from "./Router/CustomRouter";
import { DescriptionModalProvider } from "./Hooks/DescriptionModal";
import { Modal } from "./Common/Modals/Modal";

const queryClient = new QueryClient({
  queryCache: new QueryCache({}),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DescriptionModalProvider>
          <CustomRouter />
          <Modal />
        </DescriptionModalProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
