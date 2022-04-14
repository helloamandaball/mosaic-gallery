import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { GalleryContext } from "../../providers/GalleryProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import './Gallery.css';

const AddGalleryForm = () => {

    const { addGallery, getAllGalleries } = useContext(GalleryContext);
    const { categories, getAllCategories} = useContext(CategoryContext);
    const [counter, setCounter] = useState(0);

   
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
        // let newInput = document.querySelector("newImageInputField")
        // return (
        //     <FormGroup >
        //         <Label for="imageLocation" hidden>Image Location</Label>
        //         <Input
        //             id="imageLocation"
        //             placeholder="Image 3 url"
        //             onChange={handleChangeInput}
        //             value={gallery.imageLocation}
        //         />
        //         <FormFeedback></FormFeedback>
        //     </FormGroup>
        // )
        setCounter(counter + 1);
        console.log("counter:", counter);
    }
    // console.log(handleAddImageInputField)

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

                <p>Images:</p>
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

                {/* Add an additional input field to add more images to Gallery */}
                {Array.from(Array(counter)).map((c, index) => {
                    return (
                        <FormGroup>
                            <Label for="imageLocation" hidden>Image Location</Label>
                            <Input key={c}
                                id="imageLocation"
                                className={index.toString()}
                                placeholder="Image url"
                                onChange={handleChangeInput}
                                value={gallery.imageLocation}
                            />
                            <FormFeedback></FormFeedback>
                        </FormGroup>
                    )
                })}

                <button type="button" className="addImageInputFieldBtn" 
                    onClick={handleAddImageInputField}>
                    Add another image
                </button>

                <Button onClick={handleSave}>Save</Button> 
                <Button className ="mx-3" onClick={() =>{navigate (`/mygallery`)} }>Cancel</Button>
            </Form>
        </Container>
    );
};

export default AddGalleryForm;