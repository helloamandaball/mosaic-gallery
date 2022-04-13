import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { GalleryContext } from "../../providers/GalleryProvider";
import { CategoryContext } from "../../providers/CategoryProvider";

const AddGalleryForm = () => {

    const { addGallery, getAllGalleries } = useContext(GalleryContext);
    const { categories, getAllCategories} = useContext(CategoryContext);

    const [gallery, setGallery] = useState({
        title: "",
        content: "",
        imageLocation: "",
        createDateTime: new Date(),
        categoryId: "",
        userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id
    });

    const navigate = useNavigate();

    useEffect(() => {
        getAllGalleries()
        .then(getAllCategories);
    }, [])

    const handleChangeInput = (event) => {
        const newGallery = { ...gallery }
        newGallery[event.target.id] = event.target.value
        setGallery(newGallery)
    }

    const handleSave = (event) => {
        event.preventDefault()
        addGallery(gallery)
        .then(() => navigate("/mygallery"));
    }

    const handleAddImageInputField = () => {
        let newInput = document.querySelector("#newImageInputField")
        return (
            <FormGroup >
                <Label for="imageLocation" hidden>Image Location</Label>
                <Input
                    id="imageLocation"
                    placeholder="Image 3 url"
                    onChange={handleChangeInput}
                    value={gallery.imageLocation}
                />
                <FormFeedback></FormFeedback>
            </FormGroup>
        )
    }

    return (
        <Container className="pt-5">
            <h2>New Gallery</h2>
            <Form >
                <FormGroup>
                    <Label for="title" hidden>Title</Label>
                    <Input
                        id="title"
                        placeholder="Gallery Title"
                        onChange={handleChangeInput}
                        value={gallery.title}
                    />
                    <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="content" hidden>Content</Label>
                    <Input
                        id="content"
                        placeholder="About this gallery..."
                        onChange={handleChangeInput}
                        value={gallery.content}
                        type="textarea"
                    />
                    <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="imageLocation" hidden>Image Location</Label>
                    <Input
                        id="imageLocation"
                        placeholder="Image 1 url"
                        onChange={handleChangeInput}
                        value={gallery.imageLocation}
                    />
                    <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="imageLocation" hidden>Image Location</Label>
                    <Input
                        id="imageLocation"
                        placeholder="Image 2 url"
                        onChange={handleChangeInput}
                        value={gallery.imageLocation}
                    />
                    <FormFeedback></FormFeedback>
                </FormGroup>
                <div id="newImageInputField"></div>
                <Button className="btn-sm btn-warning my-3" onClick={handleAddImageInputField}>Add another image</Button>

                <FormGroup>
                    <Label for="CategoryId" hidden>Category</Label>
                    <Input
                        id="categoryId"
                        placeholder="Category"
                        type="select"
                        onChange={handleChangeInput}
                        value={gallery.categoryId}
                        >
                        <option value="0">Please Select a Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Input>
                    <FormFeedback></FormFeedback>
                </FormGroup>
                <Button onClick={handleSave}>Submit</Button> 
                <Button className ="mx-3" onClick={() =>{navigate (`/mygallery`)} }>Cancel</Button>
            </Form>
        </Container>
    );
};

export default AddGalleryForm;