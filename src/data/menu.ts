// DEMO MENU — example dishes and prices only. Replace with the restaurant's real menu.
import soup from "@/assets/soup.jpg";
import meze from "@/assets/meze.jpg";
import kebab from "@/assets/kebab.jpg";
import fish from "@/assets/fish.jpg";
import dessert from "@/assets/dessert.jpg";
import sharing from "@/assets/sharing.jpg";

export type L = { tr: string; en: string };
export type CategoryId = "soups" | "starters" | "mains" | "kebabs" | "seafood" | "desserts" | "drinks";

export const categories: { id: CategoryId; name: L }[] = [
  { id: "soups", name: { tr: "Çorbalar", en: "Soups" } },
  { id: "starters", name: { tr: "Başlangıçlar", en: "Starters" } },
  { id: "mains", name: { tr: "Ana Yemekler", en: "Main Courses" } },
  { id: "kebabs", name: { tr: "Kebaplar", en: "Kebabs" } },
  { id: "seafood", name: { tr: "Deniz Ürünleri", en: "Seafood" } },
  { id: "desserts", name: { tr: "Tatlılar", en: "Desserts" } },
  { id: "drinks", name: { tr: "İçecekler", en: "Drinks" } },
];

export type MenuItem = {
  id: string;
  category: CategoryId;
  name: L;
  description: L;
  price: number; // TRY, demo
  image?: string;
  featured?: boolean;
};

export const currency = "₺";

export const menu: MenuItem[] = [
  { id: "mercimek", category: "soups", image: soup, featured: true, price: 0,
    name: { tr: "Mercimek Çorbası", en: "Red Lentil Soup" },
    description: { tr: "Kırmızı mercimek, tereyağında pul biber ve limon.", en: "Red lentils, chilli butter and a squeeze of lemon." } },
  { id: "ezogelin", category: "soups", price: 0,
    name: { tr: "Ezogelin Çorbası", en: "Ezogelin Soup" },
    description: { tr: "Mercimek, bulgur, pirinç ve nane.", en: "Lentils, bulgur, rice and dried mint." } },
  { id: "meze", category: "starters", image: meze, featured: true, price: 0,
    name: { tr: "Karışık Meze Tabağı", en: "Mixed Meze Platter" },
    description: { tr: "Humus, haydari, acılı ezme, yaprak sarma ve sıcak pide.", en: "Hummus, haydari, spicy ezme, stuffed vine leaves and warm pide." } },
  { id: "sigara", category: "starters", price: 0,
    name: { tr: "Sigara Böreği", en: "Cheese Rolls" },
    description: { tr: "Beyaz peynir ve maydanozlu çıtır yufka.", en: "Crisp filo filled with white cheese and parsley." } },
  { id: "pide", category: "mains", image: sharing, price: 0,
    name: { tr: "Kıymalı Pide", en: "Minced Meat Pide" },
    description: { tr: "Taş fırında, kıyma, domates ve biberle.", en: "Stone-baked flatbread with minced meat, tomato and pepper." } },
  { id: "guvec", category: "mains", price: 0,
    name: { tr: "Etli Güveç", en: "Lamb Güveç" },
    description: { tr: "Toprak kapta ağır ateşte pişmiş et ve sebzeler.", en: "Lamb and vegetables slow-cooked in a clay pot." } },
  { id: "adana", category: "kebabs", image: kebab, featured: true, price: 0,
    name: { tr: "Adana Kebap", en: "Adana Kebab" },
    description: { tr: "Közde zırh kıyması, közlenmiş domates, biber ve bulgur pilavı.", en: "Hand-minced charcoal kebab with grilled tomato, pepper and bulgur." } },
  { id: "sis", category: "kebabs", price: 0,
    name: { tr: "Tavuk Şiş", en: "Chicken Şiş" },
    description: { tr: "Marine edilmiş tavuk, pilav ve mevsim salata.", en: "Marinated chicken skewers, rice and seasonal salad." } },
  { id: "levrek", category: "seafood", image: fish, featured: true, price: 0,
    name: { tr: "Izgara Levrek", en: "Grilled Sea Bass" },
    description: { tr: "Roka, kırmızı soğan ve limonla.", en: "With rocket, red onion and lemon." } },
  { id: "kalamar", category: "seafood", price: 0,
    name: { tr: "Kalamar Tava", en: "Fried Calamari" },
    description: { tr: "Tarator sos ile.", en: "Served with tarator sauce." } },
  { id: "baklava", category: "desserts", image: dessert, featured: true, price: 0,
    name: { tr: "Fıstıklı Baklava", en: "Pistachio Baklava" },
    description: { tr: "Kaymak ile servis edilir.", en: "Served with clotted cream." } },
  { id: "sutlac", category: "desserts", price: 0,
    name: { tr: "Fırın Sütlaç", en: "Baked Rice Pudding" },
    description: { tr: "Tarçınlı, fırında kızartılmış.", en: "Oven-browned, with cinnamon." } },
  { id: "cay", category: "drinks", price: 0,
    name: { tr: "Türk Çayı", en: "Turkish Tea" },
    description: { tr: "İnce belli bardakta.", en: "Served in a tulip glass." } },
  { id: "ayran", category: "drinks", price: 0,
    name: { tr: "Ayran", en: "Ayran" },
    description: { tr: "Ev yapımı, köpüklü.", en: "Homemade salted yoghurt drink." } },
  { id: "kahve", category: "drinks", price: 0,
    name: { tr: "Türk Kahvesi", en: "Turkish Coffee" },
    description: { tr: "Lokum ile.", en: "With Turkish delight." } },
];

// Demo prices so the layout can be previewed. Replace with real prices.
const demoPrices: Record<string, number> = {
  mercimek: 180, ezogelin: 180, meze: 420, sigara: 220, pide: 340, guvec: 520,
  adana: 480, sis: 420, levrek: 650, kalamar: 450, baklava: 260, sutlac: 180,
  cay: 40, ayran: 70, kahve: 120,
};
for (const item of menu) if (!item.price) item.price = demoPrices[item.id] ?? 0;
