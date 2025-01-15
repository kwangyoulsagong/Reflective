import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import StartRoutes from "./routes/StartRoutes";
import PageRoutes from "./routes/PageRoutes";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "./components/errorboundary/ErrorBoundary";
import Error from "./components/error/Error";
import QueryClientProvider from "./provider/QueryClientProvider/QueryClientProvider";
function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary Fallback={Error}>
        <Router>
          <QueryClientProvider>
            {/* routes 폴더에 nested route로 관리 */}
            <StartRoutes />
            <PageRoutes />
          </QueryClientProvider>
        </Router>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
