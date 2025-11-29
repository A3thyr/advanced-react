import { sendComment } from "features/addCommentForm/model/services/sendComment/sendComment";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "features/addCommentForm/model/slice/addCommentFormSlice";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Input, ThemeButton } from "shared/ui";
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors.ts/addCommentFormSelectors";
import cls from "./AddCommentForm.module.scss";

interface AddCommentFormProps {
  className?: string;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<AddCommentFormProps> = ({ className }) => {
  const { t } = useTranslation("article_details");
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch]
  );

  const onSendComment = useCallback(() => {
    dispatch(sendComment());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          className={cls.input}
          placeholder={t("form.placeholder")}
          value={text}
          onChange={onCommentTextChange}
        />
        <Button onClick={onSendComment} theme={ThemeButton.OUTLINE}>
          {t("form.btn")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
