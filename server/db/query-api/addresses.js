const addAddress = (db) => (userId, addressInfo) => {
    return db("addresses").insert({
        user_id: userId,
        address_line1: addressInfo.addressMain,
        address_line2: addressInfo.addressSecondary,
        city: addressInfo.townOrCity,
        post_code: addressInfo.postcode,
        country: addressInfo.country,
        phone_no: addressInfo.phoneNo
    })
}

const updateAddress = (db) => (addressId, addressInfo) => {
    return db("addresses").where("id", addressId).update({
        address_line1: addressInfo.addressMain,
        address_line2: addressInfo.addressSecondary,
        city: addressInfo.townOrCity,
        post_code: addressInfo.postcode,
        country: addressInfo.country,
        phone_no: addressInfo.phoneNo
    })
}

const deleteAddress = (db) => (id) => {
    return db("addresses").where("id", id).del();
}

const getPaginatedUserAddress = (db) => (userId, perPage, offset) => {
    const addresses = db("addresses")
        .where("addresses.user_id", userId)
        .select("id", "address_line1", "address_line2", "city", "post_code", "country", "phone_no")
        .limit(perPage)
        .offset(offset)
    const total = db.raw(`SELECT count(id) AS total FROM addresses WHERE addresses.user_id = ${userId}`)
    return Promise.all([addresses, total]);
}

module.exports = db => ({
    addAddress: addAddress(db),
    updateAddress: updateAddress(db),
    deleteAddress: deleteAddress(db),
    getPaginatedUserAddress: getPaginatedUserAddress(db),
})