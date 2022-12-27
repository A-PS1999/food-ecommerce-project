function convertPrice(price) {
    const toPence = ((price/100).toFixed(2)).toString();
    if (toPence.length === 1) {
  	    return '£' + toPence + '.00';
    }
    return '£' + toPence
}

module.exports = { convertPrice };