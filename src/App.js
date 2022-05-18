import { DataStore } from "@aws-amplify/datastore";
import { useEffect } from "react";
import { Authenticator, View } from "@aws-amplify/ui-react";

import { Book } from "./models";

function App() {
  useEffect(() => {
    async function data() {
      const models = await DataStore.query(Book);
      console.log(models);
    }

    data();
  });

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </View>
      )}
    </Authenticator>
  );
}

export default App;
