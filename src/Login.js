import { useEffect } from "react";
import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";

const Container = styled(View)`
  margin-top: 25vh;
`;

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
    <Container>
      <Authenticator />
    </Container>
  );
}
