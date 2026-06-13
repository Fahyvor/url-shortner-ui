import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto px-6 py-12 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-stone-200 pb-4">
        <span className="font-mono text-[10px] tracking-widest text-stone-500">
          OPERATOR DASHBOARD
        </span>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="text-[10px] font-mono text-elrey-accent uppercase tracking-widest"
        >
          Logout
        </button>
      </div>

      {/* SERVICES */}
      <div className="grid md:grid-cols-2 gap-6">

        <div
          onClick={() => navigate("/url-shortener")}
          className="cursor-pointer border border-stone-200 p-6 rounded-md bg-[#F5F2EB]/40 hover:border-elrey-accent transition"
        >
          <h2 className="text-xs font-mono font-bold text-elrey-accent tracking-widest">
            URL SHORTENER
          </h2>
          <p className="text-xs text-stone-500 mt-2">
            Create and manage shortened links
          </p>
        </div>

        <div
          onClick={() => navigate("/video-downloader")}
          className="cursor-pointer border border-stone-200 p-6 rounded-md bg-[#F5F2EB]/40 hover:border-elrey-accent transition"
        >
          <h2 className="text-xs font-mono font-bold text-elrey-accent tracking-widest">
            VIDEO DOWNLOADER
          </h2>
          <p className="text-xs text-stone-500 mt-2">
            Extract and download video streams
          </p>
        </div>

      </div>
    </div>
  );
}