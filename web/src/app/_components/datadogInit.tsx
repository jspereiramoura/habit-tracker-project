"use client";

import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs, Site } from "@datadog/browser-logs";
import { useEffect } from "react";

function initDatadog() {
    if (typeof window === "undefined") return;

    datadogLogs.init({
        clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? "",
        site: process.env.NEXT_PUBLIC_DATADOG_SITE as Site,
        forwardErrorsToLogs: true,
        sessionSampleRate: 100,
        service: 'habit-tracker-frontend',
        env: 'production',
        forwardReports: "all",
        forwardConsoleLogs: "all"
    });

    datadogRum.init({
        applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID ?? "",
        clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? "",
        site: process.env.NEXT_PUBLIC_DATADOG_SITE as Site,
        service: 'habit-tracker-frontend',
        env: 'production',
        sessionSampleRate: 100,
        sessionReplaySampleRate: 50,
        trackBfcacheViews: true,
        defaultPrivacyLevel: 'mask-user-input',
        trackUserInteractions: true,
        trackResources: true,
        trackLongTasks: true,
        trackViewsManually: false,
        allowedTracingUrls: [
            { match: "https://api.habits.jspereiramoura.dev.br/", propagatorTypes: ["tracecontext"] },
        ],
    });

    datadogRum.startSessionReplayRecording();
}

export default function DatadogInit() {
    useEffect(() => {
        initDatadog();
        console.log("Datadog RUM initialized");

    }, [])
    return null;
}

