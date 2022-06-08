import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import './UserManagement.scss';

export default function UserManagement({ BASE_URL }) {

    const [pageNum, setPageNum] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const [users, setUsers] = useState(null);
    const { callFetch, fetchState } = useFetch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await callFetch(`${BASE_URL}/admin/users/${pageNum}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchUsers()
    }, [pageNum])

    useEffect(() => {
        if(fetchState.data.users) {
            setUsers(fetchState.data.users);
            setPaginationData(fetchState.data.paginationData);
        }
    }, [fetchState])

    const handleDeleteUser = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await callFetch(`${BASE_URL}/admin/users/delete`, {
                    method: 'post',
                    body: JSON.stringify({ toDelete: id })
                })
                let updatedUsers = users.filter((user) => user.id !== id);
                setUsers(updatedUsers);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <header className="user-management-header">
                User Management
            </header>
            <div className="users-container">
                {users && users.length > 0 ? users.map((user) => {
					return (
						<React.Fragment key={user.id}>
							<div className="users-container__user">
                                <p className="users-container__user__id">{user.id}</p>
								<Link to={`/admin/user-management/user/${user.id}`}>{user.name}</Link>
                                <p>Role: {user.is_admin ? 'Admin' : 'User'}</p>
                                <button onClick={() => handleDeleteUser(user.id, user.name)}  className="users-container__user__del-btn">Delete</button>
							</div>
						</React.Fragment>
						)
					})
					: <>
						<div>
							There are no users.
						</div>
					</>
				}
            </div>
            {paginationData ? (
                <Pagination pageData={paginationData} changePageNum={setPageNum} />
            ) : null}
        </>
    )
}