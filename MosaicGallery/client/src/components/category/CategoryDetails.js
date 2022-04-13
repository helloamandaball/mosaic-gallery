import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { CategoryContext } from "../../providers/CategoryProvider";
import { useNavigate } from "react-router-dom";
import "./Category.css";

const CategoryDetails = ({category}) => {
    const { deleteCategory } = useContext(CategoryContext); 
    
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/categories/edit/${category.id}`)
    };

    // const handleDelete = () => {
    //     let userInput = prompt("Are you sure you want to delete this? Y/N");
    //     if (userInput !== null && userInput.toUpperCase() === "Y" ){
    //     deleteCategory(category.id)
    //     .then(navigate("/categories"))} 
    // };

    const handleDelete = () => {
        var confirmDelete = window.confirm("Are you sure you want to delete the gallery: " + (category.name) + "?")
        if (confirmDelete) {
            deleteCategory(category.id)
             .then(navigate(`/categories`));
        } else {
             navigate(`/categories`)
        };
    };

    return (
        <div id={category.id} className="categoryListContainer" >
            <h5 className="categoryTitle">{category.name}</h5>
            <div className="categoryEditDelete">
                <button type="button" className="categoryEditBtn" id="category.id" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button type="button" className="categoryDeleteBtn" id="category.id" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </div>
    )
};

export default CategoryDetails;
