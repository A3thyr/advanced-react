import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Input as InputDeprecated, ThemeButton } from "@/shared/ui";
import {
  Text as TextDeprecated,
  TextTheme,
} from "@/shared/ui/deprecated/Text/Text";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import cls from "./LoginForm.module.scss";
import { Button as ButtonDeprecated } from "@/shared/ui/deprecated/Button/Button";
import { ToggleFeatures } from "@/shared/lib/features";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { VStack } from "@/shared/ui/redesigned/Stack";

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation("translation");
  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const res = await dispatch(loginByUsername({ password, username }));
    if (res.meta.requestStatus === "fulfilled") {
      onSuccess();
      window.location.reload();
    }
  }, [dispatch, password, username, onSuccess]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <VStack
            gap={8}
            className={classNames(cls.LoginForm, {}, [className])}
          >
            <Text title={t("login-title")} />
            {error && (
              <Text
                text={t("Incorrect username or password")}
                variant="error"
              />
            )}
            <Input
              autoFocus
              type="text"
              placeholder={t("username")}
              className={cls.input}
              onChange={onChangeUsername}
              value={username}
            />
            <Input
              type="text"
              onChange={onChangePassword}
              placeholder={t("password")}
              className={cls.input}
              value={password}
            />
            <Button
              variant="outline"
              className={cls.loginBtn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t("login")}
            </Button>
          </VStack>
        }
        off={
          <div className={classNames(cls.LoginForm, {}, [className])}>
            <TextDeprecated title={t("login-title")} />
            {error && (
              <TextDeprecated
                text={t("Incorrect username or password")}
                theme={TextTheme.ERROR}
              />
            )}
            <InputDeprecated
              autoFocus
              type="text"
              placeholder={t("username")}
              className={cls.input}
              onChange={onChangeUsername}
              value={username}
            />
            <InputDeprecated
              type="text"
              onChange={onChangePassword}
              placeholder={t("password")}
              className={cls.input}
              value={password}
            />
            <ButtonDeprecated
              theme={ThemeButton.OUTLINE}
              className={cls.loginBtn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t("login")}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
});

export default LoginForm;
