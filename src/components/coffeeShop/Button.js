import styled from "styled-components";

const Button = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 2px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 2px 0px;
  font-weight: 200;
  width: 10%;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

export default Button;