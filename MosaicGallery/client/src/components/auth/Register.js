import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(UserProfileContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [invalidFields, setInvalidFields] = useState({
     firstName: false,
     lastName: false,
     userName: false,
     email: false,
     imageLocation: false,
     password: false,
     confirmPassword: false 
    });

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match.");
    } else {
      const userProfile = { firstName, lastName, userName, imageLocation, email };
      register(userProfile, password)
        .then((failedRegister) => {
          
          if (!failedRegister) {
            //* YAY we made it!
            navigate("/")
          } else {

            const newInvalidFields = { ...invalidFields };

            //* For each validation error display it's message in the field which is invalid.
            for (const invalidType of Object.keys(failedRegister.errors)) {
              const invalidField = invalidType;

              //? ImageLocation => imageLocation
              const fieldId = invalidField.replace(/^[A-Z]/, invalidField[0].toLowerCase());

              //? ex. The field Profile Image URL must be a string or array type with a maximum length of '255'
              const message = failedRegister.errors[invalidType][0].replace(invalidField, document.getElementById(fieldId).previousElementSibling.innerText);
              
              document.getElementById(fieldId).nextElementSibling.innerText = message;
              
              newInvalidFields[fieldId] = true;
              
            }

            setInvalidFields(newInvalidFields);
          }

        });
    }
 };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input invalid={invalidFields.firstName} id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
          <FormFeedback id="firstName-invalid"></FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input invalid={invalidFields.lastName} id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
          <FormFeedback id="lastName-invalid"></FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="userName">User Name</Label>
          <Input invalid={invalidFields.userName} id="userName" type="text" onChange={e => setUserName(e.target.value)} />
          <FormFeedback id="userName-invalid"></FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input invalid={invalidFields.email} id="email" type="text" onChange={e => setEmail(e.target.value)} />
          <FormFeedback id="email-invalid"></FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageLocation">Profile Image URL</Label>
          <Input invalid={invalidFields.imageLocation} id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
          <FormFeedback id="imageLocation-invalid"></FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          <FormFeedback id="password-invalid"></FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          <FormFeedback id="confirmPassword-invalid"></FormFeedback>
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
