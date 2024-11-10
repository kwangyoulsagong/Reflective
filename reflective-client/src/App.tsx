import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import StartRoutes from "./routes/StartRoutes";
import PageRoutes from "./routes/PageRoutes";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "./components/errorboundary/ErrorBoundary";
import Error from "./components/error/Error";
function App() {
  // QueryClient 인스턴스를 생성합니다
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* routes 폴더에 nested route로 관리  */}
        <ErrorBoundary Fallback={Error}>
          <RecoilRoot>
            <StartRoutes />
            <PageRoutes />
          </RecoilRoot>
        </ErrorBoundary>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
