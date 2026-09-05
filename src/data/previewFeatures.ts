import addNoteVideo from '../assets/add_note.mp4';
import pinnedNoteVideo from '../assets/pinned_note.mp4';
import sidebarVideo from '../assets/sidebar.mp4';

export interface PreviewFeature {
  title: string;
  subtitle: string;
  description: string;
  videoSrc: string;
}

export const INTRO_SLIDE = {
  eyebrow: 'Preview Extension',
  heading: 'Explore More',
  subtitle: null,
} as const;

export const PREVIEW_FEATURES: PreviewFeature[] = [
  {
    title: 'Create Notes Anywhere',
    subtitle: 'Never lose a thought.',
    description:
      'Click anywhere on a webpage to instantly create a sticky note. Every note is automatically linked to the current page and saved automatically.',
    videoSrc: addNoteVideo,
  },
  {
    title: 'Global Pinning',
    subtitle: 'Keep what matters visible.',
    description:
      'Pin important notes globally so they stay visible while browsing across different websites.',
    videoSrc: pinnedNoteVideo,
  },
  {
    title: 'Universal Sidebar',
    subtitle: 'Your second brain across the web.',
    description:
      'Browse every sticky note you\'ve ever created, search them instantly, and jump directly back to any page.',
    videoSrc: sidebarVideo,
  },
];

export const TOTAL_SLIDES = PREVIEW_FEATURES.length + 1;
