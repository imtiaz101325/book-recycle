import { DataStore } from "@aws-amplify/datastore";
import { useEffect } from "react";

import { Book } from "./models";

function App() {
  useEffect(() => {
    async function data() {
      const models = await DataStore.query(Book);
      console.log(models);
    }

    data();
  });

  return <div></div>;
}

export default App;
