import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import SearchProvider from './components/context/SearchProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <SearchProvider>
        <App/>
      </SearchProvider>
      <Toaster/>
    </BrowserRouter>
  </React.StrictMode>
);


