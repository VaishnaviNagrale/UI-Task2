import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import PostListPage from './pages/PostListPage';

const App = () => {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<SignupPage />} />
              <Route path="/posts" element={<PostListPage />} />
            </Routes>
        </Router>
    );
};

export default App;
