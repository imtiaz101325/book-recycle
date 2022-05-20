import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  FileAddOutlined
} from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Book = styled(Card)`
  width: 20vw;
`;

export default function BookCard({ add, name, author }) {
  if (add) {
    return (
      <Link to="/add-book">
        <Book
        cover={
          <img
            alt="add book"
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
          />
        }
        actions={[
          <FileAddOutlined key="add" />
        ]}
      >
        <Meta
          title="Add New"
          description="Add a new book to sell or donate"
        />
      </Book>
      </Link>
    );
  }

  return (
    <Book
      cover={
        <img
          alt="Random book"
          src="https://picsum.photos/200/300"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={name}
        description={author}
      />
    </Book>
  );
}
