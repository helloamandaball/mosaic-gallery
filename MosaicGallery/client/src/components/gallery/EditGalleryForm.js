import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { GalleryContext } from "../../providers/GalleryProvider";
import { CategoryContext } from "../../providers/CategoryProvider";

const EditGalleryForm = () => {

    const { editGallery, getAllGalleries, getSingleGalleryById } = useContext(GalleryContext);
    const { categories, getAllCategories} = useContext(CategoryContext);

    const [gallery, setGallery] = useState({
        title: "",
        content: "",
        imageLocation: "",
        createDateTime: new Date(),
        categoryId: "",
        userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const handleChangeInput = (event) => {
        const updateGallery = { ...gallery }
        updateGallery[event.target.id] = event.target.value
        setGallery(updateGallery)
        // console.log("handleChangeInput is working. Gallery Id:", id)
    }

    const handleUpdateGallery = (event) => {
        event.preventDefault()
        if(id) {
            editGallery({
                id: gallery.id,
                title: gallery.title,
                content: gallery.content,
                imageLocation: gallery.imageLocation,
                createDateTime: gallery.createDateTime,
                categoryId: gallery.categoryId,
                userProfileId: gallery.userProfileId
            })
            .then(getAllGalleries)
            .then(() => navigate("/mygallery"))
            // console.log("handleUpdateGallery is working. Gallery Id:", id)
        }        
    }
    
    useEffect(() => {
        getSingleGalleryById(id)
        .then(gallery => {setGallery(gallery)})
        .then(getAllCategories);
        // console.log("usEffect is working. Gallery Id:", id)
    }, [])

    return (
        <Container className="pt-5">
            <h2>Edit Gallery Image: {gallery.title}</h2>
            <Form >
                <FormGroup >
                    <Label for="title" hidden>Title</Label>
                    <Input
                        id="title"
                        placeholder="Title"
                        onChange={handleChangeInput}
                        value={gallery.title}
                    />
                    <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup >
                    <Label for="content" hidden>Content</Label>
                    <Input
                        id="content"
                        placeholder="Content"
                        onChange={handleChangeInput}
                        value={gallery.content}
                        type="textarea"
                    />
                    <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup >
                    <Label for="imageLocation" hidden>Image Location</Label>
                    <Input
                        id="imageLocation"
                        placeholder="Image Location"
                        onChange={handleChangeInput}
                        value={gallery.imageLocation}
                    />
                    <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup >
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
                <Button onClick={handleUpdateGallery}>Update</Button>
                <Button className ="mx-3" onClick={() =>{navigate (`/mygallery`)} }>Cancel</Button>
            </Form>
        </Container>
    );
};

export default EditGalleryForm;