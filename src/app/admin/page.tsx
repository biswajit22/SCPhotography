"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Camera,
  LogOut,
  LayoutDashboard,
  Image as ImageIcon,
  CalendarCheck,
  Mail,
  FileEdit,
  Trash2,
  Check,
  X,
  Plus,
  BarChart,
  User,
  ExternalLink,
} from "lucide-react";
import {
  db,
  Photo,
  Album,
  Testimonial,
  Blog,
  Package,
  Video,
  Booking,
  ContactRequest,
} from "@/lib/db";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("analytics");
  const [authorized, setAuthorized] = useState(false);

  // States for DB data
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  // Form states
  const [newPhoto, setNewPhoto] = useState({ title: "", url: "", category: "wedding", description: "" });
  const [base64Img, setBase64Img] = useState("");
  
  const [newTestimonial, setNewTestimonial] = useState({ name: "", role: "Wedding Couple", content: "", rating: 5 });
  
  const [newBlog, setNewBlog] = useState({
    title: "",
    summary: "",
    content: "",
    coverImage: "",
    category: "Wedding",
    readTime: "5 min read",
  });
  
  const [newVideo, setNewVideo] = useState({ title: "", youtubeId: "", category: "wedding" });
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  // Check auth session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("sc_photo_admin_session");
      if (session !== "active") {
        router.push("/admin/login");
      } else {
        setAuthorized(true);
      }
    }
  }, [router]);

  // Load CMS Data
  const loadData = async () => {
    const p = await db.getPhotos();
    const a = await db.getAlbums();
    const t = await db.getTestimonials();
    const b = await db.getBlogs();
    const v = await db.getVideos();
    const bo = await db.getBookings();
    const co = await db.getContactRequests();
    const pa = await db.getPackages();

    setPhotos(p);
    setAlbums(a);
    setTestimonials(t);
    setBlogs(b);
    setVideos(v);
    setBookings(bo);
    setContacts(co);
    setPackages(pa);
  };

  useEffect(() => {
    if (authorized) {
      loadData();
    }
  }, [authorized]);

  const handleLogout = () => {
    localStorage.removeItem("sc_photo_admin_session");
    router.push("/admin/login");
  };

  // Image Upload handler (Base64)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Img(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 1. ADD PHOTO
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = base64Img || newPhoto.url || "/images/hero_1.png";
    await db.addPhoto({
      title: newPhoto.title,
      url: finalUrl,
      category: newPhoto.category,
      description: newPhoto.description,
    });
    setNewPhoto({ title: "", url: "", category: "wedding", description: "" });
    setBase64Img("");
    loadData();
  };

  // DELETE PHOTO
  const handleDeletePhoto = async (id: string) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      await db.deletePhoto(id);
      loadData();
    }
  };

  // 2. ADD TESTIMONIAL
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.addTestimonial(newTestimonial);
    setNewTestimonial({ name: "", role: "Wedding Couple", content: "", rating: 5 });
    loadData();
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (confirm("Delete this testimonial?")) {
      await db.deleteTestimonial(id);
      loadData();
    }
  };

  // 3. ADD BLOG
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.addBlog({
      title: newBlog.title,
      summary: newBlog.summary,
      content: newBlog.content,
      coverImage: newBlog.coverImage || "/images/hero_1.png",
      category: newBlog.category,
      readTime: newBlog.readTime,
    });
    setNewBlog({ title: "", summary: "", content: "", coverImage: "", category: "Wedding", readTime: "5 min read" });
    loadData();
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm("Delete this blog article?")) {
      await db.deleteBlog(id);
      loadData();
    }
  };

  // Helper to extract YouTube ID from full URL
  const extractYoutubeId = (urlOrId: string): string => {
    if (!urlOrId) return "";
    const trimmed = urlOrId.trim();
    if (trimmed.length === 11 && !trimmed.includes("/") && !trimmed.includes("?")) {
      return trimmed;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = trimmed.match(regExp);
    return (match && match[2].length === 11) ? match[2] : trimmed;
  };

  // 4. ADD / EDIT VIDEO
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYoutubeId(newVideo.youtubeId);
    
    if (editingVideoId) {
      // @ts-ignore
      await db.updateVideo({
        id: editingVideoId,
        title: newVideo.title,
        youtubeId: ytId,
        category: newVideo.category,
        thumbnail: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      });
      setEditingVideoId(null);
    } else {
      await db.addVideo({
        title: newVideo.title,
        youtubeId: ytId,
        category: newVideo.category,
        thumbnail: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      });
    }
    setNewVideo({ title: "", youtubeId: "", category: "wedding" });
    loadData();
  };

  const handleEditVideo = (v: Video) => {
    setEditingVideoId(v.id);
    setNewVideo({ title: v.title, youtubeId: v.youtubeId, category: v.category });
  };

  const handleCancelEditVideo = () => {
    setEditingVideoId(null);
    setNewVideo({ title: "", youtubeId: "", category: "wedding" });
  };

  const handleDeleteVideo = async (id: string) => {
    if (confirm("Delete this video?")) {
      await db.deleteVideo(id);
      if (editingVideoId === id) {
        handleCancelEditVideo();
      }
      loadData();
    }
  };

  // BOOKING ACTIONS
  const handleBookingStatus = async (id: string, status: "pending" | "confirmed" | "rejected") => {
    await db.updateBookingStatus(id, status);
    loadData();
  };

  const handleDeleteBooking = async (id: string) => {
    if (confirm("Delete this booking request?")) {
      await db.deleteBooking(id);
      loadData();
    }
  };

  // CONTACT ACTIONS
  const handleMarkContactRead = async (id: string) => {
    await db.markContactRequestRead(id);
    loadData();
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm("Delete this contact message?")) {
      await db.deleteContactRequest(id);
      loadData();
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center text-gold-accent font-semibold tracking-widest uppercase">
        Verifying Security Credentials...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg flex flex-col md:flex-row text-text-light font-body">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#121213] border-b md:border-b-0 md:border-r border-gold-accent/15 flex flex-col justify-between shrink-0">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-10">
            <Camera className="w-6 h-6 text-gold-accent" />
            <span className="font-display text-xl tracking-[0.2em] font-semibold text-white">
              SC<span className="text-gold-accent">.</span>CMS
            </span>
          </div>

          <nav className="space-y-2">
            {[
              { id: "analytics", label: "Dashboard", icon: LayoutDashboard },
              { id: "media", label: "Media Manager", icon: ImageIcon },
              { id: "bookings", label: "Bookings", icon: CalendarCheck, badge: bookings.filter((b) => b.status === "pending").length },
              { id: "contacts", label: "Contact Requests", icon: Mail, badge: contacts.filter((c) => c.status === "unread").length },
              { id: "content", label: "Content CMS", icon: FileEdit },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase tracking-widest transition-colors ${
                    activeTab === tab.id
                      ? "bg-gold-accent text-primary-bg font-semibold shadow-lg shadow-gold-accent/10"
                      : "hover:bg-primary-bg/50 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4.5 h-4.5" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && tab.badge > 0 ? (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${activeTab === tab.id ? "bg-primary-bg text-gold-accent" : "bg-gold-accent text-primary-bg"}`}>
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 pb-20 border-t border-text-light/5 flex flex-col space-y-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs hover:text-gold-accent transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-xs text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 border-b border-text-light/5 pb-6">
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-white font-medium capitalize">
              {activeTab === "content" ? "Content CMS Manager" : `${activeTab} Panel`}
            </h1>
            <p className="text-[10px] text-gold-accent uppercase tracking-widest mt-1">
              Shayani Chakraborty Studio Admin
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs bg-secondary-bg px-4 py-2 rounded-full border border-gold-accent/10">
            <User className="w-4 h-4 text-gold-accent" />
            <span className="text-white font-semibold uppercase tracking-wider">SuperAdmin</span>
          </div>
        </header>

        {/* -------------------- 1. TAB: ANALYTICS -------------------- */}
        {activeTab === "analytics" && (
          <div className="space-y-10">
            {/* Counts grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Photo Gallery items", value: photos.length, icon: ImageIcon },
                { label: "Pending Bookings", value: bookings.filter((b) => b.status === "pending").length, icon: CalendarCheck },
                { label: "Total Bookings", value: bookings.length, icon: BarChart },
                { label: "Unread Messages", value: contacts.filter((c) => c.status === "unread").length, icon: Mail },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} className="glass-card p-6 rounded-2xl border border-gold-accent/5 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-display text-2xl md:text-3xl text-white font-bold block">{c.value}</span>
                      <span className="text-[9px] uppercase tracking-widest text-text-light/50 block mt-0.5">{c.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dashboard lists split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Recent Bookings */}
              <div className="glass-card rounded-2xl p-6 border border-gold-accent/5">
                <h3 className="font-display text-lg text-white font-semibold mb-6 flex items-center justify-between border-b border-text-light/5 pb-4">
                  <span>Recent Bookings</span>
                  <button onClick={() => setActiveTab("bookings")} className="text-[10px] text-gold-accent hover:underline uppercase tracking-wider">
                    View All
                  </button>
                </h3>
                <div className="space-y-4">
                  {bookings.slice(0, 4).map((b) => (
                    <div key={b.id} className="bg-primary-bg/50 p-4 rounded-xl flex items-center justify-between border border-text-light/5">
                      <div>
                        <span className="text-xs text-white font-semibold block">{b.name}</span>
                        <span className="text-[10px] text-text-light/50 block mt-0.5">{b.eventType} &middot; {b.date}</span>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                        b.status === "confirmed" ? "bg-green-950/40 text-green-400 border border-green-500/20" :
                        b.status === "rejected" ? "bg-red-950/40 text-red-400 border border-red-500/20" :
                        "bg-yellow-950/40 text-yellow-400 border border-yellow-500/20"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                  {bookings.length === 0 && <p className="text-xs text-text-light/40 py-6 text-center">No bookings received yet.</p>}
                </div>
              </div>

              {/* Recent Contact Messages */}
              <div className="glass-card rounded-2xl p-6 border border-gold-accent/5">
                <h3 className="font-display text-lg text-white font-semibold mb-6 flex items-center justify-between border-b border-text-light/5 pb-4">
                  <span>Recent Contact Messages</span>
                  <button onClick={() => setActiveTab("contacts")} className="text-[10px] text-gold-accent hover:underline uppercase tracking-wider">
                    View All
                  </button>
                </h3>
                <div className="space-y-4">
                  {contacts.slice(0, 4).map((c) => (
                    <div key={c.id} className="bg-primary-bg/50 p-4 rounded-xl flex items-center justify-between border border-text-light/5">
                      <div>
                        <span className="text-xs text-white font-semibold block">{c.name}</span>
                        <span className="text-[10px] text-text-light/50 block mt-0.5 line-clamp-1">{c.message}</span>
                      </div>
                      {c.status === "unread" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-gold-accent" />
                      )}
                    </div>
                  ))}
                  {contacts.length === 0 && <p className="text-xs text-text-light/40 py-6 text-center">No contact messages received yet.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 2. TAB: MEDIA MANAGER -------------------- */}
        {activeTab === "media" && (
          <div className="space-y-10">
            {/* Upload Form */}
            <div className="glass-card rounded-3xl p-6 md:p-8 border border-gold-accent/5">
              <h3 className="font-display text-lg text-white font-semibold mb-6 border-b border-text-light/5 pb-4">
                Upload New Photo to Gallery
              </h3>
              <form onSubmit={handleAddPhoto} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Photo Title</label>
                    <input
                      type="text"
                      value={newPhoto.title}
                      onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                      required
                      className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white"
                      placeholder="E.g. The Royal Sindoor Daan"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Category Album</label>
                    <select
                      value={newPhoto.category}
                      onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                      className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white appearance-none cursor-pointer"
                    >
                      <option value="wedding">Wedding</option>
                      <option value="bride">Bride</option>
                      <option value="groom">Groom</option>
                      <option value="pre-wedding">Pre Wedding</option>
                      <option value="birthday">Birthday</option>
                      <option value="maternity">Maternity</option>
                      <option value="baby">Baby & Kids</option>
                      <option value="traditional">Traditional</option>
                      <option value="couple">Couple</option>
                      <option value="family">Family</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">File Upload (Local Computer)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-xs text-text-light file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gold-accent/10 file:text-gold-accent file:hover:bg-gold-accent/20 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Or External Image URL</label>
                    <input
                      type="url"
                      value={newPhoto.url}
                      onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                      className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white"
                      placeholder="https://images.unsplash.com/... (if no file select)"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Short Description</label>
                  <input
                    type="text"
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-sm px-4 py-3 rounded-lg text-white"
                    placeholder="E.g. A gorgeous moment capturing bride tears..."
                  />
                </div>

                {base64Img && (
                  <div className="p-4 bg-primary-bg border border-gold-accent/15 rounded-xl flex justify-center">
                    <img src={base64Img} alt="Preview" className="max-h-48 rounded-lg" />
                  </div>
                )}

                <button type="submit" className="px-6 py-3 btn-gold rounded-xl text-xs uppercase tracking-widest text-primary-bg font-semibold flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Upload &amp; Publish Photo</span>
                </button>
              </form>
            </div>

            {/* List current photos */}
            <div>
              <h3 className="font-display text-lg text-white font-semibold mb-6">
                Active Gallery Media ({photos.length} photos)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                {photos.map((p) => (
                  <div key={p.id} className="bg-secondary-bg rounded-xl border border-gold-accent/5 overflow-hidden group relative">
                    <img src={p.url} alt={p.title} className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between z-10">
                      <span className="text-[8px] bg-gold-accent text-primary-bg font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block self-start">
                        {p.category}
                      </span>
                      <div>
                        <span className="text-[10px] text-white font-semibold block line-clamp-1 mb-2">{p.title}</span>
                        <button
                          onClick={() => handleDeletePhoto(p.id)}
                          className="w-full py-1.5 bg-red-950/40 hover:bg-red-900 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-widest font-semibold rounded-lg flex items-center justify-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 3. TAB: BOOKINGS -------------------- */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <h3 className="font-display text-lg text-white font-semibold border-b border-text-light/5 pb-4 mb-6">
              Client Booking Inquiries ({bookings.length} requests)
            </h3>
            <div className="space-y-6">
              {bookings.map((b) => (
                <div key={b.id} className="glass-card p-6 rounded-2xl border border-gold-accent/5 relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-semibold text-base">{b.name}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                        b.status === "confirmed" ? "bg-green-950/40 text-green-400 border border-green-500/20" :
                        b.status === "rejected" ? "bg-red-950/40 text-red-400 border border-red-500/20" :
                        "bg-yellow-950/40 text-yellow-400 border border-yellow-500/20"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-xs text-text-light/70 font-light">
                      <p><strong>Phone:</strong> {b.phone}</p>
                      <p><strong>Email:</strong> {b.email}</p>
                      <p><strong>Event:</strong> {b.eventType}</p>
                      <p><strong>Date:</strong> {b.date}</p>
                      <p className="col-span-2"><strong>Venue:</strong> {b.location}</p>
                    </div>
                    {b.message && <p className="text-xs text-text-light/60 bg-primary-bg/50 p-3 rounded-lg border border-text-light/5 mt-2">&ldquo;{b.message}&rdquo;</p>}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3 shrink-0 self-end md:self-center">
                    {b.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleBookingStatus(b.id, "confirmed")}
                          className="p-2.5 bg-green-950/40 border border-green-500/20 text-green-400 hover:bg-green-900 rounded-xl flex items-center justify-center"
                          title="Confirm Booking"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleBookingStatus(b.id, "rejected")}
                          className="p-2.5 bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900 rounded-xl flex items-center justify-center"
                          title="Reject Booking"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteBooking(b.id)}
                      className="p-2.5 bg-secondary-bg border border-text-light/10 text-text-light/50 hover:text-red-400 hover:border-red-400/30 rounded-xl flex items-center justify-center"
                      title="Delete Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {bookings.length === 0 && <p className="text-center py-20 border border-dashed border-text-light/10 rounded-2xl text-text-light/40">No booking requests found.</p>}
            </div>
          </div>
        )}

        {/* -------------------- 4. TAB: CONTACTS -------------------- */}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <h3 className="font-display text-lg text-white font-semibold border-b border-text-light/5 pb-4 mb-6">
              Contact Form Inquiries ({contacts.length} inquiries)
            </h3>
            <div className="space-y-6">
              {contacts.map((c) => (
                <div key={c.id} className="glass-card p-6 rounded-2xl border border-gold-accent/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-semibold text-base">{c.name}</span>
                      {c.status === "unread" && (
                        <span className="text-[8px] bg-gold-accent text-primary-bg font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                          New
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-xs text-text-light/70 font-light">
                      <p><strong>Phone:</strong> {c.phone}</p>
                      <p><strong>Email:</strong> {c.email}</p>
                      <p><strong>Event:</strong> {c.eventType}</p>
                      <p><strong>Date:</strong> {c.eventDate}</p>
                      <p className="col-span-2"><strong>Venue:</strong> {c.venue}</p>
                    </div>
                    <p className="text-xs text-text-light/80 bg-primary-bg/50 p-4 rounded-xl border border-text-light/5 mt-3 leading-relaxed">&ldquo;{c.message}&rdquo;</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3 shrink-0 self-end md:self-center">
                    {c.status === "unread" && (
                      <button
                        onClick={() => handleMarkContactRead(c.id)}
                        className="px-4 py-2 bg-gold-accent/10 border border-gold-accent/20 hover:bg-gold-accent hover:text-primary-bg text-gold-accent text-[10px] uppercase tracking-widest font-semibold rounded-xl"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteContact(c.id)}
                      className="p-2.5 bg-secondary-bg border border-text-light/10 text-text-light/50 hover:text-red-400 hover:border-red-400/30 rounded-xl flex items-center justify-center"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {contacts.length === 0 && <p className="text-center py-20 border border-dashed border-text-light/10 rounded-2xl text-text-light/40">No contact requests found.</p>}
            </div>
          </div>
        )}

        {/* -------------------- 5. TAB: CONTENT CMS -------------------- */}
        {activeTab === "content" && (
          <div className="space-y-12">
            {/* Section 5.1: Testimonials */}
            <div className="glass-card rounded-2xl p-6 border border-gold-accent/5 space-y-6">
              <h3 className="font-display text-lg text-white font-semibold border-b border-text-light/5 pb-4 flex items-center justify-between">
                <span>Manage Client Testimonials</span>
                <span className="text-[10px] text-gold-accent uppercase tracking-widest">{testimonials.length} reviews</span>
              </h3>
              
              {/* Testimonial Form */}
              <form onSubmit={handleAddTestimonial} className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-primary-bg/30 p-4 rounded-xl border border-text-light/5">
                <div className="sm:col-span-1">
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Client Name</label>
                  <input
                    type="text"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                    placeholder="Rohan &amp; Sreya"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Category Role</label>
                  <input
                    type="text"
                    value={newTestimonial.role}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                    placeholder="Wedding Couple"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Rating</label>
                  <select
                    value={newTestimonial.rating}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Testimonial Review Content</label>
                  <textarea
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    required
                    rows={2}
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white resize-none"
                    placeholder="Write client feedback details here..."
                  />
                </div>
                <div className="sm:col-span-3">
                  <button type="submit" className="px-5 py-2 btn-gold rounded-lg text-[10px] uppercase tracking-widest text-primary-bg font-semibold flex items-center space-x-2">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Testimonial</span>
                  </button>
                </div>
              </form>

              {/* Testimonial List */}
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-primary-bg/50 p-4 rounded-xl border border-text-light/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-white font-semibold">{t.name}</span>
                      <span className="text-gold-accent ml-2">({t.role})</span>
                      <p className="text-text-light/60 line-clamp-1 mt-1">{t.content}</p>
                    </div>
                    <button onClick={() => handleDeleteTestimonial(t.id)} className="text-red-400 hover:text-red-300 p-1.5">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5.2: Blogs */}
            <div className="glass-card rounded-2xl p-6 border border-gold-accent/5 space-y-6">
              <h3 className="font-display text-lg text-white font-semibold border-b border-text-light/5 pb-4 flex items-center justify-between">
                <span>Manage Blog Articles</span>
                <span className="text-[10px] text-gold-accent uppercase tracking-widest">{blogs.length} articles</span>
              </h3>

              {/* Blog Form */}
              <form onSubmit={handleAddBlog} className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-primary-bg/30 p-4 rounded-xl border border-text-light/5">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Article Title</label>
                  <input
                    type="text"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                    placeholder="E.g. Pre Wedding Locations in Kolkata"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Category Tag</label>
                  <input
                    type="text"
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                    placeholder="E.g. Pre Wedding"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Cover Image URL</label>
                  <input
                    type="text"
                    value={newBlog.coverImage}
                    onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })}
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Estimated Read Time</label>
                  <input
                    type="text"
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                    placeholder="5 min read"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Summary</label>
                  <input
                    type="text"
                    value={newBlog.summary}
                    onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                    placeholder="Brief outline summary displaying on index cards..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Article Core Content</label>
                  <textarea
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    required
                    rows={6}
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white resize-none"
                    placeholder="Write detailed article paragraph content..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="px-5 py-2 btn-gold rounded-lg text-[10px] uppercase tracking-widest text-primary-bg font-semibold flex items-center space-x-2">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Publish Article</span>
                  </button>
                </div>
              </form>

              {/* Blogs list */}
              <div className="space-y-3">
                {blogs.map((b) => (
                  <div key={b.id} className="bg-primary-bg/50 p-4 rounded-xl border border-text-light/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-white font-semibold">{b.title}</span>
                      <span className="text-gold-accent ml-2">({b.category})</span>
                    </div>
                    <button onClick={() => handleDeleteBlog(b.id)} className="text-red-400 hover:text-red-300 p-1.5">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5.3: Cinematic Videos */}
            <div className="glass-card rounded-2xl p-6 border border-gold-accent/5 space-y-6">
              <h3 className="font-display text-lg text-white font-semibold border-b border-text-light/5 pb-4 flex items-center justify-between">
                <span>Manage Cinematic Wedding Films</span>
                <span className="text-[10px] text-gold-accent uppercase tracking-widest">{videos.length} videos</span>
              </h3>

              {/* Video Form */}
              <form onSubmit={handleAddVideo} className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-primary-bg/30 p-4 rounded-xl border border-text-light/5">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Video Title</label>
                  <input
                    type="text"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                    placeholder="Ritwik &amp; Ritika Wedding"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">YouTube Video ID</label>
                  <input
                    type="text"
                    value={newVideo.youtubeId}
                    onChange={(e) => setNewVideo({ ...newVideo, youtubeId: e.target.value })}
                    required
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                    placeholder="E.g. 5p2zS82XGik"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-text-light/60 font-semibold block mb-2">Category</label>
                  <select
                    value={newVideo.category}
                    onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                    className="w-full bg-primary-bg border border-text-light/10 focus:border-gold-accent/50 outline-none text-xs px-3 py-2 rounded-lg text-white"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="pre-wedding">Pre Wedding</option>
                  </select>
                </div>
                <div className="sm:col-span-3 flex items-center space-x-4">
                  <button type="submit" className="px-5 py-2 btn-gold rounded-lg text-[10px] uppercase tracking-widest text-primary-bg font-semibold flex items-center space-x-2">
                    {editingVideoId ? (
                      <span>Save Changes</span>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Cinematic Video</span>
                      </>
                    )}
                  </button>
                  {editingVideoId && (
                    <button
                      type="button"
                      onClick={handleCancelEditVideo}
                      className="px-5 py-2 border border-text-light/10 hover:border-red-400 hover:text-red-400 rounded-lg text-[10px] uppercase tracking-widest text-text-light transition-colors font-semibold"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {/* Videos list */}
              <div className="space-y-3">
                {videos.map((v) => (
                  <div key={v.id} className={`bg-primary-bg/50 p-4 rounded-xl border flex items-center justify-between text-xs transition-all duration-300 ${
                    editingVideoId === v.id ? "border-gold-accent bg-gold-accent/5" : "border-text-light/5"
                  }`}>
                    <div>
                      <span className="text-white font-semibold">{v.title}</span>
                      <span className="text-gold-accent ml-2">(https://youtube.com/watch?v={v.youtubeId})</span>
                      {editingVideoId === v.id && (
                        <span className="text-[9px] uppercase tracking-widest text-gold-accent font-semibold block mt-1">Currently Editing</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditVideo(v)}
                        className="text-gold-accent hover:text-white p-1.5 transition-colors"
                        title="Edit video link"
                      >
                        <FileEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(v.id)}
                        className="text-red-400 hover:text-red-300 p-1.5 transition-colors"
                        title="Delete video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
