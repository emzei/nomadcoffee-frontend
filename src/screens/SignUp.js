import { isLoggedInVar, darkModeVar } from "../apollo";
import styled from "styled-components";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/Container";
import Button from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/ButtomBox";
import routes from "../routes";
import Title from "../components/auth/Title";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { Navigate } from "react-router-dom";

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
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $name: String!
    $location: String
    $githubUsername: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      name: $firstName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
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
  console.log(formState.errors);
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    Navigate(-1);
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    //console.log(data, "val");
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  const clearSignupError = () => {
    clearErrors("result");
  };

  console.log(formState.errors);

  return (
    <AuthLayout>
      <PageTitle title="Sign-up" />

      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faMugHot} size="3x" />
          <Title>Nomad Coffee</Title>
        </HeaderContainer>
        <SubtitleTop>
          <FatLink>
            Sign up to see photos and videos from your friends.{" "}
          </FatLink>
        </SubtitleTop>
        <Button icon={faFacebookSquare} value="Login with Facebook" />
        <Seperator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is Required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.errors?.username?.message} />

          <Input
            {...register("email", { required: "Email is Required" })}
            type="text"
            placeholder="Email"
            hasError={Boolean(formState.errors?.email?.message)}
          />
          <FormError message={formState.errors?.email?.message} />

          <Input
            {...register("name", { required: "Name is Required" })}
            type="text"
            placeholder="Name"
            hasError={Boolean(formState.errors?.name?.message)}
          />
          <FormError message={formState.errors?.name?.message} />

          <Input
            {...register("password", { required: "Password is Required" })}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />

          <Input {...register("location")} type="text" placeholder="Location" />
          <Input
            {...register("githubUsername")}
            type="text"
            placeholder="Github Username"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <div></div>
        <SubtitleBottom>
          People who use our service may have uploaded your contact information
          to Instagram.<FatLink>Learn More</FatLink>
        </SubtitleBottom>
        <div></div>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}

export default SignUp;
