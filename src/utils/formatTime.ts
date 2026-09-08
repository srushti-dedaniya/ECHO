export function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatLifespan(lifespan: string): string {
  const map: Record<string, string> = {
    '30m': '30 Minutes',
    '3h': '3 Hours',
    '24h': '24 Hours',
    'dawn': 'Until Dawn',
  };
  return map[lifespan] || lifespan;
}

export function formatScope(scope: string): string {
  const map: Record<string, string> = {
    'universe': 'Anyone in the Universe',
    'local': 'Local Resonance',
    'students': 'Shared Realm',
    'anon': 'Completely Anonymous',
  };
  return map[scope] || scope;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}