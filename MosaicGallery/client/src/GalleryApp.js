import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/Header";
import ApplicationViews from "./components/layout/ApplicationViews";
import './GalleryApp.css';
import { UserProfileProvider } from './providers/UserProfileProvider';

function GalleryApp() {
    return (
        <Router>
            <UserProfileProvider>
                <Header />
                <ApplicationViews />
            </UserProfileProvider>
        </Router>
    );
}

export default GalleryApp;
