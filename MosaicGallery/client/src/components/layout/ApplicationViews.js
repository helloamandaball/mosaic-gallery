import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Hello from "./Hello";
import { MyGalleryList } from "../gallery/MyGalleryList";
import FavoritesList from "../favorites/FavoritesList";
import GalleryList from "../gallery/GalleryList";
import GalleryDetails from "../gallery/GalleryDetails";
import AddGalleryForm from "../gallery/AddGalleryForm";
import EditGalleryForm from "../gallery/EditGalleryForm";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    if (!isLoggedIn) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }
    else {
        return (
            <Routes>
                <Route path="/" element={<Hello />} />
                <Route path="/mygallery" element={<MyGalleryList />} />
                <Route path="/gallery/:id" element={<GalleryDetails />} />
                <Route path="/favorites" element={<FavoritesList />} />
                <Route path="/discover" element={<GalleryList />} />
                <Route path="mygallery/create" element={<AddGalleryForm />} />
                <Route path="gallery/edit/:id" element={<EditGalleryForm />} />
            </Routes>
        );
    }
}
