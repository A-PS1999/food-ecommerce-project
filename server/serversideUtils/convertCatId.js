function convertCatId(id) {
    switch (id) {
        case 1: return 'Food'; 
        case 2: return 'Drink'; 
        case 3: return 'Seasonings'; 
        case 4: return 'Herbs'; 
        case 5: return 'Spices'; 
        case 6: return 'Condiments'; 
        case 7: return 'Table Sauces'; 
        case 8: return 'Oils, Vinegars & Dressings'; 
        case 9: return 'Cooking Sauces & Pastes'; 
        case 10: return 'Grains & Pulses'; 
        case 11: return 'Rice & Grains'; 
        case 12: return "Pulses"; 
        case 13: return 'Snacks & Sweets'; 
        case 14: return 'Savoury Snacks & Nuts'; 
        case 15: return 'Sweet Snacks'; 
        case 16: return 'Pasta & Noodles'; 
        case 17: return "Pasta"; 
        case 18: return "Noodles"; 
        case 19: return "Tea, Coffee & Hot Drinks"; 
        case 20: return "Tea"; 
        case 21: return "Coffee"; 
        case 22: return "Hot Chocolate"; 
        case 23: return "Soft Drinks"; 
        case 24: return "Preserved Foods"; 
        case 25: return "Tinned Foods"; 
        case 26: return "Jars & Pickles"; 
    }
}

module.exports = { convertCatId };