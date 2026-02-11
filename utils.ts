import { BouquetData } from './types';

export const encodeBouquet = (data: BouquetData): string => {
  try {
    const jsonString = JSON.stringify(data);
    // Simple Base64 encoding. For production, consider compression (lz-string).
    return btoa(encodeURIComponent(jsonString));
  } catch (e) {
    console.error("Failed to encode data", e);
    return "";
  }
};

export const decodeBouquet = (hash: string): BouquetData | null => {
  try {
    const jsonString = decodeURIComponent(atob(hash));
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to decode data", e);
    return null;
  }
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