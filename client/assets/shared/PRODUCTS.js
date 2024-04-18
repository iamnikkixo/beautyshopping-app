const One = require('../images/products/essentialoil.jpeg');
const Two = require('../images/products/showergel.jpg');
const Three = require('../images/products/peppermintoil.jpg');
const Four = require('../images/products/vitcserum.jpg');
const Five = require('../images/products/arganshampoo.jpg');
const Six = require('../images/products/lotion.jpeg');
const Seven = require('../images/products/giftset.jpg');
const Eight = require('../images/products/lavenderoil.jpeg');
const Nine = require('../images/products/bodylotion.jpg');
const Ten = require('../images/products/shampoo.jpg');
const Eleven = require('../images/products/bathsalts.jpg');
const Twelve = require('../images/products/lipbalm.jpg');
const Thirteen = require('../images/products/bodyscrub.jpg');
const Fourteen = require('../images/products/massageoil.jpg');
const Fifteen = require('../images/products/coconutlotion.jpg');
const Sixteen = require('../images/products/roomspray.jpg');

export const PRODUCTS = [
  {
    id: 1,
    name: 'Lavender Body Oil',
    price: '29.99',
    img: One,
    about:
      'A nourishing body oil that hydrates and soothes skin, while promoting relaxation with the calming scent of lavender. Perfect for use after a bath or shower, or as a massage oil.',
    category: ['popular', 'bath & body'],
    reviews: 342,
    rating: 4.5,
    volume: 150,
  },
  {
    id: 2,
    name: 'Eucalyptus Shower Gel',
    price: '19.99',
    img: Two,
    about:
      'A refreshing shower gel that invigorates the senses with the cool, minty scent of eucalyptus. Formulated with natural ingredients to cleanse and hydrate skin.',
    category: 'bath & body',
    reviews: 175,
    rating: 4.2,
    volume: 250,
  },
  {
    id: 3,
    name: 'Peppermint Essential Oil',
    price: '12.99',
    img: Three,
    about:
      'A pure and potent essential oil that uplifts and energizes with the refreshing scent of peppermint. Can be used for aromatherapy, massage, or added to bath water.',
    category: 'aromatherapy',
    reviews: 239,
    rating: 4.8,
    volume: 80,
  },
  {
    id: 4,
    name: 'Vitamin C Serum',
    price: '49.99',
    img: Four,
    about:
      'A potent serum that brightens and firms skin, while providing antioxidant protection with the power of vitamin C. Helps to reduce the appearance of fine lines and wrinkles.',
    category: 'skincare',
    reviews: 123,
    rating: 4.3,
    volume: 100,
    new: true,
  },
  {
    id: 5,
    name: 'Argan Oil Shampoo',
    price: '24.99',
    img: Five,
    about:
      'A gentle and nourishing shampoo that cleanses and hydrates hair, while providing the benefits of argan oil. Leaves hair shiny, soft, and manageable.',
    category: 'haircare',
    reviews: 281,
    rating: 4.6,
    volume: 200,
  },
  {
    id: 6,
    name: 'Rosewater Toner',
    price: '17.99',
    img: Six,
    about:
      'A hydrating and soothing facial toner that balances skin pH, while providing a refreshing and uplifting scent of rosewater. Can be used before or after applying moisturizer or makeup.',
    category: 'skincare',
    reviews: 92,
    rating: 4.0,
    volume: 100,
  },
  {
    id: 7,
    name: 'Pampering Spa Gift Set',
    price: '49.99',
    img: Seven,
    about:
      'Treat yourself or someone special to this indulgent spa gift set, featuring a selection of high-quality skincare and body care products. Relax and unwind with a soothing bath bomb, nourish your skin with a luxurious body lotion, and rejuvenate tired eyes with a refreshing eye mask.',
    category: ['gift sets', 'new'],
    reviews: 50,
    rating: 4.8,
    volume: null,
  },
  {
    id: 8,
    name: 'Green Tea Face Mask',
    price: '22.99',
    img: Eight,
    about:
      'A detoxifying and rejuvenating face mask that deep-cleans pores, while providing antioxidant and anti-aging benefits with the power of green tea. Leaves skin smooth, soft, and radiant.',
    category: ['skincare', 'new'],
    reviews: 120,
    rating: 4.7,
    volume: 100,
    new: true,
  },
  {
    id: 9,
    name: 'Lemongrass Body Lotion',
    price: '32.99',
    img: Nine,
    about:
      'A lightweight lotion that moisturizes and refreshes the skin with the bright and uplifting scent of lemongrass. Perfect for use after a shower or any time the skin needs hydration.',
    category: ['popular', 'bath & body'],
    reviews: 240,
    rating: 4.4,
    volume: 250,
  },
  {
    id: 10,
    name: 'Rosemary Mint Shampoo',
    price: '14.99',
    img: Ten,
    about:
      'A revitalizing shampoo that cleanses the hair and scalp while invigorating the senses with the refreshing scent of rosemary and mint. Perfect for use in the morning to start the day off on a fresh note.',
    category: 'haircare',
    reviews: 80,
    rating: 4.1,
    volume: 300,
  },
  {
    id: 11,
    name: 'Eucalyptus Bath Salts',
    price: '19.99',
    img: Eleven,
    about:
      'A luxurious bath soak that relaxes the body and mind with the calming scent of eucalyptus. Made with epsom salt and sea salt to soothe sore muscles and promote relaxation.',
    category: 'bath & body',
    reviews: 200,
    rating: 4.6,
    volume: 800,
  },
  {
    id: 12,
    name: 'Peppermint Lip Balm',
    price: '4.99',
    img: Twelve,
    about:
      'A hydrating lip balm that nourishes and protects the lips with the cooling and refreshing scent of peppermint. Perfect for use in the winter or any time the lips need extra hydration.',
    category: 'skincare',
    reviews: 90,
    rating: 4.3,
    volume: 10,
    new: true,
  },
  {
    id: 13,
    name: 'Citrus Body Scrub',
    price: '24.99',
    img: Thirteen,
    about:
      'An exfoliating body scrub that buffs away dead skin cells and leaves the skin soft and smooth with the refreshing scent of citrus. Perfect for use before shaving or to prep the skin for self-tanner.',
    category: ['popular', 'bath & body'],
    reviews: 347,
    rating: 4.6,
    volume: 200,
  },
  {
    id: 14,
    name: 'Jasmine Massage Oil',
    price: '39.99',
    img: Fourteen,
    about:
      'A luxurious massage oil that nourishes the skin and relaxes the mind with the intoxicating scent of jasmine. Made with nourishing oils like jojoba and almond oil to hydrate the skin and promote relaxation.',
    category: ['aromatherapy', 'new'],
    reviews: 285,
    rating: 4.8,
    volume: 100,
  },
  {
    id: 15,
    name: 'Coconut Body Butter',
    price: '29.99',
    img: Fifteen,
    about:
      'A rich and luxurious body butter that deeply moisturizes and nourishes the skin with the tropical scent of coconut. Perfect for use on dry patches like elbows and knees.',
    category: ['skincare', 'new'],
    reviews: 439,
    rating: 4.7,
    volume: 250,
  },
  {
    id: 16,
    name: 'Lavender Room Spray',
    price: '12.99',
    img: Sixteen,
    about:
      'A refreshing room spray that freshens the air and promotes relaxation with the calming scent of lavender. Perfect for use before bedtime or any time the air needs freshening up.',
    categories: ['popular', 'aromatherapy'],
    reviews: 212,
    rating: 4.5,
    volume: 120,
  },
];
