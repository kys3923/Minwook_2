import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './pages/Landing';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
