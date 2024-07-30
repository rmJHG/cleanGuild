import { Bounce, toast } from "react-toastify";

export const successModal = (msg: string, time: number) => {
  toast.success(`${msg}`, {
    position: "top-right",
    autoClose: time,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
