import { useAuthenticator, View } from "@aws-amplify/ui-react";
import styled from "styled-components";
import { Descriptions } from "antd";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { User } from "./models";

const Container = styled(View)`
  padding: 20vh;
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
    <Container>
      <Descriptions title="User Info">
        <Descriptions.Item label="Username">
          {userData.username}
        </Descriptions.Item>
        <Descriptions.Item label="First Name">
          {userData.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          {userData.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Telephone">
          {userData.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
      </Descriptions>
    </Container>
  );
}
