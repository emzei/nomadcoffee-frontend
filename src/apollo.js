import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";


const TOKEN = "token";

 export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

 export const logUserIn = (token) => {
   localStorage.setItem(TOKEN, token);
   window.location.reload();
 };

 export const logUserOut = () => {
   localStorage.removeItem(TOKEN);
   isLoggedInVar(false);
 };

 export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
    uri: "http://localhost:1234/graphql",
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

