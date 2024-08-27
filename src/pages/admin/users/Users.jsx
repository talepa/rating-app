import AuthHOC from "../../../AuthHOC";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AddUsers from "./AddUsers/AddUsers";
import ViewUsers from "./ViewUsers/ViewUsers";

const menu = {
  ADD_USER: "add-user",
  VIEW_USER: "view-user",
};

const Users = () => {
  const [display, setDisplay] = useState("add-user");

  return (
    <>
      <Helmet>
        <title>Add | View Users</title>
        <meta name="description" content="Add or view users" />
      </Helmet>
      <div className="relative w-full">
        <nav className="flex  top-0 left-0 w-full bg-white justify-around items-center ">
          <button
            className={`p-5 w-full h-full hover:bg-gray-100 border-b-2 ${
              display === menu.ADD_USER
                ? "border-b-blue-500 bg-gray-100"
                : "border-b-gray-500"
            }`}
            onClick={() => setDisplay(menu.ADD_USER)}
          >
            Add User
          </button>
          <button
            className={`p-5 w-full h-full hover:bg-gray-100 border-b-2 ${
              display === menu.VIEW_USER
                ? "border-b-blue-500 bg-gray-100"
                : "border-b-gray-500"
            }`}
            onClick={() => setDisplay(menu.VIEW_USER)}
          >
            View All Users
          </button>
        </nav>
        <div className=" w-full">
          {display === menu.ADD_USER && <AddUsers />}
          {display === menu.VIEW_USER && <ViewUsers />}
        </div>
      </div>
    </>
  );
};

export default AuthHOC(Users);
