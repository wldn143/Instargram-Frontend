import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const SIGNUP_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
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
  const history = useHistory();
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });
  const { username, password } = getValues();
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: "Account created. Please login.",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) return;
    const { firstName, lastName, email, username, password } = data;
    createAccount({
      variables: { firstName, lastName, email, username, password },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="signUp" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({ required: "First Name is required" })}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <Input
            ref={register}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          <Input
            ref={register({ required: "Email is required" })}
            name="email"
            type="text"
            placeholder="Email"
          />
          <Input
            ref={register({ required: "Username is required" })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Input
            ref={register({ required: "Password is required" })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit" disabled={!formState.isValid || loading}>
            {loading ? "Loading..." : "Sign up"}
          </Button>
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
export default SignUp;
