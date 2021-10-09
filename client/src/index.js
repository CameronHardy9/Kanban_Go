import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <App />
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);