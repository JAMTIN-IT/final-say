import { Timestamp } from "firebase/firestore";

export interface LifePhilosophy {
  id?: string;
  howToBeRemembered: string;
  valuesToPassOn: string;
  regrets: string;
  proudestAchievements: string;
  unfinishedBusiness: string;
  letterToTheWorld: string;
  letterIsPublic: boolean;
  adviceForThoseLeftBehind: string;
  updatedAt?: Timestamp;
}
