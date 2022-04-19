import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { GalleryContext } from "../../providers/GalleryProvider";
import { FavoritesContext } from "../../providers/FavoritesProvider";
import GalleryThumbnail from "../gallery/GalleryThumbnail";
import '../gallery/Gallery.css';

const FavoritesList = () => {
    const { galleries, getAllGalleries } = useContext(GalleryContext);
    const { getAllFavsByUser } = useContext(FavoritesContext);

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const navigate = useNavigate();

    useEffect(() => {
        getAllGalleries()
        .then(getAllFavsByUser(currentUser.id))
        // .then(window.location.reload(false))
        .then(navigate(`/favorites`));
    }, []);


    return (
        <>
            <div className="mainContent">
                <div className="spacer13"></div>
                <div className="galleryHeaderBlock">
                    <h3 className="galleryHeading underlineAqua">Favorites</h3>
                </div>
                <div className="spacer13"></div>
                <div className="spacer25">&nbsp;</div>
                
                <div className="thumbnailListContainer">
                    {galleries.map((gallery) => (
                        <GalleryThumbnail key={gallery.id} gallery={gallery} />
                    )).sort((a, b) => new Date(b.date) - new Date(a.date)).reverse()}
                </div>
            </div>
        </>
    );
}

export default FavoritesList;