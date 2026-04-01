import { useEffect, useState } from "react";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { startPkceLogin } from "../../auth/pkce";
import { exchangeCodeForTokens } from "../../auth/token";

interface User {
  enterpriseId: string;
}

export const useSamlAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const idToken =
  //     new URL(window.location.href.replace("#", "?")).searchParams.get(
  //       "id_token",
  //     ) || window.sessionStorage.getItem("tkn_frm_saml");

  //   if (!idToken) {
  //     // window.location.href = import.meta.env.VITE_REACT_SAML_LOGIN_URL;
  //     setUser(null);
  //     return;
  //   }

  //   try {
  //     const payload = JSON.parse(atob(idToken.split(".")[1]));
  //     if (Math.floor(Date.now() / 1000) > payload.exp) {
  //       window.location.href = import.meta.env.VITE_REACT_SAML_LOGIN_URL;
  //       return;
  //     }
  //     console.log("payload", payload);

  //     const email = payload.email;
  //     const enterpriseId = email.split("@")[0];

  //     window.sessionStorage.setItem("tkn_frm_saml", idToken);
  //     window.sessionStorage.setItem("enterpriseId_frm_tkn", enterpriseId);

  //     setUser({ enterpriseId });
  //   } catch (error) {
  //     console.error("Error parsing token:", error);
  //   }
  // }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const storedToken = sessionStorage.getItem("tkn_frm_saml");

    // console.log("storedToken:", storedToken);
    async function authenticate() {
      setLoading(true);
      try {
        if (storedToken) {
          processToken(storedToken);
          return;
        }

        if (code) {
          const tokens = await exchangeCodeForTokens(code);
          sessionStorage.setItem("tkn_frm_saml", tokens.id_token);
          window.history.replaceState({}, "", "/");
          processToken(tokens.id_token);
          return;
        }

        // Not authenticated
        setUser(null);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    function processToken(idToken: string) {
      // console.log("idToken", idToken);
      if (idToken === undefined) return;
      const payload = JSON.parse(atob(idToken.split(".")[1]));
      // console.log("Full Payload:", payload);

      if (Date.now() / 1000 > payload.exp) {
        startPkceLogin();
        return;
      }

      const email = payload.email;
      const enterpriseId = email.split("@")[0];

      setUser({
        enterpriseId,
      });
    }

    authenticate().catch(console.error);
  }, []);

  return { user, loading };
};

// Helper function to create credentials provider
export const getCredentialsProvider = () =>
  fromCognitoIdentityPool({
    identityPoolId: import.meta.env.VITE_REACT_AWS_IDENTITY_POOL_ID,
    logins: {
      [`cognito-idp.${import.meta.env.VITE_REACT_AWS_REGION}.amazonaws.com/${
        import.meta.env.VITE_REACT_AWS_USER_POOL_ID
      }`]: window.sessionStorage.getItem("tkn_frm_saml") || "",
    },
    clientConfig: {
      region: import.meta.env.VITE_REACT_AWS_REGION,
    },
  });

// export const getCredentialsProvider = () => {
//   const token = window.sessionStorage.getItem("tkn_frm_saml");

//   const region = import.meta.env.VITE_REACT_AWS_REGION;
//   const userPoolId = import.meta.env.VITE_REACT_AWS_USER_POOL_ID;

//   const providerKey = `cognito-idp.${region}.amazonaws.com/${userPoolId}`;

//   console.log("==== CREDENTIAL DEBUG ====");
//   console.log("Region:", region);
//   console.log("UserPoolId:", userPoolId);
//   console.log("Provider Key:", providerKey);
//   console.log("Token (first 50 chars):", token?.slice(0, 50));
//   console.log("==========================");

//   if (!token) {
//     throw new Error("Token missing");
//   }

//   return fromCognitoIdentityPool({
//     identityPoolId: import.meta.env.VITE_REACT_AWS_IDENTITY_POOL_ID,
//     logins: {
//       [providerKey]: token,
//     },
//     clientConfig: {
//       region,
//     },
//   });
// };
