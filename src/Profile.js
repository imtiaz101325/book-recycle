import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { User } from "./models";
import { Container, Paper, styled, Typography } from "@mui/material";

const ProfileContainer = styled(Container)`
  padding: ${({ theme }) => theme.spacing(5)};
`;

const DetailsContainer = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(2)};
  margin: ${({ theme }) => theme.spacing(10)};
  text-align: center;
`;

export default function Profile() {
  const [userData, setUser] = useState({});

  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    async function data() {
      const response = await DataStore.query(User, user.attributes.sub);

      setUser(response);
    }

    data();
  }, [user.attributes.sub]);

  return (
    <ProfileContainer>
      <Typography variant="h3">Profile</Typography>
      <DetailsContainer>
        <Typography variant="h5">Username: {userData.username}</Typography>
        <Typography variant="h5">First Name: {userData.firstName}</Typography>
        <Typography variant="h5">Last Name: {userData.lastName}</Typography>
        <Typography variant="h5">Email: {userData.email}</Typography>
        <Typography variant="h5">Phone: {userData.phone}</Typography>
      </DetailsContainer>
    </ProfileContainer>
  );
}
