export const SITE = {
  name: "Meridian Travel",
  tagline: "Visas, flights, stays and cars — arranged.",
  /**
   * WhatsApp number in international format, digits only (e.g. "923001234567").
   * Leave empty to use WhatsApp's share-sheet link, which lets the visitor
   * pick the conversation themselves.
   */
  whatsappNumber: "",
  /** Optional contact details — rendered in the footer only when filled in. */
  email: "",
  address: "",
  phone: "",
} as const;

export function whatsappUrl(text?: string): string {
  const base = SITE.whatsappNumber
    ? `https://wa.me/${SITE.whatsappNumber}`
    : "https://wa.me/";
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
