// import React, { useContext, useEffect } from "react";
// import { GalleryContext } from "../../providers/GalleryProvider";
// import GalleryCard from "./GalleryDetails";
// import './Gallery.css';

// const GalleryDetails = () => {
    
//   const { galleries, getMyGalleries } = useContext(GalleryContext);

//   const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

//   useEffect(() => {
//     getMyGalleries(currentUser.id);
//   }, []);

//   return (
//     <div className="container">
//       {galleries.map((gallery) => (
//         <div key={gallery.id}>
//           <GalleryCard gallery={gallery} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GalleryDetails;