import {
  Chip,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  styled,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import LoopIcon from "@mui/icons-material/Loop";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const MoreInfoButton = styled(IconButton)`
  color: #fff;
`;

const Container = styled(ImageListItem)`
  position: relative;
`;

const InfoChip = styled(Chip)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  line-height: initial;
`;

export default function BookCard({ data }) {
  const { name, author, image, id, donation, price } = data;

  return (
    <Container key={id}>
      <InfoChip
        icon={donation ? <LoopIcon /> : <AccountBalanceWalletIcon />}
        label={donation ? "recycle" : price}
        color={donation ? "success" : "primary"}
      />
      <AmplifyS3Image imgKey={image} />
      <ImageListItemBar
        title={name}
        subtitle={author}
        actionIcon={
          <MoreInfoButton>
            <InfoIcon />
          </MoreInfoButton>
        }
      />
    </Container>
  );
}
