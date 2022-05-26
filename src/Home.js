import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Container, Fab, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import BookCard from "./ BookCard";

import { Book } from "./models";

const HomeContainer = styled(Container)`
  min-height: calc(100vh - 4em);
  position: relative;
`;

const AbsoluteFab = styled(Fab)`
  position: absolute;
  bottom: 3em;
  right: 1em;
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
      {route === "authenticated" && <BookCard add />}
      {books.map(({ id, name, author }) => (
        <BookCard key={id} name={name} author={author} />
      ))}
      {route === "authenticated" && (
        <AbsoluteFab color="primary" onClick={handleFabClick}>
          <AddIcon />
        </AbsoluteFab>
      )}
    </HomeContainer>
  );
}
