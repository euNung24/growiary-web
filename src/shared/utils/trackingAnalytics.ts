import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';

const trackEvent = (eventName: string) => {
  tracking(eventName);
  sendGAEvent({ event: eventName });
};

export const onTrackingHandler = (eventName: string) => () => trackEvent(eventName);
export const trackingAnalytics = trackEvent;
