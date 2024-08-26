import { toast } from "react-toastify";

export default function toastMsg(status, message, settings) {
  toast[status](
    message,
    settings || {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
    }
  );
}
