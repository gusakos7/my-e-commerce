import { User, UserCredential } from "firebase/auth";
import {
  AdditionalInformation,
  UserData,
} from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  error: Error | null;
};
export type ObjAddInf = {
  additionalInformation: AdditionalInformation;
};

export type getSnapProps = {
  userAuth?: User | UserCredential;
  additionalInformation?: AdditionalInformation;
};
