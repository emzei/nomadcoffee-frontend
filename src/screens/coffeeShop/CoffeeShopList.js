import styled from "styled-components";
import routes from "../../routes";
import PageTitle from "../../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import BaseLayout from "../../components/coffeeShop/BaseLayout";
import { useEffect, useState } from "react";
import { darkModeVar, isLoggedInVar } from "../../apollo";
import { useNavigate } from "react-router-dom";

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

const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShops($lastId: Int) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
      createdAt
    }
  }
`;

function CoffeeShopList() {
  const navigate = useNavigate();
  //const location = useLocation();

  const [lastId, setLastId] = useState(0);

  const { loading, error, data } = useQuery(SEE_COFFEE_SHOPS_QUERY, {
    variables: { lastId },
  });

  const ShopList = () => {
    if (data?.seeCoffeeShops?.length === 0) {
      return <div></div>;
    }
    return (
      <>
        <div>
          {data?.seeCoffeeShops.map((obj) => {
            const url = "/shop/" + obj.id;
            return (
              <li key={obj.id}>
                Shop ID: {obj.id} / Shop Name : {obj.name} /{" "}
                <Button
                value={"Edit"} 
                onClick={()=>navigate(url)}
                readOnly
                />
              </li>
            );
          })}
        </div>
      </>
    );
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!loading && !error) {
    console.log(data);
  }

  return (
    <BaseLayout>
      <PageTitle title="Log-in" />
      <ShopList />
    </BaseLayout>
  );
}

export default CoffeeShopList;
