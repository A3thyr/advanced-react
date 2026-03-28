import { Country } from "entities/Country";
import { Currency } from "entities/Currency";

import { ProfileCard } from "entities/Profile";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { numberValidateRegEx } from "shared/const/regExp";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Text, TextTheme } from "shared/ui";
import { VStack } from "shared/ui/Stack";
import { getProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { getProfileValidateError } from "../../model/selectors/getProfileValidateError/getProfileValidateError";
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData";
import { profileActions, profileReducer } from "../../model/slice/profileSlice";
import { ValidateProfileError } from "../../model/types/editableProfileCardSchema";
import { EditableProfileCardHeader } from "../EditableProfileCardHeader/EditableProfileCardHeader";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface EditableProfileCardProps {
  className?: string;
  id: string;
}

export const EditableProfileCard = ({
  className,
  id,
}: EditableProfileCardProps) => {
  const { t } = useTranslation("profile");

  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileReadOnly);
  const validateErrors = useSelector(getProfileValidateError);

  const validateErrorTranslate = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t("error.incorrect-user-data"),
    [ValidateProfileError.INCORRECT_AGE]: t("error.incorrect-age"),
    [ValidateProfileError.INCORRECT_COUNTRY]: t("error.incorrect-country"),
    [ValidateProfileError.NO_DATA]: t("error.no-data"),
    [ValidateProfileError.SERVER_ERROR]: t("error.server-error"),
  };

  useInitialEffect(() => {
    if (id) dispatch(fetchProfileData(id));
  });

  const onChangeFirstname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || "" }));
    },
    [dispatch],
  );

  const onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || "" }));
    },
    [dispatch],
  );

  const onChangeAge = useCallback(
    (value?: string) => {
      if (numberValidateRegEx.test(value || "0")) {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
      }
    },
    [dispatch],
  );

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || "" }));
    },
    [dispatch],
  );

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || "" }));
    },
    [dispatch],
  );

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || "" }));
    },
    [dispatch],
  );

  const onChangeCurrency = useCallback(
    (currency?: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    (country?: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack gap={16} max className={classNames("", {}, [className])}>
        <EditableProfileCardHeader />
        {validateErrors?.length &&
          validateErrors.map((err) => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              text={validateErrorTranslate[err]}
            />
          ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeAvatar={onChangeAvatar}
          onChangeUsername={onChangeUsername}
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
          isReadonly={readonly}
        />
      </VStack>
    </DynamicModuleLoader>
  );
};
