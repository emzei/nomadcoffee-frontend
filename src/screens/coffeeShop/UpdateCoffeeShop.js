import styled from "styled-components";
import routes from "../../routes";
import PageTitle from "../../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import BaseLayout from "../../components/coffeeShop/BaseLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormBox from "../../components/coffeeShop/FormBox";
import Input from "../../components/coffeeShop/Input";
import FormError from "../../components/coffeeShop/FormError";
const Button = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 2px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 2px 0px;
  font-weight: 200;
  width: 50%;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubtitleTop = styled.span`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
  color: rgb(142, 142, 142);
`;
const SubtitleBottom = styled.span`
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  color: rgb(142, 142, 142);
`;
const SEE_COFEE_SHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      latitude
      longitude
      createdAt
    }
  }
`;

const EDIT_COFFEE_SHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $photo: Upload
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      photo: $photo
    ) {
      ok
      error
      shopId
    }
  }
`;
function UpdateCoffeeShop() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [qid, setQId] = useState(0);
  
  const {
    register,
    watch,
    handleSubmit,
    formState,
    setError,
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (id){
      setQId(parseInt(id));
    }
  }, [id])
  
  const setupInfo = (data) =>{
    console.log(data);
    if (data?.seeCoffeeShop){
      console.log(data.seeCoffeeShop);
      setValue("name", data.seeCoffeeShop.name);
      setValue("latitude", data.seeCoffeeShop.latitude);
      setValue("longitude", data.seeCoffeeShop.longitude);
      clearErrors("name");
      clearErrors("latitude");
      clearErrors("longitude");

    }
  }
  const { rloading, rerror, rdata } = useQuery(SEE_COFEE_SHOP_QUERY, {
    variables: { id:qid },
    onCompleted: setupInfo,
  });

  const onCompleted = (data) => {
    const { name } = getValues();

    const {
      editCoffeeShop: {ok, error, shopId },
    } = data;
    if (!ok) {
      return ;
    }
    navigate(routes.home);
    window.location.reload();

  };

  const [ editCoffeeShop, { eloading }] = useMutation(EDIT_COFFEE_SHOP_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    //console.log(data, "val");
    console.log(eloading);
    if (eloading) {
      return;
    }

    console.log(data);

    editCoffeeShop({
      variables: {
        ...data,
        id:qid,
      },
    });
  };

  return (
    <BaseLayout>
      <PageTitle title="Edit coffee shop" />
      <FormBox>
        <HeaderContainer>Edit a coffee shop
        </HeaderContainer>
        <div></div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("name", {
              required: "Name is Required",
              minLength: {
                value: 3,
                message: "Name should be longer than 3 chars.",
              },
            })}
            type="text"
            placeholder="Coffee Shop Name"
            hasError={Boolean(formState.errors?.name?.message)}
          />
          <FormError message={formState.errors?.name?.message} />
          <Input
            {...register("latitude", { required: "Latitude is Required" })}
            type="text"
            placeholder="Latitude"
            hasError={Boolean(formState.errors?.latitude?.message)}
          />
          <FormError message={formState.errors?.latitude?.message} />
          <Input
            {...register("longitude", { required: "Longitude is Required" })}
            type="text"
            placeholder="Longitude"
            hasError={Boolean(formState.errors?.longitude?.message)}
          />
          <FormError message={formState.errors?.longitude?.message} />

          <Button
            type="submit"
            value={eloading ? "Loading..." : "Update shop info"}
            disabled={!formState.isValid || eloading}
          />
        </form>
        <div></div>
      </FormBox>
    </BaseLayout>
  );
}

export default UpdateCoffeeShop;
