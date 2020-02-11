import React, { useReducer } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { RenderRoutes, routes } from "./router";
import { Container, Menu } from "semantic-ui-react";
import { initialState, stateContext, stateReducer } from "./store";

const App = () => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const navItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" }
  ].map((item, idx) => (
    <Menu.Item as={Link} key={idx} to={item.link}>
      {item.label}
    </Menu.Item>
  ));

  return (
    <div>
      <stateContext.Provider value={{ state, dispatch }}>
        <Router>
          <Container>
            <Menu size="large" secondary pointing items={navItems} />
          </Container>
          <RenderRoutes routes={routes} />
        </Router>
      </stateContext.Provider>
    </div>
  );
};

export default App;
