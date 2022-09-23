import { isLoggedInVar, darkModeVar } from "../apollo";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div`
`;
function Login() {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => isLoggedInVar(true)}>Log in now!</button>
      <button onClick={() => darkModeVar(true)}>Dark Mode Off</button>
      <button onClick={() => darkModeVar(false)}>Dark Mode On</button>
    </Container>
  );
}

export default Login;
