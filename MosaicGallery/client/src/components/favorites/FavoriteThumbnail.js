import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, } from '@fortawesome/free-solid-svg-icons';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { GalleryContext } from "../../providers/GalleryProvider";
import { FavoritesContext } from "../../providers/FavoritesProvider";
import '.././gallery/Gallery.css';

const GalleryThumbnail = ({ gallery, favorites }) => {

    const { getAllGalleries } = useContext(GalleryContext);
    const { getAllFavsByUser, deleteFromFavs } = useContext(FavoritesContext);

    const  [ isFavorited, setFavorited ] = useState(true);

    const navigate = useNavigate();

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))


    const handleUnFav = () =>{
        // var confirmDelete = window.confirm("Are you sure you want to delete the gallery: " + (gallery.title) + "?")
        // if (confirmDelete) {
        //     deleteFromFavs(gallery.id)
        //     .then(getAllGalleries)
        //     .then(window.location.reload(false))
        //     .then(navigate(`/favorites`))
        // }else {
        //     navigate(`/favorites`)
        // }
        deleteFromFavs(gallery.id)
        .then(getAllFavsByUser(currentUser.id))
    }

    return (
        <div className="thumbnailView">
            <Link to={`/gallery/${gallery.id}`} style={{ textDecoration: "none" }}>
                <div className="thumbnailImgBox">
                    <img className="thumbnailImg" src={gallery.imageLocation} alt={gallery.title}></img>
                </div>
            </Link>
            <div className="thumbnailTitlePlusFav">
                <Link to={`/gallery/${gallery.id}`} style={{ textDecoration: "none" }}>
                    <p className="thumbnailTitle">{gallery.title}</p>
                </Link>
                <div className="thumbnailFavBlock">
                    <button type="button" id="gallery.id" 
                    className={isFavorited ? 'thumbnailFavBtnClicked' : 'thumbnailFavBtn'} 
                    onClick={handleUnFav}>
                        {/* <FontAwesomeIcon icon={faHeart} /> */}
                        &#10084;
                    </button>
                    
                    {/* Checkbox attempt */}
                    {/* <input type="checkbox" label="Favorite" value={isClicked} onChange={handleFav} /> */}

                </div>
            </div>
            <div>
                <p className="categoryThumb">Category: {gallery.category?.name}</p>
                {/* <p className="createDateThumb">Created on: {gallery.createDateTime}</p> */}
                <p className="createdByThumb">Created by: {gallery.userProfile?.fullName}</p>
            </div>
        </div>
    )
}

export default GalleryThumbnail;