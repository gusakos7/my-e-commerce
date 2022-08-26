import { useState } from "react";
import { useDispatch } from "react-redux";
import { emailSignUp } from "../../store/user/userSlice";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { SignUpContainer } from "./sign-up-form.styles.jsx";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    dispatch(emailSignUp({ email, password, displayName }));
    resetFormFields();
  };

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account</h2>
      <span>Sign Up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          // placeholder="Enter your name"
          id="displayName"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />
        <FormInput
          label={"Email"}
          type="email"
          // placeholder="Enter your email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label={"Password"}
          type="password"
          // placeholder="Enter your password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <FormInput
          label={"Confirm Password"}
          type="password"
          // placeholder="Confirm your password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        <Button>Submit</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
