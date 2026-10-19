import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui";
import { PageLayout } from "@/widgets";
import { Counter } from "@/entities/Counter";
import { getFeatureFlags } from "@/shared/lib/features";

const MainPage = () => {
  const { t } = useTranslation("main");
  const [value, setValue] = useState("");

  const onChangeHandler = (val: string) => {
    setValue(val);
  };

  const isCounterEnabled = getFeatureFlags("isCounterEnabled");

  return (
    <PageLayout data-testid="MainPage">
      {t("title")}
      {isCounterEnabled && <Counter />}
      <Input
        value={value}
        onChange={onChangeHandler}
        placeholder={`sadjsidfjasi`}
      />

    </PageLayout>
  );
};

export default MainPage;
