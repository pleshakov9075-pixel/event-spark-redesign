export type MediaType = "photo" | "video";
export type MediaSection = "hero" | "reels" | "gallery" | "editorial";

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  section: MediaSection;
  priority?: number;
}

export const mediaItems: MediaItem[] = [
  { id: 'photo-vk-001', type: 'photo', src: '/assets/photo/vk/vk-001.jpg', section: 'gallery' },
  { id: 'photo-vk-002', type: 'photo', src: '/assets/photo/vk/vk-002.jpg', section: 'gallery' },
  { id: 'photo-vk-003', type: 'photo', src: '/assets/photo/vk/vk-003.jpg', section: 'gallery' },
  { id: 'photo-vk-004', type: 'photo', src: '/assets/photo/vk/vk-004.jpg', section: 'hero', priority: 4 },
  { id: 'photo-vk-005', type: 'photo', src: '/assets/photo/vk/vk-005.jpg', section: 'gallery' },
  { id: 'photo-vk-006', type: 'photo', src: '/assets/photo/vk/vk-006.jpg', section: 'gallery' },
  { id: 'photo-vk-007', type: 'photo', src: '/assets/photo/vk/vk-007.jpg', section: 'gallery' },
  { id: 'photo-vk-008', type: 'photo', src: '/assets/photo/vk/vk-008.jpg', section: 'gallery' },
  { id: 'photo-vk-009', type: 'photo', src: '/assets/photo/vk/vk-009.jpg', section: 'hero', priority: 9 },
  { id: 'photo-vk-010', type: 'photo', src: '/assets/photo/vk/vk-010.jpg', section: 'hero', priority: 10 },
  { id: 'photo-vk-011', type: 'photo', src: '/assets/photo/vk/vk-011.jpg', section: 'hero', priority: 11 },
  { id: 'photo-vk-012', type: 'photo', src: '/assets/photo/vk/vk-012.jpg', section: 'hero', priority: 12 },
  { id: 'photo-vk-013', type: 'photo', src: '/assets/photo/vk/vk-013.jpg', section: 'hero', priority: 13 },
  { id: 'photo-vk-014', type: 'photo', src: '/assets/photo/vk/vk-014.jpg', section: 'hero', priority: 14 },
  { id: 'photo-vk-015', type: 'photo', src: '/assets/photo/vk/vk-015.jpg', section: 'hero', priority: 15 },
  { id: 'photo-vk-016', type: 'photo', src: '/assets/photo/vk/vk-016.jpg', section: 'hero', priority: 16 },
  { id: 'photo-vk-017', type: 'photo', src: '/assets/photo/vk/vk-017.jpg', section: 'gallery' },
  { id: 'photo-vk-018', type: 'photo', src: '/assets/photo/vk/vk-018.jpg', section: 'gallery' },
  { id: 'photo-vk-019', type: 'photo', src: '/assets/photo/vk/vk-019.jpg', section: 'editorial' },
  { id: 'photo-vk-020', type: 'photo', src: '/assets/photo/vk/vk-020.jpg', section: 'hero', priority: 20 },
  { id: 'photo-vk-021', type: 'photo', src: '/assets/photo/vk/vk-021.jpg', section: 'gallery' },
  { id: 'photo-vk-022', type: 'photo', src: '/assets/photo/vk/vk-022.jpg', section: 'gallery' },
  { id: 'photo-vk-023', type: 'photo', src: '/assets/photo/vk/vk-023.jpg', section: 'gallery' },
  { id: 'photo-vk-024', type: 'photo', src: '/assets/photo/vk/vk-024.jpg', section: 'hero', priority: 24 },
  { id: 'photo-vk-025', type: 'photo', src: '/assets/photo/vk/vk-025.jpg', section: 'hero', priority: 25 },
  { id: 'photo-vk-026', type: 'photo', src: '/assets/photo/vk/vk-026.jpg', section: 'gallery' },
  { id: 'photo-vk-027', type: 'photo', src: '/assets/photo/vk/vk-027.jpg', section: 'gallery' },
  { id: 'photo-vk-028', type: 'photo', src: '/assets/photo/vk/vk-028.jpg', section: 'gallery' },
  { id: 'photo-vk-029', type: 'photo', src: '/assets/photo/vk/vk-029.jpg', section: 'gallery' },
  { id: 'photo-vk-030', type: 'photo', src: '/assets/photo/vk/vk-030.jpg', section: 'hero', priority: 30 },
  { id: 'photo-vk-031', type: 'photo', src: '/assets/photo/vk/vk-031.jpg', section: 'gallery' },
  { id: 'photo-vk-032', type: 'photo', src: '/assets/photo/vk/vk-032.jpg', section: 'editorial' },
  { id: 'photo-vk-033', type: 'photo', src: '/assets/photo/vk/vk-033.jpg', section: 'editorial' },
  { id: 'photo-vk-034', type: 'photo', src: '/assets/photo/vk/vk-034.jpg', section: 'hero', priority: 34 },
  { id: 'photo-vk-035', type: 'photo', src: '/assets/photo/vk/vk-035.jpg', section: 'hero', priority: 35 },
  { id: 'photo-vk-036', type: 'photo', src: '/assets/photo/vk/vk-036.jpg', section: 'gallery' },
  { id: 'photo-vk-037', type: 'photo', src: '/assets/photo/vk/vk-037.jpg', section: 'gallery' },
  { id: 'photo-vk-038', type: 'photo', src: '/assets/photo/vk/vk-038.jpg', section: 'gallery' },
  { id: 'photo-vk-039', type: 'photo', src: '/assets/photo/vk/vk-039.jpg', section: 'gallery' },
  { id: 'photo-vk-040', type: 'photo', src: '/assets/photo/vk/vk-040.jpg', section: 'gallery' },
  { id: 'photo-vk-041', type: 'photo', src: '/assets/photo/vk/vk-041.jpg', section: 'gallery' },
  { id: 'photo-vk-042', type: 'photo', src: '/assets/photo/vk/vk-042.jpg', section: 'hero', priority: 42 },
  { id: 'photo-vk-043', type: 'photo', src: '/assets/photo/vk/vk-043.jpg', section: 'gallery' },
  { id: 'photo-vk-044', type: 'photo', src: '/assets/photo/vk/vk-044.jpg', section: 'hero', priority: 44 },
  { id: 'photo-vk-045', type: 'photo', src: '/assets/photo/vk/vk-045.jpg', section: 'editorial' },
  { id: 'photo-vk-046', type: 'photo', src: '/assets/photo/vk/vk-046.jpg', section: 'editorial' },
  { id: 'photo-vk-047', type: 'photo', src: '/assets/photo/vk/vk-047.jpg', section: 'editorial' },
  { id: 'photo-vk-048', type: 'photo', src: '/assets/photo/vk/vk-048.jpg', section: 'hero', priority: 48 },
  { id: 'photo-vk-049', type: 'photo', src: '/assets/photo/vk/vk-049.jpg', section: 'editorial' },
  { id: 'photo-vk-050', type: 'photo', src: '/assets/photo/vk/vk-050.jpg', section: 'editorial' },
  { id: 'photo-generated-001', type: 'photo', src: '/assets/photo/generated/generated-001.png', section: 'editorial' },
  { id: 'photo-generated-002', type: 'photo', src: '/assets/photo/generated/generated-002.jpg', section: 'editorial' },
  { id: 'photo-generated-003', type: 'photo', src: '/assets/photo/generated/generated-003.jpg', section: 'editorial' },
  { id: 'photo-generated-004', type: 'photo', src: '/assets/photo/generated/generated-004.jpg', section: 'editorial' },
  { id: 'photo-generated-005', type: 'photo', src: '/assets/photo/generated/generated-005.jpg', section: 'editorial' },
  { id: 'photo-generated-006', type: 'photo', src: '/assets/photo/generated/generated-006.jpg', section: 'editorial' },
  { id: 'photo-generated-007', type: 'photo', src: '/assets/photo/generated/generated-007.jpg', section: 'editorial' },
  { id: 'photo-generated-008', type: 'photo', src: '/assets/photo/generated/generated-008.jpg', section: 'editorial' },
  { id: 'photo-generated-009', type: 'photo', src: '/assets/photo/generated/generated-009.jpg', section: 'editorial' },
  { id: 'photo-generated-010', type: 'photo', src: '/assets/photo/generated/generated-010.png', section: 'editorial' },
  { id: 'photo-generated-011', type: 'photo', src: '/assets/photo/generated/generated-011.png', section: 'editorial' },
  { id: 'photo-generated-012', type: 'photo', src: '/assets/photo/generated/generated-012.png', section: 'editorial' },
];

export const heroMedia = mediaItems
  .filter((item) => item.section === "hero" && item.type === "photo")
  .sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999));

export const reelsMedia = mediaItems
  .filter((item) => item.section === "reels" && item.type === "video")
  .sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999));

export const galleryMedia = mediaItems.filter((item) => item.section === "gallery" && item.type === "photo");
export const editorialMedia = mediaItems.filter((item) => item.section === "editorial" && item.type === "photo");

