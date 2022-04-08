import React from 'react';
import { createRoot } from 'react-dom/client';
import GalleryApp from './GalleryApp';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <GalleryApp />
);


