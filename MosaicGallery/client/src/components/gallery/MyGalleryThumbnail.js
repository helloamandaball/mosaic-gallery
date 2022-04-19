import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { GalleryContext } from "../../providers/GalleryProvider";
import './Gallery.css';

const MyGalleryThumbnail = ({ gallery }) => {

    const { getAllGalleries, deleteGallery } = useContext(GalleryContext);

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/mygallery/edit/${gallery.id}`)
    };

    const handleDelete = () => {
        var confirmDelete = window.confirm("Are you sure you want to delete the gallery: " + (gallery.title) + "?")
        if (confirmDelete) {
            deleteGallery(gallery.id)
                .then(getAllGalleries)
                .then(window.location.reload(false))
                .then(navigate(`/mygallery`));
        } else {
            navigate(`/mygallery`)
        };
    };

    return (
        <div className="thumbnailView">
            <Link to={`/gallery/${gallery.id}`} style={{ textDecoration: "none" }}>
                <div className="thumbnailImgBox">
                    <img className="thumbnailImg" src={gallery.imageLocation} alt={gallery.title}></img>
                </div>
            </Link>
            <div className="thumbnailTitlePlusEditDel">
                <Link to={`/gallery/${gallery.id}`} style={{ textDecoration: "none" }}>
                    <p className="thumbnailTitle">{gallery.title}</p>
                </Link>
                <div className="thumbnailEditDelete">
                    <button type="button" className="thumbnailEditBtn" id="gallery.id" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button type="button" className="thumbnailDeleteBtn" id="gallery.id" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </div>
            <div>
                <p className="categoryThumb">Category: {gallery.category.name}</p>
                <p className="createDateThumb">Created on: {gallery.createDateTime}</p>
            </div>
        </div>
    )
}

export default MyGalleryThumbnail;