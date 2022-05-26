import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Container, Fab, ImageList, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import BookCard from "./ BookCard";

import { Book } from "./models";

const HomeContainer = styled(Container)`
  min-height: calc(100vh - 4em);
  margin-top: 5rem;
`;

const AbsoluteFab = styled(Fab)`
  position: fixed;
  right: calc((100vw - 1100px) / 2);
  top: calc(100vh - 5rem);
`;

export default function Home() {
  const [books, setBooks] = useState([]);

  const { route } = useAuthenticator((context) => [context.route]);
  const navigate = useNavigate();

  useEffect(() => {
    async function data() {
      const response = await DataStore.query(Book);
      setBooks(response);
    }

    data();
  }, []);

  function handleFabClick() {
    navigate("/add-book");
  }

  return (
    <HomeContainer>
      <ImageList>
        {books.map((book) => (
          <BookCard data={book} />
        ))}
      </ImageList>
      {route === "authenticated" && (
        <AbsoluteFab color="primary" onClick={handleFabClick}>
          <AddIcon />
        </AbsoluteFab>
      )}
    </HomeContainer>
  );
}
