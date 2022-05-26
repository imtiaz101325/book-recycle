
import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy';

export default function BookCard({ name, author, image, id }) {
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

        <ImageListItem key={id}>
          <AmplifyS3Image imgKey={image} />
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
