import Swal from "sweetalert2";

function Toast({ type = "success", message = "An error occurred!" }) {
  if (type === "success") {
    Swal.fire({
      title: message,
      icon: "success",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      title: message,
      icon: "error",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
}

export default Toast;
