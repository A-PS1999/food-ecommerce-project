import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import './UserDetails.scss';

export default function UserDetails({ BASE_URL }) {

    let params = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const { callFetch, fetchState } = useFetch();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                await callFetch(`${BASE_URL}/admin/user/${params.userId}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchUserDetails()
    }, [])

    useEffect(() => {
        setUserDetails(fetchState.data.userDetails);
    }, [fetchState])

    return (
        <>
            <header className="userdetails-header">
                {userDetails ? userDetails.name : 'Loading...'}
            </header>
            <div className="userdetails-container">
                {userDetails ? (
                    <>
                        <div className="userdetails-container__upper-box">
                            <p>Role: {userDetails.is_admin ? 'Administrator' : 'User'}</p>
                            <p>Email: {userDetails.email}</p>
                        </div>
                        <div className="userdetails-container__lower-box">
                            {userDetails.user_id ? (
                                <div>
                                    <p>Address: {userDetails.address_line1} {userDetails.address_line2}</p>
                                    <p>City: {userDetails.city}</p>
                                    <p>Post Code: {userDetails.post_code}</p>
                                    <p>Country: {userDetails.country}</p>
                                    <p>Phone Number: {userDetails.phone_no}</p>
                                </div>
                            ) : "This user does not have any saved address details."}
                        </div>
                    </>
                ) : 'Loading...'}
            </div>
        </>
    )
}