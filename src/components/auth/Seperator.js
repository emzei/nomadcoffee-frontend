import styled from "styled-components";

const SSeperator = styled.div`
  margin: 20px 0px 20px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 10px 10px;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`;

function Seperator(){
    return (
        <SSeperator>
        <div></div>
        <span>Or</span>
        <div></div>
      </SSeperator>
    )      ;
}

export default Seperator;