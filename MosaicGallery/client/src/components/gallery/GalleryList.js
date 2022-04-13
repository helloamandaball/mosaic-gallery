import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { GalleryContext } from "../../providers/GalleryProvider";
import GalleryThumbnail from "./GalleryThumbnail";

const GalleryList = () => {

    const { galleries, getAllGalleries } = useContext(GalleryContext);

    const navigate = useNavigate();

    useEffect(() => {
        getAllGalleries();
    }, []);

    const handleRandomGalleryBtn = () => {
            const galleryLength = galleries.length
            let randomGallery = Math.floor(Math.random() * galleryLength)
        navigate(`/gallery/${galleries[randomGallery].id}`)
    };

    return (
        <>
            <button type="button" className="newGalleryBtn" onClick={handleRandomGalleryBtn}>
                View Random Gallery
            </button>
            <div className="spacer75">&nbsp;</div>
            
            <div className="thumbnailListContainer">
                {galleries.map((gallery) => (
                    <GalleryThumbnail key={gallery.id} gallery={gallery} />
                )).sort((a, b) => new Date(b.date) - new Date(a.date)).reverse()}
            </div>
        </>
    );
};

export default GalleryList;