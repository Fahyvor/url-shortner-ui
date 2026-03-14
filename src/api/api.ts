import axios from 'axios';

export interface ShortenResponse {
  message: string;
  shortUrl: string;
  originalUrl: string;
}

export interface ApiError {
  error: string;
}

// Video Downloader Interfaces

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

// Axios Instance

// const BASE_URL = 'https://url-rhh7.onrender.com';
const BASE_URL = 'http://localhost:9000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Video Helper

/**
 * Builds the direct download URL for a given video URL + format.
 * Use this with window.location.href to trigger a browser file download.
 *
 * @param videoUrl  - The original video URL (e.g. YouTube link)
 * @param format    - 'best' | 'bestaudio' | 'bestvideo' | a specific formatId
 */
export const buildDownloadUrl = (
  videoUrl: string,
  format: string = 'best'
): string => {
  const params = new URLSearchParams({ url: videoUrl, format });
  return `${BASE_URL}/video/download?${params.toString()}`;
};

export default api;