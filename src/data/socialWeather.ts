export interface SocialWeatherData {
  mood: MoodType;
  percentage: number;
  drift: number;
  frequency: number;
}

export type MoodType = 'calm' | 'nostalgic' | 'heavy' | 'curious' | 'excited' | 'restless';

export const socialWeather: SocialWeatherData[] = [
  { mood: 'heavy', percentage: 32, drift: 2.1, frequency: 432.08 },
  { mood: 'nostalgic', percentage: 27, drift: -1.3, frequency: 432.08 },
  { mood: 'excited', percentage: 23, drift: 4.2, frequency: 432.08 },
  { mood: 'curious', percentage: 18, drift: -0.8, frequency: 432.08 },
];

export const globalTelemetry = {
  totalActiveSouls: 12410,
  totalEchoes: 4892,
  resonanceDrift: 4.2,
  baseFrequency: 432.08,
  sectors: [
    { id: 'sector-09', name: 'Mumbai Rain', mood: 'nostalgic' as MoodType, souls: 47 },
    { id: 'sector-12', name: 'Berlin Night', mood: 'calm' as MoodType, souls: 23 },
    { id: 'sector-04', name: 'Tokyo Dawn', mood: 'calm' as MoodType, souls: 19 },
    { id: 'sector-18', name: 'Bangalore First Day', mood: 'excited' as MoodType, souls: 36 },
    { id: 'sector-07', name: 'NYC 3AM Thoughts', mood: 'heavy' as MoodType, souls: 82 },
  ],
};