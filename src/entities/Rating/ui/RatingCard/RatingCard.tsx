import { FC, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useTranslation } from "react-i18next";
import {
  Button,
  // Button,
  Card as CardDeprecated,
  Drawer,
  Drawer as DrawerDeprecated,
  Input as InputDeprecated,
  Modal,
  StarRating,
  Text as TextDeprecated,
  ThemeButton,
} from "@/shared/ui";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import {
  Button as ButtonDeprecated,
  ButtonSize,
} from "@/shared/ui/deprecated/Button/Button";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { Card } from "@/shared/ui/redesigned/Card/Card";

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard: FC<RatingCardProps> = ({
  className,
  feedbackTitle,
  hasFeedback,
  onAccept,
  onCancel,
  title,
  rate = 0,
}) => {
  const { t } = useTranslation("translation");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState<string>("");

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [onAccept, starsCount, feedback]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t("feedback-placeholder")}
          />
        </>
      }
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t("feedback-placeholder")}
          />
        </>
      }
    />
  );

  const content = (
    <>
      <VStack align="center" max gap={8}>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <>
              <Text title={starsCount ? t("thx") : title} />
              <StarRating
                selectedStars={starsCount}
                size={40}
                onSelect={onSelectStars}
              />
            </>
          }
          off={
            <>
              <TextDeprecated title={starsCount ? t("thx") : title} />
              <StarRating
                selectedStars={starsCount}
                size={40}
                onSelect={onSelectStars}
              />
            </>
          }
        />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap={32} max>
            {modalContent}
            <ToggleFeatures
              feature="isAppRedesigned"
              on={
                <HStack max align="center" justfify="between">
                  <Button data-testid="RatingCard.Close" onClick={cancelHandle}>
                    {t("cancel")}
                  </Button>
                  <Button data-testid="RatingCard.Send" onClick={acceptHandle}>
                    {t("send-feedback")}
                  </Button>
                </HStack>
              }
              off={
                <HStack max align="center" justfify="between">
                  <ButtonDeprecated
                    data-testid="RatingCard.Close"
                    onClick={cancelHandle}
                    theme={ThemeButton.OUTLINE_RED}
                  >
                    {t("cancel")}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    data-testid="RatingCard.Send"
                    onClick={acceptHandle}
                  >
                    {t("send-feedback")}
                  </ButtonDeprecated>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
              <VStack gap={32}>
                {modalContent}
                <Button fullWidth onClick={acceptHandle} size={"l"}>
                  {t("send-feedback")}
                </Button>
              </VStack>
            </Drawer>
          }
          off={
            <DrawerDeprecated isOpen={isModalOpen} lazy onClose={cancelHandle}>
              <VStack gap={32}>
                {modalContent}
                <ButtonDeprecated
                  fullWidth
                  onClick={acceptHandle}
                  size={ButtonSize.L}
                >
                  {t("send-feedback")}
                </ButtonDeprecated>
              </VStack>
            </DrawerDeprecated>
          }
        />
      </MobileView>
    </>
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card border="round" padding={24} max data-testid="RatingCard">
          {content}
        </Card>
      }
      off={
        <CardDeprecated max className={className} data-testid="RatingCard">
          {content}
        </CardDeprecated>
      }
    />
  );
};
