import { profileReducer } from "entities/Profile";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
// import cls from "./ProfilePage.module.scss";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation("profile");

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames("", {}, [className])}>{t("title")}</div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
