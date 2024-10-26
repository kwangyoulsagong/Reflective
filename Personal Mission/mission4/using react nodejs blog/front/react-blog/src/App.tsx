import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import StartRoutes from "./routes/StartRoutes";
import PageRoutes from "./routes/PageRoutes";
function App() {
  // QueryClient 인스턴스를 생성합니다
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 30, // 30분
      },
    },
  });
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* routes 폴더에 nested route로 관리  */}
        <StartRoutes />
        <PageRoutes />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
