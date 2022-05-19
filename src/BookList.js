import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState } from "react";
import { Button, View } from "@aws-amplify/ui-react";

import { Book, User } from "./models";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function data() {
      const response = await DataStore.query(Book);
      setBooks(response);
      console.log(await DataStore.query(User))
    }

    data();
  }, []);

  return (
    <View>
      {
        books.map(book => <View>{book.name}</View>)
      }
      <Button
        onClick={() => { DataStore.save(new Book({ name: "New Book" })); }}
      >Add Book</Button>
    </View>
  )
}