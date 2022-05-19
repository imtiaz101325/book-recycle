import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState } from "react";
import { Button, useAuthenticator, View } from "@aws-amplify/ui-react";
import styled from "styled-components";

import { Book } from "./models";
import BookCard from "./ BookCard";

const Container = styled(View)`
  padding: 10em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* This is better for small screens, once min() is better supported */
  /* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
  gap: 10rem;
`;

export default function BookList() {
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
      {route === "authenticated" && (
        <BookCard add/>
      )}
      {books.map((book) => (
        <BookCard />
      ))}
    </Container>
  );
}
