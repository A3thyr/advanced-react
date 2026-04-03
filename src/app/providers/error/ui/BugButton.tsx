import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui";

/**
 * Кнопка для тестирования ErrorBoundary
 *
 * @returns FC
 */

export const BugButton: FC = () => {
  const [error, setError] = useState(false);
  const { t } = useTranslation("translation");
  const throwErr = () => setError(true);

  useEffect(() => {
    if (error) throw new Error();
  }, [error]);

  return <Button onClick={throwErr}>{t("throw-err")}</Button>;
};
