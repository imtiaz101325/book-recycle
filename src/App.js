import { Authenticator } from "@aws-amplify/ui-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Profile from './Profile';
import RequireAuth from './RequireAuth';
import Login from './Login';
import Home from './Home';
import Layout from './Layout';
import AddBook from "./AddBook";

export default function App() {
  return (
    <Authenticator.Provider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/add-book"
            element={
              <RequireAuth>
                <AddBook />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Authenticator.Provider>
  );
}
