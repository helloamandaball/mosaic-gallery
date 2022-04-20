import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = (props) => {

    const apiUrl = "https://localhost:5001";

    const [favorites, setFavorites] = useState([]);

    // Get All Favorite Galleries by Current User
    const getAllFavsByUser = (userId) => {
        return fetch(`${apiUrl}/api/favorites?userprofileid=${userId}`)
            .then((res) => res.json())
            .then(setFavorites);
    };

    //Add To Favorites
    const addToFavs = (favorites) => {
        return fetch(`${apiUrl}/api/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favorites)
        })
    };

    // Delete from Favorites
    const deleteFromFavs = (galleryId) => {
        return fetch(`${apiUrl}/api/favorites/${galleryId}`, {
            method: "DELETE"
        });
    }; 

    return (
        <FavoritesContext.Provider value={{
            favorites, getAllFavsByUser, addToFavs, deleteFromFavs
        }}>
            {props.children}
        </FavoritesContext.Provider>
    );
};