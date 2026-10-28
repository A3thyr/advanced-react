import { FeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlags } from "./setGetFeatures";

interface ToggleFeatures<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

export function toggleFeatures<T>({ name, off, on }: ToggleFeatures<T>): T {
  if (getFeatureFlags(name)) {
    return on();
  }
  return off();
}
