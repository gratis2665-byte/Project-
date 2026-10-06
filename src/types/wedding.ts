export interface GuestInfo {
  name: string;
  salutation?: string;
  tableNumber?: string;
  note?: string;
}

export interface WishMessage {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak' | 'ragu';
  relation: string;
  message: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface RsvpSubmission {
  id: string;
  name: string;
  phone: string;
  attendance: 'hadir' | 'tidak' | 'ragu';
  pax: number;
  session: 'akad' | 'resepsi' | 'semua';
  notes?: string;
  timestamp: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'adat' | 'prewedding' | 'detail';
  subtitle: string;
  description: string;
  imageUrl: string;
}

export interface WeddingConfig {
  groomName: string;
  groomFullName: string;
  groomTitle: string;
  groomParents: string;
  groomInstagram: string;

  brideName: string;
  brideFullName: string;
  brideTitle: string;
  brideParents: string;
  brideInstagram: string;

  weddingDateDisplay: string;
  weddingDateIso: string; // for countdown
  venueName: string;
  venueAddress: string;

  akadTime: string;
  resepsiTime: string;

  bankBsiAccount: string;
  bankBsiHolder: string;
  bankBcaAccount: string;
  bankBcaHolder: string;
  bankMandiriAccount: string;
  bankMandiriHolder: string;
  giftAddress: string;

  // Visibility toggles
  showCountdown: boolean;
  showCouple: boolean;
  showSchedule: boolean;
  showGallery: boolean;
  showWishes: boolean;
  showGifts: boolean;
  showMalayAnimation: boolean;
}

export const DEFAULT_WEDDING_CONFIG: WeddingConfig = {
  groomName: 'Tengku Faris',
  groomFullName: 'Tengku Muhammad Faris, S.T., M.Eng.',
  groomTitle: 'Gelar Adat: Seri Kesuma Melayu',
  groomParents: 'Alm. YM. Tengku Ahmad bin Tengku Ismail & YM. Syarifah Aminah binti Syed Yahya',
  groomInstagram: 'tengkufaris.eng',

  brideName: 'Siti Zulaikha',
  brideFullName: 'Siti Zulaikha Indahsari, S.Farm., Apt.',
  brideTitle: 'Gelar Adat: Puteri Puspa Kencana',
  brideParents: "YM. Dato' H. Mansur Daulay & Datin Hj. Rohana binti Jaafar",
  brideInstagram: 'zulaikhaindah.apt',

  weddingDateDisplay: 'Sabtu, 24 Oktober 2026',
  weddingDateIso: '2026-10-24T09:00:00+07:00',
  venueName: 'Balai Adat Lembaga Adat Melayu (LAM) Riau',
  venueAddress: 'Jl. Diponegoro No. 18, Pekanbaru',

  akadTime: 'Pukul 08.30 - 11.30 WIB',
  resepsiTime: 'Pukul 13.00 - 17.30 WIB',

  bankBsiAccount: '7182930411',
  bankBsiHolder: 'Tengku Muhammad Faris',
  bankBcaAccount: '8220914820',
  bankBcaHolder: 'Siti Zulaikha Indahsari',
  bankMandiriAccount: '1080019283741',
  bankMandiriHolder: 'Tengku Muhammad Faris',
  giftAddress: 'Rumah Pusaka Melayu, Jl. Dahlia Indah No. 45, Kec. Sukajadi, Kota Pekanbaru, Riau 28124 (Penerima: Faris & Zulaikha / 0812-7654-3210)',

  showCountdown: true,
  showCouple: true,
  showSchedule: true,
  showGallery: true,
  showWishes: true,
  showGifts: true,
  showMalayAnimation: true,
};
