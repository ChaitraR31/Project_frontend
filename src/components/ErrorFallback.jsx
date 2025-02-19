import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div role="alert" style={{ color: "red", border: "1px solid red", padding: "10px" }}>
            <h2>Oops! Something went wrong.</h2>
            <p>{error.message}</p>
            <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
    );
};

export default ErrorFallback;
