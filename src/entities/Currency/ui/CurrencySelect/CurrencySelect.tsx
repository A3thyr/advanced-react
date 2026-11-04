import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "@/shared/ui/redesigned/Popups";
import { Currency } from "../../model/types/currency";

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
  ({ className, onChange, value, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation("profile");

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange],
    );

    const props = {
      onChange: onChangeHandler,
      value,
      items: options,
      label: t("profilecard.currency"),
      className,
      readonly,
    };

    return <ListBox {...props} />;
  },
);
