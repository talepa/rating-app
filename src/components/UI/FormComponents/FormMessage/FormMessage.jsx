import { Link } from "react-router-dom";

const FormMessage = ({ header, subtext, routetext, route = "#" }) => {
  return (
    <div className=" message-container flex flex-col justify-center gap-2">
      {header && <div className="text-3xl text-center">{header}</div>}
      {(subtext || routetext) && (
        <div className="text-center text-sm ">
          {subtext && <span>{subtext} </span>}
          {route && (
            <Link className="text-blue-500" to={route}>
              {routetext}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default FormMessage;
