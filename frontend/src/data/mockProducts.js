// Demo catalog used by the frontend until the FastAPI + Firestore backend
// is running. Pages call productService first and fall back to this data,
// so swapping to the live API requires no component changes.

const img = (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=80`

export const categories = [
  { slug: 'men', name: "Men", image: img('photo-1516257984-b1b4d707412e') },
  { slug: 'women', name: "Women", image: img('photo-1483985988355-763728e1935b') },
  { slug: 'shoes', name: 'Shoes', image: img('photo-1549298916-b41d501d3772') },
  { slug: 'watches', name: 'Watches', image: img('photo-1524805444758-089113d48a6d') },
  { slug: 'accessories', name: 'Accessories', image: img('photo-1590874103328-eac38a683ce7') }
]

export const products = [
  { id: 'p1', slug: 'wool-tailored-overcoat', name: 'Wool Tailored Overcoat', category: 'men', brand: 'VELARA Atelier', price: 428, discountPrice: 349, rating: 4.8, reviewCount: 62, stock: 14, isNew: true, sizes: ['S','M','L','XL'], colors: ['Charcoal','Camel'], images: [img('photo-1544022613-e87ca75a784a'), img('photo-1520975954732-35dd22299614')], description: 'A double-faced wool overcoat cut for a tailored silhouette, finished with horn buttons and a hand-stitched lapel.' },
  { id: 'p2', slug: 'silk-drape-blouse', name: 'Silk Drape Blouse', category: 'women', brand: 'VELARA', price: 189, discountPrice: null, rating: 4.6, reviewCount: 41, stock: 22, isNew: true, sizes: ['XS','S','M','L'], colors: ['Ivory','Black'], images: [img('photo-1485462537746-965f33f7f6a7'), img('photo-1495385794356-15371f348c31')], description: 'Fluid mulberry silk blouse with a soft cowl neckline, designed to move with you from desk to dinner.' },
  { id: 'p3', slug: 'minimalist-chronograph-watch', name: 'Minimalist Chronograph Watch', category: 'watches', brand: 'VELARA Time', price: 620, discountPrice: 520, rating: 4.9, reviewCount: 118, stock: 9, isNew: false, sizes: ['One Size'], colors: ['Gold','Silver'], images: [img('photo-1524805444758-089113d48a6d'), img('photo-1524592094714-0f0654e20314')], description: 'Sapphire-crystal chronograph with a brushed stainless case and an interchangeable Italian leather strap.' },
  { id: 'p4', slug: 'urban-runner-sneakers', name: 'Urban Runner Sneakers', category: 'shoes', brand: 'VELARA Studio', price: 240, discountPrice: 199, rating: 4.7, reviewCount: 84, stock: 31, isNew: false, sizes: ['39','40','41','42','43','44'], colors: ['White','Black'], images: [img('photo-1549298916-b41d501d3772'), img('photo-1595950653106-6c9ebd614d3a')], description: 'Full-grain leather sneakers on a cushioned sole, built for a clean minimal profile that pairs with everything.' },
  { id: 'p5', slug: 'italian-leather-backpack', name: 'Italian Leather Backpack', category: 'accessories', brand: 'VELARA', price: 340, discountPrice: null, rating: 4.5, reviewCount: 27, stock: 17, isNew: true, sizes: ['One Size'], colors: ['Cognac','Black'], images: [img('photo-1590874103328-eac38a683ce7'), img('photo-1548036328-c9fa89d128fa')], description: 'Vegetable-tanned Italian leather backpack with a padded laptop sleeve and brushed brass hardware.' },
  { id: 'p6', slug: 'slim-fit-blazer', name: 'Slim Fit Blazer', category: 'men', brand: 'VELARA Atelier', price: 310, discountPrice: 259, rating: 4.6, reviewCount: 53, stock: 12, isNew: false, sizes: ['S','M','L','XL'], colors: ['Navy','Charcoal'], images: [img('photo-1594938298603-c8148c4dae35'), img('photo-1507679799987-c73779587ccf')], description: 'A softly structured blazer in Italian wool twill, tailored for a modern slim fit.' },
  { id: 'p7', slug: 'classic-oxford-shirt', name: 'Classic Oxford Shirt', category: 'men', brand: 'VELARA', price: 98, discountPrice: null, rating: 4.4, reviewCount: 76, stock: 40, isNew: false, sizes: ['S','M','L','XL'], colors: ['White','Sky Blue'], images: [img('photo-1596755094514-f87e34085b2c'), img('photo-1602810318383-e386cc2a3ccf')], description: 'A crisp cotton Oxford shirt with a clean button-down collar, built to layer or wear on its own.' },
  { id: 'p8', slug: 'pleated-midi-skirt', name: 'Pleated Midi Skirt', category: 'women', brand: 'VELARA', price: 148, discountPrice: 118, rating: 4.7, reviewCount: 34, stock: 19, isNew: true, sizes: ['XS','S','M','L'], colors: ['Camel','Black'], images: [img('photo-1583496661160-fb5886a0aaaa'), img('photo-1594633312681-425c7b97ccd1')], description: 'A softly pleated midi skirt in a fluid satin finish, cut to move with every step.' }
]

export const reviews = [
  { id: 'r1', name: 'Amelia Hart', rating: 5, comment: 'The overcoat fits exactly as tailored — the fabric feels genuinely premium.', date: '2026-06-12' },
  { id: 'r2', name: 'Daniel Cross', rating: 5, comment: 'Fast shipping and the packaging alone felt like a luxury brand experience.', date: '2026-05-30' },
  { id: 'r3', name: 'Sofia Reyes', rating: 4, comment: 'Beautiful pieces overall — sizing runs slightly small so check the guide.', date: '2026-05-18' }
]
