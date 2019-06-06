export enum CredentialsTypes {
    AUTHENTICATE_REQUEST = '@credentials/AUTHENTICATE_REQUEST',
    AUTHENTICATE_SUCCESS = '@credentials/AUTHENTICATE_SUCCESS',
    AUTHENTICATE_FAILURE = '@credentials/AUTHENTICATE_FAILURE',
}

export interface Credentials {
    id: number,
    name: string,
    email: string,
    slug: string,
}

export interface CredentialsState {
    readonly data: Credentials,
    readonly loading: boolean,
    readonly error: boolean,
}