import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import StartRoutes from "./routes/StartRoutes";
function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* routes 폴더에 nested route로 관리  */}
        <StartRoutes />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
