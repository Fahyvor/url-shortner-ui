import axios from "axios";

export interface ShortenResponse {
  message: string;
  shortUrl: string;
  originalUrl: string;
}

export interface ApiError {
  error: string;
}

export interface RedirectResponse {
  originalUrl: string;
}
export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    picture?: string;
  };
}

export interface VideoFormat {
  formatId: string;
  ext: string;
  resolution: string;
  filesize: number | null;
  note: string;
}

export interface VideoInfoResponse {
  title: string;
  thumbnail: string;
  duration: number;
  uploader: string;
  platform: string;
  formats: VideoFormat[];
}

// ==============================
// AXIOS INSTANCE
// ==============================

const BASE_URL = "https://oxidlabs.onrender.com";
// const BASE_URL = 'http://localhost:9000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  const auth = sessionStorage.getItem("auth");

  if (!auth) return { token: null, expiry: null };

  try {
    return JSON.parse(auth);
  } catch {
    return { token: null, expiry: null };
  }
};

// const { token } = getToken();

// console.log(token);

api.interceptors.request.use((config) => {
  const { token } = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const getGoogleLoginUrl = (returnTo?: string) => {
  const params = new URLSearchParams();

  if (returnTo) {
    params.append("returnTo", returnTo);
  }

  return `${BASE_URL}/auth/google?${params.toString()}`;
};

// ==============================
// URL SHORTENER
// ==============================

export const getRedirectUrl = async (slug: string) => {
  return api.get<RedirectResponse>(`/url/${slug}`);
};

export const shortenUrl = async (originalUrl: string, customSlug?: string) => {
  const res = await api.post<ShortenResponse>("/url/shorten", {
    originalUrl,
    customSlug,
  });

  return res.data;
};

// ==============================
// VIDEO DOWNLOADER
// ==============================

/**
 * Builds direct download URL (stream trigger)
 */
export const buildDownloadUrl = (
  videoUrl: string,
  format: string = "best"
): string => {
  const params = new URLSearchParams({ url: videoUrl, format });
  return `${BASE_URL}/video/download?${params.toString()}`;
};

/**
 * Fetch video metadata (title, formats, etc.)
 */
export const getVideoInfo = async (videoUrl: string) => {
  const res = await api.post<VideoInfoResponse>("/video/info", {
    url: videoUrl,
  });

  return res.data;
};

/**
 * Trigger download via API (if backend handles streaming response)
 */
export const downloadVideo = async (videoUrl: string, format: string) => {
  const res = await api.get("/video/download", {
    params: { url: videoUrl, format },
    responseType: "blob",
  });

  return res.data;
};

export default api;