import React from 'react';

export interface FlowerData {
  id: string;
  flowerId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export interface BouquetData {
  themeId: string;
  flowers: FlowerData[];
  letter: string;
  sender: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  category: string;
  description?: string;
  colors: {
    bg: string;
    bgGradient?: string;
    text: string;
    accent: string;
    secondary: string;
    border: string;
    card: string;
  };
  typography: {
    heading: string;
    body: string;
    letter: string;
    weight: string;
    letterSpacing?: string;
    textTransform?: string;
  };
  flower: {
    filter: string;
    shadow: string;
    border?: string;
    animation?: string;
  };
  canvas: {
    bg: string;
    border: string;
    borderRadius: string;
    shadow: string;
    pattern?: string;
  };
  button: {
    bg: string;
    text: string;
    border: string;
    borderRadius: string;
    hover: string;
  };
  letterBox: {
    bg: string;
    border: string;
    borderRadius: string;
    fontStyle: string;
  };
}

export interface FlowerType {
  id: string;
  name: string;
  component: React.FC<{ className?: string }>;
}