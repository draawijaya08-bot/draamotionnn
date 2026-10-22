import { ProjectCategory } from '@/types/portfolio';
import { siteIdentityData } from '@/data/portfolio-data';

export const INSTAGRAM_PROFILE_URL =
  siteIdentityData.navigationAndContact.instagram.profileUrl;

export const INSTAGRAM_HANDLE =
  siteIdentityData.navigationAndContact.instagram.displayHandle;

/**
 * Generator tautan WhatsApp dengan pesan otomatis kontekstual
 * @param category Kategori karya yang sedang dieksplorasi (opsional)
 * @param projectTitle Judul spesifik proyek yang sedang dibuka (opsional)
 * @returns URL lengkap wa.me dengan pre-filled query text
 */
export function getWhatsAppUrl(
  category?: ProjectCategory,
  projectTitle?: string
): string {
  const { phoneNumber, defaultMessage, categoryContextMessages } =
    siteIdentityData.navigationAndContact.whatsapp;

  let textMessage = defaultMessage;

  if (projectTitle) {
    textMessage = `Halo Indra, saya melihat karya "${projectTitle}" di portofolio Anda dan tertarik untuk berdiskusi mengenai proyek serupa untuk brand kami.`;
  } else if (category && categoryContextMessages[category]) {
    textMessage = categoryContextMessages[category];
  }

  // Bersihkan format nomor dari karakter non-numerik dan pastikan kode negara 62
  let cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textMessage)}`;
}

/**
 * Helper untuk mendapatkan tautan langsung ke Instagram DM / Profil
 */
export function getInstagramUrl(): string {
  return INSTAGRAM_PROFILE_URL;
}
