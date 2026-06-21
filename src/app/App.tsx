import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  Heart,
  MapPin,
  Clock,
  Star,
  Menu,
  X,
  Package,
  ChevronRight,
  Phone,
  Mail,
  Sparkles,
  Smartphone,
  Landmark,
  Database,
  Moon,
  Music,
  Pause,
  Sun,
} from "lucide-react";

const API = "http://localhost:4000/api";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Lang = "EN" | "FR" | "KY";
type PaymentMethod = "momo" | "airtel" | "bank";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  EN: {
    nav: { shop: "Shop", bags: "Ukwezi Bags", checkout: "Checkout", letters: "Letters", about: "About" },
    hero: {
      tag: "Safe - Fast - Delivered with Love",
      title1: "You're Not Alone",
      title2: "This Month",
      sub: "Emergency delivery of pads, medicine, and comfort to your door anywhere in Kigali because every girl deserves care.",
      sos: "SOS Delivery Now",
      browse: "Browse Our Shop",
    },
    sos: { title: "Need something right now?", btn: "Order SOS Delivery", time: "Delivered in 60 min - All of Kigali" },
    cats: "Shop by Category",
    popular_badge: "Popular",
    bags_title: "Ukwezi Care Bags",
    bags_sub: "Curated packages made with love for difficult days",
    includes: "Includes:",
    order_bag: "Order This Bag",
    order: "Add to Cart",
    rwf: "RWF",
    letters_title: "A Letter For You",
    letters_sub: "From us, to you - read in English, French, or Kinyarwanda",
    add_letter: "Add a personal letter to my order",
    checkout_title: "Checkout & Rwanda Payments",
    checkout_sub: "Save your order and choose MTN MoMo, Airtel Money, or bank transfer.",
    payment_title: "Payment method",
    customer_title: "Delivery details",
    save_order: "Save Order",
    saved_order: "Order saved. Connect a live payment gateway before taking real payments online.",
    empty_cart: "Add at least one item before checkout.",
    total_estimate: "Estimated total",
    database_note: "Orders are saved in this browser for now. For production, connect MongoDB Atlas with a Node.js/Express backend to store orders permanently.",
    how_title: "How It Works",
    steps: [
      { title: "Choose What You Need", desc: "Browse categories and add items, or pick a curated Ukwezi bag." },
      { title: "Tell Us Where You Are", desc: "Enter your Kigali delivery location and phone number." },
      { title: "We Deliver with Care", desc: "Our women motari riders bring your order to your door — fast, discreet, and always with a smile." },
    ],
    testi_title: "What Our Girls Say",
    about_title: "Turi Kumwe - We Are Together",
    about_text: "Ukwezi was born from a simple truth: menstruation should never be a crisis. We are a Kigali-based team helping every girl get period care quickly, privately, and with kindness.",
    delivery_all: "All of Kigali",
    delivery_all_sub: "Kimironko, Kacyiru, Remera, Nyamirambo and more",
    delivery_60: "60-Minute Delivery",
    delivery_60_sub: "Day or night, we come to you",
    delivery_discreet: "Women Motari Riders",
    delivery_discreet_sub: "Our women deliver with care on every ride",
    footer_tagline: "Turi kumwe muri buri kwezi.\nWe are together, every month.",
    quick_links: "Quick Links",
    contact: "Contact",
    footer_copy: "2026 Ukwezi. Made in Kigali for every girl who needs care.",
  },
  FR: {
    nav: { shop: "Boutique", bags: "Sacs Ukwezi", checkout: "Paiement", letters: "Lettres", about: "A Propos" },
    hero: {
      tag: "Sur - Rapide - Livre avec amour",
      title1: "Tu n'es pas seule",
      title2: "Ce mois-ci",
      sub: "Livraison urgente de serviettes, medicaments et reconfort partout a Kigali, parce que chaque fille merite des soins.",
      sos: "Livraison SOS",
      browse: "Voir la boutique",
    },
    sos: { title: "Besoin de quelque chose maintenant?", btn: "Commander en SOS", time: "Livre en 60 min - Tout Kigali" },
    cats: "Boutique par categorie",
    popular_badge: "Populaire",
    bags_title: "Sacs de soins Ukwezi",
    bags_sub: "Des paquets prepares avec amour pour les jours difficiles",
    includes: "Contient:",
    order_bag: "Commander ce sac",
    order: "Ajouter au panier",
    rwf: "RWF",
    letters_title: "Une lettre pour toi",
    letters_sub: "De nous, pour toi - en anglais, francais ou kinyarwanda",
    add_letter: "Ajouter une lettre personnelle a ma commande",
    checkout_title: "Commande et paiements au Rwanda",
    checkout_sub: "Enregistrez votre commande et choisissez MTN MoMo, Airtel Money ou virement bancaire.",
    payment_title: "Mode de paiement",
    customer_title: "Details de livraison",
    save_order: "Enregistrer la commande",
    saved_order: "Commande enregistree. Connectez une passerelle de paiement avant de recevoir de vrais paiements.",
    empty_cart: "Ajoutez au moins un article avant de commander.",
    total_estimate: "Total estime",
    database_note: "Les commandes sont enregistrees dans ce navigateur pour l'instant. En production, connectez MongoDB Atlas avec un backend Node.js/Express pour stocker les commandes.",
    how_title: "Comment ca marche",
    steps: [
      { title: "Choisis ce dont tu as besoin", desc: "Parcours les categories et ajoute des articles, ou choisis un sac Ukwezi." },
      { title: "Dis-nous ou tu es", desc: "Entre ton lieu de livraison a Kigali et ton numero." },
      { title: "Nous livrons avec soin", desc: "Nos motari femmes livrent ta commande a ta porte — vite, discret, et toujours avec le sourire." },
    ],
    testi_title: "Ce que disent nos clientes",
    about_title: "Turi Kumwe - Nous sommes ensemble",
    about_text: "Ukwezi est ne d'une verite simple: les regles ne devraient jamais etre une crise. Notre equipe a Kigali aide les filles a recevoir leurs produits rapidement, discretement et avec douceur.",
    delivery_all: "Tout Kigali",
    delivery_all_sub: "Kimironko, Kacyiru, Remera, Nyamirambo et plus",
    delivery_60: "Livraison en 60 minutes",
    delivery_60_sub: "Jour ou nuit, nous venons vers toi",
    delivery_discreet: "Femmes Motari",
    delivery_discreet_sub: "Nos motari femmes livrent avec soin",
    footer_tagline: "Turi kumwe muri buri kwezi.\nNous sommes ensemble, chaque mois.",
    quick_links: "Liens rapides",
    contact: "Contact",
    footer_copy: "2026 Ukwezi. Cree a Kigali pour chaque fille qui a besoin de soins.",
  },
  KY: {
    nav: { shop: "Isoko", bags: "Imifuka ya Ukwezi", checkout: "Kwishyura", letters: "Amabaruwa", about: "Abo turi bo" },
    hero: {
      tag: "Mu ibanga - Byihuse - Tubikorana umutima",
      title1: "Nturi wenyine",
      title2: "Muri uku kwezi",
      sub: "Tukuzanira pads, imiti igabanya ububabare n'ibindi bigufasha aho uri hose i Kigali, kuko buri mukobwa akwiye kwitabwaho.",
      sos: "Tumiza SOS nonaha",
      browse: "Reba isoko ryacu",
    },
    sos: { title: "Ukeneye ikintu nonaha?", btn: "Tumiza SOS", time: "Tubigezaho mu minota 60 - Kigali yose" },
    cats: "Hitamo ibyo ukeneye",
    popular_badge: "Byakunzwe",
    bags_title: "Imifuka yitaweho ya Ukwezi",
    bags_sub: "Amapaki yateguwe mu rukundo kugira ngo akorohereze iminsi ikugoye",
    includes: "Birimo:",
    order_bag: "Tumiza uyu mufuka",
    order: "Ongeraho mu gitebo",
    rwf: "RWF",
    letters_title: "Ibaruwa yawe",
    letters_sub: "Ivuye kuri twe, igenewe wowe - mu Cyongereza, Igifaransa cyangwa Ikinyarwanda",
    add_letter: "Ongeraho ibaruwa mu byo natumije",
    checkout_title: "Kwishyura mu Rwanda",
    checkout_sub: "Bika commande yawe, uhitemo MTN MoMo, Airtel Money cyangwa kwishyura kuri banki.",
    payment_title: "Uburyo bwo kwishyura",
    customer_title: "Aho tuzabigeza",
    save_order: "Bika commande",
    saved_order: "Commande ibitswe. Mbere yo kwakira amafaranga nyayo kuri internet, shyiramo payment gateway ikora.",
    empty_cart: "Banza wongere ikintu nibura kimwe mbere yo kwishyura.",
    total_estimate: "Igiteranyo giteganyijwe",
    database_note: "Ubu commandes zibikwa muri iyi browser. Ku rubuga ruri online, koresha MongoDB Atlas hamwe na Node.js/Express kugira ngo ubike commandes.",
    how_title: "Bikorwa bite?",
    steps: [
      { title: "Hitamo ibyo ukeneye", desc: "Reba ibyiciro, wongere ibicuruzwa mu gitebo cyangwa uhitemo umufuka wa Ukwezi." },
      { title: "Tubwire aho uri", desc: "Andika aho uherereye i Kigali na telefone yawe." },
      { title: "Tubikugezaho mu ibanga", desc: "Abagore bacu ba motari bakugezaho commande vuba, mu ibanga, kandi banejeje." },
    ],
    testi_title: "Ibyo abakobwa bavuga",
    about_title: "Turi Kumwe",
    about_text: "Ukwezi yavutse ku kuri koroshye: imihango ntikwiye kuba ikibazo gikomeye cyangwa impamvu yo kugira isoni. Dukorera i Kigali dufasha abakobwa kubona ibyo bakeneye mu buryo bwihuse, bwizewe kandi burimo urukundo.",
    delivery_all: "Kigali yose",
    delivery_all_sub: "Kimironko, Kacyiru, Remera, Nyamirambo n'ahandi",
    delivery_60: "Tubigezaho mu minota 60",
    delivery_60_sub: "Ku manywa na nijoro, tukugeraho",
    delivery_discreet: "Abagore ba Motari",
    delivery_discreet_sub: "Abagore bacu batwara motari bakugezaho",
    footer_tagline: "Turi kumwe muri buri kwezi.\nNturi wenyine.",
    quick_links: "Aho ujya vuba",
    contact: "Twandikire",
    footer_copy: "2026 Ukwezi. Byakorewe i Kigali ku mukobwa wese ukeneye kwitabwaho.",
  },
};

