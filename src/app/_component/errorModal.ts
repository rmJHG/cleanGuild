import { Bounce, toast } from "react-toastify";

export const errorModal = (errorMsg: string) => {
  toast.error(`${errorMsg}`, {
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
