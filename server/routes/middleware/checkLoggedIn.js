module.exports = (request, response, next) => {
    if (request.isAuthenticated()) {
        response.locals.user = request.user;
        next();
    } else {
        response.status(401).send('No session');
    }
    return null;
}