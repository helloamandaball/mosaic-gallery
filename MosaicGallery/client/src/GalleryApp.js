import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/Header";
import ApplicationViews from "./components/layout/ApplicationViews";
import Footer from './components/layout/Footer';
import { UserProfileProvider } from './providers/UserProfileProvider';
import { GalleryProvider } from './providers/GalleryProvider';
import { CategoryProvider } from './providers/CategoryProvider';
import { FavoritesProvider } from './providers/FavoritesProvider';
import './GalleryApp.css';

function GalleryApp() {
    return (
        <Router>
            <UserProfileProvider>
            <GalleryProvider>
            <CategoryProvider>
            <FavoritesProvider>
                <Header />
                <ApplicationViews />
                <Footer />
            </FavoritesProvider>
            </CategoryProvider>
            </GalleryProvider>
            </UserProfileProvider>
        </Router>
    );
}

export default GalleryApp;
