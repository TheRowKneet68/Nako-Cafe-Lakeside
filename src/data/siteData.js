export const defaultSettings = {
  name: 'Nako Cafe',
  tagline: 'Crafted Coffee. Meaningful Moments.',
  address: 'Lakeside Road, Pokhara 33700, Nepal',
  phone: '+977 61-456789',
  mobile: '+977 980-1234567',
  email: 'hello@nakocafe.com.np',
  whatsapp: '9779801234567',
  mapQuery: 'Lakeside, Pokhara, Nepal',
  openingDays: 'Open Daily',
  openingHours: '7:00 AM – 9:00 PM',
  priceRange: 'Rs 1–500',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  twitter: 'https://x.com',
  youtube: 'https://youtube.com',

  // ---- Editable website content (admin → Content Editor) ----
  heroBadge: 'Pokhara · Lakeside · Specialty Coffee',
  heroTitle: 'Crafted Coffee.',
  heroHighlight: 'Meaningful Moments.',
  heroSubtitle:
    'Experience handcrafted specialty coffee made from carefully selected Nepali beans.',

  aboutEyebrow: 'Our Story',
  aboutTitle: 'A Quiet Corner of',
  aboutTitleHighlight: 'Lakeside',
  aboutText1:
    'Nako Cafe was born from a simple belief — that Nepali coffee, grown high in the hills, deserves the same care as the world’s finest beans. We roast in small batches, pull every shot with intent, and serve it all in a warm, minimalist space where the espresso machine is the heart of the room.',
  aboutText2:
    'Step in from the busy Lakeside street and you’ll find slow-roasted beans, open windows, wooden tables and a community that lingers over second cups. Whether you’re here to work, to meet a friend, or simply to be — there’s always a seat, and always fresh coffee.',
  mission:
    'To serve exceptional Nepali-grown coffee with warmth and craft — a space where every guest feels at home, whether they stay for five minutes or five hours.',
  vision:
    'To put Pokhara’s coffee on the map — a cafe where local beans, honest hospitality and a beautiful space come together, one cup at a time.',
  chefName: 'Bibek Tamang',
  chefRole: 'Head Barista · Specialty Coffee Enthusiast',
  chefBio:
    'Trained in the specialty shops of Kathmandu and guided by the farmers who grow our beans in the hills of Syangja, Bibek leads a team obsessed with the details — dose, temperature, timing. His signature is a Spanish Latte that guests travel across Lakeside for.',

  signatureEyebrow: 'Customer Favourites',
  signatureTitle: 'Loved by Regulars',
  signatureSubtitle: 'The cups our guests come back for, again and again — tried, tested and poured daily.',

  eventsEyebrow: "What's On",
  eventsTitle: 'Events & Evenings',
  eventsSubtitle: 'Live music, workshops and tastings — the calendar at Nako Cafe.',

  galleryEyebrow: 'Our Gallery',
  galleryTitle: 'Life at Nako',
  gallerySubtitle: 'Latte art, warm interiors, golden steam and the people who make the morning better.',

  reviewsEyebrow: 'Loved by Guests',
  reviewsTitle: 'What Our Guests Say',
  reviewsSubtitle: 'Rated 4.9 out of 5 across 177+ Google reviews — here is why regulars keep coming back.',

  ctaTitle: 'Your Next Cup',
  ctaTitleHighlight: 'Is Waiting',
  ctaSubtitle: 'Coffee this good doesn’t wait. Swing by, order your favourite, and make a moment that lasts a little longer.',

  footerAbout:
    'Specialty coffee from Nepali beans, slow craft and a warm space in the heart of Lakeside, Pokhara.',

  // ---- Site images (admin → Content Editor → Images) ----
  heroImage: images.hero,
  aboutImage1: images.about1,
  aboutImage2: images.about2,
  chefImage: images.chef,
  ctaImage: images.cta,
  coffeeImage: images.coffee,

  // ---- Structured content blocks (stats, about values, amenities, coffee) ----
  sections: { ...defaultSections }
}

export const images = {
  hero: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80',
  about1: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80',
  about2: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
  chef: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
  cta: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1920&q=80',
  coffee: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80'
}

