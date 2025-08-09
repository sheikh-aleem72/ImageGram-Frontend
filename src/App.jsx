import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "./components/ui/button";
import { AppRoutes } from "./Routes";
import CustomErrorBoundary from "./components/molecules/CustormErrorBoundary/CustomErrorBoundary";
import { Toaster } from "./components/ui/sonner";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CustomErrorBoundary>
        <AppRoutes />
        <Toaster />
      </CustomErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
