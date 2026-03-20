import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui";
import { PageLayout } from "widgets";

const MainPage = () => {
  const { t } = useTranslation("main");
  const [value, setValue] = useState("");

  const onChangeHandler = (val: string) => {
    setValue(val);
  };

  return (
    <PageLayout>
      {t("title")}
      {/* <BugButton />
      <Counter /> */}
      <Input
        value={value}
        onChange={onChangeHandler}
        placeholder={`sadjsidfjasi`}
      />
    </PageLayout>
  );
};

export default MainPage;
