import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRedirectUrl } from "../api/api";

const RedirectHandler: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const slug = location.pathname.substring(1);

        const blockedRoutes = ["", "video-downloader"];
        if (blockedRoutes.includes(slug)) return;

        const res = await getRedirectUrl(slug);

        if (res.status == 200) {
          console.log("Redirecting to:", res.data);
          window.location.replace(res.data.originalUrl);
        } else {
          window.location.href = "/";
        }
      } catch (err) {
        console.error(err);
        window.location.href = "/";
      }
    };

    handleRedirect();
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center h-screen text-sm text-slate-500">
      Redirecting...
    </div>
  );
};

export default RedirectHandler;