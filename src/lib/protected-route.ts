import { headers } from "next/headers";
import { withSSRContext } from "aws-amplify";

type ProtectedProps = {
    allowedGroups?: string[]
}

type ProtectedStatus = 'NotAuthenticated' | 'NotAuthorised' | 'Authorised';

export default async function ProtectedRoute({allowedGroups}: ProtectedProps): Promise<ProtectedStatus> {
    const req = {
        headers: {
            cookie: headers().get("cookie"),
        },
    };
    const { Auth } = withSSRContext({ req });
    if (Auth === null || Auth === undefined) return 'NotAuthenticated';

    try {
        const user = await Auth.currentAuthenticatedUser();
        if (user && allowedGroups && allowedGroups.length) {
            const session = await Auth.currentSession();
            const payload = session?.getIdToken().decodePayload();
            if (payload) {
                const groups = payload['cognito:groups'];
                if (!groups || (groups && !allowedGroups.some(r=> groups.indexOf(r) >= 0))) {
                    return 'NotAuthorised';
                } else {
                    return 'Authorised';
                }
            } else {
                return 'NotAuthenticated';
            }
        }
        if (user && (!allowedGroups || (allowedGroups && allowedGroups.length === 0))) {
            return 'Authorised';
        }
    } catch (e) {
        console.log("Protected error:-", e)
        return 'NotAuthenticated';
    }

    return 'NotAuthorised';
}