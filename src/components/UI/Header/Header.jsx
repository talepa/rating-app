import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import roles from "../../../utils/roles";
import { userDataActions } from "../../../redux-store/userDataSlice";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Icons from "../../../Icons/Icons";
import ICONTYPES from "../../../Icons/types";
const active = "bg-blue-600 text-white";
const NavLinks = ({ className, setShowNav }) => {
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
    <nav className={`${className} `}>
      <button
        onClick={() => setShowNav(false)}
        className="md:hidden absolute top-5 right-5"
      >
        <Icons type={ICONTYPES.CLOSE} />
      </button>
      {pathname != "/sign-in" && pathname != "/sign-up" && (
        <NavLink
          className={` ${pathname.includes("dashboard") ? active : ""} `}
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
            className={` ${pathname.includes("/admin/users") ? active : ""} `}
            to="/admin/users"
          >
            Users
          </NavLink>
          <NavLink
            className={` ${pathname.includes("/admin/store") ? active : ""} `}
            to="/admin/store"
          >
            Store
          </NavLink>
        </>
      )}
      {pathname != "/sign-in" && pathname != "/sign-up" && (
        <NavLink
          className={` ${pathname.includes("/account") ? active : ""} `}
          to={"/account"}
        >
          Account
        </NavLink>
      )}
    </nav>
  );
};
const Header = () => {
  const pathname = useLocation().pathname;
  const [showNav, setShowNav] = useState(false);
  return (
    <header className="bg-white h-24 py-5 px-5 flex items-center justify-between w-full transition-[top] duration-500 ">
      <div className="logo">
        <img src={"/logo.svg"} alt="header-logo" width="150" height="50" />
      </div>
      <NavLinks
        key={"desktop"}
        className="hidden md:flex gap-8 text-lg font-bold *:p-2 *:rounded-md "
      />
      {!pathname.includes("sign") && (
        <button className="md:hidden" onClick={() => setShowNav(true)}>
          <Icons type={ICONTYPES.MENU} />
        </button>
      )}
      {showNav && (
        <NavLinks
          key={"mobile"}
          setShowNav={setShowNav}
          className="md:hidden fixed right-0 top-0 flex flex-col items-center justify-center bg-gray-50 w-80 h-screen z-[999] gap-5 text-lg font-bold *:p-2 *:rounded-md"
        />
      )}
    </header>
  );
};

export default Header;
