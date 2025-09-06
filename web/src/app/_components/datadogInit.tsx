"use client";

import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";
import { useEffect } from "react";



function initDatadog() {
    if (typeof window === "undefined") return;

    datadogLogs.init({
        clientToken: 'pub97a682fe73677226085bbace0478e105',
        site: 'us5.datadoghq.com',
        forwardErrorsToLogs: true,
        sessionSampleRate: 100,
        service: 'habit-tracker-frontend',
        env: 'production',
        forwardReports: "all",
        forwardConsoleLogs: "all"
    });

    datadogRum.init({
        applicationId: 'c03b29c4-44b2-4f56-8909-26a458b6a054',
        clientToken: 'pub97a682fe73677226085bbace0478e105',
        site: 'us5.datadoghq.com',
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

