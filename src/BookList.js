import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState } from "react";
import { Button, useAuthenticator, View } from "@aws-amplify/ui-react";

import { Book } from "./models";

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
    <View>
      {books.map((book) => (
        <View>{book.name}</View>
      ))}
      {route === "authenticated" && (
        <Button
          onClick={() => {
            DataStore.save(new Book({ name: "New Book" }));
          }}
        >
          Add Book
        </Button>
      )}
    </View>
  );
}
