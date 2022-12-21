import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import PostCreate from './components/PostCreate';
import PostShow from './components/PostShow';
import Footer from './components/Footer';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        <Route exact path='/posts' element={<PostList />} />
        <Route exact path='/posts/:id' element={<PostShow />} />
        <Route exact path='/posts/new' element={<PostCreate />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
