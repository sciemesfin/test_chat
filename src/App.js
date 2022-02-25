import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import ChatContainer from "./pages/ChatContainer";

import { useSelector } from 'react-redux'
import { hasLoggedIn } from "./redux/user.slice";


export default () => {
  const isLoggedIn = useSelector(hasLoggedIn);
  const [authenticated, setAuthenticated] = useState(isLoggedIn)
  useEffect(() => checkUser(), [isLoggedIn])
  const checkUser = async () => setAuthenticated(await isLoggedIn)

  return <Router >
    <Routes>
      <Route
        path="*"
        element={<Navigate to={authenticated ? "/test_chat/chat" : "/test_chat"} />}
      />
      {
        authenticated ?
          <Route
            exact
            path='/test_chat/chat'
            element={<ChatContainer />}
          />
          : <Route
            exact
            path='/test_chat'
            element={<Signin />}
          />
      }

    </Routes>
  </Router>
}
