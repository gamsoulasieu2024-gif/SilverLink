const SCAM_PATTERNS = [
  /gift\s*card/i,
  /wire\s*transfer/i,
  /send\s*money/i,
  /your\s*account\s*is\s*suspended/i,
  /click\s*here\s*to\s*verify/i,
  /you\s*have\s*won/i,
  /social\s*security/i,
  /bank\s*details/i,
  /password/i,
  /whatsapp/i,
];

export function detectScam(text: string): boolean {
  return SCAM_PATTERNS.some((pattern) => pattern.test(text));
}

export function containsLink(text: string): boolean {
  return /https?:\/\/[^\s]+/i.test(text);
}
