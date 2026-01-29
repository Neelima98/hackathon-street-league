import { useContext } from "react";
import { ModalContext } from "./ModalContext.jsx";
import LoginModalContainer from "./Login/LoginModalContainer.jsx";
import SignUpModalContainer from "./Signup/SignUpModalContainer.jsx";
import ForgotPasswordModalContainer from "./ForgotPassword/ForgotPasswordModalContainer.jsx";
// Payment modals removed

const MODAL_COMPONENTS = {
  login: LoginModalContainer,
  signup: SignUpModalContainer,
  forgotPassword: ForgotPasswordModalContainer,
  // subscribe, paymentSuccess, paymentFail modals removed
};

export default function ModalManager() {
  const { isOpen, type, data } = useContext(ModalContext);

  if (!isOpen || !type) return null;

  const ModalComponent = MODAL_COMPONENTS[type];
  return ModalComponent ? <ModalComponent data={data} /> : null;
}
