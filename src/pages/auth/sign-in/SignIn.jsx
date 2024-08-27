import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import roles from "../../../utils/roles";
import toastMsg from "../../../utils/DisplayToast";
import FormPage from "../../../components/UI/FormComponents/FormPage/FormPage";
import FormMessage from "../../../components/UI/FormComponents/FormMessage/FormMessage";
import Form from "../../../components/UI/FormComponents/Form/Form";
import InputContainer from "../../../components/UI/FormComponents/InputContainer/InputContainer";
import Input from "../../../components/UI/FormComponents/Input/Input";
import FormButton from "../../../components/UI/FormComponents/FormButton/FormButton";
import { userDataActions } from "../../../redux-store/userDataSlice";
import store_url from "../../../utils/store-urls";
import { Helmet } from "react-helmet-async";
const SignIn = () => {
  const { user } = useSelector((state) => state.userData);
  const { name, role } = user;

  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (name) {
      history.replace(
        role === roles.ADMIN
          ? "/admin/dashboard"
          : role === roles.USER
          ? "/user/dashboard"
          : "/store-owner/dashboard"
      );
    }
  }, []);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function changeHandler(event, name) {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validation(e) {
    setEmailError("");
    setPasswordError("");
    e.preventDefault();
    const emailInput = e.currentTarget["signin-email"];
    const passwordInput = e.currentTarget["signin-password"];
    const email = formData.email;
    const password = formData.password;

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Invalid Email");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password should have more than 8 characters");
      return;
    }
    requestSignin(emailInput, passwordInput);
  }

  async function requestSignin(emailInput, passwordInput) {
    emailInput.disabled = true;
    passwordInput.disabled = true;
    const { email, password } = formData;
    try {
      const res = await axios.post(store_url["sign-in"], {
        email,
        password,
      });
      const { message, data, userData } = res.data;
      if (message === "error") {
        toastMsg("error", data);
      } else {
        dispatch(userDataActions.saveUserData({ ...userData, ...data }));
        toastMsg("success", "Sign In Success !!");
        history.replace(
          userData.role === roles.ADMIN
            ? "/admin/dashboard"
            : userData.role === roles.USER
            ? "/user/dashboard"
            : "/store-owner/dashboard"
        );
      }
    } catch (error) {
      // Handle error
    } finally {
      emailInput.disabled = false;
      passwordInput.disabled = false;
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Sign In to your Account" />
      </Helmet>
      <div className="min-h-[inherit] flex justify-center items-center">
        <FormPage>
          <FormMessage
            header="Sign in to your account"
            subtext="Or"
            routetext="register a new account"
            route="/sign-up"
          />
          <Form submitFunction={validation}>
            <InputContainer>
              <Input
                id="signin-email"
                label="Email Address"
                type="text"
                errorMessage={emailError}
                value={formData.email}
                onChange={(e) => changeHandler(e, "email")}
              />
              <Input
                id="signin-password"
                label="Password"
                type="password"
                errorMessage={passwordError}
                value={formData.password}
                onChange={(e) => changeHandler(e, "password")}
              />
            </InputContainer>
            <FormButton type="submit" label="Sign In" />
          </Form>
        </FormPage>
      </div>
    </>
  );
};

export default SignIn;
