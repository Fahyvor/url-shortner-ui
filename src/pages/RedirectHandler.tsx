import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRedirectUrl } from "../api/api";

const RedirectHandler: React.FC = () => {
  const location = useLocation();
  const [ready, setReady] = useState(false);

  // wait for hydration
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const handleRedirect = async () => {
      try {
        const slug = location.pathname.replace("/", "").trim();

        const blockedRoutes = [
          "",
          "video-downloader",
          "url-shortner",
          "login",
          "dashboard",
          "success"
        ];

        if (blockedRoutes.includes(slug)) return;

        const res = await getRedirectUrl(slug);
        const originalUrl = res.data?.originalUrl;

        if (res.status === 200 && originalUrl) {
          window.location.replace(originalUrl);
        } else {
          window.location.replace("/");
        }

      } catch (err) {
        console.error("Redirect error:", err);
        window.location.replace("/");
      }
    };

    handleRedirect();
  }, [location.pathname, ready]);

  return (
    <div className="flex items-center justify-center h-screen text-sm text-slate-500 font-mono">
      Resolving link...
    </div>
  );
};

export default RedirectHandler;