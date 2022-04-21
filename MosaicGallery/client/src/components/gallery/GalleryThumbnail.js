import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, } from '@fortawesome/free-solid-svg-icons';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { GalleryContext } from "../../providers/GalleryProvider";
import { FavoritesContext } from "../../providers/FavoritesProvider";
import './Gallery.css';

const GalleryThumbnail = ({ gallery, favorites }) => {

    const { getAllGalleries } = useContext(GalleryContext);
    const { getAllFavsByUser, addToFavs, deleteFromFavs } = useContext(FavoritesContext);

    const  [ isClicked, setClicked ] = useState(false);

    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    const [faved, setFaved] = useState({
        galleryId: gallery.id,
        createDateTime: new Date(),
        userProfileId: user.id
    });

    useEffect(() => {
        if(isClicked){
            debugger
            addToFavs(faved)
            .then(() => getAllFavsByUser(user.id))
        }
    }, [isClicked])

    const handleFav = () =>{
        debugger;
        setClicked(true)
        if(isClicked === true){
            // debugger
            // addToFavs(faved)
            // .then(() => getAllFavsByUser(user.id))
        } else {
            debugger
            deleteFromFavs(gallery.id)
        }
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
                    className={isClicked ? 'thumbnailFavBtnClicked' : 'thumbnailFavBtn'} 
                    onClick={handleFav}>
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