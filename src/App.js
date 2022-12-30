import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import PostList from './components/PostList';
import PostCreate from './components/PostCreate';
import PostShow from './components/PostShow';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import TagShow from './components/TagShow';
import TagList from './components/TagList';
import Home from './components/Home';
import Profile from './components/Profile';
import PostEdit from './components/PostEdit';
import About from './components/About';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div>
          <img src="//clustrmaps.com/map_v2.png?cl=ffffff&w=a&t=n&d=0QrDbH61H9JzvyMfb4suIgMUwnqTponTI60TKCEM454&co=2d78ad&ct=ffffff" style={{ display: 'none' }} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route exact path='/posts' element={<PostList />} />
          <Route exact path='/posts/:id' element={<PostShow />} />
          <Route exact path='/posts/new' element={<PostCreate />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/logout' element={<Logout />} />
          <Route exact path='/tags/:id' element={<TagShow />} />
          <Route exact path='/tags' element={<TagList />} />
          <Route exact path='/users/:id' element={<Profile />} />
          <Route exact path='/posts/:id/edit' element={<PostEdit />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
