import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './pages/Landing';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Landing />
      <Footer />
    </Router>
  );
}

export default App;
