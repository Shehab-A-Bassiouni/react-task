import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Header from './Header';
import Body from './Body';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';
import Landing from './Landing';

function App() {
  const [count, setCount] = useState(0);

  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/transactions" element={<Body />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
