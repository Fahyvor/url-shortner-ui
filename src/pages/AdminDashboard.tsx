import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    urls: 0,
    clicks: 0,
    downloads: 0,
  });

  const [recentUrls, setRecentUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/admin/metrics", {
          withCredentials: true,
        });

        setStats(res.data.stats);
        setRecentUrls(res.data.recentUrls);
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-6 py-10 text-center text-sm text-stone-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-10 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-lg font-bold tracking-widest text-elrey-accent">
          ADMIN DASHBOARD
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Platform analytics & insights
        </p>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card title="TOTAL USERS" value={stats.users} />
        <Card title="TOTAL URLS" value={stats.urls} />
        <Card title="TOTAL CLICKS" value={stats.clicks} />
        <Card title="VIDEO DOWNLOADS" value={stats.downloads} />
      </div>

      {/* RECENT URLS */}
      <div className="border border-stone-200 rounded-md p-6">
        <h2 className="text-xs font-bold tracking-widest text-elrey-accent">
          RECENT LINKS
        </h2>

        <div className="mt-4 space-y-3">
          {recentUrls.length === 0 ? (
            <p className="text-xs text-stone-400">No recent links</p>
          ) : (
            recentUrls.map((url: any) => (
              <div
                key={url.id}
                className="flex justify-between text-xs border-b pb-2"
              >
                <span className="truncate max-w-[70%]">
                  {url.originalUrl}
                </span>
                <span className="text-stone-500">
                  {url.clicks || 0} clicks
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="border border-stone-200 p-5 rounded-md bg-[#F5F2EB]/40">
      <h3 className="text-[10px] font-mono tracking-widest text-elrey-accent">
        {title}
      </h3>
      <p className="text-xl font-bold mt-2">{value}</p>
    </div>
  );
}