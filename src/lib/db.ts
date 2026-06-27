// Unified Data Layer for SC Photography (Supabase + LocalStorage Fallback)

export interface Photo {
  id: string;
  url: string;
  category: string; // 'wedding', 'bride', 'groom', 'pre-wedding', 'birthday', 'maternity', 'baby', 'traditional', 'couple', 'family'
  title: string;
  description?: string;
  createdAt: string;
}

export interface Album {
  id: string;
  name: string; // e.g. 'Wedding', 'Birthday', 'Pre Wedding', 'Baby', 'Engagement', 'Family', 'Maternity'
  slug: string;
  coverImage: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  category: string;
  readTime: string;
  date: string;
}

export interface Package {
  id: string;
  name: string; // 'Silver', 'Gold', 'Platinum'
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  thumbnail: string;
  category: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  time?: string;
  guestCount?: number;
  location: string;
  budget?: string;
  additionalServices?: string[];
  message?: string;
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: string;
  venue: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
}

// Check for Supabase config
const hasSupabaseEnv = 
  typeof window !== 'undefined' &&
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Default Seed Data
const DEFAULT_ALBUMS: Album[] = [
  { id: '1', name: 'Wedding', slug: 'wedding', coverImage: '/images/hero_1.png', description: 'Traditional & Candid Indian Wedding storytelling.' },
  { id: '2', name: 'Pre Wedding', slug: 'pre-wedding', coverImage: '/images/hero_3.png', description: 'Cinematic romance in gorgeous Kolkata locations.' },
  { id: '3', name: 'Maternity & Baby', slug: 'maternity-baby', coverImage: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=800', description: 'Celebrating new life and pure childhood innocence.' },
  { id: '4', name: 'Birthday & Events', slug: 'birthday-events', coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800', description: 'Lively coverage of birthdays, rice ceremonies and corporate events.' },
];

const DEFAULT_PHOTOS: Photo[] = [
  { id: 'p1', url: '/images/hero_1.png', category: 'wedding', title: 'Eternal Promises', description: 'A beautiful moment during the wedding rituals.' , createdAt: '2026-01-01' },
  { id: 'p2', url: '/images/hero_2.png', category: 'bride', title: 'The Bengali Bride', description: 'Exquisite details of a traditional Bengali bride.' , createdAt: '2026-01-02' },
  { id: 'p3', url: '/images/hero_3.png', category: 'pre-wedding', title: 'Ghat Romance', description: 'Pre-wedding shoot during golden hour at Princep Ghat, Kolkata.' , createdAt: '2026-01-03' },
  { id: 'p4', url: '/images/hero_4.png', category: 'family', title: 'Tears of Joy', description: 'Emotional family moment during Bidai.' , createdAt: '2026-01-04' },
  { id: 'p5', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', category: 'couple', title: 'Hand in Hand', description: 'A walk towards a new beginning.' , createdAt: '2026-01-05' },
  { id: 'p6', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800', category: 'traditional', title: 'Saptapadi', description: 'Walking around the holy fire in a Bengali wedding.' , createdAt: '2026-01-06' },
  { id: 'p7', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800', category: 'birthday', title: 'First Birthday Blowout', description: 'Blowing the candle on the first birthday.' , createdAt: '2026-01-07' },
  { id: 'p8', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800', category: 'baby', title: 'Innocent Eyes', description: 'Annaprashan ceremony photography.' , createdAt: '2026-01-08' },
  { id: 'p9', url: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=800', category: 'maternity', title: 'Waiting for You', description: 'A glowing mom-to-be maternity shoot.' , createdAt: '2026-01-09' },
  { id: 'p10', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800', category: 'groom', title: 'The Royal Groom', description: 'A portrait of the groom in traditional sherwani.' , createdAt: '2026-01-10' },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Rohan & Sreya Sen', role: 'Wedding Couple', content: 'Shayani and her team are absolute wizards! They captured our wedding with so much emotional depth. Every time we look at the album, we relive the laughter and tears. Highly recommended!', rating: 5 },
  { id: 't2', name: 'Debolina Mukherjee', role: 'Bride', content: 'SC Photography made me feel so comfortable on my big day. The candid pictures of my family are priceless. Shayani has an amazing eye for traditional Bengali wedding rituals.', rating: 5 },
  { id: 't3', name: 'Priyanka & Amitava', role: 'Pre Wedding Couple', content: 'Our pre-wedding shoot at Victoria Memorial and Princep Ghat was an absolute dream. Shayani guided our poses beautifully, and the editing style is extremely rich and warm!', rating: 5 },
  { id: 't4', name: 'Anirban Das', role: 'Groom', content: 'Exceptional service and extremely professional. The drone shots and 4K cinematic highlight film are of Bollywood standards. Thank you, SC Photography!', rating: 5 },
  { id: 't5', name: 'Sayantani Roy', role: 'Mother (Annaprashan)', content: 'We booked SC Photography for our son\'s Rice Ceremony (Annaprashan). They were so patient with the baby and got the most adorable smiles. Fast delivery too!', rating: 5 },
  { id: 't6', name: 'Megha Chatterjee', role: 'Maternity Shoot', content: 'I am so glad I chose Shayani for my maternity shoot. She captured the glow, the excitement, and the warmth beautifully. The outdoor portraits are breathtaking.', rating: 5 },
  { id: 't7', name: 'Sourav Ganguly (Client)', role: 'Birthday Celebration', content: 'Outstanding work for our grandfather\'s 80th birthday. They didn\'t miss a single relative. The colors are natural and the expressions are vivid.', rating: 5 },
  { id: 't8', name: 'Preeti & Joy', role: 'Destination Wedding', content: 'Shayani traveled with us to Mandarmani for our beach destination wedding. The team was energetic, working from dawn to midnight. Incredible storytellers.', rating: 5 },
];

const DEFAULT_BLOGS: Blog[] = [
  {
    id: 'b1',
    title: 'Top Wedding Photography Ideas for 2026',
    slug: 'top-wedding-photography-ideas',
    summary: 'Discover the latest trends in luxury wedding photography, from cinematic drone captures to emotional documentary styles.',
    content: `Luxury wedding photography has evolved from simple poses to cinematic storytelling. Here are the top trends for this wedding season:\n\n1. **Cinematic Drone Perspectives:** Capturing the grand scale of the venue, the couple's walk, and traditional outdoor setups.\n2. **The Bidai Tear - Documentary style:** Focusing on raw, unscripted family emotions rather than static setups.\n3. **Monochrome Portraits:** Classic black-and-white shots that focus purely on light, shadows, and facial expressions.\n4. **Intimate Getting-Ready Shots:** Behind-the-scenes portraits of the bride's makeup and the groom's sherwani details.`,
    coverImage: '/images/hero_1.png',
    category: 'Wedding',
    readTime: '5 min read',
    date: 'June 20, 2026'
  },
  {
    id: 'b2',
    title: 'Best Bengali Wedding Poses Every Couple Needs',
    slug: 'best-bengali-wedding-poses',
    summary: 'A curated list of traditional and candid wedding poses, including Subho Drishti and Mala Bodol moments.',
    content: `A Bengali wedding is packed with vibrant rituals, colors, and deep emotions. To capture these moments beautifully, we recommend focusing on these iconic poses:\n\n1. **The Subho Drishti Eye Contact:** The classic moment where the bride removes the betel leaves and looks at the groom. Capture this with a tight focal length.\n2. **The Sindoor Daan Portrait:** A close-up showing the groom applying vermillion, capturing the emotional eyes of the bride.\n3. **The Paan-Pata Peek:** Playful portraits of the bride peeking from behind the green betel leaves.\n4. **The Ultimate Royal Gaze:** The couple standing together, looking into the distance like royals.`,
    coverImage: '/images/hero_2.png',
    category: 'Wedding',
    readTime: '4 min read',
    date: 'June 15, 2026'
  },
  {
    id: 'b3',
    title: 'Top Pre Wedding Locations in Kolkata',
    slug: 'pre-wedding-locations-kolkata',
    summary: 'From heritage structures to peaceful riverbanks, here are the most picturesque pre-wedding spots in the City of Joy.',
    content: `Kolkata offers a rich heritage backdrop for pre-wedding photography. Here are our top handpicked spots:\n\n1. **Princep Ghat:** Famous for its majestic white Greek columns and boat rides on the Hooghly river at sunset.\n2. **Victoria Memorial:** The white marble architecture, lush green gardens, and classic horse carriages create a royal British-era vibe.\n3. **Eco Park (Urban/Modern):** Perfect for modern couple portraits with Eiffel Tower replica and beautiful lakes.\n4. **Maidan & Red Road:** The vast fields, tram tracks, and morning mist are ideal for dreamy, cinematic couple walks.`,
    coverImage: '/images/hero_3.png',
    category: 'Pre Wedding',
    readTime: '6 min read',
    date: 'May 28, 2026'
  },
  {
    id: 'b4',
    title: 'Birthday Photography Tips: How to Capture Joy',
    slug: 'birthday-photography-tips',
    summary: 'Essential photography tips for capturing kids, laughter, cake smashing, and chaotic joy at birthday celebrations.',
    content: `Birthday parties are full of speed, chaotic joy, and quick moments. Here is how we capture the magic:\n\n1. **Get Down to Their Eye Level:** When shooting kids, kneel down to see the world from their perspective.\n2. **Freeze the Action:** Use a fast shutter speed (at least 1/250s) to capture running kids and blowing candles.\n3. **Candid Cake Smash:** The best pictures are the messy ones. Keep shooting after the cake is cut!\n4. **Zoom in on the Details:** Close-ups of the decorations, custom cake design, and tiny hands opening gifts.`,
    coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800',
    category: 'Birthday',
    readTime: '3 min read',
    date: 'May 10, 2026'
  },
  {
    id: 'b5',
    title: 'The Ultimate Wedding Photography Checklist',
    slug: 'wedding-checklist',
    summary: 'Avoid last-minute panic. Here is the ultimate photography checklist for brides and grooms before their big day.',
    content: `To ensure every single detail is captured, sharing a checklist with your photographer is crucial. Here is our recommended checklist:\n\n1. **Ritual Highlights:** Subho Drishti, Mala Bodol, Sampradan, Saptapadi, Sindoor Daan.\n2. **Attire & Jewelry Detail Shots:** Wedding card, wedding rings, bridal lehenga/saree, groom's sehra.\n3. **Portraits:** Individual bridal session, individual groom session, first couple portrait.\n4. **Family & Guests:** Group photos with immediate family, close friends, and candid interactions.`,
    coverImage: '/images/hero_4.png',
    category: 'Wedding',
    readTime: '4 min read',
    date: 'April 22, 2026'
  }
];

const DEFAULT_PACKAGES: Package[] = [
  {
    id: 'pkg1',
    name: 'Silver',
    price: '₹45,000 / Day',
    features: [
      '1 Lead Traditional Photographer',
      '1 Cinematic Videographer',
      'Full Day Event Coverage',
      '1 Premium Hardbound Photo Album (100 Photos)',
      '1-Minute Instagram Teaser Video',
      '200+ Professionally Edited High-Res Photos',
      'Unlimited Raw Photos Delivery via Online Link'
    ]
  },
  {
    id: 'pkg2',
    name: 'Gold',
    price: '₹75,000 / Day',
    features: [
      '1 Lead Candid Photographer',
      '1 Traditional Photographer',
      '1 Lead Cinematic Director',
      '1 Drone Aerial Videographer (4K)',
      '1 Luxury Layflat Leather Album (150 Photos)',
      '2-Minute Instagram Reel / Teaser',
      '5-Minute Cinematic Highlight Film',
      '350+ Color-Graded Premium Photos',
      'Digital Delivery within 4 Weeks'
    ],
    isPopular: true
  },
  {
    id: 'pkg3',
    name: 'Platinum',
    price: '₹1,25,000 / Day',
    features: [
      'Shayani Chakraborty (Lead Candid Photographer)',
      '2 Secondary Photographers (Candid + Traditional)',
      '2 Cinematic Videographers (Full Frame 4K)',
      '1 Drone Aerial Videographer (4K Cinematic)',
      '2 Luxury Layflat Leather Albums + Gift Box',
      '2-Minute Instagram Reel',
      '8-Minute Cinematic Wedding Film',
      'Full Video Document of Rituals',
      '500+ Luxury Fine-Art Edited Photos',
      'Express Delivery in 2 Weeks'
    ]
  }
];

const DEFAULT_VIDEOS: Video[] = [
  { id: 'v1', youtubeId: 'L_LUpnjgPso', title: 'The Royal Bengali Wedding | Ritwik & Ritika', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', category: 'wedding' },
  { id: 'v2', youtubeId: 'lp-EO5I60KA', title: 'Cinematic Pre Wedding Love Story | Princep Ghat', thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800', category: 'pre-wedding' }
];



// Helper to write to local storage
const getLocal = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  const item = localStorage.getItem(`sc_photo_v3_${key}`);
  return item ? JSON.parse(item) : fallback;
};

const setLocal = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`sc_photo_v3_${key}`, JSON.stringify(value));
};



export const db = {
  // PHOTOS
  async getPhotos(): Promise<Photo[]> {
    if (hasSupabaseEnv) {
      // In a real Supabase mode, we would call:
      // const { data } = await supabase.from('photos').select('*'); return data;
    }
    return getLocal<Photo[]>('photos', DEFAULT_PHOTOS);
  },

  async addPhoto(photo: Omit<Photo, 'id' | 'createdAt'>): Promise<Photo> {
    const photos = await this.getPhotos();
    const newPhoto: Photo = {
      ...photo,
      id: 'photo_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0]
    };
    photos.unshift(newPhoto);
    setLocal('photos', photos);
    return newPhoto;
  },

  async deletePhoto(id: string): Promise<boolean> {
    const photos = await this.getPhotos();
    const filtered = photos.filter(p => p.id !== id);
    setLocal('photos', filtered);
    return true;
  },

  // ALBUMS
  async getAlbums(): Promise<Album[]> {
    return getLocal<Album[]>('albums', DEFAULT_ALBUMS);
  },

  async addAlbum(album: Omit<Album, 'id'>): Promise<Album> {
    const albums = await this.getAlbums();
    const newAlbum: Album = {
      ...album,
      id: 'album_' + Math.random().toString(36).substr(2, 9)
    };
    albums.push(newAlbum);
    setLocal('albums', albums);
    return newAlbum;
  },

  // TESTIMONIALS
  async getTestimonials(): Promise<Testimonial[]> {
    return getLocal<Testimonial[]>('testimonials', DEFAULT_TESTIMONIALS);
  },

  async addTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    const testimonials = await this.getTestimonials();
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: 'testimonial_' + Math.random().toString(36).substr(2, 9)
    };
    testimonials.unshift(newTestimonial);
    setLocal('testimonials', testimonials);
    return newTestimonial;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    const testimonials = await this.getTestimonials();
    const filtered = testimonials.filter(t => t.id !== id);
    setLocal('testimonials', filtered);
    return true;
  },

  // BLOGS
  async getBlogs(): Promise<Blog[]> {
    return getLocal<Blog[]>('blogs', DEFAULT_BLOGS);
  },

  async addBlog(blog: Omit<Blog, 'id' | 'slug' | 'date'>): Promise<Blog> {
    const blogs = await this.getBlogs();
    const newBlog: Blog = {
      ...blog,
      id: 'blog_' + Math.random().toString(36).substr(2, 9),
      slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    blogs.unshift(newBlog);
    setLocal('blogs', blogs);
    return newBlog;
  },

  async deleteBlog(id: string): Promise<boolean> {
    const blogs = await this.getBlogs();
    const filtered = blogs.filter(b => b.id !== id);
    setLocal('blogs', filtered);
    return true;
  },

  // PACKAGES
  async getPackages(): Promise<Package[]> {
    return getLocal<Package[]>('packages', DEFAULT_PACKAGES);
  },

  async updatePackage(updatedPkg: Package): Promise<Package> {
    const packages = await this.getPackages();
    const updated = packages.map(p => p.id === updatedPkg.id ? updatedPkg : p);
    setLocal('packages', updated);
    return updatedPkg;
  },

  // VIDEOS
  async getVideos(): Promise<Video[]> {
    return getLocal<Video[]>('videos', DEFAULT_VIDEOS);
  },

  async addVideo(video: Omit<Video, 'id'>): Promise<Video> {
    const videos = await this.getVideos();
    const newVideo: Video = {
      ...video,
      id: 'video_' + Math.random().toString(36).substr(2, 9)
    };
    videos.push(newVideo);
    setLocal('videos', videos);
    return newVideo;
  },

  async deleteVideo(id: string): Promise<boolean> {
    const videos = await this.getVideos();
    const filtered = videos.filter(v => v.id !== id);
    setLocal('videos', filtered);
    return true;
  },

  async updateVideo(updatedVideo: Video): Promise<Video> {
    const videos = await this.getVideos();
    const updated = videos.map(v => v.id === updatedVideo.id ? updatedVideo : v);
    setLocal('videos', updated);
    return updatedVideo;
  },

  // BOOKINGS
  async getBookings(): Promise<Booking[]> {
    return getLocal<Booking[]>('bookings', []);
  },

  async addBooking(booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> {
    const bookings = await this.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: 'booking_' + Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    bookings.unshift(newBooking);
    setLocal('bookings', bookings);
    return newBooking;
  },

  async updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'rejected'): Promise<boolean> {
    const bookings = await this.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setLocal('bookings', updated);
    return true;
  },

  async deleteBooking(id: string): Promise<boolean> {
    const bookings = await this.getBookings();
    const filtered = bookings.filter(b => b.id !== id);
    setLocal('bookings', filtered);
    return true;
  },

  // CONTACT REQUESTS
  async getContactRequests(): Promise<ContactRequest[]> {
    return getLocal<ContactRequest[]>('contacts', []);
  },

  async addContactRequest(request: Omit<ContactRequest, 'id' | 'status' | 'createdAt'>): Promise<ContactRequest> {
    const contacts = await this.getContactRequests();
    const newRequest: ContactRequest = {
      ...request,
      id: 'contact_' + Math.random().toString(36).substr(2, 9),
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    contacts.unshift(newRequest);
    setLocal('contacts', contacts);
    return newRequest;
  },

  async markContactRequestRead(id: string): Promise<boolean> {
    const contacts = await this.getContactRequests();
    const updated = contacts.map(c => c.id === id ? { ...c, status: 'read' as const } : c);
    setLocal('contacts', updated);
    return true;
  },

  async deleteContactRequest(id: string): Promise<boolean> {
    const contacts = await this.getContactRequests();
    const filtered = contacts.filter(c => c.id !== id);
    setLocal('contacts', filtered);
    return true;
  }
};
