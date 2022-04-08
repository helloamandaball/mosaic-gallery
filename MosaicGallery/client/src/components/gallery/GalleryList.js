import React, { useContext, useEffect } from "react";
import { GalleryContext } from "../../providers/GalleryProvider";
import GalleryDetails from "./GalleryDetails";

const GalleryList = () => {
  
  const { galleries, getAllGalleries } = useContext(GalleryContext);

  useEffect(() => {
    getAllGalleries();
  }, []);

  return (
    <div className="container">
      {galleries.map((gallery) => (
          <GalleryDetails key={gallery.id} gallery={gallery} />
      ))}
    </div>
  );
};

export default GalleryList;