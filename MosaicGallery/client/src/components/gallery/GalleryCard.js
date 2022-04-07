import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import './Gallery.css';

const GalleryCard = ({ gallery }) => {

  return (
    <Card className="mt-4">
          
      <CardImg src={gallery.imageLocation} alt={gallery.title} />
    
      <div className="textContent">
         
        <h3 className="galleryHeader text-left px-2">
            {gallery.title}
        </h3>

        <div className="seperatorRule"></div>

        <div className="createdByContent">
            <img className="avatarImg" src={gallery.userProfile.imageLocation} alt={gallery.userProfile.fullName}/> 
            <p className="createdByText">
                Created by: {gallery.userProfile.fullName}
            </p>
        </div>
        
        {/* <p className="text-left px-2">{gallery.category.name}</p> */}

        <p className="blurbText text-left px-4">{gallery.content}</p>

      </div>
      
    </Card> 
  );
};

export default GalleryCard;