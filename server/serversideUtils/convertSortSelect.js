function convertSortSelect(selectionString) {
    switch (selectionString) {
        case "name-desc":
            return "products.prod_name DESC";
            break;
        case "name-asc":
            return "products.prod_name ASC";
            break;
        case "price-desc":
            return "products.price DESC"
            break;
        case "price-asc":
            return "products.price ASC";
            break;
        default:
            return "products.prod_name DESC";
    }
}

module.exports = { convertSortSelect };