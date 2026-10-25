import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { LoginModal } from "@/features/AuthByUsername";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { NotificationButton } from "@/features/notificationButton";
import { getRouteArticlesCreate } from "@/shared/const/router";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { AppLink, Text, TextTheme, ThemeButton } from "@/shared/ui";

import { HStack } from "@/shared/ui/redesigned/Stack";
import cls from "./Navbar.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Button as ButtonDeprecated } from "@/shared/ui/deprecated/Button/Button";

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
            <HStack align="center" gap={16} className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(cls.Navbar, {}, [className])}>
            <Text
              className={cls.appName}
              title={t("app-name")}
              theme={TextTheme.INVERTED}
            />

            <AppLink
              variant="primary"
              to={getRouteArticlesCreate()}
              className={cls.createLink}
            >
              {t("create-article")}
            </AppLink>
            <HStack align="center" gap={16} className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <ButtonDeprecated
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("login")}
      </ButtonDeprecated>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
};
