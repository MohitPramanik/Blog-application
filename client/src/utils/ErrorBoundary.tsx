import type React from "react";

type ErrorFallbackProps = {
    error?: Error;
    resetErrorBoundary?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary}) => {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
        <div role= "alert">
            <p>Something went wrong: </p>
            <pre> { error?.message } </pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
  );
}

export default ErrorFallback;