import React, { useContext, useEffect, useState } from "react";
import { ListGroup } from "reactstrap";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom"
import { CategoryContext } from "../../providers/CategoryProvider";
import CategoryDetails from "./CategoryDetails"
import "./Category.css";

const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext)

    const navigate = useNavigate()

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleNewGalleryBtn = () => {
        navigate(`/categories/create`)
    };

    return (
        <>
            <div className="categoryHeaderContainer">
                <h4 className="categoryHeader">Categories</h4>
                <button type="button" className="newCategoryBtn" onClick={handleNewGalleryBtn}>
                    New Category
                </button>
                <div className="spacer75">&nbsp;</div>
            </div>
            <section className="categoryList">
                {categories.map((category) => {
                    return (
                        <CategoryDetails key={category.id} category={category} />
                    )
                }).sort()}
            </section>
        </>
    );
};

export default CategoryList;

