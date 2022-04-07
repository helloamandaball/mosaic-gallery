import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/Header";
import ApplicationViews from "./components/layout/ApplicationViews";
import { UserProfileProvider } from './providers/UserProfileProvider';
import { GalleryProvider } from './providers/GalleryProvider';
import './GalleryApp.css';

function GalleryApp() {
    return (
        <Router>
            <UserProfileProvider>
            <GalleryProvider>
                <Header />
                <ApplicationViews />
            </GalleryProvider>
            </UserProfileProvider>
        </Router>
    );
}

export default GalleryApp;
