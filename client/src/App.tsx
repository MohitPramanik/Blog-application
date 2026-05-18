import "./App.css";
import AppRoutes from "./AppRoutes";
import { Provider } from 'react-redux'
import { store } from "./store/store";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./utils/ErrorBoundary";
import { Suspense } from "react";
import AuthInitializer from "./utils/AuthInitializer";
import Loader from "./components/Loader";

export default function App() {

  return (
    <Provider store={store}>
      <AuthInitializer>
        <ErrorBoundary fallback={<ErrorFallback />} onReset={() => { }}>
          <Suspense fallback={<Loader />}>
            <AppRoutes />
          </Suspense>
        </ErrorBoundary>
      </AuthInitializer>
    </Provider>
  )
}