// CATEGORIES ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "pads",     icon: "🩸", image: "/images/alywa.png", en: "Pads & Tampons",       fr: "Serviettes & Tampons",   kin: "Ibyondo & Ibindi",        bg: "from-rose-100 to-pink-200",    ring: "#F48FB1" },
  { id: "medicine", icon: "💊", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=96&h=96&fit=crop&q=80", en: "Pain Relief",           fr: "Analgésiques",            kin: "Imiti y'Ububabare",        bg: "from-purple-100 to-violet-200",ring: "#CE93D8" },
  { id: "clothes",  icon: "👗", image: "/images/clothes.png", en: "Cozy Clothes",          fr: "Vêtements Confortables",  kin: "Impuzu Nziza",             bg: "from-pink-100 to-fuchsia-200", ring: "#F06292" },
  { id: "sweets",   icon: "🍫", image: "/images/sweet-candies.png", en: "Sweets & Candies",      fr: "Sucreries & Bonbons",     kin: "Amasheke & Ibikoko",       bg: "from-amber-100 to-orange-200", ring: "#FFB300" },
  { id: "care",     icon: "✨", image: "/images/img6.png", en: "Makeup & Care",         fr: "Beauté & Soins",          kin: "Kwisuzuma",                bg: "from-fuchsia-100 to-pink-200", ring: "#E040FB" },
  { id: "bags",     icon: "🎀", image: "/images/inzozi.png", en: "Ukwezi Bags",           fr: "Sacs Ukwezi",             kin: "Imifuko Ukwezi",           bg: "from-red-100 to-rose-200",     ring: "#EF9A9A" },
];

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
const PRODUCTS = [
  // Pads
  { id: 1,  cat: "pads",     name: "Always Ultra Thin",      brand: "Always",     price: 800,  unit: "pack of 8",  emoji: "🩸", image: "/images/alywa.png", popular: true,  desc: "Ultra-thin with wings, all-day comfort" },
  { id: 2,  cat: "pads",     name: "Always Maxi Overnight",  brand: "Always",     price: 1000, unit: "pack of 10", emoji: "🩸", image: "https://images.unsplash.com/photo-1712654535720-106851a122c8?w=192&h=192&fit=crop&q=80", popular: false, desc: "Extra coverage for heavy flow nights" },
  { id: 3,  cat: "pads",     name: "Icona Regular",          brand: "Icona",      price: 600,  unit: "pack of 10", emoji: "🩸", image: "/images/icona.png", popular: true,  desc: "Trusted everyday protection" },
  { id: 4,  cat: "pads",     name: "Super Ultra Soft",       brand: "Super",      price: 900,  unit: "pack of 8",  emoji: "🩸", image: "https://images.unsplash.com/photo-1712654535720-106851a122c8?w=192&h=192&fit=crop&q=80", popular: false, desc: "Soft cotton surface, discreet fit" },
  { id: 5,  cat: "pads",     name: "Always Sensitive",       brand: "Always",     price: 1200, unit: "pack of 12", emoji: "🩸", image: "/images/alywa.png", popular: false, desc: "Gentle protection for sensitive skin" },
  // Medicine
  { id: 6,  cat: "medicine", name: "Ibuprofen 400mg",        brand: "Generic",    price: 500,  unit: "10 tablets", emoji: "💊", image: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=192&h=192&fit=crop&q=80", popular: true,  desc: "Fast-acting cramp & pain relief" },
  { id: 7,  cat: "medicine", name: "Gofen 400mg",            brand: "Gofen",      price: 600,  unit: "10 tablets", emoji: "💊", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=192&h=192&fit=crop&q=80", popular: true,  desc: "Trusted ibuprofen for period pain" },
  { id: 8,  cat: "medicine", name: "Panadol Extra",          brand: "Panadol",    price: 700,  unit: "12 tablets", emoji: "💊", image: "https://images.unsplash.com/photo-1762328500413-1a4cb2023059?w=192&h=192&fit=crop&q=80", popular: false, desc: "Headache & heavy cramp relief" },
  { id: 9,  cat: "medicine", name: "Buscopan Cramps",        brand: "Buscopan",   price: 800,  unit: "10 tablets", emoji: "💊", image: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=192&h=192&fit=crop&q=80", popular: false, desc: "Antispasmodic for severe cramps" },
  // Clothes
  { id: 10, cat: "clothes",  name: "Period Hoodie",          brand: "Ukwezi",     price: 8000, unit: "1 piece",    emoji: "🧸", image: "/images/clothes.png", popular: true,  desc: "Oversized blush pink for rest days" },
  { id: 11, cat: "clothes",  name: "Comfort Shorts",         brand: "Ukwezi",     price: 5000, unit: "1 piece",    emoji: "👗", image: "https://images.unsplash.com/photo-1561955532-59193d79b4b6?w=192&h=192&fit=crop&q=80", popular: false, desc: "High-waist cotton period shorts" },
  { id: 12, cat: "clothes",  name: "Fluffy Socks Set",       brand: "Ukwezi",     price: 2500, unit: "3 pairs",    emoji: "🧦", image: "/images/clothes.png", popular: false, desc: "Warm cozy socks for stay-in days" },
  // Sweets
  { id: 13, cat: "sweets",   name: "Chocolate Bliss Box",    brand: "Cadbury",    price: 3000, unit: "assorted",   emoji: "🍫", image: "https://images.unsplash.com/photo-1566565286951-f81c7ba5619d?w=192&h=192&fit=crop&q=80", popular: true,  desc: "Mixed chocolates for sweet comfort" },
  { id: 14, cat: "sweets",   name: "Gummy Bears",            brand: "Haribo",     price: 1500, unit: "200g",       emoji: "🍬", image: "/images/sweet-candies.png", popular: false, desc: "Fruity gummies to sweeten your day" },
  { id: 15, cat: "sweets",   name: "Coca-Cola Classic",      brand: "Coca-Cola",  price: 600,  unit: "500ml",      emoji: "🥤", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=192&h=192&fit=crop&q=80", popular: false, desc: "Ice-cold comfort in a bottle" },
  { id: 16, cat: "sweets",   name: "Period Herbal Tea",      brand: "Ukwezi",     price: 1800, unit: "10 bags",    emoji: "🫖", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=192&h=192&fit=crop&q=80", popular: true,  desc: "Ginger & chamomile blend for calm" },
  // Care
  { id: 17, cat: "care",     name: "Pimple Patches",         brand: "COSRX",      price: 2500, unit: "24 patches", emoji: "✨", image: "https://plus.unsplash.com/premium_photo-1676818430900-c0422a01dba9?w=192&h=192&fit=crop&q=80", popular: true,  desc: "Hydrocolloid for hormonal breakouts" },
  { id: 18, cat: "care",     name: "Heat Therapy Pad",       brand: "Ukwezi",     price: 3500, unit: "reusable",   emoji: "🔥", image: "/images/img6.png", popular: true,  desc: "Reusable heat pad for cramp relief" },
  { id: 19, cat: "care",     name: "Pink Lip Gloss Set",     brand: "NYX",        price: 4000, unit: "3 shades",   emoji: "💋", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=192&h=192&fit=crop&q=80", popular: false, desc: "Nourishing glosses in pink shades" },
  { id: 20, cat: "care",     name: "Sheet Face Mask",        brand: "Innisfree",  price: 2000, unit: "1 mask",     emoji: "🧖", image: "https://plus.unsplash.com/premium_photo-1750860247520-c599e068bbe9?w=192&h=192&fit=crop&q=80", popular: false, desc: "Hydrating mask for pamper nights" },
  { id: 21, cat: "care",     name: "Rose Water Mist",        brand: "Ukwezi",     price: 2200, unit: "100ml",      emoji: "🌹", image: "https://images.unsplash.com/photo-1772987714654-2df39af2c658?w=192&h=192&fit=crop&q=80", popular: false, desc: "Soothing rose facial spray" },
  // Bags (summary only — full bags section below)
  { id: 22, cat: "bags",     name: "Inzozi Bag",             brand: "Ukwezi",     price: 5000, unit: "1 package",  emoji: "🌙", image: "/images/inzozi.png", popular: false, desc: "Essential care · pads + pain relief + treat" },
  { id: 23, cat: "bags",     name: "Impuhwe Bag",            brand: "Ukwezi",     price: 12000, unit: "1 package", emoji: "🌸", image: "/images/impuhwe.png", popular: true,  desc: "Full self-care ritual for body & spirit" },
  { id: 24, cat: "bags",     name: "Urukundo Bag",           brand: "Ukwezi",     price: 25000, unit: "1 package", emoji: "👑", image: "/images/impuhwe.png", popular: false, desc: "Ultimate love package with bouquet" },
];

// ─── CARE BAGS ────────────────────────────────────────────────────────────────
const BAGS = [
  {
    id: "bronze",
    name: "Inzozi",
    subtitle: "The Dreamer",
    price: 5000,
    badge: "🌙",
    image: "/images/inzozi.png",
    gradientFrom: "#FFF8E1",
    gradientTo: "#FFE0B2",
    border: "#FFB74D",
    titleColor: "#E65100",
    items: [
      "Always Ultra Thin (x8)",
      "Ibuprofen 400mg (x10)",
      "Cadbury Chocolate bar",
      "Herbal Period Tea (x3)",
      "Ukwezi Support Letter 💌",
    ],
    description: "Essential care for difficult days. Everything you need to get through, delivered with love.",
  },
  {
    id: "silver",
    name: "Impuhwe",
    subtitle: "With Compassion",
    price: 12000,
    popular: true,
    badge: "🌸",
    image: "/images/impuhwe.png",
    gradientFrom: "#FCE4EC",
    gradientTo: "#F8BBD9",
    border: "#EC407A",
    titleColor: "#880E4F",
    items: [
      "Always Maxi Overnight (x10)",
      "Gofen 400mg (x10)",
      "Innisfree Sheet Face Mask",
      "COSRX Pimple Patches (x12)",
      "Herbal Period Tea (x5)",
      "Haribo Gummy Bears (200g)",
      "Rose letter + dried flowers 🌷",
    ],
    description: "A full self-care ritual to comfort your body and lift your spirit every single month.",
  },
  {
    id: "gold",
    name: "Urukundo",
    subtitle: "With Love",
    price: 25000,
    badge: "👑",
    image: "/images/impuhwe.png",
    gradientFrom: "#F3E5F5",
    gradientTo: "#E1BEE7",
    border: "#AB47BC",
    titleColor: "#4A148C",
    items: [
      "Always Sensitive (x12)",
      "Buscopan + Gofen (x10 each)",
      "Ukwezi Heat Therapy Pad",
      "NYX Lip Gloss Set (3 shades)",
      "COSRX Pimple Patches full pack",
      "Cadbury Chocolate Bliss Box",
      "Herbal Tea (x10)",
      "Ukwezi Fluffy Socks",
      "Premium handwritten letter + fresh bouquet 💐",
    ],
    description: "The ultimate love package. Because you deserve to be celebrated, cared for, and adored every month.",
  },
];

// ─── LETTERS ──────────────────────────────────────────────────────────────────
const LETTERS = [
  {
    lang: "EN",
    flag: "🇬🇧",
    author: "From Ukwezi, with love 🌙",
    text: `Dear beautiful one,

Your body is not betraying you — it is working hard, cycle after cycle, with quiet strength. On the days that feel too heavy, remember: you are not alone. We see you. We are here with you.

Rest when you must. Cry when you need to. Eat the chocolate. Ask for help. And know that this too shall pass. You are so much stronger than you know, and so deeply worthy of care and gentleness.

We made Ukwezi for you. Every pad, every letter, every little thing in your bag — it is sent with love.

With all our hearts,
Ukwezi 🌸`,
  },
  {
    lang: "FR",
    flag: "🇫🇷",
    author: "D'Ukwezi, avec amour 🌙",
    text: `Ma chère,

Ton corps ne te trahit pas — il travaille sans relâche, cycle après cycle, avec une force silencieuse. Les jours qui semblent trop lourds, souviens-toi : tu n'es pas seule. Nous te voyons. Nous sommes là avec toi.

Repose-toi quand il le faut. Pleure si tu en as besoin. Mange le chocolat. Demande de l'aide. Et sache que cela aussi passera. Tu es si forte, si digne d'être choyée et entourée de douceur.

Nous avons créé Ukwezi pour toi. Chaque serviette, chaque lettre, chaque petit soin dans ton sac — tout est envoyé avec amour.

Avec tout notre cœur,
Ukwezi 🌸`,
  },
  {
    lang: "KY",
    flag: "🇷🇼",
    author: "Ukwezi irakukundira 🌙",
    text: `Umukobwa mwiza,

Umubiri wawe ntukugwara — urakora cyane, ukwezi n'ukwezi, amahoro n'imbaraga. Ku minsi ikomeye cyane, wibuke: ntutegereye wenyine. Turaguha. Turi hafi yawe.

Pumuka igihe ugomba. Rira igihe ukeneye. Rya na sikolati. Saba inkunga. Uzere ko n'ibi bizashira. Ufite imbaraga kuruta uko utekereza, kandi ukwiriye guterwa ineza no gukubitirwa.

Twakoreye Ukwezi kuwe. Buri kibondo, buri baruwa, ibintu bito bito mu mufuko wawe — byose bitumwe n'urukundo.

Dufite urukundo rwose,
Ukwezi 🌸`,
  },
];

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Amina K.",
    loc: "Kimironko, Kigali",
    text: "I ordered at 11pm and my pads arrived in 45 minutes. I literally cried tears of relief. This service changed my life. No more panic, no more shame.",
    stars: 5,
    emoji: "🌸",
  },
  {
    name: "Claudine M.",
    loc: "Kacyiru, Kigali",
    text: "The Impuhwe bag was absolutely everything I needed. The letter inside made me feel so seen and loved. I will order every single month from now on!",
    stars: 5,
    emoji: "🌺",
  },
  {
    name: "Nadège U.",
    loc: "Nyamirambo, Kigali",
    text: "Enfin un service rwandais qui nous comprend vraiment! Le heat pad pour mes crampes est un miracle. Ukwezi iri kumwe natwe vraiment.",
    stars: 5,
    emoji: "🌷",
  },
  {
    name: "Francine N.",
    loc: "Remera, Kigali",
    text: "The chocolate and tea combo 😭❤️ They literally thought of everything a girl needs. Packaging was so pretty too! Merci beaucoup Ukwezi!",
    stars: 5,
    emoji: "🌹",
  },
];

// ─── FLOATING PETAL ───────────────────────────────────────────────────────────
const PETALS = ["🌸", "🌺", "🌷", "🌸", "✿", "🌸", "🌺", "🌷", "🌸", "🌺"];

const PAYMENT_OPTIONS: Array<{
  id: PaymentMethod;
  label: string;
  hint: string;
  icon: "phone" | "bank";
}> = [
  { id: "momo", label: "MTN MoMo", hint: "Pay from a Rwanda MTN Mobile Money number.", icon: "phone" },
  { id: "airtel", label: "Airtel Money", hint: "Pay from an Airtel Money account.", icon: "phone" },
  { id: "bank", label: "Bank transfer", hint: "Use a bank transfer or deposit reference.", icon: "bank" },
];

// ─── LOGO SVG ─────────────────────────────────────────────────────────────────
function UkweziLogo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="21" fill="#FCE4EC" />
      <path
        d="M29 15C29 22.732 22.732 29 15 29C11.135 29 7.653 27.384 5.2 24.8C6.735 25.546 8.468 26 10.3 26C18.032 26 24.3 19.732 24.3 12C24.3 10.168 23.846 8.435 23.1 6.9C26.684 9.353 29 12.935 29 15Z"
        fill="#C2185B"
      />
      <circle cx="34" cy="11" r="4" fill="#F48FB1" opacity="0.85" />
      <circle cx="34" cy="11" r="2" fill="#FCE4EC" />
      <circle cx="10" cy="8" r="3" fill="#F48FB1" opacity="0.75" />
      <circle cx="10" cy="8" r="1.5" fill="#FCE4EC" />
      <circle cx="38" cy="22" r="1.8" fill="#EC407A" opacity="0.5" />
      <circle cx="6" cy="32" r="1.2" fill="#EC407A" opacity="0.4" />
      <circle cx="32" cy="32" r="2.5" fill="#F8BBD9" opacity="0.7" />
      <circle cx="32" cy="32" r="1.2" fill="#FCE4EC" />
    </svg>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Lang>("EN");
  const [cart, setCart] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("pads");
  const [activeLetter, setActiveLetter] = useState(0);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");
  const [checkout, setCheckout] = useState({ name: "", phone: "", location: "", note: "" });
  const [orderMessage, setOrderMessage] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [slideIdx, setSlideIdx] = useState(0);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminOrders, setAdminOrders] = useState<any[]>([]);
  const [feedback, setFeedback] = useState({ name: "", message: "", rating: 5 });
  const [fbSent, setFbSent] = useState(false);
  const [paying, setPaying] = useState(false);
  const audioRef = useRef<{ context: AudioContext; oscillator: OscillatorNode; gain: GainNode } | null>(null);

  const toggleDark = () => setDark((d) => { document.documentElement.classList.toggle("dark"); return !d; });

  useEffect(() => {
    const id = setInterval(() => setSlideIdx((i) => (i + 1) % 2), 4000);
    return () => clearInterval(id);
  }, []);

  const t = T[lang];
  const catLabel = (cat: typeof CATEGORIES[0]) =>
    lang === "EN" ? cat.en : lang === "FR" ? cat.fr : cat.kin;

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.cat === activeCategory);

  const addToCart = (id: number) => {
    const product = PRODUCTS.find((item) => item.id === id);
    setCart((c) => c + 1);
    setCartTotal((total) => total + (product?.price ?? 0));
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1600);
  };

  const addBagToCart = (price: number) => {
    setCart((c) => c + 1);
    setCartTotal((total) => total + price);
  };

  const toggleMusic = () => {
    if (musicPlaying && audioRef.current) {
      audioRef.current.gain.gain.setTargetAtTime(0, audioRef.current.context.currentTime, 0.04);
      window.setTimeout(() => {
        audioRef.current?.oscillator.stop();
        audioRef.current?.context.close();
        audioRef.current = null;
      }, 160);
      setMusicPlaying(false);
      return;
    }

    const AudioContextClass =
      window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 220;
    gain.gain.value = 0.025;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    audioRef.current = { context, oscillator, gain };
    setMusicPlaying(true);
  };

  const saveOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cart === 0) { setOrderMessage(t.empty_cart); return; }
    const order = { id: `UKW-${Date.now()}`, createdAt: new Date().toISOString(), items: cart, totalRwf: cartTotal, paymentMethod, customer: checkout, status: "pending_payment" };
    const existing = JSON.parse(localStorage.getItem("ukwezi_orders") ?? "[]");
    localStorage.setItem("ukwezi_orders", JSON.stringify([order, ...existing]));
    setOrderMessage(`${t.saved_order} Ref: ${order.id}`);
    try { await fetch(`${API}/orders`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) }); } catch { /* ok */ }
  };

  const requestPayment = async () => {
    if (!checkout.phone) return;
    setPaying(true);
    try {
      const res = await fetch(`${API}/payment/momo`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone: checkout.phone, amount: cartTotal }) });
      setOrderMessage((await res.json()).message);
    } catch { setOrderMessage("Payment offline — pay on delivery."); }
    setPaying(false);
  };

  const sendFeedback = async () => {
    try { await fetch(`${API}/feedback`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(feedback) }); } catch { /* ok */ }
    setFbSent(true);
  };

  const loginAdmin = async () => {
    if (adminPass !== "ukwezi2026") return;
    setAdminAuthed(true);
    try { setAdminOrders(await (await fetch(`${API}/orders`)).json()); } catch { setAdminOrders(JSON.parse(localStorage.getItem("ukwezi_orders") ?? "[]")); }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Floating petals ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {PETALS.map((p, i) => (
          <motion.div
            key={i}
            className="absolute select-none text-xl"
            style={{ left: `${5 + i * 10}%`, top: "-40px" }}
            animate={{ y: ["0px", "110vh"], rotate: [0, 200 + i * 25], opacity: [0, 0.45, 0.45, 0] }}
            transition={{ duration: 9 + i * 1.3, delay: i * 1.2, repeat: Infinity, ease: "linear" }}
          >
            {p}
          </motion.div>
        ))}
      </div>

      {/* ════════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <UkweziLogo size={42} />
            <div className="leading-none">
              <div className="font-playfair font-bold text-primary text-xl tracking-tight">Ukwezi</div>
              <div className="text-[10px] text-muted-foreground font-nunito">Turi Kumwe 🌸</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold">
            {[
              ["#shop", t.nav.shop],
              ["#bags", t.nav.bags],
              ["#checkout", t.nav.checkout],
              ["#letters", t.nav.letters],
              ["#about", t.nav.about],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-foreground/70 hover:text-primary transition-colors duration-200">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center bg-secondary rounded-full p-1 gap-0.5">
              {(["EN", "FR", "KY"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                    lang === l
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={toggleDark}
              className="p-2.5 hover:bg-secondary rounded-full transition-colors"
              aria-label={dark ? "Light mode" : "Dark mode"}
              title={dark ? "Light mode" : "Dark mode"}
            >
              {dark ? <Sun size={20} className="text-primary" /> : <Moon size={20} className="text-primary" />}
            </button>
            <button
              onClick={toggleMusic}
              className="p-2.5 hover:bg-secondary rounded-full transition-colors"
              aria-label={musicPlaying ? "Pause music" : "Play music"}
              title={musicPlaying ? "Pause music" : "Play music"}
            >
              {musicPlaying ? <Pause size={20} className="text-primary" /> : <Music size={20} className="text-primary" />}
            </button>

            {/* Cart */}
            <button
              onClick={() => document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" })}
              className="relative p-2.5 hover:bg-secondary rounded-full transition-colors"
            >
              <ShoppingBag size={20} className="text-primary" />
              <AnimatePresence>
                {cart > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-black"
                  >
                    {cart}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={20} className="text-foreground" /> : <Menu size={20} className="text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-border bg-white/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-5 py-5 space-y-4">
                <div className="flex gap-2">
                  {(["EN", "FR", "KY"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`flex-1 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                        lang === l ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"
                      }`}
                    >
                      {l === "EN" ? "🇬🇧 EN" : l === "FR" ? "🇫🇷 FR" : "🇷🇼 KY"}
                    </button>
                  ))}
                </div>
                <hr className="border-border" />
                {[
                  ["#shop", t.nav.shop],
                  ["#bags", t.nav.bags],
                  ["#checkout", t.nav.checkout],
                  ["#letters", t.nav.letters],
                  ["#about", t.nav.about],
                ].map(([href, label]) => (
                  <a key={href} href={href} className="block text-base font-semibold text-foreground" onClick={() => setMobileMenu(false)}>
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #FFF5F7 0%, #FCE4EC 40%, #F3E5F5 100%)" }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 -translate-y-1/3 translate-x-1/4" style={{ background: "radial-gradient(circle, #F48FB1 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full opacity-25 translate-y-1/3 -translate-x-1/4" style={{ background: "radial-gradient(circle, #CE93D8 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left: copy */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, ease: "easeOut" }}>
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-300 bg-white/60 backdrop-blur text-sm font-semibold text-primary mb-7"
            >
              <Sparkles size={14} />
              {t.hero.tag}
            </motion.div>

            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-7 text-foreground">
              {t.hero.title1}
              <br />
              <span className="text-primary italic">{t.hero.title2}</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-9 max-w-lg">{t.hero.sub}</p>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 12px 30px rgba(194,24,91,0.35)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold text-base shadow-lg flex items-center gap-2.5"
              >
                🚨 {t.hero.sos}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white/70 backdrop-blur text-foreground px-8 py-3.5 rounded-full font-semibold text-base border-2 border-pink-200 hover:border-primary transition-colors flex items-center gap-2"
              >
                {t.hero.browse} <ChevronRight size={16} />
              </motion.button>
            </div>

            <div className="flex gap-8 mt-11 pt-8 border-t border-pink-200">
              {[
                { val: "60 min", label: "Delivery time" },
                { val: "1,000+", label: "Girls served" },
                { val: "24/7", label: "Always open" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-playfair text-2xl font-bold text-primary">{s.val}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: image slideshow */}
          <div className="relative hidden lg:block">
            {[ "/images/miss.png", "https://images.unsplash.com/photo-1671790504316-7aac22818e37?w=600&h=750&fit=crop&q=80" ].map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0 }}
                animate={{ opacity: slideIdx === i ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{ pointerEvents: "none" }}
              >
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] bg-pink-100">
                  <img src={img} alt="Miss Rwanda supporting period care" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </motion.div>
            ))}
            <div className="aspect-[4/5]" />

            {/* Floating card: pads */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-10 top-1/4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-pink-100"
            >
              <div className="text-3xl mb-1">🩸</div>
              <div className="text-xs font-bold text-foreground">Pads delivered</div>
              <div className="text-xs text-muted-foreground">in 45 min ✓</div>
            </motion.div>

            {/* Floating card: letter */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-1/3 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-pink-100"
            >
              <div className="text-3xl mb-1">💌</div>
              <div className="text-xs font-bold text-foreground">Support letter</div>
              <div className="text-xs text-muted-foreground">included 🌸</div>
            </motion.div>

            {/* Floating card: Rwanda */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-6 bottom-16 bg-primary text-primary-foreground p-3 rounded-2xl shadow-lg"
            >
              <div className="text-xs font-bold">🇷🇼 Made in Rwanda</div>
              <div className="text-[10px] opacity-80">Kigali with ❤️</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SOS BANNER
      ════════════════════════════════════════════════ */}
      <div className="bg-primary text-primary-foreground py-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 relative">
          <div className="flex items-center gap-3">
            <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🚨</motion.span>
            <span className="font-bold text-base">{t.sos.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm opacity-85">
              <Clock size={14} />
              {t.sos.time}
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white text-primary px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-pink-50 transition-colors"
            >
              {t.sos.btn}
            </motion.button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          SHOP SECTION
      ════════════════════════════════════════════════ */}
      <section id="shop" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-3"
          >
            {t.cats}
          </motion.h2>
          <p className="text-muted-foreground text-lg">🌸 Everything you need, delivered with love 🌸</p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 text-center cursor-pointer ${
                activeCategory === cat.id
                  ? "border-primary shadow-lg bg-secondary scale-105"
                  : "border-transparent bg-card hover:border-pink-200 hover:shadow-md shadow-sm"
              }`}
            >
              <img src={cat.image} alt={cat.en} className="w-12 h-12 mx-auto mb-2 rounded-full object-cover ring-2 ring-pink-200" />
              <div className="text-xs font-semibold text-foreground leading-tight">{catLabel(cat)}</div>
            </motion.button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:border-pink-300 hover:shadow-xl transition-all duration-200 group flex flex-col"
              >
                {/* Product image area */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-100 p-8 text-center relative">
                  <img src={product.image} alt={product.name} className="w-24 h-24 mx-auto object-cover rounded-xl group-hover:scale-110 transition-transform duration-300" />
                  {product.popular && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-black px-2.5 py-1 rounded-full"
                    >
                      {t.popular_badge} ⭐
                    </motion.span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{product.brand}</div>
                  <div className="font-playfair font-semibold text-foreground text-base mb-1 leading-tight">{product.name}</div>
                  <div className="text-xs text-muted-foreground mb-3 leading-relaxed flex-1">
                    {product.desc} - <span className="italic">{product.unit}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="font-black text-primary text-lg font-playfair">{product.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground ml-1">{t.rwf}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => addToCart(product.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                        addedId === product.id
                          ? "bg-green-500 text-white shadow-md"
                          : "bg-primary text-primary-foreground hover:shadow-lg"
                      }`}
                    >
                      {addedId === product.id ? "Added!" : t.order}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          UKWEZI BAGS
      ════════════════════════════════════════════════ */}
      <section id="bags" className="py-20" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FFF5F7 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-3"
            >
              🎀 {t.bags_title}
            </motion.h2>
            <p className="text-muted-foreground text-lg">{t.bags_sub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BAGS.map((bag, i) => (
              <motion.div
                key={bag.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative rounded-3xl overflow-hidden shadow-lg flex flex-col border-2"
                style={{ borderColor: bag.border }}
              >
                {bag.popular && (
                  <div className="bg-primary text-primary-foreground text-center text-xs font-black py-2 tracking-wider">
                    ✨ MOST LOVED ✨
                  </div>
                )}
                <div
                  className="p-8 text-center"
                  style={{ background: `linear-gradient(135deg, ${bag.gradientFrom} 0%, ${bag.gradientTo} 100%)` }}
                >
                  <motion.div
                    animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                    className="mb-3"
                  >
                    <img src={bag.image} alt={bag.name} className="w-20 h-20 mx-auto object-cover rounded-2xl shadow-md" />
                  </motion.div>
                  <h3 className="font-playfair text-2xl font-bold mb-0.5" style={{ color: bag.titleColor }}>{bag.name}</h3>
                  <p className="text-sm text-muted-foreground">{bag.subtitle}</p>
                  <div className="mt-5">
                    <span className="font-playfair text-3xl font-black" style={{ color: bag.titleColor }}>
                      {bag.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">RWF</span>
                  </div>
                </div>

                <div className="bg-white p-6 flex flex-col flex-1">
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{bag.description}</p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">{t.includes}</div>
                  <ul className="space-y-2 mb-7 flex-1">
                    {bag.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <Heart size={11} className="text-primary mt-0.5 shrink-0" fill="currentColor" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => addBagToCart(bag.price)}
                    className="w-full py-3.5 rounded-full font-bold text-sm text-primary-foreground shadow-md hover:shadow-xl transition-shadow"
                    style={{ background: `linear-gradient(135deg, ${bag.border} 0%, ${bag.gradientTo} 100%)`, color: bag.titleColor }}
                  >
                    🎀 {t.order_bag}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="checkout" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-7 border border-pink-100 bg-secondary/60"
            >
              <div className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-4">
                <Database size={16} />
                Database-ready order saving
              </div>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-3">{t.checkout_title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-7">{t.checkout_sub}</p>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div className="rounded-2xl bg-white p-5 border border-pink-100">
                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Items</div>
                  <div className="font-playfair text-4xl font-black text-primary">{cart}</div>
                </div>
                <div className="rounded-2xl bg-white p-5 border border-pink-100">
                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">{t.total_estimate}</div>
                  <div className="font-playfair text-3xl font-black text-primary">{cartTotal.toLocaleString()} RWF</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{t.database_note}</p>
            </motion.div>

            <motion.form
              onSubmit={saveOrder}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-6 sm:p-8 border border-border bg-card shadow-lg"
            >
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-5">{t.customer_title}</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <input
                  value={checkout.name}
                  onChange={(event) => setCheckout((current) => ({ ...current, name: event.target.value }))}
                  required
                  placeholder="Name"
                  className="rounded-2xl border border-border bg-input-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  value={checkout.phone}
                  onChange={(event) => setCheckout((current) => ({ ...current, phone: event.target.value }))}
                  required
                  placeholder="+250 7..."
                  className="rounded-2xl border border-border bg-input-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  value={checkout.location}
                  onChange={(event) => setCheckout((current) => ({ ...current, location: event.target.value }))}
                  required
                  placeholder="Kigali location"
                  className="sm:col-span-2 rounded-2xl border border-border bg-input-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  value={checkout.note}
                  onChange={(event) => setCheckout((current) => ({ ...current, note: event.target.value }))}
                  placeholder="Delivery note"
                  className="sm:col-span-2 min-h-24 rounded-2xl border border-border bg-input-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">{t.payment_title}</h3>
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                {PAYMENT_OPTIONS.map((option) => {
                  const Icon = option.icon === "bank" ? Landmark : Smartphone;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setPaymentMethod(option.id)}
                      className={`text-left rounded-2xl border-2 p-4 transition-all ${
                        paymentMethod === option.id ? "border-primary bg-secondary shadow-md" : "border-border bg-white hover:border-pink-200"
                      }`}
                    >
                      <Icon size={22} className="text-primary mb-3" />
                      <div className="font-bold text-foreground">{option.label}</div>
                      <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{option.hint}</div>
                    </button>
                  );
                })}
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3.5 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                {t.save_order}
              </button>
              {orderMessage && <p className="mt-4 text-sm text-primary font-semibold leading-relaxed">{orderMessage}</p>}
              {orderMessage && !orderMessage.includes("Add at least") && (
                <button
                  onClick={requestPayment}
                  disabled={paying}
                  className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 font-bold shadow-lg transition-all mt-3 disabled:opacity-50"
                >
                  {paying ? "Processing..." : `💳 Pay ${cartTotal.toLocaleString()} RWF via MoMo`}
                </button>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-4xl sm:text-5xl font-bold text-foreground"
            >
              {t.how_title}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-14">
            {t.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-5 shadow-md"
                >
                  <span className="font-playfair font-black text-2xl text-primary">{i + 1}</span>
                </motion.div>
                <h3 className="font-playfair font-bold text-xl text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Delivery info strip */}
          <div className="rounded-3xl p-8 grid sm:grid-cols-3 gap-6 text-center border border-pink-100" style={{ background: "linear-gradient(135deg, #FFF5F7 0%, #F3E5F5 100%)" }}>
            {[
              { icon: <MapPin size={28} className="text-primary" />, title: t.delivery_all, desc: t.delivery_all_sub },
              { icon: <Clock size={28} className="text-primary" />, title: t.delivery_60, desc: t.delivery_60_sub },
              { icon: <span className="text-3xl">🏍️</span>, title: t.delivery_discreet, desc: t.delivery_discreet_sub },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                {item.icon}
                <div className="font-semibold text-foreground">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          WOMEN MOTARI — DELIVERY RIDERS
      ════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-primary text-sm font-semibold mb-5">
                🏍️ {lang === "KY" ? "Abagore ba Motari" : lang === "FR" ? "Nos Motari Femmes" : "Our Women Riders"}
              </div>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-5 leading-tight">
                {lang === "KY" ? "Abagore ba Motari batwara urukundo" : lang === "FR" ? "Des femmes motari qui livrent avec amour" : "Women on motorcycles, delivering with love"}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {lang === "KY"
                  ? "Ukwezi ikoresha abagore ba motari kugira ngo ibigeze kwawe. Abagore bacu bateguwe neza, bafite impamba zose, kandi bakora mu ibanga."
                  : lang === "FR"
                    ? "Ukwezi emploie des femmes motari pour livrer tes commandes. Nos conductrices sont formees, equipees, et toujours discretes."
                    : "Ukwezi employs women motorcycle riders to deliver your orders. Our women riders are trained, equipped, and always discreet — because we believe women supporting women is the way forward."}
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: "🛵", label: lang === "KY" ? "Zose zifite moteri" : lang === "FR" ? "Scooters electriques" : "Electric scooters" },
                  { icon: "🎀", label: lang === "KY" ? "Zipfunyitse mu ibanga" : lang === "FR" ? "Colis discrets" : "Discreet pink packages" },
                  { icon: "⏱️", label: lang === "KY" ? "Mu minota 60" : lang === "FR" ? "60 min max" : "60 min delivery" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full text-sm font-semibold text-foreground">
                    <span>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="/images/miss.png"
                  alt="Women motari rider"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 top-1/3 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-pink-200"
              >
                <div className="text-3xl mb-1">🏍️</div>
                <div className="text-xs font-bold text-foreground">Women Rider</div>
                <div className="text-[10px] text-muted-foreground">delivering care 🌸</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          IMIGANI — RWANDAN PROVERBS
      ════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFF5F7 0%, #FCE4EC 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold mb-5"
            >
              📜 Imigani mu Kinyarwanda
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-3"
            >
              {lang === "KY" ? "Ubwenge bw'abakurambere" : lang === "FR" ? "La sagesse des ancêtres" : "Wisdom of our ancestors"}
            </motion.h2>
            <p className="text-muted-foreground text-lg">
              {lang === "KY" ? "Imigani y'ikinyarwanda igufashe gukomeza umutima" : lang === "FR" ? "Des proverbes rwandais pour réconforter ton cœur" : "Rwandan proverbs to lift your spirit"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                proverb: "Umunsi umwe umuntu akiza n'uwundi akira",
                meaning: { EN: "One day you give, another day you receive — be kind always.", FR: "Un jour tu donnes, un autre tu reçois — sois toujours gentille.", KY: "Ntakintu kiba cyose utabona ikindi — kora neza buri gihe." },
                emoji: "🤲",
              },
              {
                proverb: "Akana kameneka ntikamenya ko nyina ababara",
                meaning: { EN: "A child breaks things not knowing the mother struggles — be patient with those who don't understand.", FR: "Un enfant casse sans savoir que sa mère souffre — sois patiente.", KY: "Umunsi umwe uzasobanukirwa iby'ibanze." },
                emoji: "💝",
              },
              {
                proverb: "Ijoro rirerire rizana amanywa",
                meaning: { EN: "A long night brings the morning — this too shall pass.", FR: "Une longue nuit amène le matin — ça aussi passera.", KY: "Nta joro rihoraho — umunsi uzaza." },
                emoji: "🌅",
              },
              {
                proverb: "Ukora nabi aba yibonera",
                meaning: { EN: "Who does wrong will see the consequences — choose kindness.", FR: "Qui fait le mal en verra les conséquences — choisis la bonté.", KY: "Ibyiza bigira umunsi wabyo." },
                emoji: "⭐",
              },
              {
                proverb: "Urupfu rw'inyoni ni amababa yayo",
                meaning: { EN: "A bird's death is in its wings — your strength can also be your weakness, know yourself.", FR: "La mort d'un oiseau est dans ses ailes — ta force peut être ta faiblesse, connais-toi.", KY: "Ijisho ryawe ni ryo rikumenya." },
                emoji: "🕊️",
              },
              {
                proverb: "Icyifuzo nta cyo kiza",
                meaning: { EN: "Wishing alone brings nothing — take action, you are stronger than you think.", FR: "Souhaiter seul n'apporte rien — agis, tu es plus forte que tu ne le penses.", KY: "Ibyo utifuza biza iyo ukora." },
                emoji: "💪",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-md border border-pink-100 hover:shadow-xl transition-all"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <p className="font-playfair font-bold text-foreground text-base italic mb-3 leading-relaxed">
                  "{item.proverb}"
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === "KY" ? item.meaning.KY : lang === "FR" ? item.meaning.FR : item.meaning.EN}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mt-10"
          >
            🌸 {lang === "KY" ? "Turi kumwe muri buri kwezi." : lang === "FR" ? "Nous sommes ensemble chaque mois." : "We are together every month."}
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          MOVIE & BOOK RECOMMENDATIONS
      ════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-3"
            >
              🎬 Movie & Book Picks
            </motion.h2>
            <p className="text-muted-foreground text-lg">Cozy recommendations for your rest days 🌸</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Movies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-xl border border-pink-100"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1749665833143-be82d786ef1f?w=800&h=400&fit=crop&q=80"
                  alt="Cozy movie night"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <div className="text-3xl mb-1">🎥</div>
                  <h3 className="text-white font-playfair text-2xl font-bold">Movie Night</h3>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="space-y-4">
                  {[
                    { title: "Turning Red", emoji: "🐼", desc: "Mei Lee's journey through adolescence — funny, heartwarming, and so relatable." },
                    { title: "The Princess Diaries", emoji: "👑", desc: "A classic feel-good story about finding your voice and your crown." },
                    { title: "Inside Out", emoji: "🌈", desc: "Understanding emotions — perfect for those hormonal days." },
                    { title: "Little Women", emoji: "📖", desc: "Sisterhood, dreams, and resilience. Tissues required." },
                  ].map((movie, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 rounded-2xl bg-pink-50/50 hover:bg-pink-100 transition-colors">
                      <span className="text-2xl">{movie.emoji}</span>
                      <div>
                        <div className="font-bold text-foreground text-sm">{movie.title}</div>
                        <div className="text-xs text-muted-foreground">{movie.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Books */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-3xl overflow-hidden shadow-xl border border-purple-100"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1778585856958-22aed2acc7dd?w=800&h=400&fit=crop&q=80"
                  alt="Books and reading"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <div className="text-3xl mb-1">📚</div>
                  <h3 className="text-white font-playfair text-2xl font-bold">Book Recommendations</h3>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="space-y-4">
                  {[
                    { title: "The Gifts of Imperfection", emoji: "💝", author: "Brené Brown", desc: "Let go of who you think you're supposed to be and embrace who you are." },
                    { title: "Period Power", emoji: "🩸", author: "Maisie Hill", desc: "Understand your cycle and harness its power. A must-read!" },
                    { title: "I Am Enough", emoji: "🌟", author: "Grace Byers", desc: "A beautiful reminder that you are enough, just as you are." },
                    { title: "Becoming", emoji: "👩‍👧", author: "Michelle Obama", desc: "An inspiring story of resilience, grace, and becoming who you are meant to be." },
                  ].map((book, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 rounded-2xl bg-purple-50/50 hover:bg-purple-100 transition-colors">
                      <span className="text-2xl">{book.emoji}</span>
                      <div>
                        <div className="font-bold text-foreground text-sm">{book.title}</div>
                        <div className="text-xs text-muted-foreground italic">by {book.author}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{book.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-purple-100 text-center">
                  <p className="text-xs text-muted-foreground">
                    📖 Read a book, watch a movie — and know you're not alone. We're here with you.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SUPPORT LETTERS
      ════════════════════════════════════════════════ */}
      <section id="letters" className="py-20" style={{ background: "linear-gradient(160deg, #FFF5F7 0%, #F3E5F5 60%, #EDE7F6 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-3"
            >
              💌 {t.letters_title}
            </motion.h2>
            <p className="text-muted-foreground text-lg">{t.letters_sub}</p>
          </div>

          {/* Language tabs */}
          <div className="flex justify-center gap-3 mb-10">
            {LETTERS.map((l, i) => (
              <button
                key={l.lang}
                onClick={() => setActiveLetter(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all duration-200 ${
                  activeLetter === i
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                    : "bg-white border-pink-200 text-foreground hover:border-primary"
                }`}
              >
                {l.flag} {l.lang}
              </button>
            ))}
          </div>

          {/* Letter card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLetter}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="relative bg-white/75 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-100 overflow-hidden"
            >
              {/* Decorative corners */}
              <div className="absolute top-5 left-5 text-4xl opacity-15 select-none">🌸</div>
              <div className="absolute bottom-5 right-5 text-4xl opacity-15 select-none">🌺</div>
              <div className="absolute top-5 right-5 text-3xl opacity-10 select-none">🌷</div>
              <div className="absolute bottom-5 left-5 text-3xl opacity-10 select-none">✿</div>

              <div className="font-playfair text-lg text-muted-foreground italic text-center mb-8">
                {LETTERS[activeLetter].author}
              </div>

              <div className="font-nunito text-foreground leading-8 text-base whitespace-pre-line max-w-xl mx-auto text-left">
                {LETTERS[activeLetter].text}
              </div>

              <div className="mt-10 pt-7 border-t border-pink-100 text-center">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setCart((c) => c + 1)}
                  className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-7 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-sm shadow"
                >
                  <Heart size={15} fill="currentColor" />
                  {t.add_letter}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          HERO IMAGE — SECOND
      ════════════════════════════════════════════════ */}
      <section className="relative h-[420px] overflow-hidden bg-pink-100">
        <img
          src="/images/miss.png"
          alt="Woman in cozy pink hoodie"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(194,24,91,0.7) 0%, rgba(194,24,91,0.1) 60%, transparent 100%)" }} />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-lg"
            >
              <p className="font-playfair text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                "Your comfort is our mission. Your strength is our inspiration."
              </p>
              <p className="text-white/80 text-base">— Ukwezi Team, Kigali 🇷🇼</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-3"
            >
              {t.testi_title}
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 border border-pink-100 flex flex-col"
                style={{ background: "linear-gradient(135deg, #FFF5F7 0%, #FCE4EC 100%)" }}
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <div className="flex mb-4 gap-0.5">
                  {Array.from({ length: item.stars }).map((_, j) => (
                    <Star key={j} size={13} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-5 flex-1">{item.text}</p>
                <div>
                  <div className="font-semibold text-sm text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {item.loc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════════ */}
      <section
        id="about"
        className="py-24 relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #C2185B 0%, #AD1457 40%, #7B1FA2 100%)" }}
      >
        {/* Decorative bg flowers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {["🌸", "🌺", "🌷", "🌸", "🌺"].map((f, i) => (
            <div
              key={i}
              className="absolute text-7xl opacity-[0.07] select-none"
              style={{ top: `${15 + i * 18}%`, left: `${8 + i * 20}%`, transform: `rotate(${i * 35}deg)` }}
            >
              {f}
            </div>
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-semibold mb-8 border border-white/25">
              <Heart size={14} fill="currentColor" />
              Made in Kigali, Rwanda 🇷🇼
            </div>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-7 leading-tight">{t.about_title}</h2>
            <p className="text-white/85 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">{t.about_text}</p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="tel:+250782991182"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 bg-white text-primary px-7 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                <Phone size={16} />
                +250 782 991 182
              </motion.a>
              <motion.a
                href="mailto:hello@ukwezi.rw"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 bg-white/20 backdrop-blur text-white px-7 py-3.5 rounded-full font-semibold border-2 border-white/30 hover:bg-white/30 transition-colors"
              >
                <Mail size={16} />
                hello@ukwezi.rw
              </motion.a>
            </div>
            </motion.div>
          </div>
        </section>

      {/* ════════════════════════════════════════════════
          FEEDBACK — SHARE YOUR THOUGHTS
      ════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-primary text-sm font-semibold mb-5">💬 {lang === "KY" ? "Tubwire ibyo utekereza" : lang === "FR" ? "Donne ton avis" : "Share your thoughts"}</div>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-3">{lang === "KY" ? "Ibitekerezo byawe" : lang === "FR" ? "Ton avis compte" : "Your feedback matters"}</h2>
            <p className="text-muted-foreground text-lg mb-8">{lang === "KY" ? "Ushobora gutanga igitekerezo cyawe" : lang === "FR" ? "Dis-nous comment on peut améliorer" : "Tell us how we can serve you better"}</p>
          </motion.div>

          {fbSent ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-green-50 rounded-3xl p-10 border border-green-200">
              <span className="text-5xl">💖</span>
              <p className="font-playfair text-2xl font-bold text-green-700 mt-3">Urakoze cyane!<br/>{lang === "KY" ? "Turakunda igitekerezo cyawe" : lang === "FR" ? "Merci pour ton avis!" : "Thank you for your feedback!"}</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-pink-50/50 rounded-3xl p-8 border border-pink-100 max-w-md mx-auto">
              <div className="space-y-4">
                <div className="flex gap-2 justify-center mb-2">
                  {[1,2,3,4,5].map((r) => (
                    <button key={r} onClick={() => setFeedback((f) => ({ ...f, rating: r }))} className={`text-3xl transition-all ${r <= feedback.rating ? "scale-110" : "opacity-30"}`}>
                      {r <= feedback.rating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
                <input value={feedback.name} onChange={(e) => setFeedback((f) => ({ ...f, name: e.target.value }))} placeholder={lang === "KY" ? "Izina ryawe" : lang === "FR" ? "Ton nom" : "Your name"} className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
                <textarea value={feedback.message} onChange={(e) => setFeedback((f) => ({ ...f, message: e.target.value }))} placeholder={lang === "KY" ? "Andika igitekerezo..." : lang === "FR" ? "Ecris ton message..." : "Write your message..."} rows={3} className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none" />
                <button onClick={sendFeedback} className="w-full rounded-full bg-primary text-primary-foreground px-6 py-3 font-bold shadow-lg hover:shadow-xl transition-all">💌 {lang === "KY" ? "Ohereza" : lang === "FR" ? "Envoyer" : "Send Feedback"}</button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          ADMIN DASHBOARD
      ════════════════════════════════════════════════ */}
      {adminOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={() => { setAdminOpen(false); setAdminAuthed(false); setAdminPass(""); }}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-2xl font-bold text-foreground">👑 Admin Dashboard</h2>
              <button onClick={() => { setAdminOpen(false); setAdminAuthed(false); setAdminPass(""); }} className="p-2 hover:bg-pink-50 rounded-full"><X size={20} /></button>
            </div>
            {!adminAuthed ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Enter admin password to view orders</p>
                <input value={adminPass} onChange={(e) => setAdminPass(e.target.value)} type="password" placeholder="Password" className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm" onKeyDown={(e) => e.key === "Enter" && loginAdmin()} />
                <button onClick={loginAdmin} className="w-full rounded-full bg-primary text-primary-foreground px-6 py-3 font-bold shadow-lg">🔓 Login</button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-muted-foreground mb-4">CEO: <strong className="text-foreground">Lucas Cathy Nishimwe</strong> — {adminOrders.length} total orders</p>
                {adminOrders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">No orders yet</p>
                ) : (
                  <div className="space-y-3">
                    {adminOrders.map((o, i) => (
                      <div key={o.id || i} className="border border-pink-100 rounded-2xl p-4 text-sm bg-pink-50/30">
                        <div className="flex justify-between items-start mb-2">
                          <div><span className="font-bold text-foreground">{o.id}</span> <span className="text-muted-foreground">— {new Date(o.createdAt).toLocaleDateString()}</span></div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${o.status === "paid" ? "bg-green-100 text-green-700" : o.status === "delivered" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{o.status}</span>
                        </div>
                        <p className="text-muted-foreground">{o.customer?.name} · {o.customer?.phone} · {o.customer?.location}</p>
                        <p className="text-foreground font-bold mt-1">{o.totalRwf?.toLocaleString()} RWF · {o.items} item(s) · {o.paymentMethod}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════ */}
      <footer className="bg-foreground text-white/70 py-14 relative overflow-hidden">
        {/* Decorative pink dots */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #F48FB1, #CE93D8, #F48FB1)" }} />
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand - extra love */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-base shadow-md shadow-pink-500/20">🌙</div>
                <span className="font-playfair font-bold text-white text-xl">Ukwezi</span>
              </div>
              <p className="text-sm leading-relaxed text-white/55 whitespace-pre-line">{t.footer_tagline}</p>
              <div className="mt-5 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-xs text-pink-300">
                👩‍👧 Made by her <span className="text-white/30">·</span> For her <span className="text-white/30">·</span> With her
              </div>
            </div>

            {/* Made by her for her - special section */}
            <div>
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2"><Heart size={14} fill="currentColor" className="text-pink-400" /> Made by Her</h4>
              <ul className="space-y-2.5 text-sm text-white/55">
                <li className="flex items-center gap-2"><span className="text-pink-400">👩‍💻</span> Built by Rwandan women</li>
                <li className="flex items-center gap-2"><span className="text-pink-400">💪</span> For every girl's dignity</li>
                <li className="flex items-center gap-2"><span className="text-pink-400">🌍</span> Period poverty fighters</li>
                <li className="flex items-center gap-2"><span className="text-pink-400">🌸</span> #FreeThePeriod Rwanda</li>
                <li className="flex items-center gap-2"><span className="text-pink-400">🤝</span> 1,000+ girls supported</li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">{t.quick_links}</h4>
              <ul className="space-y-2.5 text-sm">
                {[["#shop", t.nav.shop], ["#bags", t.nav.bags], ["#checkout", t.nav.checkout], ["#letters", t.nav.letters], ["#about", t.nav.about]].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="hover:text-white transition-colors duration-150">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">{t.contact}</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2"><Phone size={13} /> +250 782 991 182</li>
                <li className="flex items-center gap-2"><Mail size={13} /> hello@ukwezi.rw</li>
                <li className="flex items-center gap-2"><MapPin size={13} /> Kigali, Rwanda 🇷🇼</li>
              </ul>
              <div className="flex gap-3 mt-5">
                {[
                  { label: "f", color: "hover:bg-blue-600" },
                  { label: "ig", color: "hover:bg-pink-600" },
                  { label: "tw", color: "hover:bg-sky-500" },
                  { label: "tk", color: "hover:bg-purple-600" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold transition-colors duration-200 ${s.color}`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-7 text-center">
            <p className="text-sm text-white/35 mb-2">
              {t.footer_copy}
            </p>
            <p className="text-xs text-white/25 mb-3">CEO: <span className="text-pink-300">Lucas Cathy Nishimwe</span></p>
            <p className="text-[11px] text-white/20 flex items-center justify-center gap-2">
              <span>👩‍👧 Made by her, for her, with every period in mind</span>
              <span className="text-white/10">|</span>
              <span>🌙 Turi kumwe muri buri kwezi</span>
            </p>
            <button onClick={() => setAdminOpen(true)} className="mt-4 text-[10px] text-white/15 hover:text-white/40 transition-colors">🔐 Admin</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

