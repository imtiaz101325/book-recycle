import { useAuthenticator, Heading } from "@aws-amplify/ui-react";

export default function Profile() {
  const { route } = useAuthenticator((context) => [context.route]);

  const message =
    route === "authenticated" ? "FIRST PROTECTED ROUTE!" : "Loading...";
    
  return <Heading level={1}>{message}</Heading>;
}
