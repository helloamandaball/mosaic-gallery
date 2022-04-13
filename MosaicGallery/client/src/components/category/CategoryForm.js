import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import { CategoryDetails } from "./CategoryDetails";
import "./Category.css";

const CategoryForm = () => {
    const { addCategory, getCategoryById, updateCategory } = useContext(CategoryContext);

    const [category, setCategory] = useState({
        name: ""
    })

    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const handleChangeInput = (event) => {
        const newCategory = { ...category }
        newCategory[event.target.id] = event.target.value
        setCategory(newCategory)
    }

    const handleSaveCategory = () => {
        if (category.name === "") {
            window.alert("Please enter a category name")
        } else {
            setIsLoading(true);
            if (id) {
                updateCategory(category)
                    .then(navigate("/categories"))
            } else {
                addCategory(category)
                    .then(navigate("/categories"));
            };
        };
    }

    useEffect(() => {
        if (id) {
            getCategoryById(id)
                .then(category => {
                    setCategory(category)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Form>
                    <FormGroup className="mb-3" >
                        <Label for="name">Category Name:</Label>
                        <Input
                            id="name"
                            placeholder="Enter new category name"
                            onChange={handleChangeInput}
                            value={category.name}
                        />
                    </FormGroup>
                    <Button variant="primary" disabled={isLoading} 
                        onClick={e => {
                        e.preventDefault()
                        handleSaveCategory()
                    }}>
                        {id ? <>Save Update</> : <>Create</>}
                    </Button>
                    <Button className ="mx-3" variant="secondary" onClick={() => navigate("/categories")}>Cancel</Button>
                </Form>
            </div>
        </div>
    );
};

export default CategoryForm;