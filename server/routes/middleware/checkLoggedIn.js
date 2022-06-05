module.exports = (request, response, next) => {
    if (request.isAuthenticated()) {
        response.locals.user = request.user[0];
        next();
    } else {
        response.status(401).send('No session');
    }
    return null;
}