export interface GalleryItem {
  url: string;
  thumbnail: string;
  caption: { en: string; te: string };
  type: "image" | "video";
  videoUrl?: string;
  order: number;
  category: "temple" | "festival" | "deity" | "events";
}

export const galleryItems: GalleryItem[] = [
  {
    url: "/images/gallery/temple-front.jpg",
    thumbnail: "/images/gallery/temple-front.jpg",
    caption: { en: "Temple Front View", te: "ఆలయ ముందు భాగం" },
    type: "image",
    order: 1,
    category: "temple",
  },

  {
    url: "/images/gallery/main-deity.jpg",
    thumbnail: "/images/gallery/main-deity.jpg",
    caption: { en: "Sri Raya Swami - Main Deity", te: "శ్రీ రాయస్వామి - ప్రధాన దేవత" },
    type: "image",
    order: 2,
    category: "deity",
  },
  {
    url: "/images/gallery/temple-gopuram.jpg",
    thumbnail: "/images/gallery/temple-gopuram.jpg",
    caption: { en: "Temple Gopuram", te: "ఆలయ గోపురం" },
    type: "image",
    order: 3,
    category: "temple",
  },
  {
    url: "/images/gallery/festival-celebration.jpg",
    thumbnail: "/images/gallery/festival-celebration.jpg",
    caption: { en: "Annual Brahmotsavam Celebration", te: "వార్షిక బ్రహ్మోత్సవ వేడుక" },
    type: "image",
    order: 4,
    category: "festival",
  },
  {
    url: "/images/gallery/evening-aarti.jpg",
    thumbnail: "/images/gallery/evening-aarti.jpg",
    caption: { en: "Evening Aarti Ceremony", te: "సాయంత్రం ఆరతి కార్యక్రమం" },
    type: "image",
    order: 5,
    category: "events",
  },
  {
    url: "/images/gallery/temple-interior.jpg",
    thumbnail: "/images/gallery/temple-interior.jpg",
    caption: { en: "Temple Interior - Mandapam", te: "ఆలయ లోపలి భాగం - మండపం" },
    type: "image",
    order: 6,
    category: "temple",
  },
  {
    url: "/images/gallery/deity-alankaram.jpg",
    thumbnail: "/images/gallery/deity-alankaram.jpg",
    caption: { en: "Special Deity Alankaram", te: "ప్రత్యేక దేవత అలంకారం" },
    type: "image",
    order: 7,
    category: "deity",
  },
  {
    url: "/images/gallery/devotees-darshan.jpg",
    thumbnail: "/images/gallery/devotees-darshan.jpg",
    caption: { en: "Devotees during Darshan", te: "దర్శనం సమయంలో భక్తులు" },
    type: "image",
    order: 8,
    category: "events",
  },
  {
    url: "/images/gallery/temple-night.jpg",
    thumbnail: "/images/gallery/temple-night.jpg",
    caption: { en: "Temple Night View - Deepotsavam", te: "ఆలయ రాత్రి దృశ్యం - దీపోత్సవం" },
    type: "image",
    order: 9,
    category: "festival",
  },
  {
    url: "",
    thumbnail: "/images/gallery/video-thumb.jpg",
    caption: { en: "Temple Virtual Tour", te: "ఆలయ వర్చువల్ టూర్" },
    type: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 10,
    category: "temple",
  },
];
