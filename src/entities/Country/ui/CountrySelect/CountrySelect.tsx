import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "@/shared/ui";
import { Country } from "../../model/types/country";

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  {
    value: Country.Russia,
    content: Country.Russia,
  },
  {
    value: Country.Ukraine,
    content: Country.Ukraine,
  },
];

export const CountrySelect = memo(
  ({ className, onChange, value, readonly }: CountrySelectProps) => {
    const { t } = useTranslation("profile");

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    return (
      <ListBox
        onChange={onChangeHandler}
        value={value}
        className={className}
        items={options}
        readonly={readonly}
        label={t("profilecard.country")}
      />
    );
  },
);
