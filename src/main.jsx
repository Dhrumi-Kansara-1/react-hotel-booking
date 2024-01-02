import "./index.css"
import React from "react"
import App from "./App.jsx"
import ReactDOM from "react-dom/client"
import { SearchContextProvider } from "./context/SearchContext.jsx"
import { AuthContextProvider } from "./context/authContext.jsx"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchContextProvider>
      <AuthContextProvider>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    </SearchContextProvider>
  </React.StrictMode>
)
