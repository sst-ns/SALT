function base64UrlEncode(buffer: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generateVerifier() {
  return crypto.randomUUID() + crypto.randomUUID();
}

async function sha256(value: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  return crypto.subtle.digest("SHA-256", data);
}

export async function startPkceLogin() {
  // console.log("startPKCELOgin");
  const verifier = generateVerifier(); // abc
  const hashed = await sha256(verifier);
  const challenge = base64UrlEncode(hashed);

  sessionStorage.setItem("pkce_verifier", verifier);

  const loginUrl =
    `${import.meta.env.VITE_REACT_COGNITO_DOMAIN}/authorize` + // use this becuase it is recommended for PKCE
    `?response_type=code` +
    `&client_id=${import.meta.env.VITE_REACT_COGNITO_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(import.meta.env.VITE_REACT_REDIRECT_URI)}` +
    `&identity_provider=SaltNS` +
    // `&scope=openid+email+profile` +
    // `&scope=aws.cognito.signin.user.admin+openid+email+profile+phone` +
    `&scope=aws.cognito.signin.user.admin+openid+email+profile` +
    `&code_challenge=${challenge}` +
    `&code_challenge_method=S256`;

  window.location.href = loginUrl;
}
