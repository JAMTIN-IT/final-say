import { Timestamp } from "firebase/firestore";

export type DispositionType =
  | "burial"
  | "cremation"
  | "green_burial"
  | "donation_to_science"
  | "aquamation"
  | "mummification";

export type ReligiousTradition =
  | "christian"
  | "jewish"
  | "muslim"
  | "hindu"
  | "secular"
  | "custom";

export type ServiceType =
  | "traditional_funeral"
  | "memorial_service"
  | "celebration_of_life"
  | "graveside_only"
  | "no_service";

export type EmbalmingPreference = "yes" | "no" | "no_preference";

export type AshDisposition =
  | "scattered"
  | "kept_at_home"
  | "buried"
  | "divided_between_family";

export interface MusicEntry {
  songName: string;
  spotifyLink?: string;
  moment: "entrance" | "exit" | "during";
}

export interface ReadingEntry {
  title: string;
  author: string;
  text: string;
}

export interface InsurancePolicy {
  provider: string;
  policyNumber: string;
  contact: string;
}

export interface BodyDisposition {
  dispositionType: DispositionType | "";
  preferredFuneralHome: string;
  funeralHomeUrl: string;
  religiousTradition: ReligiousTradition | "";
  customTradition: string;
  serviceTypes: ServiceType[];
  serviceLocationPreference: string;
  preferredDateGuidance: string;
}

export interface BurialPrefs {
  burialLocation: string;
  casketPreference: string;
  casketImageUrl: string;
  clothingDescription: string;
  clothingImageUrl: string;
  jewelleryInstructions: string;
  embalmingPreference: EmbalmingPreference | "";
}

export interface CremationPrefs {
  urnPreference: string;
  urnImageUrl: string;
  ashDisposition: AshDisposition[];
  scatterLocation: string;
}

export interface ServiceDetails {
  musicToPlay: MusicEntry[];
  musicNotToPlay: string;
  eulogyDeliveredBy: string;
  eulogyNotes: string;
  readings: ReadingEntry[];
  flowers: string;
  flowersNotWanted: string;
  dresscode: string;
  slideshowGuidance: string;
  orderOfService: string;
  catering: string;
  charitableDonations: string;
  prohibitions: string;
  obituaryDraft: string;
}

export interface FuneralArrangements {
  id?: string;
  bodyDisposition: BodyDisposition;
  burialPrefs: BurialPrefs;
  cremationPrefs: CremationPrefs;
  serviceDetails: ServiceDetails;
  updatedAt?: Timestamp;
}