// Structured content blocks that admins can edit in the Content Editor.
// Keys mirror the `sections` JSONB column in supabase/schema.sql.
export const defaultSections = {
  stats: [
    { value: 4.9, suffix: '/5', decimals: 1, label: 'Average Rating' },
    { value: 177, suffix: '+', decimals: 0, label: 'Google Reviews' },
    { value: 20, suffix: '+', decimals: 0, label: 'Brews on the Menu' },
    { value: 100, suffix: '%', decimals: 0, label: 'Nepali-Grown Beans' }
  ],
  values: [
    {
      title: 'Small-Batch Roasting',
      text: 'Beans from the hills of Syangja, roasted fresh every week so every cup tastes alive.'
    },
    {
      title: 'Local Sourcing',
      text: 'Milk, sugar and seasonal produce from Pokhara’s own farms and market gardens.'
    },
    {
      title: 'Barista Craft',
      text: 'Every cup is dialled in — dose, ratio and timing, measured shot by shot.'
    },
    {
      title: 'A Space to Stay',
      text: 'Minimalist, calm and built for lingering — work, chat or simply be.'
    }
  ],
  amenities: [
    { title: 'Service Options', items: ['Outdoor Seating', 'Dine-in', 'Takeaway', 'Delivery', 'On-site Services'] },
    { title: 'Offerings', items: ['Coffee', 'Vegan Options', 'Vegetarian Options', 'Small Plates', 'Quick Bite', 'Alcohol'] },
    { title: 'Atmosphere', items: ['Casual', 'Cosy', 'Quiet', 'Trendy', 'Solo Dining Friendly'] },
    { title: 'Amenities', items: ['Free Wi-Fi', 'Gender-Neutral Toilets', 'NFC Payments', 'Seating', 'Table Service'] },
    { title: 'Our Crowd', items: ['Family Friendly', 'Groups', 'LGBTQ+ Friendly', 'Transgender Safe Space', 'Tourists', 'University Students'] },
    { title: 'Good to Know', items: ['Good for Kids', 'Dogs Allowed', 'Free Street Parking', 'Free Parking Lot', 'Breakfast & Dessert'] }
  ],
  coffee: {
    intro: {
      eyebrow: 'Why It’s a Legend',
      title: 'Espresso, Sweetened',
      titleHighlight: 'the Spanish Way',
      text: 'The Spanish Latte is not just our best-selling drink — it is the drink people cross Lakeside for. It starts with a double shot of our Nepali single-origin espresso, pulled rich and syrupy. While it is still hot, sweetened condensed milk is blended in, turning the coffee round and caramel-sweet without a drop of syrup. A layer of silky steamed milk finishes the cup.'
    },
    highlights: [
      { title: 'Nepali Beans', text: 'Single-origin beans from the hills of Syangja, roasted in small batches.' },
      { title: 'Caramel Sweetness', text: 'Condensed milk is folded in while the espresso is still hot — no syrup, no shortcuts.' },
      { title: 'Silky Finish', text: 'Topped with velvety steamed milk for a cup that is smooth to the very last sip.' }
    ],
    craftHeading: {
      eyebrow: 'Our Craft',
      title: 'How We Brew',
      subtitle: 'Three small obsessions that make every cup worth slowing down for.'
    },
    craft: [
      { title: 'Small-Batch Roasting', text: 'We roast weekly so the beans are never older than they should be — bright, sweet and alive.' },
      { title: 'Precision in Every Shot', text: 'Dose, ratio, temperature and timing are dialled in each morning and checked through the day.' },
      { title: 'Fresh in Every Cup', text: 'Nothing sits under a heat lamp. Coffee is ground to order and pulled the moment you order it.' }
    ],
    favouritesHeading: {
      eyebrow: 'Customer Favourites',
      title: 'Start With These',
      subtitle: 'The drinks and bites our guests order again and again.'
    }
  },
  barista: {
    years: { value: 10, suffix: '+', label: 'Years Brewing' },
    cups: { value: 1, suffix: 'K+', label: 'Cups Poured' },
    beans: { value: 100, suffix: '%', label: 'Nepali Beans' }
  },
  pageHeaders: {
    about: {
      eyebrow: 'Our Story',
      title: 'About Nako Cafe',
      subtitle: 'Small-batch Nepali coffee, poured with care in a space made for lingering.'
    },
    menu: {
      eyebrow: 'Taste the Menu',
      title: 'Our Coffee & Menu',
      subtitle: 'Search, filter by category, and spot the veg, popular and new picks at a glance.'
    },
    gallery: {
      eyebrow: 'Picture Perfect',
      title: 'Our Gallery',
      subtitle: 'Coffee, latte art, interiors and the moments in between.'
    },
    reviews: {
      eyebrow: 'Guest Stories',
      title: 'Customer Reviews',
      subtitle: 'Honest words from locals and travellers who have enjoyed their coffee with us.'
    },
    events: {
      eyebrow: 'Live Music & Events',
      title: 'Evenings Worth Staying For',
      subtitle: 'Acoustic sets, latte art nights and slow tastings — the events calendar at Nako Cafe.'
    },
    contact: {
      eyebrow: 'Say Hello',
      title: 'Contact Us',
      subtitle: "We'd love to hear from you — questions, feedback or a group visit to the cafe."
    },
    reservation: {
      eyebrow: 'Book a Table',
      title: 'Reserve Your Visit',
      subtitle: "Tell us when — we'll keep the best seat by the window ready for you."
    }
  }
}
