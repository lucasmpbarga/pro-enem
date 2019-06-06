import { ISubscription } from "../../../models/ISubscription";
import { Credentials } from "../credentials/types";

export enum PersonTypes {
    PERSON_REQUEST = '@person/PERSON_REQUEST',
    PERSON_SUCCESS = '@person/PERSON_SUCCESS',
    PERSON_FAILURE = '@person/PERSON_FAILURE',
    PERSON_CLEAR = '@person/PERSON_CLEAR',
}

export interface Person extends Credentials {
    imageProfile: string,
    subscriptions: ISubscription[],
}

export interface PersonState {
    readonly data: Person,
    readonly loading: boolean,
    readonly error: boolean,
}