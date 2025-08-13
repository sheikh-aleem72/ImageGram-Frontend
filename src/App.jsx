import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "./components/ui/button";
import { AppRoutes } from "./Routes";
import CustomErrorBoundary from "./components/molecules/CustormErrorBoundary/CustomErrorBoundary";
import { Toaster } from "./components/ui/sonner";
import { ModalRoot } from "./components/molecules/Modal/ModalRoot/ModalRoot";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CustomErrorBoundary>
        <AppRoutes />
        <Toaster />
        <ModalRoot />
      </CustomErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
