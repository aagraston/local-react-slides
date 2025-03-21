import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import { createBackgroundCubes } from './Cubes';

createBackgroundCubes({
    cubeSize: { min: 5, max: 15 },
    speed: { spin: 8, move: 15 },
    amount: 50,
    direction: 'up-left',
  });

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);