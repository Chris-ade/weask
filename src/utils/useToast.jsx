import { useSnackbar } from "notistack";

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const toastSuccess = (message) =>
    enqueueSnackbar(message, {
      style: {
        backgroundColor: "#27ae60",
        color: "#fff",
      },
      preventDuplicate: true,
      variant: "success",
      disableWindowBlurListener: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });

  const toastError = (message) =>
    enqueueSnackbar(message, {
      preventDuplicate: true,
      variant: "error",
      disableWindowBlurListener: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });

  const toastDefault = (message) =>
    enqueueSnackbar(message, {
      preventDuplicate: true,
      variant: "default",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });

  const toastWarning = (message) =>
    enqueueSnackbar(message, {
      preventDuplicate: true,
      variant: "warning",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });

  return { toastSuccess, toastError, toastDefault, toastWarning };
};

export { useToast };
