import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import roles from "../../../utils/roles";
import { userDataActions } from "../../../redux-store/userDataSlice";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userData);
  useEffect(() => {
    const local_user = localStorage.getItem("user");
    if (local_user) {
      dispatch(userDataActions.saveUserData({ ...JSON.parse(local_user) }));
    }
  }, []);
  const role = user.role;

  return (
    <header className="bg-white h-14 py-2 px-5 flex items-center justify-between border-b w-full transition-[top] duration-500 ">
      <div className="logo">
        <img src={"logo.svg"} alt="header-logo" width="150" height={"100"} />
      </div>
      <nav className="navigation flex gap-5">
        {pathname != "/sign-in" && pathname != "/sign-up" && (
          <NavLink
            className={`border-b-2 ${
              pathname.includes("dashboard")
                ? "border-black"
                : "border-transparent"
            } `}
            to={
              role == roles.ADMIN
                ? "/admin/dashboard"
                : role == roles.USER
                ? "/user/dashboard"
                : "/store-owner/dashboard"
            }
          >
            Dashboard
          </NavLink>
        )}
        {role === roles.ADMIN && (
          <>
            <NavLink
              className={`border-b-2 ${
                pathname.includes("/admin/users")
                  ? "border-black"
                  : "border-transparent"
              } `}
              to="/admin/users"
            >
              Users
            </NavLink>
            <NavLink
              className={`border-b-2 ${
                pathname.includes("/admin/store")
                  ? "border-black"
                  : "border-transparent"
              } `}
              to="/admin/store"
            >
              Store
            </NavLink>
          </>
        )}
        {pathname != "/sign-in" && pathname != "/sign-up" && (
          <NavLink
            className={`border-b-2 ${
              pathname.includes("/account")
                ? "border-black"
                : "border-transparent"
            } `}
            to={"/account"}
          >
            Account
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
