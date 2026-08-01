const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`

export const defaultFoods = [
  { id: 'f1', name: 'Espresso', category: 'espresso', price: 180, veg: true, spicy: 0, popular: true, new: false, rating: 4.9, image: img('photo-1510591509098-f4fdc6d0ff04'), description: 'Single-origin Nepali beans, pulled short, rich and syrupy sweet.' },
  { id: 'f2', name: 'Double Espresso', category: 'espresso', price: 240, veg: true, spicy: 0, popular: false, new: false, rating: 4.8, image: img('photo-1610889556528-9a770e32642f'), description: 'Two shots of our signature espresso — for the serious mornings.' },
  { id: 'f3', name: 'Espresso Macchiato', category: 'espresso', price: 200, veg: true, spicy: 0, popular: false, new: false, rating: 4.7, image: img('photo-1572442388796-11668a67e53d'), description: 'A bold shot crowned with a soft dollop of steamed milk.' },

  { id: 'f4', name: 'Caffè Latte', category: 'latte', price: 260, veg: true, spicy: 0, popular: true, new: false, rating: 4.8, image: img('photo-1509042239860-f550ce710b93'), description: 'Smooth espresso with velvety steamed milk and delicate latte art.' },
  { id: 'f5', name: 'Vanilla Latte', category: 'latte', price: 290, veg: true, spicy: 0, popular: false, new: false, rating: 4.7, image: img('photo-1541167760496-1628856ab772'), description: 'A classic latte sweetened with house-made vanilla syrup.' },
  { id: 'f6', name: 'Hazelnut Latte', category: 'latte', price: 300, veg: true, spicy: 0, popular: false, new: true, rating: 4.6, image: img('photo-1551033406-611cf9a28f67'), description: 'Toasted hazelnut meets creamy milk coffee — a cosy hug in a cup.' },

  { id: 'f7', name: 'Spanish Latte', category: 'spanish', price: 280, veg: true, spicy: 0, popular: true, new: true, rating: 4.9, image: img('photo-1461023058943-07fcbe16d735'), description: 'Our legend — espresso blended with sweet condensed milk and silky milk. Guests cross Lakeside for it.' },
  { id: 'f8', name: 'Spanish Latte · Oat Milk', category: 'spanish', price: 320, veg: true, spicy: 0, popular: false, new: false, rating: 4.8, image: img('photo-1541167760496-1628856ab772'), description: 'The fan favourite, made dairy-free with creamy oat milk.' },

  { id: 'f9', name: 'Cappuccino', category: 'cappuccino', price: 240, veg: true, spicy: 0, popular: true, new: false, rating: 4.8, image: img('photo-1572442388796-11668a67e53d'), description: 'Equal parts espresso, milk and airy foam, dusted with cocoa.' },
  { id: 'f10', name: 'Iced Cappuccino', category: 'cappuccino', price: 300, veg: true, spicy: 0, popular: false, new: false, rating: 4.6, image: img('photo-1578314675249-a6910f80cc4e'), description: 'Chilled and frothy — summer in a tall glass.' },

  { id: 'f11', name: 'Flat White', category: 'flatwhite', price: 270, veg: true, spicy: 0, popular: true, new: false, rating: 4.8, image: img('photo-1495774856032-8b90bbb32b32'), description: 'Double ristretto with micro-foamed milk — stronger, silkier, simpler.' },

  { id: 'f12', name: 'Americano', category: 'americano', price: 220, veg: true, spicy: 0, popular: false, new: false, rating: 4.7, image: img('photo-1542160417-b4fc0e262f9e'), description: 'Espresso stretched with hot water — clean, bright and honest.' },

  { id: 'f13', name: 'Mocha', category: 'mocha', price: 320, veg: true, spicy: 0, popular: true, new: false, rating: 4.8, image: img('photo-1495474472287-4d71bcdd2085'), description: 'Espresso meets rich dark chocolate, topped with cream.' },
  { id: 'f14', name: 'White Mocha', category: 'mocha', price: 340, veg: true, spicy: 0, popular: false, new: false, rating: 4.7, image: img('photo-1551033406-611cf9a28f67'), description: 'Silky white chocolate blended into a double shot latte.' },

  { id: 'f15', name: 'Cold Brew', category: 'coldbrew', price: 350, veg: true, spicy: 0, popular: false, new: true, rating: 4.9, image: img('photo-1461023058943-07fcbe16d735'), description: 'Steeped for 18 hours, served over ice — low acid, deeply smooth.' },
  { id: 'f16', name: 'Cold Brew Tonic', category: 'coldbrew', price: 380, veg: true, spicy: 0, popular: false, new: false, rating: 4.7, image: img('photo-1513558161293-cdaf765ed2fd'), description: 'Cold brew lifted with tonic and a twist of orange.' },

  { id: 'f17', name: 'V60 Pour Over', category: 'pourover', price: 320, veg: true, spicy: 0, popular: false, new: true, rating: 4.9, image: img('photo-1497935586351-b67a49e012bf'), description: 'Our single-origin Nepali beans, hand-brewed to highlight their floral notes.' },
  { id: 'f18', name: 'Chemex for Two', category: 'pourover', price: 450, veg: true, spicy: 0, popular: false, new: false, rating: 4.8, image: img('photo-1517701604599-bb29b565090c'), description: 'A generous glass carafe of pour over — perfect for sharing.' },

  { id: 'f19', name: 'Classic Affogato', category: 'affogato', price: 350, veg: true, spicy: 0, popular: true, new: false, rating: 4.8, image: img('photo-1563805042-7684c019e1cb'), description: 'A scoop of vanilla ice cream drowned in hot espresso.' },

  { id: 'f20', name: 'Spanish Hot Chocolate', category: 'hotchoc', price: 300, veg: true, spicy: 0, popular: true, new: true, rating: 4.9, image: img('photo-1542990253-0d0f5be5f0ed'), description: 'Thick, luxurious European-style chocolate with a pinch of sea salt.' },
  { id: 'f21', name: 'Dark Hot Chocolate', category: 'hotchoc', price: 280, veg: true, spicy: 0, popular: false, new: false, rating: 4.7, image: img('photo-1572490122747-3968b75cc699'), description: '70% cacao melted into steamed milk — intense and comforting.' },

  { id: 'f22', name: 'Masala Chai', category: 'tea', price: 150, veg: true, spicy: 1, popular: true, new: false, rating: 4.8, image: img('photo-1576092768241-dec231879fc3'), description: 'Nepali milk tea simmered with ginger, cardamom and cloves.' },
  { id: 'f23', name: 'Green Tea', category: 'tea', price: 160, veg: true, spicy: 0, popular: false, new: false, rating: 4.6, image: img('photo-1597481499750-3e6b22637e12'), description: 'Hand-rolled Himalayan green leaves, steeped gently.' },
  { id: 'f24', name: 'Ginger Honey Tea', category: 'tea', price: 180, veg: true, spicy: 1, popular: false, new: false, rating: 4.7, image: img('photo-1544787219-7f47ccb76574'), description: 'Fresh ginger, wild honey and a squeeze of lemon.' },
  { id: 'f25', name: 'Earl Grey', category: 'tea', price: 180, veg: true, spicy: 0, popular: false, new: false, rating: 4.5, image: img('photo-1594631252845-29fc4cc8cde9'), description: 'Classic bergamot black tea, served with a slice of lemon.' },

  { id: 'f26', name: 'Mango Banana Smoothie', category: 'smoothie', price: 320, veg: true, spicy: 0, popular: true, new: false, rating: 4.7, image: img('photo-1610970881699-44a5587cabec'), description: 'Sweet valley mango whipped with banana and yogurt.' },
  { id: 'f27', name: 'Berry Blast Smoothie', category: 'smoothie', price: 340, veg: true, spicy: 0, popular: false, new: false, rating: 4.6, image: img('photo-1502741224143-90386d7f8c82'), description: 'Strawberry, blueberry and banana, blended fresh.' },

  { id: 'f28', name: 'Fresh Orange Juice', category: 'juice', price: 250, veg: true, spicy: 0, popular: true, new: false, rating: 4.7, image: img('photo-1600271886742-f049cd451bba'), description: 'Hand-pressed valley oranges — nothing added.' },
  { id: 'f29', name: 'Lemon Mint Cooler', category: 'juice', price: 200, veg: true, spicy: 0, popular: false, new: false, rating: 4.6, image: img('photo-1437418747212-8d9709afab22'), description: 'Fresh lemon, garden mint and a splash of sparkling water.' },

  { id: 'f30', name: 'Butter Croissant', category: 'croissant', price: 180, veg: true, spicy: 0, popular: true, new: false, rating: 4.8, image: img('photo-1555507036-ab1f4038808a'), description: 'Baked in-house every morning — shatteringly flaky, deeply buttery.' },
  { id: 'f31', name: 'Almond Croissant', category: 'croissant', price: 240, veg: true, spicy: 0, popular: false, new: false, rating: 4.7, image: img('photo-1558326567-98ae2405596b'), description: 'Filled with frangipane and toasted almonds, dusted with sugar.' },
  { id: 'f32', name: 'Chocolate Croissant', category: 'croissant', price: 240, veg: true, spicy: 0, popular: false, new: true, rating: 4.7, image: img('photo-1551024506-0bccd828d307'), description: 'Two batons of dark chocolate inside our signature croissant dough.' },

  { id: 'f33', name: 'New York Cheesecake', category: 'cheesecake', price: 380, veg: true, spicy: 0, popular: true, new: false, rating: 4.8, image: img('photo-1524351199678-941a58a3df50'), description: 'Baked classic with a buttery biscuit base and berry compote.' },
  { id: 'f34', name: 'Blueberry Cheesecake', category: 'cheesecake', price: 400, veg: true, spicy: 0, popular: false, new: false, rating: 4.7, image: img('photo-1533134242443-d4fd215305ad'), description: 'Silky cheesecake crowned with glazed wild blueberries.' },

  { id: 'f35', name: 'Walnut Brownie', category: 'brownie', price: 320, veg: true, spicy: 0, popular: true, new: false, rating: 4.8, image: img('photo-1606313564200-e75d5e30476c'), description: 'Fudgy, dense and studded with toasted walnuts.' },
  { id: 'f36', name: 'Sizzling Brownie', category: 'brownie', price: 420, veg: true, spicy: 0, popular: false, new: true, rating: 4.9, image: img('photo-1551024506-0bccd828d307'), description: 'Warm brownie on a hot skillet with ice cream and chocolate sauce.' },

  { id: 'f37', name: 'Chocolate Chip Cookie', category: 'cookies', price: 120, veg: true, spicy: 0, popular: true, new: false, rating: 4.7, image: img('photo-1499636136210-6f4ee915583e'), description: 'Soft-centred with pools of dark chocolate — baked hourly.' },
  { id: 'f38', name: 'Oatmeal Raisin Cookie', category: 'cookies', price: 120, veg: true, spicy: 0, popular: false, new: false, rating: 4.5, image: img('photo-1558961363-fa8fdf82db35'), description: 'Chewy oats, plump raisins and a whisper of cinnamon.' },

  { id: 'f39', name: 'Grilled Ham & Cheese', category: 'sandwich', price: 380, veg: false, spicy: 0, popular: true, new: false, rating: 4.7, image: img('photo-1528735602780-2552fd46c7af'), description: 'Sourdough grilled with smoked ham and melted cheddar.' },
  { id: 'f40', name: 'Caprese Panini', category: 'sandwich', price: 350, veg: true, spicy: 0, popular: false, new: false, rating: 4.6, image: img('photo-1565299624946-b28f40a0ae38'), description: 'Fresh mozzarella, tomato, basil and pesto, pressed warm.' },
  { id: 'f41', name: 'Avocado Toast', category: 'sandwich', price: 390, veg: true, spicy: 1, popular: false, new: true, rating: 4.8, image: img('photo-1541519227354-08fa5d50c44d'), description: 'Smashed avocado, chilli flakes and lime on toasted sourdough.' },

  { id: 'f42', name: 'Pesto Penne', category: 'pasta', price: 420, veg: true, spicy: 0, popular: true, new: false, rating: 4.7, image: img('photo-1563379926898-05f4575a45d8'), description: 'Penne tossed in basil pesto with cherry tomatoes and parmesan.' },
  { id: 'f43', name: 'Creamy Alfredo Pasta', category: 'pasta', price: 440, veg: true, spicy: 0, popular: false, new: false, rating: 4.6, image: img('photo-1621996346565-e3dbc646d9a9'), description: 'Fettuccine in a silky garlic-parmesan cream sauce.' },

  { id: 'f44', name: 'Margherita Pizza', category: 'pizza', price: 450, veg: true, spicy: 0, popular: true, new: false, rating: 4.8, image: img('photo-1513104890138-7c749659a591'), description: 'Wood-fired crust, San Marzano tomato, mozzarella and basil.' },
  { id: 'f45', name: 'Pepperoni Pizza', category: 'pizza', price: 480, veg: false, spicy: 1, popular: false, new: false, rating: 4.7, image: img('photo-1628840042765-356cda07504e'), description: 'Crispy pepperoni and melty mozzarella on a thin, blistered base.' },

  { id: 'f46', name: 'Pancake Stack', category: 'breakfast', price: 380, veg: true, spicy: 0, popular: true, new: false, rating: 4.8, image: img('photo-1567620905732-2d1ec7ab7445'), description: 'Fluffy buttermilk pancakes with wild honey and banana.' },
  { id: 'f47', name: 'Masala Omelette', category: 'breakfast', price: 260, veg: false, spicy: 2, popular: false, new: false, rating: 4.6, image: img('photo-1533089860892-a7c6f0a88666'), description: 'Three eggs with onions, green chillies and coriander.' },
  { id: 'f48', name: 'Granola Bowl', category: 'breakfast', price: 350, veg: true, spicy: 0, popular: false, new: true, rating: 4.7, image: img('photo-1511690743698-d9d85f2fbf38'), description: 'House granola, seasonal fruit, yogurt and a drizzle of honey.' },

  { id: 'f49', name: 'Tiramisu', category: 'desserts', price: 400, veg: true, spicy: 0, popular: true, new: false, rating: 4.9, image: img('photo-1571877227200-a0d98ea607e9'), description: 'Espresso-soaked layers with mascarpone and cocoa.' },
  { id: 'f50', name: 'Chocolate Lava Cake', category: 'desserts', price: 380, veg: true, spicy: 0, popular: false, new: false, rating: 4.8, image: img('photo-1606313564200-e75d5e30476c'), description: 'Molten-centred chocolate cake served warm.' },
  { id: 'f51', name: 'Fruit Tart', category: 'desserts', price: 320, veg: true, spicy: 0, popular: false, new: false, rating: 4.6, image: img('photo-1488477181946-6428a0291777'), description: 'Buttery pastry, vanilla custard and glazed seasonal fruit.' }
]
