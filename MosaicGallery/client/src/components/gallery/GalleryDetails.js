import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, UncontrolledCarousel } from "reactstrap";
import Carousel from 'react-bootstrap/Carousel'
import { GalleryContext } from "../../providers/GalleryProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css';

const GalleryDetails = ({ gallery }) => {
    const { getSingleGalleryById } = useContext(GalleryContext);

    const [singleGallery, setSingleGallery] = useState();
    const { id } = useParams();

    useEffect(() => {
        if (!gallery) {
            getSingleGalleryById(id)
            .then(setSingleGallery)
        } else {
            setSingleGallery(gallery)
        }
    }, []);

    return (
        <div className="container">
            <Card className="mt-4">
                {/* <CardImg src={singleGallery?.imageLocation} alt={singleGallery?.title} /> */}

                <Carousel pause={'hover'} indicators={false}>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={singleGallery?.imageLocation}
                        alt="slide"
                        />
                        {/* <Carousel.Caption>
                            <h4>title</h4>
                            <p>caption</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={'https://picsum.photos/id/456/1200/600'}
                        alt="slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={'https://picsum.photos/id/789/1200/600'}
                        alt="slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={'https://picsum.photos/id/123/1200/600'}
                        alt="slide"
                        />
                    </Carousel.Item>
                </Carousel>

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

                    <p className="blurbText text-left px-4">{singleGallery?.content}</p>
                    <div className="categoryTextBlock">
                    <p className="categoryText">Category: {singleGallery?.category.name}</p>
                    </div>
                </div>
            </Card>
    </div>
    );
};

export default GalleryDetails;