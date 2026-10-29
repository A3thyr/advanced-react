import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Input as InputDeprecated, ThemeButton } from "@/shared/ui";
import { HStack } from "@/shared/ui/redesigned/Stack";
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors.ts/addCommentFormSelectors";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../model/slice/addCommentFormSlice";
import cls from "./AddCommentForm.module.scss";
import { Button as ButtonDeprecated } from "@/shared/ui/deprecated/Button/Button";
import { ToggleFeatures } from "@/shared/lib/features";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { Card } from "@/shared/ui/redesigned/Card/Card";

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<AddCommentFormProps> = ({
  className,
  onSendComment,
}) => {
  const { t } = useTranslation("article_details");
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || "");
    onCommentTextChange("");
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card padding={24} border="round" max>
            <HStack
              data-testid="AddCommentForm"
              max
              gap={16}
              align="center"
              justfify="between"
              className={classNames(cls.AddCommentFormRedesigned, {}, [
                className,
              ])}
            >
              <Input
                data-testid="AddCommentForm.Input"
                className={cls.input}
                placeholder={t("form.placeholder")}
                value={text}
                onChange={onCommentTextChange}
              />
              <Button
                data-testid="AddCommentForm.Button"
                onClick={onSendHandler}
              >
                {t("form.btn")}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            data-testid="AddCommentForm"
            max
            align="center"
            justfify="between"
            className={classNames(cls.AddCommentForm, {}, [className])}
          >
            <InputDeprecated
              data-testid="AddCommentForm.Input"
              className={cls.input}
              placeholder={t("form.placeholder")}
              value={text}
              onChange={onCommentTextChange}
            />
            <ButtonDeprecated
              data-testid="AddCommentForm.Button"
              onClick={onSendHandler}
              theme={ThemeButton.OUTLINE}
            >
              {t("form.btn")}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
