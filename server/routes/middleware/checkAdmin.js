module.exports = (request, response, next) => {
    if (response.locals.user.is_admin) {
        next();
    } else {
        response.status(401).send('Administrator access only.');
    }
    return null;
}