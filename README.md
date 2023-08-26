## Next.js v13.4.12 with Amplify Auth

* There is an issue with Next.js v13.4.13 and above when hosted on Amplify whereby the next/image component returns 404 when the image is optimised.

- Next.js v13.4.12
- AWS Amplify
-- Auth using the SDK NOT the built in Authenticator UI
- Protected page based on Cognito Group
- Auth context provider to manage auth
- Typescript

## To run (assuming you have an AWS account):

1) Clone the repo and remove the amplify folder.
2) Install the Amplify cli.
3) Run `amplify configure` and follow the prompts (if required)
4) Run `amplify init` and follow prompts
5) Run `amplify add auth` and follow prompts using defaults but adding two groups, `Admin` and `User`
6) Run `amplify push` to create resources on the cloud
7) Publish to Github repo and connect to Amplify app in AWS console

