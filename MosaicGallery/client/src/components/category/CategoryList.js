import React, { useContext, useEffect, useState } from "react";
import { ListGroup } from "reactstrap";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom"
import { CategoryContext } from "../../providers/CategoryProvider";
import CategoryDetails from "./CategoryDetails"
import "./Category.css";
import "../gallery/Gallery.css";

const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext)

    const navigate = useNavigate()

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleNewCategoryBtn = () => {
        navigate(`/categories/create`)
    };

    return (
        <>
            <div className="mainContent">
                <div className="categoryHeaderBlock">
                    <h3 className="categoryHeading underlineBrick">Categories</h3>
                    <button type="button" className="newCategoryBtn" onClick={handleNewCategoryBtn}>
                        New Category
                    </button>
                </div>
                <div className="spacer50">&nbsp;</div>
                
                <div className="categoryList">
                    {categories.map((category) => {
                        return (
                            <CategoryDetails key={category.id} category={category} />
                        )
                    }).sort()}
                </div>
            </div>
        </>
    );
};

export default CategoryList;

