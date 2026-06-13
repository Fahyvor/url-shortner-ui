import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRedirectUrl } from "../api/api";

const RedirectHandler: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const slug = location.pathname.replace("/", "").trim();

        const blockedRoutes = [
          "",
          "video-downloader",
          "url-shortner",
          "login",
          "dashboard",
          "success",
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
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center h-screen text-sm text-slate-500 font-mono">
      Resolving link...
    </div>
  );
};

export default RedirectHandler;