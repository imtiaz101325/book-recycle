import { View } from "@aws-amplify/ui-react";
import styled from "styled-components";

import BookList from "./BookList";

const Container = styled(View)`

`;

export default function Home() {
  return (
    <Container>
      <BookList />
    </Container>
  );
}
