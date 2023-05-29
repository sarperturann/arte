import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Shop from './pages/Shop';
import AuthDetails from './components/AuthDetails';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const store = createStore(rootReducer);

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setIsLoggedIn(true);
      } else {
        setAuthUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const handleSignIn = () => {
    // Perform sign-in logic here
    // Set isLoggedIn to true if sign-in is successful
    setIsLoggedIn(true);
  };

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={<SignIn toggleSignUp={toggleSignUp} handleSignIn={handleSignIn} />}
            />
            <Route path="/signup" element={<SignUp toggleSignUp={toggleSignUp} />} />
            {isLoggedIn && <Route path="/shop" element={<Shop />} />}
          </Routes>
          <AuthDetails setIsLoggedIn={setIsLoggedIn} />
        </div>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </Router>
    </Provider>
  );
};

export default App;
