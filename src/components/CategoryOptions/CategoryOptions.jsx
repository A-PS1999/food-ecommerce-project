import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

export default function CategoryOptions({ BASE_URL }) {

    const { callFetch, fetchState } = useFetch();
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                await callFetch(`${BASE_URL}/admin/category-list`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategories();
    }, [])

    useEffect(() => {
        if (fetchState.data.cat_list) {
            setOptions(fetchState.data.cat_list)
        }
    }, [fetchState])

    return (
        <>
            {options && options.length > 0 ? options.map((option) => {
                return (
                    <React.Fragment key={option.id}>
                        <option value={option.id}>{option.cat_name}</option>
                    </React.Fragment>
                )
            }) : <>
                <option value="err">FAILED TO FETCH OPTIONS</option>
            </>
        }
        </>
    )
}