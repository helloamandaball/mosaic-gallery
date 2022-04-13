import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import { GalleryContext } from "../../providers/GalleryProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import './Gallery.css';

const GalleryDetails = ({ gallery }) => {
    const { getSingleGalleryById } = useContext(GalleryContext);
    const { getAllCategories, getCategoryById } = useContext(CategoryContext);

    const [singleGallery, setSingleGallery] = useState();
    const { id } = useParams();

    useEffect(() => {
        if (!gallery) {
            getSingleGalleryById(id)
            .then(setSingleGallery)
            // .then(getCategoryById)
        } else {
            setSingleGallery(gallery)
            // .then(getCategoryById)
        }
    }, []);

    return (
        <div className="container">
            <Card className="mt-4">
                <CardImg src={singleGallery?.imageLocation} alt={singleGallery?.title} />
                <div className="textContent">
                    <h3 className="galleryHeader text-left px-2">
                        {singleGallery?.title}
                    </h3>
                    <div className="separatorRule"></div>

                    <div className="createdByContent">
                        <img className="avatarImg" src={singleGallery?.userProfile.imageLocation} alt={singleGallery?.userProfile.fullName} />
                        <p className="createdByText">
                            Created by: {singleGallery?.userProfile.fullName}
                        </p>
                    </div>

                    <p className="categoryText">Category: {singleGallery?.category.name}</p>

                    <p className="blurbText text-left px-4">{singleGallery?.content}</p>
                </div>
            </Card>
    </div>
    );
};

export default GalleryDetails;