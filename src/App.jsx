import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "./components/ui/button";
import { AppRoutes } from "./Routes";
import CustomErrorBoundary from "./components/molecules/CustormErrorBoundary/CustomErrorBoundary";
import ProblematicComponent from "./components/atoms/TestingComponent/ProblematicComponent";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CustomErrorBoundary>
        <ProblematicComponent shouldThrowError={true} />
        <AppRoutes />
      </CustomErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
