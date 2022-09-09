export const handleDelete = async (params) => {
    if (!params.id || !params.route || !params.fetchFunc) {
        throw new Error("handleDelete requires an id, API route and fetch function to be provided.");
    }
    if (window.confirm(`${params.message}`)) {
        try {
            await params.fetchFunc(`${params.route}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ toDelete: params.id })
            })
            if (params.stateFunc && params.state) {
                let updatedState = params.state.filter((stateItem) => stateItem.id !== params.id);
                params.stateFunc(updatedState);
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }
}