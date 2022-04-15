import React, { useState, createContext } from "react";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {

    const apiUrl = "https://localhost:5001";

    const userProfile = sessionStorage.getItem("userProfile");
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

    const login = (userObject) => {
        return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
            .then((r) => r.json())
            .then((userProfile) => {
                if (userProfile.id) {
                    sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
                    setIsLoggedIn(true);
                    return userProfile
                }
                else {
                    return undefined
                }
            });
    };

    const logout = () => {
        sessionStorage.clear()
        setIsLoggedIn(false);
    };

    const register = (userObject, password) => {
        return fetch(`${apiUrl}/api/UserProfile/GetByEmail?email=${userObject.email}`)
        // .then((r) => r.json())
        .then((userProfile) => {
            if (userProfile.id) {
                return userProfile
            }
            else {
                return undefined
            }
        })
        .then((userExists) => {
            if (!userExists) {
                return fetch(`${apiUrl}/api/userprofile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify(userObject),
                })
                .then((response) => response.json())
                //! If register fails we don't want to assume this will be a saved user.
                .then((responseObj) => {
                    //* If the response object doesn't have a status then it will be a user object
                    if (!responseObj.status) {
                        sessionStorage.setItem("userProfile", JSON.stringify(responseObj))
                        setIsLoggedIn(true);
                        //* Otherwise it failed and it has a status code
                    } else {
                        return responseObj;
                    }
                });
            }
            alert(`User with the email ${userExists.email} already exists`)
        })
    };

    return (
        <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register }}>
            {props.children}
        </UserProfileContext.Provider>
    );
}