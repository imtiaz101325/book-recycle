import { Authenticator, Button, View } from "@aws-amplify/ui-react";
import BookList from "./BookList";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View>
          <Button onClick={signOut}>Sign Out</Button>
          <BookList />
        </View>
      )}
    </Authenticator>
  );
}

export default App;
