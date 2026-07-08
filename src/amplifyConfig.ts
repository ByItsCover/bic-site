import { Amplify } from "aws-amplify";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: window._env_.COGNITO_USER_POOL_ID,
            userPoolClientId: window._env_.COGNITO_CLIENT_ID,
        },
    },
});
