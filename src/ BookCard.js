
import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

export default function BookCard({ name, author, key }) {
  return (
    // <Book
    //   cover={
    //     <img
    //       alt="Random book"
    //       src="https://picsum.photos/200/300"
    //     />
    //   }
    //   actions={[
    //     <SettingOutlined key="setting" />,
    //     <EditOutlined key="edit" />,
    //     <EllipsisOutlined key="ellipsis" />,
    //   ]}
    // >
    //   <Meta
    //     title={name}
    //     description={author}
    //   />
    // </Book>

        <ImageListItem key={key}>
          
          <ImageListItemBar
            title={name}
            subtitle={author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${name}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
  );
}
