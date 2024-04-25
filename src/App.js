import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './AuthContext'; // Import AuthContext
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
import Login from './components/Page/Login';
import Registration from './components/Page/Registration';
import Home from './components/Navigasi/Home';
import Chat from './components/Chat/Chat';
import AboutUs from './components/Page/about';
import Logout from './components/Page/Logout';
import DataUser from './components/Page/DataUser'
import Edit from './components/Page/EditPass';
import Layout from "./Layout";
import Cuaca from './components/Page/Cuaca';
import History from './components/Page/History'

function App () {
  return (
    <div className="App">
      <Router>
        <AuthProvider> {/* Place AuthProvider here */}
          <Routes> 
            <Route path="/registration" element={<Registration />} />
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
            <Route path="/cuaca" element={<Cuaca />} />
            {/* Wrap Home and other protected components within PrivateRoute */}
            <Route element={<Layout/>}>
              <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/aboutus" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><DataUser></DataUser></PrivateRoute>}/>
              <Route path="/users/edit" element={<PrivateRoute><Edit /></PrivateRoute>}/>
              <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
              <Route path="/history"element={<PrivateRoute><History/></PrivateRoute>}/>
            </Route>
          </Routes>
        </AuthProvider> {/* Close AuthProvider here */}
      </Router>
    </div>
  );
};

export default App;
