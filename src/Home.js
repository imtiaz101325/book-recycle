import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Container } from "@mui/material";

import BookCard from "./ BookCard";

import { Book } from "./models";

export default function Home() {
  const [books, setBooks] = useState([]);

  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    async function data() {
      const response = await DataStore.query(Book);
      setBooks(response);
    }

    data();
  }, []);

  return (
    <Container>
      {route === "authenticated" && <BookCard add />}
      {books.map(({ id, name, author }) => (
        <BookCard key={id} name={name} author={author} />
      ))}
    </Container>
  );
}
