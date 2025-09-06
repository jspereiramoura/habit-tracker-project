import { useEffect } from "react";
import { datadogLogs } from "@datadog/browser-logs"; // Example: Using Datadog

function useTrackUserInteraction(eventName: string, callback: (event: Event) => void) {
  useEffect(() => {
    const handler = (event: Event) => {
      callback(event);

      datadogLogs.logger.info(`User interaction: ${eventName}`, {
        eventType: event.type,
        target: (event.target as HTMLElement)?.tagName,
        timestamp: new Date().toISOString()         
      });
    };

    document.addEventListener(eventName, handler);

    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [eventName, callback]);
}

export default useTrackUserInteraction;
