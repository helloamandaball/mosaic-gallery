import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export function CategoryProvider(props) {

    const apiUrl = "https://localhost:5001";

    const [categories, setCategories] = useState([]);

    //Get All Categories
    const getAllCategories = () => {
        return fetch(`${apiUrl}/api/category`)
            .then((res) => res.json())
            .then(setCategories);
    };

    //Get A Single Category By Id
    const getCategoryById = (id) => {
        return fetch(`${apiUrl}/api/category/${id}`)
            .then(res => res.json())
    }

    //Add A New Category
    const addCategory = (category) => {
        return fetch(`${apiUrl}/api/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        }).then(getAllCategories);
    };

    //Update A Single Category
    const updateCategory = (category) => {
        return fetch(`${apiUrl}/api/category/${category.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
            .then(getAllCategories)
    }

    //Delete A Single Category
    const deleteCategory = (id) => {
        return fetch(`${apiUrl}/api/category/${id}`, {
            method: "DELETE"
        })
            .then(getAllCategories)
    }

    return (
        <CategoryContext.Provider value={{
            categories, getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory 
        }}>
            {props.children}
        </CategoryContext.Provider>
    );

};