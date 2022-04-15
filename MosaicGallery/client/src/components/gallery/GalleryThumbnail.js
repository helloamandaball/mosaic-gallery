import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, } from '@fortawesome/free-solid-svg-icons';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { GalleryContext } from "../../providers/GalleryProvider";
import './Gallery.css';

const MyGalleryThumbnail = ({ gallery }) => {

    const { getAllGalleries } = useContext(GalleryContext);

    useEffect(() => {
        getAllGalleries();
    }, []);

    // const handleFavorite = () => {
    // };

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
                {/* <div className="thumbnailFavBlock">
                    <button type="button" className="thumbnailFavBtn" id="gallery.id" onClick={handleFavorite}>
                    <FontAwesomeIcon icon={faHeart} />
                    </button>
                </div> */}
            </div>
            <div>
                <p className="categoryThumb">Category: {gallery.category.name}</p>
                {/* <p className="createDateThumb">Created on: {gallery.createDateTime}</p> */}
                <p className="createdByThumb">Created by: {gallery.userProfile.fullName}</p>
            </div>
        </div>
    )
}

export default MyGalleryThumbnail;