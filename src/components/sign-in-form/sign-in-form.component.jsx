import { useState } from "react";
import { useDispatch } from "react-redux";
import { emailSignIn, googleSignIn } from "../../store/user/userSlice";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignIn());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(emailSignIn({ email, password }));
    resetFormFields();
  };

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with email and password or with Google</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Email"}
          type="email"
          // placeholder="Enter your email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label={"Password"}
          type="password"
          // placeholder="Enter your password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};
export default SignInForm;
