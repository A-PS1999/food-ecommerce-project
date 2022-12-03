module.exports = (request, response) => {
    if (request.isAuthenticated()) {
        const { id, name, email, is_admin } = response.locals.user;
        return response.json({ auth: { id, name, email, is_admin } });
    } else {
        return response.json({ status: 'No session' })
    }
};