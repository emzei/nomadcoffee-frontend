import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  darkModeVar,
  disableDarkMode,
  enableDarkMode,
  logUserOut,
} from "../../apollo";
import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";

const Container = styled.div`
  display: flex;
  height: 60vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;
const Footer = styled.footer`
  margin-top: 20px;
`;
const TopBar = styled.table`
  margin: 20px;
  flex-direction: row;
  td {
    margin: 10px;
    padding: 10px;
  }
`;
const DarkModeBtn = styled.span`
  cursor: pointer;
`;

function BaseLayout({ children }) {
  const darkMode = useReactiveVar(darkModeVar);
  const navigate = useNavigate();
  return (
    <Container>
      <div>
        <TopBar>
          <tbody>
            <tr>
              <td>
                <button onClick={() => logUserOut()}>Log out now!</button>
              </td>
              <td><button onClick={() => navigate(routes.home)}>Shop List</button></td>
              <td><button onClick={() => navigate(routes.home+routes.addCoffeeShop)}>Create a Shop</button></td>
            </tr>
          </tbody>
        </TopBar>
      </div>

      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}

export default BaseLayout;
