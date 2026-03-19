import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { toast, SleekToast } from 'sleek-toast';
import api, { buildDownloadUrl, VideoInfoResponse } from '../api/api';

type DownloadMode = 'best' | 'bestaudio' | 'bestvideo';

const MODES: { id: DownloadMode; label: string; sub: string }[] = [
  { id: 'best',      label: 'Best',  sub: 'Video + Audio' },
  { id: 'bestaudio', label: 'Audio', sub: 'MP3 only'      },
  { id: 'bestvideo', label: 'Video', sub: 'No audio'      },
];

const VideoDownloader: React.FC = () => {
  const [url, setUrl]           = useState('');
  const [info, setInfo]         = useState<VideoInfoResponse | null>(null);
  const [mode, setMode]         = useState<DownloadMode>('best');
  const [formatId, setFormatId] = useState('');
  const [loading, setLoading]   = useState(false);
  const [retrieving, setRetrieving] = useState(false);

  const formatDuration = (s: number) =>
    `${Math.floor(s / 60)}m ${s % 60}s`;

  const handleInspect = async () => {
    if (!url) return;
    setLoading(true);
    setInfo(null);
    setFormatId('');

    try {
      const { data } = await api.get<VideoInfoResponse>('/video/info', {
        params: { url },
      });
      setInfo(data);
      toast.success('Asset inspected successfully');
    } catch (err) {
      const msg =
        (err as AxiosError<{ error: string }>).response?.data?.error ||
        'Could not fetch video info.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    try {
      setRetrieving(true);
      window.location.href = buildDownloadUrl(url, formatId || mode);
    } catch (error) {
      toast.error('Failed to initiate download.');
    } finally {
      setRetrieving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto pt-44 pb-24 px-6 animate-in fade-in duration-1000">
      <SleekToast />

      <div className="mb-12 border-l-2 border-slate-900 pl-6">
        <h2 className="text-3xl font-light text-slate-900 tracking-tight sm:text-4xl">
          Media Extraction <br />
        </h2>
        <p className="mt-3 text-slate-500 text-sm font-medium tracking-wide">
          Video & Audio Retrieval by Elrey Technologies.
        </p>
      </div>

      {!info && (
        <div className="bg-white border border-slate-100 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10">
            <div className="space-y-10">
            <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 group-focus-within:text-elrey-accent transition-colors">
                Source URL
                </label>
                <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-transparent border-b border-elrey-border py-2
                            focus:border-elrey-primary outline-none text-elrey-primary font-mono text-sm
                            transition-all duration-400 ease-sleek placeholder:text-slate-300"
                />
            </div>

            <button
                onClick={handleInspect}
                disabled={loading || !url}
                className="w-full py-4 bg-elrey-accent text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-sm
                        hover:bg-elrey-primary hover:shadow-2xl hover:-translate-y-1
                        transition-all duration-400 ease-sleek active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {loading ? 'Inspecting...' : 'Inspect Video'}
            </button>
            </div>
        </div>
        )}

      {info && (
        <div className="mt-4 bg-white border border-slate-100 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden animate-in slide-in-from-bottom-4 duration-500">

          <div className="relative h-40 bg-slate-900 overflow-hidden">
            {info.thumbnail && (
              <img
                src={info.thumbnail}
                alt={info.title}
                className="w-full h-full object-cover opacity-70"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-6 right-4">
              <p className="text-white text-sm font-semibold leading-snug line-clamp-2">
                {info.title}
              </p>
              <p className="text-white/60 text-[10px] mt-1 uppercase tracking-widest">
                {[info.platform, info.uploader, info.duration && formatDuration(info.duration)]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
          </div>

          <div className="p-10 space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                Download Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MODES.map(({ id, label, sub }) => (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    className={`border rounded-sm py-3 px-2 text-center transition-all duration-200 ${
                      mode === id
                        ? 'border-elrey-accent bg-elrey-accent/5'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <p className={`text-[10px] font-black uppercase tracking-widest ${
                      mode === id ? 'text-elrey-accent' : 'text-slate-400'
                    }`}>
                      {label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {info.formats?.length > 0 && (
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Specific Format <span className="normal-case font-normal">(optional)</span>
                </label>
                <select
                  value={formatId}
                  onChange={(e) => setFormatId(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-200 py-2 outline-none
                             text-slate-700 text-sm focus:border-slate-900 transition-colors"
                >
                  <option value="">— use selected mode —</option>
                  {info.formats.map((f) => (
                    <option key={f.formatId} value={f.formatId}>
                      {[f.resolution, f.ext, f.note].filter(Boolean).join(' · ')}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleDownload}
              className="w-full py-4 bg-elrey-accent text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-sm
                         hover:bg-elrey-primary hover:shadow-2xl hover:-translate-y-1
                         transition-all duration-400 ease-sleek active:scale-[0.98]"
            >
              {retrieving ? "Downloading..." : "Download Video"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDownloader;