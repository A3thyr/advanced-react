import { FC, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  Drawer,
  Input,
  Modal,
  StarRating,
  Text,
  ThemeButton,
} from "@/shared/ui";
import { ButtonSize } from "@/shared/ui/Button/Button";
import { HStack, VStack } from "@/shared/ui/Stack";

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
    <>
      <Text title={feedbackTitle} />
      <Input
        value={feedback}
        onChange={setFeedback}
        placeholder={t("feedback-placeholder")}
      />
    </>
  );

  return (
    <Card max className={className}>
      <VStack align="center" max gap={8}>
        <Text title={starsCount ? t("thx") : title} />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap={32} max>
            {modalContent}

            <HStack max align="center" justfify="between">
              <Button onClick={cancelHandle} theme={ThemeButton.OUTLINE_RED}>
                {t("cancel")}
              </Button>
              <Button onClick={acceptHandle}>{t("send-feedback")}</Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap={32}>
            {modalContent}
            <Button fullWidth onClick={acceptHandle} size={ButtonSize.L}>
              {t("send-feedback")}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
};
