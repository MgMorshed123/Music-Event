import { StrictMode, Component } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="text-center text-2xl text-white mt-10">
          Something went wrong.
        </h1>
      );
    }
    return this.props.children;
  }
}

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
