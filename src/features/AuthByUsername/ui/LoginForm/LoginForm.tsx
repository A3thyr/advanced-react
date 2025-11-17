import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import {
  loginActions,
  loginReducer,
} from "features/AuthByUsername/model/slice/loginSlice";
import { memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector, useStore } from "react-redux";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Button, Input, ThemeButton } from "shared/ui";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import cls from "./LoginForm.module.scss";

export interface LoginFormProps {
  className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  useEffect(() => {
    store.reducerManager.add("loginForm", loginReducer);
    dispatch({ type: "@INIT loginform reducer" });
    return () => {
      store.reducerManager.remove("loginForm");
      dispatch({ type: "@DESTROY loginform reducer" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ password, username }));
  }, [dispatch, password, username]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t("login-title")} />
      {error && (
        <Text
          text={t("Incorrect username or password")}
          theme={TextTheme.ERROR}
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
        theme={ThemeButton.OUTLINE}
        className={cls.loginBtn}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t("login")}
      </Button>
    </div>
  );
});

export default LoginForm;
