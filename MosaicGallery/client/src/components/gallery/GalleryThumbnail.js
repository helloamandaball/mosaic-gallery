import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { GalleryContext } from "../../providers/GalleryProvider";
import './Gallery.css';

const GalleryThumbnail = ({ gallery }) => {

    const { getAllGalleries, deleteGallery } = useContext(GalleryContext);
    const navigate = useNavigate();

    const handleEdit = () =>{
        navigate(`/gallery/edit/${gallery.id}`)
    };

    const handleDelete =() => {
        var confirmDelete = window.confirm("Are you sure you want to delete the tag: " + (gallery.name) + "?")
        if (confirmDelete) {
            deleteGallery(gallery.id)
            .then(getAllGalleries);;
        } else {
            getAllGalleries();
        };
    };

    return (
        
        <div className="thumbnailView">
            <Link to={`gallery/${gallery.id}`} style={{textDecoration: "none"}}>
                <div className="thumbnailImgBox">
                    <img className="thumbnailImg" src={gallery.imageLocation} alt={gallery.title}></img>
                </div>
                <div className="thumbnailTitlePlusEditDel">
                    <p className="thumbnailTitle">{gallery.title}</p>
                    <div className="thumbnailEditDelete">
                        <button type="button" className="thumbnailEditBtn" id="tagProp.id" onClick={handleEdit}>
                            <FontAwesomeIcon icon={faPencilAlt} className="text-secondary"/>
                        </button>
                        <button type="button" className="thumbnailDeleteBtn" id="tagProp.id" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrashAlt} className="text-secondary"/>
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default GalleryThumbnail;