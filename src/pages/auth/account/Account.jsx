import { userDataActions } from "../../../redux-store/userDataSlice";
import toastMsg from "../../../utils/DisplayToast";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import store_url from "../../../utils/store-urls";
import { Helmet } from "react-helmet-async";
import Icons from "../../../Icons/Icons";
import ICONTYPES from "../../../Icons/types";

const Account = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.userData);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { name, email, address, idToken } = user;
  const [changePassword, setChangePassword] = useState(false);

  const logout = () => {
    dispatch(userDataActions.logout());
    history.replace("/sign-in");
  };

  const passwordValidation = (e, setErrorMessage) => {
    setErrorMessage("");
    e.preventDefault();
    const form = e.target;
    const value = form.password.value;
    if (value.length < 8) {
      setErrorMessage("Password should have more than 8 characters");
      return;
    }
    if (!value.match(/[0-9]/)) {
      setErrorMessage("Password should have a number [0-9]");
      return;
    }
    if (!value.match(/[a-z]/)) {
      setErrorMessage("Password should have a Lowercase letter");
      return;
    }
    if (!value.match(/[A-Z]/)) {
      setErrorMessage("Password should have an Uppercase letter");
      return;
    }
    if (!value.match(/\W/)) {
      setErrorMessage("Password should have a Special character");
      return;
    }
    if (value.length > 16) {
      setErrorMessage(
        "Password should have less than or equal to 16 characters"
      );
      return;
    }
    requestPasswordChange(value);
  };

  const requestPasswordChange = async (newPassword) => {
    try {
      const res = await axios.post(store_url["reset-password"], {
        newPassword,
        idToken,
      });
      if (res.data.message === "error") {
        toastMsg(res.data.message, res.data.data);
      } else {
        toastMsg("success", "Password was changed successfully");
        logout();
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setErrorMessage("There was an error changing your password.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Your Account</title>
        <meta name="description" content="View account details" />
      </Helmet>
      <section className="min-h-[inherit] flex justify-center items-center bg-gradient-to-t from-[#96fbc4] to-[#f9f586]">
        <div className=" max-w-2xl p-7 shadow-lg rounded-md bg-white">
          <div className="flex items-center justify-center gap-7">
            <Icons color="gray" type={ICONTYPES.USER} size="5em" />
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-3xl">{name}</p>
              <p className="text-xl">{email}</p>
              <p className="text-xl">{address}</p>
              <div className="max-w-64">
                {changePassword && (
                  <form
                    className="my-3"
                    onSubmit={(e) => passwordValidation(e, setErrorMessage)}
                  >
                    <div className="">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="outline outline-1 my-2 focus:outline-gray-500 rounded p-1 w-full"
                        />
                        <button
                          type="button"
                          className="absolute top-[50%] -translate-y-[50%] right-[10%] text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Icons type={ICONTYPES.HIDEPS} />
                          ) : (
                            <Icons type={ICONTYPES.SHOWPS} />
                          )}
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-black text-white hover:bg-white hover:text-black transition-colors duration-250 p-2 rounded"
                    >
                      Reset
                    </button>
                  </form>
                )}
                {changePassword && (
                  <p className="text-red-500">{errorMessage}</p>
                )}
                <div className="flex gap-5">
                  <button
                    onClick={() => {
                      setErrorMessage("");
                      setChangePassword(!changePassword);
                    }}
                    className="bg-black text-white hover:bg-white hover:text-black transition-colors duration-250 p-2 rounded"
                  >
                    {changePassword ? "Cancel" : "Change Password"}
                  </button>
                  <button
                    onClick={() => logout()}
                    className="bg-black text-white hover:bg-white hover:text-black transition-colors duration-250 p-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
