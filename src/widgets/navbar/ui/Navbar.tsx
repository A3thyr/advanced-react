/* eslint-disable i18next/no-literal-string */
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "entities/User";
import { LoginModal } from "features/AuthByUsername";
import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RoutePath } from "shared/config/router/router.config";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  AppLink,
  AppLinkTheme,
  Avatar,
  Button,
  Dropdown,
  Text,
  TextTheme,
  ThemeButton,
} from "shared/ui";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation("translation");
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          className={cls.appName}
          title={t("app-name")}
          theme={TextTheme.INVERTED}
        />

        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.articles_create}
          className={cls.createLink}
        >
          {t("create-article")}
        </AppLink>
        <Dropdown
          className={cls.dropdown}
          direction="bottom left"
          trigger={<Avatar size={30} src={authData.avatar} />}
          items={[
            ...(isAdminPanelAvailable
              ? [
                  {
                    content: t("admin"),
                    href: RoutePath.admin_panel,
                  },
                ]
              : []),
            {
              content: t("profile"),
              href: RoutePath.profile + authData.id,
            },
            {
              content: t("logout"),
              onClick: onLogout,
            },
          ]}
        />
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("login")}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
};
