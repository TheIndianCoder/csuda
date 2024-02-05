import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css";
import { MaterialTailwindControllerProvider } from "@/Dashboard/context";
import i18n from "./i18next"
// import { Beforeunload } from "react-beforeunload";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={(<div>Loading ....</div>)}>
    <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          {/* <Beforeunload onBeforeunload={(event) => window.alert("oops")} > */}
          <App />
          {/* </Beforeunload> */}
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
  </Suspense>
);
