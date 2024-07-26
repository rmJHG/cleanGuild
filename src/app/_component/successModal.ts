import { Bounce, toast } from "react-toastify";

export const successModal = (msg: string) => {
  toast.success(`${msg}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
