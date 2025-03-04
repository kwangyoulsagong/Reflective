import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "./errorboundary/ErrorBoundary";
import QueryClientProvider from "./provider/QueryClientProvider/QueryClientProvider";
import StartRoutes from "./routes/StartRoutes";
import PageRoutes from "./routes/PageRoutes";
import Error from "./error/Error";
import { ToastProvider } from "../shared/Toast/Provider/ToastContext";

function App() {
  return (
    <ToastProvider>
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
    </ToastProvider>
  );
}

export default App;
