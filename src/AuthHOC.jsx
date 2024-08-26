import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import roles from "./utils/roles";

const AuthHOC = (Component) => {
  return function CheckRole(props) {
    const location = useLocation();
    const pathname = location.pathname;
    const history = useHistory();
    const { user } = useSelector((state) => state.userData);
    const role = user.role;
    switch (role) {
      case roles.ADMIN:
        if (/store-owner|user\//.test(pathname)) {
          history.replace("/admin/dashboard");
        }
        break;
      case roles.USER:
        if (/admin|store-owner/.test(pathname)) {
          history.replace("/user/dashboard");
        }
        break;
      case roles.STOREOW:
        if (/admin|user\//.test(pathname)) {
          history.replace("/store-owner/dashboard");
        }
        break;
    }
    return <Component {...props} />;
  };
};

export default AuthHOC;
