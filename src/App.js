import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { client } from "./apollo";
import CoffeeShopList from "./screens/coffeeShop/CoffeeShopList";
import CreateCoffeeShop from "./screens/coffeeShop/CreateCoffeeShop";
import UpdateCoffeeShop from "./screens/coffeeShop/UpdateCoffeeShop";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Routes>
              <Route path={routes.home}>
                <Route index element={isLoggedIn ? <CoffeeShopList /> : <Login />} />
                <Route path={routes.signUp} element={<SignUp />} />
                <Route path={routes.addCoffeeShop} element={isLoggedIn ? <CreateCoffeeShop /> : <Login/>} />
                <Route path={routes.updateCofeeShop} element={isLoggedIn ? <UpdateCoffeeShop /> : <Login/>} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
