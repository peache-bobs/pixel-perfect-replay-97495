// Business information — edit here. Only verified facts belong in this file.
export const restaurant = {
  name: "Sempati Türk Mutfağı",
  address: "Andifli, Uzun Çarşı Sokak No:11, Kaş, Antalya, Türkiye",
  // Placeholders: replace with the restaurant's real profile URLs.
  social: {
    instagram: "#",
    facebook: "#",
  },
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${restaurant.name}, ${restaurant.address}`,
)}`;
