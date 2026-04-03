import { FC, Suspense } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Modal } from "@/shared/ui";
import LoginForm from "../LoginForm/LoginForm";
import cls from "./LoginModal.module.scss";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({
  className,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={classNames(cls.LoginModal, {}, [className])}
      lazy
    >
      <Suspense fallback={<>Loading...</>}>
        <LoginForm onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
