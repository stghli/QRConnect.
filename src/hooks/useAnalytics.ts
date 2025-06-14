
import { useState, useEffect } from 'react';

export interface AnalyticsData {
  downloads: Record<string, number>;
  views: Record<string, number>;
}

const getInitialAnalyticsData = (): AnalyticsData => {
  try {
    const item = window.localStorage.getItem('analyticsData');
    return item ? JSON.parse(item) : { downloads: {}, views: {} };
  } catch (error) {
    console.error(error);
    return { downloads: {}, views: {} };
  }
};

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>(getInitialAnalyticsData);

  useEffect(() => {
    try {
      window.localStorage.setItem('analyticsData', JSON.stringify(analytics));
    } catch (error) {
      console.error(error);
    }
  }, [analytics]);

  const trackDownload = (filename: string) => {
    setAnalytics(prev => ({
      ...prev,
      downloads: {
        ...prev.downloads,
        [filename]: (prev.downloads[filename] || 0) + 1,
      },
    }));
  };

  const trackView = (filename: string) => {
    setAnalytics(prev => ({
      ...prev,
      views: {
        ...prev.views,
        [filename]: (prev.views[filename] || 0) + 1,
      },
    }));
  };

  return { analytics, trackDownload, trackView };
};
