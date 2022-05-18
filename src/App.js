import { Authenticator, View } from "@aws-amplify/ui-react";
import BookList from "./BookList";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View>
          <BookList />
        </View>
      )}
    </Authenticator>
  );
}

export default App;
