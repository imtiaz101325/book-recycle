import { useAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import { Book } from "./models";
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material";

export default function AddBook() {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  async function handleChange(value) {
    try {
      await DataStore.save(
        new Book({
          name : value.name,
          author : value.author,
          donation: value.donation,
          userID: user.attributes.sub,
        })
      );

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      {/* <Form layout="vertical" onFinish={handleChange} size="large">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Author" name="author">
          <Input />
        </Form.Item>
        <Form.Item label="For donation" valuePropName="checked" name="donation">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
    </Container>
  );
}
