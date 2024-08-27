import { useState } from "react";
import Form from "../../../../components/UI/FormComponents/Form/Form";
import FormButton from "../../../../components/UI/FormComponents/FormButton/FormButton";
import FormMessage from "../../../../components/UI/FormComponents/FormMessage/FormMessage";
import FormPage from "../../../../components/UI/FormComponents/FormPage/FormPage";
import Input from "../../../../components/UI/FormComponents/Input/Input";
import InputContainer from "../../../../components/UI/FormComponents/InputContainer/InputContainer";
import toastMsg from "../../../../utils/DisplayToast";
import roles from "../../../../utils/roles";
import store_url from "../../../../utils/store-urls";
import axios from "axios";
function passwordValidation(value, setPasswordError, setIsValid) {
  if (value.length < 8) {
    setPasswordError("Password should have more than 8 characters");
    return;
  }
  if (!value.match(/[0-9]/)) {
    setPasswordError("Password should have a number [0-9]");
    return;
  }
  if (!value.match(/[a-z]/)) {
    setPasswordError("Password should have a Lowercase letter");
    return;
  }
  if (!value.match(/[A-Z]/)) {
    setPasswordError("Password should have an Uppercase letter");
    return;
  }
  if (!value.match(/\W/)) {
    setPasswordError("Password should have a Special character");
    return;
  }
  if (value.length > 16) {
    setPasswordError(
      "Password should have less than or equal to 16 characters"
    );
    return;
  }
  setIsValid(true);
}
const AddUsers = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    role: roles.ADMIN,
    store_name: "",
  });
  const [isValid, setIsValid] = useState(true);
  const [emailerror, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [storeNameError, setStoreNameError] = useState("");

  function changeHandler(event, name) {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validation(e) {
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setAddressError("");

    e.preventDefault();

    const { email, password, name, address } = formData;

    if (name.length < 20) {
      setNameError("Name should be 20 characters or above");
      return;
    }
    if (name.length > 60) {
      setNameError("Name should be 60 characters or below");
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Invalid Email");
      return;
    }

    passwordValidation(password, setPasswordError, setIsValid);
    if (!isValid) return;
    if (address.length < 10) {
      setAddressError("Address should be more than 10 characters");
      return;
    }

    if (address.length > 400) {
      setAddressError("Maximum 400 characters are allowed");
      return;
    }

    if (isValid) requestSignUp(e);
  }

  async function requestSignUp(e) {
    let inputs = e.currentTarget.elements;
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = true;
    }
    const { email, password, name, address, role, store_name } = formData;
    if (isValid) {
      try {
        const res = await axios.post(store_url["sign-up"], {
          email,
          password,
          name,
          address,
          role,
          store_name,
          overall_rating: 0,
        });
        console.log(store_url["sign-up"]);
        console.log(res);
        setFormData({
          email: "",
          password: "",
          name: "",
          address: "",
          role: roles.ADMIN,
          store_name: "",
        });
        const { message, data } = res.data;
        if (message === "error") {
          toastMsg("error", data);
        } else {
          toastMsg("success", "Account created Successfully !!");
        }
      } catch (error) {
        console.log(error);
      }
    }
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = false;
    }
  }
  return (
    <div className=" flex justify-center items-center">
      <FormPage>
        <FormMessage
          header="Create a new account"
          subtext={""}
          routetext={""}
          route={""}
        />
        <Form submitFunction={(e) => validation(e)}>
          <div className="w-full">
            <label>Make an account for:</label>
            <select
              onChange={(e) => changeHandler(e, "role")}
              className="w-full px-3 py-2 border  border-gray-300  rounded-md shadow-sm placeholder-gray-400 sm:text-sm focus: outline-none resize-none disabled:bg-gray-100"
              value={formData.role}
            >
              <option value={roles.ADMIN}>System Admin</option>
              <option value={roles.USER}>Normal User</option>
              <option value={roles.STOREOW}>Store Owner</option>
            </select>
          </div>
          <InputContainer>
            <Input
              id="signup-name"
              label="Name"
              type="text"
              errorMessage={nameError}
              value={formData.name}
              onChange={(e) => changeHandler(e, "name")}
            />
            {formData.role === roles.STOREOW && (
              <Input
                id="signup-store-name"
                label="Store Name"
                type="text"
                errorMessage={storeNameError}
                value={formData.store_name}
                onChange={(e) => changeHandler(e, "store_name")}
              />
            )}
            <Input
              id="signup-email"
              label="Email Address"
              type="text"
              errorMessage={emailerror}
              value={formData.email}
              onChange={(e) => changeHandler(e, "email")}
            />
            <Input
              id="signup-password"
              label="Password"
              type="password"
              errorMessage={passwordError}
              value={formData.password}
              onChange={(e) => changeHandler(e, "password")}
            />
            <Input
              label="Address"
              id={"signup-address"}
              value={formData.address}
              onChange={(e) => changeHandler(e, "address")}
              as="textarea"
              errorMessage={addressError}
            />
          </InputContainer>
          <FormButton type="submit" label="Sign Up" />
        </Form>
      </FormPage>
    </div>
  );
};

export default AddUsers;
