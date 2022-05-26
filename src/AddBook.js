import { useAuthenticator } from "@aws-amplify/ui-react";
import { DataStore, Storage } from "aws-amplify";
import { Book } from "./models";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Paper,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";

const AddBookContainer = styled(Paper)`
  min-height: 80vh;
  margin-top: 6rem;
  padding: 2rem;
`;

const FormContainer = styled("form")`
  padding: ${(props) => props.theme.spacing(4)};
  height: 100%;
`;

export default function AddBook() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [filename, setFilename] = useState();
  const [imageUploading, setImageUploading] = useState(false);
  const [fileKey, setFileKey] = useState();

  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchDonation = watch("donation");

  async function handleChange(value) {
    try {
      await DataStore.save(
        new Book({
          name: value.name,
          author: value.author,
          donation: value.donation,
          userID: user.attributes.sub,
          image: fileKey,
          price: value.price,
        })
      );

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit(data) {
    handleChange(data);
  }

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    try {
      setImageUploading(true);
      setFilename(file.name);
      const upload = await Storage.put(
        `${user.attributes.sub}-${Date.now()}-${file.name}`,
        file
      );
      setFileKey(upload.key);
      setImageUploaded(true);
      setImageUploading(false);
    } catch (error) {
      setImageUploading(false);
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <AddBookContainer>
      <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
        Add a Book
      </Typography>
      <FormContainer
        defaultValues={{ name: "" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup>
          <TextField
            label="Name"
            {...register("name", { required: true })}
            error={errors.name}
            helperText={errors.name && "Name is required"}
            sx={{ marginBottom: "1rem" }}
          />
          {imageUploaded ? (
            <>
              <DoneIcon color="success" />
              <Typography variant="p" sx={{ marginBottom: "1rem" }}>
                {filename} successfully uploaded
              </Typography>{" "}
            </>
          ) : !imageUploading ? (
            <Button
              variant="contained"
              component="label"
              sx={{ marginBottom: "1rem" }}
              onChange={handleImageUpload}
            >
              Upload Image
              <input type="file" accept="image/png, image/jpeg" hidden />
            </Button>
          ) : (
            <>
              <CircularProgress />
              <Typography variant="p" sx={{ marginBottom: "1rem" }}>
                Uploading {filename}
              </Typography>
            </>
          )}
          <TextField
            label="Author"
            {...register("author", { required: true })}
            error={errors.author}
            helperText={errors.author && "Author is required"}
          />
          <FormControlLabel
            control={<Switch label="Donation" {...register("donation")} />}
            label="Donation"
          />
          {!watchDonation && (
            <TextField
              label="Price"
              {...register("price", {
                required: !watchDonation,
                pattern: /^(0|[1-9][0-9]*)$/i,
              })}
              error={errors.price}
              helperText={errors.price && "Price is required"}
              sx={{ marginBottom: "1rem" }}
            />
          )}
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginRight: "1em" }}
          disabled={!imageUploaded}
        >
          Add Book
        </Button>
        {!imageUploaded && (
          <Typography variant="p">Upload image to continue</Typography>
        )}
      </FormContainer>
    </AddBookContainer>
  );
}
