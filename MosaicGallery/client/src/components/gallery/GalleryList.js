import React, { useContext, useEffect } from "react";
import { GalleryContext } from "../../providers/GalleryProvider";
import GalleryCard from "./GalleryCard";

const GalleryList = () => {
  
  const { galleries, getAllGalleries } = useContext(GalleryContext);

  useEffect(() => {
    getAllGalleries();
  }, []);

  return (
    <div className="container">
      {galleries.map((gallery) => (
        <div key={gallery.id}>
          <GalleryCard gallery={gallery} />
        </div>
      ))}
    </div>
  );
};

export default GalleryList;