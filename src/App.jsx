import { Redirect, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/auth/sign-in/SignIn";
import SignUp from "./pages/auth/sign-up/SignUp";
import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import UserDashboard from "./pages/user/dashboard/Dashboard";
import StoreDashboard from "./pages/store-owner/dashboard/Dashboard";
import Account from "./pages/auth/account/Account";
import Users from "./pages/admin/users/Users";
import Store from "./pages/admin/store/Store";
import "react-toastify/dist/ReactToastify.css";
import "@smastrom/react-rating/style.css";

function App() {
  return (
    <>
      <Route path={"/"}>
        <Redirect to={"/sign-in"} />
      </Route>
      <Route path={"/sign-up"}>
        <SignUp />
      </Route>
      <Route path={"/sign-in"}>
        <SignIn />
      </Route>
      <Route path={"/account"}>
        <Account />
      </Route>
      <Route path={"/admin/dashboard"}>
        <AdminDashboard />
      </Route>
      <Route path={"/admin/users"}>
        <Users />
      </Route>
      <Route path={"/admin/store"}>
        <Store />
      </Route>
      <Route path={"/user/dashboard"}>
        <UserDashboard />
      </Route>
      <Route path={"/store-owner/dashboard"}>
        <StoreDashboard />
      </Route>
    </>
  );
}

export default App;
