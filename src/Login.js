import { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, useLocation } from "react-router";
import { Container, styled } from "@mui/material";

const LoginContainer = styled(Container)`
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
    <LoginContainer>
      <Authenticator />
    </LoginContainer>
  );
}
