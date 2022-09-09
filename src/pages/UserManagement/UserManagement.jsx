import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/Pagination/Pagination";
import { handleDelete } from "../../utils/handleDelete";
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
                                <button className="users-container__user__del-btn" onClick={() => handleDelete({
                                    id: user.id,
                                    route: `${BASE_URL}/admin/users/delete`,
                                    fetchFunc: callFetch,
                                    message: `Are you sure you want to delete ${user.name}?`,
                                    stateFunc: setUsers,
                                    state: users
                                })}>
                                    Delete
                                </button>
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