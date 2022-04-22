import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { GalleryContext } from "../../providers/GalleryProvider";
import MyGalleryThumbnail from "./MyGalleryThumbnail";
import './Gallery.css';

const MyGalleryList = () => {

    const { galleries, getMyGalleries } = useContext(GalleryContext);

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const navigate = useNavigate();

    useEffect(() => {
        getMyGalleries(currentUser.id);
    }, []);

    const handleNewGalleryBtn = () => {
        navigate(`/mygallery/create`)
    };

    return (
        <>
            <div className="mainContent">
                <div className="galleryHeaderBlock">
                    <h3 className="galleryHeading underlineGold">My Gallery</h3>
                    <button type="button" className="newGalleryBtn" onClick={handleNewGalleryBtn}>
                        Add Gallery Image
                    </button>
                </div>
                <div className="spacer25">&nbsp;</div>
                
                <div className="thumbnailListContainer">
                    {galleries?.map((gallery) => (
                        <MyGalleryThumbnail key={gallery.id} gallery={gallery} />
                    )).sort((a, b) => new Date(b.date) - new Date(a.date)).reverse()}
                </div>
            </div>
        </>
    );
};

export default MyGalleryList;
