import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Button, Input } from "shared/ui";
import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input className={cls.input} />
      <Input className={cls.input} />
      <Button className={cls.loginBtn}>{t("login")}</Button>
    </div>
  );
};
