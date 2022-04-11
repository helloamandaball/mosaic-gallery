import React, { createContext, useState } from "react";

export const GalleryContext = createContext();

export const GalleryProvider = (props) => {

    const apiUrl = "https://localhost:5001";

    const [galleries, setGalleries] = useState([]);
    const [singleGallery, setSingleGallery] = useState();

    //Get All Galleries -- Not User Specific
    const getAllGalleries = () => {
        return fetch(`${apiUrl}/api/gallery/`)
            .then(r => r.json())
            .then(setGalleries);
    };

    //Get A Single Gallery By Id --- Not User Specific
    const getSingleGalleryById = (id) => {
        // console.log("galleryId:", id)
        return fetch(`${apiUrl}/api/gallery/${id}`)
            .then(r => r.json())
    };

    //Get All of the Current User's Galleries --- User Specific
    const getMyGalleries = (id) => {
        return fetch(`${apiUrl}/api/gallery/mygalleries?userprofileid=${id}`)
            .then(r => r.json())
            .then(setGalleries);
    };
   
    //Add A New Gallery
    const addGallery = (gallery) => {
        return fetch(`${apiUrl}/api/gallery`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gallery)
        })
    };

    //Update A Single Gallery
    const editGallery = (gallery) => {
       
        return fetch(`${apiUrl}/api/gallery/${gallery.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gallery)
        });
    };

    //Delete A Single Gallery
    const deleteGallery = (id) => {
        return fetch(`${apiUrl}/api/gallery/${id}`, {
            method: "DELETE"
        });
    }; 
    
    //Get A User's Single Gallery By Id --- User Specific
    // const getUsersSingleGalleryById = (id, userId) => {
    //     return fetch(`${apiUrl}/api/gallery/mygallery/${id}?userId=${userId}`)
    //         .then(r => r.json())
    //         .then((myGallery) => {
    //             const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    //             if (myGallery.userProfileId === currentUserId) {
    //                 setSingleGallery(myGallery);
    //                 return myGallery;
    //             }
    //             return getUsersSingleGalleryById(myGallery.id);
    //         });
    // };

    return (
        <GalleryContext.Provider value={{
            galleries, getAllGalleries, getMyGalleries, singleGallery, getSingleGalleryById, addGallery, editGallery, deleteGallery
        }}>
            {props.children}
        </GalleryContext.Provider>
    );
};