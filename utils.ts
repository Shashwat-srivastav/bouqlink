import { BouquetData } from './types';
import LZString from 'lz-string';

export const encodeBouquet = (data: BouquetData): string => {
  try {
    const jsonString = JSON.stringify(data);
    return LZString.compressToEncodedURIComponent(jsonString);
  } catch (e) {
    console.error("Failed to encode data", e);
    return "";
  }
};

export const decodeBouquet = (hash: string): BouquetData | null => {
  let dataToDecode = hash;

  // If hash is empty or doesn't look like our data, check query params
  if (!dataToDecode || (!dataToDecode.startsWith('ey') && dataToDecode.length < 10)) {
    const params = new URLSearchParams(window.location.search);
    const queryData = params.get('data');
    if (queryData) dataToDecode = queryData;
  }

  if (!dataToDecode) return null;

  let decompressed: string | null = null;
  try {
    decompressed = LZString.decompressFromEncodedURIComponent(dataToDecode);
  } catch (e) {
    // Ignore initial decompression errors
  }

  if (decompressed && decompressed.startsWith('{')) {
    try {
      return JSON.parse(decompressed);
    } catch (e) {
      console.error("Decompressed string not valid JSON", e);
    }
  }

  // Fallback to base64 decoding (Old Format)
  try {
    const jsonString = decodeURIComponent(atob(dataToDecode));
    if (jsonString.startsWith('{')) {
      return JSON.parse(jsonString);
    }
  } catch (e) {
    console.error("Final decode attempt failed", e);
  }

  return null;
};

export const generateRandomPosition = () => {
  // Return percentages (0-100) to be responsive across all screen sizes
  // Keep within 10% - 90% to avoid edge clipping by default
  const x = Math.random() * 60 + 20; // 20% to 80%
  const y = Math.random() * 60 + 20; // 20% to 80% (Updated range to fill top half too)
  const rotation = (Math.random() - 0.5) * 40; // +/- 20 deg variation
  const scale = 1.0 + Math.random() * 0.5; // 1.0 to 1.5 (Increased scale to fill empty space)
  return { x, y, rotation, scale };
};

export const shortenUrl = async (longUrl: string): Promise<string> => {
  try {
    // Some shorteners struggle with hashes (#). Query params (?) are more standard.
    // Ensure we are sending a clean URL.
    const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
    const data = await response.json();

    if (data.shorturl) {
      return data.shorturl;
    }

    if (data.errormessage) {
      console.warn("Shortener error:", data.errormessage);
    }

    return longUrl;
  } catch (e) {
    console.error("Failed to shorten URL", e);
    return longUrl;
  }
};

export const generateSmartPosition = (index: number) => {
  // "Hand-Tied Bouquet" Algorithm
  // Simulates placing flowers in a fanning cluster.

  // 1. Central cluster for the first few, then fan out.
  // Use a modified phyllotaxis (spiral) but constrained to an upward fan.

  // Angle: Oscillate left/right or use spiral? 
  // Spiral is robust. Golden angle.
  const angle = index * 2.39996;

  // Spread increases with index
  const spread = 5 * Math.sqrt(index);
  const r = Math.min(spread, 30); // Max spread radius 30%

  // Calculate polar offset
  // Flatten Y to make it look like a bunch seen from front (oval)
  const dx = r * Math.cos(angle);
  const dy = r * Math.sin(angle) * 0.8;

  // Base Position (Center of bouquet)
  const centerX = 50;
  const centerY = 55; // Updated to be more centered vertically (was 65)

  const x = centerX + dx;
  const y = centerY + dy;

  // Rotation: Fan out based on X position!
  // Flowers on left lean left, on right lean right.
  const fanRotation = (x - 50) * 1.5;
  const randomWobble = (Math.random() - 0.5) * 10;
  const rotation = fanRotation + randomWobble;

  // Scale: Slight variation, maybe smaller at edges for depth?
  // Let's keep it simple random.
  const scale = 1.0 + Math.random() * 0.3; // Increased scale range

  return { x, y, rotation, scale };
};