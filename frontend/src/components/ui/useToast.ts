import { useContext } from "react";
import { ToastContext } from "./toaster";

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToasterProvider");
  return ctx.toast;
};
