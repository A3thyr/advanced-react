import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { Profile } from "../../model/types/profile";
import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
} from "../ProfileCardRedesigned/ProfileCardRedesigned";

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  isReadonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency?: Currency) => void;
  onChangeCountry?: (country?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { error, isLoading } = props;

  if (isLoading) {
    return <ProfileCardRedesignedSkeleton />;
  }

  if (error) {
    return <ProfileCardRedesignedError />;
  }

  return <ProfileCardRedesigned {...props} />;
};
