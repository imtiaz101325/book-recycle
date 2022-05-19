import { useEffect } from "react";

import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";

import { useNavigate, useLocation } from "react-router";

export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (route === "authenticated") {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);

  return (
    <View>
      <Authenticator></Authenticator>
    </View>
  );
}
