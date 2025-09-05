"use client";

import { datadogRum } from "@datadog/browser-rum";
import { useEffect } from "react";


function initDatadog() {
    datadogRum.init({
        
        applicationId: '',
        clientToken: '',
        // `site` refers to the Datadog site parameter of your organization
        // see https://docs.datadoghq.com/getting_started/site/
        site: 'us5.datadoghq.com',
        service: 'habit-tracker-frontend',
        env: 'production',
        // Specify a version number to identify the deployed version of your application in Datadog
        // version: '1.0.0',
        sessionSampleRate: 100,
        sessionReplaySampleRate: 20,
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

