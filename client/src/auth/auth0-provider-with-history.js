//What is happening within Auth0ProviderWithHistory?
//
//You need the Auth0 React SDK to connect with the correct Auth0 Application to process authentication. As such, you need to Auth0 Domain and Client ID to configure the Auth0Provider.
//
//You use the onRedirectCallback() method to handle the event where Auth0 redirects your users from the Auth0 Universal Login page to your React application. You use the useHistory() hook to get the history object from React Router. You use the history.push() method to take users back to the route they intended to access before authentication.

import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`${window.location.origin}/app`}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;