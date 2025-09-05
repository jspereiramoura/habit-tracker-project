"use client";

import { datadogRum } from "@datadog/browser-rum";


datadogRum.init({

    applicationId: 'c03b29c4-44b2-4f56-8909-26a458b6a054',
    clientToken: 'pub97a682fe73677226085bbace0478e105',
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
    allowedTracingUrls: [
        { match: "https://api.habits.jspereiramoura.dev.br/", propagatorTypes: ["tracecontext"] },
    ],
});

export default function DatadogInit() {
    return null;
}

