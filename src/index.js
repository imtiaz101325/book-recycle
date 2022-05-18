import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { AmplifyProvider, Authenticator, View } from "@aws-amplify/ui-react";

import App from "./App";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AmplifyProvider>
      <Authenticator.Provider>
        <View>
          <App />
        </View>
      </Authenticator.Provider>
    </AmplifyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
