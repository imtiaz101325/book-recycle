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

export default function BookCard({ add }) {
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
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Card title"
        description="This is the description"
      />
    </Book>
  );
}
