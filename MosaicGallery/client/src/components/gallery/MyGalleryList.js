import React, { useContext, useEffect } from "react";
import { GalleryContext } from "../../providers/GalleryProvider";
import MyGalleryThumbnail from "./MyGalleryThumbnail";
import { useNavigate, Link } from "react-router-dom"
import './Gallery.css';


export const MyGalleryList = () => {

    const { galleries, getMyGalleries } = useContext(GalleryContext);

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const navigate = useNavigate()

    useEffect(() => {
        getMyGalleries(currentUser.id);
    }, []);

    const handleNewGalleryBtn = () => {
        navigate(`/mygallery/create`)
    };

    return (
        <>
            <button type="button" className="newGalleryBtn" onClick={handleNewGalleryBtn}>
                New Gallery
            </button>
            <div className="spacer75">&nbsp;</div>
            
            <div className="thumbnailListContainer">
                {galleries.map((gallery) => (
                    <MyGalleryThumbnail key={gallery.id} gallery={gallery} />
                )).sort((a, b) => b.createDateTime - a.createDateTime)}
            </div>
        </>
    );
};

