/**
 * Calendar Integration Helper for Wedding Events
 * Generates direct URLs for Google Calendar, Outlook, Yahoo Calendar, and downloadable .ics files
 */

export interface WeddingCalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO string or YYYYMMDDTHHmmssZ
  endDate: string;
}

export const WEDDING_EVENT_DATA = {
  title: "Walimatul 'Ursy Pernikahan Adat Melayu: Tengku Faris & Siti Zulaikha",
  description: "Menghadiri Majlis Ijab Qabul & Walimatul 'Ursy (Resepsi Bersanding) Tengku Muhammad Faris & Siti Zulaikha Indahsari.\n\nBusana: Melayu Tradisional / Batik / Pakaian Sopan Elegan (Nuansa Zamrud & Emas Songket).\n\nDoa restu Anda adalah kehormatan bagi kami.",
  location: "Balai Adat Melayu Riau & Grand Mahligai Ballroom, Jl. Diponegoro No. 18, Pekanbaru",
  // Saturday, 24 October 2026, 09:00 WIB to 17:00 WIB (WIB = UTC+7 -> 02:00 UTC to 10:00 UTC)
  startUtc: "20261024T020000Z",
  endUtc: "20261024T100000Z",
  displayDate: "Sabtu, 24 Oktober 2026",
  displayTime: "09.00 - 17.00 WIB",
};

export function getGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: WEDDING_EVENT_DATA.title,
    dates: `${WEDDING_EVENT_DATA.startUtc}/${WEDDING_EVENT_DATA.endUtc}`,
    details: WEDDING_EVENT_DATA.description,
    location: WEDDING_EVENT_DATA.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getOutlookCalendarUrl(): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: WEDDING_EVENT_DATA.title,
    body: WEDDING_EVENT_DATA.description,
    location: WEDDING_EVENT_DATA.location,
    startdt: "2026-10-24T09:00:00",
    enddt: "2026-10-24T17:00:00",
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function downloadIcsFile(): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WarkahDiraja//AdatMelayu//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${WEDDING_EVENT_DATA.title}`,
    `DESCRIPTION:${WEDDING_EVENT_DATA.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${WEDDING_EVENT_DATA.location}`,
    `DTSTART:${WEDDING_EVENT_DATA.startUtc}`,
    `DTEND:${WEDDING_EVENT_DATA.endUtc}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Pengingat: Besok Majlis Walimatul 'Ursy Tengku Faris & Siti Zulaikha",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "undangan-pernikahan-faris-zulaikha.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
