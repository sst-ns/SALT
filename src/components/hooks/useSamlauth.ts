import { useEffect, useState } from "react";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

interface User {
  enterpriseId: string;
}

export const useSamlAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const idToken =
      new URL(window.location.href.replace("#", "?")).searchParams.get(
        "id_token"
      ) || window.sessionStorage.getItem("tkn_frm_saml");

    if (!idToken) {
      window.location.href = import.meta.env.VITE_REACT_SAML_LOGIN_URL;
      return;
    }

    try {
      const payload = JSON.parse(atob(idToken.split(".")[1]));
      if (Math.floor(Date.now() / 1000) > payload.exp) {
        window.location.href = import.meta.env.VITE_REACT_SAML_LOGIN_URL;
        return;
      }
      console.log("payload", payload);

      const email = payload.email;
      const enterpriseId = email.split("@")[0];

      window.sessionStorage.setItem("tkn_frm_saml", idToken);
      window.sessionStorage.setItem("enterpriseId_frm_tkn", enterpriseId);

      setUser({ enterpriseId });
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }, []);

  return user;
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
