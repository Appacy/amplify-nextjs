import { CognitoUser as AmplifyCognitoUser } from "amazon-cognito-identity-js";

export type HubCapsule = {
	channel: string;
	payload: HubPayload;
	source: string;
	patternInfo?: string[];
};

type HubPayload = {
	event: string;
	data?: any;
	message?: string;
};

export type Attributes = {
    sub?:       string;
    email?:     string;
    groups?:    string[];
}

type ChallengeParam = {
    MFAS_CAN_SETUP?: string;
    FRIENDLY_DEVICE_NAME?: string;
}

export interface User extends AmplifyCognitoUser {
    attributes?: Attributes;
    challengeParam?: ChallengeParam;
}

export type AuthError = {
    message?: string;
}

export type Status = 'pending' | 'idle';