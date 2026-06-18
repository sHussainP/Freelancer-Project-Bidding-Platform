/**
 * Decodes a standard JWT token payload safely using a Base64URL translation map.
 */
export function decodeJwt(token: string | null): any | null {
  if (!token) return null;

  try {
    const payloadSegment = token.split(".")?.[1];
    if (!payloadSegment) return null;

    // Convert Base64URL format to standard Base64 string formatting
    const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );

    return JSON.parse(atob(padded));
  } catch (error) {
    console.error("Failed to decode token payload:", error);
    return null;
  }
}

/**
 * Safely fetches the access token from localStorage and extracts the user's role context.
 */
export function getUserRoleFromStorage(): string | null {
  if (typeof window === "undefined") return null; // Guard for Next.js SSR (Server-Side Rendering)

  const token = localStorage.getItem("access_token");
  if (!token) return null;

  const payload = decodeJwt(token);
  return payload?.role || null;
}
