export async function exchangeCodeForTokens(code: string) {
  const verifier = sessionStorage.getItem("pkce_verifier");
  if (!verifier) throw new Error("Missing PKCE verifier");

  const response = await fetch(
    `${import.meta.env.VITE_REACT_COGNITO_DOMAIN}/oauth2/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_REACT_COGNITO_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_REACT_REDIRECT_URI,
        code,
        code_verifier: verifier,
      }),
    },
  );
  // console.log("response while exhcnaging code for tokens", response);

  /**
   * idToken:eJslslll...
   * accessToken:
   * expirey
   */
  return response.json();
}
