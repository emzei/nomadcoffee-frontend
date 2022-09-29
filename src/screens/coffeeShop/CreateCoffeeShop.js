import styled from "styled-components";
import routes from "../../routes";
import PageTitle from "../../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import BaseLayout from "../../components/coffeeShop/BaseLayout";
import { useEffect, useState } from "react";
import { darkModeVar, isLoggedInVar } from "../../apollo";
import { useNavigate } from "react-router-dom";
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
const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $photo: Upload
    $category: String
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photo: $photo
      category: $category
    ) {
      ok
      error
      shopId
    }
  }
`;
function CreateCoffeeShop() {
  let navigate = useNavigate();

  const onCompleted = (data) => {
    const { name } = getValues();

    const {
      createCoffeeShop: {ok, error, shopId },
    } = data;
    if (!ok) {
      return ;
    }
    navigate(routes.home, {
      state:{
        message: "Coffee shop is created. ",
        shopId,
        name
      }
    });
    window.location.reload();

  };

  const [createCoffeeShop, { loading }] = useMutation(CREATE_COFFEE_SHOP_MUTATION, {
    onCompleted,
  });

  const {
    register,
    watch,
    handleSubmit,
    formState,
    setError,
    getValues,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitValid = (data) => {
    //console.log(data, "val");
    if (loading) {
      return;
    }
    console.log(data);
    if (data.photo.length === 0){
      delete data.photo;
    }
    console.log(data);

    createCoffeeShop({
      variables: {
        ...data,
      },
    });

  };

  return (
    <BaseLayout>
      <PageTitle title="Create a coffee shop" />
      <FormBox>
        <HeaderContainer>Create a coffee shop
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

          <Input
            {...register("category", { required: "Category is Required" })}
            type="text"
            placeholder="Category"
            hasError={Boolean(formState.errors?.category?.message)}
          />
          <FormError message={formState.errors?.category?.message} />

          <Input {...register("photo")} type="file" placeholder="Photo" />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Create a shop"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <div></div>
      </FormBox>
    </BaseLayout>
  );
}

export default CreateCoffeeShop;
