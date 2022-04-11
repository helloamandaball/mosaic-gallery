import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { GalleryContext } from "../../providers/GalleryProvider";
import './Gallery.css';

const MyGalleryThumbnail = ({ gallery }) => {

    const { getMyGalleries, deleteGallery } = useContext(GalleryContext);

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/gallery/edit/${gallery.id}`)
    };

    const handleDelete = () => {
        var confirmDelete = window.confirm("Are you sure you want to delete the gallery: " + (gallery.title) + "?")
        if (confirmDelete) {
            deleteGallery(gallery.id)
            .then(getMyGalleries(currentUser.id))
             .then(navigate(`/mygallery`));
        } else {
             getMyGalleries(currentUser.id)
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
                    <p className="createDate">Created on: {gallery.createDateTime}</p>
                </div>
            </div>
    )
}

export default MyGalleryThumbnail;