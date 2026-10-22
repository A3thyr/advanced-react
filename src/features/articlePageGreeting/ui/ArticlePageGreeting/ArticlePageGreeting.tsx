import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

import { saveJsonSettings, useJsonSettings } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Drawer, Modal, Text } from "@/shared/ui";

export const ArticlePageGreeting = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlePageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlePageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
    }
  }, [isArticlePageWasOpened, dispatch]);

  const onClose = () => setIsOpen(false);

  const text = (
    <Text
      title={t("Добро пожаловать на страницу статей")}
      text={t("Здесь вы можете искать и пролистывать статьи на различные темы")}
    />
  );

  if (isMobile) {
    return <Drawer>{text}</Drawer>;
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
};
