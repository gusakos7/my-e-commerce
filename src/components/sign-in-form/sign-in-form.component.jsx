import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
    } catch (error) {
      console.log("user sign in encountered an error", error);
    }

    resetFormFields();
  };

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-in-container">
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
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
