import { useState } from "react";
import Icons from "../../../../Icons/Icons";
import ICONTYPES from "../../../../Icons/types";
const Input = ({
  label,
  id,
  type,
  onChange,
  value,
  errorMessage,
  as = "input",
  className,
}) => {
  const [inputType, setinputType] = useState("password");
  const isPassword = type === "password";
  return (
    <div className={`${className ? className : "relative"}`}>
      <label htmlFor={id} className={`block text-sm font-medium text-gray-700`}>
        {label}
        {as != "textarea" ? (
          <input
            name={id}
            className={`w-full px-3 py-2 border  border-gray-300  rounded-md shadow-sm placeholder-gray-400 sm:text-sm focus: outline-none disabled:bg-gray-100`}
            id={id}
            type={isPassword ? inputType : type}
            onChange={onChange}
            value={value}
          />
        ) : (
          <textarea
            // name={id}
            className={`w-full px-3 py-2 border  border-gray-300  rounded-md shadow-sm placeholder-gray-400 sm:text-sm focus: outline-none disabled:bg-gray-100`}
            id={id}
            onChange={onChange}
            value={value}
          />
        )}
        {type === "password" && (
          <button
            type="button"
            className="absolute top-[50%] translate-y-[-50%] right-[10px] text-gray-500"
            onClick={() =>
              setinputType((prev) => (prev == "password" ? "text" : "password"))
            }
          >
            {inputType == "text" ? (
              <Icons type={ICONTYPES.HIDEPS} className="w-6 h-6" />
            ) : (
              <Icons type={ICONTYPES.SHOWPS} className="w-6 h-6" />
            )}
          </button>
        )}
      </label>
      <div
        className={`h-5 text-sm flex gap-1 text-red-500 items-center origin-top transition-transform overflow-hidden ${
          errorMessage ? "delay-100 scale-y-100" : "scale-y-0"
        }`}
      >
        <Icons type={ICONTYPES.ERROR} color="red" size="1.5em" />

        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default Input;
