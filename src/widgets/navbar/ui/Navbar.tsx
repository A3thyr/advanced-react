import { getUserAuthData } from "entities/User";
import { LoginModal } from "features/AuthByUsername";
import { AvatarDropdown } from "features/avatarDropdown";
import { NotificationButton } from "features/notificationButton";
import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RoutePath } from "shared/config/router/router.config";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import {
  AppLink,
  AppLinkTheme,
  Button,
  Text,
  TextTheme,
  ThemeButton,
} from "shared/ui";
import { HStack } from "shared/ui/Stack";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation("translation");
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

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
        <HStack align="center" gap={16} className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
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
