import { ApolloClient, InMemoryCache, makeVar, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  window.location.reload();
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

// Authenticate using HTTP header
const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://emzei-backend.herokuapp.com/graphql"
      : "http://localhost:1234/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});


export const client = new ApolloClient({
  uri: "https://emzei-backend.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  connectToDevTools: true,
});
