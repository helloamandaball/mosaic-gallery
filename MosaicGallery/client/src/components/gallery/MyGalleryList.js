import React, { useContext, useEffect } from "react";
import { GalleryContext } from "../../providers/GalleryProvider";
import GalleryThumbnail from "./GalleryThumbnail";
import { useNavigate } from "react-router-dom"
import './Gallery.css';


const MyGalleryList = () => {

    const { galleries, getMyGalleries, addGallery } = useContext(GalleryContext);

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const navigate = useNavigate()

    useEffect(() => {
        getMyGalleries(currentUser.id);
    }, []);

    const handleNewGalleryBtn = () => {
        navigate('/gallery/add')
    };

    return (
        <>
            <button type="button" className="newGalleryBtn btn btn-warning btn-sm" onClick={handleNewGalleryBtn}>
                NEW GALLERY
            </button>

            <div className="thumbnailContainer">
                {galleries.map((gallery) => (
                    <div key={gallery.id}>
                        <GalleryThumbnail gallery={gallery} />
                    </div>
                ))}
                
            </div>
        </>
    );
};

export default MyGalleryList;