import { useEffect } from "react";

const Alert = ({ type, message, list, removeAlert }) => {
  console.log(type);
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert(false, "", "");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [list, removeAlert]);

  return (
    <div
      className={`my-4 rounded ${
        type === "danger"
          ? "text-red-600 bg-red-200 "
          : "text-green-600 bg-green-200 "
      }md:w-1/2 md:mx-auto`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Alert;
