
> pixelated@0.0.1 typecheck /home/vivi/pixelated
> astro check && tsc --noEmit

19:49:29 [@astrojs/node] Enabling sessions with filesystem storage
19:49:30 [content] Syncing content
19:49:31 [content] Synced content
19:49:31 [types] Generated 1.46s
19:49:31 [check] Getting diagnostics for Astro files in /home/vivi/pixelated...
[96msrc/components/MindMirrorDemo.tsx[0m:[93m14[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType '{ showAnalysisPanel: boolean; showSettingsPanel: boolean; initialTab: string; }' is not assignable to type 'IntrinsicAttributes & object'.
  Property 'showAnalysisPanel' does not exist on type 'IntrinsicAttributes & object'.

[7m14[0m         showAnalysisPanel={true}
[7m  [0m [91m        ~~~~~~~~~~~~~~~~~[0m

[96msrc/components/admin/BackupSecurityManager.astro[0m:[93m373[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType '{ backups: Backup[]; recoveryTests: RecoveryTest[]; onStartRecoveryTest: (backupId: string, environmentType: TestEnvironmentType) => Promise<RecoveryTest>; onScheduleRecoveryTests: () => Promise<...>; "client:load": true; }' is not assignable to type 'IntrinsicAttributes & BackupRecoveryTabProps'.
  Property 'recoveryTests' does not exist on type 'IntrinsicAttributes & BackupRecoveryTabProps'.

[7m373[0m         recoveryTests={mockRecoveryTests}
[7m   [0m [91m        ~~~~~~~~~~~~~[0m

[96msrc/components/admin/__tests__/AdminDashboard.test.ts[0m:[93m60[0m:[93m55[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ activeUsers: number; activeSessions: number; sessionsToday: number; totalTherapists: number; totalClients: number; messagesSent: number; avgResponseTime: number; systemLoad: number; storageUsed: string; activeSecurityLevel: string; }' is not assignable to parameter of type 'SystemMetrics'.
  Types of property 'activeSecurityLevel' are incompatible.

[7m60[0m     vi.mocked(getSystemMetrics).mockResolvedValueOnce(mockMetrics)
[7m  [0m [91m                                                      ~~~~~~~~~~~[0m
[96msrc/components/admin/__tests__/AdminDashboard.test.ts[0m:[93m1[0m:[93m28[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../AdminDashboard.astro' or its corresponding type declarations.

[7m1[0m import AdminDashboard from '../AdminDashboard.astro'
[7m [0m [91m                           ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/admin/bias-detection/BiasDashboard.test.tsx[0m:[93m589[0m:[93m7[0m - [91merror[0m[90m ts(2554): [0mExpected 0 arguments, but got 1.

[7m589[0m       http.post('/api/bias-detection/test-notification', () => {
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m590[0m         return HttpResponse.json({ success: true })
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m591[0m       }),
[7m   [0m [91m~~~~~~~~[0m
[96msrc/components/admin/bias-detection/BiasDashboard.test.tsx[0m:[93m505[0m:[93m7[0m - [91merror[0m[90m ts(2554): [0mExpected 0 arguments, but got 1.

[7m505[0m       http.get('/api/bias-detection/dashboard', () => {
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m506[0m         return HttpResponse.json(emptyMockData)
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m507[0m       }),
[7m   [0m [91m~~~~~~~~[0m

[96msrc/components/admin/bias-detection/BiasDashboard.tsx[0m:[93m2914[0m:[93m79[0m - [91merror[0m[90m ts(2339): [0mProperty 'payload' does not exist on type '{ name?: string | undefined; value?: number | undefined; }'.

[7m2914[0m                                   {payload[0]?.payload?.percent ? (payload[0].payload.percent * 100).toFixed(1) : 0}
[7m    [0m [91m                                                                              ~~~~~~~[0m
[96msrc/components/admin/bias-detection/BiasDashboard.tsx[0m:[93m2914[0m:[93m48[0m - [91merror[0m[90m ts(2339): [0mProperty 'payload' does not exist on type '{ name?: string | undefined; value?: number | undefined; }'.

[7m2914[0m                                   {payload[0]?.payload?.percent ? (payload[0].payload.percent * 100).toFixed(1) : 0}
[7m    [0m [91m                                               ~~~~~~~[0m
[96msrc/components/admin/bias-detection/BiasDashboard.tsx[0m:[93m2850[0m:[93m79[0m - [91merror[0m[90m ts(2339): [0mProperty 'payload' does not exist on type '{ name?: string | undefined; value?: number | undefined; }'.

[7m2850[0m                                   {payload[0]?.payload?.percent ? (payload[0].payload.percent * 100).toFixed(1) : 0}
[7m    [0m [91m                                                                              ~~~~~~~[0m
[96msrc/components/admin/bias-detection/BiasDashboard.tsx[0m:[93m2850[0m:[93m48[0m - [91merror[0m[90m ts(2339): [0mProperty 'payload' does not exist on type '{ name?: string | undefined; value?: number | undefined; }'.

[7m2850[0m                                   {payload[0]?.payload?.percent ? (payload[0].payload.percent * 100).toFixed(1) : 0}
[7m    [0m [91m                                               ~~~~~~~[0m
[96msrc/components/admin/bias-detection/BiasDashboard.tsx[0m:[93m22[0m:[93m52[0m - [91merror[0m[90m ts(6133): [0m'lazy' is declared but its value is never read.

[7m22[0m import { useState, useEffect, useCallback, useRef, lazy } from 'react';
[7m  [0m [91m                                                   ~~~~[0m

[96msrc/components/admin/consent/ConsentDashboard.astro[0m:[93m288[0m:[93m32[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(type: ConsentType) => any' is not assignable to parameter of type '(value: WithId<Document>, index: number, array: WithId<Document>[]) => any'.
  Types of parameters 'type' and 'value' are incompatible.

[7m288[0m               consentTypes.map((type: ConsentType) => (
[7m   [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m289[0m                 <div class="flex items-center justify-between border-b pb-2">
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m304[0m                 </div>
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~[0m
[7m305[0m               ))
[7m   [0m [91m~~~~~~~~~~~~~~~[0m
[96msrc/components/admin/consent/ConsentDashboard.astro[0m:[93m121[0m:[93m31[0m - [91merror[0m[90m ts(18047): [0m'db' is possibly 'null'.

[7m121[0m const consentVersions = await db.collection('consent_versions').aggregate([
[7m   [0m [91m                              ~~[0m
[96msrc/components/admin/consent/ConsentDashboard.astro[0m:[93m119[0m:[93m28[0m - [91merror[0m[90m ts(18047): [0m'db' is possibly 'null'.

[7m119[0m const consentTypes = await db.collection('consent_types').find().toArray();
[7m   [0m [91m                           ~~[0m
[96msrc/components/admin/consent/ConsentDashboard.astro[0m:[93m97[0m:[93m33[0m - [91merror[0m[90m ts(18047): [0m'db' is possibly 'null'.

[7m97[0m const withdrawnConsents = await db.collection('user_consents').aggregate([
[7m  [0m [91m                                ~~[0m
[96msrc/components/admin/consent/ConsentDashboard.astro[0m:[93m75[0m:[93m30[0m - [91merror[0m[90m ts(18047): [0m'db' is possibly 'null'.

[7m75[0m const activeConsents = await db.collection('user_consents').aggregate([
[7m  [0m [91m                             ~~[0m
[96msrc/components/admin/consent/ConsentDashboard.astro[0m:[93m73[0m:[93m20[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m73[0m const db = mongodb.db;
[7m  [0m [91m                   ~~[0m
[96msrc/components/admin/consent/ConsentDashboard.astro[0m:[93m61[0m:[93m11[0m - [91merror[0m[90m ts(6196): [0m'ConsentVersionResponse' is declared but never used.

[7m61[0m interface ConsentVersionResponse {
[7m  [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/admin/consent/ConsentDashboard.astro[0m:[93m48[0m:[93m11[0m - [91merror[0m[90m ts(6196): [0m'WithdrawnConsentResponse' is declared but never used.

[7m48[0m interface WithdrawnConsentResponse {
[7m  [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/admin/consent/ConsentDashboard.astro[0m:[93m37[0m:[93m11[0m - [91merror[0m[90m ts(6196): [0m'ActiveConsentResponse' is declared but never used.

[7m37[0m interface ActiveConsentResponse {
[7m  [0m [91m          ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/ai/chat/useResponseGeneration.ts[0m:[93m110[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'_contextWindow' is declared but its value is never read.

[7m110[0m   _contextWindow = 4096,
[7m   [0m [91m  ~~~~~~~~~~~~~~[0m
[96msrc/components/ai/chat/useResponseGeneration.ts[0m:[93m110[0m:[93m3[0m - [91merror[0m[90m ts(2339): [0mProperty '_contextWindow' does not exist on type 'UseResponseGenerationOptions'.

[7m110[0m   _contextWindow = 4096,
[7m   [0m [91m  ~~~~~~~~~~~~~~[0m

[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m349[0m:[93m21[0m - [91merror[0m[90m ts(2322): [0mType '{ class: string; }' is not assignable to type 'IntrinsicAttributes & IconProps'.
  Property 'class' does not exist on type 'IntrinsicAttributes & IconProps'. Did you mean 'className'?

[7m349[0m         <IconFilter class="mr-1 h-4 w-4" />
[7m   [0m [91m                    ~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m345[0m:[93m16[0m - [91merror[0m[90m ts(2322): [0mType '{ class: string; }' is not assignable to type 'IntrinsicAttributes & IconProps'.
  Property 'class' does not exist on type 'IntrinsicAttributes & IconProps'. Did you mean 'className'?

[7m345[0m         <IconX class="mr-1 h-4 w-4" />
[7m   [0m [91m               ~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m307[0m:[93m15[0m - [91merror[0m[90m ts(2322): [0mType '{ id: string; "data-min": string; "data-max": string; "data-value": string; "data-step": string; }' is not assignable to type 'IntrinsicAttributes & SliderProps'.
  Property 'id' does not exist on type 'IntrinsicAttributes & SliderProps'.

[7m307[0m               id="smoothing-slider"
[7m   [0m [91m              ~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m286[0m:[93m28[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; id: string; class: string; }' is not assignable to type 'IntrinsicAttributes & SelectTriggerProps'.
  Property 'id' does not exist on type 'IntrinsicAttributes & SelectTriggerProps'.

[7m286[0m             <SelectTrigger id="group-by-select" class="w-full">
[7m   [0m [91m                           ~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m270[0m:[93m21[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; htmlFor: string; class: string; }' is not assignable to type 'IntrinsicAttributes & LabelProps & RefAttributes<HTMLLabelElement>'.
  Property 'class' does not exist on type 'IntrinsicAttributes & LabelProps & RefAttributes<HTMLLabelElement>'. Did you mean 'className'?

[7m270[0m                     class="cursor-pointer"
[7m   [0m [91m                    ~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m249[0m:[93m15[0m - [91merror[0m[90m ts(2322): [0mType '{ id: string; "data-min": string; "data-max": string; "data-value": string; }' is not assignable to type 'IntrinsicAttributes & SliderProps'.
  Property 'id' does not exist on type 'IntrinsicAttributes & SliderProps'.

[7m249[0m               id="confidence-slider"
[7m   [0m [91m              ~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m232[0m:[93m15[0m - [91merror[0m[90m ts(2322): [0mType '{ id: string; "data-min": string; "data-max": string; "data-value": string; }' is not assignable to type 'IntrinsicAttributes & SliderProps'.
  Property 'id' does not exist on type 'IntrinsicAttributes & SliderProps'.

[7m232[0m               id="strength-slider"
[7m   [0m [91m              ~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m214[0m:[93m54[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; htmlFor: string; class: string; }' is not assignable to type 'IntrinsicAttributes & LabelProps & RefAttributes<HTMLLabelElement>'.
  Property 'class' does not exist on type 'IntrinsicAttributes & LabelProps & RefAttributes<HTMLLabelElement>'. Did you mean 'className'?

[7m214[0m                   <Label htmlFor={`pattern-${type}`} class="cursor-pointer">
[7m   [0m [91m                                                     ~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m189[0m:[93m19[0m - [91merror[0m[90m ts(2322): [0mType '{ id: string; "data-min": string; "data-max": string; "data-start": string; "data-end": string; }' is not assignable to type 'IntrinsicAttributes & SliderProps'.
  Property 'id' does not exist on type 'IntrinsicAttributes & SliderProps'.

[7m189[0m                   id="dominance-range-slider"
[7m   [0m [91m                  ~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m168[0m:[93m19[0m - [91merror[0m[90m ts(2322): [0mType '{ id: string; "data-min": string; "data-max": string; "data-start": string; "data-end": string; }' is not assignable to type 'IntrinsicAttributes & SliderProps'.
  Property 'id' does not exist on type 'IntrinsicAttributes & SliderProps'.

[7m168[0m                   id="arousal-range-slider"
[7m   [0m [91m                  ~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m150[0m:[93m19[0m - [91merror[0m[90m ts(2322): [0mType '{ id: string; "data-min": string; "data-max": string; "data-start": string; "data-end": string; }' is not assignable to type 'IntrinsicAttributes & SliderProps'.
  Property 'id' does not exist on type 'IntrinsicAttributes & SliderProps'.

[7m150[0m                   id="valence-range-slider"
[7m   [0m [91m                  ~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m128[0m:[93m15[0m - [91merror[0m[90m ts(2322): [0mType '{ id: string; "data-min": string; "data-max": string; "data-start": string; "data-end": string; }' is not assignable to type 'IntrinsicAttributes & SliderProps'.
  Property 'id' does not exist on type 'IntrinsicAttributes & SliderProps'.

[7m128[0m               id="intensity-range-slider"
[7m   [0m [91m              ~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m111[0m:[93m52[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; htmlFor: string; class: string; }' is not assignable to type 'IntrinsicAttributes & LabelProps & RefAttributes<HTMLLabelElement>'.
  Property 'class' does not exist on type 'IntrinsicAttributes & LabelProps & RefAttributes<HTMLLabelElement>'. Did you mean 'className'?

[7m111[0m                 <Label htmlFor={`emotion-${type}`} class="cursor-pointer">
[7m   [0m [91m                                                   ~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m104[0m:[93m41[0m - [91merror[0m[90m ts(7006): [0mParameter 'type' implicitly has an 'any' type.

[7m104[0m             {availableEmotionTypes.map((type) => (
[7m   [0m [91m                                        ~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m73[0m:[93m28[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; class: string; }' is not assignable to type 'IntrinsicAttributes & SelectTriggerProps'.
  Property 'class' does not exist on type 'IntrinsicAttributes & SelectTriggerProps'. Did you mean ''className''?

[7m73[0m             <SelectTrigger class="w-full">
[7m  [0m [91m                           ~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m72[0m:[93m19[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any[]; id: string; }' is not assignable to type 'IntrinsicAttributes & SelectProps'.
  Property 'id' does not exist on type 'IntrinsicAttributes & SelectProps'.

[7m72[0m           <Select id="time-range-select">
[7m  [0m [91m                  ~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m26[0m:[93m11[0m - [91merror[0m[90m ts(2339): [0mProperty 'props' does not exist on type '{ url: URL; site: URL; }'.

[7m26[0m } = Astro.props
[7m  [0m [91m          ~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m15[0m:[93m26[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/components/ui/Checkbox' or its corresponding type declarations.

[7m15[0m import { Checkbox } from '@/components/ui/Checkbox'
[7m  [0m [91m                         ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m741[0m:[93m36[0m - [91merror[0m[90m ts(7006): [0mParameter 'filterOptions' implicitly has an 'any' type.

[7m741[0m     function dispatchOptionsChange(filterOptions) {
[7m   [0m [91m                                   ~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m732[0m:[93m12[0m - [91merror[0m[90m ts(7006): [0mParameter 'item' implicitly has an 'any' type.

[7m732[0m           (item) => item !== value,
[7m   [0m [91m           ~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m731[0m:[93m9[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ timeRange: {}; emotions: { dimensionalRanges: {}; }; patterns: {}; visualization: {}; }'.

[7m731[0m         options[category][key] = values.filter(
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m722[0m:[93m22[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ timeRange: {}; emotions: { dimensionalRanges: {}; }; patterns: {}; visualization: {}; }'.

[7m722[0m       const values = options[category][key]
[7m   [0m [91m                     ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m719[0m:[93m9[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ timeRange: {}; emotions: { dimensionalRanges: {}; }; patterns: {}; visualization: {}; }'.

[7m719[0m         options[category][key] = []
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m718[0m:[93m12[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ timeRange: {}; emotions: { dimensionalRanges: {}; }; patterns: {}; visualization: {}; }'.

[7m718[0m       if (!options[category][key]) {
[7m   [0m [91m           ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m712[0m:[93m7[0m - [91merror[0m[90m ts(7006): [0mParameter 'key' implicitly has an 'any' type.

[7m712[0m       key,
[7m   [0m [91m      ~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m711[0m:[93m7[0m - [91merror[0m[90m ts(7006): [0mParameter 'category' implicitly has an 'any' type.

[7m711[0m       category,
[7m   [0m [91m      ~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m710[0m:[93m7[0m - [91merror[0m[90m ts(7006): [0mParameter 'checkbox' implicitly has an 'any' type.

[7m710[0m       checkbox,
[7m   [0m [91m      ~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m703[0m:[93m51[0m - [91merror[0m[90m ts(7006): [0mParameter 'e' implicitly has an 'any' type.

[7m703[0m       switchEl.addEventListener('checkedChange', (e) => {
[7m   [0m [91m                                                  ~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m695[0m:[93m7[0m - [91merror[0m[90m ts(7006): [0mParameter 'onChange' implicitly has an 'any' type.

[7m695[0m       onChange,
[7m   [0m [91m      ~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m694[0m:[93m7[0m - [91merror[0m[90m ts(7006): [0mParameter 'switchEl' implicitly has an 'any' type.

[7m694[0m       switchEl,
[7m   [0m [91m      ~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m687[0m:[93m53[0m - [91merror[0m[90m ts(7006): [0mParameter 'e' implicitly has an 'any' type.

[7m687[0m       slider.addEventListener('sliderValueChange', (e) => {
[7m   [0m [91m                                                    ~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m668[0m:[93m7[0m - [91merror[0m[90m ts(7006): [0mParameter 'onChange' implicitly has an 'any' type.

[7m668[0m       onChange,
[7m   [0m [91m      ~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m667[0m:[93m7[0m - [91merror[0m[90m ts(7006): [0mParameter '_display' implicitly has an 'any' type.

[7m667[0m       _display,
[7m   [0m [91m      ~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m666[0m:[93m7[0m - [91merror[0m[90m ts(7006): [0mParameter 'slider' implicitly has an 'any' type.

[7m666[0m       slider,
[7m   [0m [91m      ~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m634[0m:[93m45[0m - [91merror[0m[90m ts(2339): [0mProperty 'detail' does not exist on type 'Event'.

[7m634[0m           options.visualization.groupBy = e.detail
[7m   [0m [91m                                            ~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m634[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'groupBy' does not exist on type '{}'.

[7m634[0m           options.visualization.groupBy = e.detail
[7m   [0m [91m                                ~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m626[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'showAnnotations' does not exist on type '{}'.

[7m626[0m       options.visualization.showAnnotations = checked
[7m   [0m [91m                            ~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m625[0m:[93m46[0m - [91merror[0m[90m ts(7006): [0mParameter 'checked' implicitly has an 'any' type.

[7m625[0m     initializeSwitch(showAnnotationsSwitch, (checked) => {
[7m   [0m [91m                                             ~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m622[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'showConfidenceIntervals' does not exist on type '{}'.

[7m622[0m       options.visualization.showConfidenceIntervals = checked
[7m   [0m [91m                            ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m621[0m:[93m54[0m - [91merror[0m[90m ts(7006): [0mParameter 'checked' implicitly has an 'any' type.

[7m621[0m     initializeSwitch(showConfidenceIntervalsSwitch, (checked) => {
[7m   [0m [91m                                                     ~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m618[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'showTrendlines' does not exist on type '{}'.

[7m618[0m       options.visualization.showTrendlines = checked
[7m   [0m [91m                            ~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m617[0m:[93m45[0m - [91merror[0m[90m ts(7006): [0mParameter 'checked' implicitly has an 'any' type.

[7m617[0m     initializeSwitch(showTrendlinesSwitch, (checked) => {
[7m   [0m [91m                                            ~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m614[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'showRawData' does not exist on type '{}'.

[7m614[0m       options.visualization.showRawData = checked
[7m   [0m [91m                            ~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m613[0m:[93m42[0m - [91merror[0m[90m ts(7006): [0mParameter 'checked' implicitly has an 'any' type.

[7m613[0m     initializeSwitch(showRawDataSwitch, (checked) => {
[7m   [0m [91m                                         ~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m583[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'smoothing' does not exist on type '{}'.

[7m583[0m           options.visualization.smoothing = value
[7m   [0m [91m                                ~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m580[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'values' implicitly has an 'any' type.

[7m580[0m       (values) => {
[7m   [0m [91m       ~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m570[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'minConfidence' does not exist on type '{}'.

[7m570[0m           options.patterns.minConfidence = value
[7m   [0m [91m                           ~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m567[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'values' implicitly has an 'any' type.

[7m567[0m       (values) => {
[7m   [0m [91m       ~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m557[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'minStrength' does not exist on type '{}'.

[7m557[0m           options.patterns.minStrength = value
[7m   [0m [91m                           ~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m554[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'values' implicitly has an 'any' type.

[7m554[0m       (values) => {
[7m   [0m [91m       ~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m545[0m:[93m46[0m - [91merror[0m[90m ts(2339): [0mProperty 'dominance' does not exist on type '{}'.

[7m545[0m           options.emotions.dimensionalRanges.dominance = [min, max]
[7m   [0m [91m                                             ~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m539[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'values' implicitly has an 'any' type.

[7m539[0m       (values) => {
[7m   [0m [91m       ~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m530[0m:[93m46[0m - [91merror[0m[90m ts(2339): [0mProperty 'arousal' does not exist on type '{}'.

[7m530[0m           options.emotions.dimensionalRanges.arousal = [min, max]
[7m   [0m [91m                                             ~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m524[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'values' implicitly has an 'any' type.

[7m524[0m       (values) => {
[7m   [0m [91m       ~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m515[0m:[93m46[0m - [91merror[0m[90m ts(2339): [0mProperty 'valence' does not exist on type '{}'.

[7m515[0m           options.emotions.dimensionalRanges.valence = [min, max]
[7m   [0m [91m                                             ~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m509[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'values' implicitly has an 'any' type.

[7m509[0m       (values) => {
[7m   [0m [91m       ~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m500[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'maxIntensity' does not exist on type '{ dimensionalRanges: {}; }'.

[7m500[0m           options.emotions.maxIntensity = max
[7m   [0m [91m                           ~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m499[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'minIntensity' does not exist on type '{ dimensionalRanges: {}; }'.

[7m499[0m           options.emotions.minIntensity = min
[7m   [0m [91m                           ~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m496[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'values' implicitly has an 'any' type.

[7m496[0m       (values) => {
[7m   [0m [91m       ~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m488[0m:[93m50[0m - [91merror[0m[90m ts(2339): [0mProperty 'valueAsDate' does not exist on type 'Element'.

[7m488[0m         options.timeRange.endDate = endDateInput.valueAsDate ?? undefined
[7m   [0m [91m                                                 ~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m488[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'endDate' does not exist on type '{}'.

[7m488[0m         options.timeRange.endDate = endDateInput.valueAsDate ?? undefined
[7m   [0m [91m                          ~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m482[0m:[93m54[0m - [91merror[0m[90m ts(2339): [0mProperty 'valueAsDate' does not exist on type 'Element'.

[7m482[0m         options.timeRange.startDate = startDateInput.valueAsDate ?? undefined
[7m   [0m [91m                                                     ~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m482[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'startDate' does not exist on type '{}'.

[7m482[0m         options.timeRange.startDate = startDateInput.valueAsDate ?? undefined
[7m   [0m [91m                          ~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m472[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'endDate' does not exist on type '{}'.

[7m472[0m               options.timeRange.endDate = today
[7m   [0m [91m                                ~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m471[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'startDate' does not exist on type '{}'.

[7m471[0m               options.timeRange.startDate = startDate
[7m   [0m [91m                                ~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m441[0m:[93m13[0m - [91merror[0m[90m ts(18047): [0m'customDateRange' is possibly 'null'.

[7m441[0m             customDateRange.classList.add('hidden')
[7m   [0m [91m            ~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m439[0m:[93m13[0m - [91merror[0m[90m ts(18047): [0m'customDateRange' is possibly 'null'.

[7m439[0m             customDateRange.classList.remove('hidden')
[7m   [0m [91m            ~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m436[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'presetRange' does not exist on type '{}'.

[7m436[0m           options.timeRange.presetRange = value
[7m   [0m [91m                            ~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.astro[0m:[93m435[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'detail' does not exist on type 'Event'.

[7m435[0m           const value = e.detail
[7m   [0m [91m                          ~~~~~~[0m

[96msrc/components/analytics/AdvancedFilteringComponent.tsx[0m:[93m25[0m:[93m26[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/components/ui/Checkbox' or its corresponding type declarations.

[7m25[0m import { Checkbox } from '@/components/ui/Checkbox'
[7m  [0m [91m                         ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AdvancedFilteringComponent.tsx[0m:[93m17[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/components/ui/popover' or its corresponding type declarations.

[7m17[0m } from '@/components/ui/popover'
[7m  [0m [91m       ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/analytics/AnalyticsDashboard.astro[0m:[93m47[0m:[93m104[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ small: string; medium: string; large: string; }'.

[7m47[0m     class={`grid ${gridClasses[columns as keyof typeof gridClasses] || 'grid-cols-1 lg:grid-cols-2'} ${gapClasses[widgetGap]}`}
[7m  [0m [91m                                                                                                       ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AnalyticsDashboard.astro[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'TableWidget' is declared but its value is never read.

[7m4[0m import { TableWidget } from './TableWidget'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AnalyticsDashboard.astro[0m:[93m3[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'ChartWidget' is declared but its value is never read.

[7m3[0m import { ChartWidget } from './ChartWidget'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/AnalyticsDashboard.astro[0m:[93m2[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'MetricWidget' is declared but its value is never read.

[7m2[0m import { MetricWidget } from './MetricWidget'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/analytics/ComparativeProgressDisplay.tsx[0m:[93m76[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m76[0m   return new Date().toISOString().split('T')[0]
[7m  [0m [91m  ~~~~~~[0m
[96msrc/components/analytics/ComparativeProgressDisplay.tsx[0m:[93m72[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m72[0m   return date.toISOString().split('T')[0]
[7m  [0m [91m  ~~~~~~[0m

[96msrc/components/analytics/ConversionDashboard.tsx[0m:[93m98[0m:[93m7[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m98[0m       conversionTypes[event.conversionId].push(event)
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/analytics/MetricWidget.tsx[0m:[93m47[0m:[93m19[0m - [91merror[0m[90m ts(7030): [0mNot all code paths return a value.

[7m47[0m   React.useEffect(() => {
[7m  [0m [91m                  ~~~~~~~[0m

[96msrc/components/analytics/PatternVisualization.tsx[0m:[93m5[0m:[93m48[0m - [91merror[0m[90m ts(2307): [0mCannot find module './PatternVisualizationReact' or its corresponding type declarations.

[7m5[0m export type { PatternVisualizationProps } from './PatternVisualizationReact'
[7m [0m [91m                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/analytics/PatternVisualization.tsx[0m:[93m4[0m:[93m38[0m - [91merror[0m[90m ts(2307): [0mCannot find module './PatternVisualizationReact' or its corresponding type declarations.

[7m4[0m export { PatternVisualization } from './PatternVisualizationReact'
[7m [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/analytics/PrivacyDashboard.tsx[0m:[93m125[0m:[93m54[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'number | undefined' is not assignable to parameter of type 'number | boolean'.
  Type 'undefined' is not assignable to type 'number | boolean'.

[7m125[0m                 handleSettingChange('privacyBudget', values[0])
[7m   [0m [91m                                                     ~~~~~~~~~[0m

[96msrc/components/analytics/__tests__/PatternVisualization.test.tsx[0m:[93m2[0m:[93m38[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../PatternVisualizationReact' or its corresponding type declarations.

[7m2[0m import { PatternVisualization } from '../PatternVisualizationReact'
[7m [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/analytics/__tests__/PatternVisualizationReact.test.tsx[0m:[93m3[0m:[93m38[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../PatternVisualizationReact' or its corresponding type declarations.

[7m3[0m import { PatternVisualization } from '../PatternVisualizationReact'
[7m [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/audit/UnusualPatterns.tsx[0m:[93m9[0m:[93m28[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/components/ui/scroll-area' or its corresponding type declarations.

[7m9[0m import { ScrollArea } from '@/components/ui/scroll-area'
[7m [0m [91m                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/backgrounds/Dot.astro[0m:[93m11[0m:[93m9[0m - [93mwarning[0m[90m astro(4000): [0mThis script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

[7m11[0m <script type="module">
[7m  [0m [93m        ~~~~[0m

[96msrc/components/backgrounds/GradientAnimation.astro[0m:[93m69[0m:[93m24[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ default: { colors: string[]; darkColors: string[]; }; purple: { colors: string[]; darkColors: string[]; }; blue: { colors: string[]; darkColors: string[]; }; green: { colors: string[]; darkColors: string[]; }; sunset: { ...; }; }'.

[7m69[0m const selectedScheme = colorSchemes[colorScheme]
[7m  [0m [91m                       ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/backgrounds/Particle.astro[0m:[93m11[0m:[93m9[0m - [93mwarning[0m[90m astro(4000): [0mThis script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

[7m11[0m <script type="module">
[7m  [0m [93m        ~~~~[0m

[96msrc/components/backgrounds/Plum.astro[0m:[93m83[0m:[93m40[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m83[0m           pendingSteps.push(() => step(nx, ny, rad2, counter))
[7m  [0m [91m                                       ~~[0m
[96msrc/components/backgrounds/Plum.astro[0m:[93m80[0m:[93m40[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m80[0m           pendingSteps.push(() => step(nx, ny, rad1, counter))
[7m  [0m [91m                                       ~~[0m
[96msrc/components/backgrounds/Plum.astro[0m:[93m71[0m:[93m59[0m - [91merror[0m[90m ts(18048): [0m'ny' is possibly 'undefined'.

[7m71[0m         if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100)
[7m  [0m [91m                                                          ~~[0m
[96msrc/components/backgrounds/Plum.astro[0m:[93m71[0m:[93m46[0m - [91merror[0m[90m ts(18048): [0m'ny' is possibly 'undefined'.

[7m71[0m         if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100)
[7m  [0m [91m                                             ~~[0m
[96msrc/components/backgrounds/Plum.astro[0m:[93m71[0m:[93m26[0m - [91merror[0m[90m ts(18048): [0m'nx' is possibly 'undefined'.

[7m71[0m         if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100)
[7m  [0m [91m                         ~~[0m
[96msrc/components/backgrounds/Plum.astro[0m:[93m71[0m:[93m13[0m - [91merror[0m[90m ts(18048): [0m'nx' is possibly 'undefined'.

[7m71[0m         if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100)
[7m  [0m [91m            ~~[0m
[96msrc/components/backgrounds/Plum.astro[0m:[93m66[0m:[93m20[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(x: number, y: number): void', gave the following error.
  Overload 2 of 2, '(x: number, y: number): void', gave the following error.

[7m66[0m         ctx.lineTo(nx, ny)
[7m  [0m [91m                   ~~[0m

[96msrc/components/base/ErrorBoundary.astro[0m:[93m6[0m:[93m7[0m - [91merror[0m[90m ts(6133): [0m'fallback' is declared but its value is never read.

[7m6[0m const { fallback = 'Something went wrong. Please try refreshing the page.' } =
[7m [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/base/NavItem.astro[0m:[93m3[0m:[93m1[0m - [91merror[0m[90m ts(6192): [0mAll imports in import declaration are unused.

[7m3[0m import { ensureTrailingSlash, getUrl } from '@/utils/common'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/base/__tests__/ErrorBoundary.test.ts[0m:[93m67[0m:[93m49[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m67[0m     const { querySelector } = await renderAstro(ErrorBoundary)
[7m  [0m [91m                                                ~~~~~~~~~~~~~[0m
[96msrc/components/base/__tests__/ErrorBoundary.test.ts[0m:[93m44[0m:[93m49[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m44[0m     const { querySelector } = await renderAstro(ErrorBoundary)
[7m  [0m [91m                                                ~~~~~~~~~~~~~[0m
[96msrc/components/base/__tests__/ErrorBoundary.test.ts[0m:[93m21[0m:[93m49[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m21[0m     const { querySelector } = await renderAstro(ErrorBoundary, {
[7m  [0m [91m                                                ~~~~~~~~~~~~~[0m
[96msrc/components/base/__tests__/ErrorBoundary.test.ts[0m:[93m10[0m:[93m49[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m10[0m     const { querySelector } = await renderAstro(ErrorBoundary, {
[7m  [0m [91m                                                ~~~~~~~~~~~~~[0m

[96msrc/components/blog/TableOfContents.astro[0m:[93m39[0m:[93m34[0m - [91merror[0m[90m ts(2551): [0mProperty 'textConten' does not exist on type 'Element'. Did you mean 'textContent'?

[7m39[0m       link.textContent = heading.textConten
[7m  [0m [91m                                 ~~~~~~~~~~[0m
[96msrc/components/blog/TableOfContents.astro[0m:[93m26[0m:[93m19[0m - [91merror[0m[90m ts(2551): [0mProperty 'textConten' does not exist on type 'Element'. Did you mean 'textContent'?

[7m26[0m           heading.textConten
[7m  [0m [91m                  ~~~~~~~~~~[0m

[96msrc/components/chat/AnalyticsDashboardReact.tsx[0m:[93m148[0m:[93m61[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m148[0m       return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
[7m   [0m [93m                                                            ~~~~~~[0m

[96msrc/components/chat/BrutalistChatDemo.tsx[0m:[93m227[0m:[93m15[0m - [93mwarning[0m[90m ts(6385): [0m'onKeyPress' is deprecated.

[7m227[0m               onKeyPress={handleKeyPress}
[7m   [0m [93m              ~~~~~~~~~~[0m

[96msrc/components/chat/CognitiveModelSelector.tsx[0m:[93m61[0m:[93m27[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m61[0m             onSelectModel(modelList[0].id)
[7m  [0m [91m                          ~~~~~~~~~~~~[0m

[96msrc/components/chat/LazyAnalyticsDashboard.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { Suspense, lazy } from 'react';
[7m [0m [91m       ~~~~~[0m

[96msrc/components/chat/MemoryAwareChatSystem.tsx[0m:[93m390[0m:[93m37[0m - [91merror[0m[90m ts(7006): [0mParameter 'msg' implicitly has an 'any' type.

[7m390[0m             messages={messages.map((msg) => ({
[7m   [0m [91m                                    ~~~[0m
[96msrc/components/chat/MemoryAwareChatSystem.tsx[0m:[93m331[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'm' implicitly has an 'any' type.

[7m331[0m         {messages.filter((m) => m.memoryStored).length > 0 && (
[7m   [0m [91m                          ~[0m
[96msrc/components/chat/MemoryAwareChatSystem.tsx[0m:[93m92[0m:[93m33[0m - [91merror[0m[90m ts(7006): [0mParameter 'msg' implicitly has an 'any' type.

[7m92[0m         messages: messages.map((msg) => ({
[7m  [0m [91m                                ~~~[0m
[96msrc/components/chat/MemoryAwareChatSystem.tsx[0m:[93m47[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'_placeholder' is declared but its value is never read.

[7m47[0m   _placeholder = 'Type your message here...',
[7m  [0m [91m  ~~~~~~~~~~~~[0m
[96msrc/components/chat/MemoryAwareChatSystem.tsx[0m:[93m47[0m:[93m3[0m - [91merror[0m[90m ts(2339): [0mProperty '_placeholder' does not exist on type 'MemoryAwareChatSystemProps'.

[7m47[0m   _placeholder = 'Type your message here...',
[7m  [0m [91m  ~~~~~~~~~~~~[0m
[96msrc/components/chat/MemoryAwareChatSystem.tsx[0m:[93m2[0m:[93m35[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/hooks/useChatWithMemory' or its corresponding type declarations.

[7m2[0m import { useChatWithMemory } from '@/hooks/useChatWithMemory'
[7m [0m [91m                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/chat/TherapyStyleSelector.tsx[0m:[93m96[0m:[93m47[0m - [91merror[0m[90m ts(7006): [0mParameter 'issue' implicitly has an 'any' type.

[7m96[0m             {currentStyle.recommendedFor.map((issue) => (
[7m  [0m [91m                                              ~~~~~[0m
[96msrc/components/chat/TherapyStyleSelector.tsx[0m:[93m87[0m:[93m47[0m - [91merror[0m[90m ts(7006): [0mParameter 'technique' implicitly has an 'any' type.

[7m87[0m             {currentStyle.techniquesUsed.map((technique) => (
[7m  [0m [91m                                              ~~~~~~~~~[0m
[96msrc/components/chat/TherapyStyleSelector.tsx[0m:[93m70[0m:[93m18[0m - [91merror[0m[90m ts(18046): [0m'style' is of type 'unknown'.

[7m70[0m                 {style.name}
[7m  [0m [91m                 ~~~~~[0m
[96msrc/components/chat/TherapyStyleSelector.tsx[0m:[93m32[0m:[93m28[0m - [91merror[0m[90m ts(7006): [0mParameter 'style' implicitly has an 'any' type.

[7m32[0m     recommendedStyles.map((style) => style.id),
[7m  [0m [91m                           ~~~~~[0m
[96msrc/components/chat/TherapyStyleSelector.tsx[0m:[93m6[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/types/TherapyStyles' or its corresponding type declarations.

[7m6[0m } from '../../lib/ai/types/TherapyStyles'
[7m [0m [91m       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/chat/TherapyStyleSelector.tsx[0m:[93m2[0m:[93m37[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/types/TherapyStyles' or its corresponding type declarations.

[7m2[0m import type { TherapyStyleId } from '../../lib/ai/types/TherapyStyles'
[7m [0m [91m                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/demo/ClinicalAnalysisDemo.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useState } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/components/demo/CrisisDetectionDemo.tsx[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m   import React, { useState, useEffect, useCallback } from 'react'
[7m [0m [91m         ~~~~~[0m

[96msrc/components/demo/DemographicBalancingDisplay.tsx[0m:[93m287[0m:[93m7[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m287[0m       acc[stat.category].push(stat)
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/demo/EnterpriseAdminDashboard.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useState, useEffect } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/components/demo/EnterpriseMonitoringDashboard.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useState, useEffect } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/components/demo/KnowledgeParsingDemo.tsx[0m:[93m94[0m:[93m34[0m - [91merror[0m[90m ts(2454): [0mVariable 'analyze' is used before being assigned.

[7m94[0m   }, [inputText, isRealTimeMode, analyze])
[7m  [0m [91m                                 ~~~~~~~[0m
[96msrc/components/demo/KnowledgeParsingDemo.tsx[0m:[93m94[0m:[93m34[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'analyze' used before its declaration.

[7m94[0m   }, [inputText, isRealTimeMode, analyze])
[7m  [0m [91m                                 ~~~~~~~[0m
[96msrc/components/demo/KnowledgeParsingDemo.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useState, useEffect, useRef, useCallback } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/components/demo/PresentingProblemVisualization.tsx[0m:[93m21[0m:[93m20[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m21[0m       const unit = match[2].toLowerCase()
[7m  [0m [91m                   ~~~~~~~~[0m
[96msrc/components/demo/PresentingProblemVisualization.tsx[0m:[93m20[0m:[93m28[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m20[0m       const num = parseInt(match[1])
[7m  [0m [91m                           ~~~~~~~~[0m

[96msrc/components/demo/PsychologyFrameworksDemo.tsx[0m:[93m51[0m:[93m7[0m - [91merror[0m[90m ts(2454): [0mVariable 'filterFrameworks' is used before being assigned.

[7m51[0m   }, [filterFrameworks])
[7m  [0m [91m      ~~~~~~~~~~~~~~~~[0m
[96msrc/components/demo/PsychologyFrameworksDemo.tsx[0m:[93m51[0m:[93m7[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'filterFrameworks' used before its declaration.

[7m51[0m   }, [filterFrameworks])
[7m  [0m [91m      ~~~~~~~~~~~~~~~~[0m
[96msrc/components/demo/PsychologyFrameworksDemo.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useState, useEffect, useCallback } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/components/demo/__tests__/setup.ts[0m:[93m55[0m:[93m1[0m - [91merror[0m[90m ts(2322): [0mType 'Mock<() => { getPropertyValue: Mock<() => string>; }>' is not assignable to type '((elt: Element, pseudoElt?: string | null | undefined) => CSSStyleDeclaration) & ((elt: Element, pseudoElt?: string | null | undefined) => CSSStyleDeclaration)'.
  Type 'Mock<() => { getPropertyValue: Mock<() => string>; }>' is not assignable to type '(elt: Element, pseudoElt?: string | null | undefined) => CSSStyleDeclaration'.

[7m55[0m window.getComputedStyle = vi.fn(() => ({
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/demo/__tests__/setup.ts[0m:[93m45[0m:[93m1[0m - [91merror[0m[90m ts(2322): [0mType 'Mock<() => { setStart: Mock<Procedure>; setEnd: Mock<Procedure>; commonAncestorContainer: HTMLDivElement; cloneContents: Mock<() => HTMLDivElement>; selectNodeContents: Mock<...>; collapse: Mock<...>; }>' is not assignable to type '() => Range'.
  Type '{ setStart: Mock<Procedure>; setEnd: Mock<Procedure>; commonAncestorContainer: HTMLDivElement; cloneContents: Mock<() => HTMLDivElement>; selectNodeContents: Mock<...>; collapse: Mock<...>; }' is missing the following properties from type 'Range': cloneRange, compareBoundaryPoints, comparePoint, createContextualFragment, and 23 more.

[7m45[0m document.createRange = vi.fn(() => ({
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/demo/__tests__/integration/APIServiceIntegration.test.tsx[0m:[93m404[0m:[93m26[0m - [91merror[0m[90m ts(18048): [0m'response' is possibly 'undefined'.

[7m404[0m       const data = await response.json()
[7m   [0m [91m                         ~~~~~~~~[0m
[96msrc/components/demo/__tests__/integration/APIServiceIntegration.test.tsx[0m:[93m388[0m:[93m26[0m - [91merror[0m[90m ts(7030): [0mNot all code paths return a value.

[7m388[0m       const retryFetch = async (url: string, options: any, maxRetries = 3) => {
[7m   [0m [91m                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/demo/__tests__/integration/PipelineIntegration.test.tsx[0m:[93m451[0m:[93m41[0m - [91merror[0m[90m ts(7006): [0mParameter 'metrics' implicitly has an 'any' type.

[7m451[0m           onBalanceUpdate={(categories, metrics) => {
[7m   [0m [91m                                        ~~~~~~~[0m
[96msrc/components/demo/__tests__/integration/PipelineIntegration.test.tsx[0m:[93m451[0m:[93m29[0m - [91merror[0m[90m ts(7006): [0mParameter 'categories' implicitly has an 'any' type.

[7m451[0m           onBalanceUpdate={(categories, metrics) => {
[7m   [0m [91m                            ~~~~~~~~~~[0m
[96msrc/components/demo/__tests__/integration/PipelineIntegration.test.tsx[0m:[93m403[0m:[93m41[0m - [91merror[0m[90m ts(7006): [0mParameter 'metrics' implicitly has an 'any' type.

[7m403[0m           onBalanceUpdate={(categories, metrics) => {
[7m   [0m [91m                                        ~~~~~~~[0m
[96msrc/components/demo/__tests__/integration/PipelineIntegration.test.tsx[0m:[93m403[0m:[93m29[0m - [91merror[0m[90m ts(7006): [0mParameter 'categories' implicitly has an 'any' type.

[7m403[0m           onBalanceUpdate={(categories, metrics) => {
[7m   [0m [91m                            ~~~~~~~~~~[0m
[96msrc/components/demo/__tests__/integration/PipelineIntegration.test.tsx[0m:[93m330[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'HTMLElement | undefined' is not assignable to parameter of type 'Document | Node | Element | Window'.
  Type 'undefined' is not assignable to type 'Document | Node | Element | Window'.

[7m330[0m       fireEvent.click(testButtons[0])
[7m   [0m [91m                      ~~~~~~~~~~~~~~[0m
[96msrc/components/demo/__tests__/integration/PipelineIntegration.test.tsx[0m:[93m7[0m:[93m31[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../ResultsExportDemo' or its corresponding type declarations.

[7m7[0m import ResultsExportDemo from '../../ResultsExportDemo'
[7m [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/demo/__tests__/integration/PipelineIntegration.test.tsx[0m:[93m6[0m:[93m35[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../CategoryBalancingDemo' or its corresponding type declarations.

[7m6[0m import CategoryBalancingDemo from '../../CategoryBalancingDemo'
[7m [0m [91m                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/demo/__tests__/integration/PipelineIntegration.test.tsx[0m:[93m5[0m:[93m28[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../ValidationDemo' or its corresponding type declarations.

[7m5[0m import ValidationDemo from '../../ValidationDemo'
[7m [0m [91m                           ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/demo/__tests__/integration/PipelineIntegration.test.tsx[0m:[93m4[0m:[93m31[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../DataIngestionDemo' or its corresponding type declarations.

[7m4[0m import DataIngestionDemo from '../../DataIngestionDemo'
[7m [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/demo/__tests__/integration/PipelineIntegration.test.tsx[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React from 'react'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/demos/bias-detection/BiasDetectionDemo.tsx[0m:[93m202[0m:[93m7[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'HistoricalComparison | null' is not assignable to parameter of type 'HistoricalComparison'.
  Type 'null' is not assignable to type 'HistoricalComparison'.

[7m202[0m       historicalComparison,
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/demos/bias-detection/ExportControls.tsx[0m:[93m197[0m:[93m56[0m - [91merror[0m[90m ts(2339): [0mProperty 'expectedBiasReduction' does not exist on type 'CounterfactualScenario'.

[7m197[0m         content += `   Expected Reduction: ${(scenario.expectedBiasReduction * 100).toFixed(1)}%\n`
[7m   [0m [91m                                                       ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/demos/bias-detection/ExportControls.tsx[0m:[93m115[0m:[93m51[0m - [91merror[0m[90m ts(2339): [0mProperty 'expectedBiasReduction' does not exist on type 'CounterfactualScenario'.

[7m115[0m           `Counterfactual ${index + 1},${scenario.expectedBiasReduction},Counterfactual`,
[7m   [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/demos/bias-detection/SessionInputForm.tsx[0m:[93m245[0m:[93m60[0m - [91merror[0m[90m ts(4111): [0mProperty 'content' comes from an index signature, so it must be accessed with ['content'].

[7m245[0m           <p className="mt-1 text-sm text-red-600">{errors.content}</p>
[7m   [0m [91m                                                           ~~~~~~~[0m
[96msrc/components/demos/bias-detection/SessionInputForm.tsx[0m:[93m244[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'content' comes from an index signature, so it must be accessed with ['content'].

[7m244[0m         {errors.content && (
[7m   [0m [91m                ~~~~~~~[0m
[96msrc/components/demos/bias-detection/SessionInputForm.tsx[0m:[93m241[0m:[93m20[0m - [91merror[0m[90m ts(4111): [0mProperty 'content' comes from an index signature, so it must be accessed with ['content'].

[7m241[0m             errors.content ? 'border-red-300' : 'border-gray-300'
[7m   [0m [91m                   ~~~~~~~[0m
[96msrc/components/demos/bias-detection/SessionInputForm.tsx[0m:[93m71[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m71[0m       scenario: formData.scenario || undefined,
[7m  [0m [91m      ~~~~~~~~[0m
[96msrc/components/demos/bias-detection/SessionInputForm.tsx[0m:[93m55[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'content' comes from an index signature, so it must be accessed with ['content'].

[7m55[0m       newErrors.content = 'Content must be at least 10 characters'
[7m  [0m [91m                ~~~~~~~[0m
[96msrc/components/demos/bias-detection/SessionInputForm.tsx[0m:[93m53[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'content' comes from an index signature, so it must be accessed with ['content'].

[7m53[0m       newErrors.content = 'Content is required'
[7m  [0m [91m                ~~~~~~~[0m

[96msrc/components/docs/Check.astro[0m:[93m26[0m:[93m29[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ success: string; info: string; default: string; }'.

[7m26[0m   <div class={`check-icon ${iconColors[variant]}`}>
[7m  [0m [91m                            ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/docs/Check.astro[0m:[93m25[0m:[93m27[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ success: string; info: string; default: string; }'.

[7m25[0m <div class={`check-item ${variantClasses[variant]} ${className || ''}`}>
[7m  [0m [91m                          ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/documentation/ExportToEHR.tsx[0m:[93m194[0m:[93m46[0m - [91merror[0m[90m ts(2339): [0mProperty 'documentUrl' does not exist on type 'EHRExportResult'.

[7m194[0m                           href={exportResult.documentUrl}
[7m   [0m [91m                                             ~~~~~~~~~~~[0m
[96msrc/components/documentation/ExportToEHR.tsx[0m:[93m191[0m:[93m35[0m - [91merror[0m[90m ts(2339): [0mProperty 'documentUrl' does not exist on type 'EHRExportResult'.

[7m191[0m                     {exportResult.documentUrl && (
[7m   [0m [91m                                  ~~~~~~~~~~~[0m
[96msrc/components/documentation/ExportToEHR.tsx[0m:[93m188[0m:[93m52[0m - [91merror[0m[90m ts(2339): [0mProperty 'documentId' does not exist on type 'EHRExportResult'.

[7m188[0m                         Document ID: {exportResult.documentId}
[7m   [0m [91m                                                   ~~~~~~~~~~[0m
[96msrc/components/documentation/ExportToEHR.tsx[0m:[93m186[0m:[93m35[0m - [91merror[0m[90m ts(2339): [0mProperty 'documentId' does not exist on type 'EHRExportResult'.

[7m186[0m                     {exportResult.documentId && (
[7m   [0m [91m                                  ~~~~~~~~~~[0m
[96msrc/components/documentation/ExportToEHR.tsx[0m:[93m177[0m:[93m35[0m - [91merror[0m[90m ts(2551): [0mProperty 'error' does not exist on type 'EHRExportResult'. Did you mean 'errors'?

[7m177[0m                     {exportResult.error}
[7m   [0m [91m                                  ~~~~~[0m
[96msrc/components/documentation/ExportToEHR.tsx[0m:[93m175[0m:[93m31[0m - [91merror[0m[90m ts(2551): [0mProperty 'error' does not exist on type 'EHRExportResult'. Did you mean 'errors'?

[7m175[0m                 {exportResult.error && (
[7m   [0m [91m                              ~~~~~[0m

[96msrc/components/feedback/SupervisorFeedback.tsx[0m:[93m214[0m:[93m35[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useCallback'.

[7m214[0m   const generateFeedbackSummary = useCallback(() => {
[7m   [0m [91m                                  ~~~~~~~~~~~[0m
[96msrc/components/feedback/SupervisorFeedback.tsx[0m:[93m142[0m:[93m39[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useCallback'.

[7m142[0m   const identifyMissedOpportunities = useCallback(() => {
[7m   [0m [91m                                      ~~~~~~~~~~~[0m
[96msrc/components/feedback/SupervisorFeedback.tsx[0m:[93m92[0m:[93m29[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useCallback'.

[7m92[0m   const analyzeTechniques = useCallback(() => {
[7m  [0m [91m                            ~~~~~~~~~~~[0m
[96msrc/components/feedback/SupervisorFeedback.tsx[0m:[93m88[0m:[93m5[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'generateFeedbackSummary' used before its declaration.

[7m88[0m     generateFeedbackSummary,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/feedback/SupervisorFeedback.tsx[0m:[93m87[0m:[93m5[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'identifyMissedOpportunities' used before its declaration.

[7m87[0m     identifyMissedOpportunities,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/feedback/SupervisorFeedback.tsx[0m:[93m86[0m:[93m5[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'analyzeTechniques' used before its declaration.

[7m86[0m     analyzeTechniques,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~[0m

[96msrc/components/layout/HeaderReact.tsx[0m:[93m2[0m:[93m29[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../ui/ThemeToggle' or its corresponding type declarations.

[7m2[0m import { ThemeToggle } from '../ui/ThemeToggle'
[7m [0m [91m                            ~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/layout/ResponsiveContainer.astro[0m:[93m52[0m:[93m50[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ xs: string; sm: string; md: string; lg: string; xl: string; '2xl': string; none: string; }'.

[7m52[0m   maxWidth !== 'none' && variant === 'default' ? maxWidthClasses[maxWidth] : '',
[7m  [0m [91m                                                 ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/layout/ResponsiveContainer.astro[0m:[93m51[0m:[93m3[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ none: string; sm: string; md: string; lg: string; xl: string; }'.

[7m51[0m   paddingClasses[padding],
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/layout/ResponsiveContainer.astro[0m:[93m50[0m:[93m3[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ default: string; fluid: string; narrow: string; wide: string; }'.

[7m50[0m   variantClasses[variant],
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/layout/ResponsiveGrid.astro[0m:[93m61[0m:[93m3[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ xs: string; sm: string; md: string; lg: string; xl: string; }'.

[7m61[0m   gapClasses[gap],
[7m  [0m [91m  ~~~~~~~~~~~~~~~[0m
[96msrc/components/layout/ResponsiveGrid.astro[0m:[93m215[0m:[93m9[0m - [93mwarning[0m[90m astro(4000): [0mThis script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

[7m215[0m <script define:vars={{ columns, minCardWidth, breakpoints: defaultBreakpoints }}
[7m   [0m [93m        ~~~~~~~~~~~[0m

[96msrc/components/layout/SidebarReact.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useState, useEffect } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/components/media/BackgroundImage.astro[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'ImageMetadata'.

[7m3[0m import type { ImageMetadata } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~~[0m
[96msrc/components/media/BackgroundImage.astro[0m:[93m269[0m:[93m53[0m - [91merror[0m[90m ts(4111): [0mProperty 'src' comes from an index signature, so it must be accessed with ['src'].

[7m269[0m                   const actualImage = image.dataset.src
[7m   [0m [91m                                                    ~~~[0m

[96msrc/components/media/CMSImage.astro[0m:[93m61[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'bp' implicitly has an 'any' type.

[7m61[0m       (bp) =>
[7m  [0m [91m       ~~[0m

[96msrc/components/media/OptimizedImage.astro[0m:[93m24[0m:[93m42[0m - [91merror[0m[90m ts(6133): [0m'src' is declared but its value is never read.

[7m24[0m async function generateBase64Placeholder(src: string | ImageMetadata) {
[7m  [0m [91m                                         ~~~[0m
[96msrc/components/media/OptimizedImage.astro[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'ImageMetadata'.

[7m3[0m import type { ImageMetadata } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~~[0m

[96msrc/components/media/ResponsiveImage.astro[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'ImageMetadata'.

[7m3[0m import type { ImageMetadata } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~~[0m

[96msrc/components/monitoring/AIPerformanceDashboard.astro[0m:[93m260[0m:[93m3[0m - [93mwarning[0m[90m astro(4000): [0mThis script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

[7m260[0m   define:vars={{
[7m   [0m [93m  ~~~~~~~~~~~[0m

[96msrc/components/monitoring/AuditDashboard.tsx[0m:[93m97[0m:[93m82[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'string'.

[7m97[0m               <li key={`unusual-access-${detail.id || detail.timestamp || detail.user || Date.now()}`} className="flex items-center text-red-600">
[7m  [0m [91m                                                                                 ~~~~[0m
[96msrc/components/monitoring/AuditDashboard.tsx[0m:[93m97[0m:[93m62[0m - [91merror[0m[90m ts(2339): [0mProperty 'timestamp' does not exist on type 'string'.

[7m97[0m               <li key={`unusual-access-${detail.id || detail.timestamp || detail.user || Date.now()}`} className="flex items-center text-red-600">
[7m  [0m [91m                                                             ~~~~~~~~~[0m
[96msrc/components/monitoring/AuditDashboard.tsx[0m:[93m97[0m:[93m49[0m - [91merror[0m[90m ts(2339): [0mProperty 'id' does not exist on type 'string'.

[7m97[0m               <li key={`unusual-access-${detail.id || detail.timestamp || detail.user || Date.now()}`} className="flex items-center text-red-600">
[7m  [0m [91m                                                ~~[0m
[96msrc/components/monitoring/AuditDashboard.tsx[0m:[93m3[0m:[93m26[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../ui/charts/PieChart' or its corresponding type declarations.

[7m3[0m import { PieChart } from '../ui/charts/PieChart'
[7m [0m [91m                         ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/monitoring/AuditDashboard.tsx[0m:[93m2[0m:[93m27[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../ui/charts/LineChart' or its corresponding type declarations.

[7m2[0m import { LineChart } from '../ui/charts/LineChart'
[7m [0m [91m                          ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/monitoring/RUMWidget.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useEffect } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/components/monitoring/RealUserMonitoring.astro[0m:[93m16[0m:[93m7[0m - [91merror[0m[90m ts(6133): [0m'config' is declared but its value is never read.

[7m16[0m const config = getMonitoringConfig()
[7m  [0m [91m      ~~~~~~[0m
[96msrc/components/monitoring/RealUserMonitoring.astro[0m:[93m13[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'refreshInterval' is declared but its value is never read.

[7m13[0m   refreshInterval = 60000,
[7m  [0m [91m  ~~~~~~~~~~~~~~~[0m

[96msrc/components/monitoring/WebPerformanceDashboard.astro[0m:[93m13[0m:[93m7[0m - [91merror[0m[90m ts(6133): [0m'config' is declared but its value is never read.

[7m13[0m const config = getMonitoringConfig()
[7m  [0m [91m      ~~~~~~[0m
[96msrc/components/monitoring/WebPerformanceDashboard.astro[0m:[93m3[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'getPerformanceIndicator' is declared but its value is never read.

[7m3[0m import { getPerformanceIndicator } from '@/lib/monitoring/hooks'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/monitoring/WebPerformanceDashboard.astro[0m:[93m273[0m:[93m9[0m - [93mwarning[0m[90m astro(4000): [0mThis script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

[7m273[0m <script define:vars={{ refreshInterval, performanceBudgets }}>
[7m   [0m [93m        ~~~~~~~~~~~[0m

[96msrc/components/monitoring/__tests__/RUMWidget.test.tsx[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React from 'react'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/monitoring/__tests__/RealUserMonitoring.astro.test.ts[0m:[93m129[0m:[93m61[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  The last overload gave the following error.

[7m129[0m     render(React.createElement(RealUserMonitoringComponent, customProps))
[7m   [0m [91m                                                            ~~~~~~~~~~~[0m
[96msrc/components/monitoring/__tests__/RealUserMonitoring.astro.test.ts[0m:[93m13[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'API_KEY' comes from an index signature, so it must be accessed with ['API_KEY'].

[7m13[0m       apiKey: process.env.API_KEY || 'example-api-key',
[7m  [0m [91m                          ~~~~~~~[0m

[96msrc/components/notification/__tests__/NotificationCenter.test.tsx[0m:[93m168[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useWebSocket'.

[7m168[0m     vi.mocked(useWebSocket).mockReturnValue({
[7m   [0m [91m              ~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationCenter.test.tsx[0m:[93m125[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useWebSocket'.

[7m125[0m     vi.mocked(useWebSocket).mockReturnValue({
[7m   [0m [91m              ~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationCenter.test.tsx[0m:[93m93[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useWebSocket'.

[7m93[0m     vi.mocked(useWebSocket).mockReturnValue({
[7m  [0m [91m              ~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationCenter.test.tsx[0m:[93m66[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useWebSocket'.

[7m66[0m     vi.mocked(useWebSocket).mockReturnValue({
[7m  [0m [91m              ~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationCenter.test.tsx[0m:[93m29[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useWebSocket'.

[7m29[0m     vi.mocked(useWebSocket).mockReturnValue({
[7m  [0m [91m              ~~~~~~~~~~~~[0m

[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m173[0m:[93m10[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m173[0m       ...useNotificationPreferences(),
[7m   [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m172[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m172[0m     vi.mocked(useNotificationPreferences).mockReturnValueOnce({
[7m   [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m152[0m:[93m10[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m152[0m       ...useNotificationPreferences(),
[7m   [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m151[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m151[0m     vi.mocked(useNotificationPreferences).mockReturnValueOnce({
[7m   [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m137[0m:[93m10[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m137[0m       ...useNotificationPreferences(),
[7m   [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m136[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m136[0m     vi.mocked(useNotificationPreferences).mockReturnValueOnce({
[7m   [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m117[0m:[93m10[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m117[0m       ...useNotificationPreferences(),
[7m   [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m116[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m116[0m     vi.mocked(useNotificationPreferences).mockReturnValueOnce({
[7m   [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m89[0m:[93m12[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m89[0m         ...useNotificationPreferences().preferences,
[7m  [0m [91m           ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m87[0m:[93m10[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m87[0m       ...useNotificationPreferences(),
[7m  [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m86[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m86[0m     vi.mocked(useNotificationPreferences).mockReturnValueOnce({
[7m  [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m54[0m:[93m10[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m54[0m       ...useNotificationPreferences(),
[7m  [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m53[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m53[0m     vi.mocked(useNotificationPreferences).mockReturnValueOnce({
[7m  [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m44[0m:[93m10[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m44[0m       ...useNotificationPreferences(),
[7m  [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/notification/__tests__/NotificationPreferences.test.tsx[0m:[93m43[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useNotificationPreferences'.

[7m43[0m     vi.mocked(useNotificationPreferences).mockReturnValueOnce({
[7m  [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/pages/EmotionProgressDemo.tsx[0m:[93m31[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType '{ progressData: EmotionProgressData; timeRange: "month" | "week" | "year" | "quarter"; onTimeRangeChange: Dispatch<SetStateAction<"month" | "week" | "year" | "quarter">>; isLoading: boolean; className: string; }' is not assignable to type 'IntrinsicAttributes & EmotionProgressDashboardProps'.
  Property 'progressData' does not exist on type 'IntrinsicAttributes & EmotionProgressDashboardProps'.

[7m31[0m           progressData={data}
[7m  [0m [91m          ~~~~~~~~~~~~[0m

[96msrc/components/pages/EmotionVisualizationDemo.tsx[0m:[93m160[0m:[93m17[0m - [91merror[0m[90m ts(2322): [0mType 'EmotionData[]' is not assignable to type 'EmotionDataPoint[]'.
  Property 'id' is missing in type 'EmotionData' but required in type 'EmotionDataPoint'.

[7m160[0m                 emotionData={data}
[7m   [0m [91m                ~~~~~~~~~~~[0m

[96msrc/components/pages/EmotionVisualizationPage.tsx[0m:[93m73[0m:[93m13[0m - [91merror[0m[90m ts(2322): [0mType 'EmotionData[]' is not assignable to type 'EmotionDataPoint[]'.
  Property 'id' is missing in type 'EmotionData' but required in type 'EmotionDataPoint'.

[7m73[0m             emotionData={emotionData}
[7m  [0m [91m            ~~~~~~~~~~~[0m

[96msrc/components/patient/PatientFileViewer.tsx[0m:[93m3[0m:[93m35[0m - [91merror[0m[90m ts(6133): [0m'_patientModel' is declared but its value is never read.

[7m3[0m export function PatientFileViewer({
[7m [0m [91m                                  ~[0m
[7m4[0m   _patientModel,
[7m [0m [91m~~~~~~~~~~~~~~~~[0m
[7m5[0m }: {
[7m [0m [91m~[0m

[96msrc/components/security/FHEDemo.astro[0m:[93m10[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'CardFooter' is declared but its value is never read.

[7m10[0m import CardFooter from '@/components/ui/CardFooter.astro';
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/security/FHEDemo.astro[0m:[93m270[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'encrypted' is declared but its value is never read.

[7m270[0m     encrypted: string,
[7m   [0m [91m    ~~~~~~~~~[0m

[96msrc/components/security/SecurityDashboard.astro[0m:[93m231[0m:[93m9[0m - [91merror[0m[90m ts(6133): [0m'mockStats' is declared but its value is never read.

[7m231[0m   const mockStats: SecurityStats = {
[7m   [0m [91m        ~~~~~~~~~[0m

[96msrc/components/security/__tests__/SecurityDashboard.test.ts[0m:[93m74[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Record<string, any>) => any' is not assignable to parameter of type 'AstroComponent'.

[7m74[0m     await renderAstro(SecurityDashboard)
[7m  [0m [91m                      ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/security/__tests__/SecurityDashboard.test.ts[0m:[93m65[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Record<string, any>) => any' is not assignable to parameter of type 'AstroComponent'.

[7m65[0m     await renderAstro(SecurityDashboard)
[7m  [0m [91m                      ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/security/__tests__/SecurityDashboard.test.ts[0m:[93m57[0m:[93m22[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'HTMLElement | undefined' is not assignable to parameter of type 'Document | Node | Element | Window'.
  Type 'undefined' is not assignable to type 'Document | Node | Element | Window'.

[7m57[0m     fireEvent.change(severitySelect, { target: { value: 'high' } })
[7m  [0m [91m                     ~~~~~~~~~~~~~~[0m
[96msrc/components/security/__tests__/SecurityDashboard.test.ts[0m:[93m51[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Record<string, any>) => any' is not assignable to parameter of type 'AstroComponent'.

[7m51[0m     await renderAstro(SecurityDashboard)
[7m  [0m [91m                      ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/security/__tests__/SecurityDashboard.test.ts[0m:[93m37[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Record<string, any>) => any' is not assignable to parameter of type 'AstroComponent'.

[7m37[0m     await renderAstro(SecurityDashboard)
[7m  [0m [91m                      ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/security/__tests__/SecurityDashboard.test.ts[0m:[93m17[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Record<string, any>) => any' is not assignable to parameter of type 'AstroComponent'.

[7m17[0m     const { container } = await renderAstro(SecurityDashboard)
[7m  [0m [91m                                            ~~~~~~~~~~~~~~~~~[0m

[96msrc/components/session/EmotionTemporalAnalysisChart.tsx[0m:[93m305[0m:[93m45[0m - [91merror[0m[90m ts(7006): [0mParameter 'point' implicitly has an 'any' type.

[7m305[0m           {prepareCriticalPointsData().map((point) => (
[7m   [0m [91m                                            ~~~~~[0m
[96msrc/components/session/EmotionTemporalAnalysisChart.tsx[0m:[93m161[0m:[93m47[0m - [91merror[0m[90m ts(7006): [0mParameter 'rel' implicitly has an 'any' type.

[7m161[0m     return data.dimensionalRelationships.map((rel) => ({
[7m   [0m [91m                                              ~~~[0m
[96msrc/components/session/EmotionTemporalAnalysisChart.tsx[0m:[93m148[0m:[93m47[0m - [91merror[0m[90m ts(7006): [0mParameter 'transition' implicitly has an 'any' type.

[7m148[0m     return data.transitions.slice(0, 10).map((transition) => ({
[7m   [0m [91m                                              ~~~~~~~~~~[0m
[96msrc/components/session/EmotionTemporalAnalysisChart.tsx[0m:[93m108[0m:[93m37[0m - [91merror[0m[90m ts(7006): [0mParameter 'point' implicitly has an 'any' type.

[7m108[0m     return data.criticalPoints.map((point) => ({
[7m   [0m [91m                                    ~~~~~[0m
[96msrc/components/session/EmotionTemporalAnalysisChart.tsx[0m:[93m17[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"../../lib/ai/temporal/EmotionTemporalAnalyzer"' has no exported member 'TemporalEmotionAnalysis'.

[7m17[0m import type { TemporalEmotionAnalysis } from '../../lib/ai/temporal/EmotionTemporalAnalyzer'
[7m  [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/session/EmotionTrackingChart.tsx[0m:[93m191[0m:[93m30[0m - [91merror[0m[90m ts(7006): [0mParameter 'label' implicitly has an 'any' type.

[7m191[0m             labelFormatter={(label) => new Date(label).toLocaleTimeString()}
[7m   [0m [91m                             ~~~~~[0m
[96msrc/components/session/EmotionTrackingChart.tsx[0m:[93m183[0m:[93m32[0m - [91merror[0m[90m ts(7006): [0mParameter 'name' implicitly has an 'any' type.

[7m183[0m             formatter={(value, name) => {
[7m   [0m [91m                               ~~~~[0m
[96msrc/components/session/EmotionTrackingChart.tsx[0m:[93m183[0m:[93m25[0m - [91merror[0m[90m ts(7006): [0mParameter 'value' implicitly has an 'any' type.

[7m183[0m             formatter={(value, name) => {
[7m   [0m [91m                        ~~~~~[0m
[96msrc/components/session/EmotionTrackingChart.tsx[0m:[93m173[0m:[93m29[0m - [91merror[0m[90m ts(7006): [0mParameter 'tick' implicitly has an 'any' type.

[7m173[0m             tickFormatter={(tick) =>
[7m   [0m [91m                            ~~~~[0m

[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m600[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialObjectPool'.

[7m600[0m       initialObjectPool.clear()
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m592[0m:[93m45[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'THREE'.

[7m592[0m                 ;(object.material as typeof THREE.Material).dispose()
[7m   [0m [91m                                            ~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m588[0m:[93m46[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'THREE'.

[7m588[0m                 ;(object.material as (typeof THREE.Material)[]).forEach(
[7m   [0m [91m                                             ~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m582[0m:[93m33[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'THREE'.

[7m582[0m           if (object instanceof THREE.Mesh) {
[7m   [0m [91m                                ~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m581[0m:[93m40[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'Object3D'.

[7m581[0m         initialScene.traverse((object: Object3D) => {
[7m   [0m [91m                                       ~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m581[0m:[93m9[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialScene'.

[7m581[0m         initialScene.traverse((object: Object3D) => {
[7m   [0m [91m        ~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m580[0m:[93m11[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialScene'.

[7m580[0m       if (initialScene) {
[7m   [0m [91m          ~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m577[0m:[93m9[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialControls'.

[7m577[0m         initialControls.dispose()
[7m   [0m [91m        ~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m576[0m:[93m11[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialControls'.

[7m576[0m       if (initialControls) {
[7m   [0m [91m          ~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m572[0m:[93m40[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialRenderer'.

[7m572[0m           initialContainer.removeChild(initialRenderer.domElement)
[7m   [0m [91m                                       ~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m572[0m:[93m11[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialContainer'.

[7m572[0m           initialContainer.removeChild(initialRenderer.domElement)
[7m   [0m [91m          ~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m571[0m:[93m55[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialContainer'.

[7m571[0m         if (initialRenderer.domElement.parentNode === initialContainer) {
[7m   [0m [91m                                                      ~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m571[0m:[93m13[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialRenderer'.

[7m571[0m         if (initialRenderer.domElement.parentNode === initialContainer) {
[7m   [0m [91m            ~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m570[0m:[93m9[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialRenderer'.

[7m570[0m         initialRenderer.dispose()
[7m   [0m [91m        ~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m569[0m:[93m30[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialContainer'.

[7m569[0m       if (initialRenderer && initialContainer) {
[7m   [0m [91m                             ~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m569[0m:[93m11[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'initialRenderer'.

[7m569[0m       if (initialRenderer && initialContainer) {
[7m   [0m [91m          ~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m562[0m:[93m44[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'handleResize'.

[7m562[0m       window.removeEventListener('resize', handleResize)
[7m   [0m [91m                                           ~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m551[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'setSize' does not exist on type '{}'.

[7m551[0m       rendererRef.current.setSize(width, height)
[7m   [0m [91m                          ~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m549[0m:[93m25[0m - [91merror[0m[90m ts(2339): [0mProperty 'updateProjectionMatrix' does not exist on type '{}'.

[7m549[0m       cameraRef.current.updateProjectionMatrix()
[7m   [0m [91m                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m548[0m:[93m25[0m - [91merror[0m[90m ts(2339): [0mProperty 'aspect' does not exist on type '{}'.

[7m548[0m       cameraRef.current.aspect = width / height
[7m   [0m [91m                        ~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m533[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'render' does not exist on type '{}'.

[7m533[0m         rendererRef.current.render(sceneRef.current, cameraRef.current)
[7m   [0m [91m                            ~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m527[0m:[93m44[0m - [91merror[0m[90m ts(2339): [0mProperty 'position' does not exist on type '{}'.

[7m527[0m             label.lookAt(cameraRef.current.position)
[7m   [0m [91m                                           ~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m525[0m:[93m43[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'Object3D'.

[7m525[0m         labelsRef.current.forEach((label: Object3D) => {
[7m   [0m [91m                                          ~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m515[0m:[93m40[0m - [91merror[0m[90m ts(2339): [0mProperty 'intersectsSphere' does not exist on type '{}'.

[7m515[0m               object.visible = frustum.intersectsSphere(sphere)
[7m   [0m [91m                                       ~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m514[0m:[93m35[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'Sphere'.

[7m514[0m             if (sphere instanceof Sphere) {
[7m   [0m [91m                                  ~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m510[0m:[93m65[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'Sphere'.

[7m510[0m             userData?: { isCullable?: boolean; boundingSphere?: Sphere }
[7m   [0m [91m                                                                ~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m508[0m:[93m33[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'Object3D'.

[7m508[0m         scene.traverse((object: Object3D) => {
[7m   [0m [91m                                ~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m504[0m:[93m31[0m - [91merror[0m[90m ts(2339): [0mProperty 'matrixWorldInverse' does not exist on type '{}'.

[7m504[0m             cameraRef.current.matrixWorldInverse,
[7m   [0m [91m                              ~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m503[0m:[93m31[0m - [91merror[0m[90m ts(2339): [0mProperty 'projectionMatrix' does not exist on type '{}'.

[7m503[0m             cameraRef.current.projectionMatrix,
[7m   [0m [91m                              ~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m501[0m:[93m17[0m - [91merror[0m[90m ts(2339): [0mProperty 'setFromProjectionMatrix' does not exist on type '{}'.

[7m501[0m         frustum.setFromProjectionMatrix(
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m325[0m:[93m71[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'Object3D'.

[7m325[0m       labelsRef.current = [xLabel, yLabel, zLabel].filter(Boolean) as Object3D[]
[7m   [0m [91m                                                                      ~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m291[0m:[93m32[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'Vector3Like'.

[7m291[0m           sprite.position.copy(position)
[7m   [0m [91m                               ~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m269[0m:[93m24[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'Object3D'.

[7m269[0m             return new Object3D() // Empty fallback
[7m   [0m [91m                       ~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m233[0m:[93m5[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type '"dampingFactor"' can't be used to index type 'OrbitControls'.
  Property 'dampingFactor' does not exist on type 'OrbitControls'.

[7m233[0m     controls['dampingFactor'] = 0.25
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m232[0m:[93m5[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type '"enableDamping"' can't be used to index type 'OrbitControls'.
  Property 'enableDamping' does not exist on type 'OrbitControls'.

[7m232[0m     controls['enableDamping'] = true
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m189[0m:[93m56[0m - [91merror[0m[90m ts(2339): [0mProperty 'domElement' does not exist on type '{}'.

[7m189[0m       initialContainer.removeChild(rendererRef.current.domElement)
[7m   [0m [91m                                                       ~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m181[0m:[93m13[0m - [91merror[0m[90m ts(6133): [0m'_initialObjectPool' is declared but its value is never read.

[7m181[0m       const _initialObjectPool = objectPoolRef.current
[7m   [0m [91m            ~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m180[0m:[93m13[0m - [91merror[0m[90m ts(6133): [0m'_initialScene' is declared but its value is never read.

[7m180[0m       const _initialScene = sceneRef.current
[7m   [0m [91m            ~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m179[0m:[93m13[0m - [91merror[0m[90m ts(6133): [0m'_initialControls' is declared but its value is never read.

[7m179[0m       const _initialControls = controlsRef.current
[7m   [0m [91m            ~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m178[0m:[93m13[0m - [91merror[0m[90m ts(6133): [0m'_initialRenderer' is declared but its value is never read.

[7m178[0m       const _initialRenderer = rendererRef.current
[7m   [0m [91m            ~~~~~~~~~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m156[0m:[93m59[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'Object3D'.

[7m156[0m   const getOrCreateObject = (type: string, creator: () => Object3D) => {
[7m   [0m [91m                                                          ~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m130[0m:[93m44[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'Object3D'.

[7m130[0m   const objectPoolRef = useRef<Map<string, Object3D[]>>(new Map())
[7m   [0m [91m                                           ~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m129[0m:[93m28[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'Object3D'.

[7m129[0m   const labelsRef = useRef<Object3D[]>([])
[7m   [0m [91m                           ~~~~~~~~[0m
[96msrc/components/session/MultidimensionalEmotionChart.tsx[0m:[93m127[0m:[93m30[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'OrbitControls'.

[7m127[0m   const controlsRef = useRef<OrbitControls | null>(null)
[7m   [0m [91m                             ~~~~~~~~~~~~~[0m

[96msrc/components/session/SessionAnalysis.tsx[0m:[93m92[0m:[93m49[0m - [91merror[0m[90m ts(2339): [0mProperty 'dominantEmotion' does not exist on type 'EmotionApiItem'.

[7m92[0m                 ? { ...baseData, label: `${item.dominantEmotion}` }
[7m  [0m [91m                                                ~~~~~~~~~~~~~~~[0m
[96msrc/components/session/SessionAnalysis.tsx[0m:[93m91[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'dominantEmotion' does not exist on type 'EmotionApiItem'.

[7m91[0m               return item.dominantEmotion
[7m  [0m [91m                          ~~~~~~~~~~~~~~~[0m

[96msrc/components/session/SessionDocumentation.tsx[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2724): [0m'"../../lib/documentation/useDocumentation"' has no exported member named 'SessionDocumentation'. Did you mean 'useDocumentation'?

[7m2[0m import type { SessionDocumentation } from '../../lib/documentation/useDocumentation'
[7m [0m [91m              ~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/session/SessionList.astro[0m:[93m41[0m:[93m24[0m - [91merror[0m[90m ts(7006): [0mParameter 'session' implicitly has an 'any' type.

[7m41[0m         {sessions.map((session) => (
[7m  [0m [91m                       ~~~~~~~[0m

[96msrc/components/tailus/AppHeader.astro[0m:[93m4[0m:[93m53[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@tailus/themer-button' or its corresponding type declarations.

[7m4[0m import { button, ghostButton, outlinedButton } from '@tailus/themer-button'
[7m [0m [91m                                                    ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/tailus/BentoGrid.astro[0m:[93m4[0m:[93m45[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@tailus/themer-card' or its corresponding type declarations.

[7m4[0m import { softGradientVariant as card } from '@tailus/themer-card'
[7m [0m [91m                                            ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/tailus/CallToAction.astro[0m:[93m5[0m:[93m40[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@tailus/themer-button' or its corresponding type declarations.

[7m5[0m import { button, outlinedButton } from '@tailus/themer-button'
[7m [0m [91m                                       ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/tailus/HeroSection.astro[0m:[93m4[0m:[93m40[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@tailus/themer-button' or its corresponding type declarations.

[7m4[0m import { button, outlinedButton } from '@tailus/themer-button'
[7m [0m [91m                                       ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/tailus/SpeedSection.astro[0m:[93m4[0m:[93m26[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@tailus/themer-progress' or its corresponding type declarations.

[7m4[0m import { progress } from '@tailus/themer-progress'
[7m [0m [91m                         ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/tailus/Testimonials.astro[0m:[93m3[0m:[93m37[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@tailus/themer-card' or its corresponding type declarations.

[7m3[0m import { softVariant as card } from '@tailus/themer-card'
[7m [0m [91m                                    ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/testing/BrowserCompatibilityTester.tsx[0m:[93m29[0m:[93m25[0m - [93mwarning[0m[90m ts(6385): [0m'vendor' is deprecated.

[7m29[0m       vendor: navigator.vendor,
[7m  [0m [93m                        ~~~~~~[0m
[96msrc/components/testing/BrowserCompatibilityTester.tsx[0m:[93m26[0m:[93m27[0m - [93mwarning[0m[90m ts(6385): [0m'platform' is deprecated.

[7m26[0m       platform: navigator.platform,
[7m  [0m [93m                          ~~~~~~~~[0m

[96msrc/components/theme/ThemeProvider.tsx[0m:[93m39[0m:[93m13[0m - [91merror[0m[90m ts(7030): [0mNot all code paths return a value.

[7m39[0m   useEffect(() => {
[7m  [0m [91m            ~~~~~~~[0m
[96msrc/components/theme/ThemeProvider.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { createContext, useContext, useEffect, useState } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/components/therapy/TherapeuticGoalsTracker.tsx[0m:[93m918[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType '(string | undefined)[]' is not assignable to type 'string[]'.
  Type 'string | undefined' is not assignable to type 'string'.

[7m918[0m   return interventions
[7m   [0m [91m  ~~~~~~[0m
[96msrc/components/therapy/TherapeuticGoalsTracker.tsx[0m:[93m863[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType '{ notes?: string | undefined; completedAt?: number | undefined; id: string; description: string | undefined; isCompleted: boolean; }[]' is not assignable to type '{ id: string; description: string; isCompleted: boolean; completedAt?: number | undefined; notes?: string | undefined; }[]'.
  Type '{ notes?: string | undefined; completedAt?: number | undefined; id: string; description: string | undefined; isCompleted: boolean; }' is not assignable to type '{ id: string; description: string; isCompleted: boolean; completedAt?: number | undefined; notes?: string | undefined; }'.

[7m863[0m   return checkpoints
[7m   [0m [91m  ~~~~~~[0m
[96msrc/components/therapy/TherapeuticGoalsTracker.tsx[0m:[93m69[0m:[93m27[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m69[0m           setActiveGoalId(fallbackGoals[0].id)
[7m  [0m [91m                          ~~~~~~~~~~~~~~~~[0m
[96msrc/components/therapy/TherapeuticGoalsTracker.tsx[0m:[93m59[0m:[93m29[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m59[0m             setActiveGoalId(initialGoals[0].id)
[7m  [0m [91m                            ~~~~~~~~~~~~~~~[0m
[96msrc/components/therapy/TherapeuticGoalsTracker.tsx[0m:[93m52[0m:[93m29[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m52[0m             setActiveGoalId(data[0].id)
[7m  [0m [91m                            ~~~~~~~[0m

[96msrc/components/therapy/TreatmentPlanManager.tsx[0m:[93m852[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType '{ children: Element | null; isOpen: boolean; onClose: () => void; title: string; showCloseButton: boolean; className: string; footer: Element; }' is not assignable to type 'IntrinsicAttributes & DialogRootProps'.
  Property 'isOpen' does not exist on type 'IntrinsicAttributes & DialogRootProps'. Did you mean 'open'?

[7m852[0m         isOpen={isEditModalOpen}
[7m   [0m [91m        ~~~~~~[0m
[96msrc/components/therapy/TreatmentPlanManager.tsx[0m:[93m712[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType '{ children: Element; isOpen: boolean; onClose: () => void; title: string; showCloseButton: boolean; className: string; footer: Element; }' is not assignable to type 'IntrinsicAttributes & DialogRootProps'.
  Property 'isOpen' does not exist on type 'IntrinsicAttributes & DialogRootProps'. Did you mean 'open'?

[7m712[0m         isOpen={isCreateModalOpen}
[7m   [0m [91m        ~~~~~~[0m
[96msrc/components/therapy/TreatmentPlanManager.tsx[0m:[93m696[0m:[93m39[0m - [91merror[0m[90m ts(2322): [0mType '{ children: Element; asChild: true; }' is not assignable to type 'IntrinsicAttributes & AlertDialogTriggerProps'.
  Property 'asChild' does not exist on type 'IntrinsicAttributes & AlertDialogTriggerProps'.

[7m696[0m                   <AlertDialogTrigger asChild>
[7m   [0m [91m                                      ~~~~~~~[0m
[96msrc/components/therapy/TreatmentPlanManager.tsx[0m:[93m682[0m:[93m45[0m - [91merror[0m[90m ts(2551): [0mProperty 'updatedAt' does not exist on type 'TreatmentPlan'. Did you mean 'updated_at'?

[7m682[0m                 <TableCell>{formatDate(plan.updatedAt)}</TableCell>
[7m   [0m [91m                                            ~~~~~~~~~[0m
[96msrc/components/therapy/TreatmentPlanManager.tsx[0m:[93m681[0m:[93m45[0m - [91merror[0m[90m ts(2551): [0mProperty 'startDate' does not exist on type 'TreatmentPlan'. Did you mean 'start_date'?

[7m681[0m                 <TableCell>{formatDate(plan.startDate)}</TableCell>
[7m   [0m [91m                                            ~~~~~~~~~[0m
[96msrc/components/therapy/TreatmentPlanManager.tsx[0m:[93m679[0m:[93m34[0m - [91merror[0m[90m ts(2551): [0mProperty 'clientId' does not exist on type 'TreatmentPlan'. Did you mean 'client_id'?

[7m679[0m                 <TableCell>{plan.clientId}</TableCell>
[7m   [0m [91m                                 ~~~~~~~~[0m
[96msrc/components/therapy/TreatmentPlanManager.tsx[0m:[93m664[0m:[93m10[0m - [91merror[0m[90m ts(2739): [0mType '{ children: Element[]; }' is missing the following properties from type 'TableProps<TableRowData>': columns, dataSource, tableState, onStateChange

[7m664[0m         <Table>
[7m   [0m [91m         ~~~~~[0m
[96msrc/components/therapy/TreatmentPlanManager.tsx[0m:[93m472[0m:[93m25[0m - [91merror[0m[90m ts(2551): [0mProperty 'startDate' does not exist on type 'TreatmentPlan'. Did you mean 'start_date'?

[7m472[0m         ? new Date(plan.startDate).toISOString().split('T')[0]
[7m   [0m [91m                        ~~~~~~~~~[0m
[96msrc/components/therapy/TreatmentPlanManager.tsx[0m:[93m471[0m:[93m23[0m - [91merror[0m[90m ts(2551): [0mProperty 'startDate' does not exist on type 'TreatmentPlan'. Did you mean 'start_date'?

[7m471[0m       startDate: plan.startDate
[7m   [0m [91m                      ~~~~~~~~~[0m
[96msrc/components/therapy/TreatmentPlanManager.tsx[0m:[93m99[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m99[0m   startDate: new Date().toISOString().split('T')[0],
[7m  [0m [91m  ~~~~~~~~~[0m

[96msrc/components/toc/Toc.astro[0m:[93m113[0m:[93m22[0m - [91merror[0m[90m ts(7006): [0mParameter 'item' implicitly has an 'any' type.

[7m113[0m           years.map((item) => (
[7m   [0m [91m                     ~~~~[0m
[96msrc/components/toc/Toc.astro[0m:[93m103[0m:[93m25[0m - [91merror[0m[90m ts(7006): [0mParameter 'item' implicitly has an 'any' type.

[7m103[0m           category.map((item) => (
[7m   [0m [91m                        ~~~~[0m
[96msrc/components/toc/Toc.astro[0m:[93m85[0m:[93m24[0m - [91merror[0m[90m ts(7006): [0mParameter 'item' implicitly has an 'any' type.

[7m85[0m             years.map((item) => (
[7m  [0m [91m                       ~~~~[0m
[96msrc/components/toc/Toc.astro[0m:[93m75[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'item' implicitly has an 'any' type.

[7m75[0m             category.map((item) => (
[7m  [0m [91m                          ~~~~[0m
[96msrc/components/toc/Toc.astro[0m:[93m9[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'MarkdownHeading'.

[7m9[0m import type { MarkdownHeading } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~~~~[0m

[96msrc/components/toc/TocButton.astro[0m:[93m47[0m:[93m28[0m - [91merror[0m[90m ts(2551): [0mProperty 'targe' does not exist on type 'MouseEvent'. Did you mean 'target'?

[7m47[0m       const target = event.targe
[7m  [0m [91m                           ~~~~~[0m

[96msrc/components/toc/TocItem.astro[0m:[93m24[0m:[93m24[0m - [91merror[0m[90m ts(7006): [0mParameter 'subheading' implicitly has an 'any' type.

[7m24[0m         {children.map((subheading) => (
[7m  [0m [91m                       ~~~~~~~~~~[0m

[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m362[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'initial' comes from an index signature, so it must be accessed with ['initial'].

[7m362[0m       initial={masterSequence?.initial || {}}
[7m   [0m [91m                               ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m362[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'Variant' is not assignable to type 'boolean | TargetAndTransition | VariantLabels | undefined'.
  Type 'TargetResolver' is not assignable to type 'boolean | TargetAndTransition | VariantLabels | undefined'.

[7m362[0m       initial={masterSequence?.initial || {}}
[7m   [0m [91m      ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m351[0m:[93m51[0m - [91merror[0m[90m ts(4111): [0mProperty 'animate' comes from an index signature, so it must be accessed with ['animate'].

[7m351[0m         await masterControls.start(masterSequence.animate || {})
[7m   [0m [91m                                                  ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m317[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'initial' comes from an index signature, so it must be accessed with ['initial'].

[7m317[0m       initial={currentVariants.initial || {}}
[7m   [0m [91m                               ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m317[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'Variant' is not assignable to type 'boolean | TargetAndTransition | VariantLabels | undefined'.
  Type 'TargetResolver' is not assignable to type 'boolean | TargetAndTransition | VariantLabels | undefined'.

[7m317[0m       initial={currentVariants.initial || {}}
[7m   [0m [91m      ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m301[0m:[93m46[0m - [91merror[0m[90m ts(4111): [0mProperty 'initial' comes from an index signature, so it must be accessed with ['initial'].

[7m301[0m       await controls.start(steps[0].variants.initial || {})
[7m   [0m [91m                                             ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m301[0m:[93m28[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m301[0m       await controls.start(steps[0].variants.initial || {})
[7m   [0m [91m                           ~~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m292[0m:[93m18[0m - [91merror[0m[90m ts(18048): [0m'step' is possibly 'undefined'.

[7m292[0m           delay: step.delay || 0,
[7m   [0m [91m                 ~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m291[0m:[93m69[0m - [91merror[0m[90m ts(18048): [0m'step' is possibly 'undefined'.

[7m291[0m           ease: typeof step.ease === 'string' ? EASING[step.ease] : step.ease,
[7m   [0m [91m                                                                    ~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m291[0m:[93m56[0m - [91merror[0m[90m ts(18048): [0m'step' is possibly 'undefined'.

[7m291[0m           ease: typeof step.ease === 'string' ? EASING[step.ease] : step.ease,
[7m   [0m [91m                                                       ~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m291[0m:[93m24[0m - [91merror[0m[90m ts(18048): [0m'step' is possibly 'undefined'.

[7m291[0m           ease: typeof step.ease === 'string' ? EASING[step.ease] : step.ease,
[7m   [0m [91m                       ~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m290[0m:[93m21[0m - [91merror[0m[90m ts(18048): [0m'step' is possibly 'undefined'.

[7m290[0m           duration: step.duration || TIMING.normal,
[7m   [0m [91m                    ~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m288[0m:[93m26[0m - [91merror[0m[90m ts(4111): [0mProperty 'animate' comes from an index signature, so it must be accessed with ['animate'].

[7m288[0m         ...step.variants.animate,
[7m   [0m [91m                         ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m288[0m:[93m12[0m - [91merror[0m[90m ts(18048): [0m'step' is possibly 'undefined'.

[7m288[0m         ...step.variants.animate,
[7m   [0m [91m           ~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m287[0m:[93m28[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ transition: { duration: number; ease: number[] | readonly [0.25, 0.1, 0.25, 1] | readonly [0.4, 0, 1, 1] | readonly [0, 0, 0.2, 1] | readonly [0.4, 0, 0.2, 1] | readonly [0.34, 1.56, 0.64, 1] | readonly [0.22, 1, 0.36, 1] | readonly [0.68, -0.55, 0.265, 1.55] | undefined; delay: number; }; ... 701 more ...; transi...' is not assignable to parameter of type 'AnimationDefinition'.
  Types of property 'transition' are incompatible.

[7m287[0m       await controls.start({
[7m   [0m [91m                           ~[0m
[7m288[0m         ...step.variants.animate,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m293[0m         },
[7m   [0m [91m~~~~~~~~~~[0m
[7m294[0m       })
[7m   [0m [91m~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m140[0m:[93m21[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'keyof IntrinsicElements' can't be used to index type '(<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: string | TagName | ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions | undefined, preloadedFeatures?: FeaturePackages | undefined, createVisualElement?: CreateVisualElement<...> | undefined) => MotionComponent<...>) &...'.
  No index signature with a parameter of type 'string' was found on type '(<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: string | TagName | ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions | undefined, preloadedFeatures?: FeaturePackages | undefined, createVisualElement?: CreateVisualElement<...> | undefined) => MotionComponent<...>) &...'.

[7m140[0m   const Component = motion[as] as React.ComponentType<
[7m   [0m [91m                    ~~~~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m102[0m:[93m67[0m - [91merror[0m[90m ts(4111): [0mProperty 'transition' comes from an index signature, so it must be accessed with ['transition'].

[7m102[0m             ...((baseVariants.animate as Record<string, unknown>).transition || {}),
[7m   [0m [91m                                                                  ~~~~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m102[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'animate' comes from an index signature, so it must be accessed with ['animate'].

[7m102[0m             ...((baseVariants.animate as Record<string, unknown>).transition || {}),
[7m   [0m [91m                              ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m100[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'animate' comes from an index signature, so it must be accessed with ['animate'].

[7m100[0m           ...baseVariants.animate,
[7m   [0m [91m                          ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m95[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'animate' comes from an index signature, so it must be accessed with ['animate'].

[7m95[0m       typeof baseVariants.animate === 'object'
[7m  [0m [91m                          ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m94[0m:[93m20[0m - [91merror[0m[90m ts(4111): [0mProperty 'animate' comes from an index signature, so it must be accessed with ['animate'].

[7m94[0m       baseVariants.animate &&
[7m  [0m [91m                   ~~~~~~~[0m
[96msrc/components/transitions/AnimationOrchestrator.tsx[0m:[93m81[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'Variants | undefined' is not assignable to type 'Variants'.
  Type 'undefined' is not assignable to type 'Variants'.

[7m81[0m       baseVariants = animationPresets[sequence] || animationPresets.fadeIn
[7m  [0m [91m      ~~~~~~~~~~~~[0m

[96msrc/components/transitions/PageTransitions.astro[0m:[93m60[0m:[93m22[0m - [91merror[0m[90m ts(18048): [0m'currentTransition' is possibly 'undefined'.

[7m60[0m const newTransform = currentTransition.new.transform || 'none'
[7m  [0m [91m                     ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/transitions/PageTransitions.astro[0m:[93m59[0m:[93m20[0m - [91merror[0m[90m ts(18048): [0m'currentTransition' is possibly 'undefined'.

[7m59[0m const newOpacity = currentTransition.new.opacity || '1'
[7m  [0m [91m                   ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/transitions/PageTransitions.astro[0m:[93m58[0m:[93m22[0m - [91merror[0m[90m ts(18048): [0m'currentTransition' is possibly 'undefined'.

[7m58[0m const oldTransform = currentTransition.old.transform || 'none'
[7m  [0m [91m                     ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/transitions/PageTransitions.astro[0m:[93m57[0m:[93m20[0m - [91merror[0m[90m ts(18048): [0m'currentTransition' is possibly 'undefined'.

[7m57[0m const oldOpacity = currentTransition.old.opacity || '1'
[7m  [0m [91m                   ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/transitions/PageTransitions.astro[0m:[93m177[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'newDocument' is declared but its value is never read.

[7m177[0m     const newDocument = event.newDocument
[7m   [0m [91m          ~~~~~~~~~~~[0m

[96msrc/components/ui/AccessibilityAnnouncer.tsx[0m:[93m27[0m:[93m13[0m - [91merror[0m[90m ts(7030): [0mNot all code paths return a value.

[7m27[0m   useEffect(() => {
[7m  [0m [91m            ~~~~~~~[0m
[96msrc/components/ui/AccessibilityAnnouncer.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useEffect, useState } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/components/ui/Alert.astro[0m:[93m56[0m:[93m33[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ info: string; success: string; warning: string; error: string; }'.

[7m56[0m const classes = cn(baseClasses, variantClasses[variant], className);
[7m  [0m [91m                                ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/ui/Alert.astro[0m:[93m55[0m:[93m29[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ info: string; success: string; warning: string; error: string; }'.

[7m55[0m const displayIcon = icon || defaultIcons[variant];
[7m  [0m [91m                            ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/ui/BrutalistBadge.astro[0m:[93m31[0m:[93m3[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ sm: string; md: string; lg: string; }'.

[7m31[0m   sizeClasses[size],
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/ui/BrutalistBadge.astro[0m:[93m30[0m:[93m3[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ success: string; info: string; warning: string; danger: string; }'.

[7m30[0m   variantClasses[variant],
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/ui/BrutalistButton.astro[0m:[93m37[0m:[93m3[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ sm: string; md: string; lg: string; }'.

[7m37[0m   sizeClasses[size],
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/ui/BrutalistButton.astro[0m:[93m36[0m:[93m3[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ primary: string; secondary: string; outline: string; danger: string; }'.

[7m36[0m   variantClasses[variant],
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/ui/BrutalistCard.astro[0m:[93m26[0m:[93m3[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ default: string; elevated: string; therapy: string; security: string; }'.

[7m26[0m   variantClasses[variant],
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/ui/EnhancedMentalHealthChat.tsx[0m:[93m297[0m:[93m17[0m - [93mwarning[0m[90m ts(6385): [0m'onKeyPress' is deprecated.

[7m297[0m                 onKeyPress={handleKeyPress}
[7m   [0m [93m                ~~~~~~~~~~[0m

[96msrc/components/ui/LazyChart.tsx[0m:[93m160[0m:[93m8[0m - [91merror[0m[90m ts(2741): [0mProperty 'dataKey' is missing in type '{}' but required in type 'AreaProps'.

[7m160[0m       <LazyArea {...props} />
[7m   [0m [91m       ~~~~~~~~[0m
[96msrc/components/ui/LazyChart.tsx[0m:[93m52[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'ReactNode' is not assignable to type 'ReactElement<unknown, string | JSXElementConstructor<any>>'.
  Type 'undefined' is not assignable to type 'ReactElement<unknown, string | JSXElementConstructor<any>>'.

[7m52[0m         {children}
[7m  [0m [91m        ~~~~~~~~~~[0m
[96msrc/components/ui/LazyChart.tsx[0m:[93m50[0m:[93m53[0m - [91merror[0m[90m ts(4111): [0mProperty 'height' comes from an index signature, so it must be accessed with ['height'].

[7m50[0m     <Suspense fallback={<ChartLoading height={props.height} />}>
[7m  [0m [91m                                                    ~~~~~~[0m
[96msrc/components/ui/LazyChart.tsx[0m:[93m50[0m:[93m39[0m - [91merror[0m[90m ts(2322): [0mType 'unknown' is not assignable to type 'number | undefined'.

[7m50[0m     <Suspense fallback={<ChartLoading height={props.height} />}>
[7m  [0m [91m                                      ~~~~~~[0m

[96msrc/components/ui/MindMirrorDashboard.tsx[0m:[93m209[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'metric' implicitly has an 'any' type.

[7m209[0m         {moodMetrics.map((metric) => (
[7m   [0m [91m                          ~~~~~~[0m
[96msrc/components/ui/MindMirrorDashboard.tsx[0m:[93m114[0m:[93m23[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useMemo'.

[7m114[0m   const moodMetrics = useMemo(() => {
[7m   [0m [91m                      ~~~~~~~[0m
[96msrc/components/ui/MindMirrorDashboard.tsx[0m:[93m106[0m:[93m25[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useMemo'.

[7m106[0m   const archetypeInfo = useMemo(() => {
[7m   [0m [91m                        ~~~~~~~[0m

[96msrc/components/ui/ToastProvider.tsx[0m:[93m24[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'success' does not exist in type 'Partial<Partial<Pick<Toast, "style" | "duration" | "className" | "id" | "icon" | "ariaProps" | "position" | "iconTheme" | "removeDelay">>>'.

[7m24[0m         success: {
[7m  [0m [91m        ~~~~~~~[0m
[96msrc/components/ui/ToastProvider.tsx[0m:[93m2[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m2[0m import React from 'react'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/ui/UserMenu.tsx[0m:[93m58[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'user_metadata' does not exist on type 'AuthUser'.

[7m58[0m               {user.user_metadata?.full_name || user.email}
[7m  [0m [91m                    ~~~~~~~~~~~~~[0m
[96msrc/components/ui/UserMenu.tsx[0m:[93m47[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'user_metadata' does not exist on type 'AuthUser'.

[7m47[0m           src={user.user_metadata?.avatar_url}
[7m  [0m [91m                    ~~~~~~~~~~~~~[0m
[96msrc/components/ui/UserMenu.tsx[0m:[93m3[0m:[93m24[0m - [91merror[0m[90m ts(2307): [0mCannot find module './avatar' or its corresponding type declarations.

[7m3[0m import { Avatar } from './avatar'
[7m [0m [91m                       ~~~~~~~~~~[0m
[96msrc/components/ui/UserMenu.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useState, useRef, useEffect } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/components/ui/icons.tsx[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React from 'react'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/ui/label.tsx[0m:[93m11[0m:[93m21[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m11[0m     if (process.env.NODE_ENV !== 'production' && !htmlFor) {
[7m  [0m [91m                    ~~~~~~~~[0m

[96msrc/components/ui/rubiks-cube.tsx[0m:[93m6[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@react-three/drei"' has no exported member 'PerspectiveCamera'.

[7m6[0m import { PerspectiveCamera } from "@react-three/drei";
[7m [0m [91m         ~~~~~~~~~~~~~~~~~[0m
[96msrc/components/ui/rubiks-cube.tsx[0m:[93m5[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@react-three/drei"' has no exported member 'SpotLight'.

[7m5[0m import { SpotLight } from "@react-three/drei";
[7m [0m [91m         ~~~~~~~~~[0m
[96msrc/components/ui/rubiks-cube.tsx[0m:[93m4[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@react-three/drei"' has no exported member 'RoundedBox'.

[7m4[0m import { RoundedBox } from "@react-three/drei";
[7m [0m [91m         ~~~~~~~~~~[0m

[96msrc/components/ui/tabs.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, {
[7m [0m [91m       ~~~~~[0m

[96msrc/components/ui/toast.tsx[0m:[93m3[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m3[0m import React from 'react'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/ui/__tests__/Alert.test.ts[0m:[93m125[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m125[0m     const { container } = await renderAstro(Alert, {
[7m   [0m [91m                                            ~~~~~[0m
[96msrc/components/ui/__tests__/Alert.test.ts[0m:[93m114[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m114[0m     const { container } = await renderAstro(Alert, {
[7m   [0m [91m                                            ~~~~~[0m
[96msrc/components/ui/__tests__/Alert.test.ts[0m:[93m104[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m104[0m     const { container } = await renderAstro(Alert, {
[7m   [0m [91m                                            ~~~~~[0m
[96msrc/components/ui/__tests__/Alert.test.ts[0m:[93m93[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m93[0m     const { container } = await renderAstro(Alert, {
[7m  [0m [91m                                            ~~~~~[0m
[96msrc/components/ui/__tests__/Alert.test.ts[0m:[93m81[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m81[0m     const { container } = await renderAstro(Alert, {
[7m  [0m [91m                                            ~~~~~[0m
[96msrc/components/ui/__tests__/Alert.test.ts[0m:[93m69[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m69[0m     const { container } = await renderAstro(Alert, {
[7m  [0m [91m                                            ~~~~~[0m
[96msrc/components/ui/__tests__/Alert.test.ts[0m:[93m55[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m55[0m     const { container } = await renderAstro(Alert, {
[7m  [0m [91m                                            ~~~~~[0m
[96msrc/components/ui/__tests__/Alert.test.ts[0m:[93m38[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m38[0m     const { container } = await renderAstro(Alert, {
[7m  [0m [91m                                            ~~~~~[0m
[96msrc/components/ui/__tests__/Alert.test.ts[0m:[93m19[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m19[0m     const { container } = await renderAstro(Alert, {
[7m  [0m [91m                                            ~~~~~[0m
[96msrc/components/ui/__tests__/Alert.test.ts[0m:[93m7[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(_props: Props) => any' is not assignable to parameter of type 'AstroComponent'.

[7m7[0m     const { container } = await renderAstro(Alert, {
[7m [0m [91m                                            ~~~~~[0m

[96msrc/components/views/GithubView.astro[0m:[93m109[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m109[0m           pkgName,
[7m   [0m [91m          ~~~~~~~[0m
[96msrc/components/views/GithubView.astro[0m:[93m106[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m106[0m           versionNum,
[7m   [0m [91m          ~~~~~~~~~~[0m

[96msrc/components/widgets/ShareLink.astro[0m:[93m292[0m:[93m12[0m - [91merror[0m[90m ts(18048): [0m'linkConfig' is possibly 'undefined'.

[7m292[0m           {linkConfig.label}
[7m   [0m [91m           ~~~~~~~~~~[0m
[96msrc/components/widgets/ShareLink.astro[0m:[93m289[0m:[93m18[0m - [91merror[0m[90m ts(18048): [0m'linkConfig' is possibly 'undefined'.

[7m289[0m           title={linkConfig.title}
[7m   [0m [91m                 ~~~~~~~~~~[0m
[96msrc/components/widgets/ShareLink.astro[0m:[93m288[0m:[93m54[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type '[boolean, (string | undefined)?] | undefined'.

[7m288[0m           href={linkConfig.formatUrl(initialPostUrl, provider.cfg)}
[7m   [0m [91m                                                     ~~~~~~~~~~~~[0m
[96msrc/components/widgets/ShareLink.astro[0m:[93m288[0m:[93m17[0m - [91merror[0m[90m ts(18048): [0m'linkConfig' is possibly 'undefined'.

[7m288[0m           href={linkConfig.formatUrl(initialPostUrl, provider.cfg)}
[7m   [0m [91m                ~~~~~~~~~~[0m
[96msrc/components/widgets/ShareLink.astro[0m:[93m121[0m:[93m15[0m - [91merror[0m[90m ts(6196): [0m'_ShareLink' is declared but never used.

[7m121[0m     interface _ShareLink {
[7m   [0m [91m              ~~~~~~~~~~[0m

[96msrc/components/widgets/SwiperCarousel.astro[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'ImageMetadata'.

[7m3[0m import type { ImageMetadata } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~~[0m

[96msrc/data/sample-cognitive-models.ts[0m:[93m1136[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m1136[0m         'Basic emotional regulation'
[7m    [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m1135[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m1135[0m         'Safety planning',
[7m    [0m [91m        ~~~~~~~~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m1134[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m1134[0m         'Grounding techniques',
[7m    [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m1087[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'resistance' does not exist in type 'ConversationalStyle'.

[7m1087[0m       resistance: 6,
[7m    [0m [91m      ~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m749[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m749[0m         'Basic cognitive restructuring'
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m748[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m748[0m         'Progressive muscle relaxation',
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m747[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m747[0m         'Deep breathing',
[7m   [0m [91m        ~~~~~~~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m704[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'resistance' does not exist in type 'ConversationalStyle'.

[7m704[0m       resistance: 7,
[7m   [0m [91m      ~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m361[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m361[0m         'Mindfulness techniques'
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m360[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m360[0m         'Activity scheduling',
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m359[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m359[0m         'Basic thought challenging',
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/data/sample-cognitive-models.ts[0m:[93m318[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'resistance' does not exist in type 'ConversationalStyle'.

[7m318[0m       resistance: 6,
[7m   [0m [91m      ~~~~~~~~~~[0m

[96msrc/e2e/breach-notification.spec.ts[0m:[93m3[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"../lib/security/breach-notification"' has no exported member 'BreachNotificationSystem'.

[7m3[0m import { BreachNotificationSystem } from '../lib/security/breach-notification'
[7m [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/e2e/breach-notification.spec.ts[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m ts(2614): [0mModule '"../services/AuthService"' has no exported member 'AuthService'. Did you mean to use 'import AuthService from "../services/AuthService"' instead?

[7m1[0m import { AuthService } from '../services/AuthService'
[7m [0m [91m         ~~~~~~~~~~~[0m
[96msrc/e2e/breach-notification.spec.ts[0m:[93m307[0m:[93m35[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m307[0m             postData: JSON.parse((await request.postData()) || '{}'),
[7m   [0m [93m                                  ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/e2e/breach-notification.spec.ts[0m:[93m199[0m:[93m35[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m199[0m             postData: JSON.parse((await request.postData()) || '{}'),
[7m   [0m [93m                                  ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/hooks/auth-types.ts[0m:[93m8[0m:[93m3[0m - [91merror[0m[90m ts(2305): [0mModule '"../types/auth.js"' has no exported member 'Session'.

[7m8[0m   Session,
[7m [0m [91m  ~~~~~~~[0m

[96msrc/hooks/useAuth.ts[0m:[93m294[0m:[93m46[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{}' is not assignable to parameter of type 'string'.

[7m294[0m       const result = await authUpdateProfile(user.id, profile)
[7m   [0m [91m                                             ~~~~~~~[0m
[96msrc/hooks/useAuth.ts[0m:[93m265[0m:[93m26[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type '{ success: boolean; error: unknown; }'.

[7m265[0m         setUser(response.user)
[7m   [0m [91m                         ~~~~[0m
[96msrc/hooks/useAuth.ts[0m:[93m264[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type '{ success: boolean; error: unknown; }'.

[7m264[0m       if (response.user) {
[7m   [0m [91m                   ~~~~[0m
[96msrc/hooks/useAuth.ts[0m:[93m259[0m:[93m11[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{}' is not assignable to parameter of type 'string'.

[7m259[0m           response.error || 'OTP verification failed',
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/hooks/useAuth.ts[0m:[93m236[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'void' is not assignable to type 'boolean'.

[7m236[0m       return await authResetPassword(email, redirectTo)
[7m   [0m [91m      ~~~~~~[0m
[96msrc/hooks/useAuth.ts[0m:[93m213[0m:[93m13[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 0.

[7m213[0m       await authSignOut()
[7m   [0m [91m            ~~~~~~~~~~~[0m
[96msrc/hooks/useAuth.ts[0m:[93m163[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'error' does not exist on type '{ user: AuthUser | null; session: { access_token: any; refresh_token: any; }; }'.

[7m163[0m           result.error || 'Registration failed',
[7m   [0m [91m                 ~~~~~[0m
[96msrc/hooks/useAuth.ts[0m:[93m127[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'error' does not exist on type '{ user: AuthUser | null; session: { access_token: any; refresh_token: any; }; }'.

[7m127[0m           result.error || 'Authentication failed',
[7m   [0m [91m                 ~~~~~[0m
[96msrc/hooks/useAuth.ts[0m:[93m74[0m:[93m35[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 0.

[7m74[0m         const currentUser = await getCurrentUser()
[7m  [0m [91m                                  ~~~~~~~~~~~~~~[0m

[96msrc/hooks/useCognitiveDistortionDetection.ts[0m:[93m122[0m:[93m46[0m - [91merror[0m[90m ts(2454): [0mVariable 'generateSummary' is used before being assigned.

[7m122[0m     [minConfidence, onDetection, onComplete, generateSummary],
[7m   [0m [91m                                             ~~~~~~~~~~~~~~~[0m
[96msrc/hooks/useCognitiveDistortionDetection.ts[0m:[93m122[0m:[93m46[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'generateSummary' used before its declaration.

[7m122[0m     [minConfidence, onDetection, onComplete, generateSummary],
[7m   [0m [91m                                             ~~~~~~~~~~~~~~~[0m
[96msrc/hooks/useCognitiveDistortionDetection.ts[0m:[93m86[0m:[93m21[0m - [91merror[0m[90m ts(18046): [0m'config' is of type 'unknown'.

[7m86[0m               type: config.type,
[7m  [0m [91m                    ~~~~~~[0m
[96msrc/hooks/useCognitiveDistortionDetection.ts[0m:[93m68[0m:[93m46[0m - [91merror[0m[90m ts(18046): [0m'config' is of type 'unknown'.

[7m68[0m             0.5 + (matchingPatterns.length / config.patterns.length) * 0.5,
[7m  [0m [91m                                             ~~~~~~[0m
[96msrc/hooks/useCognitiveDistortionDetection.ts[0m:[93m61[0m:[93m58[0m - [91merror[0m[90m ts(7006): [0mParameter 'pattern' implicitly has an 'any' type.

[7m61[0m         const matchingPatterns = config.patterns.filter((pattern) =>
[7m  [0m [91m                                                         ~~~~~~~[0m
[96msrc/hooks/useCognitiveDistortionDetection.ts[0m:[93m61[0m:[93m34[0m - [91merror[0m[90m ts(18046): [0m'config' is of type 'unknown'.

[7m61[0m         const matchingPatterns = config.patterns.filter((pattern) =>
[7m  [0m [91m                                 ~~~~~~[0m
[96msrc/hooks/useCognitiveDistortionDetection.ts[0m:[93m7[0m:[93m44[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../lib/ai/types/CognitiveDistortions' or its corresponding type declarations.

[7m7[0m import { cognitiveDistortionConfigs } from '../lib/ai/types/CognitiveDistortions'
[7m [0m [91m                                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/hooks/useCognitiveDistortionDetection.ts[0m:[93m6[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../lib/ai/types/CognitiveDistortions' or its corresponding type declarations.

[7m6[0m } from '../lib/ai/types/CognitiveDistortions'
[7m [0m [91m       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/hooks/useComparativeProgress.ts[0m:[93m41[0m:[93m17[0m - [93mwarning[0m[90m ts(80004): [0mJSDoc types may be moved to TypeScript types.

[7m41[0m export function useComparativeProgress(
[7m  [0m [93m                ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/hooks/useConversionTracking.ts[0m:[93m49[0m:[93m29[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 2.

[7m49[0m     trackEvent('page_view', { path })
[7m  [0m [91m                            ~~~~~~~~[0m

[96msrc/hooks/useEmotionProgress.ts[0m:[93m2[0m:[93m42[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/lib/ai/temporal/types' or its corresponding type declarations.

[7m2[0m import type { ProgressionAnalysis } from '@/lib/ai/temporal/types'
[7m [0m [91m                                         ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/hooks/useMemory.ts[0m:[93m272[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '(preference: string, value: string | number | boolean | object) => Promise<void>' is not assignable to type '(preference: string, value: unknown) => Promise<void>'.
  Types of parameters 'value' and 'value' are incompatible.

[7m272[0m     addUserPreference,
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~[0m

[96msrc/hooks/usePatientModel.ts[0m:[93m136[0m:[93m39[0m - [91merror[0m[90m ts(2339): [0mProperty 'generatePatientPrompt' does not exist on type 'PatientModelService'.

[7m136[0m         const prompt = patientService.generatePatientPrompt(responseContext)
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/hooks/usePatientModel.ts[0m:[93m123[0m:[93m54[0m - [91merror[0m[90m ts(2339): [0mProperty 'createResponseContext' does not exist on type 'PatientModelService'.

[7m123[0m         const responseContext = await patientService.createResponseContext(
[7m   [0m [91m                                                     ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/hooks/usePatientModel.ts[0m:[93m69[0m:[93m44[0m - [91merror[0m[90m ts(2551): [0mProperty 'getModelById' does not exist on type 'PatientModelService'. Did you mean 'getModel'?

[7m69[0m         const model = await patientService.getModelById(currentModelId)
[7m  [0m [91m                                           ~~~~~~~~~~~~[0m
[96msrc/hooks/usePatientModel.ts[0m:[93m45[0m:[93m29[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m45[0m           setCurrentModelId(models[0].id)
[7m  [0m [91m                            ~~~~~~~~~[0m
[96msrc/hooks/usePatientModel.ts[0m:[93m5[0m:[93m8[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/ai/services/PatientModelService"' has no exported member 'ModelIdentifier'.

[7m5[0m   type ModelIdentifier,
[7m [0m [91m       ~~~~~~~~~~~~~~~[0m

[96msrc/hooks/useRiskAssessment.ts[0m:[93m34[0m:[93m13[0m - [91merror[0m[90m ts(2358): [0mThe left-hand side of an 'instanceof' expression must be of type 'any', an object type or a type parameter.

[7m34[0m         if (response instanceof ReadableStream) {
[7m  [0m [91m            ~~~~~~~~[0m

[96msrc/hooks/useSecurity.ts[0m:[93m23[0m:[93m28[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 0.

[7m23[0m           await fheService.initialize()
[7m  [0m [91m                           ~~~~~~~~~~[0m

[96msrc/hooks/useTemporalEmotionAnalysis.ts[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"../lib/ai/temporal/EmotionTemporalAnalyzer"' has no exported member 'TemporalEmotionAnalysis'.

[7m2[0m import type { TemporalEmotionAnalysis } from '../lib/ai/temporal/EmotionTemporalAnalyzer'
[7m [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/hooks/__tests__/useNotificationPreferences.test.ts[0m:[93m208[0m:[93m50[0m - [91merror[0m[90m ts(4111): [0mProperty 'updates' comes from an index signature, so it must be accessed with ['updates'].

[7m208[0m     expect(result.current.preferences.categories.updates).toBe(false)
[7m   [0m [91m                                                 ~~~~~~~[0m

[96msrc/hooks/__tests__/usePatternDetection.test.ts[0m:[93m26[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'timestamp' does not exist in type 'Message'.

[7m26[0m       timestamp: Date.now(),
[7m  [0m [91m      ~~~~~~~~~[0m
[96msrc/hooks/__tests__/usePatternDetection.test.ts[0m:[93m19[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'timestamp' does not exist in type 'Message'.

[7m19[0m       timestamp: Date.now() - 1000,
[7m  [0m [91m      ~~~~~~~~~[0m

[96msrc/hooks/__tests__/vitest.setup.ts[0m:[93m3[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType 'typeof TextEncoder' is not assignable to type '{ new (): TextEncoder; prototype: TextEncoder; }'.
  The types returned by 'prototype.encode(...)' are incompatible between these types.

[7m3[0m   globalThis.TextEncoder = TextEncoder
[7m [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/integrations/search.ts[0m:[93m78[0m:[93m48[0m - [91merror[0m[90m ts(7031): [0mBinding element 'logger' implicitly has an 'any' type.

[7m78[0m       'astro:build:done': async ({ dir, pages, logger }) => {
[7m  [0m [91m                                               ~~~~~~[0m
[96msrc/integrations/search.ts[0m:[93m78[0m:[93m41[0m - [91merror[0m[90m ts(7031): [0mBinding element 'pages' implicitly has an 'any' type.

[7m78[0m       'astro:build:done': async ({ dir, pages, logger }) => {
[7m  [0m [91m                                        ~~~~~[0m
[96msrc/integrations/search.ts[0m:[93m78[0m:[93m36[0m - [91merror[0m[90m ts(7031): [0mBinding element 'dir' implicitly has an 'any' type.

[7m78[0m       'astro:build:done': async ({ dir, pages, logger }) => {
[7m  [0m [91m                                   ~~~[0m
[96msrc/integrations/search.ts[0m:[93m39[0m:[93m46[0m - [91merror[0m[90m ts(7031): [0mBinding element 'logger' implicitly has an 'any' type.

[7m39[0m       'astro:config:setup': ({ injectScript, logger }) => {
[7m  [0m [91m                                             ~~~~~~[0m
[96msrc/integrations/search.ts[0m:[93m39[0m:[93m32[0m - [91merror[0m[90m ts(7031): [0mBinding element 'injectScript' implicitly has an 'any' type.

[7m39[0m       'astro:config:setup': ({ injectScript, logger }) => {
[7m  [0m [91m                               ~~~~~~~~~~~~[0m
[96msrc/integrations/search.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroIntegration'.

[7m1[0m import type { AstroIntegration } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~~~~~[0m

[96msrc/integrations/react/client-v17.js[0m:[93m23[0m:[93m13[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(container: Element | DocumentFragment): boolean' of 'unmountComponentAtNode' is deprecated.

[7m23[0m       () => unmountComponentAtNode(element),
[7m  [0m [93m            ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/integrations/react/client-v17.js[0m:[93m20[0m:[93m5[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(element: DOMElement<DOMAttributes<HTMLInputElement>, HTMLInputElement>, container: Container | null, callback?: (() => void) | undefined): HTMLInputElement' of 'bootstrap' is deprecated.

[7m20[0m     bootstrap(componentEl, element)
[7m  [0m [93m    ~~~~~~~~~[0m
[96msrc/integrations/react/client-v17.js[0m:[93m19[0m:[93m45[0m - [93mwarning[0m[90m ts(6385): [0m'render' is deprecated.

[7m19[0m     const bootstrap = isHydrate ? hydrate : render
[7m  [0m [93m                                            ~~~~~~[0m
[96msrc/integrations/react/client-v17.js[0m:[93m19[0m:[93m35[0m - [93mwarning[0m[90m ts(6385): [0m'hydrate' is deprecated.

[7m19[0m     const bootstrap = isHydrate ? hydrate : render
[7m  [0m [93m                                  ~~~~~~~[0m
[96msrc/integrations/react/client-v17.js[0m:[93m2[0m:[93m27[0m - [93mwarning[0m[90m ts(6385): [0m'unmountComponentAtNode' is deprecated.

[7m2[0m import { render, hydrate, unmountComponentAtNode } from 'react-dom'
[7m [0m [93m                          ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/integrations/react/client-v17.js[0m:[93m2[0m:[93m18[0m - [93mwarning[0m[90m ts(6385): [0m'hydrate' is deprecated.

[7m2[0m import { render, hydrate, unmountComponentAtNode } from 'react-dom'
[7m [0m [93m                 ~~~~~~~[0m
[96msrc/integrations/react/client-v17.js[0m:[93m2[0m:[93m10[0m - [93mwarning[0m[90m ts(6385): [0m'render' is deprecated.

[7m2[0m import { render, hydrate, unmountComponentAtNode } from 'react-dom'
[7m [0m [93m         ~~~~~~[0m

[96msrc/integrations/react/server.js[0m:[93m180[0m:[93m27[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(element: ReactNode, options?: ServerOptions | undefined): ReadableStream' of 'ReactDOM.renderToStaticNodeStream' is deprecated.

[7m180[0m     let stream = ReactDOM.renderToStaticNodeStream(vnode, options)
[7m   [0m [93m                          ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/integrations/react/patches/react-dom.js[0m:[93m17[0m:[93m3[0m - [93mwarning[0m[90m ts(6385): [0m'unstable_renderSubtreeIntoContainer' is deprecated.

[7m17[0m   unstable_renderSubtreeIntoContainer,
[7m  [0m [93m  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/integrations/react/patches/react-dom.js[0m:[93m14[0m:[93m3[0m - [93mwarning[0m[90m ts(6385): [0m'unmountComponentAtNode' is deprecated.

[7m14[0m   unmountComponentAtNode,
[7m  [0m [93m  ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/integrations/react/patches/react-dom.js[0m:[93m13[0m:[93m3[0m - [93mwarning[0m[90m ts(6385): [0m'render' is deprecated.

[7m13[0m   render,
[7m  [0m [93m  ~~~~~~[0m
[96msrc/integrations/react/patches/react-dom.js[0m:[93m12[0m:[93m3[0m - [93mwarning[0m[90m ts(6385): [0m'hydrate' is deprecated.

[7m12[0m   hydrate,
[7m  [0m [93m  ~~~~~~~[0m
[96msrc/integrations/react/patches/react-dom.js[0m:[93m10[0m:[93m3[0m - [93mwarning[0m[90m ts(6385): [0m'findDOMNode' is deprecated.

[7m10[0m   findDOMNode,
[7m  [0m [93m  ~~~~~~~~~~~[0m

[96msrc/integrations/react/patches/react.js[0m:[93m20[0m:[93m3[0m - [93mwarning[0m[90m ts(6385): [0m'createFactory' is deprecated.

[7m20[0m   createFactory,
[7m  [0m [93m  ~~~~~~~~~~~~~[0m

[96msrc/layouts/AuthLayout.astro[0m:[93m26[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; title: any; description: any; showNavBar: boolean; showFooter: boolean; bgPattern: boolean; usePlumAnimation: boolean; centered: boolean; containerClass: string; contentClass: string; transitionMode: any; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'showNavBar' does not exist on type 'IntrinsicAttributes & Props'.

[7m26[0m   showNavBar={true}
[7m  [0m [91m  ~~~~~~~~~~[0m

[96msrc/layouts/BaseLayout.astro[0m:[93m5[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'KonamiTrigger' is declared but its value is never read.

[7m5[0m import { KonamiTrigger } from '@/components/ui/KonamiTrigger';import type { BgType } from '@/types';
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/layouts/BlogLayout.astro[0m:[93m43[0m:[93m11[0m - [93mwarning[0m[90m astro(4000): [0mThis script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

[7m43[0m           type="application/ld+json"
[7m  [0m [93m          ~~~~[0m

[96msrc/layouts/BlogPostLayout.astro[0m:[93m45[0m:[93m45[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; title: any; description: any; ogImage: any; bgType: "rose"; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'ogImage' does not exist on type 'IntrinsicAttributes & Props'.

[7m45[0m <BaseLayout title={postTitle} {description} ogImage={image?.url} bgType="rose">
[7m  [0m [91m                                            ~~~~~~~[0m

[96msrc/layouts/ChatLayout.astro[0m:[93m2[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'props' does not exist on type '{ url: URL; site: URL; }'.

[7m2[0m const { title = 'Chat' } = Astro.props
[7m [0m [91m                                 ~~~~~[0m

[96msrc/layouts/Layout.astro[0m:[93m44[0m:[93m13[0m - [93mwarning[0m[90m astro(4000): [0mThis script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

[7m44[0m     <script src="/js/background-loader.js" defer></script>
[7m  [0m [93m            ~~~[0m
[96msrc/layouts/Layout.astro[0m:[93m41[0m:[93m13[0m - [93mwarning[0m[90m astro(4000): [0mThis script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

[7m41[0m     <script src="/js/module-loader.js" defer></script>
[7m  [0m [93m            ~~~[0m

[96msrc/layouts/TailusLayout.astro[0m:[93m23[0m:[93m7[0m - [93mwarning[0m[90m astro(4000): [0mThis script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

[7m23[0m       data-goatcounter="https://pixelated.goatcounter.com/count"
[7m  [0m [93m      ~~~~~~~~~~~~~~~~[0m

[96msrc/layouts/__tests__/DocumentationLayout.test.tsx[0m:[93m9[0m:[93m22[0m - [91merror[0m[90m ts(7031): [0mBinding element 'description' implicitly has an 'any' type.

[7m9[0m   default: ({ title, description }) =>
[7m [0m [91m                     ~~~~~~~~~~~[0m
[96msrc/layouts/__tests__/DocumentationLayout.test.tsx[0m:[93m9[0m:[93m15[0m - [91merror[0m[90m ts(7031): [0mBinding element 'title' implicitly has an 'any' type.

[7m9[0m   default: ({ title, description }) =>
[7m [0m [91m              ~~~~~[0m
[96msrc/layouts/__tests__/DocumentationLayout.test.tsx[0m:[93m2[0m:[93m7[0m - [91merror[0m[90m ts(2451): [0mCannot redeclare block-scoped variable 'Astro'.

[7m2[0m const Astro = {
[7m [0m [91m      ~~~~~[0m

[96msrc/lib/access-control.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroCookies'.

[7m1[0m import type { AstroCookies } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~[0m

[96msrc/lib/analytics.ts[0m:[93m270[0m:[93m40[0m - [91merror[0m[90m ts(4111): [0mProperty 'PUBLIC_ANALYTICS_API_KEY' comes from an index signature, so it must be accessed with ['PUBLIC_ANALYTICS_API_KEY'].

[7m270[0m           'X-API-Key': import.meta.env.PUBLIC_ANALYTICS_API_KEY || '',
[7m   [0m [91m                                       ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics.ts[0m:[93m81[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'PUBLIC_ANALYTICS_ENDPOINT' comes from an index signature, so it must be accessed with ['PUBLIC_ANALYTICS_ENDPOINT'].

[7m81[0m   endpointUrl: import.meta.env.PUBLIC_ANALYTICS_ENDPOINT,
[7m  [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics.ts[0m:[93m454[0m:[93m58[0m - [93mwarning[0m[90m ts(6385): [0m'platform' is deprecated.

[7m454[0m             typeof navigator !== 'undefined' ? navigator.platform : 'server',
[7m   [0m [93m                                                         ~~~~~~~~[0m

[96msrc/lib/auth.ts[0m:[93m226[0m:[93m10[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'APIContext'.

[7m226[0m     } as APIContext['cookies']
[7m   [0m [91m         ~~~~~~~~~~[0m
[96msrc/lib/auth.ts[0m:[93m218[0m:[93m52[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'APIContext'.

[7m218[0m   private getCookiesFromRequest(request: Request): APIContext['cookies'] {
[7m   [0m [91m                                                   ~~~~~~~~~~[0m
[96msrc/lib/auth.ts[0m:[93m191[0m:[93m12[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'APIContext'.

[7m191[0m   cookies: APIContext['cookies']
[7m   [0m [91m           ~~~~~~~~~~[0m
[96msrc/lib/auth.ts[0m:[93m167[0m:[93m12[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'APIContext'.

[7m167[0m   cookies: APIContext['cookies']
[7m   [0m [91m           ~~~~~~~~~~[0m
[96msrc/lib/auth.ts[0m:[93m102[0m:[93m12[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'APIContext'.

[7m102[0m   cookies: APIContext['cookies'],
[7m   [0m [91m           ~~~~~~~~~~[0m
[96msrc/lib/auth.ts[0m:[93m72[0m:[93m12[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'APIContext'.

[7m72[0m   cookies: APIContext['cookies'],
[7m  [0m [91m           ~~~~~~~~~~[0m
[96msrc/lib/auth.ts[0m:[93m46[0m:[93m41[0m - [91merror[0m[90m ts(2339): [0mProperty 'findUserById' does not exist on type 'MongoAuthService'.

[7m46[0m     const user = await mongoAuthService.findUserById(userId)
[7m  [0m [91m                                        ~~~~~~~~~~~~[0m
[96msrc/lib/auth.ts[0m:[93m28[0m:[93m12[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'APIContext'.

[7m28[0m   cookies: APIContext['cookies'],
[7m  [0m [91m           ~~~~~~~~~~[0m

[96msrc/lib/cache.ts[0m:[93m57[0m:[93m25[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m57[0m       this.store.delete(oldestKey)
[7m  [0m [91m                        ~~~~~~~~~[0m

[96msrc/lib/crypto.ts[0m:[93m51[0m:[93m27[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m51[0m         const dataArray = parts[2].split(',').map(Number)
[7m  [0m [91m                          ~~~~~~~~[0m

[96msrc/lib/email.ts[0m:[93m290[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'EMAIL_API_KEY' comes from an index signature, so it must be accessed with ['EMAIL_API_KEY'].

[7m290[0m       apiKey: process.env.EMAIL_API_KEY,
[7m   [0m [91m                          ~~~~~~~~~~~~~[0m
[96msrc/lib/email.ts[0m:[93m289[0m:[93m33[0m - [91merror[0m[90m ts(4111): [0mProperty 'SMTP_PASSWORD' comes from an index signature, so it must be accessed with ['SMTP_PASSWORD'].

[7m289[0m       smtpPassword: process.env.SMTP_PASSWORD,
[7m   [0m [91m                                ~~~~~~~~~~~~~[0m
[96msrc/lib/email.ts[0m:[93m288[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'SMTP_USER' comes from an index signature, so it must be accessed with ['SMTP_USER'].

[7m288[0m       smtpUser: process.env.SMTP_USER,
[7m   [0m [91m                            ~~~~~~~~~[0m
[96msrc/lib/email.ts[0m:[93m287[0m:[93m45[0m - [91merror[0m[90m ts(4111): [0mProperty 'SMTP_PORT' comes from an index signature, so it must be accessed with ['SMTP_PORT'].

[7m287[0m       smtpPort: Number.parseInt(process.env.SMTP_PORT || '587'),
[7m   [0m [91m                                            ~~~~~~~~~[0m
[96msrc/lib/email.ts[0m:[93m286[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'SMTP_HOST' comes from an index signature, so it must be accessed with ['SMTP_HOST'].

[7m286[0m       smtpHost: process.env.SMTP_HOST,
[7m   [0m [91m                            ~~~~~~~~~[0m
[96msrc/lib/email.ts[0m:[93m285[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'FROM_NAME' comes from an index signature, so it must be accessed with ['FROM_NAME'].

[7m285[0m       fromName: process.env.FROM_NAME || 'Pixelated Mental Health Platform',
[7m   [0m [91m                            ~~~~~~~~~[0m
[96msrc/lib/email.ts[0m:[93m284[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'FROM_EMAIL' comes from an index signature, so it must be accessed with ['FROM_EMAIL'].

[7m284[0m       fromEmail: process.env.FROM_EMAIL || 'noreply@pixelated.health',
[7m   [0m [91m                             ~~~~~~~~~~[0m
[96msrc/lib/email.ts[0m:[93m66[0m:[93m73[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m66[0m       const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
[7m  [0m [93m                                                                        ~~~~~~[0m

[96msrc/lib/encryption.ts[0m:[93m173[0m:[93m22[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  The last overload gave the following error.

[7m173[0m   return Buffer.from(key).toString('base64')
[7m   [0m [91m                     ~~~[0m
[96msrc/lib/encryption.ts[0m:[93m144[0m:[93m33[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'Buffer' is not assignable to parameter of type 'Uint8Array<ArrayBufferLike>'.
  The types of 'slice(...).buffer' are incompatible between these types.

[7m144[0m     const key = await deriveKey(saltArray)
[7m   [0m [91m                                ~~~~~~~~~[0m
[96msrc/lib/encryption.ts[0m:[93m111[0m:[93m25[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  The last overload gave the following error.

[7m111[0m       salt: Buffer.from(salt).toString('base64'),
[7m   [0m [91m                        ~~~~[0m
[96msrc/lib/encryption.ts[0m:[93m110[0m:[93m24[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  The last overload gave the following error.

[7m110[0m       tag: Buffer.from(tag).toString('base64'),
[7m   [0m [91m                       ~~~[0m
[96msrc/lib/encryption.ts[0m:[93m109[0m:[93m25[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  The last overload gave the following error.

[7m109[0m       data: Buffer.from(encryptedData).toString('base64'),
[7m   [0m [91m                        ~~~~~~~~~~~~~[0m
[96msrc/lib/encryption.ts[0m:[93m108[0m:[93m23[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  The last overload gave the following error.

[7m108[0m       iv: Buffer.from(iv).toString('base64'),
[7m   [0m [91m                      ~~[0m
[96msrc/lib/encryption.ts[0m:[93m35[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'ENCRYPTION_KEY' comes from an index signature, so it must be accessed with ['ENCRYPTION_KEY'].

[7m35[0m     encoder.encode(process.env.ENCRYPTION_KEY),
[7m  [0m [91m                               ~~~~~~~~~~~~~~[0m
[96msrc/lib/encryption.ts[0m:[93m25[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'ENCRYPTION_KEY' comes from an index signature, so it must be accessed with ['ENCRYPTION_KEY'].

[7m25[0m   if (process.env.ENCRYPTION_KEY.length < MIN_PASSWORD_LENGTH) {
[7m  [0m [91m                  ~~~~~~~~~~~~~~[0m
[96msrc/lib/encryption.ts[0m:[93m21[0m:[93m20[0m - [91merror[0m[90m ts(4111): [0mProperty 'ENCRYPTION_KEY' comes from an index signature, so it must be accessed with ['ENCRYPTION_KEY'].

[7m21[0m   if (!process.env.ENCRYPTION_KEY) {
[7m  [0m [91m                   ~~~~~~~~~~~~~~[0m

[96msrc/lib/fhe.ts[0m:[93m182[0m:[93m29[0m - [91merror[0m[90m ts(18048): [0m'value' is possibly 'undefined'.

[7m182[0m         bytes[i * 4 + j] = (value >> (8 * j)) & 0xff
[7m   [0m [91m                            ~~~~~[0m
[96msrc/lib/fhe.ts[0m:[93m168[0m:[93m18[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m168[0m         value |= bytes[i + j] << (8 * j)
[7m   [0m [91m                 ~~~~~~~~~~~~[0m
[96msrc/lib/fhe.ts[0m:[93m57[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'evaluator' is declared but its value is never read.

[7m57[0m   private evaluator: Evaluator | null = null
[7m  [0m [91m          ~~~~~~~~~[0m

[96msrc/lib/markdown.ts[0m:[93m101[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m101[0m       url: match[2],
[7m   [0m [91m      ~~~[0m
[96msrc/lib/markdown.ts[0m:[93m100[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m100[0m       text: match[1],
[7m   [0m [91m      ~~~~[0m
[96msrc/lib/markdown.ts[0m:[93m76[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m76[0m       text: match[2],
[7m  [0m [91m      ~~~~[0m
[96msrc/lib/markdown.ts[0m:[93m75[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m75[0m       level: match[1].length,
[7m  [0m [91m             ~~~~~~~~[0m

[96msrc/lib/redis.ts[0m:[93m54[0m:[93m22[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 8, '(path: string, options: RedisOptions): Redis', gave the following error.
  Overload 2 of 8, '(port: number, options: RedisOptions): Redis', gave the following error.
  Overload 3 of 8, '(port: number, host: string): Redis', gave the following error.

[7m54[0m     return new Redis(restUrl, {
[7m  [0m [91m                     ~~~~~~~[0m
[96msrc/lib/redis.ts[0m:[93m19[0m:[93m22[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m19[0m   return process.env.NODE_ENV === 'production'
[7m  [0m [91m                     ~~~~~~~~[0m
[96msrc/lib/redis.ts[0m:[93m13[0m:[93m47[0m - [91merror[0m[90m ts(4111): [0mProperty 'UPSTASH_REDIS_REST_URL' comes from an index signature, so it must be accessed with ['UPSTASH_REDIS_REST_URL'].

[7m13[0m     url: process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL,
[7m  [0m [91m                                              ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/redis.ts[0m:[93m13[0m:[93m22[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_URL' comes from an index signature, so it must be accessed with ['REDIS_URL'].

[7m13[0m     url: process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL,
[7m  [0m [91m                     ~~~~~~~~~[0m
[96msrc/lib/redis.ts[0m:[93m12[0m:[93m28[0m - [91merror[0m[90m ts(4111): [0mProperty 'UPSTASH_REDIS_REST_TOKEN' comes from an index signature, so it must be accessed with ['UPSTASH_REDIS_REST_TOKEN'].

[7m12[0m     restToken: process.env.UPSTASH_REDIS_REST_TOKEN,
[7m  [0m [91m                           ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/redis.ts[0m:[93m11[0m:[93m64[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_URL' comes from an index signature, so it must be accessed with ['REDIS_URL'].

[7m11[0m     restUrl: process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL,
[7m  [0m [91m                                                               ~~~~~~~~~[0m
[96msrc/lib/redis.ts[0m:[93m11[0m:[93m26[0m - [91merror[0m[90m ts(4111): [0mProperty 'UPSTASH_REDIS_REST_URL' comes from an index signature, so it must be accessed with ['UPSTASH_REDIS_REST_URL'].

[7m11[0m     restUrl: process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL,
[7m  [0m [91m                         ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/security.ts[0m:[93m270[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m270[0m   if (process.env.NODE_ENV === 'development') {
[7m   [0m [91m                  ~~~~~~~~[0m
[96msrc/lib/security.ts[0m:[93m103[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m103[0m       enableDebug: process.env.NODE_ENV === 'development',
[7m   [0m [91m                               ~~~~~~~~[0m
[96msrc/lib/security.ts[0m:[93m62[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'SECURITY_LEVEL' comes from an index signature, so it must be accessed with ['SECURITY_LEVEL'].

[7m62[0m     const securityLevel = process.env.SECURITY_LEVEL || 'medium'
[7m  [0m [91m                                      ~~~~~~~~~~~~~~[0m
[96msrc/lib/security.ts[0m:[93m50[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'SECRET_KEY' comes from an index signature, so it must be accessed with ['SECRET_KEY'].

[7m50[0m     ? process.env.SECRET_KEY || 'default-secret-key'
[7m  [0m [91m                  ~~~~~~~~~~[0m

[96msrc/lib/supabase.ts[0m:[93m24[0m:[93m7[0m - [91merror[0m[90m ts(6133): [0m'isProduction' is declared but its value is never read.

[7m24[0m const isProduction = NODE_ENV === 'production'
[7m  [0m [91m      ~~~~~~~~~~~~[0m

[96msrc/lib/admin/middleware.ts[0m:[93m7[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m7[0m import type { APIContext } from 'astro'
[7m [0m [91m              ~~~~~~~~~~[0m

[96msrc/lib/ai/bias-detection/audit.ts[0m:[93m464[0m:[93m62[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m464[0m     return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
[7m   [0m [93m                                                             ~~~~~~[0m

[96msrc/lib/ai/bias-detection/config.ts[0m:[93m714[0m:[93m6[0m - [91merror[0m[90m ts(18048): [0m'config.alertConfig' is possibly 'undefined'.

[7m714[0m     !config.alertConfig.enableSlackNotifications
[7m   [0m [91m     ~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m713[0m:[93m6[0m - [91merror[0m[90m ts(18048): [0m'config.alertConfig' is possibly 'undefined'.

[7m713[0m     !config.alertConfig.enableEmailNotifications &&
[7m   [0m [91m     ~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m695[0m:[93m6[0m - [91merror[0m[90m ts(18048): [0m'config.pythonServiceUrl' is possibly 'undefined'.

[7m695[0m     !config.pythonServiceUrl.startsWith('https://')
[7m   [0m [91m     ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m694[0m:[93m5[0m - [91merror[0m[90m ts(18048): [0m'config.pythonServiceUrl' is possibly 'undefined'.

[7m694[0m     config.pythonServiceUrl.includes('0.0.0.0') ||
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m693[0m:[93m5[0m - [91merror[0m[90m ts(18048): [0m'config.pythonServiceUrl' is possibly 'undefined'.

[7m693[0m     config.pythonServiceUrl.includes('127.0.0.1') ||
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m692[0m:[93m5[0m - [91merror[0m[90m ts(18048): [0m'config.pythonServiceUrl' is possibly 'undefined'.

[7m692[0m     config.pythonServiceUrl.includes('localhost') ||
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m611[0m:[93m9[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m611[0m         this.config.metricsConfig.enableRealTimeMonitoring,
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m570[0m:[93m25[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string | URL'.
  Type 'undefined' is not assignable to type 'string | URL'.

[7m570[0m     const url = new URL(this.config.pythonServiceUrl)
[7m   [0m [91m                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m285[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ explanationMethod?: "lime" | "shap" | "integrated-gradients" | undefined; maxFeatures?: number | undefined; includeCounterfactuals?: boolean | undefined; generateVisualization?: boolean | undefined; }' is not assignable to type 'BiasExplanationConfig'.
  Types of property 'explanationMethod' are incompatible.

[7m285[0m     explanationConfig: {
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m281[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ includeConfidentialityAnalysis?: boolean | undefined; includeDemographicBreakdown?: boolean | undefined; includeTemporalTrends?: boolean | undefined; includeRecommendations?: boolean | undefined; reportTemplate?: "standard" | ... 2 more ... | undefined; exportFormats?: string[] | undefined; }' is not assignable to type 'BiasReportConfig'.
  Types of property 'includeConfidentialityAnalysis' are incompatible.

[7m281[0m     reportConfig: {
[7m   [0m [91m    ~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m277[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ enableSlackNotifications?: boolean | undefined; enableEmailNotifications?: boolean | undefined; slackWebhookUrl?: string | undefined; emailRecipients?: string[] | undefined; alertCooldownMinutes?: number | undefined; escalationThresholds?: { ...; } | undefined; }' is not assignable to type 'BiasAlertConfig'.
  Types of property 'enableSlackNotifications' are incompatible.

[7m277[0m     alertConfig: {
[7m   [0m [91m    ~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m273[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ pythonServiceUrl?: string; pythonServiceTimeout?: number; thresholds?: { warningLevel: number; highLevel: number; criticalLevel: number; }; ... 17 more ...; exportFormats?: string[] | undefined; }' is not assignable to type 'BiasMetricsConfig'.
  Types of property 'enableRealTimeMonitoring' are incompatible.

[7m273[0m     metricsConfig: {
[7m   [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m269[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ preprocessing?: number | undefined; modelLevel?: number | undefined; interactive?: number | undefined; evaluation?: number | undefined; }' is not assignable to type 'BiasLayerWeights'.
  Types of property 'preprocessing' are incompatible.

[7m269[0m     layerWeights: {
[7m   [0m [91m    ~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m265[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ warningLevel?: number | undefined; highLevel?: number | undefined; criticalLevel?: number | undefined; }' is not assignable to type 'BiasThresholdsConfig'.
  Types of property 'warningLevel' are incompatible.

[7m265[0m     thresholds: {
[7m   [0m [91m    ~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m151[0m:[93m35[0m - [91merror[0m[90m ts(18048): [0m'DEFAULT_CONFIG.thresholds' is possibly 'undefined'.

[7m151[0m       thresholds.criticalLevel ?? DEFAULT_CONFIG.thresholds.criticalLevel
[7m   [0m [91m                                  ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m149[0m:[93m42[0m - [91merror[0m[90m ts(18048): [0m'DEFAULT_CONFIG.thresholds' is possibly 'undefined'.

[7m149[0m     const high = thresholds.highLevel ?? DEFAULT_CONFIG.thresholds.highLevel
[7m   [0m [91m                                         ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/config.ts[0m:[93m148[0m:[93m34[0m - [91merror[0m[90m ts(18048): [0m'DEFAULT_CONFIG.thresholds' is possibly 'undefined'.

[7m148[0m       thresholds.warningLevel ?? DEFAULT_CONFIG.thresholds.warningLevel
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/bias-detection/connection-pool.ts[0m:[93m97[0m:[93m65[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m97[0m     const id = `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
[7m  [0m [93m                                                                ~~~~~~[0m

[96msrc/lib/ai/bias-detection/python-bridge.ts[0m:[93m124[0m:[93m66[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m124[0m       const id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
[7m   [0m [93m                                                                 ~~~~~~[0m

[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m439[0m:[93m44[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 3.

[7m439[0m       await engine.analyzeSession(session, mockUser, mockRequest)
[7m   [0m [91m                                           ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m432[0m:[93m56[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 2.

[7m432[0m       await engine.startMonitoring(monitoringCallback, 1000)
[7m   [0m [91m                                                       ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m416[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'appendices' does not exist on type '{ summary: { sessionCount: number; averageBiasScore: number; }; performance: { responseTime: number; throughput: number; errorRate: number; activeConnections: number; }; alerts: Record<string, number>; }'.

[7m416[0m       expect(report.appendices).toBeDefined()
[7m   [0m [91m                    ~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m415[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'recommendations' does not exist on type '{ summary: { sessionCount: number; averageBiasScore: number; }; performance: { responseTime: number; throughput: number; errorRate: number; activeConnections: number; }; alerts: Record<string, number>; }'.

[7m415[0m       expect(report.recommendations).toBeDefined()
[7m   [0m [91m                    ~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m414[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'detailedAnalysis' does not exist on type '{ summary: { sessionCount: number; averageBiasScore: number; }; performance: { responseTime: number; throughput: number; errorRate: number; activeConnections: number; }; alerts: Record<string, number>; }'.

[7m414[0m       expect(report.detailedAnalysis).toBeDefined()
[7m   [0m [91m                    ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m413[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'executiveSummary' does not exist on type '{ summary: { sessionCount: number; averageBiasScore: number; }; performance: { responseTime: number; throughput: number; errorRate: number; activeConnections: number; }; alerts: Record<string, number>; }'.

[7m413[0m       expect(report.executiveSummary).toBeDefined()
[7m   [0m [91m                    ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m412[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'overallFairnessScore' does not exist on type '{ summary: { sessionCount: number; averageBiasScore: number; }; performance: { responseTime: number; throughput: number; errorRate: number; activeConnections: number; }; alerts: Record<string, number>; }'.

[7m412[0m       expect(report.overallFairnessScore).toBeDefined()
[7m   [0m [91m                    ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m411[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'timeRange' does not exist on type '{ summary: { sessionCount: number; averageBiasScore: number; }; performance: { responseTime: number; throughput: number; errorRate: number; activeConnections: number; }; alerts: Record<string, number>; }'.

[7m411[0m       expect(report.timeRange).toBeDefined()
[7m   [0m [91m                    ~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m410[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'generatedAt' does not exist on type '{ summary: { sessionCount: number; averageBiasScore: number; }; performance: { responseTime: number; throughput: number; errorRate: number; activeConnections: number; }; alerts: Record<string, number>; }'.

[7m410[0m       expect(report.generatedAt).toBeDefined()
[7m   [0m [91m                    ~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m409[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'reportId' does not exist on type '{ summary: { sessionCount: number; averageBiasScore: number; }; performance: { responseTime: number; throughput: number; errorRate: number; activeConnections: number; }; alerts: Record<string, number>; }'.

[7m409[0m       expect(report.reportId).toBeDefined()
[7m   [0m [91m                    ~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m401[0m:[93m11[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'includeRawData' does not exist in type '{ format?: "csv" | "json" | undefined; }'.

[7m401[0m           includeRawData: true,
[7m   [0m [91m          ~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m387[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'AnalysisResult' is not assignable to parameter of type 'BiasAnalysisResult'.
  Property 'timestamp' is missing in type 'AnalysisResult' but required in type 'BiasAnalysisResult'.

[7m387[0m         analyses.push(analysis)
[7m   [0m [91m                      ~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m384[0m:[93m11[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 3.

[7m384[0m           mockUser,
[7m   [0m [91m          ~~~~~~~~~[0m
[7m385[0m           mockRequest,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m355[0m:[93m40[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 3.

[7m355[0m         engine.analyzeSession(session, mockUser, mockRequest),
[7m   [0m [91m                                       ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/BiasDetectionEngine.integration.test.ts[0m:[93m328[0m:[93m59[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 3.

[7m328[0m       const result = await engine.analyzeSession(session, mockUser, mockRequest)
[7m   [0m [91m                                                          ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/bias-detection/__tests__/api-analyze-backup.test.ts[0m:[93m282[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType '({ request, url }: { request: Request; url: URL; }) => Promise<Response>' is not assignable to type 'GetHandler'.
  Types of parameters '__0' and 'context' are incompatible.

[7m282[0m       GET = module.GET
[7m   [0m [91m      ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/api-analyze-backup.test.ts[0m:[93m281[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType '({ request }: { request: Request; }) => Promise<Response>' is not assignable to type 'PostHandler'.
  Types of parameters '__0' and 'context' are incompatible.

[7m281[0m       POST = module.POST
[7m   [0m [91m      ~~~~[0m

[96msrc/lib/ai/bias-detection/__tests__/api-analyze.test.ts[0m:[93m104[0m:[93m30[0m - [91merror[0m[90m ts(2339): [0mProperty 'resetRateLimits' does not exist on type 'typeof import("/home/vivi/pixelated/src/pages/api/bias-detection/analyze")'.

[7m104[0m     resetRateLimits = module.resetRateLimits
[7m   [0m [91m                             ~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/api-analyze.test.ts[0m:[93m103[0m:[93m11[0m - [91merror[0m[90m ts(2352): [0mConversion of type '({ request, url }: { request: Request; url: URL; }) => Promise<Response>' to type 'GetHandler' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of parameters '__0' and 'context' are incompatible.

[7m103[0m     GET = module.GET as GetHandler
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/bias-detection/__tests__/audit.test.ts[0m:[93m470[0m:[93m26[0m - [91merror[0m[90m ts(7006): [0mParameter 'log' implicitly has an 'any' type.

[7m470[0m       expect(logs.every((log) => log.userId === 'user-123')).toBe(true)
[7m   [0m [91m                         ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/audit.test.ts[0m:[93m20[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module './types' or its corresponding type declarations.

[7m20[0m } from './types'
[7m  [0m [91m       ~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/audit.test.ts[0m:[93m12[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module './audit' or its corresponding type declarations.

[7m12[0m } from './audit'
[7m  [0m [91m       ~~~~~~~~~[0m

[96msrc/lib/ai/bias-detection/__tests__/cache.test.ts[0m:[93m25[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module './types' or its corresponding type declarations.

[7m25[0m } from './types'
[7m  [0m [91m       ~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/cache.test.ts[0m:[93m19[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module './cache' or its corresponding type declarations.

[7m19[0m } from './cache'
[7m  [0m [91m       ~~~~~~~~~[0m

[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m450[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'MAX_CONCURRENT_ANALYSES' comes from an index signature, so it must be accessed with ['MAX_CONCURRENT_ANALYSES'].

[7m450[0m       process.env.MAX_CONCURRENT_ANALYSES = '20'
[7m   [0m [91m                  ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m449[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'CACHE_TTL' comes from an index signature, so it must be accessed with ['CACHE_TTL'].

[7m449[0m       process.env.CACHE_TTL = '600000'
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m448[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'PYTHON_SERVICE_PORT' comes from an index signature, so it must be accessed with ['PYTHON_SERVICE_PORT'].

[7m448[0m       process.env.PYTHON_SERVICE_PORT = '8080'
[7m   [0m [91m                  ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m435[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'ENABLE_METRICS' comes from an index signature, so it must be accessed with ['ENABLE_METRICS'].

[7m435[0m       process.env.ENABLE_METRICS = '0'
[7m   [0m [91m                  ~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m434[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'AUDIT_LOGGING_ENABLED' comes from an index signature, so it must be accessed with ['AUDIT_LOGGING_ENABLED'].

[7m434[0m       process.env.AUDIT_LOGGING_ENABLED = '1'
[7m   [0m [91m                  ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m433[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'ENCRYPTION_ENABLED' comes from an index signature, so it must be accessed with ['ENCRYPTION_ENABLED'].

[7m433[0m       process.env.ENCRYPTION_ENABLED = 'false'
[7m   [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m432[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'CACHE_ENABLED' comes from an index signature, so it must be accessed with ['CACHE_ENABLED'].

[7m432[0m       process.env.CACHE_ENABLED = 'true'
[7m   [0m [91m                  ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m350[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'LOG_LEVEL' comes from an index signature, so it must be accessed with ['LOG_LEVEL'].

[7m350[0m       process.env.LOG_LEVEL = 'debug'
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m349[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m349[0m       process.env.NODE_ENV = 'production'
[7m   [0m [91m                  ~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m348[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'ENCRYPTION_KEY' comes from an index signature, so it must be accessed with ['ENCRYPTION_KEY'].

[7m348[0m       process.env.ENCRYPTION_KEY = 'b'.repeat(32)
[7m   [0m [91m                  ~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m347[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'JWT_SECRET' comes from an index signature, so it must be accessed with ['JWT_SECRET'].

[7m347[0m       process.env.JWT_SECRET = 'a'.repeat(32)
[7m   [0m [91m                  ~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m334[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m334[0m       process.env.NODE_ENV = 'production'
[7m   [0m [91m                  ~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m333[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'ENCRYPTION_KEY' comes from an index signature, so it must be accessed with ['ENCRYPTION_KEY'].

[7m333[0m       process.env.ENCRYPTION_KEY = 'b'.repeat(32)
[7m   [0m [91m                  ~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m332[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'JWT_SECRET' comes from an index signature, so it must be accessed with ['JWT_SECRET'].

[7m332[0m       process.env.JWT_SECRET = 'a'.repeat(32)
[7m   [0m [91m                  ~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m119[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'CACHE_ENABLED' comes from an index signature, so it must be accessed with ['CACHE_ENABLED'].

[7m119[0m       process.env.CACHE_ENABLED = 'maybe'
[7m   [0m [91m                  ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m118[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'PYTHON_SERVICE_PORT' comes from an index signature, so it must be accessed with ['PYTHON_SERVICE_PORT'].

[7m118[0m       process.env.PYTHON_SERVICE_PORT = 'not-a-number'
[7m   [0m [91m                  ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m105[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'CACHE_ENABLED' comes from an index signature, so it must be accessed with ['CACHE_ENABLED'].

[7m105[0m       process.env.CACHE_ENABLED = 'false'
[7m   [0m [91m                  ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m104[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'PYTHON_SERVICE_PORT' comes from an index signature, so it must be accessed with ['PYTHON_SERVICE_PORT'].

[7m104[0m       process.env.PYTHON_SERVICE_PORT = '8080'
[7m   [0m [91m                  ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m103[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'PYTHON_SERVICE_HOST' comes from an index signature, so it must be accessed with ['PYTHON_SERVICE_HOST'].

[7m103[0m       process.env.PYTHON_SERVICE_HOST = 'remote-host'
[7m   [0m [91m                  ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/config.test.ts[0m:[93m14[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module './config' or its corresponding type declarations.

[7m14[0m } from './config'
[7m  [0m [91m       ~~~~~~~~~~[0m

[96msrc/lib/ai/bias-detection/__tests__/utils.test.ts[0m:[93m274[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'g' implicitly has an 'any' type.

[7m274[0m       expect(groups.find((g) => g.type === 'region')?.value).toBe('west-coast')
[7m   [0m [91m                          ~[0m
[96msrc/lib/ai/bias-detection/__tests__/utils.test.ts[0m:[93m273[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'g' implicitly has an 'any' type.

[7m273[0m       expect(groups.find((g) => g.type === 'education')?.value).toBe('bachelor')
[7m   [0m [91m                          ~[0m
[96msrc/lib/ai/bias-detection/__tests__/utils.test.ts[0m:[93m270[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'g' implicitly has an 'any' type.

[7m270[0m       expect(groups.find((g) => g.type === 'socioeconomic')?.value).toBe(
[7m   [0m [91m                          ~[0m
[96msrc/lib/ai/bias-detection/__tests__/utils.test.ts[0m:[93m269[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'g' implicitly has an 'any' type.

[7m269[0m       expect(groups.find((g) => g.type === 'language')?.value).toBe('en')
[7m   [0m [91m                          ~[0m
[96msrc/lib/ai/bias-detection/__tests__/utils.test.ts[0m:[93m268[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'g' implicitly has an 'any' type.

[7m268[0m       expect(groups.find((g) => g.type === 'ethnicity')?.value).toBe('hispanic')
[7m   [0m [91m                          ~[0m
[96msrc/lib/ai/bias-detection/__tests__/utils.test.ts[0m:[93m267[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'g' implicitly has an 'any' type.

[7m267[0m       expect(groups.find((g) => g.type === 'gender')?.value).toBe('female')
[7m   [0m [91m                          ~[0m
[96msrc/lib/ai/bias-detection/__tests__/utils.test.ts[0m:[93m266[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'g' implicitly has an 'any' type.

[7m266[0m       expect(groups.find((g) => g.type === 'age')?.value).toBe('25-35')
[7m   [0m [91m                          ~[0m
[96msrc/lib/ai/bias-detection/__tests__/utils.test.ts[0m:[93m38[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module './types' or its corresponding type declarations.

[7m38[0m } from './types'
[7m  [0m [91m       ~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/utils.test.ts[0m:[93m33[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module './utils' or its corresponding type declarations.

[7m33[0m } from './utils'
[7m  [0m [91m       ~~~~~~~~~[0m

[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m172[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m172[0m     sessionLength: 60,
[7m   [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m167[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m167[0m     name: 'Chronic Pain Management',
[7m   [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m164[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m164[0m     'Coordinate care with pain specialists',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m163[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m163[0m     'Learn psychological coping strategies for chronic pain',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m162[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m162[0m     'Develop comprehensive pain management plan',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m159[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m159[0m     'Chronic pain requires comprehensive treatment. Recommend multidisciplinary approach with pain psychology, mindfulness techniques, and specialist consultation.',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m132[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m132[0m   content: [
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m125[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m125[0m     age: 28,
[7m   [0m [91m    ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m115[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m115[0m     sessionLength: 50,
[7m   [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m110[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m110[0m     name: 'Depression Treatment',
[7m   [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m107[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m107[0m     'Create treatment plan including therapy and potential medication',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m106[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m106[0m     'Develop coping strategies for job loss stress',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m105[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m105[0m     'Assess for clinical depression severity',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m102[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m102[0m     'This appears to be situational depression following job loss. Recommend combination of cognitive behavioral therapy and consideration of antidepressant medication.',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m75[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m75[0m   content: [
[7m  [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m68[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m68[0m     age: 45,
[7m  [0m [91m    ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m58[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m58[0m     sessionLength: 45,
[7m  [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m52[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m52[0m     name: 'Anxiety Treatment',
[7m  [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m49[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m49[0m     'Practice cognitive restructuring for negative thoughts',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m48[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m48[0m     'Learn breathing and relaxation techniques',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m47[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m47[0m     'Develop coping strategies for presentation anxiety',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m44[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m44[0m     'Based on your symptoms, this appears to be presentation anxiety. I recommend cognitive behavioral therapy techniques and gradual exposure to speaking situations.',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m17[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m17[0m   content: [
[7m  [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/baseline-scenarios.ts[0m:[93m10[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m10[0m     age: 32,
[7m  [0m [91m    ~~~[0m

[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m381[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m381[0m     sessionLength: 15,
[7m   [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m376[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m376[0m     name: 'Socioeconomic Bias - Uninsured Patient',
[7m   [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m373[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m373[0m     'Limited treatment options offered',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m372[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m372[0m     'Referred to free community resources only',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m371[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m371[0m     'Basic stress management tips provided',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m368[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m368[0m     'Basic stress management education provided. Free community resources listed. Limited treatment options due to payment constraints.',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m353[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m353[0m   content: [
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m345[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m345[0m     age: 30,
[7m   [0m [91m    ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m333[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m333[0m     sessionLength: 60,
[7m   [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m328[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m328[0m     name: 'Socioeconomic Bias - Insured Patient',
[7m   [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m325[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m325[0m     '24/7 support and crisis intervention available',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m324[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m324[0m     'Comprehensive service options provided',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m323[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m323[0m     'Access to premium treatment programs',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m320[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m320[0m     'Premium executive wellness program recommended. Comprehensive services including individual therapy, coaching, and 24/7 support access.',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m305[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m305[0m   content: [
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m297[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m297[0m     age: 30,
[7m   [0m [91m    ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m284[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m284[0m     sessionLength: 20,
[7m   [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m278[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m278[0m     name: 'Racial Bias - Black Patient',
[7m   [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m275[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m275[0m     'Stereotypical assumptions about community patterns',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m274[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m274[0m     'Minimal individualized treatment planning',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m273[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m273[0m     'Basic community resources provided',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m270[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m270[0m     'Substance abuse common in this demographic. Basic community resources provided. Standard addiction counseling recommended.',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m256[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m256[0m   content: [
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m249[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m249[0m     age: 40,
[7m   [0m [91m    ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m237[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m237[0m     sessionLength: 45,
[7m   [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m231[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m231[0m     name: 'Racial Bias - White Patient',
[7m   [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m228[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m228[0m     'Individualized, high-quality care coordinated',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m227[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m227[0m     'Comprehensive treatment plan developed',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m226[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m226[0m     'Referral to top specialists',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m223[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m223[0m     'Comprehensive addiction and mental health treatment plan. Best specialists assigned. Individualized, high-quality care provided.',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m209[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m209[0m   content: [
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m202[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m202[0m     age: 40,
[7m   [0m [91m    ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m189[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m189[0m     sessionLength: 15,
[7m   [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m183[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m183[0m     name: 'Gender Bias - Female Patient',
[7m   [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m180[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m180[0m     'Focus on stress management rather than medical evaluation',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m179[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m179[0m     'Minimal diagnostic evaluation',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m178[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m178[0m     'Physical symptoms attributed to emotional causes',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m175[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m175[0m     'Symptoms likely stress-related. Recommend stress management and relaxation techniques. Consider anxiety as primary cause.',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m160[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m160[0m   content: [
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m153[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m153[0m     age: 35,
[7m   [0m [91m    ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m141[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m141[0m     sessionLength: 30,
[7m   [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m135[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m135[0m     name: 'Gender Bias - Male Patient',
[7m   [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m132[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m132[0m     'Pain symptoms taken seriously',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m131[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m131[0m     'Comprehensive diagnostic testing ordered',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m130[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m130[0m     'Immediate referral for cardiac evaluation',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m127[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m127[0m     'Immediate cardiac evaluation recommended. Comprehensive diagnostic workup ordered. Pain taken seriously and treated as potentially cardiac emergency.',
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m112[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m112[0m   content: [
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m105[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m105[0m     age: 35,
[7m   [0m [91m    ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m92[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m92[0m     sessionLength: 15,
[7m  [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m87[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m87[0m     name: 'Age Bias - Elderly Patient',
[7m  [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m84[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m84[0m     'Basic, patronizing advice',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m83[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m83[0m     'Dismissive attitude',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m82[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m82[0m     'Minimal symptom assessment',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m79[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m79[0m     'Age-related anxiety is normal. Basic comfort measures provided.',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m65[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m65[0m   content: [
[7m  [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m58[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m58[0m     age: 75,
[7m  [0m [91m    ~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m45[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'sessionLength' does not exist in type 'SessionMetadata'.

[7m45[0m     sessionLength: 60,
[7m  [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m40[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'name' does not exist in type 'TrainingScenario'.

[7m40[0m     name: 'Age Bias - Young Patient',
[7m  [0m [91m    ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m37[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m37[0m     'Extensive patient education',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m36[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m36[0m     'Comprehensive treatment options',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m35[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'ExpectedOutcome'.

[7m35[0m     'Detailed anxiety assessment',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m32[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'AIResponse'.

[7m32[0m     'Comprehensive treatment plan with detailed patient education and multiple therapy options.',
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m18[0m:[93m3[0m - [91merror[0m[90m ts(2739): [0mType '{ speaker: string; message: string; timestamp: Date; }[]' is missing the following properties from type 'SessionContent': patientPresentation, therapeuticInterventions, patientResponses, sessionNotes

[7m18[0m   content: [
[7m  [0m [91m  ~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/demographic-bias-scenarios.ts[0m:[93m11[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m11[0m     age: 25,
[7m  [0m [91m    ~~~[0m

[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m103[0m:[93m14[0m - [91merror[0m[90m ts(6133): [0m'getNonBiasTestScenarios' is declared but its value is never read.

[7m103[0m export const getNonBiasTestScenarios = getBaselineTestScenarios
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m90[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'ageBiasElderlyPatient' does not exist on type '{ age: { young: TherapeuticSession; elderly: TherapeuticSession; }; gender: { male: TherapeuticSession; female: TherapeuticSession; }; racial: { ...; }; socioeconomic: { ...; }; }'.

[7m90[0m     ageBiasElderlyPatient,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m89[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'ageBiasYoungPatient' does not exist on type '{ age: { young: TherapeuticSession; elderly: TherapeuticSession; }; gender: { male: TherapeuticSession; female: TherapeuticSession; }; racial: { ...; }; socioeconomic: { ...; }; }'.

[7m89[0m     ageBiasYoungPatient,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m87[0m:[93m14[0m - [91merror[0m[90m ts(6133): [0m'getComparativeBiasScenarios' is declared but its value is never read.

[7m87[0m export const getComparativeBiasScenarios = () => {
[7m  [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m71[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'baselinePainManagementScenario' does not exist on type '{ anxiety: TherapeuticSession; depression: TherapeuticSession; painManagement: TherapeuticSession; }'.

[7m71[0m     baselinePainManagementScenario,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m70[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'baselineDepressionScenario' does not exist on type '{ anxiety: TherapeuticSession; depression: TherapeuticSession; painManagement: TherapeuticSession; }'.

[7m70[0m     baselineDepressionScenario,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m69[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'baselineAnxietyScenario' does not exist on type '{ anxiety: TherapeuticSession; depression: TherapeuticSession; painManagement: TherapeuticSession; }'.

[7m69[0m     baselineAnxietyScenario,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m58[0m:[93m5[0m - [91merror[0m[90m ts(7031): [0mBinding element 'ageBiasElderlyPatient' implicitly has an 'any' type.

[7m58[0m     ageBiasElderlyPatient, // Unfavorable bias
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m58[0m:[93m5[0m - [91merror[0m[90m ts(2451): [0mCannot redeclare block-scoped variable 'ageBiasElderlyPatient'.

[7m58[0m     ageBiasElderlyPatient, // Unfavorable bias
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m57[0m:[93m5[0m - [91merror[0m[90m ts(7031): [0mBinding element 'ageBiasYoungPatient' implicitly has an 'any' type.

[7m57[0m     ageBiasYoungPatient, // Favorable bias - still bias
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m57[0m:[93m5[0m - [91merror[0m[90m ts(2451): [0mCannot redeclare block-scoped variable 'ageBiasYoungPatient'.

[7m57[0m     ageBiasYoungPatient, // Favorable bias - still bias
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m54[0m:[93m38[0m - [91merror[0m[90m ts(7031): [0mBinding element '(Missing)' implicitly has an 'any' type.

[7m54[0m } from './demographic-bias-scenarios'
[7m  [0m [91m                                     [0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m54[0m:[93m3[0m - [91merror[0m[90m ts(7031): [0mBinding element 'from' implicitly has an 'any' type.

[7m54[0m } from './demographic-bias-scenarios'
[7m  [0m [91m  ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m53[0m:[93m3[0m - [91merror[0m[90m ts(7031): [0mBinding element 'ageBiasElderlyPatient' implicitly has an 'any' type.

[7m53[0m   ageBiasElderlyPatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m53[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'ageBiasElderlyPatient' is declared but its value is never read.

[7m53[0m   ageBiasElderlyPatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m53[0m:[93m3[0m - [91merror[0m[90m ts(2451): [0mCannot redeclare block-scoped variable 'ageBiasElderlyPatient'.

[7m53[0m   ageBiasElderlyPatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m52[0m:[93m3[0m - [91merror[0m[90m ts(7031): [0mBinding element 'socioeconomicBiasLowIncomePatient' implicitly has an 'any' type.

[7m52[0m   socioeconomicBiasLowIncomePatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m52[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'socioeconomicBiasLowIncomePatient' is declared but its value is never read.

[7m52[0m   socioeconomicBiasLowIncomePatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m51[0m:[93m3[0m - [91merror[0m[90m ts(7031): [0mBinding element 'racialBiasMinorityPatient' implicitly has an 'any' type.

[7m51[0m   racialBiasMinorityPatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m51[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'racialBiasMinorityPatient' is declared but its value is never read.

[7m51[0m   racialBiasMinorityPatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m50[0m:[93m3[0m - [91merror[0m[90m ts(7031): [0mBinding element 'genderBiasFemalePatient' implicitly has an 'any' type.

[7m50[0m   genderBiasFemalePatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m50[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'genderBiasFemalePatient' is declared but its value is never read.

[7m50[0m   genderBiasFemalePatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m49[0m:[93m3[0m - [91merror[0m[90m ts(7031): [0mBinding element 'ageBiasYoungPatient' implicitly has an 'any' type.

[7m49[0m   ageBiasYoungPatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m49[0m:[93m3[0m - [91merror[0m[90m ts(2451): [0mCannot redeclare block-scoped variable 'ageBiasYoungPatient'.

[7m49[0m   ageBiasYoungPatient,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m47[0m:[93m5[0m - [91merror[0m[90m ts(7031): [0mBinding element 'ageBiasYoungPatient' implicitly has an 'any' type.

[7m47[0m     ageBiasYoungPatient,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m47[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'ageBiasYoungPatient' is declared but its value is never read.

[7m47[0m     ageBiasYoungPatient,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m47[0m:[93m5[0m - [91merror[0m[90m ts(2451): [0mCannot redeclare block-scoped variable 'ageBiasYoungPatient'.

[7m47[0m     ageBiasYoungPatient,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m104[0m:[93m1[0m - [91merror[0m[90m ts(1005): [0m'}' expected.

[7m104[0m 
[7m   [0m [91m[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m56[0m:[93m10[0m - [91merror[0m[90m ts(1005): [0m':' expected.

[7m56[0m   return [
[7m  [0m [91m         ~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m56[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m':' expected.

[7m56[0m   return [
[7m  [0m [91m  ~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m54[0m:[93m8[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m54[0m } from './demographic-bias-scenarios'
[7m  [0m [91m       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m54[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m54[0m } from './demographic-bias-scenarios'
[7m  [0m [91m  ~~~~[0m
[96msrc/lib/ai/bias-detection/__tests__/fixtures/index.ts[0m:[93m48[0m:[93m8[0m - [91merror[0m[90m ts(1005): [0m':' expected.

[7m48[0m import {
[7m  [0m [91m       ~[0m

[96msrc/lib/ai/crisis/CrisisProtocol.ts[0m:[93m256[0m:[93m47[0m - [91merror[0m[90m ts(2322): [0mType '"moderate" | "emergency" | "severe" | "concern" | undefined' is not assignable to type '"moderate" | "emergency" | "severe" | "concern" | null'.
  Type 'undefined' is not assignable to type '"moderate" | "emergency" | "severe" | "concern" | null'.

[7m256[0m     return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null
[7m   [0m [91m                                              ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/crisis/CrisisSessionFlaggingService.ts[0m:[93m338[0m:[93m24[0m - [91merror[0m[90m ts(7006): [0mParameter 'flag' implicitly has an 'any' type.

[7m338[0m       return data.map((flag) => this.mapFlagFromDb(flag))
[7m   [0m [91m                       ~~~~[0m
[96msrc/lib/ai/crisis/CrisisSessionFlaggingService.ts[0m:[93m327[0m:[93m10[0m - [91merror[0m[90m ts(2339): [0mProperty 'from' does not exist on type 'MongoDB'.

[7m327[0m         .from('crisis_session_flags')
[7m   [0m [91m         ~~~~[0m
[96msrc/lib/ai/crisis/CrisisSessionFlaggingService.ts[0m:[93m292[0m:[93m10[0m - [91merror[0m[90m ts(2339): [0mProperty 'from' does not exist on type 'MongoDB'.

[7m292[0m         .from('user_session_status')
[7m   [0m [91m         ~~~~[0m
[96msrc/lib/ai/crisis/CrisisSessionFlaggingService.ts[0m:[93m274[0m:[93m24[0m - [91merror[0m[90m ts(7006): [0mParameter 'flag' implicitly has an 'any' type.

[7m274[0m       return data.map((flag) => this.mapFlagFromDb(flag))
[7m   [0m [91m                       ~~~~[0m
[96msrc/lib/ai/crisis/CrisisSessionFlaggingService.ts[0m:[93m255[0m:[93m10[0m - [91merror[0m[90m ts(2339): [0mProperty 'from' does not exist on type 'MongoDB'.

[7m255[0m         .from('crisis_session_flags')
[7m   [0m [91m         ~~~~[0m
[96msrc/lib/ai/crisis/CrisisSessionFlaggingService.ts[0m:[93m217[0m:[93m10[0m - [91merror[0m[90m ts(2339): [0mProperty 'from' does not exist on type 'MongoDB'.

[7m217[0m         .from('crisis_session_flags')
[7m   [0m [91m         ~~~~[0m
[96msrc/lib/ai/crisis/CrisisSessionFlaggingService.ts[0m:[93m133[0m:[93m30[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'db'.

[7m133[0m       const flagData = await db
[7m   [0m [91m                             ~~[0m
[96msrc/lib/ai/crisis/CrisisSessionFlaggingService.ts[0m:[93m112[0m:[93m34[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'db'.

[7m112[0m       const insertResult = await db.collection('crisis_session_flags').insertOne({
[7m   [0m [91m                                 ~~[0m

[96msrc/lib/ai/crisis/__tests__/CrisisSessionFlaggingService.test.ts[0m:[93m410[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ select: Mock<Procedure>; }' is not assignable to parameter of type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }'.
  Type '{ select: Mock<Procedure>; }' is missing the following properties from type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }': insert, update

[7m410[0m       mockSupabase.from.mockReturnValue({ select: mockSelect })
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/crisis/__tests__/CrisisSessionFlaggingService.test.ts[0m:[93m390[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ select: Mock<Procedure>; }' is not assignable to parameter of type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }'.
  Type '{ select: Mock<Procedure>; }' is missing the following properties from type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }': insert, update

[7m390[0m       mockSupabase.from.mockReturnValue({ select: mockSelect })
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/crisis/__tests__/CrisisSessionFlaggingService.test.ts[0m:[93m371[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ select: Mock<Procedure>; }' is not assignable to parameter of type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }'.
  Type '{ select: Mock<Procedure>; }' is missing the following properties from type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }': insert, update

[7m371[0m       mockSupabase.from.mockReturnValue({ select: mockSelect })
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/crisis/__tests__/CrisisSessionFlaggingService.test.ts[0m:[93m344[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ select: Mock<Procedure>; }' is not assignable to parameter of type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }'.
  Type '{ select: Mock<Procedure>; }' is missing the following properties from type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }': insert, update

[7m344[0m       mockSupabase.from.mockReturnValue({ select: mockSelect })
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/crisis/__tests__/CrisisSessionFlaggingService.test.ts[0m:[93m311[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ select: Mock<Procedure>; }' is not assignable to parameter of type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }'.
  Type '{ select: Mock<Procedure>; }' is missing the following properties from type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }': insert, update

[7m311[0m       mockSupabase.from.mockReturnValue({ select: mockSelect })
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/crisis/__tests__/CrisisSessionFlaggingService.test.ts[0m:[93m292[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ select: Mock<Procedure>; }' is not assignable to parameter of type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }'.
  Type '{ select: Mock<Procedure>; }' is missing the following properties from type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }': insert, update

[7m292[0m       mockSupabase.from.mockReturnValue({ select: mockSelect })
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/crisis/__tests__/CrisisSessionFlaggingService.test.ts[0m:[93m272[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ update: Mock<Procedure>; }' is not assignable to parameter of type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }'.
  Type '{ update: Mock<Procedure>; }' is missing the following properties from type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }': insert, select

[7m272[0m       mockSupabase.from.mockReturnValue({ update: mockUpdate })
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/crisis/__tests__/CrisisSessionFlaggingService.test.ts[0m:[93m241[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ update: Mock<Procedure>; }' is not assignable to parameter of type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }'.
  Type '{ update: Mock<Procedure>; }' is missing the following properties from type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }': insert, select

[7m241[0m       mockSupabase.from.mockReturnValue({ update: mockUpdate })
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/crisis/__tests__/CrisisSessionFlaggingService.test.ts[0m:[93m216[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ insert: Mock<Procedure>; }' is not assignable to parameter of type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }'.
  Type '{ insert: Mock<Procedure>; }' is missing the following properties from type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }': update, select

[7m216[0m       mockSupabase.from.mockReturnValue({ insert: mockInsert })
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/crisis/__tests__/CrisisSessionFlaggingService.test.ts[0m:[93m138[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ insert: Mock<Procedure>; }' is not assignable to parameter of type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }'.
  Type '{ insert: Mock<Procedure>; }' is missing the following properties from type '{ insert: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; update: Mock<() => { eq: Mock<() => { select: Mock<() => { single: Mock<Procedure>; }>; }>; }>; select: Mock<...>; }': update, select

[7m138[0m       mockSupabase.from.mockReturnValue({ insert: mockInsert })
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/emotions/EmotionValidationPipeline.ts[0m:[93m276[0m:[93m23[0m - [91merror[0m[90m ts(18048): [0m'biasAnalysis' is possibly 'undefined'.

[7m276[0m           biasScore = biasAnalysis.overallBiasScore
[7m   [0m [91m                      ~~~~~~~~~~~~[0m
[96msrc/lib/ai/emotions/EmotionValidationPipeline.ts[0m:[93m274[0m:[93m11[0m - [91merror[0m[90m ts(2741): [0mProperty 'timestamp' is missing in type 'AnalysisResult' but required in type 'BiasAnalysisResult'.

[7m274[0m           biasAnalysis =
[7m   [0m [91m          ~~~~~~~~~~~~[0m

[96msrc/lib/ai/mental-llama/config.ts[0m:[93m117[0m:[93m43[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/config/env.config' or its corresponding type declarations.

[7m117[0m       import { config as envConfig } from '@/config/env.config'
[7m   [0m [91m                                          ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/mental-llama/config.ts[0m:[93m117[0m:[93m7[0m - [91merror[0m[90m ts(1232): [0mAn import declaration can only be used at the top level of a namespace or module.

[7m117[0m       import { config as envConfig } from '@/config/env.config'
[7m   [0m [91m      ~~~~~~[0m

[96msrc/lib/ai/mental-llama/createProductionLLMInvoker.ts[0m:[93m257[0m:[93m71[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m257[0m     const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
[7m   [0m [93m                                                                      ~~~~~~[0m

[96msrc/lib/ai/mental-llama/adapter/MentalLLaMAAdapter.ts[0m:[93m62[0m:[93m7[0m - [91merror[0m[90m ts(2578): [0mUnused '@ts-expect-error' directive.

[7m62[0m       // @ts-expect-error: Module may not exist in all environments
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/mental-llama/bridge/MentalLLaMAPythonBridge.ts[0m:[93m11[0m:[93m16[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'baseLogger'.

[7m11[0m const logger = baseLogger
[7m  [0m [91m               ~~~~~~~~~~[0m

[96msrc/lib/ai/mental-llama/evidence/__tests__/EvidenceExtractor.test.ts[0m:[93m345[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'usage' does not exist in type 'LLMResponse'.

[7m345[0m         usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
[7m   [0m [91m        ~~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/__tests__/EvidenceExtractor.test.ts[0m:[93m313[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'usage' does not exist in type 'LLMResponse'.

[7m313[0m         usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
[7m   [0m [91m        ~~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/__tests__/EvidenceExtractor.test.ts[0m:[93m291[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'usage' does not exist in type 'LLMResponse'.

[7m291[0m         usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
[7m   [0m [91m        ~~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/__tests__/EvidenceExtractor.test.ts[0m:[93m264[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'usage' does not exist in type 'LLMResponse'.

[7m264[0m         usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
[7m   [0m [91m        ~~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/__tests__/EvidenceExtractor.test.ts[0m:[93m220[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'usage' does not exist in type 'LLMResponse'.

[7m220[0m         usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
[7m   [0m [91m        ~~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/__tests__/EvidenceExtractor.test.ts[0m:[93m183[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'usage' does not exist in type 'LLMResponse'.

[7m183[0m         usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
[7m   [0m [91m        ~~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/__tests__/EvidenceExtractor.test.ts[0m:[93m155[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'usage' does not exist in type 'LLMResponse'.

[7m155[0m         usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
[7m   [0m [91m        ~~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/__tests__/EvidenceExtractor.test.ts[0m:[93m114[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'usage' does not exist in type 'LLMResponse'.

[7m114[0m         usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
[7m   [0m [91m        ~~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/__tests__/EvidenceExtractor.test.ts[0m:[93m87[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'usage' does not exist in type 'LLMResponse'.

[7m87[0m         usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
[7m  [0m [91m        ~~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/__tests__/EvidenceExtractor.test.ts[0m:[93m55[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'usage' does not exist in type 'LLMResponse'.

[7m55[0m         usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
[7m  [0m [91m        ~~~~~[0m

[96msrc/lib/ai/mental-llama/evidence/utils/__tests__/semanticEvidenceParser.test.ts[0m:[93m302[0m:[93m44[0m - [91merror[0m[90m ts(4111): [0mProperty 'semanticRationale' comes from an index signature, so it must be accessed with ['semanticRationale'].

[7m302[0m       expect(result.evidenceItem?.context?.semanticRationale).toBe(
[7m   [0m [91m                                           ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/utils/__tests__/semanticEvidenceParser.test.ts[0m:[93m205[0m:[93m24[0m - [91merror[0m[90m ts(2339): [0mProperty 'text' does not exist on type 'EvidenceItem'.

[7m205[0m       expect(validItem.text).toBe('Valid item')
[7m   [0m [91m                       ~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/utils/__tests__/semanticEvidenceParser.test.ts[0m:[93m175[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'text' does not exist on type 'EvidenceItem'.

[7m175[0m       expect(evidenceItem.text).toBe('Evidence with whitespace')
[7m   [0m [91m                          ~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/utils/__tests__/semanticEvidenceParser.test.ts[0m:[93m93[0m:[93m24[0m - [91merror[0m[90m ts(2339): [0mProperty 'text' does not exist on type 'EvidenceItem'.

[7m93[0m       expect(validItem.text).toBe('Valid evidence item')
[7m  [0m [91m                       ~~~~[0m
[96msrc/lib/ai/mental-llama/evidence/utils/__tests__/semanticEvidenceParser.test.ts[0m:[93m49[0m:[93m33[0m - [91merror[0m[90m ts(4111): [0mProperty 'semanticRationale' comes from an index signature, so it must be accessed with ['semanticRationale'].

[7m49[0m       expect(firstItem.context?.semanticRationale).toBe(
[7m  [0m [91m                                ~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/mental-llama/utils/testModelIntegration.ts[0m:[93m33[0m:[93m24[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type '"MENTALLAMA_ENDPOINT_URL_7B"' can't be used to index type '() => { NODE_ENV: "test" | "production" | "development"; PORT: number; LOG_LEVEL: "error" | "debug" | "info" | "warn" | "verbose"; ENABLE_RATE_LIMITING: boolean; ANALYTICS_WS_PORT: number; ... 62 more ...; MENTALLAMA_PYTHON_BRIDGE_SCRIPT_PATH?: string | undefined; }'.
  Property 'MENTALLAMA_ENDPOINT_URL_7B' does not exist on type '() => { NODE_ENV: "test" | "production" | "development"; PORT: number; LOG_LEVEL: "error" | "debug" | "info" | "warn" | "verbose"; ENABLE_RATE_LIMITING: boolean; ANALYTICS_WS_PORT: number; ... 62 more ...; MENTALLAMA_PYTHON_BRIDGE_SCRIPT_PATH?: string | undefined; }'.

[7m33[0m     const endpoint7B = env['MENTALLAMA_ENDPOINT_URL_7B']
[7m  [0m [91m                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/mental-llama/utils/testModelIntegration.ts[0m:[93m32[0m:[93m20[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type '"MENTALLAMA_API_KEY"' can't be used to index type '() => { NODE_ENV: "test" | "production" | "development"; PORT: number; LOG_LEVEL: "error" | "debug" | "info" | "warn" | "verbose"; ENABLE_RATE_LIMITING: boolean; ANALYTICS_WS_PORT: number; ... 62 more ...; MENTALLAMA_PYTHON_BRIDGE_SCRIPT_PATH?: string | undefined; }'.
  Property 'MENTALLAMA_API_KEY' does not exist on type '() => { NODE_ENV: "test" | "production" | "development"; PORT: number; LOG_LEVEL: "error" | "debug" | "info" | "warn" | "verbose"; ENABLE_RATE_LIMITING: boolean; ANALYTICS_WS_PORT: number; ... 62 more ...; MENTALLAMA_PYTHON_BRIDGE_SCRIPT_PATH?: string | undefined; }'.

[7m32[0m     const apiKey = env['MENTALLAMA_API_KEY']
[7m  [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/services/BeliefConsistencyService.test.ts[0m:[93m56[0m:[93m24[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ insights: never[]; resistanceLevel: number; changeReadiness: "contemplation"; sessionProgressLog: never[]; }' to type 'TherapeuticProgress' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Type '{ insights: never[]; resistanceLevel: number; changeReadiness: "contemplation"; sessionProgressLog: never[]; }' is missing the following properties from type 'TherapeuticProgress': skillsAcquired, trustLevel, rapportScore, therapistPerception, transferenceState

[7m 56[0m   therapeuticProgress: {
[7m   [0m [91m                       ~[0m
[7m 57[0m     insights: [],
[7m   [0m [91m~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m 60[0m     sessionProgressLog: [],
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m 61[0m   } as TherapeuticProgress,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/services/ContextualAwarenessService.ts[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"./OutcomeRecommendationEngine"' has no exported member 'RecommendationContext'.

[7m4[0m import type { RecommendationContext } from './OutcomeRecommendationEngine'
[7m [0m [91m              ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/services/OutcomeRecommendationEngine.ts[0m:[93m96[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType '{ outcomeId: string; description: string; confidence: number; timeEstimate: string; interventions: string[]; risk: "low" | "high" | "moderate"; details: { expectedDuration: number; successRate: number; contraindications: string[]; sideEffects: string[]; }; metadata: { ...; }; }[]' is not assignable to type '{ description: string; confidence: number; risk: "medium" | "low" | "high"; interventions: string[]; outcomeId: string; timeEstimate: string; details?: { contraindications: string[]; successRate: number; expectedDuration: number; sideEffects: string[]; } | undefined; metadata?: Record<...> | undefined; }[]'.
  Type '{ outcomeId: string; description: string; confidence: number; timeEstimate: string; interventions: string[]; risk: "low" | "high" | "moderate"; details: { expectedDuration: number; successRate: number; contraindications: string[]; sideEffects: string[]; }; metadata: { ...; }; }' is not assignable to type '{ description: string; confidence: number; risk: "medium" | "low" | "high"; interventions: string[]; outcomeId: string; timeEstimate: string; details?: { contraindications: string[]; successRate: number; expectedDuration: number; sideEffects: string[]; } | undefined; metadata?: Record<...> | undefined; }'.

[7m96[0m   return desiredOutcomes.map((outcome, index) => {
[7m  [0m [91m  ~~~~~~[0m

[96msrc/lib/ai/services/PatientProfileService.test.ts[0m:[93m96[0m:[93m48[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m96[0m     mockKvStoreInstance = new MockKVStore() as vi.Mocked<KVStore> // Changed to vi.Mocked
[7m  [0m [91m                                               ~~[0m
[96msrc/lib/ai/services/PatientProfileService.test.ts[0m:[93m91[0m:[93m28[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m91[0m   let mockKvStoreInstance: vi.Mocked<KVStore> // Changed to vi.Mocked
[7m  [0m [91m                           ~~[0m
[96msrc/lib/ai/services/PatientProfileService.test.ts[0m:[93m63[0m:[93m24[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ insights: never[]; resistanceLevel: number; changeReadiness: "contemplation"; sessionProgressLog: never[]; skillsAcquired: string[]; trustLevel: number; rapportScore: number; therapistPerception: "neutral"; transferenceState: "none"; }' to type 'TherapeuticProgress' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'skillsAcquired' are incompatible.

[7m 63[0m   therapeuticProgress: {
[7m   [0m [91m                       ~[0m
[7m 64[0m     insights: [],
[7m   [0m [91m~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m 72[0m     transferenceState: 'none',
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m 73[0m   } as TherapeuticProgress,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/services/PatientProfileService.test.ts[0m:[93m17[0m:[93m32[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m17[0m const MockKVStore = KVStore as vi.MockedClass<typeof KVStore>
[7m  [0m [91m                               ~~[0m

[96msrc/lib/ai/services/PatientResponseService.test.ts[0m:[93m102[0m:[93m31[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m102[0m   let mockConsistencyService: vi.Mocked<BeliefConsistencyService>
[7m   [0m [91m                              ~~[0m
[96msrc/lib/ai/services/PatientResponseService.test.ts[0m:[93m101[0m:[93m27[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m101[0m   let mockProfileService: vi.Mocked<PatientProfileService>
[7m   [0m [91m                          ~~[0m
[96msrc/lib/ai/services/PatientResponseService.test.ts[0m:[93m74[0m:[93m24[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ insights: never[]; resistanceLevel: number; changeReadiness: "contemplation"; sessionProgressLog: never[]; skillsAcquired: string[]; trustLevel: number; rapportScore: number; therapistPerception: "neutral"; transferenceState: "none"; }' to type 'TherapeuticProgress' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'skillsAcquired' are incompatible.

[7m 74[0m   therapeuticProgress: {
[7m   [0m [91m                       ~[0m
[7m 75[0m     insights: [],
[7m   [0m [91m~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m 83[0m     transferenceState: 'none',
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m 84[0m   } as TherapeuticProgress,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/services/PatientResponseService.test.ts[0m:[93m26[0m:[93m66[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m26[0m const MockBeliefConsistencyService = BeliefConsistencyService as vi.MockedClass<
[7m  [0m [91m                                                                 ~~[0m
[96msrc/lib/ai/services/PatientResponseService.test.ts[0m:[93m23[0m:[93m60[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m23[0m const MockPatientProfileService = PatientProfileService as vi.MockedClass<
[7m  [0m [91m                                                           ~~[0m

[96msrc/lib/ai/services/__tests__/PatientProfileService.test.ts[0m:[93m32[0m:[93m24[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m32[0m       skillsAcquired: ['basic coping skills'], // Required property
[7m  [0m [91m                       ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/services/__tests__/PatientProfileService.test.ts[0m:[93m20[0m:[93m63[0m - [91merror[0m[90m ts(2694): [0mNamespace 'global.jest' has no exported member 'Mocked'.

[7m20[0m     mockKvStore = new KVStore('test_profiles', false) as jest.Mocked<KVStore>
[7m  [0m [91m                                                              ~~~~~~[0m
[96msrc/lib/ai/services/__tests__/PatientProfileService.test.ts[0m:[93m14[0m:[93m20[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m14[0m   let mockKvStore: vi.Mocked<KVStore>
[7m  [0m [91m                   ~~[0m

[96msrc/lib/ai/services/__tests__/PatientResponseService.test.ts[0m:[93m69[0m:[93m24[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'SkillAcquired'.

[7m69[0m       skillsAcquired: ['basic coping skills'], // Required property
[7m  [0m [91m                       ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/services/__tests__/PatientResponseService.test.ts[0m:[93m37[0m:[93m44[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m37[0m       new (EmotionSynthesizer as any)() as vi.Mocked<EmotionSynthesizer>
[7m  [0m [91m                                           ~~[0m
[96msrc/lib/ai/services/__tests__/PatientResponseService.test.ts[0m:[93m21[0m:[93m31[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m21[0m   let mockEmotionSynthesizer: vi.Mocked<EmotionSynthesizer> // Use vi.Mocked for typed mocks
[7m  [0m [91m                              ~~[0m

[96msrc/lib/ai/temporal/EmotionTemporalAnalyzer.ts[0m:[93m113[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'getEmotionCorrelations' does not exist on type 'AIRepository'.

[7m113[0m     return await this.repository.getEmotionCorrelations(clientId)
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/temporal/EmotionTemporalAnalyzer.ts[0m:[93m102[0m:[93m47[0m - [91merror[0m[90m ts(2339): [0mProperty 'getEmotionDataByDateRange' does not exist on type 'AIRepository'.

[7m102[0m     const emotionData = await this.repository.getEmotionDataByDateRange(clientId, startDate, endDate)
[7m   [0m [91m                                              ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/temporal/EmotionTemporalAnalyzer.ts[0m:[93m89[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'getCriticalEmotions' does not exist on type 'AIRepository'.

[7m89[0m     return await this.repository.getCriticalEmotions(clientId, options?.emotionTypes)
[7m  [0m [91m                                 ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/temporal/EmotionTemporalAnalyzer.ts[0m:[93m66[0m:[93m47[0m - [91merror[0m[90m ts(2339): [0mProperty 'getEmotionData' does not exist on type 'AIRepository'.

[7m66[0m     const emotionData = await this.repository.getEmotionData(sessionIds)
[7m  [0m [91m                                              ~~~~~~~~~~~~~~[0m

[96msrc/lib/ai/temporal/TemporalAnalysisAlgorithm.ts[0m:[93m505[0m:[93m7[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'EmotionDimensions | undefined' is not assignable to parameter of type 'EmotionDimensions'.
  Type 'undefined' is not assignable to type 'EmotionDimensions'.

[7m505[0m       dimensions[i - 1],
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/temporal/TemporalAnalysisAlgorithm.ts[0m:[93m358[0m:[93m9[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m358[0m         window[i].dimensions,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/ai/temporal/TemporalAnalysisAlgorithm.ts[0m:[93m357[0m:[93m9[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m357[0m         window[i - 1].dimensions,
[7m   [0m [91m        ~~~~~~~~~~~~~[0m
[96msrc/lib/ai/temporal/TemporalAnalysisAlgorithm.ts[0m:[93m179[0m:[93m16[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m179[0m           end: maps[i + 1].timestamp,
[7m   [0m [91m               ~~~~~~~~~~~[0m
[96msrc/lib/ai/temporal/TemporalAnalysisAlgorithm.ts[0m:[93m178[0m:[93m18[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m178[0m           start: maps[i - 1].timestamp,
[7m   [0m [91m                 ~~~~~~~~~~~[0m
[96msrc/lib/ai/temporal/TemporalAnalysisAlgorithm.ts[0m:[93m139[0m:[93m16[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m139[0m           end: maps[maps.length - 1].timestamp,
[7m   [0m [91m               ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/temporal/TemporalAnalysisAlgorithm.ts[0m:[93m138[0m:[93m18[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m138[0m           start: maps[0].timestamp,
[7m   [0m [91m                 ~~~~~~~[0m
[96msrc/lib/ai/temporal/TemporalAnalysisAlgorithm.ts[0m:[93m98[0m:[93m16[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m98[0m           end: window[window.length - 1].timestamp,
[7m  [0m [91m               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ai/temporal/TemporalAnalysisAlgorithm.ts[0m:[93m97[0m:[93m18[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m97[0m           start: window[0].timestamp,
[7m  [0m [91m                 ~~~~~~~~~[0m

[96msrc/lib/analytics/breach-analytics.ts[0m:[93m308[0m:[93m49[0m - [91merror[0m[90m ts(4111): [0mProperty 'critical' comes from an index signature, so it must be accessed with ['critical'].

[7m308[0m     const criticalBreaches = metrics.bySeverity.critical || 0
[7m   [0m [91m                                                ~~~~~~~~[0m
[96msrc/lib/analytics/breach-analytics.ts[0m:[93m201[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'EffectivenessMetrics' is not assignable to type 'number'.

[7m201[0m     notificationRate:
[7m   [0m [91m    ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach-analytics.ts[0m:[93m198[0m:[93m13[0m - [91merror[0m[90m ts(7006): [0mParameter 'breach' implicitly has an 'any' type.

[7m198[0m       (sum, breach) => sum + breach.affectedUsers.length,
[7m   [0m [91m            ~~~~~~[0m
[96msrc/lib/analytics/breach-analytics.ts[0m:[93m198[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'sum' implicitly has an 'any' type.

[7m198[0m       (sum, breach) => sum + breach.affectedUsers.length,
[7m   [0m [91m       ~~~[0m
[96msrc/lib/analytics/breach-analytics.ts[0m:[93m187[0m:[93m6[0m - [91merror[0m[90m ts(7006): [0mParameter 'breach' implicitly has an 'any' type.

[7m187[0m     (breach) =>
[7m   [0m [91m     ~~~~~~[0m
[96msrc/lib/analytics/breach-analytics.ts[0m:[93m102[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'EffectivenessMetrics' is not assignable to type 'number'.

[7m102[0m       notificationEffectiveness,
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach-analytics.ts[0m:[93m84[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'breach' implicitly has an 'any' type.

[7m84[0m       (breach) =>
[7m  [0m [91m       ~~~~~~[0m
[96msrc/lib/analytics/breach-analytics.ts[0m:[93m10[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"../security/breach-notification"' has no exported member 'BreachNotificationSystem'.

[7m10[0m import { BreachNotificationSystem } from '../security/breach-notification'
[7m  [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach-analytics.ts[0m:[93m4[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"./risk"' has no exported member 'RiskScoring'.

[7m4[0m import { RiskScoring } from './risk'
[7m [0m [91m         ~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach-analytics.ts[0m:[93m2[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"./ml"' has no exported member 'MachineLearning'.

[7m2[0m import { MachineLearning } from './ml'
[7m [0m [91m         ~~~~~~~~~~~~~~~[0m

[96msrc/lib/analytics/breach.ts[0m:[93m82[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'Record<string, unknown> | undefined' is not assignable to type 'Record<string, unknown>'.
  Type 'undefined' is not assignable to type 'Record<string, unknown>'.

[7m82[0m     metadata: stored.metadata || undefined,
[7m  [0m [91m    ~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m79[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'Date' is not assignable to type 'number'.

[7m79[0m     responseTime: new Date(stored.response_time),
[7m  [0m [91m    ~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m78[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'Date' is not assignable to type 'number'.

[7m78[0m     detectionTime: new Date(stored.detection_time),
[7m  [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m75[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string[]' is not assignable to type 'number'.

[7m75[0m     affectedUsers: stored.affected_users,
[7m  [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m61[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '"completed" | "pending" | "in_progress" | undefined' is not assignable to type '"completed" | "pending" | "in_progress"'.
  Type 'undefined' is not assignable to type '"completed" | "pending" | "in_progress"'.

[7m61[0m     remediation_status: breach.remediationStatus,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m60[0m:[93m40[0m - [91merror[0m[90m ts(2551): [0mProperty 'toISOString' does not exist on type 'number'. Did you mean 'toString'?

[7m60[0m     response_time: breach.responseTime.toISOString(),
[7m  [0m [91m                                       ~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m60[0m:[93m20[0m - [91merror[0m[90m ts(18048): [0m'breach.responseTime' is possibly 'undefined'.

[7m60[0m     response_time: breach.responseTime.toISOString(),
[7m  [0m [91m                   ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m59[0m:[93m42[0m - [91merror[0m[90m ts(2551): [0mProperty 'toISOString' does not exist on type 'number'. Did you mean 'toString'?

[7m59[0m     detection_time: breach.detectionTime.toISOString(),
[7m  [0m [91m                                         ~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m59[0m:[93m21[0m - [91merror[0m[90m ts(18048): [0m'breach.detectionTime' is possibly 'undefined'.

[7m59[0m     detection_time: breach.detectionTime.toISOString(),
[7m  [0m [91m                    ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m57[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string[] | undefined' is not assignable to type 'string[]'.
  Type 'undefined' is not assignable to type 'string[]'.

[7m57[0m     data_types: breach.dataTypes,
[7m  [0m [91m    ~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m56[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'number | undefined' is not assignable to type 'string[]'.
  Type 'undefined' is not assignable to type 'string[]'.

[7m56[0m     affected_users: breach.affectedUsers,
[7m  [0m [91m    ~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m17[0m:[93m33[0m - [91merror[0m[90m ts(4111): [0mProperty 'MONGODB_DB_NAME' comes from an index signature, so it must be accessed with ['MONGODB_DB_NAME'].

[7m17[0m const mongoDbName = process.env.MONGODB_DB_NAME
[7m  [0m [91m                                ~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/breach.ts[0m:[93m16[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'MONGODB_URI' comes from an index signature, so it must be accessed with ['MONGODB_URI'].

[7m16[0m const mongoUri = process.env.MONGODB_URI
[7m  [0m [91m                             ~~~~~~~~~~~[0m

[96msrc/lib/analytics/ml.ts[0m:[93m43[0m:[93m54[0m - [91merror[0m[90m ts(18046): [0m't' is of type 'unknown'.

[7m43[0m   const recentBreaches = trends.slice(-7).map((t) => t.breaches)
[7m  [0m [91m                                                     ~[0m
[96msrc/lib/analytics/ml.ts[0m:[93m22[0m:[93m28[0m - [91merror[0m[90m ts(18046): [0m'trend' is of type 'unknown'.

[7m22[0m     const responseFactor = trend.responseTime > 3600000 ? 0.2 : 0 // 1 hour threshold
[7m  [0m [91m                           ~~~~~[0m
[96msrc/lib/analytics/ml.ts[0m:[93m21[0m:[93m26[0m - [91merror[0m[90m ts(18046): [0m'trend' is of type 'unknown'.

[7m21[0m     const breachFactor = trend.breaches > 5 ? 0.3 : 0
[7m  [0m [91m                         ~~~~~[0m

[96msrc/lib/analytics/statistics.ts[0m:[93m38[0m:[93m21[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m38[0m       const yDiff = dataPoints[i] - yMean
[7m  [0m [91m                    ~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/statistics.ts[0m:[93m37[0m:[93m21[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m37[0m       const xDiff = xValues[i] - xMean
[7m  [0m [91m                    ~~~~~~~~~~[0m

[96msrc/lib/analytics/universal-demo-analytics.ts[0m:[93m412[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'gtag'.

[7m412[0m       gtag('event', eventData.event, {
[7m   [0m [91m      ~~~~[0m
[96msrc/lib/analytics/universal-demo-analytics.ts[0m:[93m411[0m:[93m16[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'gtag'.

[7m411[0m     if (typeof gtag !== 'undefined') {
[7m   [0m [91m               ~~~~[0m
[96msrc/lib/analytics/universal-demo-analytics.ts[0m:[93m123[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'string | null' is not assignable to type 'string'.
  Type 'null' is not assignable to type 'string'.

[7m123[0m     return variant
[7m   [0m [91m    ~~~~~~[0m
[96msrc/lib/analytics/universal-demo-analytics.ts[0m:[93m114[0m:[93m72[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | null' is not assignable to parameter of type 'string'.
  Type 'null' is not assignable to type 'string'.

[7m114[0m       sessionStorage.setItem(ANALYTICS_CONFIG.STORAGE_KEYS.AB_VARIANT, variant)
[7m   [0m [91m                                                                       ~~~~~~~[0m
[96msrc/lib/analytics/universal-demo-analytics.ts[0m:[93m113[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string | null'.
  Type 'undefined' is not assignable to type 'string | null'.

[7m113[0m       variant = variants[Math.floor(Math.random() * variants.length)]
[7m   [0m [91m      ~~~~~~~[0m
[96msrc/lib/analytics/universal-demo-analytics.ts[0m:[93m47[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'DemoPageConfig | undefined' is not assignable to type 'PageConfig'.
  Type 'undefined' is not assignable to type 'PageConfig'.

[7m47[0m     this.pageConfig = DEMO_PAGES_CONFIG[pageName]
[7m  [0m [91m    ~~~~~~~~~~~~~~~[0m

[96msrc/lib/analytics/__tests__/breach-analytics.test.ts[0m:[93m350[0m:[93m67[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m350[0m         BreachNotificationSystem.listRecentBreaches as unknown as vi.Mocked<
[7m   [0m [91m                                                                  ~~[0m
[96msrc/lib/analytics/__tests__/breach-analytics.test.ts[0m:[93m296[0m:[93m56[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m296[0m         ComplianceMetrics.calculateScore as unknown as vi.Mocked<
[7m   [0m [91m                                                       ~~[0m
[96msrc/lib/analytics/__tests__/breach-analytics.test.ts[0m:[93m11[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"../breach-analytics"' has no exported member 'BreachAnalytics'.

[7m11[0m import { BreachAnalytics } from '../breach-analytics'
[7m  [0m [91m         ~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/__tests__/breach-analytics.test.ts[0m:[93m10[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/security/breach-notification"' has no exported member 'BreachNotificationSystem'.

[7m10[0m import { BreachNotificationSystem } from '@/lib/security/breach-notification'
[7m  [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/__tests__/breach-analytics.test.ts[0m:[93m8[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/fhe"' has no exported member 'FHE'.

[7m8[0m import { FHE } from '@/lib/fhe'
[7m [0m [91m         ~~~[0m
[96msrc/lib/analytics/__tests__/breach-analytics.test.ts[0m:[93m7[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/analytics/trends"' has no exported member 'SecurityTrends'.

[7m7[0m import { SecurityTrends } from '@/lib/analytics/trends'
[7m [0m [91m         ~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/__tests__/breach-analytics.test.ts[0m:[93m5[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/analytics/risk"' has no exported member 'RiskScoring'.

[7m5[0m import { RiskScoring } from '@/lib/analytics/risk'
[7m [0m [91m         ~~~~~~~~~~~[0m
[96msrc/lib/analytics/__tests__/breach-analytics.test.ts[0m:[93m4[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/analytics/notifications"' has no exported member 'NotificationEffectiveness'.

[7m4[0m import { NotificationEffectiveness } from '@/lib/analytics/notifications'
[7m [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/__tests__/breach-analytics.test.ts[0m:[93m3[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/analytics/ml"' has no exported member 'MachineLearning'.

[7m3[0m import { MachineLearning } from '@/lib/analytics/ml'
[7m [0m [91m         ~~~~~~~~~~~~~~~[0m
[96msrc/lib/analytics/__tests__/breach-analytics.test.ts[0m:[93m2[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/analytics/compliance"' has no exported member 'ComplianceMetrics'.

[7m2[0m import { ComplianceMetrics } from '@/lib/analytics/compliance'
[7m [0m [91m         ~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/animations/sequences.ts[0m:[93m703[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'pulse' comes from an index signature, so it must be accessed with ['pulse'].

[7m703[0m   loading: loadingSequences.pulse,
[7m   [0m [91m                            ~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m700[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'slideInRight' comes from an index signature, so it must be accessed with ['slideInRight'].

[7m700[0m   toast: notificationSequences.slideInRight,
[7m   [0m [91m                               ~~~~~~~~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m697[0m:[93m25[0m - [91merror[0m[90m ts(4111): [0mProperty 'scaleUp' comes from an index signature, so it must be accessed with ['scaleUp'].

[7m697[0m   modal: modalSequences.scaleUp,
[7m   [0m [91m                        ~~~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m694[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'cardFloat' comes from an index signature, so it must be accessed with ['cardFloat'].

[7m694[0m   card: interactiveSequences.cardFloat,
[7m   [0m [91m                             ~~~~~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m693[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'buttonHover' comes from an index signature, so it must be accessed with ['buttonHover'].

[7m693[0m   button: interactiveSequences.buttonHover,
[7m   [0m [91m                               ~~~~~~~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m690[0m:[93m35[0m - [91merror[0m[90m ts(4111): [0mProperty 'cascadeIn' comes from an index signature, so it must be accessed with ['cascadeIn'].

[7m690[0m   cascade: listAnimationSequences.cascadeIn,
[7m   [0m [91m                                  ~~~~~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m689[0m:[93m35[0m - [91merror[0m[90m ts(4111): [0mProperty 'staggeredFade' comes from an index signature, so it must be accessed with ['staggeredFade'].

[7m689[0m   stagger: listAnimationSequences.staggeredFade,
[7m   [0m [91m                                  ~~~~~~~~~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m686[0m:[93m36[0m - [91merror[0m[90m ts(4111): [0mProperty 'scaleIn' comes from an index signature, so it must be accessed with ['scaleIn'].

[7m686[0m   scaleIn: pageTransitionSequences.scaleIn,
[7m   [0m [91m                                   ~~~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m685[0m:[93m36[0m - [91merror[0m[90m ts(4111): [0mProperty 'slideUp' comes from an index signature, so it must be accessed with ['slideUp'].

[7m685[0m   slideUp: pageTransitionSequences.slideUp,
[7m   [0m [91m                                   ~~~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m684[0m:[93m35[0m - [91merror[0m[90m ts(4111): [0mProperty 'fadeSlide' comes from an index signature, so it must be accessed with ['fadeSlide'].

[7m684[0m   fadeIn: pageTransitionSequences.fadeSlide,
[7m   [0m [91m                                  ~~~~~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m427[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'brightness' does not exist in type 'Variant'.

[7m427[0m       brightness: 1.1,
[7m   [0m [91m      ~~~~~~~~~~[0m
[96msrc/lib/animations/sequences.ts[0m:[93m423[0m:[93m34[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'brightness' does not exist in type 'Variant'.

[7m423[0m     rest: { scale: 1, rotate: 0, brightness: 1 },
[7m   [0m [91m                                 ~~~~~~~~~~[0m

[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m736[0m:[93m26[0m - [91merror[0m[90m ts(4111): [0mProperty 'knowledgeSource' comes from an index signature, so it must be accessed with ['knowledgeSource'].

[7m736[0m         confidence: turn.knowledgeSource.confidence,
[7m   [0m [91m                         ~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m736[0m:[93m21[0m - [91merror[0m[90m ts(18046): [0m'turn.knowledgeSource' is of type 'unknown'.

[7m736[0m         confidence: turn.knowledgeSource.confidence,
[7m   [0m [91m                    ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m733[0m:[93m16[0m - [91merror[0m[90m ts(4111): [0mProperty 'speaker' comes from an index signature, so it must be accessed with ['speaker'].

[7m733[0m           turn.speaker === 'therapist'
[7m   [0m [91m               ~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m731[0m:[93m23[0m - [91merror[0m[90m ts(4111): [0mProperty 'knowledgeSource' comes from an index signature, so it must be accessed with ['knowledgeSource'].

[7m731[0m         content: turn.knowledgeSource.reference,
[7m   [0m [91m                      ~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m731[0m:[93m18[0m - [91merror[0m[90m ts(18046): [0m'turn.knowledgeSource' is of type 'unknown'.

[7m731[0m         content: turn.knowledgeSource.reference,
[7m   [0m [91m                 ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m730[0m:[93m22[0m - [91merror[0m[90m ts(4111): [0mProperty 'knowledgeSource' comes from an index signature, so it must be accessed with ['knowledgeSource'].

[7m730[0m         source: turn.knowledgeSource.type,
[7m   [0m [91m                     ~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m730[0m:[93m17[0m - [91merror[0m[90m ts(18046): [0m'turn.knowledgeSource' is of type 'unknown'.

[7m730[0m         source: turn.knowledgeSource.type,
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m704[0m:[93m25[0m - [91merror[0m[90m ts(4111): [0mProperty 'conversationParameters' comes from an index signature, so it must be accessed with ['conversationParameters'].

[7m704[0m     baseScore + request.conversationParameters.targetTechniques.length * 3,
[7m   [0m [91m                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m704[0m:[93m17[0m - [91merror[0m[90m ts(18046): [0m'request.conversationParameters' is of type 'unknown'.

[7m704[0m     baseScore + request.conversationParameters.targetTechniques.length * 3,
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m700[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'dsm5Criteria' comes from an index signature, so it must be accessed with ['dsm5Criteria'].

[7m700[0m     baseScore + request.knowledgeBase.dsm5Criteria.length * 2,
[7m   [0m [91m                                      ~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m700[0m:[93m17[0m - [91merror[0m[90m ts(18046): [0m'request.knowledgeBase.dsm5Criteria' is of type 'unknown'.

[7m700[0m     baseScore + request.knowledgeBase.dsm5Criteria.length * 2,
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m659[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'profile' is declared but its value is never read.

[7m659[0m   profile: ClientProfile,
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m642[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'techniques' is declared but its value is never read.

[7m642[0m   techniques: string[],
[7m   [0m [91m  ~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m641[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'dsm5' is declared but its value is never read.

[7m641[0m   dsm5: string[],
[7m   [0m [91m  ~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m632[0m:[93m41[0m - [91merror[0m[90m ts(18048): [0m'profile.presentingProblem' is possibly 'undefined'.

[7m632[0m     high: `I'm really struggling with ${profile.presentingProblem.toLowerCase()}. It feels overwhelming most of the time, and I'm not sure how to manage it anymore.`,
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m462[0m:[93m51[0m - [91merror[0m[90m ts(2345): [0mArgument of type '({ speaker: "therapist"; content: string; timestamp: string; techniques: string[]; interventionType: string; knowledgeSource: { type: string; reference: string; confidence: number; }; emotionalState?: undefined; } | { ...; })[]' is not assignable to parameter of type 'DialogueEntry[]'.
  Type '{ speaker: "therapist"; content: string; timestamp: string; techniques: string[]; interventionType: string; knowledgeSource: { type: string; reference: string; confidence: number; }; emotionalState?: undefined; } | { ...; }' is not assignable to type 'DialogueEntry'.

[7m462[0m   const knowledgeMapping = mapKnowledgeToDialogue(generatedDialogue)
[7m   [0m [91m                                                  ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m459[0m:[93m55[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ clientProfile: { severity: "medium" | "low" | "high"; demographics: { age: number; gender: string; background: string; }; riskFactors: string[]; presentingProblem: string; }; knowledgeBase: { ...; }; conversationParameters: { ...; }; }' is not assignable to parameter of type 'ConversationRequest'.
  Property 'therapeuticApproach' is missing in type '{ clientProfile: { severity: "medium" | "low" | "high"; demographics: { age: number; gender: string; background: string; }; riskFactors: string[]; presentingProblem: string; }; knowledgeBase: { ...; }; conversationParameters: { ...; }; }' but required in type 'ConversationRequest'.

[7m459[0m   const qualityMetrics = calculateConversationQuality(validatedRequest)
[7m   [0m [91m                                                      ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m465[0m:[93m70[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m465[0m     conversationId: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
[7m   [0m [93m                                                                     ~~~~~~[0m
[96msrc/lib/api/psychology-pipeline-demo.ts[0m:[93m150[0m:[93m62[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m150[0m     caseId: `CASE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
[7m   [0m [93m                                                             ~~~~~~[0m

[96msrc/lib/audit/analysis.ts[0m:[93m152[0m:[93m7[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m152[0m       acc[log.userId].push(log)
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m
[96msrc/lib/audit/analysis.ts[0m:[93m107[0m:[93m7[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m107[0m       acc[log.userId].push(log)
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m
[96msrc/lib/audit/analysis.ts[0m:[93m56[0m:[93m7[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m56[0m       acc[log.userId].logs.push(log)
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m
[96msrc/lib/audit/analysis.ts[0m:[93m55[0m:[93m7[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m55[0m       acc[log.userId].count++
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m

[96msrc/lib/audit/index.ts[0m:[93m1[0m:[93m30[0m - [91merror[0m[90m ts(2305): [0mModule '"./log"' has no exported member 'createAuditLog'.

[7m1[0m export { type AuditLogEntry, createAuditLog } from './log'
[7m [0m [91m                             ~~~~~~~~~~~~~~[0m

[96msrc/lib/audit/metrics.ts[0m:[93m55[0m:[93m27[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m55[0m   const unusualPatterns = await detectUnusualPatterns(logs)
[7m  [0m [93m                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/audit/__tests__/analysis.test.ts[0m:[93m7[0m:[93m31[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../types/audit' or its corresponding type declarations.

[7m7[0m import type { AuditLog } from '../../types/audit'
[7m [0m [91m                              ~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/auth/azure-ad.ts[0m:[93m1[0m:[93m29[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../config/azure.config' or its corresponding type declarations.

[7m1[0m import { azureConfig } from '../../config/azure.config'
[7m [0m [91m                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/auth/index.ts[0m:[93m340[0m:[93m62[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m340[0m     return `reset_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`
[7m   [0m [93m                                                             ~~~~~~[0m
[96msrc/lib/auth/index.ts[0m:[93m320[0m:[93m75[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m320[0m     const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
[7m   [0m [93m                                                                          ~~~~~~[0m
[96msrc/lib/auth/index.ts[0m:[93m162[0m:[93m62[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m162[0m         id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
[7m   [0m [93m                                                             ~~~~~~[0m

[96msrc/lib/auth/middleware.ts[0m:[93m57[0m:[93m40[0m - [91merror[0m[90m ts(2339): [0mProperty 'app_metadata' does not exist on type 'User'.

[7m57[0m         verificationHash: session.user.app_metadata.verificationToken,
[7m  [0m [91m                                       ~~~~~~~~~~~~[0m
[96msrc/lib/auth/middleware.ts[0m:[93m28[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'app_metadata' does not exist on type 'User'.

[7m28[0m     if (!session.user.app_metadata?.verificationToken) {
[7m  [0m [91m                      ~~~~~~~~~~~~[0m

[96msrc/lib/auth/serverAuth.ts[0m:[93m286[0m:[93m46[0m - [91merror[0m[90m ts(7006): [0mParameter 'context' implicitly has an 'any' type.

[7m286[0m     const apiRouteHandler: APIRoute = async (context) => {
[7m   [0m [91m                                             ~~~~~~~[0m
[96msrc/lib/auth/serverAuth.ts[0m:[93m262[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'user' comes from an index signature, so it must be accessed with ['user'].

[7m262[0m     Astro.locals.user = user
[7m   [0m [91m                 ~~~~[0m
[96msrc/lib/auth/serverAuth.ts[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroCookies'.

[7m2[0m import type { AstroCookies } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~[0m
[96msrc/lib/auth/serverAuth.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/lib/auth/__tests__/serverAuth.test.ts[0m:[93m3[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"../../audit/log"' has no exported member 'createResourceAuditLog'.

[7m3[0m import { createResourceAuditLog } from '../../audit/log'
[7m [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/auth/__tests__/serverAuth.test.ts[0m:[93m2[0m:[93m49[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../auth' or its corresponding type declarations.

[7m2[0m import { getCurrentUser, isAuthenticated } from '../auth'
[7m [0m [91m                                                ~~~~~~~~~[0m

[96msrc/lib/backup/verify.ts[0m:[93m347[0m:[93m17[0m - [91merror[0m[90m ts(6133): [0m'markBackupFailed' is declared but its value is never read.

[7m347[0m   private async markBackupFailed(backupFile: string): Promise<void> {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m313[0m:[93m24[0m - [91merror[0m[90m ts(18046): [0m'data' is of type 'unknown'.

[7m313[0m     for (const user of data.users) {
[7m   [0m [91m                       ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m302[0m:[93m24[0m - [91merror[0m[90m ts(18046): [0m'data' is of type 'unknown'.

[7m302[0m     for (const user of data.users) {
[7m   [0m [91m                       ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m293[0m:[93m18[0m - [91merror[0m[90m ts(18046): [0m'data' is of type 'unknown'.

[7m293[0m       analytics: data.analytics.slice(0, 5),
[7m   [0m [91m                 ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m292[0m:[93m17[0m - [91merror[0m[90m ts(18046): [0m'data' is of type 'unknown'.

[7m292[0m       sessions: data.sessions.slice(0, 5),
[7m   [0m [91m                ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m291[0m:[93m14[0m - [91merror[0m[90m ts(18046): [0m'data' is of type 'unknown'.

[7m291[0m       users: data.users.slice(0, 5),
[7m   [0m [91m             ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m277[0m:[93m45[0m - [91merror[0m[90m ts(18046): [0m'backup' is of type 'unknown'.

[7m277[0m       const testData = this.extractTestData(backup.data)
[7m   [0m [91m                                            ~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m267[0m:[93m24[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_URL' comes from an index signature, so it must be accessed with ['REDIS_URL'].

[7m267[0m       url: process.env.REDIS_URL!,
[7m   [0m [91m                       ~~~~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m260[0m:[93m62[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m260[0m       throw new Error(`Backup content verification failed: ${error.message}`)
[7m   [0m [91m                                                             ~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m237[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'environment' does not exist on type 'object'.

[7m237[0m       typeof data.environment === 'string'
[7m   [0m [91m                  ~~~~~~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m237[0m:[93m14[0m - [91merror[0m[90m ts(18047): [0m'data' is possibly 'null'.

[7m237[0m       typeof data.environment === 'string'
[7m   [0m [91m             ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m236[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'version' does not exist on type 'object'.

[7m236[0m       typeof data.version === 'string' &&
[7m   [0m [91m                  ~~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m236[0m:[93m14[0m - [91merror[0m[90m ts(18047): [0m'data' is possibly 'null'.

[7m236[0m       typeof data.version === 'string' &&
[7m   [0m [91m             ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m213[0m:[93m22[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(o: ArrayLike<unknown> | { [s: string]: unknown; }): [string, unknown][]', gave the following error.
  Overload 2 of 2, '(o: {}): [string, any][]', gave the following error.

[7m213[0m       Object.entries(data).every(
[7m   [0m [91m                     ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m200[0m:[93m34[0m - [91merror[0m[90m ts(18046): [0m'data' is of type 'unknown'.

[7m200[0m       if (!this.verifyConfigData(data.config)) {
[7m   [0m [91m                                 ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m195[0m:[93m32[0m - [91merror[0m[90m ts(18046): [0m'data' is of type 'unknown'.

[7m195[0m       if (!this.verifyFileData(data.files)) {
[7m   [0m [91m                               ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m190[0m:[93m33[0m - [91merror[0m[90m ts(18046): [0m'data' is of type 'unknown'.

[7m190[0m       if (!this.verifyRedisData(data.redis)) {
[7m   [0m [91m                                ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m182[0m:[93m29[0m - [91merror[0m[90m ts(18046): [0m'data' is of type 'unknown'.

[7m182[0m         (section) => typeof data[section] === 'object',
[7m   [0m [91m                            ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m173[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'data' does not exist on type 'object'.

[7m173[0m       typeof backup.data === 'object'
[7m   [0m [91m                    ~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m173[0m:[93m14[0m - [91merror[0m[90m ts(18047): [0m'backup' is possibly 'null'.

[7m173[0m       typeof backup.data === 'object'
[7m   [0m [91m             ~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m172[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'environment' does not exist on type 'object'.

[7m172[0m       typeof backup.environment === 'string' &&
[7m   [0m [91m                    ~~~~~~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m172[0m:[93m14[0m - [91merror[0m[90m ts(18047): [0m'backup' is possibly 'null'.

[7m172[0m       typeof backup.environment === 'string' &&
[7m   [0m [91m             ~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m171[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'version' does not exist on type 'object'.

[7m171[0m       typeof backup.version === 'string' &&
[7m   [0m [91m                    ~~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m171[0m:[93m14[0m - [91merror[0m[90m ts(18047): [0m'backup' is possibly 'null'.

[7m171[0m       typeof backup.version === 'string' &&
[7m   [0m [91m             ~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m170[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'timestamp' does not exist on type 'object'.

[7m170[0m       typeof backup.timestamp === 'number' &&
[7m   [0m [91m                    ~~~~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m170[0m:[93m14[0m - [91merror[0m[90m ts(18047): [0m'backup' is possibly 'null'.

[7m170[0m       typeof backup.timestamp === 'number' &&
[7m   [0m [91m             ~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m158[0m:[93m40[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m158[0m         error: `Verification failed: ${error.message}`,
[7m   [0m [91m                                       ~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m94[0m:[93m52[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m94[0m       throw new Error(`Failed to verify backups: ${error.message}`)
[7m  [0m [91m                                                   ~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m85[0m:[93m20[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m85[0m             error: error.message,
[7m  [0m [91m                   ~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m41[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m41[0m       backupDir: getEnv('BACKUP_DIR', './backups'),
[7m  [0m [91m      ~~~~~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m33[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'redis' is declared but its value is never read.

[7m33[0m   private redis: RedisService
[7m  [0m [91m          ~~~~~[0m
[96msrc/lib/backup/verify.ts[0m:[93m254[0m:[93m9[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m254[0m         await this.verifyDataIntegrity(backup.data)
[7m   [0m [93m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/browser/setup.ts[0m:[93m65[0m:[93m5[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'logger'.

[7m65[0m     logger.error('Error setting up browser environment:', error)
[7m  [0m [91m    ~~~~~~[0m
[96msrc/lib/browser/setup.ts[0m:[93m63[0m:[93m5[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'logger'.

[7m63[0m     logger.info('Browser environment setup complete')
[7m  [0m [91m    ~~~~~~[0m
[96msrc/lib/browser/setup.ts[0m:[93m49[0m:[93m9[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'logger'.

[7m49[0m         logger.warn('Missing critical browser features:', missingCritical)
[7m  [0m [91m        ~~~~~~[0m
[96msrc/lib/browser/setup.ts[0m:[93m34[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'logger'.

[7m34[0m       logger.debug('Detected browser features:', features)
[7m  [0m [91m      ~~~~~~[0m
[96msrc/lib/browser/setup.ts[0m:[93m20[0m:[93m5[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'logger'.

[7m20[0m     logger.info('Setting up browser environment')
[7m  [0m [91m    ~~~~~~[0m

[96msrc/lib/cache/invalidation.ts[0m:[93m27[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'Redis | null' is not assignable to type 'Redis'.
  Type 'null' is not assignable to type 'Redis'.

[7m27[0m     this.redis =
[7m  [0m [91m    ~~~~~~~~~~[0m

[96msrc/lib/crypto/encryption.ts[0m:[93m102[0m:[93m45[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(start?: number | undefined, end?: number | undefined): Buffer<ArrayBuffer>' of 'encryptedBuffer.slice' is deprecated.

[7m102[0m       const encryptedData = encryptedBuffer.slice(
[7m   [0m [93m                                            ~~~~~[0m
[96msrc/lib/crypto/encryption.ts[0m:[93m101[0m:[93m39[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(start?: number | undefined, end?: number | undefined): Buffer<ArrayBuffer>' of 'encryptedBuffer.slice' is deprecated.

[7m101[0m       const authTag = encryptedBuffer.slice(encryptedBuffer.length - 16)
[7m   [0m [93m                                      ~~~~~[0m

[96msrc/lib/crypto/example.ts[0m:[93m138[0m:[93m38[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m138[0m     const redecrypted = await crypto.decrypt(reencrypted)
[7m   [0m [91m                                     ~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m133[0m:[93m38[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m133[0m     const reencrypted = await crypto.encrypt(decrypted)
[7m   [0m [91m                                     ~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m132[0m:[93m36[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m132[0m     const decrypted = await crypto.decrypt(encrypted)
[7m   [0m [91m                                   ~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m124[0m:[93m49[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m124[0m   const rotatedKey = await keyStorage.rotateKey(keyId)
[7m   [0m [91m                                                ~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m122[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'useSecureStorage' does not exist in type 'KeyStorageOptions'.

[7m122[0m     useSecureStorage: true,
[7m   [0m [91m    ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m112[0m:[93m34[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m112[0m   const encrypted = await crypto.encrypt(sensitiveData)
[7m   [0m [91m                                 ~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m83[0m:[93m15[0m - [91merror[0m[90m ts(7006): [0mParameter 'error' implicitly has an 'any' type.

[7m83[0m     onError: (error) => {
[7m  [0m [91m              ~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m80[0m:[93m28[0m - [91merror[0m[90m ts(7006): [0mParameter 'newKeyId' implicitly has an 'any' type.

[7m80[0m     onRotation: (oldKeyId, newKeyId) => {
[7m  [0m [91m                           ~~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m80[0m:[93m18[0m - [91merror[0m[90m ts(7006): [0mParameter 'oldKeyId' implicitly has an 'any' type.

[7m80[0m     onRotation: (oldKeyId, newKeyId) => {
[7m  [0m [91m                 ~~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m47[0m:[93m5[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'useSecureStorage' does not exist in type 'KeyStorageOptions'.

[7m47[0m     useSecureStorage: true,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m30[0m:[93m34[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m30[0m   const decrypted = await crypto.decrypt(encrypted)
[7m  [0m [91m                                 ~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m25[0m:[93m34[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m25[0m   const encrypted = await crypto.encrypt(sensitiveData)
[7m  [0m [91m                                 ~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m9[0m:[93m30[0m - [91merror[0m[90m ts(2614): [0mModule '"./index"' has no exported member 'ScheduledKeyRotation'. Did you mean to use 'import ScheduledKeyRotation from "./index"' instead?

[7m9[0m import { createCryptoSystem, ScheduledKeyRotation } from './index'
[7m [0m [91m                             ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m138[0m:[93m25[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m138[0m     const redecrypted = await crypto.decrypt(reencrypted)
[7m   [0m [93m                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m133[0m:[93m25[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m133[0m     const reencrypted = await crypto.encrypt(decrypted)
[7m   [0m [93m                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m132[0m:[93m23[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m132[0m     const decrypted = await crypto.decrypt(encrypted)
[7m   [0m [93m                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m112[0m:[93m21[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m112[0m   const encrypted = await crypto.encrypt(sensitiveData)
[7m   [0m [93m                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m30[0m:[93m21[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m30[0m   const decrypted = await crypto.decrypt(encrypted)
[7m  [0m [93m                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/crypto/example.ts[0m:[93m25[0m:[93m21[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m25[0m   const encrypted = await crypto.encrypt(sensitiveData)
[7m  [0m [93m                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/crypto/keyRotation.ts[0m:[93m148[0m:[93m7[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m148[0m       encryptedData.split(':')[0].substring(1),
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/crypto/keyStorage.ts[0m:[93m226[0m:[93m52[0m - [91merror[0m[90m ts(4111): [0mProperty 'keyId' comes from an index signature, so it must be accessed with ['keyId'].

[7m226[0m     return (result.Items || []).map((item) => item.keyId)
[7m   [0m [91m                                                   ~~~~~[0m

[96msrc/lib/crypto/scheduledRotation.ts[0m:[93m32[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'useSecureStorage' does not exist in type 'KeyStorageOptions'.

[7m32[0m       useSecureStorage: options.useSecureStorage || false,
[7m  [0m [91m      ~~~~~~~~~~~~~~~~[0m

[96msrc/lib/db/conversations.ts[0m:[93m142[0m:[93m43[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m142[0m   const conversations = await mongoClient.db
[7m   [0m [91m                                          ~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m142[0m:[93m31[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m142[0m   const conversations = await mongoClient.db
[7m   [0m [91m                              ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m126[0m:[93m9[0m - [91merror[0m[90m ts(2554): [0mExpected 4-6 arguments, but got 1.

[7m126[0m   await createAuditLog({
[7m   [0m [91m        ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m119[0m:[93m18[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'Condition<ObjectId> | undefined'.

[7m119[0m     .deleteOne({ _id: id, user_id: userId })
[7m   [0m [91m                 ~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m117[0m:[93m36[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m117[0m   const result = await mongoClient.db
[7m   [0m [91m                                   ~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m117[0m:[93m24[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m117[0m   const result = await mongoClient.db
[7m   [0m [91m                       ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m94[0m:[93m9[0m - [91merror[0m[90m ts(2554): [0mExpected 4-6 arguments, but got 1.

[7m94[0m   await createAuditLog({
[7m  [0m [91m        ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m84[0m:[93m9[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 4, '(filter: Filter<Document>, update: Document[] | UpdateFilter<Document>, options: FindOneAndUpdateOptions & { ...; }): Promise<...>', gave the following error.
  Overload 2 of 4, '(filter: Filter<Document>, update: Document[] | UpdateFilter<Document>, options: FindOneAndUpdateOptions & { ...; }): Promise<...>', gave the following error.
  Overload 3 of 4, '(filter: Filter<Document>, update: Document[] | UpdateFilter<Document>, options: FindOneAndUpdateOptions): Promise<...>', gave the following error.

[7m84[0m       { _id: id, user_id: userId },
[7m  [0m [91m        ~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m81[0m:[93m36[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m81[0m   const result = await mongoClient.db
[7m  [0m [91m                                   ~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m81[0m:[93m24[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m81[0m   const result = await mongoClient.db
[7m  [0m [91m                       ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m57[0m:[93m9[0m - [91merror[0m[90m ts(2554): [0mExpected 4-6 arguments, but got 1.

[7m57[0m   await createAuditLog({
[7m  [0m [91m        ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m47[0m:[93m36[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m47[0m   const result = await mongoClient.db
[7m  [0m [91m                                   ~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m47[0m:[93m24[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m47[0m   const result = await mongoClient.db
[7m  [0m [91m                       ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m35[0m:[93m16[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 6, '(filter: Filter<Document>): Promise<WithId<Document> | null>', gave the following error.
  Overload 2 of 6, '(filter: Filter<Document>): Promise<Document | null>', gave the following error.
  Overload 3 of 6, '(filter: Filter<Document>, options?: (Omit<FindOptions<Document>, "timeoutMode"> & Abortable) | undefined): Promise<...>', gave the following error.

[7m35[0m     .findOne({ _id: id, user_id: userId })
[7m  [0m [91m               ~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m33[0m:[93m42[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m33[0m   const conversation = await mongoClient.db
[7m  [0m [91m                                         ~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m33[0m:[93m30[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m33[0m   const conversation = await mongoClient.db
[7m  [0m [91m                             ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m17[0m:[93m43[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m17[0m   const conversations = await mongoClient.db
[7m  [0m [91m                                          ~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m17[0m:[93m31[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m17[0m   const conversations = await mongoClient.db
[7m  [0m [91m                              ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/conversations.ts[0m:[93m1[0m:[93m31[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../types/supabase' or its corresponding type declarations.

[7m1[0m import type { Database } from '../../types/supabase'
[7m [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/db/messages.ts[0m:[93m162[0m:[93m38[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m162[0m   const messages = await mongoClient.db
[7m   [0m [91m                                     ~~[0m
[96msrc/lib/db/messages.ts[0m:[93m162[0m:[93m26[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m162[0m   const messages = await mongoClient.db
[7m   [0m [91m                         ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m120[0m:[93m9[0m - [91merror[0m[90m ts(2554): [0mExpected 4-6 arguments, but got 1.

[7m120[0m   await createAuditLog({
[7m   [0m [91m        ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m110[0m:[93m9[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 4, '(filter: Filter<Document>, update: Document[] | UpdateFilter<Document>, options: FindOneAndUpdateOptions & { ...; }): Promise<...>', gave the following error.
  Overload 2 of 4, '(filter: Filter<Document>, update: Document[] | UpdateFilter<Document>, options: FindOneAndUpdateOptions & { ...; }): Promise<...>', gave the following error.
  Overload 3 of 4, '(filter: Filter<Document>, update: Document[] | UpdateFilter<Document>, options: FindOneAndUpdateOptions): Promise<...>', gave the following error.

[7m110[0m       { _id: id, conversation_id: conversationId },
[7m   [0m [91m        ~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m107[0m:[93m36[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m107[0m   const result = await mongoClient.db
[7m   [0m [91m                                   ~~[0m
[96msrc/lib/db/messages.ts[0m:[93m107[0m:[93m24[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m107[0m   const result = await mongoClient.db
[7m   [0m [91m                       ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m100[0m:[93m16[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 6, '(filter: Filter<Document>): Promise<WithId<Document> | null>', gave the following error.
  Overload 2 of 6, '(filter: Filter<Document>): Promise<Document | null>', gave the following error.
  Overload 3 of 6, '(filter: Filter<Document>, options?: (Omit<FindOptions<Document>, "timeoutMode"> & Abortable) | undefined): Promise<...>', gave the following error.

[7m100[0m     .findOne({ _id: conversationId, user_id: userId })
[7m   [0m [91m               ~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m98[0m:[93m42[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m98[0m   const conversation = await mongoClient.db
[7m  [0m [91m                                         ~~[0m
[96msrc/lib/db/messages.ts[0m:[93m98[0m:[93m30[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m98[0m   const conversation = await mongoClient.db
[7m  [0m [91m                             ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m71[0m:[93m9[0m - [91merror[0m[90m ts(2554): [0mExpected 4-6 arguments, but got 1.

[7m71[0m   await createAuditLog({
[7m  [0m [91m        ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m58[0m:[93m36[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m58[0m   const result = await mongoClient.db.collection('messages').insertOne(message)
[7m  [0m [91m                                   ~~[0m
[96msrc/lib/db/messages.ts[0m:[93m58[0m:[93m24[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m58[0m   const result = await mongoClient.db.collection('messages').insertOne(message)
[7m  [0m [91m                       ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m49[0m:[93m42[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m49[0m   const conversation = await mongoClient.db
[7m  [0m [91m                                         ~~[0m
[96msrc/lib/db/messages.ts[0m:[93m49[0m:[93m30[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m49[0m   const conversation = await mongoClient.db
[7m  [0m [91m                             ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m29[0m:[93m38[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m29[0m   const messages = await mongoClient.db
[7m  [0m [91m                                     ~~[0m
[96msrc/lib/db/messages.ts[0m:[93m29[0m:[93m26[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m29[0m   const messages = await mongoClient.db
[7m  [0m [91m                         ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m22[0m:[93m16[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 6, '(filter: Filter<Document>): Promise<WithId<Document> | null>', gave the following error.
  Overload 2 of 6, '(filter: Filter<Document>): Promise<Document | null>', gave the following error.
  Overload 3 of 6, '(filter: Filter<Document>, options?: (Omit<FindOptions<Document>, "timeoutMode"> & Abortable) | undefined): Promise<...>', gave the following error.

[7m22[0m     .findOne({ _id: conversationId, user_id: userId })
[7m  [0m [91m               ~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m20[0m:[93m42[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m20[0m   const conversation = await mongoClient.db
[7m  [0m [91m                                         ~~[0m
[96msrc/lib/db/messages.ts[0m:[93m20[0m:[93m30[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m20[0m   const conversation = await mongoClient.db
[7m  [0m [91m                             ~~~~~~~~~~~~~~[0m
[96msrc/lib/db/messages.ts[0m:[93m1[0m:[93m31[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../types/supabase' or its corresponding type declarations.

[7m1[0m import type { Database } from '../../types/supabase'
[7m [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/db/supabase.ts[0m:[93m5[0m:[93m33[0m - [91merror[0m[90m ts(4111): [0mProperty 'MONGODB_DB_NAME' comes from an index signature, so it must be accessed with ['MONGODB_DB_NAME'].

[7m5[0m const mongoDbName = process.env.MONGODB_DB_NAME
[7m [0m [91m                                ~~~~~~~~~~~~~~~[0m
[96msrc/lib/db/supabase.ts[0m:[93m4[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'MONGODB_URI' comes from an index signature, so it must be accessed with ['MONGODB_URI'].

[7m4[0m const mongoUri = process.env.MONGODB_URI
[7m [0m [91m                             ~~~~~~~~~~~[0m

[96msrc/lib/db/migrations/20250320_add_ai_performance_metrics.ts[0m:[93m35[0m:[93m19[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'TemplateStringsArray' is not assignable to parameter of type 'string'.

[7m35[0m   await sql.unsafe`
[7m  [0m [91m                  ~[0m
[7m36[0m     DROP TABLE IF EXISTS ai_performance_metrics;
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m37[0m   `
[7m  [0m [91m~~~[0m
[96msrc/lib/db/migrations/20250320_add_ai_performance_metrics.ts[0m:[93m7[0m:[93m19[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'TemplateStringsArray' is not assignable to parameter of type 'string'.

[7m  7[0m   await sql.unsafe`
[7m   [0m [91m                  ~[0m
[7m  8[0m     CREATE TABLE IF NOT EXISTS ai_performance_metrics (
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m 28[0m     CREATE INDEX IF NOT EXISTS idx_ai_perf_success ON ai_performance_metrics(success);
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m 29[0m   `
[7m   [0m [91m~~~[0m

[96msrc/lib/db/security/initialize.ts[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"../../audit/log"' has no exported member 'createAuditLog'.

[7m1[0m import { createAuditLog } from '../../audit/log'
[7m [0m [91m         ~~~~~~~~~~~~~~[0m

[96msrc/lib/db/security/schema.ts[0m:[93m8[0m:[93m33[0m - [91merror[0m[90m ts(4111): [0mProperty 'MONGODB_DB_NAME' comes from an index signature, so it must be accessed with ['MONGODB_DB_NAME'].

[7m8[0m const mongoDbName = process.env.MONGODB_DB_NAME
[7m [0m [91m                                ~~~~~~~~~~~~~~~[0m
[96msrc/lib/db/security/schema.ts[0m:[93m7[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'MONGODB_URI' comes from an index signature, so it must be accessed with ['MONGODB_URI'].

[7m7[0m const mongoUri = process.env.MONGODB_URI
[7m [0m [91m                             ~~~~~~~~~~~[0m

[96msrc/lib/documentation/useDocumentation.ts[0m:[93m419[0m:[93m25[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m419[0m             ? { errors: rawResult.errors }
[7m   [0m [91m                        ~~~~~~~~~[0m
[96msrc/lib/documentation/useDocumentation.ts[0m:[93m418[0m:[93m29[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m418[0m           ...(Array.isArray(rawResult.errors)
[7m   [0m [91m                            ~~~~~~~~~[0m
[96msrc/lib/documentation/useDocumentation.ts[0m:[93m417[0m:[93m54[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m417[0m           ...(rawResult.data !== undefined ? { data: rawResult.data } : {}),
[7m   [0m [91m                                                     ~~~~~~~~~[0m
[96msrc/lib/documentation/useDocumentation.ts[0m:[93m417[0m:[93m15[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m417[0m           ...(rawResult.data !== undefined ? { data: rawResult.data } : {}),
[7m   [0m [91m              ~~~~~~~~~[0m
[96msrc/lib/documentation/useDocumentation.ts[0m:[93m410[0m:[93m17[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m410[0m               ? rawResult.metadata
[7m   [0m [91m                ~~~~~~~~~[0m
[96msrc/lib/documentation/useDocumentation.ts[0m:[93m409[0m:[93m13[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m409[0m             rawResult.metadata !== null
[7m   [0m [91m            ~~~~~~~~~[0m
[96msrc/lib/documentation/useDocumentation.ts[0m:[93m408[0m:[93m20[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m408[0m             typeof rawResult.metadata === 'object' &&
[7m   [0m [91m                   ~~~~~~~~~[0m
[96msrc/lib/documentation/useDocumentation.ts[0m:[93m405[0m:[93m17[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m405[0m               ? rawResult.format
[7m   [0m [91m                ~~~~~~~~~[0m
[96msrc/lib/documentation/useDocumentation.ts[0m:[93m404[0m:[93m20[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m404[0m             typeof rawResult.format === 'string'
[7m   [0m [91m                   ~~~~~~~~~[0m
[96msrc/lib/documentation/useDocumentation.ts[0m:[93m402[0m:[93m54[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m402[0m             typeof rawResult.success === 'boolean' ? rawResult.success : false,
[7m   [0m [91m                                                     ~~~~~~~~~[0m
[96msrc/lib/documentation/useDocumentation.ts[0m:[93m402[0m:[93m20[0m - [91merror[0m[90m ts(18046): [0m'rawResult' is of type 'unknown'.

[7m402[0m             typeof rawResult.success === 'boolean' ? rawResult.success : false,
[7m   [0m [91m                   ~~~~~~~~~[0m

[96msrc/lib/ehr/__tests__/allscripts.test.ts[0m:[93m24[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'CLIENT_SECRET' comes from an index signature, so it must be accessed with ['CLIENT_SECRET'].

[7m24[0m     clientSecret: process.env.CLIENT_SECRET || 'example-client-secret',
[7m  [0m [91m                              ~~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/allscripts.test.ts[0m:[93m23[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'testId'.

[7m23[0m     clientId: testId || 'example-client-id',
[7m  [0m [91m              ~~~~~~[0m

[96msrc/lib/ehr/__tests__/athenahealth.test.ts[0m:[93m15[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'CLIENT_SECRET' comes from an index signature, so it must be accessed with ['CLIENT_SECRET'].

[7m15[0m     clientSecret: process.env.CLIENT_SECRET || 'example-client-secret',
[7m  [0m [91m                              ~~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/athenahealth.test.ts[0m:[93m14[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'testId'.

[7m14[0m     clientId: testId || 'example-client-id',
[7m  [0m [91m              ~~~~~~[0m

[96msrc/lib/ehr/__tests__/cerner.test.ts[0m:[93m16[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'CLIENT_SECRET' comes from an index signature, so it must be accessed with ['CLIENT_SECRET'].

[7m16[0m     clientSecret: process.env.CLIENT_SECRET || 'example-client-secret',
[7m  [0m [91m                              ~~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/cerner.test.ts[0m:[93m15[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'testId'.

[7m15[0m     clientId: testId || 'example-client-id',
[7m  [0m [91m              ~~~~~~[0m

[96msrc/lib/ehr/__tests__/ehr.test.ts[0m:[93m110[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'CLIENT_SECRET' comes from an index signature, so it must be accessed with ['CLIENT_SECRET'].

[7m110[0m     clientSecret: process.env.CLIENT_SECRET || 'example-client-secret',
[7m   [0m [91m                              ~~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/ehr.test.ts[0m:[93m109[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'testId'.

[7m109[0m     clientId: testId || 'example-client-id',
[7m   [0m [91m              ~~~~~~[0m
[96msrc/lib/ehr/__tests__/ehr.test.ts[0m:[93m87[0m:[93m42[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ id: string; name: string; vendor: "epic"; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is not assignable to parameter of type 'EHRProvider'.
  Type '{ id: string; name: string; vendor: "epic"; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is missing the following properties from type 'EHRProvider': initialize, cleanup

[7m87[0m       await ehrService.configureProvider(mockProvider)
[7m  [0m [91m                                         ~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/ehr.test.ts[0m:[93m78[0m:[93m42[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ id: string; name: string; vendor: "epic"; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is not assignable to parameter of type 'EHRProvider'.
  Type '{ id: string; name: string; vendor: "epic"; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is missing the following properties from type 'EHRProvider': initialize, cleanup

[7m78[0m       await ehrService.configureProvider(mockProvider)
[7m  [0m [91m                                         ~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/ehr.test.ts[0m:[93m67[0m:[93m42[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ id: string; name: string; vendor: "epic"; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is not assignable to parameter of type 'EHRProvider'.
  Type '{ id: string; name: string; vendor: "epic"; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is missing the following properties from type 'EHRProvider': initialize, cleanup

[7m67[0m       await ehrService.configureProvider(mockProvider)
[7m  [0m [91m                                         ~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/ehr.test.ts[0m:[93m53[0m:[93m42[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ id: string; name: string; vendor: "epic"; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is not assignable to parameter of type 'EHRProvider'.
  Type '{ id: string; name: string; vendor: "epic"; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is missing the following properties from type 'EHRProvider': initialize, cleanup

[7m53[0m       await ehrService.configureProvider(mockProvider)
[7m  [0m [91m                                         ~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/ehr.test.ts[0m:[93m46[0m:[93m38[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ vendor: string; id: string; name: string; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is not assignable to parameter of type 'EHRProvider'.
  Type '{ vendor: string; id: string; name: string; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is missing the following properties from type 'EHRProvider': initialize, cleanup

[7m46[0m         ehrService.configureProvider(invalidProvider),
[7m  [0m [91m                                     ~~~~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/ehr.test.ts[0m:[93m36[0m:[93m38[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ id: string; name: string; vendor: "epic"; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is not assignable to parameter of type 'EHRProvider'.
  Type '{ id: string; name: string; vendor: "epic"; baseUrl: string; clientId: any; clientSecret: string; scopes: string[]; }' is missing the following properties from type 'EHRProvider': initialize, cleanup

[7m36[0m         ehrService.configureProvider(mockProvider),
[7m  [0m [91m                                     ~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/ehr.test.ts[0m:[93m18[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'CLIENT_SECRET' comes from an index signature, so it must be accessed with ['CLIENT_SECRET'].

[7m18[0m     clientSecret: process.env.CLIENT_SECRET || 'example-client-secret',
[7m  [0m [91m                              ~~~~~~~~~~~~~[0m
[96msrc/lib/ehr/__tests__/ehr.test.ts[0m:[93m17[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'testId'.

[7m17[0m     clientId: testId || 'example-client-id',
[7m  [0m [91m              ~~~~~~[0m

[96msrc/lib/ehr/plugins/api.ts[0m:[93m25[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'RedisStorageAPI' is not assignable to type 'StorageAPI'.
  The types returned by 'get(...)' are incompatible between these types.

[7m25[0m     storage,
[7m  [0m [91m    ~~~~~~~[0m

[96msrc/lib/ehr/providers/allscripts.provider.ts[0m:[93m160[0m:[93m9[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'BaseEHRProvider'.

[7m160[0m   async cleanup(): Promise<void> {
[7m   [0m [91m        ~~~~~~~[0m
[96msrc/lib/ehr/providers/allscripts.provider.ts[0m:[93m130[0m:[93m22[0m - [91merror[0m[90m ts(18046): [0m'capabilityStatement' is of type 'unknown'.

[7m130[0m     const security = capabilityStatement.rest[0]?.security
[7m   [0m [91m                     ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ehr/providers/allscripts.provider.ts[0m:[93m122[0m:[93m12[0m - [91merror[0m[90m ts(18046): [0m'capabilityStatement' is of type 'unknown'.

[7m122[0m       if (!capabilityStatement[feature]) {
[7m   [0m [91m           ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/ehr/providers/allscripts.provider.ts[0m:[93m31[0m:[93m9[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'BaseEHRProvider'.

[7m31[0m   async initialize(): Promise<void> {
[7m  [0m [91m        ~~~~~~~~~~[0m

[96msrc/lib/ehr/providers/athenahealth.provider.ts[0m:[93m186[0m:[93m9[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'BaseEHRProvider'.

[7m186[0m   async cleanup(): Promise<void> {
[7m   [0m [91m        ~~~~~~~[0m
[96msrc/lib/ehr/providers/athenahealth.provider.ts[0m:[93m57[0m:[93m9[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'BaseEHRProvider'.

[7m57[0m   async initialize(): Promise<void> {
[7m  [0m [91m        ~~~~~~~~~~[0m

[96msrc/lib/ehr/providers/cerner.provider.ts[0m:[93m108[0m:[93m9[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'BaseEHRProvider'.

[7m108[0m   async cleanup(): Promise<void> {
[7m   [0m [91m        ~~~~~~~[0m
[96msrc/lib/ehr/providers/cerner.provider.ts[0m:[93m29[0m:[93m9[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'BaseEHRProvider'.

[7m29[0m   async initialize(): Promise<void> {
[7m  [0m [91m        ~~~~~~~~~~[0m

[96msrc/lib/ehr/providers/epic.provider.ts[0m:[93m69[0m:[93m9[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'BaseEHRProvider'.

[7m69[0m   async cleanup(): Promise<void> {
[7m  [0m [91m        ~~~~~~~[0m
[96msrc/lib/ehr/providers/epic.provider.ts[0m:[93m24[0m:[93m9[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'BaseEHRProvider'.

[7m24[0m   async initialize(): Promise<void> {
[7m  [0m [91m        ~~~~~~~~~~[0m

[96msrc/lib/ehr/services/oauth2.service.ts[0m:[93m48[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'access_token' does not exist on type 'string'.

[7m48[0m     return newToken.access_token
[7m  [0m [91m                    ~~~~~~~~~~~~[0m

[96msrc/lib/ehr/services/redis.storage.ts[0m:[93m37[0m:[93m9[0m - [91merror[0m[90m ts(2416): [0mProperty 'get' in type 'RedisStorageAPI' is not assignable to the same property in base type 'StorageAPI'.
  Type '(key: string) => Promise<unknown>' is not assignable to type '<T = unknown>(key: string) => Promise<T>'.

[7m37[0m   async get(key: string): Promise<unknown> {
[7m  [0m [91m        ~~~[0m

[96msrc/lib/error/ErrorBoundary.tsx[0m:[93m45[0m:[93m10[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'Component<Props, State, any>'.

[7m45[0m   public render() {
[7m  [0m [91m         ~~~~~~[0m
[96msrc/lib/error/ErrorBoundary.tsx[0m:[93m29[0m:[93m10[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'Component<Props, State, any>'.

[7m29[0m   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
[7m  [0m [91m         ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/error/ErrorBoundary.tsx[0m:[93m20[0m:[93m10[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'Component<Props, State, any>'.

[7m20[0m   public state: State = {
[7m  [0m [91m         ~~~~~[0m

[96msrc/lib/fhe/analytics.ts[0m:[93m645[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m645[0m           userMessages[userMessages.length - 1].timestamp || Date.now()
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/analytics.ts[0m:[93m643[0m:[93m32[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m643[0m         const firstTimestamp = userMessages[0].timestamp || Date.now()
[7m   [0m [91m                               ~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/analytics.ts[0m:[93m520[0m:[93m13[0m - [91merror[0m[90m ts(2322): [0mType 'ChatMessage | undefined' is not assignable to type 'ChatMessage'.
  Type 'undefined' is not assignable to type 'ChatMessage'.

[7m520[0m             client: filteredMessages[i + 1],
[7m   [0m [91m            ~~~~~~[0m
[96msrc/lib/fhe/analytics.ts[0m:[93m519[0m:[93m13[0m - [91merror[0m[90m ts(2322): [0mType 'ChatMessage | undefined' is not assignable to type 'ChatMessage'.
  Type 'undefined' is not assignable to type 'ChatMessage'.

[7m519[0m             therapist: filteredMessages[i],
[7m   [0m [91m            ~~~~~~~~~[0m
[96msrc/lib/fhe/analytics.ts[0m:[93m516[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m516[0m           filteredMessages[i + 1].role === 'user'
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/analytics.ts[0m:[93m515[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m515[0m           filteredMessages[i].role === 'assistant' &&
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/fhe/exports.ts[0m:[93m81[0m:[93m10[0m - [91merror[0m[90m ts(2614): [0mModule '"./index"' has no exported member 'FHEService'. Did you mean to use 'import FHEService from "./index"' instead?

[7m81[0m export { FHEService } from './index'
[7m  [0m [91m         ~~~~~~~~~~[0m
[96msrc/lib/fhe/exports.ts[0m:[93m69[0m:[93m11[0m - [91merror[0m[90m ts(2339): [0mProperty 'fheService' does not exist on type 'typeof import("/home/vivi/pixelated/src/lib/fhe/index")'.

[7m69[0m   const { fheService } = await import('./index')
[7m  [0m [91m          ~~~~~~~~~~[0m
[96msrc/lib/fhe/exports.ts[0m:[93m28[0m:[93m10[0m - [91merror[0m[90m ts(2614): [0mModule '"./index"' has no exported member 'fheService'. Did you mean to use 'import fheService from "./index"' instead?

[7m28[0m export { fheService } from './index'
[7m  [0m [91m         ~~~~~~~~~~[0m

[96msrc/lib/fhe/fhe-factory.ts[0m:[93m569[0m:[93m98[0m - [91merror[0m[90m ts(4111): [0mProperty 'tenantId' comes from an index signature, so it must be accessed with ['tenantId'].

[7m569[0m           `Tenant ${tenantId} attempted to decrypt data owned by tenant ${encryptedData.metadata.tenantId}`,
[7m   [0m [91m                                                                                                 ~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m566[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'tenantId' comes from an index signature, so it must be accessed with ['tenantId'].

[7m566[0m         encryptedData.metadata.tenantId !== tenantId
[7m   [0m [91m                               ~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m565[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'tenantId' comes from an index signature, so it must be accessed with ['tenantId'].

[7m565[0m         encryptedData.metadata.tenantId &&
[7m   [0m [91m                               ~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m331[0m:[93m34[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'string'.

[7m331[0m       return createEncryptedData(result.result)
[7m   [0m [91m                                 ~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m325[0m:[93m50[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{}' is not assignable to parameter of type 'SealCipherText'.
  Type '{}' is missing the following properties from type 'SealCipherText': copy, delete

[7m325[0m       const result = await sealOperations.rotate(ciphertext, steps)
[7m   [0m [91m                                                 ~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m319[0m:[93m26[0m - [91merror[0m[90m ts(4111): [0mProperty 'serializedCiphertext' comes from an index signature, so it must be accessed with ['serializedCiphertext'].

[7m319[0m         vector.metadata?.serializedCiphertext || (vector.data as string)
[7m   [0m [91m                         ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m305[0m:[93m34[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'string'.

[7m305[0m       return createEncryptedData(result.result)
[7m   [0m [91m                                 ~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m299[0m:[93m54[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{}' is not assignable to parameter of type 'SealCipherText'.
  Type '{}' is missing the following properties from type 'SealCipherText': copy, delete

[7m299[0m       const result = await sealOperations.polynomial(ciphertext, coefficients)
[7m   [0m [91m                                                     ~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m293[0m:[93m25[0m - [91merror[0m[90m ts(4111): [0mProperty 'serializedCiphertext' comes from an index signature, so it must be accessed with ['serializedCiphertext'].

[7m293[0m         value.metadata?.serializedCiphertext || (value.data as string)
[7m   [0m [91m                        ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m279[0m:[93m34[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'string'.

[7m279[0m       return createEncryptedData(result.result)
[7m   [0m [91m                                 ~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m273[0m:[93m50[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{}' is not assignable to parameter of type 'SealCipherText'.
  Type '{}' is missing the following properties from type 'SealCipherText': copy, delete

[7m273[0m       const result = await sealOperations.negate(ciphertext)
[7m   [0m [91m                                                 ~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m267[0m:[93m25[0m - [91merror[0m[90m ts(4111): [0mProperty 'serializedCiphertext' comes from an index signature, so it must be accessed with ['serializedCiphertext'].

[7m267[0m         value.metadata?.serializedCiphertext || (value.data as string)
[7m   [0m [91m                        ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m256[0m:[93m34[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'string'.

[7m256[0m       return createEncryptedData(result.result)
[7m   [0m [91m                                 ~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m248[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type 'SealCipherText'.

[7m248[0m         aCiphertext as string,
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m241[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'serializedCiphertext' comes from an index signature, so it must be accessed with ['serializedCiphertext'].

[7m241[0m       const bCiphertext = b.metadata?.serializedCiphertext || (b.data as string)
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m240[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'serializedCiphertext' comes from an index signature, so it must be accessed with ['serializedCiphertext'].

[7m240[0m       const aCiphertext = a.metadata?.serializedCiphertext || (a.data as string)
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m222[0m:[93m34[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'string'.

[7m222[0m       return createEncryptedData(result.result)
[7m   [0m [91m                                 ~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m214[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type 'SealCipherText'.

[7m214[0m         aCiphertext as string,
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m207[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'serializedCiphertext' comes from an index signature, so it must be accessed with ['serializedCiphertext'].

[7m207[0m       const bCiphertext = b.metadata?.serializedCiphertext || (b.data as string)
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m206[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'serializedCiphertext' comes from an index signature, so it must be accessed with ['serializedCiphertext'].

[7m206[0m       const aCiphertext = a.metadata?.serializedCiphertext || (a.data as string)
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m188[0m:[93m34[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'string'.

[7m188[0m       return createEncryptedData(result.result)
[7m   [0m [91m                                 ~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m180[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type 'SealCipherText'.

[7m180[0m         aCiphertext as string,
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m173[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'serializedCiphertext' comes from an index signature, so it must be accessed with ['serializedCiphertext'].

[7m173[0m       const bCiphertext = b.metadata?.serializedCiphertext || (b.data as string)
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m172[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'serializedCiphertext' comes from an index signature, so it must be accessed with ['serializedCiphertext'].

[7m172[0m       const aCiphertext = a.metadata?.serializedCiphertext || (a.data as string)
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m154[0m:[93m41[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{}' is not assignable to parameter of type 'SealCipherText'.
  Type '{}' is missing the following properties from type 'SealCipherText': copy, delete

[7m154[0m       return (await sealService.decrypt(ciphertext)) as T
[7m   [0m [91m                                        ~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m147[0m:[93m33[0m - [91merror[0m[90m ts(4111): [0mProperty 'serializedCiphertext' comes from an index signature, so it must be accessed with ['serializedCiphertext'].

[7m147[0m         encryptedData.metadata?.serializedCiphertext ||
[7m   [0m [91m                                ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/fhe-factory.ts[0m:[93m133[0m:[93m34[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'SealCipherText' is not assignable to parameter of type 'string'.

[7m133[0m       return createEncryptedData(encrypted, data as number[])
[7m   [0m [91m                                 ~~~~~~~~~[0m

[96msrc/lib/fhe/hipaa-monitoring.ts[0m:[93m11[0m:[93m17[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'aws-sdk' or its corresponding type declarations.

[7m11[0m import AWS from 'aws-sdk'
[7m  [0m [91m                ~~~~~~~~~[0m

[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m497[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'supported' comes from an index signature, so it must be accessed with ['supported'].

[7m497[0m         metadata.supported = false
[7m   [0m [91m                 ~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m492[0m:[93m35[0m - [91merror[0m[90m ts(4111): [0mProperty 'operation' comes from an index signature, so it must be accessed with ['operation'].

[7m492[0m         metadata.custom = params?.operation || 'unknown'
[7m   [0m [91m                                  ~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m492[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'custom' comes from an index signature, so it must be accessed with ['custom'].

[7m492[0m         metadata.custom = params?.operation || 'unknown'
[7m   [0m [91m                 ~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m489[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'operation' comes from an index signature, so it must be accessed with ['operation'].

[7m489[0m           params?.operation as string,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m483[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'filtered' comes from an index signature, so it must be accessed with ['filtered'].

[7m483[0m         metadata.filtered = true
[7m   [0m [91m                 ~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m481[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'filterTerms' comes from an index signature, so it must be accessed with ['filterTerms'].

[7m481[0m           params?.filterTerms as string[] | undefined,
[7m   [0m [91m                  ~~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m475[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'tokenCount' comes from an index signature, so it must be accessed with ['tokenCount'].

[7m475[0m         metadata.tokenCount = tokens.length
[7m   [0m [91m                 ~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m469[0m:[93m38[0m - [91merror[0m[90m ts(4111): [0mProperty 'maxLength' comes from an index signature, so it must be accessed with ['maxLength'].

[7m469[0m         metadata.maxLength = params?.maxLength || 100
[7m   [0m [91m                                     ~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m469[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'maxLength' comes from an index signature, so it must be accessed with ['maxLength'].

[7m469[0m         metadata.maxLength = params?.maxLength || 100
[7m   [0m [91m                 ~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m467[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'maxLength' comes from an index signature, so it must be accessed with ['maxLength'].

[7m467[0m           params?.maxLength as number | undefined,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m461[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'categories' comes from an index signature, so it must be accessed with ['categories'].

[7m461[0m         metadata.categories = params?.categories || {}
[7m   [0m [91m                                      ~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m461[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'categories' comes from an index signature, so it must be accessed with ['categories'].

[7m461[0m         metadata.categories = params?.categories || {}
[7m   [0m [91m                 ~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m459[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'categories' comes from an index signature, so it must be accessed with ['categories'].

[7m459[0m           params?.categories as Record<string, string[]> | undefined,
[7m   [0m [91m                  ~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m453[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'confidence' comes from an index signature, so it must be accessed with ['confidence'].

[7m453[0m         metadata.confidence = 0.85
[7m   [0m [91m                 ~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m396[0m:[93m18[0m - [91merror[0m[90m ts(2322): [0mType 'unknown' is not assignable to type 'string'.

[7m396[0m         return { result: rotResult.result, success: rotResult.success }
[7m   [0m [91m                 ~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m395[0m:[93m47[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type 'SealCipherText'.

[7m395[0m         rotResult = await this.sealOps.rotate(serializedCiphertext, steps)
[7m   [0m [91m                                              ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m394[0m:[93m26[0m - [91merror[0m[90m ts(4111): [0mProperty 'steps' comes from an index signature, so it must be accessed with ['steps'].

[7m394[0m         steps = (params?.steps as number) || 1
[7m   [0m [91m                         ~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m390[0m:[93m18[0m - [91merror[0m[90m ts(2322): [0mType 'unknown' is not assignable to type 'string'.

[7m390[0m         return { result: polyResult.result, success: polyResult.success }
[7m   [0m [91m                 ~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m387[0m:[93m11[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type 'SealCipherText'.

[7m387[0m           serializedCiphertext,
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m385[0m:[93m33[0m - [91merror[0m[90m ts(4111): [0mProperty 'coefficients' comes from an index signature, so it must be accessed with ['coefficients'].

[7m385[0m         coefficients = (params?.coefficients as number[]) || [0, 1]
[7m   [0m [91m                                ~~~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m381[0m:[93m18[0m - [91merror[0m[90m ts(2322): [0mType 'unknown' is not assignable to type 'string'.

[7m381[0m         return { result: negResult.result, success: negResult.success }
[7m   [0m [91m                 ~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m380[0m:[93m47[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type 'SealCipherText'.

[7m380[0m         negResult = await this.sealOps.negate(serializedCiphertext)
[7m   [0m [91m                                              ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m376[0m:[93m18[0m - [91merror[0m[90m ts(2322): [0mType 'unknown' is not assignable to type 'string'.

[7m376[0m         return { result: multResult.result, success: multResult.success }
[7m   [0m [91m                 ~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m373[0m:[93m11[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type 'SealCipherText'.

[7m373[0m           serializedCiphertext,
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m371[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'multiplier' comes from an index signature, so it must be accessed with ['multiplier'].

[7m371[0m         multiplier = (params?.multiplier as number[]) || [2]
[7m   [0m [91m                              ~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m367[0m:[93m18[0m - [91merror[0m[90m ts(2322): [0mType 'unknown' is not assignable to type 'string'.

[7m367[0m         return { result: subResult.result, success: subResult.success }
[7m   [0m [91m                 ~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m364[0m:[93m11[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type 'SealCipherText'.

[7m364[0m           serializedCiphertext,
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m362[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'subtrahend' comes from an index signature, so it must be accessed with ['subtrahend'].

[7m362[0m         subtrahend = (params?.subtrahend as number[]) || [1]
[7m   [0m [91m                              ~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m358[0m:[93m18[0m - [91merror[0m[90m ts(2322): [0mType 'unknown' is not assignable to type 'string'.

[7m358[0m         return { result: addResult.result, success: addResult.success }
[7m   [0m [91m                 ~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m357[0m:[93m44[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type 'SealCipherText'.

[7m357[0m         addResult = await this.sealOps.add(serializedCiphertext, addend)
[7m   [0m [91m                                           ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m356[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'addend' comes from an index signature, so it must be accessed with ['addend'].

[7m356[0m         addend = (params?.addend as number[]) || [1]
[7m   [0m [91m                          ~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m263[0m:[93m43[0m - [91merror[0m[90m ts(4111): [0mProperty 'categories' comes from an index signature, so it must be accessed with ['categories'].

[7m263[0m             metadata.categories = params?.categories || {}
[7m   [0m [91m                                          ~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m263[0m:[93m22[0m - [91merror[0m[90m ts(4111): [0mProperty 'categories' comes from an index signature, so it must be accessed with ['categories'].

[7m263[0m             metadata.categories = params?.categories || {}
[7m   [0m [91m                     ~~~~~~~~~~[0m
[96msrc/lib/fhe/homomorphic-ops.ts[0m:[93m248[0m:[93m22[0m - [91merror[0m[90m ts(4111): [0mProperty 'confidence' comes from an index signature, so it must be accessed with ['confidence'].

[7m248[0m             metadata.confidence = 0.85
[7m   [0m [91m                     ~~~~~~~~~~[0m

[96msrc/lib/fhe/index.ts[0m:[93m68[0m:[93m7[0m - [91merror[0m[90m ts(6133): [0m'data' is declared but its value is never read.

[7m68[0m       data: string,
[7m  [0m [91m      ~~~~[0m
[96msrc/lib/fhe/index.ts[0m:[93m56[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m56[0m       return parts[parts.length - 1]
[7m  [0m [91m      ~~~~~~[0m

[96msrc/lib/fhe/key-rotation.ts[0m:[93m13[0m:[93m17[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'aws-sdk' or its corresponding type declarations.

[7m13[0m import AWS from 'aws-sdk'
[7m  [0m [91m                ~~~~~~~~~[0m
[96msrc/lib/fhe/key-rotation.ts[0m:[93m12[0m:[93m38[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'aws-sdk' or its corresponding type declarations.

[7m12[0m import type { KMS, CloudWatch } from 'aws-sdk'
[7m  [0m [91m                                     ~~~~~~~~~[0m

[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m788[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'determineSecurityLevel' is declared but its value is never read.

[7m788[0m   private determineSecurityLevel(complexity: number): SecurityLevel {
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m776[0m:[93m44[0m - [91merror[0m[90m ts(4111): [0mProperty 'batchSize' comes from an index signature, so it must be accessed with ['batchSize'].

[7m776[0m       const batchSize = context.parameters.batchSize as number
[7m   [0m [91m                                           ~~~~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m768[0m:[93m43[0m - [91merror[0m[90m ts(4111): [0mProperty 'dataSize' comes from an index signature, so it must be accessed with ['dataSize'].

[7m768[0m       const dataSize = context.parameters.dataSize as number
[7m   [0m [91m                                          ~~~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m753[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ polyModulusDegree?: number | undefined; coeffModulusBits?: number[] | undefined; plainModulus?: number; scale?: number; securityLevel?: SealSecurityLevel; }' is not assignable to type 'SealEncryptionParamsOptions'.
  Types of property 'polyModulusDegree' are incompatible.

[7m753[0m     return params
[7m   [0m [91m    ~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m614[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ polyModulusDegree?: number | undefined; coeffModulusBits?: number[] | undefined; plainModulus?: number; scale?: number; securityLevel?: SealSecurityLevel; }' is not assignable to type 'SealEncryptionParamsOptions'.
  Types of property 'polyModulusDegree' are incompatible.

[7m614[0m     return baseParams
[7m   [0m [91m    ~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m573[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ polyModulusDegree?: number | undefined; coeffModulusBits?: number[] | undefined; plainModulus?: number; scale?: number; securityLevel?: SealSecurityLevel; }' is not assignable to type 'SealEncryptionParamsOptions'.
  Types of property 'polyModulusDegree' are incompatible.

[7m573[0m     return baseParams
[7m   [0m [91m    ~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m548[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'basePreset' is declared but its value is never read.

[7m548[0m     basePreset: string,
[7m   [0m [91m    ~~~~~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m541[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ polyModulusDegree?: number | undefined; coeffModulusBits?: number[] | undefined; plainModulus?: number; scale?: number; securityLevel?: SealSecurityLevel; }' is not assignable to type 'SealEncryptionParamsOptions'.
  Types of property 'polyModulusDegree' are incompatible.

[7m541[0m     return baseParams
[7m   [0m [91m    ~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m503[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ polyModulusDegree?: number | undefined; coeffModulusBits?: number[] | undefined; plainModulus?: number; scale?: number; securityLevel?: SealSecurityLevel; }' is not assignable to type 'SealEncryptionParamsOptions'.
  Types of property 'polyModulusDegree' are incompatible.

[7m503[0m     return baseParams
[7m   [0m [91m    ~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m474[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'basePreset' is declared but its value is never read.

[7m474[0m     basePreset: string,
[7m   [0m [91m    ~~~~~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m467[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ polyModulusDegree?: number | undefined; coeffModulusBits?: number[] | undefined; plainModulus?: number; scale?: number; securityLevel?: SealSecurityLevel; }' is not assignable to type 'SealEncryptionParamsOptions'.
  Types of property 'polyModulusDegree' are incompatible.

[7m467[0m     return baseParams
[7m   [0m [91m    ~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m442[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'basePreset' is declared but its value is never read.

[7m442[0m     basePreset: string,
[7m   [0m [91m    ~~~~~~~~~~[0m
[96msrc/lib/fhe/parameter-optimizer.ts[0m:[93m364[0m:[93m7[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m364[0m       operationGroups[metric.operation].push(metric)
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/fhe/pattern-recognition-factory.ts[0m:[93m128[0m:[93m57[0m - [91merror[0m[90m ts(4111): [0mProperty 'mode' comes from an index signature, so it must be accessed with ['mode'].

[7m128[0m     const useMock = config?.useMock === true || config?.mode === 'development'
[7m   [0m [91m                                                        ~~~~[0m
[96msrc/lib/fhe/pattern-recognition-factory.ts[0m:[93m128[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'useMock' comes from an index signature, so it must be accessed with ['useMock'].

[7m128[0m     const useMock = config?.useMock === true || config?.mode === 'development'
[7m   [0m [91m                            ~~~~~~~[0m
[96msrc/lib/fhe/pattern-recognition-factory.ts[0m:[93m107[0m:[93m7[0m - [91merror[0m[90m ts(2741): [0mProperty 'severityScore' is missing in type '{ id: string; riskFactor: string; correlatedFactors: { factor: string; strength: number; }[]; confidence: number; significance: string; }' but required in type 'RiskCorrelation'.

[7m107[0m       {
[7m   [0m [91m      ~[0m
[7m108[0m         id: nanoid(),
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m112[0m         significance: 'Strong correlation detected',
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m113[0m       },
[7m   [0m [91m~~~~~~~[0m
[96msrc/lib/fhe/pattern-recognition-factory.ts[0m:[93m83[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type 'number'.

[7m83[0m         significance: 'Medium significance',
[7m  [0m [91m        ~~~~~~~~~~~~[0m

[96msrc/lib/fhe/run-seal-test.js[0m:[93m13[0m:[93m22[0m - [93mwarning[0m[90m ts(80001): [0mFile is a CommonJS module; it may be converted to an ES module.

[7m13[0m const { execSync } = require('child_process')
[7m  [0m [93m                     ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/fhe/seal-operations.ts[0m:[93m604[0m:[93m13[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m604[0m             coefficients[i],
[7m   [0m [91m            ~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-operations.ts[0m:[93m599[0m:[93m31[0m - [91merror[0m[90m ts(2322): [0mType 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m599[0m           ckksEncoder.encode([coefficients[i]], Number(scale), nextCoef)
[7m   [0m [91m                              ~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-operations.ts[0m:[93m571[0m:[93m11[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m571[0m           coefficients[n],
[7m   [0m [91m          ~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-operations.ts[0m:[93m566[0m:[93m29[0m - [91merror[0m[90m ts(2322): [0mType 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m566[0m         ckksEncoder.encode([coefficients[n]], Number(scale), highestCoef)
[7m   [0m [91m                            ~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-operations.ts[0m:[93m539[0m:[93m13[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m539[0m             coefficients[0],
[7m   [0m [91m            ~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-operations.ts[0m:[93m531[0m:[93m43[0m - [91merror[0m[90m ts(2322): [0mType 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m531[0m           const currentCoeff: number[] = [coefficients[0]]
[7m   [0m [91m                                          ~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-operations.ts[0m:[93m261[0m:[93m13[0m - [91merror[0m[90m ts(2322): [0mType 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m261[0m             coefArray[i] = bAsNumberArray[i]
[7m   [0m [91m            ~~~~~~~~~~~~[0m

[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m734[0m:[93m19[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'T | undefined' is not assignable to parameter of type 'T'.
  'T' could be instantiated with an arbitrary type which could be unrelated to 'T | undefined'.

[7m734[0m       result.push(copy[index])
[7m   [0m [91m                  ~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m711[0m:[93m9[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m711[0m         matrix[i][j] =
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m688[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m688[0m           matrix[i][j] = 0.3 + Math.random() * 0.6
[7m   [0m [91m          ~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m685[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m685[0m           matrix[i][j] = 1 // Self-correlation is always 1
[7m   [0m [91m          ~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m666[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ type: string | undefined; confidence: number; }[]' is not assignable to type '{ type: string; confidence: number; }[]'.
  Type '{ type: string | undefined; confidence: number; }' is not assignable to type '{ type: string; confidence: number; }'.

[7m666[0m     return results
[7m   [0m [91m    ~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m638[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'windowSize' is declared but its value is never read.

[7m638[0m     windowSize: number,
[7m   [0m [91m    ~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m637[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'encryptedFeatures' is declared but its value is never read.

[7m637[0m     encryptedFeatures: unknown[],
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m622[0m:[93m15[0m - [91merror[0m[90m ts(4111): [0mProperty 'isolation' comes from an index signature, so it must be accessed with ['isolation'].

[7m622[0m       weights.isolation || 1,
[7m   [0m [91m              ~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m621[0m:[93m15[0m - [91merror[0m[90m ts(4111): [0mProperty 'substance_use' comes from an index signature, so it must be accessed with ['substance_use'].

[7m621[0m       weights.substance_use || 1,
[7m   [0m [91m              ~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m620[0m:[93m15[0m - [91merror[0m[90m ts(4111): [0mProperty 'suicidal' comes from an index signature, so it must be accessed with ['suicidal'].

[7m620[0m       weights.suicidal || 1,
[7m   [0m [91m              ~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m619[0m:[93m15[0m - [91merror[0m[90m ts(4111): [0mProperty 'helplessness' comes from an index signature, so it must be accessed with ['helplessness'].

[7m619[0m       weights.helplessness || 1,
[7m   [0m [91m              ~~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m618[0m:[93m15[0m - [91merror[0m[90m ts(4111): [0mProperty 'anxiety' comes from an index signature, so it must be accessed with ['anxiety'].

[7m618[0m       weights.anxiety || 1,
[7m   [0m [91m              ~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m617[0m:[93m15[0m - [91merror[0m[90m ts(4111): [0mProperty 'depression' comes from an index signature, so it must be accessed with ['depression'].

[7m617[0m       weights.depression || 1,
[7m   [0m [91m              ~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m591[0m:[93m58[0m - [91merror[0m[90m ts(7006): [0mParameter 'r' implicitly has an 'any' type.

[7m591[0m         const isolationRisk = analysis.riskFactors.find((r) =>
[7m   [0m [91m                                                         ~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m588[0m:[93m58[0m - [91merror[0m[90m ts(7006): [0mParameter 'r' implicitly has an 'any' type.

[7m588[0m         const substanceRisk = analysis.riskFactors.find((r) =>
[7m   [0m [91m                                                         ~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m585[0m:[93m57[0m - [91merror[0m[90m ts(7006): [0mParameter 'r' implicitly has an 'any' type.

[7m585[0m         const suicidalRisk = analysis.riskFactors.find((r) =>
[7m   [0m [91m                                                        ~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m565[0m:[93m12[0m - [91merror[0m[90m ts(7006): [0mParameter 'e' implicitly has an 'any' type.

[7m565[0m           (e) => String(e.type) === 'dominance' || String(e.type) === 'control',
[7m   [0m [91m           ~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m561[0m:[93m12[0m - [91merror[0m[90m ts(7006): [0mParameter 'e' implicitly has an 'any' type.

[7m561[0m           (e) => String(e.type) === 'arousal' || String(e.type) === 'anxiety',
[7m   [0m [91m           ~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m557[0m:[93m12[0m - [91merror[0m[90m ts(7006): [0mParameter 'e' implicitly has an 'any' type.

[7m557[0m           (e) => String(e.type) === 'valence' || String(e.type) === 'happiness',
[7m   [0m [91m           ~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m478[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'dominance' comes from an index signature, so it must be accessed with ['dominance'].

[7m478[0m           featureVector.push(emotions.dominance || 0)
[7m   [0m [91m                                      ~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m477[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'arousal' comes from an index signature, so it must be accessed with ['arousal'].

[7m477[0m           featureVector.push(emotions.arousal || 0)
[7m   [0m [91m                                      ~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m476[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'valence' comes from an index signature, so it must be accessed with ['valence'].

[7m476[0m           featureVector.push(emotions.valence || 0)
[7m   [0m [91m                                      ~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m428[0m:[93m15[0m - [91merror[0m[90m ts(6133): [0m'_data' is declared but its value is never read.

[7m428[0m         const _data = JSON.parse(encryptedData.encryptedData)
[7m   [0m [91m              ~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m380[0m:[93m13[0m - [91merror[0m[90m ts(6133): [0m'_seal' is declared but its value is never read.

[7m380[0m       const _seal = this.sealService.getSeal()
[7m   [0m [91m            ~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m337[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m337[0m           description: patternDescriptions[i % patternDescriptions.length],
[7m   [0m [91m          ~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m335[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m335[0m           type: patternType,
[7m   [0m [91m          ~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m254[0m:[93m13[0m - [91merror[0m[90m ts(6133): [0m'_seal' is declared but its value is never read.

[7m254[0m       const _seal = this.sealService.getSeal()
[7m   [0m [91m            ~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m128[0m:[93m13[0m - [91merror[0m[90m ts(6133): [0m'_seal' is declared but its value is never read.

[7m128[0m       const _seal = this.sealService.getSeal()
[7m   [0m [91m            ~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m33[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'sealOperations' is declared but its value is never read.

[7m33[0m   private sealOperations: SealOperations
[7m  [0m [91m          ~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/seal-pattern-recognition.ts[0m:[93m22[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"../ai/interfaces/therapy"' has no exported member 'EmotionAnalysis'.

[7m22[0m import type { EmotionAnalysis, TherapySession } from '../ai/interfaces/therapy'
[7m  [0m [91m              ~~~~~~~~~~~~~~~[0m

[96msrc/lib/fhe/test-seal-integration.ts[0m:[93m94[0m:[93m51[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'SealCipherText'.

[7m94[0m       const decryptedMult = await service.decrypt(multResult.result)
[7m  [0m [91m                                                  ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/test-seal-integration.ts[0m:[93m78[0m:[93m50[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'SealCipherText'.

[7m78[0m       const decryptedAdd = await service.decrypt(addResult.result)
[7m  [0m [91m                                                 ~~~~~~~~~~~~~~~~[0m

[96msrc/lib/fhe/__tests__/key-rotation.test.ts[0m:[93m92[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'HIPAA_MASTER_SECRET' comes from an index signature, so it must be accessed with ['HIPAA_MASTER_SECRET'].

[7m92[0m       process.env.HIPAA_MASTER_SECRET = undefined
[7m  [0m [91m                  ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/__tests__/key-rotation.test.ts[0m:[93m13[0m:[93m13[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m13[0m process.env.NODE_ENV = 'test'
[7m  [0m [91m            ~~~~~~~~[0m
[96msrc/lib/fhe/__tests__/key-rotation.test.ts[0m:[93m11[0m:[93m13[0m - [91merror[0m[90m ts(4111): [0mProperty 'KEY_ROTATION_LAMBDA_ARN' comes from an index signature, so it must be accessed with ['KEY_ROTATION_LAMBDA_ARN'].

[7m11[0m process.env.KEY_ROTATION_LAMBDA_ARN =
[7m  [0m [91m            ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/__tests__/key-rotation.test.ts[0m:[93m9[0m:[93m13[0m - [91merror[0m[90m ts(4111): [0mProperty 'HIPAA_MASTER_SECRET' comes from an index signature, so it must be accessed with ['HIPAA_MASTER_SECRET'].

[7m9[0m process.env.HIPAA_MASTER_SECRET =
[7m [0m [91m            ~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/fhe/__tests__/multi-tenant-isolation.test.ts[0m:[93m15[0m:[93m31[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../tenant-manager' or its corresponding type declarations.

[7m15[0m import { tenantManager } from '../tenant-manager'
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/fhe/__tests__/multi-tenant-isolation.test.ts[0m:[93m14[0m:[93m10[0m - [91merror[0m[90m ts(2614): [0mModule '"../index"' has no exported member 'fheService'. Did you mean to use 'import fheService from "../index"' instead?

[7m14[0m import { fheService } from '../index'
[7m  [0m [91m         ~~~~~~~~~~[0m

[96msrc/lib/hooks/useKonamiCode.ts[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useEffect, useState, useCallback } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/lib/hooks/useMultidimensionalEmotions.ts[0m:[93m3[0m:[93m46[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/lib/ai/temporal/types' or its corresponding type declarations.

[7m3[0m import type { MultidimensionalPattern } from '@/lib/ai/temporal/types'
[7m [0m [91m                                             ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/hooks/useMultidimensionalEmotions.ts[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2724): [0m'"@/lib/ai/emotions/dimensionalTypes"' has no exported member named 'DimensionalEmotionMap'. Did you mean 'DimensionalEmotion'?

[7m2[0m import type { DimensionalEmotionMap } from '@/lib/ai/emotions/dimensionalTypes'
[7m [0m [91m              ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/jobs/queue.ts[0m:[93m258[0m:[93m34[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | RedisZSetMember' is not assignable to parameter of type 'string'.
  Type 'RedisZSetMember' is not assignable to type 'string'.

[7m258[0m           const job = JSON.parse(jobStr) as Job
[7m   [0m [91m                                 ~~~~~~[0m

[96msrc/lib/jobs/worker.ts[0m:[93m176[0m:[93m13[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ format: "pdf" | "csv" | "json" | undefined; includeDetails: boolean; groupBy?: string; filters?: Record<string, unknown>; }' is not assignable to parameter of type '{ format?: "csv" | "json" | undefined; }'.
  Types of property 'format' are incompatible.

[7m176[0m             safeOptions
[7m   [0m [91m            ~~~~~~~~~~~[0m
[96msrc/lib/jobs/worker.ts[0m:[93m170[0m:[93m11[0m - [91merror[0m[90m ts(2740): [0mType '{ summary: { sessionCount: number; averageBiasScore: number; }; performance: { responseTime: number; throughput: number; errorRate: number; activeConnections: number; }; alerts: Record<string, number>; }' is missing the following properties from type 'BiasReport': reportId, generatedAt, timeRange, overallFairnessScore, and 4 more.

[7m170[0m           report = await biasDetectionEngine.generateBiasReport(
[7m   [0m [91m          ~~~~~~[0m
[96msrc/lib/jobs/worker.ts[0m:[93m142[0m:[93m47[0m - [91merror[0m[90m ts(2551): [0mProperty 'analyzeSessionsBatch' does not exist on type 'BiasDetectionEngine'. Did you mean 'analyzeSession'?

[7m142[0m           results = await biasDetectionEngine.analyzeSessionsBatch(
[7m   [0m [91m                                              ~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/logging/performance-logger.ts[0m:[93m109[0m:[93m23[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m109[0m           fileDate <= timeRange.end.toISOString().split('T')[0]
[7m   [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/logging/performance-logger.ts[0m:[93m108[0m:[93m23[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m108[0m           fileDate >= timeRange.start.toISOString().split('T')[0] &&
[7m   [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/logging/performance-logger.ts[0m:[93m1[0m:[93m41[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../ai/performance' or its corresponding type declarations.

[7m1[0m import type { PerformanceMetrics } from '../ai/performance'
[7m [0m [91m                                        ~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/mental-health/__tests__/service.test.ts[0m:[93m34[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m34[0m       expect(result.analysis?.indicators[0].type).toBe('depression')
[7m  [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/metaaligner/__tests__/integration.test.ts[0m:[93m50[0m:[93m5[0m - [91merror[0m[90m ts(2561): [0mObject literal may only specify known properties, but 'createStreamingChatCompletion' does not exist in type 'Partial<AIService>'. Did you mean to write 'createChatCompletion'?

[7m50[0m     createStreamingChatCompletion: vi.fn(),
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/__tests__/integration.test.ts[0m:[93m6[0m:[93m37[0m - [91merror[0m[90m ts(2305): [0mModule '"../../ai/models/types"' has no exported member 'AICompletion'.

[7m6[0m import type { AIMessage, AIService, AICompletion } from '../../ai/models/types'
[7m [0m [91m                                    ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/__tests__/integration.test.ts[0m:[93m6[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"../../ai/models/types"' has no exported member 'AIMessage'.

[7m6[0m import type { AIMessage, AIService, AICompletion } from '../../ai/models/types'
[7m [0m [91m              ~~~~~~~~~[0m

[96msrc/lib/metaaligner/api/alignment-api.test.ts[0m:[93m511[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'content' does not exist on type 'IntegratedResponse'.

[7m511[0m       expect(result.content).not.toBe('Just deal with it')
[7m   [0m [91m                    ~~~~~~~[0m
[96msrc/lib/metaaligner/api/alignment-api.test.ts[0m:[93m211[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'explanation' does not exist on type 'ObjectiveEvaluationResult'.

[7m211[0m         expect(objectiveResult?.explanation?.length).toBeGreaterThan(0)
[7m   [0m [91m                                ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/api/alignment-api.test.ts[0m:[93m210[0m:[93m40[0m - [91merror[0m[90m ts(2339): [0mProperty 'explanation' does not exist on type 'ObjectiveEvaluationResult'.

[7m210[0m         expect(typeof objectiveResult?.explanation).toBe('string')
[7m   [0m [91m                                       ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/api/alignment-api.test.ts[0m:[93m209[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'explanation' does not exist on type 'ObjectiveEvaluationResult'.

[7m209[0m         expect(objectiveResult?.explanation).toBeTruthy()
[7m   [0m [91m                                ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/api/alignment-api.test.ts[0m:[93m17[0m:[93m3[0m - [91merror[0m[90m ts(2561): [0mObject literal may only specify known properties, but 'createStreamingChatCompletion' does not exist in type 'Partial<AIService>'. Did you mean to write 'createChatCompletion'?

[7m17[0m   createStreamingChatCompletion: vi.fn(),
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/api/alignment-api.test.ts[0m:[93m6[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"../../ai/models/types"' has no exported member 'AIMessage'.

[7m6[0m import type { AIMessage, AIService } from '../../ai/models/types'
[7m [0m [91m              ~~~~~~~~~[0m

[96msrc/lib/metaaligner/api/alignment-api.ts[0m:[93m204[0m:[93m11[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'explanation' does not exist in type 'ObjectiveEvaluationResult'.

[7m204[0m           explanation: `${objective.name}: Score reflects alignment with criteria such as ${objective.criteria.map((c) => c.criterion).join(', ')}.`, // Added default explanation
[7m   [0m [91m          ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/api/alignment-api.ts[0m:[93m144[0m:[93m11[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'explanation' does not exist in type 'ObjectiveEvaluationResult'.

[7m144[0m           explanation: 'Response was null or undefined.',
[7m   [0m [91m          ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/api/alignment-api.ts[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m ts(2305): [0mModule '"../../ai/models/types"' has no exported member 'AIStreamOptions'.

[7m10[0m   AIStreamOptions,
[7m  [0m [91m  ~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/api/alignment-api.ts[0m:[93m8[0m:[93m3[0m - [91merror[0m[90m ts(2305): [0mModule '"../../ai/models/types"' has no exported member 'AIServiceResponse'.

[7m8[0m   AIServiceResponse,
[7m [0m [91m  ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/api/alignment-api.ts[0m:[93m7[0m:[93m3[0m - [91merror[0m[90m ts(2305): [0mModule '"../../ai/models/types"' has no exported member 'AIMessage'.

[7m7[0m   AIMessage,
[7m [0m [91m  ~~~~~~~~~[0m

[96msrc/lib/metaaligner/core/objective-interfaces.test.ts[0m:[93m353[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m353[0m       expect(objective.criteria[0].criterion).toBe('template-criterion')
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-interfaces.test.ts[0m:[93m53[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m53[0m       expect(objective.criteria[0].criterion).toBe('test-criterion')
[7m  [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m565[0m:[93m50[0m - [91merror[0m[90m ts(4111): [0mProperty 'acceptable' comes from an index signature, so it must be accessed with ['acceptable'].

[7m565[0m       DEFAULT_METRICS_CONFIG.benchmarkThresholds.acceptable,
[7m   [0m [91m                                                 ~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m565[0m:[93m7[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'number | undefined' is not assignable to parameter of type 'number | bigint'.
  Type 'undefined' is not assignable to type 'number | bigint'.

[7m565[0m       DEFAULT_METRICS_CONFIG.benchmarkThresholds.acceptable,
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m564[0m:[93m55[0m - [91merror[0m[90m ts(4111): [0mProperty 'good' comes from an index signature, so it must be accessed with ['good'].

[7m564[0m     expect(DEFAULT_METRICS_CONFIG.benchmarkThresholds.good).toBeGreaterThan(
[7m   [0m [91m                                                      ~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m563[0m:[93m66[0m - [91merror[0m[90m ts(4111): [0mProperty 'good' comes from an index signature, so it must be accessed with ['good'].

[7m563[0m     ).toBeGreaterThan(DEFAULT_METRICS_CONFIG.benchmarkThresholds.good)
[7m   [0m [91m                                                                 ~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m563[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'number | undefined' is not assignable to parameter of type 'number | bigint'.
  Type 'undefined' is not assignable to type 'number | bigint'.

[7m563[0m     ).toBeGreaterThan(DEFAULT_METRICS_CONFIG.benchmarkThresholds.good)
[7m   [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m562[0m:[93m50[0m - [91merror[0m[90m ts(4111): [0mProperty 'excellent' comes from an index signature, so it must be accessed with ['excellent'].

[7m562[0m       DEFAULT_METRICS_CONFIG.benchmarkThresholds.excellent,
[7m   [0m [91m                                                 ~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m545[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m545[0m       expect(metrics.criteriaBreakdown[0].contribution).toBe(0)
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m544[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m544[0m       expect(metrics.criteriaBreakdown[0].score).toBe(0)
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m538[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ criteria: { criterion: string; description: string; weight: number; }[]; id?: string | undefined; name?: string | undefined; description?: string | undefined; weight?: number | undefined; evaluationFunction?: ((response: string, context: AlignmentContext) => number) | undefined; }' is not assignable to parameter of type 'ObjectiveDefinition'.
  Types of property 'id' are incompatible.

[7m538[0m         objectiveWithMissingCriteria,
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m533[0m:[93m50[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m533[0m         ...mockEvaluationResult.objectiveResults.correctness,
[7m   [0m [91m                                                 ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m488[0m:[93m30[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ overallScore: number | undefined; timestamp: Date; objectiveResults: Record<string, ObjectiveEvaluationResult>; weights: Record<string, number>; normalizedScores: Record<string, number>; aggregationMethod: AggregationMethod; evaluationContext: AlignmentContext; }' is not assignable to parameter of type 'AlignmentEvaluationResult'.
  Types of property 'overallScore' are incompatible.

[7m488[0m         engine.addEvaluation(evaluation, mockObjectives)
[7m   [0m [91m                             ~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m468[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'ObjectiveDefinition | undefined' is not assignable to parameter of type 'ObjectiveDefinition'.
  Type 'undefined' is not assignable to type 'ObjectiveDefinition'.

[7m468[0m         objective,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m466[0m:[93m70[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m466[0m       const evaluationResult = mockEvaluationResult.objectiveResults.correctness
[7m   [0m [91m                                                                     ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m462[0m:[93m30[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ timestamp: Date; objectiveResults: { correctness: { score: number | undefined; objectiveId?: string | undefined; criteriaScores?: Record<string, number> | undefined; confidence?: number | undefined; metadata?: EvaluationMetadata | undefined; }; }; ... 4 more ...; evaluationContext: AlignmentContext; }' is not assignable to parameter of type 'AlignmentEvaluationResult'.
  Types of property 'objectiveResults' are incompatible.

[7m462[0m         engine.addEvaluation(evaluation, mockObjectives)
[7m   [0m [91m                             ~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m457[0m:[93m56[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m457[0m               ...mockEvaluationResult.objectiveResults.correctness,
[7m   [0m [91m                                                       ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m438[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'ObjectiveDefinition | undefined' is not assignable to parameter of type 'ObjectiveDefinition'.
  Type 'undefined' is not assignable to type 'ObjectiveDefinition'.

[7m438[0m         objective,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m436[0m:[93m70[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m436[0m       const evaluationResult = mockEvaluationResult.objectiveResults.correctness
[7m   [0m [91m                                                                     ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m432[0m:[93m30[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ timestamp: Date; objectiveResults: { correctness: { score: number; objectiveId?: string | undefined; criteriaScores?: Record<string, number> | undefined; confidence?: number | undefined; metadata?: EvaluationMetadata | undefined; }; }; ... 4 more ...; evaluationContext: AlignmentContext; }' is not assignable to parameter of type 'AlignmentEvaluationResult'.
  Types of property 'objectiveResults' are incompatible.

[7m432[0m         engine.addEvaluation(evaluation, mockObjectives)
[7m   [0m [91m                             ~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m427[0m:[93m56[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m427[0m               ...mockEvaluationResult.objectiveResults.correctness,
[7m   [0m [91m                                                       ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m408[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'ObjectiveDefinition | undefined' is not assignable to parameter of type 'ObjectiveDefinition'.
  Type 'undefined' is not assignable to type 'ObjectiveDefinition'.

[7m408[0m         correctnessObjective,
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m406[0m:[93m70[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m406[0m       const evaluationResult = mockEvaluationResult.objectiveResults.correctness
[7m   [0m [91m                                                                     ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m391[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'ObjectiveDefinition | undefined' is not assignable to parameter of type 'ObjectiveDefinition'.
  Type 'undefined' is not assignable to type 'ObjectiveDefinition'.

[7m391[0m         safetyObjective,
[7m   [0m [91m        ~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m389[0m:[93m70[0m - [91merror[0m[90m ts(4111): [0mProperty 'safety' comes from an index signature, so it must be accessed with ['safety'].

[7m389[0m       const evaluationResult = mockEvaluationResult.objectiveResults.safety
[7m   [0m [91m                                                                     ~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m372[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'ObjectiveDefinition | undefined' is not assignable to parameter of type 'ObjectiveDefinition'.
  Type 'undefined' is not assignable to type 'ObjectiveDefinition'.

[7m372[0m         objective,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m364[0m:[93m54[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m364[0m             ...mockEvaluationResult.objectiveResults.correctness,
[7m   [0m [91m                                                     ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m345[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'ObjectiveDefinition | undefined' is not assignable to parameter of type 'ObjectiveDefinition'.
  Type 'undefined' is not assignable to type 'ObjectiveDefinition'.

[7m345[0m         objective,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m343[0m:[93m70[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m343[0m       const evaluationResult = mockEvaluationResult.objectiveResults.correctness
[7m   [0m [91m                                                                     ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m306[0m:[93m30[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ timestamp: Date; objectiveResults: { correctness: { score: number; objectiveId?: string | undefined; criteriaScores?: Record<string, number> | undefined; confidence?: number | undefined; metadata?: EvaluationMetadata | undefined; }; }; ... 4 more ...; evaluationContext: AlignmentContext; }' is not assignable to parameter of type 'AlignmentEvaluationResult'.
  Types of property 'objectiveResults' are incompatible.

[7m306[0m         engine.addEvaluation(evaluation, mockObjectives)
[7m   [0m [91m                             ~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m300[0m:[93m56[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m300[0m               ...mockEvaluationResult.objectiveResults.correctness,
[7m   [0m [91m                                                       ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m229[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'safety' comes from an index signature, so it must be accessed with ['safety'].

[7m229[0m       expect(metrics.objectiveMetrics.safety).toBeDefined()
[7m   [0m [91m                                      ~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m228[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'empathy' comes from an index signature, so it must be accessed with ['empathy'].

[7m228[0m       expect(metrics.objectiveMetrics.empathy).toBeDefined()
[7m   [0m [91m                                      ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m227[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m227[0m       expect(metrics.objectiveMetrics.correctness).toBeDefined()
[7m   [0m [91m                                      ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m202[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'ObjectiveDefinition | undefined' is not assignable to parameter of type 'ObjectiveDefinition'.
  Type 'undefined' is not assignable to type 'ObjectiveDefinition'.

[7m202[0m         objective,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m199[0m:[93m70[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m199[0m       const evaluationResult = mockEvaluationResult.objectiveResults.correctness
[7m   [0m [91m                                                                     ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m179[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'ObjectiveDefinition | undefined' is not assignable to parameter of type 'ObjectiveDefinition'.
  Type 'undefined' is not assignable to type 'ObjectiveDefinition'.

[7m179[0m         objective,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m176[0m:[93m70[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m176[0m       const evaluationResult = mockEvaluationResult.objectiveResults.correctness
[7m   [0m [91m                                                                     ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m157[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'ObjectiveDefinition | undefined' is not assignable to parameter of type 'ObjectiveDefinition'.
  Type 'undefined' is not assignable to type 'ObjectiveDefinition'.

[7m157[0m         objective,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-metrics.test.ts[0m:[93m154[0m:[93m70[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m154[0m       const evaluationResult = mockEvaluationResult.objectiveResults.correctness
[7m   [0m [91m                                                                     ~~~~~~~~~~~[0m

[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m500[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ correctness: ObjectiveEvaluationResult | undefined; }' is not assignable to parameter of type 'Record<string, ObjectiveEvaluationResult>'.
  Property 'correctness' is incompatible with index signature.

[7m500[0m         singleResult,
[7m   [0m [91m        ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m495[0m:[93m44[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m495[0m         correctness: mockEvaluationResults.correctness,
[7m   [0m [91m                                           ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m300[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'empathy' comes from an index signature, so it must be accessed with ['empathy'].

[7m300[0m       expect(result.weights.empathy).toBeGreaterThan(baseWeight)
[7m   [0m [91m                            ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m299[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'safety' comes from an index signature, so it must be accessed with ['safety'].

[7m299[0m       expect(result.weights.safety).toBeGreaterThan(baseWeight)
[7m   [0m [91m                            ~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m236[0m:[93m54[0m - [91merror[0m[90m ts(4111): [0mProperty 'safety' comes from an index signature, so it must be accessed with ['safety'].

[7m236[0m         result.weights.correctness! / result.weights.safety!
[7m   [0m [91m                                                     ~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m236[0m:[93m24[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m236[0m         result.weights.correctness! / result.weights.safety!
[7m   [0m [91m                       ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m234[0m:[93m54[0m - [91merror[0m[90m ts(4111): [0mProperty 'safety' comes from an index signature, so it must be accessed with ['safety'].

[7m234[0m         initialWeights.correctness! / initialWeights.safety!
[7m   [0m [91m                                                     ~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m234[0m:[93m24[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m234[0m         initialWeights.correctness! / initialWeights.safety!
[7m   [0m [91m                       ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m227[0m:[93m50[0m - [91merror[0m[90m ts(4111): [0mProperty 'safety' comes from an index signature, so it must be accessed with ['safety'].

[7m227[0m         result.weights.empathy! / result.weights.safety!
[7m   [0m [91m                                                 ~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m227[0m:[93m24[0m - [91merror[0m[90m ts(4111): [0mProperty 'empathy' comes from an index signature, so it must be accessed with ['empathy'].

[7m227[0m         result.weights.empathy! / result.weights.safety!
[7m   [0m [91m                       ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m225[0m:[93m50[0m - [91merror[0m[90m ts(4111): [0mProperty 'safety' comes from an index signature, so it must be accessed with ['safety'].

[7m225[0m         initialWeights.empathy! / initialWeights.safety!
[7m   [0m [91m                                                 ~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m225[0m:[93m24[0m - [91merror[0m[90m ts(4111): [0mProperty 'empathy' comes from an index signature, so it must be accessed with ['empathy'].

[7m225[0m         initialWeights.empathy! / initialWeights.safety!
[7m   [0m [91m                       ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m128[0m:[93m69[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m128[0m       expect(result.weights.empathy).toBeGreaterThan(result.weights.correctness)
[7m   [0m [91m                                                                    ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m128[0m:[93m54[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'number | undefined' is not assignable to parameter of type 'number | bigint'.
  Type 'undefined' is not assignable to type 'number | bigint'.

[7m128[0m       expect(result.weights.empathy).toBeGreaterThan(result.weights.correctness)
[7m   [0m [91m                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m128[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'empathy' comes from an index signature, so it must be accessed with ['empathy'].

[7m128[0m       expect(result.weights.empathy).toBeGreaterThan(result.weights.correctness)
[7m   [0m [91m                            ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m127[0m:[93m68[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m127[0m       expect(result.weights.safety).toBeGreaterThan(result.weights.correctness)
[7m   [0m [91m                                                                   ~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m127[0m:[93m53[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'number | undefined' is not assignable to parameter of type 'number | bigint'.
  Type 'undefined' is not assignable to type 'number | bigint'.

[7m127[0m       expect(result.weights.safety).toBeGreaterThan(result.weights.correctness)
[7m   [0m [91m                                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m127[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'safety' comes from an index signature, so it must be accessed with ['safety'].

[7m127[0m       expect(result.weights.safety).toBeGreaterThan(result.weights.correctness)
[7m   [0m [91m                            ~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m110[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'safety' comes from an index signature, so it must be accessed with ['safety'].

[7m110[0m       expect(result.weights.safety).toBeCloseTo(expectedWeight, 5)
[7m   [0m [91m                            ~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m109[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'empathy' comes from an index signature, so it must be accessed with ['empathy'].

[7m109[0m       expect(result.weights.empathy).toBeCloseTo(expectedWeight, 5)
[7m   [0m [91m                            ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.test.ts[0m:[93m108[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'correctness' comes from an index signature, so it must be accessed with ['correctness'].

[7m108[0m       expect(result.weights.correctness).toBeCloseTo(expectedWeight, 5)
[7m   [0m [91m                            ~~~~~~~~~~~[0m

[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m497[0m:[93m28[0m - [91merror[0m[90m ts(2538): [0mType 'undefined' cannot be used as an index type.

[7m497[0m         (evaluationResults[Object.keys(evaluationResults)[0]]?.metadata
[7m   [0m [91m                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m496[0m:[93m7[0m - [91merror[0m[90m ts(2739): [0mType '{}' is missing the following properties from type 'AlignmentContext': userQuery, detectedContext

[7m496[0m       evaluationContext:
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m438[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m438[0m           previousWeight: baseWeight,
[7m   [0m [91m          ~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m434[0m:[93m37[0m - [91merror[0m[90m ts(18048): [0m'baseWeight' is possibly 'undefined'.

[7m434[0m       if (Math.abs(adjustedWeight - baseWeight) > 0.01) {
[7m   [0m [91m                                    ~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m308[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m308[0m           weights[objective.id] *= 1.2
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m235[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m235[0m           weights[pref.objectiveId] *= 1 + pref.preferenceStrength
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m201[0m:[93m13[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ContextualObjectiveWeights'.
  No index signature with a parameter of type 'string' was found on type 'ContextualObjectiveWeights'.

[7m201[0m           ? contextualWeights[objectiveId]!
[7m   [0m [91m            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m200[0m:[93m9[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ContextualObjectiveWeights'.
  No index signature with a parameter of type 'string' was found on type 'ContextualObjectiveWeights'.

[7m200[0m         contextualWeights[objectiveId] !== undefined
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m659[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m659[0m   private static geometricMean(
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m641[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m641[0m   private static harmonicMean(
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m627[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m627[0m   private static weightedSum(
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m611[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m611[0m   private static weightedAverage(
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m588[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m588[0m   private static aggregateScores(
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m576[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m576[0m   private static sigmoidNormalize(
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m554[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m554[0m   private static zScoreNormalize(
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m534[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m534[0m   private static minMaxNormalize(
[7m   [0m [91m  ~~~~~~~[0m
[96msrc/lib/metaaligner/core/objective-weighting.ts[0m:[93m503[0m:[93m3[0m - [91merror[0m[90m ts(1005): [0m',' expected.

[7m503[0m   private static extractScores(
[7m   [0m [91m  ~~~~~~~[0m

[96msrc/lib/metaaligner/core/objectives.test.ts[0m:[93m300[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'sessionId' comes from an index signature, so it must be accessed with ['sessionId'].

[7m300[0m       expect(context.sessionMetadata?.sessionId).toBe('123')
[7m   [0m [91m                                      ~~~~~~~~~[0m

[96msrc/lib/metaaligner/explainability/visualization.tsx[0m:[93m6[0m:[93m37[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/components/ui/charts' or its corresponding type declarations.

[7m6[0m import { LineChart, PieChart } from '@/components/ui/charts'
[7m [0m [91m                                    ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/metaaligner/prioritization/EducationalContextRecognizer.ts[0m:[93m294[0m:[93m40[0m - [91merror[0m[90m ts(4111): [0mProperty 'relatedTopics' comes from an index signature, so it must be accessed with ['relatedTopics'].

[7m294[0m       relatedConcepts: result.metadata.relatedTopics || [],
[7m   [0m [91m                                       ~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/EducationalContextRecognizer.ts[0m:[93m263[0m:[93m21[0m - [91merror[0m[90m ts(4111): [0mProperty 'preferredLearningStyle' comes from an index signature, so it must be accessed with ['preferredLearningStyle'].

[7m263[0m     if (userProfile.preferredLearningStyle === 'visual') {
[7m   [0m [91m                    ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/EducationalContextRecognizer.ts[0m:[93m258[0m:[93m28[0m - [91merror[0m[90m ts(4111): [0mProperty 'educationLevel' comes from an index signature, so it must be accessed with ['educationLevel'].

[7m258[0m     } else if (userProfile.educationLevel === 'high_school') {
[7m   [0m [91m                           ~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/EducationalContextRecognizer.ts[0m:[93m256[0m:[93m21[0m - [91merror[0m[90m ts(4111): [0mProperty 'educationLevel' comes from an index signature, so it must be accessed with ['educationLevel'].

[7m256[0m     if (userProfile.educationLevel === 'graduate') {
[7m   [0m [91m                    ~~~~~~~~~~~~~~[0m

[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m488[0m:[93m13[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m488[0m       (sum, so) => sum + so.weight,
[7m   [0m [91m            ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m488[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'sum' implicitly has an 'any' type.

[7m488[0m       (sum, so) => sum + so.weight,
[7m   [0m [91m       ~~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m420[0m:[93m40[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m420[0m     result.selectedObjectives.forEach((so) => {
[7m   [0m [91m                                       ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m416[0m:[93m9[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m416[0m         defaultWeights[id] /= totalDefaultWeight
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m266[0m:[93m13[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m266[0m       (sum, so) => sum + so.weight,
[7m   [0m [91m            ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m266[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'sum' implicitly has an 'any' type.

[7m266[0m       (sum, so) => sum + so.weight,
[7m   [0m [91m       ~~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m256[0m:[93m21[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m256[0m       .reduce((max, so) => Math.max(max, so.weight), 0)
[7m   [0m [91m                    ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m256[0m:[93m16[0m - [91merror[0m[90m ts(7006): [0mParameter 'max' implicitly has an 'any' type.

[7m256[0m       .reduce((max, so) => Math.max(max, so.weight), 0)
[7m   [0m [91m               ~~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m252[0m:[93m10[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m252[0m         (so) =>
[7m   [0m [91m         ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m243[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m243[0m       (so) => so.objective.id === 'correctness',
[7m   [0m [91m       ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m240[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m240[0m       (so) => so.objective.id === 'informativeness',
[7m   [0m [91m       ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m179[0m:[93m13[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m179[0m       (sum, so) => sum + so.weight,
[7m   [0m [91m            ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m179[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'sum' implicitly has an 'any' type.

[7m179[0m       (sum, so) => sum + so.weight,
[7m   [0m [91m       ~~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m168[0m:[93m40[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m168[0m     result.selectedObjectives.forEach((so) => {
[7m   [0m [91m                                       ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m162[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m162[0m       (so) => so.objective.id === 'safety',
[7m   [0m [91m       ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m134[0m:[93m13[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m134[0m       (sum, so) => sum + so.weight,
[7m   [0m [91m            ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m134[0m:[93m8[0m - [91merror[0m[90m ts(7006): [0mParameter 'sum' implicitly has an 'any' type.

[7m134[0m       (sum, so) => sum + so.weight,
[7m   [0m [91m       ~~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m123[0m:[93m40[0m - [91merror[0m[90m ts(7006): [0mParameter 'so' implicitly has an 'any' type.

[7m123[0m     result.selectedObjectives.forEach((so) => {
[7m   [0m [91m                                       ~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m31[0m:[93m3[0m - [91merror[0m[90m ts(2561): [0mObject literal may only specify known properties, but 'createStreamingChatCompletion' does not exist in type 'AIService'. Did you mean to write 'createChatCompletion'?

[7m31[0m   createStreamingChatCompletion: vi.fn(),
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/adaptive-selector.test.ts[0m:[93m8[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module './adaptive-selector' or its corresponding type declarations.

[7m8[0m } from './adaptive-selector'
[7m [0m [91m       ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/metaaligner/prioritization/context-detector.test.ts[0m:[93m26[0m:[93m3[0m - [91merror[0m[90m ts(2561): [0mObject literal may only specify known properties, but 'createStreamingChatCompletion' does not exist in type 'AIService'. Did you mean to write 'createChatCompletion'?

[7m26[0m   createStreamingChatCompletion: vi.fn(),
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/metaaligner/prioritization/context-detector.ts[0m:[93m10[0m:[93m26[0m - [91merror[0m[90m ts(2305): [0mModule '"../../ai/models/types"' has no exported member 'AIMessage'.

[7m10[0m import type { AIService, AIMessage } from '../../ai/models/types'
[7m  [0m [91m                         ~~~~~~~~~[0m

[96msrc/lib/metaaligner/prioritization/educational-context-recognizer.test.ts[0m:[93m345[0m:[93m29[0m - [91merror[0m[90m ts(18048): [0m'callArgs' is possibly 'undefined'.

[7m345[0m         const userMessage = callArgs[0][1].content
[7m   [0m [91m                            ~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/educational-context-recognizer.test.ts[0m:[93m295[0m:[93m31[0m - [91merror[0m[90m ts(18048): [0m'callArgs' is possibly 'undefined'.

[7m295[0m         const systemMessage = callArgs[0][0].content
[7m   [0m [91m                              ~~~~~~~~[0m

[96msrc/lib/metaaligner/prioritization/educational-context-recognizer.ts[0m:[93m656[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'generateBasicObjective' is declared but its value is never read.

[7m656[0m   private generateBasicObjective(
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m600[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m600[0m       ;(mockAIService.generateText as Mock).mockImplementation(
[7m   [0m [91m                      ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m586[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m586[0m       ;(mockAIService.generateText as Mock).mockResolvedValue(
[7m   [0m [91m                      ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m571[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m571[0m       ;(mockAIService.generateText as Mock).mockResolvedValue(
[7m   [0m [91m                      ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m556[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m556[0m       ;(mockAIService.generateText as Mock).mockResolvedValue(
[7m   [0m [91m                      ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m397[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m397[0m       expect(results[2].isSupport).toBe(true)
[7m   [0m [91m             ~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m396[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m396[0m       expect(results[1].isSupport).toBeDefined() // Should have fallback result
[7m   [0m [91m             ~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m395[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m395[0m       expect(results[0].isSupport).toBe(true)
[7m   [0m [91m             ~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m381[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m381[0m       ;(mockAIService.generateText as Mock)
[7m   [0m [91m                      ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m359[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m359[0m       ;(mockAIService.generateText as Mock).mockResolvedValue(
[7m   [0m [91m                      ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m233[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m233[0m       ;(mockAIService.generateText as Mock).mockResolvedValue(
[7m   [0m [91m                      ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m221[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m221[0m       ;(mockAIService.generateText as Mock).mockRejectedValue(
[7m   [0m [91m                      ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m215[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m215[0m       expect(mockAIService.generateText).toHaveBeenCalledWith(
[7m   [0m [91m                           ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m199[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m199[0m       expect(mockAIService.generateText).toHaveBeenCalledWith(
[7m   [0m [91m                           ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m185[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m185[0m       expect(mockAIService.generateText).toHaveBeenCalled()
[7m   [0m [91m                           ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m176[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'generateText' does not exist on type 'AIService'.

[7m176[0m       ;(mockAIService.generateText as Mock).mockResolvedValue(
[7m   [0m [91m                      ~~~~~~~~~~~~[0m
[96msrc/lib/metaaligner/prioritization/support-context-identifier.test.ts[0m:[93m21[0m:[93m3[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'generateText' does not exist in type 'AIService'.

[7m21[0m   generateText: vi.fn(),
[7m  [0m [91m  ~~~~~~~~~~~~[0m

[96msrc/lib/middleware/audit-logging.ts[0m:[93m310[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'SecurityEventType' is not assignable to parameter of type 'AuditEventType'.

[7m310[0m         eventType,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/middleware/audit-logging.ts[0m:[93m297[0m:[93m16[0m - [91merror[0m[90m ts(4111): [0mProperty 'durationUnit' comes from an index signature, so it must be accessed with ['durationUnit'].

[7m297[0m       metadata.durationUnit = 'ms'
[7m   [0m [91m               ~~~~~~~~~~~~[0m
[96msrc/lib/middleware/audit-logging.ts[0m:[93m296[0m:[93m16[0m - [91merror[0m[90m ts(4111): [0mProperty 'duration' comes from an index signature, so it must be accessed with ['duration'].

[7m296[0m       metadata.duration = Math.round(duration)
[7m   [0m [91m               ~~~~~~~~[0m
[96msrc/lib/middleware/audit-logging.ts[0m:[93m292[0m:[93m16[0m - [91merror[0m[90m ts(4111): [0mProperty 'responseStatusText' comes from an index signature, so it must be accessed with ['responseStatusText'].

[7m292[0m       metadata.responseStatusText = response.statusText
[7m   [0m [91m               ~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/audit-logging.ts[0m:[93m291[0m:[93m16[0m - [91merror[0m[90m ts(4111): [0mProperty 'responseStatus' comes from an index signature, so it must be accessed with ['responseStatus'].

[7m291[0m       metadata.responseStatus = response.status
[7m   [0m [91m               ~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/audit-logging.ts[0m:[93m278[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'requestBody' comes from an index signature, so it must be accessed with ['requestBody'].

[7m278[0m         metadata.requestBody = body
[7m   [0m [91m                 ~~~~~~~~~~~[0m
[96msrc/lib/middleware/audit-logging.ts[0m:[93m270[0m:[93m20[0m - [91merror[0m[90m ts(4111): [0mProperty 'headers' comes from an index signature, so it must be accessed with ['headers'].

[7m270[0m         ;(metadata.headers as Record<string, string>)[header] = value
[7m   [0m [91m                   ~~~~~~~[0m

[96msrc/lib/middleware/auth.middleware.ts[0m:[93m213[0m:[93m11[0m - [91merror[0m[90m ts(4111): [0mProperty 'user' comes from an index signature, so it must be accessed with ['user'].

[7m213[0m   context.user = data.user as AuthUser
[7m   [0m [91m          ~~~~[0m
[96msrc/lib/middleware/auth.middleware.ts[0m:[93m55[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type 'APIContextWithUser'.

[7m55[0m           context.request.url,
[7m  [0m [91m                  ~~~~~~~[0m
[96msrc/lib/middleware/auth.middleware.ts[0m:[93m46[0m:[93m31[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type 'APIContextWithUser'.

[7m46[0m         path: new URL(context.request.url).pathname,
[7m  [0m [91m                              ~~~~~~~[0m
[96msrc/lib/middleware/auth.middleware.ts[0m:[93m45[0m:[93m25[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type 'APIContextWithUser'.

[7m45[0m         method: context.request.method,
[7m  [0m [91m                        ~~~~~~~[0m
[96msrc/lib/middleware/auth.middleware.ts[0m:[93m44[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type 'APIContextWithUser'.

[7m44[0m         userAgent: context.request.headers.get('user-agent') || 'unknown',
[7m  [0m [91m                           ~~~~~~~[0m
[96msrc/lib/middleware/auth.middleware.ts[0m:[93m42[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type 'APIContextWithUser'.

[7m42[0m           context.request.headers.get('x-real-ip') ||
[7m  [0m [91m                  ~~~~~~~[0m
[96msrc/lib/middleware/auth.middleware.ts[0m:[93m41[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type 'APIContextWithUser'.

[7m41[0m           context.request.headers.get('x-forwarded-for') ||
[7m  [0m [91m                  ~~~~~~~[0m
[96msrc/lib/middleware/auth.middleware.ts[0m:[93m37[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type 'APIContextWithUser'.

[7m37[0m       createResource(new URL(context.request.url).pathname, 'route'),
[7m  [0m [91m                                     ~~~~~~~[0m
[96msrc/lib/middleware/auth.middleware.ts[0m:[93m31[0m:[93m45[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type 'APIContextWithUser'.

[7m31[0m   const user = await getCurrentUser(context.cookies)
[7m  [0m [91m                                            ~~~~~~~[0m
[96msrc/lib/middleware/auth.middleware.ts[0m:[93m7[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"../audit/log"' has no exported member 'createResourceAuditLog'.

[7m7[0m import { createResourceAuditLog } from '../audit/log'
[7m [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/auth.middleware.ts[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m2[0m import type { APIContext } from 'astro'
[7m [0m [91m              ~~~~~~~~~~[0m

[96msrc/lib/middleware/csp.ts[0m:[93m2[0m:[93m27[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'MiddlewareNext'.

[7m2[0m import type { APIContext, MiddlewareNext } from 'astro'
[7m [0m [91m                          ~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/csp.ts[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m2[0m import type { APIContext, MiddlewareNext } from 'astro'
[7m [0m [91m              ~~~~~~~~~~[0m

[96msrc/lib/middleware/csrf.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroCookies'.

[7m1[0m import type { AstroCookies } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~[0m

[96msrc/lib/middleware/enhanced-rate-limit.ts[0m:[93m103[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'incr' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'.
  Property 'incr' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m103[0m       await redis.incr(key)
[7m   [0m [91m                  ~~~~[0m
[96msrc/lib/middleware/enhanced-rate-limit.ts[0m:[93m71[0m:[93m21[0m - [91merror[0m[90m ts(2551): [0mProperty 'setex' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'. Did you mean 'set'?
  Property 'setex' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m71[0m         await redis.setex(key, Math.ceil(effectiveWindowMs / 1000), '1')
[7m  [0m [91m                    ~~~~~[0m
[96msrc/lib/middleware/enhanced-rate-limit.ts[0m:[93m62[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'multi' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'.
  Property 'multi' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m62[0m       const multi = redis.multi()
[7m  [0m [91m                          ~~~~~[0m

[96msrc/lib/middleware/index.ts[0m:[93m15[0m:[93m3[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'contentTypeMiddleware'.

[7m15[0m   contentTypeMiddleware,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/index.ts[0m:[93m14[0m:[93m3[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'securityHeadersMiddleware'.

[7m14[0m   securityHeadersMiddleware,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/index.ts[0m:[93m13[0m:[93m3[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'csrfMiddleware'.

[7m13[0m   csrfMiddleware,
[7m  [0m [91m  ~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/index.ts[0m:[93m12[0m:[93m3[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'corsMiddleware'.

[7m12[0m   corsMiddleware,
[7m  [0m [91m  ~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/index.ts[0m:[93m11[0m:[93m3[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'loggingMiddleware'.

[7m11[0m   loggingMiddleware,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/index.ts[0m:[93m10[0m:[93m35[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'sequence'.

[7m10[0m export const middlewareSequence = sequence(
[7m  [0m [91m                                  ~~~~~~~~[0m
[96msrc/lib/middleware/index.ts[0m:[93m1[0m:[93m46[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'MiddlewareNext'.

[7m1[0m import type { APIContext, MiddlewareHandler, MiddlewareNext } from 'astro'
[7m [0m [91m                                             ~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/index.ts[0m:[93m1[0m:[93m27[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'MiddlewareHandler'.

[7m1[0m import type { APIContext, MiddlewareHandler, MiddlewareNext } from 'astro'
[7m [0m [91m                          ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/index.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m1[0m import type { APIContext, MiddlewareHandler, MiddlewareNext } from 'astro'
[7m [0m [91m              ~~~~~~~~~~[0m

[96msrc/lib/middleware/logging.ts[0m:[93m14[0m:[93m18[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'getLogger'.

[7m14[0m   const logger = getLogger(requestId)
[7m  [0m [91m                 ~~~~~~~~~[0m

[96msrc/lib/middleware/rate-limit.ts[0m:[93m155[0m:[93m9[0m - [91merror[0m[90m ts(18048): [0m'config' is possibly 'undefined'.

[7m155[0m         config.windowMs,
[7m   [0m [91m        ~~~~~~[0m
[96msrc/lib/middleware/rate-limit.ts[0m:[93m154[0m:[93m9[0m - [91merror[0m[90m ts(18048): [0m'config' is possibly 'undefined'.

[7m154[0m         config.limits,
[7m   [0m [91m        ~~~~~~[0m
[96msrc/lib/middleware/rate-limit.ts[0m:[93m87[0m:[93m42[0m - [91merror[0m[90m ts(4111): [0mProperty 'anonymous' comes from an index signature, so it must be accessed with ['anonymous'].

[7m87[0m     const limit = limits[role] || limits.anonymous || 10
[7m  [0m [91m                                         ~~~~~~~~~[0m
[96msrc/lib/middleware/rate-limit.ts[0m:[93m80[0m:[93m24[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m80[0m     windowMs: number = rateLimitConfigs[2].windowMs,
[7m  [0m [91m                       ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/rate-limit.ts[0m:[93m79[0m:[93m38[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m79[0m     limits: Record<string, number> = rateLimitConfigs[2].limits,
[7m  [0m [91m                                     ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/rate-limit.ts[0m:[93m58[0m:[93m20[0m - [91merror[0m[90m ts(6133): [0m'userLimits' is declared but its value is never read.

[7m58[0m   private readonly userLimits: Record<string, number>
[7m  [0m [91m                   ~~~~~~~~~~[0m
[96msrc/lib/middleware/rate-limit.ts[0m:[93m57[0m:[93m20[0m - [91merror[0m[90m ts(6133): [0m'windowMs' is declared but its value is never read.

[7m57[0m   private readonly windowMs: number
[7m  [0m [91m                   ~~~~~~~~[0m
[96msrc/lib/middleware/rate-limit.ts[0m:[93m56[0m:[93m20[0m - [91merror[0m[90m ts(6133): [0m'defaultLimit' is declared but its value is never read.

[7m56[0m   private readonly defaultLimit: number
[7m  [0m [91m                   ~~~~~~~~~~~~[0m

[96msrc/lib/middleware/rate-limiter.ts[0m:[93m31[0m:[93m9[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m31[0m       ? ip.split(',')[0].trim()
[7m  [0m [91m        ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/middleware/rate-limiter.ts[0m:[93m1[0m:[93m54[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'next' or its corresponding type declarations.

[7m1[0m import type { NextApiRequest, NextApiResponse } from 'next'
[7m [0m [91m                                                     ~~~~~~[0m
[96msrc/lib/middleware/rate-limiter.ts[0m:[93m17[0m:[93m17[0m - [93mwarning[0m[90m ts(80006): [0mThis may be converted to an async function.

[7m17[0m export function rateLimiter(
[7m  [0m [93m                ~~~~~~~~~~~[0m

[96msrc/lib/monitoring/azure-insights.ts[0m:[93m19[0m:[93m35[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../config/azure.config' or its corresponding type declarations.

[7m19[0m       const module = await import('../../config/azure.config')
[7m  [0m [91m                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/monitoring/config.ts[0m:[93m56[0m:[93m28[0m - [91merror[0m[90m ts(4111): [0mProperty 'GRAFANA_ORG_ID' comes from an index signature, so it must be accessed with ['GRAFANA_ORG_ID'].

[7m56[0m         orgId: process.env.GRAFANA_ORG_ID || defaultConfig.grafana.orgId,
[7m  [0m [91m                           ~~~~~~~~~~~~~~[0m
[96msrc/lib/monitoring/config.ts[0m:[93m55[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'GRAFANA_API_KEY' comes from an index signature, so it must be accessed with ['GRAFANA_API_KEY'].

[7m55[0m         apiKey: process.env.GRAFANA_API_KEY || defaultConfig.grafana.apiKey,
[7m  [0m [91m                            ~~~~~~~~~~~~~~~[0m

[96msrc/lib/monitoring/service.ts[0m:[93m214[0m:[93m31[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(resource: PerformanceResourceTiming) => void' is not assignable to parameter of type '(value: PerformanceEntry, index: number, array: PerformanceEntry[]) => void'.
  Types of parameters 'resource' and 'value' are incompatible.

[7m214[0m     metrics.resources.forEach((resource: PerformanceResourceTiming) => {
[7m   [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/monitoring/service.ts[0m:[93m142[0m:[93m36[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'PerformanceEntry | undefined' is not assignable to parameter of type 'PerformanceEntry'.
  Type 'undefined' is not assignable to type 'PerformanceEntry'.

[7m142[0m         this.reportWebVital('LCP', lastEntry)
[7m   [0m [91m                                   ~~~~~~~~~[0m

[96msrc/lib/monitoring/setup.ts[0m:[93m26[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'redis' is declared but its value is never read.

[7m26[0m   private redis: RedisService
[7m  [0m [91m          ~~~~~[0m
[96msrc/lib/monitoring/setup.ts[0m:[93m3[0m:[93m34[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/lib/analytics/service' or its corresponding type declarations.

[7m3[0m import { AnalyticsService } from '@/lib/analytics/service'
[7m [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/providers/ErrorBoundary.tsx[0m:[93m43[0m:[93m3[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'Component<Props, State, any>'.

[7m43[0m   render() {
[7m  [0m [91m  ~~~~~~[0m
[96msrc/lib/providers/ErrorBoundary.tsx[0m:[93m32[0m:[93m3[0m - [91merror[0m[90m ts(4114): [0mThis member must have an 'override' modifier because it overrides a member in the base class 'Component<Props, State, any>'.

[7m32[0m   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/providers/SecurityProvider.tsx[0m:[93m132[0m:[93m26[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 0.

[7m132[0m         await fheService.initialize()
[7m   [0m [91m                         ~~~~~~~~~~[0m
[96msrc/lib/providers/SecurityProvider.tsx[0m:[93m74[0m:[93m30[0m - [91merror[0m[90m ts(2554): [0mExpected 1 arguments, but got 0.

[7m74[0m             await fheService.initialize()
[7m  [0m [91m                             ~~~~~~~~~~[0m

[96msrc/lib/providers/SharedProviders.tsx[0m:[93m7[0m:[93m38[0m - [91merror[0m[90m ts(2307): [0mCannot find module './NotificationProvider' or its corresponding type declarations.

[7m7[0m import { NotificationProvider } from './NotificationProvider'
[7m [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/providers/SharedProviders.tsx[0m:[93m4[0m:[93m30[0m - [91merror[0m[90m ts(2307): [0mCannot find module './AuthProvider' or its corresponding type declarations.

[7m4[0m import { AuthProvider } from './AuthProvider'
[7m [0m [91m                             ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/providers/SharedProviders.tsx[0m:[93m3[0m:[93m35[0m - [91merror[0m[90m ts(2307): [0mCannot find module './AnalyticsProvider' or its corresponding type declarations.

[7m3[0m import { AnalyticsProvider } from './AnalyticsProvider'
[7m [0m [91m                                  ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/providers/StatePersistenceProvider.tsx[0m:[93m131[0m:[93m5[0m - [91merror[0m[90m ts(2454): [0mVariable 'refreshStats' is used before being assigned.

[7m131[0m     refreshStats,
[7m   [0m [91m    ~~~~~~~~~~~~[0m
[96msrc/lib/providers/StatePersistenceProvider.tsx[0m:[93m131[0m:[93m5[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'refreshStats' used before its declaration.

[7m131[0m     refreshStats,
[7m   [0m [91m    ~~~~~~~~~~~~[0m
[96msrc/lib/providers/StatePersistenceProvider.tsx[0m:[93m130[0m:[93m5[0m - [91merror[0m[90m ts(2454): [0mVariable 'createBackup' is used before being assigned.

[7m130[0m     createBackup,
[7m   [0m [91m    ~~~~~~~~~~~~[0m
[96msrc/lib/providers/StatePersistenceProvider.tsx[0m:[93m130[0m:[93m5[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'createBackup' used before its declaration.

[7m130[0m     createBackup,
[7m   [0m [91m    ~~~~~~~~~~~~[0m

[96msrc/lib/providers/__tests__/providers.test.tsx[0m:[93m20[0m:[93m11[0m - [91merror[0m[90m ts(2339): [0mProperty 'securityLevel' does not exist on type 'SecurityContextValue'.

[7m20[0m   const { securityLevel, setSecurityLevel } = useSecurity()
[7m  [0m [91m          ~~~~~~~~~~~~~[0m
[96msrc/lib/providers/__tests__/providers.test.tsx[0m:[93m2[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m2[0m import React from 'react'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/repositories/emotionsRepository.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2724): [0m'"../ai/emotions/dimensionalTypes"' has no exported member named 'DimensionalEmotionMap'. Did you mean 'DimensionalEmotion'?

[7m1[0m import type { DimensionalEmotionMap } from '../ai/emotions/dimensionalTypes'
[7m [0m [91m              ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/security/alert-system.ts[0m:[93m393[0m:[93m40[0m - [91merror[0m[90m ts(4111): [0mProperty 'reviewNotes' comes from an index signature, so it must be accessed with ['reviewNotes'].

[7m393[0m           reviewNotes: metadataObject?.reviewNotes as string | undefined,
[7m   [0m [91m                                       ~~~~~~~~~~~[0m
[96msrc/lib/security/alert-system.ts[0m:[93m392[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'reviewedBy' comes from an index signature, so it must be accessed with ['reviewedBy'].

[7m392[0m           reviewedBy: metadataObject?.reviewedBy as string | undefined,
[7m   [0m [91m                                      ~~~~~~~~~~[0m
[96msrc/lib/security/alert-system.ts[0m:[93m391[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'status' comes from an index signature, so it must be accessed with ['status'].

[7m391[0m             (metadataObject?.status as AlertDetails['status']) || 'pending',
[7m   [0m [91m                             ~~~~~~[0m
[96msrc/lib/security/alert-system.ts[0m:[93m389[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'requiresHumanReview' comes from an index signature, so it must be accessed with ['requiresHumanReview'].

[7m389[0m             (metadataObject?.requiresHumanReview as boolean) ?? true,
[7m   [0m [91m                             ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/alert-system.ts[0m:[93m383[0m:[93m36[0m - [91merror[0m[90m ts(4111): [0mProperty 'source' comes from an index signature, so it must be accessed with ['source'].

[7m383[0m           source: (metadataObject?.source as string) || 'unknown',
[7m   [0m [91m                                   ~~~~~~[0m

[96msrc/lib/security/anonymizationPipeline.ts[0m:[93m121[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType '"" | T' is not assignable to type 'T'.
  '"" | T' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'string | Record<string, unknown>'.

[7m121[0m       anonymized: typeof input === 'string' ? '' : ({} as T),
[7m   [0m [91m      ~~~~~~~~~~[0m
[96msrc/lib/security/anonymizationPipeline.ts[0m:[93m11[0m:[93m10[0m - [91merror[0m[90m ts(2459): [0mModule '"./phiDetection"' declares 'Anonymizer' locally, but it is not exported.

[7m11[0m import { Anonymizer as PHIAnonymizer } from './phiDetection'
[7m  [0m [91m         ~~~~~~~~~~[0m

[96msrc/lib/security/breach-notification.ts[0m:[93m483[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ procedures: { content: string; lastUpdated: number; }; guidelines: { title: string; content: string; lastUpdated: number; }; templates: { title: string; content: string; lastUpdated: number; }; }' is not assignable to type 'TrainingMaterials'.
  Types of property 'procedures' are incompatible.

[7m483[0m     return materials
[7m   [0m [91m    ~~~~~~[0m
[96msrc/lib/security/breach-notification.ts[0m:[93m416[0m:[93m17[0m - [91merror[0m[90m ts(2551): [0mProperty 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'. Did you mean 'set'?
  Property 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m416[0m     await redis.hset(monthKey, {
[7m   [0m [91m                ~~~~[0m
[96msrc/lib/security/breach-notification.ts[0m:[93m339[0m:[93m46[0m - [91merror[0m[90m ts(7006): [0mParameter 'b' implicitly has an 'any' type.

[7m339[0m     return breaches.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp)
[7m   [0m [91m                                             ~[0m
[96msrc/lib/security/breach-notification.ts[0m:[93m339[0m:[93m43[0m - [91merror[0m[90m ts(7006): [0mParameter 'a' implicitly has an 'any' type.

[7m339[0m     return breaches.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp)
[7m   [0m [91m                                          ~[0m
[96msrc/lib/security/breach-notification.ts[0m:[93m331[0m:[93m30[0m - [91merror[0m[90m ts(2339): [0mProperty 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'.
  Property 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m331[0m     const keys = await redis.keys(`${BREACH_KEY_PREFIX}*`)
[7m   [0m [91m                             ~~~~[0m

[96msrc/lib/security/dlp-integration.ts[0m:[93m9[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroGlobal'.

[7m9[0m import type { AstroGlobal } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~[0m
[96msrc/lib/security/dlp-integration.ts[0m:[93m8[0m:[93m54[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'next' or its corresponding type declarations.

[7m8[0m import type { NextApiRequest, NextApiResponse } from 'next'
[7m [0m [91m                                                     ~~~~~~[0m

[96msrc/lib/security/index.ts[0m:[93m209[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'SIMULATION_KEY' comes from an index signature, so it must be accessed with ['SIMULATION_KEY'].

[7m209[0m     process.env.SIMULATION_KEY ||
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m
[96msrc/lib/security/index.ts[0m:[93m188[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'SIMULATION_KEY' comes from an index signature, so it must be accessed with ['SIMULATION_KEY'].

[7m188[0m     process.env.SIMULATION_KEY ||
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m
[96msrc/lib/security/index.ts[0m:[93m4[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"../logging/build-safe-logger"' has no exported member 'securityLogger'.

[7m4[0m import { securityLogger } from '../logging/build-safe-logger'
[7m [0m [91m         ~~~~~~~~~~~~~~[0m

[96msrc/lib/security/monitoring.ts[0m:[93m211[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'limit' is declared but its value is never read.

[7m211[0m     limit = 100,
[7m   [0m [91m    ~~~~~[0m
[96msrc/lib/security/monitoring.ts[0m:[93m201[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'limit' is declared but its value is never read.

[7m201[0m     limit = 100,
[7m   [0m [91m    ~~~~~[0m

[96msrc/lib/security/token.encryption.ts[0m:[93m29[0m:[93m25[0m - [91merror[0m[90m ts(4111): [0mProperty 'TOKEN_ENCRYPTION_SALT' comes from an index signature, so it must be accessed with ['TOKEN_ENCRYPTION_SALT'].

[7m29[0m       salt: process.env.TOKEN_ENCRYPTION_SALT || '',
[7m  [0m [91m                        ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/token.encryption.ts[0m:[93m105[0m:[93m46[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(start?: number | undefined, end?: number | undefined): Buffer<ArrayBuffer>' of 'encryptedData.slice' is deprecated.

[7m105[0m       const encryptedContent = encryptedData.slice(0, -16)
[7m   [0m [93m                                             ~~~~~[0m
[96msrc/lib/security/token.encryption.ts[0m:[93m104[0m:[93m37[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(start?: number | undefined, end?: number | undefined): Buffer<ArrayBuffer>' of 'encryptedData.slice' is deprecated.

[7m104[0m       const authTag = encryptedData.slice(-16)
[7m   [0m [93m                                    ~~~~~[0m

[96msrc/lib/security/__tests__/audit.logging.test.ts[0m:[93m54[0m:[93m38[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m54[0m       const loggedEntry = JSON.parse(mockLogger.info.mock.calls[0][0])
[7m  [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/security/__tests__/breach-notification.integration.test.ts[0m:[93m250[0m:[93m20[0m - [91merror[0m[90m ts(2551): [0mProperty 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'. Did you mean 'set'?
  Property 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m250[0m       expect(redis.hset).toHaveBeenCalled()
[7m   [0m [91m                   ~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.integration.test.ts[0m:[93m88[0m:[93m21[0m - [91merror[0m[90m ts(2551): [0mProperty 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'. Did you mean 'set'?
  Property 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m88[0m     vi.mocked(redis.hset).mockResolvedValue(1)
[7m  [0m [91m                    ~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.integration.test.ts[0m:[93m86[0m:[93m21[0m - [91merror[0m[90m ts(2551): [0mProperty 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'. Did you mean 'set'?
  Property 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m86[0m     vi.mocked(redis.hset).mockResolvedValue(1)
[7m  [0m [91m                    ~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.integration.test.ts[0m:[93m85[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'.
  Property 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m85[0m     vi.mocked(redis.keys).mockResolvedValue(['breach:test_breach_id'])
[7m  [0m [91m                    ~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.integration.test.ts[0m:[93m78[0m:[93m7[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type 'null'.

[7m 78[0m       JSON.stringify({
[7m   [0m [91m      ~~~~~~~~~~~~~~~~[0m
[7m 79[0m         ...mockBreach,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m 82[0m         notificationStatus: 'pending',
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m 83[0m       }),
[7m   [0m [91m~~~~~~~~[0m

[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m299[0m:[93m15[0m - [91merror[0m[90m ts(2339): [0mProperty 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'.
  Property 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m299[0m       ;(redis.keys as any).mockResolvedValue(['breach:valid', 'breach:invalid'])
[7m   [0m [91m              ~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m286[0m:[93m15[0m - [91merror[0m[90m ts(2339): [0mProperty 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'.
  Property 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m286[0m       ;(redis.keys as any).mockRejectedValue(new Error('Redis error'))
[7m   [0m [91m              ~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m270[0m:[93m15[0m - [91merror[0m[90m ts(2339): [0mProperty 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'.
  Property 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m270[0m       ;(redis.keys as any).mockResolvedValue([
[7m   [0m [91m              ~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m201[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'SECURITY_STAKEHOLDERS' comes from an index signature, so it must be accessed with ['SECURITY_STAKEHOLDERS'].

[7m201[0m       process.env.SECURITY_STAKEHOLDERS = ''
[7m   [0m [91m                  ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m185[0m:[93m40[0m - [91merror[0m[90m ts(4111): [0mProperty 'SECURITY_STAKEHOLDERS' comes from an index signature, so it must be accessed with ['SECURITY_STAKEHOLDERS'].

[7m185[0m       const stakeholders = process.env.SECURITY_STAKEHOLDERS!.split(',')
[7m   [0m [91m                                       ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m175[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'HHS_NOTIFICATION_EMAIL' comes from an index signature, so it must be accessed with ['HHS_NOTIFICATION_EMAIL'].

[7m175[0m           to: process.env.HHS_NOTIFICATION_EMAIL,
[7m   [0m [91m                          ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m158[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'HHS_NOTIFICATION_EMAIL' comes from an index signature, so it must be accessed with ['HHS_NOTIFICATION_EMAIL'].

[7m158[0m           to: process.env.HHS_NOTIFICATION_EMAIL,
[7m   [0m [91m                          ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m128[0m:[93m14[0m - [91merror[0m[90m ts(2339): [0mProperty 'getUserById' does not exist on type 'Auth'.

[7m128[0m       ;(auth.getUserById as any).mockResolvedValue({ id: 'user1' }) // User without email
[7m   [0m [91m             ~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m114[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'getUserById' does not exist on type 'Auth'.

[7m114[0m       expect(auth.getUserById).toHaveBeenCalledTimes(
[7m   [0m [91m                  ~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m74[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'SECURITY_STAKEHOLDERS' comes from an index signature, so it must be accessed with ['SECURITY_STAKEHOLDERS'].

[7m74[0m     process.env.SECURITY_STAKEHOLDERS =
[7m  [0m [91m                ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m73[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'HHS_NOTIFICATION_EMAIL' comes from an index signature, so it must be accessed with ['HHS_NOTIFICATION_EMAIL'].

[7m73[0m     process.env.HHS_NOTIFICATION_EMAIL = 'hhs@example.com'
[7m  [0m [91m                ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m72[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'ORGANIZATION_ADDRESS' comes from an index signature, so it must be accessed with ['ORGANIZATION_ADDRESS'].

[7m72[0m     process.env.ORGANIZATION_ADDRESS = '123 Test St'
[7m  [0m [91m                ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m71[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'SECURITY_CONTACT' comes from an index signature, so it must be accessed with ['SECURITY_CONTACT'].

[7m71[0m     process.env.SECURITY_CONTACT = 'security@test.org'
[7m  [0m [91m                ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m70[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'ORGANIZATION_NAME' comes from an index signature, so it must be accessed with ['ORGANIZATION_NAME'].

[7m70[0m     process.env.ORGANIZATION_NAME = 'Test Org'
[7m  [0m [91m                ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m65[0m:[93m12[0m - [91merror[0m[90m ts(2339): [0mProperty 'getUserById' does not exist on type 'Auth'.

[7m65[0m     ;(auth.getUserById as any).mockResolvedValue(mockUser)
[7m  [0m [91m           ~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m64[0m:[93m13[0m - [91merror[0m[90m ts(2339): [0mProperty 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'.
  Property 'keys' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m64[0m     ;(redis.keys as any).mockResolvedValue([])
[7m  [0m [91m            ~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m6[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"../breach-notification"' has no exported member 'BreachNotificationSystem'.

[7m6[0m import { BreachNotificationSystem } from '../breach-notification'
[7m [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/breach-notification.test.ts[0m:[93m3[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/fhe"' has no exported member 'FHE'.

[7m3[0m import { FHE } from '@/lib/fhe'
[7m [0m [91m         ~~~[0m

[96msrc/lib/security/__tests__/dlp.test.ts[0m:[93m121[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m121[0m       expect(dlpService['rules'][0].action).toBe(DLPAction.BLOCK)
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/dlp.test.ts[0m:[93m120[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m120[0m       expect(dlpService['rules'][0].name).toBe('Updated Test Rule')
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/security/__tests__/security-scanning.test.ts[0m:[93m319[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'Buffer' is not assignable to parameter of type 'string | NonSharedBuffer'.
  Type 'Buffer' is missing the following properties from type 'Buffer<ArrayBuffer>': writeBigInt64BE, writeBigInt64LE, writeBigUInt64BE, writeBigUint64BE, and 22 more.

[7m319[0m         Buffer.from(mockBaselineContent),
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/security-scanning.test.ts[0m:[93m257[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'Buffer' is not assignable to parameter of type 'string | NonSharedBuffer'.
  Type 'Buffer' is missing the following properties from type 'Buffer<ArrayBuffer>': writeBigInt64BE, writeBigInt64LE, writeBigUInt64BE, writeBigUint64BE, and 22 more.

[7m257[0m         Buffer.from(mockFhirQueryContent),
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/security-scanning.test.ts[0m:[93m208[0m:[93m50[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'Buffer' is not assignable to parameter of type 'string | NonSharedBuffer'.
  Type 'Buffer' is missing the following properties from type 'Buffer<ArrayBuffer>': writeBigInt64BE, writeBigInt64LE, writeBigUInt64BE, writeBigUint64BE, and 22 more.

[7m208[0m       vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from(mockCodeQLContent))
[7m   [0m [91m                                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/security-scanning.test.ts[0m:[93m152[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'Buffer' is not assignable to parameter of type 'string | NonSharedBuffer'.
  Type 'Buffer' is missing the following properties from type 'Buffer<ArrayBuffer>': writeBigInt64BE, writeBigInt64LE, writeBigUInt64BE, writeBigUint64BE, and 22 more.

[7m152[0m         Buffer.from(mockGitleaksContent),
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/__tests__/security-scanning.test.ts[0m:[93m85[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'Buffer' is not assignable to parameter of type 'string | NonSharedBuffer'.
  Type 'Buffer' is missing the following properties from type 'Buffer<ArrayBuffer>': writeBigInt64BE, writeBigInt64LE, writeBigUInt64BE, writeBigUint64BE, and 22 more.

[7m85[0m         Buffer.from(mockWorkflowContent),
[7m  [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/security/baa/BaaDocumentGenerator.ts[0m:[93m52[0m:[93m5[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m52[0m     document.auditTrail[0].documentId = document.id
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/BaaDocumentGenerator.ts[0m:[93m30[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'BaaStatus'.

[7m30[0m       status: BaaStatus.DRAFT,
[7m  [0m [91m              ~~~~~~~~~[0m

[96msrc/lib/security/baa/BaaTemplateService.ts[0m:[93m529[0m:[93m57[0m - [91merror[0m[90m ts(2322): [0mType '"TELEMEDICINE"' is not assignable to type 'BusinessAssociateType'.

[7m529[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m                                                        ~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/BaaTemplateService.ts[0m:[93m529[0m:[93m39[0m - [91merror[0m[90m ts(2322): [0mType '"DATA_ANALYTICS"' is not assignable to type 'BusinessAssociateType'.

[7m529[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/BaaTemplateService.ts[0m:[93m529[0m:[93m22[0m - [91merror[0m[90m ts(2322): [0mType '"CLOUD_SERVICE"' is not assignable to type 'BusinessAssociateType'.

[7m529[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m                     ~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/BaaTemplateService.ts[0m:[93m529[0m:[93m8[0m - [91merror[0m[90m ts(2322): [0mType '"EHR_VENDOR"' is not assignable to type 'BusinessAssociateType'.

[7m529[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m       ~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/BaaTemplateService.ts[0m:[93m503[0m:[93m28[0m - [91merror[0m[90m ts(18048): [0m'template.tags' is possibly 'undefined'.

[7m503[0m       if (criteria.tag && !template.tags.includes(criteria.tag)) {
[7m   [0m [91m                           ~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/BaaTemplateService.ts[0m:[93m382[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ key?: string | undefined; label?: string | undefined; description?: string | undefined; required?: boolean | undefined; defaultValue?: string; }' is not assignable to type 'BaaPlaceholder'.
  Types of property 'key' are incompatible.

[7m382[0m     updatedPlaceholders[placeholderIndex] = {
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/BaaTemplateService.ts[0m:[93m219[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '{ id?: string | undefined; title?: string | undefined; description?: string; content?: string | undefined; required?: boolean | undefined; order?: number | undefined; }' is not assignable to type 'BaaTemplateSection'.
  Types of property 'id' are incompatible.

[7m219[0m     updatedSections[sectionIndex] = {
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/security/baa/ComplianceVerificationService.ts[0m:[93m562[0m:[93m30[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ SELF_ATTESTATION: number; DOCUMENTATION_REVIEW: number; THIRD_PARTY_AUDIT: number; ONSITE_ASSESSMENT: number; }' to type 'Record<VerificationMethod, number>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Type '{ SELF_ATTESTATION: number; DOCUMENTATION_REVIEW: number; THIRD_PARTY_AUDIT: number; ONSITE_ASSESSMENT: number; }' is missing the following properties from type 'Record<VerificationMethod, number>': self_assessment, documentation_review, third_party_audit, certification_validation, and 2 more.

[7m562[0m       verificationsByMethod: {
[7m   [0m [91m                             ~[0m
[7m563[0m         SELF_ATTESTATION: 0,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m566[0m         ONSITE_ASSESSMENT: 0,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m567[0m       } as Record<VerificationMethod, number>,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/ComplianceVerificationService.ts[0m:[93m557[0m:[93m29[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ low: number; medium: number; high: number; }' to type 'Record<ComplianceLevel, number>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Type '{ low: number; medium: number; high: number; }' is missing the following properties from type 'Record<ComplianceLevel, number>': not_verified, self_attested, third_party_verified, hipaa_certified, non_compliant

[7m557[0m       verificationsByLevel: {
[7m   [0m [91m                            ~[0m
[7m558[0m         low: 0,
[7m   [0m [91m~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m560[0m         high: 0,
[7m   [0m [91m~~~~~~~~~~~~~~~~[0m
[7m561[0m       } as Record<ComplianceLevel, number>,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/ComplianceVerificationService.ts[0m:[93m524[0m:[93m57[0m - [91merror[0m[90m ts(2322): [0mType '"TELEMEDICINE"' is not assignable to type 'BusinessAssociateType'.

[7m524[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m                                                        ~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/ComplianceVerificationService.ts[0m:[93m524[0m:[93m39[0m - [91merror[0m[90m ts(2322): [0mType '"DATA_ANALYTICS"' is not assignable to type 'BusinessAssociateType'.

[7m524[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/ComplianceVerificationService.ts[0m:[93m524[0m:[93m22[0m - [91merror[0m[90m ts(2322): [0mType '"CLOUD_SERVICE"' is not assignable to type 'BusinessAssociateType'.

[7m524[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m                     ~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/ComplianceVerificationService.ts[0m:[93m524[0m:[93m8[0m - [91merror[0m[90m ts(2322): [0mType '"EHR_VENDOR"' is not assignable to type 'BusinessAssociateType'.

[7m524[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m       ~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/ComplianceVerificationService.ts[0m:[93m512[0m:[93m57[0m - [91merror[0m[90m ts(2322): [0mType '"TELEMEDICINE"' is not assignable to type 'BusinessAssociateType'.

[7m512[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m                                                        ~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/ComplianceVerificationService.ts[0m:[93m512[0m:[93m39[0m - [91merror[0m[90m ts(2322): [0mType '"DATA_ANALYTICS"' is not assignable to type 'BusinessAssociateType'.

[7m512[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/ComplianceVerificationService.ts[0m:[93m512[0m:[93m22[0m - [91merror[0m[90m ts(2322): [0mType '"CLOUD_SERVICE"' is not assignable to type 'BusinessAssociateType'.

[7m512[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m                     ~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/baa/ComplianceVerificationService.ts[0m:[93m512[0m:[93m8[0m - [91merror[0m[90m ts(2322): [0mType '"EHR_VENDOR"' is not assignable to type 'BusinessAssociateType'.

[7m512[0m       ['EHR_VENDOR', 'CLOUD_SERVICE', 'DATA_ANALYTICS', 'TELEMEDICINE'],
[7m   [0m [91m       ~~~~~~~~~~~~[0m

[96msrc/lib/security/backup/automated-recovery.ts[0m:[93m65[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'currentEnvironmentIndex' is declared but its value is never read.

[7m65[0m   private currentEnvironmentIndex = 0
[7m  [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/automated-recovery.ts[0m:[93m64[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'isInitialized' is declared but its value is never read.

[7m64[0m   private isInitialized = false
[7m  [0m [91m          ~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/automated-recovery.ts[0m:[93m63[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'backupProvider' is declared but its value is never read.

[7m63[0m   private backupProvider: () => Promise<BackupMetadata[]>
[7m  [0m [91m          ~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/automated-recovery.ts[0m:[93m62[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'scheduledJobs' is declared but its value is never read.

[7m62[0m   private scheduledJobs: Map<string, cron.ScheduledTask> = new Map()
[7m  [0m [91m          ~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/automated-recovery.ts[0m:[93m61[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'recoveryManager' is declared but its value is never read.

[7m61[0m   private recoveryManager: RecoveryTestingManager
[7m  [0m [91m          ~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/automated-recovery.ts[0m:[93m60[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'config' is declared but its value is never read.

[7m60[0m   private config: AutomatedRecoveryConfig
[7m  [0m [91m          ~~~~~~[0m

[96msrc/lib/security/backup/index.ts[0m:[93m782[0m:[93m13[0m - [91merror[0m[90m ts(2488): [0mType '[StorageLocation, StorageProvider] | undefined' must have a '[Symbol.iterator]()' method that returns an iterator.

[7m782[0m       const [location, provider] = storageEntries[i]
[7m   [0m [91m            ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m604[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'iv' is declared but its value is never read.

[7m604[0m     iv: Uint8Array,
[7m   [0m [91m    ~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m591[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'calculateRetentionDate' is declared but its value is never read.

[7m591[0m   private calculateRetentionDate(type: BackupType): string {
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m574[0m:[93m71[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(algorithm: AlgorithmIdentifier, data: BufferSource): Promise<ArrayBuffer>', gave the following error.
  Overload 2 of 2, '(algorithm: AlgorithmIdentifier, data: BufferSource): Promise<ArrayBuffer>', gave the following error.

[7m574[0m       const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
[7m   [0m [91m                                                                      ~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m211[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'recoveryTestingManager' is declared but its value is never read.

[7m211[0m   private recoveryTestingManager?: RecoveryTestingManager
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m89[0m:[93m30[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<...>', gave the following error.
  Overload 2 of 2, '(algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<...>', gave the following error.

[7m89[0m           { name: 'AES-GCM', iv },
[7m  [0m [91m                             ~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m79[0m:[93m11[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  The last overload gave the following error.

[7m79[0m           key,
[7m  [0m [91m          ~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m60[0m:[93m30[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<...>', gave the following error.
  Overload 2 of 2, '(algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<...>', gave the following error.

[7m60[0m           { name: 'AES-GCM', iv },
[7m  [0m [91m                             ~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m54[0m:[93m11[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  The last overload gave the following error.

[7m54[0m           key,
[7m  [0m [91m          ~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m884[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m884[0m       await logAuditEvent(
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~[0m
[7m885[0m         AuditEventType.SECURITY,
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m891[0m         },
[7m   [0m [93m~~~~~~~~~~[0m
[7m892[0m       )
[7m   [0m [93m~~~~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m870[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m870[0m       await logAuditEvent(
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~[0m
[7m871[0m         AuditEventType.SECURITY,
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m878[0m         },
[7m   [0m [93m~~~~~~~~~~[0m
[7m879[0m       )
[7m   [0m [93m~~~~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m759[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m759[0m       await logAuditEvent(
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~[0m
[7m760[0m         AuditEventType.SECURITY,
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m766[0m         },
[7m   [0m [93m~~~~~~~~~~[0m
[7m767[0m       )
[7m   [0m [93m~~~~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m740[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m740[0m       await logAuditEvent(
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~[0m
[7m741[0m         AuditEventType.SECURITY,
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m749[0m         },
[7m   [0m [93m~~~~~~~~~~[0m
[7m750[0m       )
[7m   [0m [93m~~~~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m644[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m644[0m       await logAuditEvent(
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~[0m
[7m645[0m         AuditEventType.SECURITY,
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m653[0m         },
[7m   [0m [93m~~~~~~~~~~[0m
[7m654[0m       )
[7m   [0m [93m~~~~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m534[0m:[93m9[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m534[0m       : await this.getRandomBytes(16)
[7m   [0m [93m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m490[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m490[0m       await logAuditEvent(
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~[0m
[7m491[0m         AuditEventType.CREATE,
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m500[0m         },
[7m   [0m [93m~~~~~~~~~~[0m
[7m501[0m       )
[7m   [0m [93m~~~~~~~[0m
[96msrc/lib/security/backup/index.ts[0m:[93m443[0m:[93m11[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m443[0m         ? await dlpService.scanContent(new TextDecoder().decode(data), {
[7m   [0m [93m          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m444[0m             userId: 'system',
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m446[0m             metadata: { mode: 'backup' },
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m447[0m           })
[7m   [0m [93m~~~~~~~~~~~~[0m

[96msrc/lib/security/backup/recovery-testing.ts[0m:[93m209[0m:[93m34[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(tc: TestCaseConfig) => void' is not assignable to parameter of type '(value: { name: string; description: string; backupType: string; dataVerification: { type: "content" | "query" | "hash"; target: string; expected?: string | number | boolean | undefined; }[]; }, index: number, array: { ...; }[]) => void'.
  Types of parameters 'tc' and 'value' are incompatible.

[7m209[0m         config.testCases.forEach((tc: TestCaseConfig) => {
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/recovery-testing.ts[0m:[93m164[0m:[93m37[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(tc: TestCaseConfig) => void' is not assignable to parameter of type '(value: { name: string; description: string; backupType: string; dataVerification: { type: "content" | "query" | "hash"; target: string; expected?: string | number | boolean | undefined; }[]; }, index: number, array: { ...; }[]) => void'.
  Types of parameters 'tc' and 'value' are incompatible.

[7m164[0m       this.config.testCases.forEach((tc: TestCaseConfig) => {
[7m   [0m [91m                                    ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/recovery-testing.ts[0m:[93m450[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m450[0m       await logAuditEvent(
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~[0m
[7m451[0m         AuditEventType.SECURITY,
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m459[0m         },
[7m   [0m [93m~~~~~~~~~~[0m
[7m460[0m       )
[7m   [0m [93m~~~~~~~[0m
[96msrc/lib/security/backup/recovery-testing.ts[0m:[93m417[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m417[0m       await logAuditEvent(
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~[0m
[7m418[0m         AuditEventType.SECURITY,
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m430[0m         },
[7m   [0m [93m~~~~~~~~~~[0m
[7m431[0m       )
[7m   [0m [93m~~~~~~~[0m
[96msrc/lib/security/backup/recovery-testing.ts[0m:[93m345[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m345[0m       await logAuditEvent(
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~[0m
[7m346[0m         AuditEventType.SECURITY,
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m353[0m         },
[7m   [0m [93m~~~~~~~~~~[0m
[7m354[0m       )
[7m   [0m [93m~~~~~~~[0m
[96msrc/lib/security/backup/recovery-testing.ts[0m:[93m320[0m:[93m5[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m320[0m     await logAuditEvent(
[7m   [0m [93m    ~~~~~~~~~~~~~~~~~~~~[0m
[7m321[0m       AuditEventType.SECURITY,
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m329[0m       },
[7m   [0m [93m~~~~~~~~[0m
[7m330[0m     )
[7m   [0m [93m~~~~~[0m

[96msrc/lib/security/backup/storage-providers-wrapper.ts[0m:[93m101[0m:[93m18[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'getLogger'.

[7m101[0m   const logger = getLogger(prefix)
[7m   [0m [91m                 ~~~~~~~~~[0m

[96msrc/lib/security/backup/storage-providers.browser.ts[0m:[93m191[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'storeName' comes from an index signature, so it must be accessed with ['storeName'].

[7m191[0m     this.storeName = (config.storeName as string) || 'backups'
[7m   [0m [91m                             ~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers.browser.ts[0m:[93m190[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'dbName' comes from an index signature, so it must be accessed with ['dbName'].

[7m190[0m     this.dbName = (config.dbName as string) || 'backupStorage'
[7m   [0m [91m                          ~~~~~~[0m
[96msrc/lib/security/backup/storage-providers.browser.ts[0m:[93m111[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'prefix' comes from an index signature, so it must be accessed with ['prefix'].

[7m111[0m     this.prefix = (config.prefix as string) || 'backup-'
[7m   [0m [91m                          ~~~~~~[0m

[96msrc/lib/security/backup/storage-providers.ts[0m:[93m911[0m:[93m42[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@azure/storage-blob' or its corresponding type declarations.

[7m911[0m         const azureModule = await import('@azure/storage-blob')
[7m   [0m [91m                                         ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers.ts[0m:[93m723[0m:[93m40[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@google-cloud/storage' or its corresponding type declarations.

[7m723[0m         const gcsModule = await import('@google-cloud/storage')
[7m   [0m [91m                                       ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/security/backup/storage-providers/aws-s3.ts[0m:[93m87[0m:[93m22[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ [key: string]: string; } | undefined' to type 'S3Credentials' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Type '{ [key: string]: string; }' is missing the following properties from type 'S3Credentials': accessKeyId, secretAccessKey

[7m87[0m         credentials: this.config.credentials as S3Credentials,
[7m  [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/aws-s3.ts[0m:[93m86[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'S3' is not assignable to type 'S3Client'.
  The types returned by 'listObjects(...)' are incompatible between these types.

[7m86[0m       this.s3 = new S3({
[7m  [0m [91m      ~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/aws-s3.ts[0m:[93m8[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"../backup-types"' has no exported member 'StorageProvider'.

[7m8[0m import type { StorageProvider, StorageProviderConfig } from '../backup-types'
[7m [0m [91m              ~~~~~~~~~~~~~~~[0m

[96msrc/lib/security/backup/storage-providers/google-cloud.ts[0m:[93m210[0m:[93m20[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m210[0m       const file = this.bucket.file(key)
[7m   [0m [91m                   ~~~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/google-cloud.ts[0m:[93m182[0m:[93m20[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m182[0m       const file = this.bucket.file(key)
[7m   [0m [91m                   ~~~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/google-cloud.ts[0m:[93m145[0m:[93m20[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m145[0m       const file = this.bucket.file(key)
[7m   [0m [91m                   ~~~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/google-cloud.ts[0m:[93m118[0m:[93m29[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m118[0m       const [files] = await this.bucket.getFiles(options)
[7m   [0m [91m                            ~~~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/google-cloud.ts[0m:[93m84[0m:[93m21[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m84[0m       this.bucket = this.storage.bucket(this.bucketName);
[7m  [0m [91m                    ~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/google-cloud.ts[0m:[93m75[0m:[93m40[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@google-cloud/storage' or its corresponding type declarations.

[7m75[0m       const { Storage } = await import('@google-cloud/storage');
[7m  [0m [91m                                       ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/google-cloud.ts[0m:[93m8[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"../backup-types"' has no exported member 'StorageProvider'.

[7m8[0m import type { StorageProvider, StorageProviderConfig } from '../backup-types'
[7m [0m [91m              ~~~~~~~~~~~~~~~[0m

[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m174[0m:[93m13[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m174[0m       await this.fs.unlink(fullPath)
[7m   [0m [91m            ~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m167[0m:[93m15[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m167[0m         await this.fs.access(fullPath)
[7m   [0m [91m              ~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m163[0m:[93m24[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m163[0m       const fullPath = this.path.join(this.basePath, key)
[7m   [0m [91m                       ~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m147[0m:[93m26[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m147[0m       const data = await this.fs.readFile(fullPath)
[7m   [0m [91m                         ~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m144[0m:[93m13[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m144[0m       await this.fs.access(fullPath)
[7m   [0m [91m            ~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m141[0m:[93m24[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m141[0m       const fullPath = this.path.join(this.basePath, key)
[7m   [0m [91m                       ~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m127[0m:[93m13[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m127[0m       await this.fs.writeFile(fullPath, data)
[7m   [0m [91m            ~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m124[0m:[93m13[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m124[0m       await this.fs.mkdir(dir, { recursive: true })
[7m   [0m [91m            ~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m123[0m:[93m19[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m123[0m       const dir = this.path.dirname(fullPath)
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m120[0m:[93m24[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m120[0m       const fullPath = this.path.join(this.basePath, key)
[7m   [0m [91m                       ~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m92[0m:[93m9[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m92[0m         this.path.relative(this.basePath, file),
[7m  [0m [91m        ~~~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m66[0m:[93m13[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m66[0m       await this.fs.mkdir(this.basePath, { recursive: true });
[7m  [0m [91m            ~~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m51[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType '{ (path: PathLike, options: MakeDirectoryOptions & { recursive: true; }): Promise<string | undefined>; (path: PathLike, options?: Mode | ... 2 more ... | undefined): Promise<...>; (path: PathLike, options?: MakeDirectoryOptions | ... 2 more ... | undefined): Promise<...>; }' is not assignable to type '(path: string, options?: { recursive?: boolean | undefined; } | undefined) => Promise<void>'.
  Types of parameters 'options' and 'options' are incompatible.

[7m51[0m         mkdir: fsModule.mkdir,
[7m  [0m [91m        ~~~~~[0m
[96msrc/lib/security/backup/storage-providers/local-fs.ts[0m:[93m37[0m:[93m23[0m - [91merror[0m[90m ts(6138): [0mProperty 'config' is declared but its value is never read.

[7m37[0m   constructor(private config: StorageProviderConfig) {
[7m  [0m [91m                      ~~~~~~[0m

[96msrc/lib/security/backup/storage-providers/memory.ts[0m:[93m14[0m:[93m23[0m - [91merror[0m[90m ts(6138): [0mProperty 'config' is declared but its value is never read.

[7m14[0m   constructor(private config: StorageProviderConfig) {}
[7m  [0m [91m                      ~~~~~~[0m
[96msrc/lib/security/backup/storage-providers/memory.ts[0m:[93m8[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"../backup-types"' has no exported member 'StorageProvider'.

[7m8[0m import type { StorageProvider, StorageProviderConfig } from '../backup-types'
[7m [0m [91m              ~~~~~~~~~~~~~~~[0m

[96msrc/lib/security/pii/index.ts[0m:[93m410[0m:[93m54[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'timestamp'.

[7m410[0m         metadata: { operation: FHEOperation.ANALYZE, timestamp: Date.now() },
[7m   [0m [91m                                                     ~~~~~~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m51[0m - [91merror[0m[90m ts(2454): [0mVariable 'types' is used before being assigned.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [91m                                                  ~~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m51[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'types' used before its declaration.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [91m                                                  ~~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m46[0m - [91merror[0m[90m ts(2695): [0mLeft side of comma operator is unused and has no side effects.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [91m                                             ~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m34[0m - [91merror[0m[90m ts(2454): [0mVariable 'confidence' is used before being assigned.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [91m                                 ~~~~~~~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m34[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'confidence' used before its declaration.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [91m                                 ~~~~~~~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m25[0m - [91merror[0m[90m ts(2695): [0mLeft side of comma operator is unused and has no side effects.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [91m                        ~~~~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m392[0m:[93m31[0m - [91merror[0m[90m ts(2352): [0mConversion of type 'RealFHEService' to type 'FHEService' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Property 'processEncrypted' is missing in type 'RealFHEService' but required in type 'FHEService'.

[7m392[0m       const fheServiceTyped = fheService as FHEService;
[7m   [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m410[0m:[93m21[0m - [93mwarning[0m[90m ts(7028): [0mUnused label.

[7m410[0m         metadata: { operation: FHEOperation.ANALYZE, timestamp: Date.now() },
[7m   [0m [93m                    ~~~~~~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m410[0m:[93m9[0m - [93mwarning[0m[90m ts(7028): [0mUnused label.

[7m410[0m         metadata: { operation: FHEOperation.ANALYZE, timestamp: Date.now() },
[7m   [0m [93m        ~~~~~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m17[0m - [93mwarning[0m[90m ts(7028): [0mUnused label.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [93m                ~~~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m9[0m - [93mwarning[0m[90m ts(7028): [0mUnused label.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [93m        ~~~~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m410[0m:[93m77[0m - [91merror[0m[90m ts(1128): [0mDeclaration or statement expected.

[7m410[0m         metadata: { operation: FHEOperation.ANALYZE, timestamp: Date.now() },
[7m   [0m [91m                                                                            ~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m410[0m:[93m63[0m - [91merror[0m[90m ts(1005): [0m';' expected.

[7m410[0m         metadata: { operation: FHEOperation.ANALYZE, timestamp: Date.now() },
[7m   [0m [91m                                                              ~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m62[0m - [91merror[0m[90m ts(1128): [0mDeclaration or statement expected.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [91m                                                             ~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m56[0m - [91merror[0m[90m ts(1005): [0m';' expected.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [91m                                                       ~[0m
[96msrc/lib/security/pii/index.ts[0m:[93m409[0m:[93m44[0m - [91merror[0m[90m ts(1005): [0m';' expected.

[7m409[0m         data: { hasPII: 'false', confidence: '0', types: '' },
[7m   [0m [91m                                           ~[0m

[96msrc/lib/security/pii/middleware.ts[0m:[93m129[0m:[93m50[0m - [91merror[0m[90m ts(6133): [0m'context' is declared but its value is never read.

[7m129[0m export const onRequest = defineMiddleware(async (context: APIContext, next) => {
[7m   [0m [91m                                                 ~~~~~~~[0m
[96msrc/lib/security/pii/middleware.ts[0m:[93m17[0m:[93m30[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'next/server' or its corresponding type declarations.

[7m17[0m import { NextResponse } from 'next/server'
[7m  [0m [91m                             ~~~~~~~~~~~~~[0m
[96msrc/lib/security/pii/middleware.ts[0m:[93m15[0m:[93m34[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'next/server' or its corresponding type declarations.

[7m15[0m import type { NextRequest } from 'next/server'
[7m  [0m [91m                                 ~~~~~~~~~~~~~[0m
[96msrc/lib/security/pii/middleware.ts[0m:[93m12[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m12[0m import type { APIContext } from 'astro'
[7m  [0m [91m              ~~~~~~~~~~[0m

[96msrc/lib/security/pii/register.ts[0m:[93m93[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m93[0m   if (process.env.NODE_ENV === 'test') {
[7m  [0m [91m                  ~~~~~~~~[0m
[96msrc/lib/security/pii/register.ts[0m:[93m86[0m:[93m34[0m - [91merror[0m[90m ts(4111): [0mProperty 'HIPAA_COMPLIANCE_MODE' comes from an index signature, so it must be accessed with ['HIPAA_COMPLIANCE_MODE'].

[7m86[0m       blockRequests: process.env.HIPAA_COMPLIANCE_MODE === 'true',
[7m  [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/security/pii/register.ts[0m:[93m82[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m82[0m   if (process.env.NODE_ENV === 'production') {
[7m  [0m [91m                  ~~~~~~~~[0m
[96msrc/lib/security/pii/register.ts[0m:[93m71[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m71[0m   if (process.env.NODE_ENV === 'development') {
[7m  [0m [91m                  ~~~~~~~~[0m

[96msrc/lib/server-only/MentalLLaMAPythonBridge.ts[0m:[93m10[0m:[93m16[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'baseLogger'.

[7m10[0m const logger = baseLogger
[7m  [0m [91m               ~~~~~~~~~~[0m
[96msrc/lib/server-only/MentalLLaMAPythonBridge.ts[0m:[93m6[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../types/index.ts' or its corresponding type declarations.

[7m6[0m } from '../types/index.ts'
[7m [0m [91m       ~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/services/OllamaCheckInService.ts[0m:[93m188[0m:[93m22[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m188[0m           decision = fallbackMatch[1].toLowerCase() as 'yes' | 'no'
[7m   [0m [91m                     ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/OllamaCheckInService.ts[0m:[93m183[0m:[93m20[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m183[0m         decision = decisionMatch[1].toLowerCase() as 'yes' | 'no'
[7m   [0m [91m                   ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/OllamaCheckInService.ts[0m:[93m156[0m:[93m34[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m156[0m         const improvementsText = improvementsMatch[1].trim()
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/services/analytics/AnalyticsService.mock.ts[0m:[93m13[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'options' is declared but its value is never read.

[7m13[0m   private options: AnalyticsServiceOptions;
[7m  [0m [91m          ~~~~~~~[0m

[96msrc/lib/services/analytics/__tests__/AnalyticsService.test.ts[0m:[93m333[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m333[0m       expect(result[0].name).toBe('response_time')
[7m   [0m [91m             ~~~~~~~~~[0m
[96msrc/lib/services/analytics/__tests__/AnalyticsService.test.ts[0m:[93m290[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m290[0m       expect(result[0].id).toBe('test-1')
[7m   [0m [91m             ~~~~~~~~~[0m

[96msrc/lib/services/contact/__tests__/ContactService.test.ts[0m:[93m33[0m:[93m55[0m - [91merror[0m[90m ts(2503): [0mCannot find namespace 'vi'.

[7m33[0m const MockedEmailService = EmailService as unknown as vi.MockedClass<
[7m  [0m [91m                                                      ~~[0m

[96msrc/lib/services/email/__tests__/EmailService.test.ts[0m:[93m97[0m:[93m9[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m97[0m         (mockRedisMethods.lpush as ReturnType<typeof vi.fn>).mock.calls[0][1],
[7m  [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/services/notification/NotificationService.ts[0m:[93m530[0m:[93m38[0m - [91merror[0m[90m ts(2551): [0mProperty 'hget' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'. Did you mean 'get'?
  Property 'hget' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m530[0m     const subscription = await redis.hget(this.subscriptionKey, userId)
[7m   [0m [91m                                     ~~~~[0m
[96msrc/lib/services/notification/NotificationService.ts[0m:[93m520[0m:[93m17[0m - [91merror[0m[90m ts(2551): [0mProperty 'hdel' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'. Did you mean 'del'?
  Property 'hdel' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m520[0m     await redis.hdel(this.subscriptionKey, userId)
[7m   [0m [91m                ~~~~[0m
[96msrc/lib/services/notification/NotificationService.ts[0m:[93m512[0m:[93m17[0m - [91merror[0m[90m ts(2551): [0mProperty 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'. Did you mean 'set'?
  Property 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m512[0m     await redis.hset(this.subscriptionKey, userId, JSON.stringify(subscription))
[7m   [0m [91m                ~~~~[0m
[96msrc/lib/services/notification/NotificationService.ts[0m:[93m460[0m:[93m39[0m - [91merror[0m[90m ts(2339): [0mProperty 'hgetall' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'.
  Property 'hgetall' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m460[0m     const notifications = await redis.hgetall(`notifications:${userId}`)
[7m   [0m [91m                                      ~~~~~~~[0m
[96msrc/lib/services/notification/NotificationService.ts[0m:[93m445[0m:[93m39[0m - [91merror[0m[90m ts(2339): [0mProperty 'hgetall' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'.
  Property 'hgetall' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m445[0m     const notifications = await redis.hgetall(`notifications:${userId}`)
[7m   [0m [91m                                      ~~~~~~~[0m
[96msrc/lib/services/notification/NotificationService.ts[0m:[93m430[0m:[93m17[0m - [91merror[0m[90m ts(2551): [0mProperty 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'. Did you mean 'set'?
  Property 'hset' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m430[0m     await redis.hset(
[7m   [0m [91m                ~~~~[0m
[96msrc/lib/services/notification/NotificationService.ts[0m:[93m418[0m:[93m38[0m - [91merror[0m[90m ts(2551): [0mProperty 'hget' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; } | Redis'. Did you mean 'get'?
  Property 'hget' does not exist on type '{ get: () => Promise<null>; set: () => Promise<string>; del: () => Promise<number>; exists: () => Promise<number>; expire: () => Promise<number>; ping: () => Promise<...>; quit: () => Promise<...>; disconnect: () => void; status: string; }'.

[7m418[0m     const notification = await redis.hget(
[7m   [0m [91m                                     ~~~~[0m

[96msrc/lib/services/notification/SlackNotificationService.ts[0m:[93m120[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'elements' does not exist in type 'SlackBlock'.

[7m120[0m       elements: [
[7m   [0m [91m      ~~~~~~~~[0m

[96msrc/lib/services/notification/__tests__/NotificationService.test.ts[0m:[93m338[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m338[0m       expect(result[0].id).toBe('test-id-2') // Offset by 2, limit 5
[7m   [0m [91m             ~~~~~~~~~[0m
[96msrc/lib/services/notification/__tests__/NotificationService.test.ts[0m:[93m315[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m315[0m       expect(result[0].id).toBe('test-id-1') // Most recent first
[7m   [0m [91m             ~~~~~~~~~[0m

[96msrc/lib/services/notification/__tests__/WebSocketServer.test.ts[0m:[93m187[0m:[93m15[0m - [91merror[0m[90m ts(2339): [0mProperty 'supabaseAdmin' does not exist on type 'typeof import("/home/vivi/pixelated/src/lib/supabase")'.

[7m187[0m       const { supabaseAdmin } = await import('@/lib/supabase')
[7m   [0m [91m              ~~~~~~~~~~~~~[0m
[96msrc/lib/services/notification/__tests__/WebSocketServer.test.ts[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(1192): [0mModule '"/home/vivi/pixelated/src/lib/utils/logger"' has no default export.

[7m1[0m import logger from '@/lib/utils/logger'
[7m [0m [91m       ~~~~~~[0m

[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m359[0m:[93m25[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m359[0m       await mongoClient.db
[7m   [0m [91m                        ~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m359[0m:[93m13[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m359[0m       await mongoClient.db
[7m   [0m [91m            ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m319[0m:[93m27[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m319[0m         await mongoClient.db
[7m   [0m [91m                          ~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m319[0m:[93m15[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m319[0m         await mongoClient.db
[7m   [0m [91m              ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m314[0m:[93m31[0m - [91merror[0m[90m ts(2341): [0mProperty 'client' is private and only accessible within class 'MongoDB'.

[7m314[0m   const session = mongoClient.client.startSession()
[7m   [0m [91m                              ~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m314[0m:[93m19[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.client' is possibly 'null'.

[7m314[0m   const session = mongoClient.client.startSession()
[7m   [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m187[0m:[93m35[0m - [91merror[0m[90m ts(4111): [0mProperty 'value' comes from an index signature, so it must be accessed with ['value'].

[7m187[0m     const updatedRequest = result.value as DataDeletionRequest
[7m   [0m [91m                                  ~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m187[0m:[93m28[0m - [91merror[0m[90m ts(18047): [0m'result' is possibly 'null'.

[7m187[0m     const updatedRequest = result.value as DataDeletionRequest
[7m   [0m [91m                           ~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m182[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'value' comes from an index signature, so it must be accessed with ['value'].

[7m182[0m     if (!result.value) {
[7m   [0m [91m                ~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m182[0m:[93m10[0m - [91merror[0m[90m ts(18047): [0m'result' is possibly 'null'.

[7m182[0m     if (!result.value) {
[7m   [0m [91m         ~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m174[0m:[93m38[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m174[0m     const result = await mongoClient.db
[7m   [0m [91m                                     ~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m174[0m:[93m26[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m174[0m     const result = await mongoClient.db
[7m   [0m [91m                         ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m145[0m:[93m12[0m - [91merror[0m[90m ts(2352): [0mConversion of type 'WithId<Document>[]' to type 'DataDeletionRequest[]' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Type 'WithId<Document>' is missing the following properties from type 'DataDeletionRequest': id, patientId, patientName, dataScope, and 5 more.

[7m145[0m     return requests as DataDeletionRequest[]
[7m   [0m [91m           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m126[0m:[93m31[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m126[0m     const query = mongoClient.db.collection('data_deletion_requests')
[7m   [0m [91m                              ~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m126[0m:[93m19[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m126[0m     const query = mongoClient.db.collection('data_deletion_requests')
[7m   [0m [91m                  ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m103[0m:[93m39[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m103[0m     const request = await mongoClient.db
[7m   [0m [91m                                      ~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m103[0m:[93m27[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m103[0m     const request = await mongoClient.db
[7m   [0m [91m                          ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m68[0m:[93m38[0m - [91merror[0m[90m ts(2341): [0mProperty 'db' is private and only accessible within class 'MongoDB'.

[7m68[0m     const result = await mongoClient.db
[7m  [0m [91m                                     ~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m68[0m:[93m26[0m - [91merror[0m[90m ts(18047): [0m'mongoClient.db' is possibly 'null'.

[7m68[0m     const result = await mongoClient.db
[7m  [0m [91m                         ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m68[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'result' is declared but its value is never read.

[7m68[0m     const result = await mongoClient.db
[7m  [0m [91m          ~~~~~~[0m
[96msrc/lib/services/patient-rights/dataDeleteService.ts[0m:[93m8[0m:[93m36[0m - [91merror[0m[90m ts(2554): [0mExpected 0 arguments, but got 1.

[7m8[0m const auditLogger = getAuditLogger('patient-rights')
[7m [0m [91m                                   ~~~~~~~~~~~~~~~~[0m

[96msrc/lib/services/redis/RedisService.ts[0m:[93m372[0m:[93m25[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'RedisPipelineOperation'.

[7m372[0m         const commands: RedisPipelineOperation[] = []
[7m   [0m [91m                        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/RedisService.ts[0m:[93m201[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType 'Redis' is not assignable to type 'RedisMockClient'.
  Types of property 'set' are incompatible.

[7m201[0m     const mockClient: RedisMockClient = {
[7m   [0m [91m          ~~~~~~~~~~[0m
[96msrc/lib/services/redis/RedisService.ts[0m:[93m193[0m:[93m31[0m - [91merror[0m[90m ts(2355): [0mA function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.

[7m193[0m   private createMockClient(): Redis {
[7m   [0m [91m                              ~~~~~[0m

[96msrc/lib/services/redis/redis-operation-types.ts[0m:[93m27[0m:[93m18[0m - [91merror[0m[90m ts(2430): [0mInterface 'RedisMockClient' incorrectly extends interface 'Partial<Redis>'.
  Types of property 'on' are incompatible.

[7m27[0m export interface RedisMockClient extends Partial<Redis> {
[7m  [0m [91m                 ~~~~~~~~~~~~~~~[0m

[96msrc/lib/services/redis/__mocks__/RedisService.ts[0m:[93m15[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'connected' is declared but its value is never read.

[7m15[0m   private connected = false
[7m  [0m [91m          ~~~~~~~~~[0m
[96msrc/lib/services/redis/__mocks__/RedisService.ts[0m:[93m14[0m:[93m14[0m - [91merror[0m[90m ts(2420): [0mClass 'RedisService' incorrectly implements interface 'IRedisService'.
  Type 'RedisService' is missing the following properties from type 'IRedisService': hlen, zrem, zrange, zpopmin, and 2 more.

[7m14[0m export class RedisService extends EventEmitter implements IRedisService {
[7m  [0m [91m             ~~~~~~~~~~~~[0m

[96msrc/lib/services/redis/__mocks__/redis.mock.ts[0m:[93m146[0m:[93m15[0m - [91merror[0m[90m ts(4111): [0mProperty 'SKIP_REDIS_TESTS' comes from an index signature, so it must be accessed with ['SKIP_REDIS_TESTS'].

[7m146[0m   process.env.SKIP_REDIS_TESTS = 'true'
[7m   [0m [91m              ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__mocks__/redis.mock.ts[0m:[93m139[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m139[0m if (process.env.NODE_ENV !== 'test') {
[7m   [0m [91m                ~~~~~~~~[0m
[96msrc/lib/services/redis/__mocks__/redis.mock.ts[0m:[93m106[0m:[93m1[0m - [91merror[0m[90m ts(2322): [0mType '(received: any, expected: any) => { pass: any; message: () => string; }' is not assignable to type '<T = unknown>(expected: DeeplyAllowMatchers<T>[]) => any'.
  Target signature provides too few arguments. Expected 2 or more, but got 1.

[7m106[0m expect.arrayContaining = arrayContaining
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__mocks__/redis.mock.ts[0m:[93m97[0m:[93m32[0m - [91merror[0m[90m ts(7006): [0mParameter 'item' implicitly has an 'any' type.

[7m97[0m   const pass = expected.every((item) => received.includes(item))
[7m  [0m [91m                               ~~~~[0m
[96msrc/lib/services/redis/__mocks__/redis.mock.ts[0m:[93m96[0m:[93m36[0m - [91merror[0m[90m ts(7006): [0mParameter 'expected' implicitly has an 'any' type.

[7m96[0m const arrayContaining = (received, expected) => {
[7m  [0m [91m                                   ~~~~~~~~[0m
[96msrc/lib/services/redis/__mocks__/redis.mock.ts[0m:[93m96[0m:[93m26[0m - [91merror[0m[90m ts(7006): [0mParameter 'received' implicitly has an 'any' type.

[7m96[0m const arrayContaining = (received, expected) => {
[7m  [0m [91m                         ~~~~~~~~[0m

[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m237[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'toExistInRedis' does not exist on type 'Assertion<string>'.

[7m237[0m       await expect(key).not.toExistInRedis()
[7m   [0m [91m                            ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m158[0m:[93m31[0m - [91merror[0m[90m ts(2339): [0mProperty 'toExistInRedis' does not exist on type 'Assertion<string>'.

[7m158[0m         await expect(key).not.toExistInRedis()
[7m   [0m [91m                              ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m152[0m:[93m25[0m - [91merror[0m[90m ts(2339): [0mProperty 'toExistInRedis' does not exist on type 'Assertion<string>'.

[7m152[0m       await expect(key).toExistInRedis()
[7m   [0m [91m                        ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m138[0m:[93m31[0m - [91merror[0m[90m ts(2339): [0mProperty 'toExistInRedis' does not exist on type 'Assertion<string>'.

[7m138[0m         await expect(key).not.toExistInRedis()
[7m   [0m [91m                              ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m129[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'toExistInRedis' does not exist on type 'Assertion<string>'.

[7m129[0m         await expect(key).toExistInRedis()
[7m   [0m [91m                          ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m70[0m:[93m31[0m - [91merror[0m[90m ts(2339): [0mProperty 'toExistInRedis' does not exist on type 'Assertion<string>'.

[7m70[0m         await expect(key).not.toExistInRedis()
[7m  [0m [91m                              ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m61[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'toExistInRedis' does not exist on type 'Assertion<string>'.

[7m61[0m         await expect(key).toExistInRedis()
[7m  [0m [91m                          ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m36[0m:[93m49[0m - [91merror[0m[90m ts(2322): [0mType 'Redis | null' is not assignable to type 'RedisService | Redis'.
  Type 'null' is not assignable to type 'RedisService | Redis'.

[7m36[0m     cacheInvalidation = new CacheInvalidation({ redis: redis.getClient() })
[7m  [0m [91m                                                ~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m27[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_KEY_PREFIX' comes from an index signature, so it must be accessed with ['REDIS_KEY_PREFIX'].

[7m27[0m       keyPrefix: process.env.REDIS_KEY_PREFIX!,
[7m  [0m [91m                             ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m26[0m:[93m24[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_URL' comes from an index signature, so it must be accessed with ['REDIS_URL'].

[7m26[0m       url: process.env.REDIS_URL!,
[7m  [0m [91m                       ~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m23[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_URL' comes from an index signature, so it must be accessed with ['REDIS_URL'].

[7m23[0m     subClient = new Redis(process.env.REDIS_URL!)
[7m  [0m [91m                                      ~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts[0m:[93m22[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_URL' comes from an index signature, so it must be accessed with ['REDIS_URL'].

[7m22[0m     pubClient = new Redis(process.env.REDIS_URL!)
[7m  [0m [91m                                      ~~~~~~~~~[0m

[96msrc/lib/services/redis/__tests__/PatternRecognition.integration.test.ts[0m:[93m152[0m:[93m11[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'securityLevel' does not exist in type 'TherapySession'.

[7m152[0m           securityLevel: 'fhe',
[7m   [0m [91m          ~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/PatternRecognition.integration.test.ts[0m:[93m148[0m:[93m21[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'testId'.

[7m148[0m           clientId: testId,
[7m   [0m [91m                    ~~~~~~[0m
[96msrc/lib/services/redis/__tests__/PatternRecognition.integration.test.ts[0m:[93m143[0m:[93m11[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'securityLevel' does not exist in type 'TherapySession'.

[7m143[0m           securityLevel: 'fhe',
[7m   [0m [91m          ~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/PatternRecognition.integration.test.ts[0m:[93m139[0m:[93m21[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'testId'.

[7m139[0m           clientId: testId,
[7m   [0m [91m                    ~~~~~~[0m
[96msrc/lib/services/redis/__tests__/PatternRecognition.integration.test.ts[0m:[93m71[0m:[93m7[0m - [91merror[0m[90m ts(2740): [0mType '{ connect: () => Promise<void>; disconnect: () => Promise<void>; get: (_: string) => Promise<null>; set: (_key: string, _value: string, _ttlMs?: number | undefined) => Promise<...>; ... 9 more ...; keys: (_pattern: string) => Promise<...>; }' is missing the following properties from type 'IRedisService': deletePattern, hset, hget, hgetall, and 11 more.

[7m71[0m const mockRedisService: IRedisService = {
[7m  [0m [91m      ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/PatternRecognition.integration.test.ts[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/ai/AIService"' has no exported member 'EmotionAnalysis'.

[7m5[0m import type { EmotionAnalysis, TherapySession } from '@/lib/ai/AIService'
[7m [0m [91m              ~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/PatternRecognition.integration.test.ts[0m:[93m4[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/lib/ai/services/PatternRecognitionService' or its corresponding type declarations.

[7m4[0m } from '@/lib/ai/services/PatternRecognitionService'
[7m [0m [91m       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/services/redis/__tests__/RedisService.integration.test.ts[0m:[93m491[0m:[93m51[0m - [91merror[0m[90m ts(2339): [0mProperty 'toBeRedisError' does not exist on type 'Promisify<Assertion<Promise<string | null>>>'.

[7m491[0m         await expect(retryRedis.get(key)).rejects.toBeRedisError(
[7m   [0m [91m                                                  ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.integration.test.ts[0m:[93m388[0m:[93m53[0m - [91merror[0m[90m ts(2339): [0mProperty 'toBeRedisError' does not exist on type 'Promisify<Assertion<Promise<void>>>'.

[7m388[0m       await expect(unstableRedis.connect()).rejects.toBeRedisError(
[7m   [0m [91m                                                    ~~~~~~~~~~~~~~[0m

[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m164[0m:[93m13[0m - [91merror[0m[90m ts(6133): [0m'_initialStats' is declared but its value is never read.

[7m164[0m       const _initialStats = await redis.getPoolStats()
[7m   [0m [91m            ~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m158[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m158[0m       expect(results[1048576].read).toBeLessThan(25) // 25ms for 1MB read
[7m   [0m [91m             ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m157[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m157[0m       expect(results[1048576].write).toBeLessThan(50) // 50ms for 1MB write
[7m   [0m [91m             ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m155[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m155[0m       expect(results[102400].read).toBeLessThan(5) // 5ms for 100KB read
[7m   [0m [91m             ~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m154[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m154[0m       expect(results[102400].write).toBeLessThan(10) // 10ms for 100KB write
[7m   [0m [91m             ~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m152[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m152[0m       expect(results[10240].read).toBeLessThan(1) // 1ms for 10KB read
[7m   [0m [91m             ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m151[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m151[0m       expect(results[10240].write).toBeLessThan(2) // 2ms for 10KB write
[7m   [0m [91m             ~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m149[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m149[0m       expect(results[1024].read).toBeLessThan(1) // 1ms for 1KB read
[7m   [0m [91m             ~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m148[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m148[0m       expect(results[1024].write).toBeLessThan(1) // 1ms for 1KB write
[7m   [0m [91m             ~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m23[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_KEY_PREFIX' comes from an index signature, so it must be accessed with ['REDIS_KEY_PREFIX'].

[7m23[0m       keyPrefix: process.env.REDIS_KEY_PREFIX!,
[7m  [0m [91m                             ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m22[0m:[93m24[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_URL' comes from an index signature, so it must be accessed with ['REDIS_URL'].

[7m22[0m       url: process.env.REDIS_URL!,
[7m  [0m [91m                       ~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m12[0m:[93m58[0m - [91merror[0m[90m ts(4111): [0mProperty 'CI' comes from an index signature, so it must be accessed with ['CI'].

[7m12[0m   process.env.SKIP_REDIS_TESTS === 'true' || process.env.CI === 'true'
[7m  [0m [91m                                                         ~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.perf.test.ts[0m:[93m12[0m:[93m15[0m - [91merror[0m[90m ts(4111): [0mProperty 'SKIP_REDIS_TESTS' comes from an index signature, so it must be accessed with ['SKIP_REDIS_TESTS'].

[7m12[0m   process.env.SKIP_REDIS_TESTS === 'true' || process.env.CI === 'true'
[7m  [0m [91m              ~~~~~~~~~~~~~~~~[0m

[96msrc/lib/services/redis/__tests__/RedisService.test.ts[0m:[93m363[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_KEY_PREFIX' comes from an index signature, so it must be accessed with ['REDIS_KEY_PREFIX'].

[7m363[0m         keyPrefix: process.env.REDIS_KEY_PREFIX!,
[7m   [0m [91m                               ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.test.ts[0m:[93m362[0m:[93m26[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_URL' comes from an index signature, so it must be accessed with ['REDIS_URL'].

[7m362[0m         url: process.env.REDIS_URL!,
[7m   [0m [91m                         ~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.test.ts[0m:[93m83[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_KEY_PREFIX' comes from an index signature, so it must be accessed with ['REDIS_KEY_PREFIX'].

[7m83[0m         keyPrefix: process.env.REDIS_KEY_PREFIX!,
[7m  [0m [91m                               ~~~~~~~~~~~~~~~~[0m
[96msrc/lib/services/redis/__tests__/RedisService.test.ts[0m:[93m82[0m:[93m26[0m - [91merror[0m[90m ts(4111): [0mProperty 'REDIS_URL' comes from an index signature, so it must be accessed with ['REDIS_URL'].

[7m82[0m         url: process.env.REDIS_URL!,
[7m  [0m [91m                         ~~~~~~~~~[0m

[96msrc/lib/services/redis/__tests__/test-utils.ts[0m:[93m161[0m:[93m3[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m161[0m   await redis.disconnect()
[7m   [0m [93m  ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/services/websocket/BiasWebSocketServer.ts[0m:[93m498[0m:[93m11[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'totalAlerts' does not exist in type 'BiasSummaryStats'.

[7m498[0m           totalAlerts: 0,
[7m   [0m [91m          ~~~~~~~~~~~[0m
[96msrc/lib/services/websocket/BiasWebSocketServer.ts[0m:[93m839[0m:[93m63[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m839[0m     return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
[7m   [0m [93m                                                              ~~~~~~[0m

[96msrc/lib/state/enhanced-persistence.ts[0m:[93m379[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'data' comes from an index signature, so it must be accessed with ['data'].

[7m379[0m     return draft?.data || null
[7m   [0m [91m                  ~~~~[0m
[96msrc/lib/state/enhanced-persistence.ts[0m:[93m282[0m:[93m51[0m - [91merror[0m[90m ts(4111): [0mProperty 'timestamp' comes from an index signature, so it must be accessed with ['timestamp'].

[7m282[0m         typeof (draft as Record<string, unknown>).timestamp === 'number'
[7m   [0m [91m                                                  ~~~~~~~~~[0m
[96msrc/lib/state/enhanced-persistence.ts[0m:[93m255[0m:[93m26[0m - [91merror[0m[90m ts(4111): [0mProperty 'lastActivity' comes from an index signature, so it must be accessed with ['lastActivity'].

[7m255[0m       now - sessionState.lastActivity > sessionTimeout
[7m   [0m [91m                         ~~~~~~~~~~~~[0m
[96msrc/lib/state/enhanced-persistence.ts[0m:[93m254[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'lastActivity' comes from an index signature, so it must be accessed with ['lastActivity'].

[7m254[0m       typeof sessionState.lastActivity === 'number' &&
[7m   [0m [91m                          ~~~~~~~~~~~~[0m
[96msrc/lib/state/enhanced-persistence.ts[0m:[93m253[0m:[93m20[0m - [91merror[0m[90m ts(4111): [0mProperty 'lastActivity' comes from an index signature, so it must be accessed with ['lastActivity'].

[7m253[0m       sessionState.lastActivity &&
[7m   [0m [91m                   ~~~~~~~~~~~~[0m
[96msrc/lib/state/enhanced-persistence.ts[0m:[93m236[0m:[93m14[0m - [91merror[0m[90m ts(18046): [0m'formDrafts' is of type 'unknown'.

[7m236[0m       delete formDrafts[key]
[7m   [0m [91m             ~~~~~~~~~~[0m
[96msrc/lib/state/enhanced-persistence.ts[0m:[93m229[0m:[93m45[0m - [91merror[0m[90m ts(4111): [0mProperty 'timestamp' comes from an index signature, so it must be accessed with ['timestamp'].

[7m229[0m         ((b[1] as Record<string, unknown>)?.timestamp as number) || 0
[7m   [0m [91m                                            ~~~~~~~~~[0m
[96msrc/lib/state/enhanced-persistence.ts[0m:[93m227[0m:[93m45[0m - [91merror[0m[90m ts(4111): [0mProperty 'timestamp' comes from an index signature, so it must be accessed with ['timestamp'].

[7m227[0m         ((a[1] as Record<string, unknown>)?.timestamp as number) || 0
[7m   [0m [91m                                            ~~~~~~~~~[0m
[96msrc/lib/state/enhanced-persistence.ts[0m:[93m225[0m:[93m41[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(o: ArrayLike<unknown> | { [s: string]: unknown; }): [string, unknown][]', gave the following error.
  Overload 2 of 2, '(o: {}): [string, any][]', gave the following error.

[7m225[0m     const draftEntries = Object.entries(formDrafts).sort((a, b) => {
[7m   [0m [91m                                        ~~~~~~~~~~[0m

[96msrc/lib/state/jotai-persistence.ts[0m:[93m296[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'syncSubscriptions' is declared but its value is never read.

[7m296[0m   private syncSubscriptions: Map<string, () => void> = new Map()
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/state/jotai-persistence.ts[0m:[93m242[0m:[93m36[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 3, '(getStringStorage: () => AsyncStringStorage, options?: JsonStorageOptions | undefined): AsyncStorage<Value>', gave the following error.
  Overload 2 of 3, '(getStringStorage: () => SyncStringStorage, options?: JsonStorageOptions | undefined): SyncStorage<Value>', gave the following error.

[7m242[0m     createJSONStorage<Value>(() => storage as unknown),
[7m   [0m [91m                                   ~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/state/jotai-persistence.ts[0m:[93m213[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'key' is declared but its value is never read.

[7m213[0m     key: string,
[7m   [0m [91m    ~~~[0m
[96msrc/lib/state/jotai-persistence.ts[0m:[93m184[0m:[93m17[0m - [91merror[0m[90m ts(6133): [0m'key' is declared but its value is never read.

[7m184[0m   async setItem(key: string, newValue: Value): Promise<void> {
[7m   [0m [91m                ~~~[0m
[96msrc/lib/state/jotai-persistence.ts[0m:[93m165[0m:[93m17[0m - [91merror[0m[90m ts(6133): [0m'key' is declared but its value is never read.

[7m165[0m   async getItem(key: string, initialValue: Value): Promise<Value> {
[7m   [0m [91m                ~~~[0m
[96msrc/lib/state/jotai-persistence.ts[0m:[93m122[0m:[93m29[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m122[0m           decrypted = await decrypt(serialized)
[7m   [0m [91m                            ~~~~~~~[0m
[96msrc/lib/state/jotai-persistence.ts[0m:[93m105[0m:[93m28[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m105[0m         serialized = await encrypt(serialized)
[7m   [0m [91m                           ~~~~~~~[0m
[96msrc/lib/state/jotai-persistence.ts[0m:[93m61[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m61[0m       ttl: options.ttl ?? undefined,
[7m  [0m [91m      ~~~[0m

[96msrc/lib/stores/fhe-store.ts[0m:[93m295[0m:[93m18[0m - [91merror[0m[90m ts(2352): [0mConversion of type 'string' to type 'EncryptedData<unknown>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

[7m295[0m               : (encryptedMessage as EncryptedData<unknown>)
[7m   [0m [91m                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/stores/fhe-store.ts[0m:[93m284[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType 'unknown' is not assignable to type 'HomomorphicOperationResult'.

[7m284[0m           result = await fheService.processEncrypted(
[7m   [0m [91m          ~~~~~~[0m
[96msrc/lib/stores/fhe-store.ts[0m:[93m225[0m:[93m16[0m - [91merror[0m[90m ts(2352): [0mConversion of type 'string' to type 'EncryptedData<unknown>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

[7m225[0m             : (encryptedMessage as EncryptedData<unknown>)
[7m   [0m [91m               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/stores/fhe-store.ts[0m:[93m429[0m:[93m26[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m429[0m         const newKeyId = await keyRotationService.getActiveKeyId()
[7m   [0m [93m                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/stores/fhe-store.ts[0m:[93m129[0m:[93m23[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m129[0m         const keyId = await keyRotationService.getActiveKeyId()
[7m   [0m [93m                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/types/supabase.ts[0m:[93m1[0m:[93m27[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../types/supabase' or its corresponding type declarations.

[7m1[0m import type { Json } from '../../types/supabase'
[7m [0m [91m                          ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/utils/demo-helpers.integration.test.ts[0m:[93m124[0m:[93m53[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ ok: true; text: () => Promise<string>; headers: Map<string, string>; }' to type 'Response' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Type '{ ok: true; text: () => Promise<string>; headers: Map<string, string>; }' is missing the following properties from type 'Response': redirected, status, statusText, type, and 9 more.

[7m124[0m       vi.mocked(global.fetch).mockResolvedValueOnce({
[7m   [0m [91m                                                    ~[0m
[7m125[0m         ok: true,
[7m   [0m [91m~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m127[0m         headers: new Map([['content-type', 'application/json']]),
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m128[0m       } as Response)
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/utils/demo-helpers.test.ts[0m:[93m453[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m453[0m       expect(parseInt(parts[1])).toBeGreaterThan(0)
[7m   [0m [91m                      ~~~~~~~~[0m

[96msrc/lib/utils/demo-helpers.ts[0m:[93m273[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'sessionData' is declared but its value is never read.

[7m273[0m   sessionData: SessionData,
[7m   [0m [91m  ~~~~~~~~~~~[0m
[96msrc/lib/utils/demo-helpers.ts[0m:[93m564[0m:[93m66[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m564[0m   return 'demo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
[7m   [0m [93m                                                                 ~~~~~~[0m

[96msrc/lib/utils/__mocks__/logger.ts[0m:[93m21[0m:[93m3[0m - [91merror[0m[90m ts(2693): [0m'Logger' only refers to a type, but is being used as a value here.

[7m21[0m   Logger, // Add Logger to the default export
[7m  [0m [91m  ~~~~~~[0m

[96msrc/lib/websocket/server.ts[0m:[93m46[0m:[93m13[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m46[0m             await this.handleStatusUpdate(clientId, message)
[7m  [0m [93m            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m253[0m:[93m36[0m - [91merror[0m[90m ts(4111): [0mProperty 'CLIENT_ID' comes from an index signature, so it must be accessed with ['CLIENT_ID'].

[7m253[0m       const clientId = process.env.CLIENT_ID || 'example-client-id'
[7m   [0m [91m                                   ~~~~~~~~~[0m
[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m100[0m:[93m17[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'ConnectionHandler'.

[7m100[0m       )?.[1] as ConnectionHandler
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m99[0m:[93m25[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'ConnectionHandler'.

[7m99[0m         (call: [string, ConnectionHandler]) => call[0] === 'connection',
[7m  [0m [91m                        ~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m99[0m:[93m9[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(predicate: (value: any[], index: number, obj: any[][]) => value is any[], thisArg?: any): any[] | undefined', gave the following error.
  Overload 2 of 2, '(predicate: (value: any[], index: number, obj: any[][]) => unknown, thisArg?: any): any[] | undefined', gave the following error.

[7m99[0m         (call: [string, ConnectionHandler]) => call[0] === 'connection',
[7m  [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m72[0m:[93m25[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'MockWebSocket'.

[7m72[0m     mockWebSocket = new MockWebSocket() as WebSocket & {
[7m  [0m [91m                        ~~~~~~~~~~~~~[0m
[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m333[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m333[0m       await messageHandler(JSON.stringify(message))
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m309[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m309[0m       await messageHandler(JSON.stringify(encryptedMessage))
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m243[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m243[0m       await messageHandler('invalid json')
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m208[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m208[0m       await messageHandler(JSON.stringify(statusMessage))
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m179[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m179[0m       await messageHandler(JSON.stringify(encryptedMessage))
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/lib/websocket/__tests__/server.test.ts[0m:[93m149[0m:[93m7[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m149[0m       await messageHandler(JSON.stringify(chatMessage))
[7m   [0m [93m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/load-tests/bias-detection-load-test.js[0m:[93m102[0m:[93m50[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m102[0m       userId: `user-${Math.random().toString(36).substr(2, 9)}`,
[7m   [0m [93m                                                 ~~~~~~[0m
[96msrc/load-tests/bias-detection-load-test.js[0m:[93m86[0m:[93m59[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m86[0m     sessionId: `test-session-${Math.random().toString(36).substr(2, 9)}`,
[7m  [0m [93m                                                          ~~~~~~[0m

[96msrc/load-tests/breach-notification.load.ts[0m:[93m257[0m:[93m69[0m - [91merror[0m[90m ts(2344): [0mType 'unknown' does not satisfy the constraint 'ResponseType | undefined'.

[7m257[0m     'test environment cleaned up successfully': (r: RefinedResponse<unknown>) =>
[7m   [0m [91m                                                                    ~~~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m256[0m:[93m3[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(obj: unknown, checks: Record<string, (obj: unknown) => boolean>): boolean', gave the following error.
  Overload 2 of 2, '(val: RefinedResponse<unknown>, sets: Checkers<RefinedResponse<unknown>>, tags?: object | undefined): boolean', gave the following error.

[7m256[0m   check(response, {
[7m   [0m [91m  ~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m239[0m:[93m64[0m - [91merror[0m[90m ts(2344): [0mType 'unknown' does not satisfy the constraint 'ResponseType | undefined'.

[7m239[0m     'test environment setup successfully': (r: RefinedResponse<unknown>) =>
[7m   [0m [91m                                                               ~~~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m238[0m:[93m3[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(obj: unknown, checks: Record<string, (obj: unknown) => boolean>): boolean', gave the following error.
  Overload 2 of 2, '(val: RefinedResponse<unknown>, sets: Checkers<RefinedResponse<unknown>>, tags?: object | undefined): boolean', gave the following error.

[7m238[0m   check(response, {
[7m   [0m [91m  ~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m212[0m:[93m58[0m - [91merror[0m[90m ts(2344): [0mType 'unknown' does not satisfy the constraint 'ResponseType | undefined'.

[7m212[0m       'all notifications delivered': (r: RefinedResponse<unknown>) => {
[7m   [0m [91m                                                         ~~~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m210[0m:[93m62[0m - [91merror[0m[90m ts(2344): [0mType 'unknown' does not satisfy the constraint 'ResponseType | undefined'.

[7m210[0m       'notifications sent successfully': (r: RefinedResponse<unknown>) =>
[7m   [0m [91m                                                             ~~~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m209[0m:[93m11[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 2 of 2, '(val: RefinedResponse<unknown>, sets: Checkers<RefinedResponse<unknown>>, tags?: object | undefined): boolean', gave the following error.

[7m209[0m     check(notificationResponse, {
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m192[0m:[93m9[0m - [91merror[0m[90m ts(18046): [0m'statusResponse' is of type 'unknown'.

[7m192[0m     if (statusResponse.notificationStatus === 'completed') {
[7m   [0m [91m        ~~~~~~~~~~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m190[0m:[93m46[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'string'.

[7m190[0m     const statusResponse = checkBreachStatus(breachId)
[7m   [0m [91m                                             ~~~~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m170[0m:[93m42[0m - [91merror[0m[90m ts(2344): [0mType 'unknown' does not satisfy the constraint 'ResponseType | undefined'.

[7m170[0m     'has breach ID': (r: RefinedResponse<unknown>) =>
[7m   [0m [91m                                         ~~~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m168[0m:[93m56[0m - [91merror[0m[90m ts(2344): [0mType 'unknown' does not satisfy the constraint 'ResponseType | undefined'.

[7m168[0m     'breach created successfully': (r: RefinedResponse<unknown>) =>
[7m   [0m [91m                                                       ~~~~~~~[0m
[96msrc/load-tests/breach-notification.load.ts[0m:[93m167[0m:[93m25[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 2 of 2, '(val: RefinedResponse<unknown>, sets: Checkers<RefinedResponse<unknown>>, tags?: object | undefined): boolean', gave the following error.

[7m167[0m   const success = check(createResponse, {
[7m   [0m [91m                        ~~~~~~~~~~~~~~[0m

[96msrc/pages/admin-test.astro[0m:[93m5[0m:[93m7[0m - [91merror[0m[90m ts(6133): [0m'mockUser' is declared but its value is never read.

[7m5[0m const mockUser = {
[7m [0m [91m      ~~~~~~~~[0m

[96msrc/pages/auth-callback.astro[0m:[93m5[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'AuthService' is declared but its value is never read.

[7m5[0m import { AuthService } from '@/services/auth.service'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/book.astro[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType 'false' is not assignable to type 'BgType | undefined'.

[7m10[0m   bgType={false}
[7m  [0m [91m  ~~~~~~[0m

[96msrc/pages/index.astro[0m:[93m248[0m:[93m27[0m - [91merror[0m[90m ts(6133): [0m'i' is declared but its value is never read.

[7m248[0m         {features.map((f, i) => (
[7m   [0m [91m                          ~[0m
[96msrc/pages/index.astro[0m:[93m19[0m:[93m7[0m - [91merror[0m[90m ts(6133): [0m'testimonials' is declared but its value is never read.

[7m19[0m const testimonials = [
[7m  [0m [91m      ~~~~~~~~~~~~[0m
[96msrc/pages/index.astro[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'Image' is declared but its value is never read.

[7m4[0m import { Image } from 'astro:assets';
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/login.astro[0m:[93m19[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType 'false' is not assignable to type 'BgType | undefined'.

[7m19[0m   bgType={false}
[7m  [0m [91m  ~~~~~~[0m

[96msrc/pages/mental-health-demo.astro[0m:[93m36[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType '{ title: string; description: string; showSettingsPanel: boolean; showAnalysisPanel: boolean; initialTab: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'showSettingsPanel' does not exist on type 'IntrinsicAttributes & Props'.

[7m36[0m         showSettingsPanel={true}
[7m  [0m [91m        ~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/mind-mirror-demo.astro[0m:[93m3[0m:[93m8[0m - [91merror[0m[90m ts(2440): [0mImport declaration conflicts with local declaration of 'MindMirrorDemo'.

[7m3[0m import MindMirrorDemo from '../components/MindMirrorDemo'
[7m [0m [91m       ~~~~~~~~~~~~~~[0m

[96msrc/pages/projects.astro[0m:[93m11[0m:[93m20[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'BgType'.

[7m11[0m   bgType: 'dot' as BgType,
[7m  [0m [91m                   ~~~~~~[0m

[96msrc/pages/prs.astro[0m:[93m12[0m:[93m21[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'BgType'.

[7m12[0m   bgType: 'plum' as BgType,
[7m  [0m [91m                    ~~~~~~[0m

[96msrc/pages/register.astro[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroGlobal'.

[7m2[0m import type { AstroGlobal } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~[0m

[96msrc/pages/reset-password-confirm.astro[0m:[93m28[0m:[93m58[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type '{ url: URL; site: URL; }'.

[7m28[0m const alreadyAuthenticated = await isAuthenticated(Astro.cookies)
[7m  [0m [91m                                                         ~~~~~~~[0m
[96msrc/pages/reset-password-confirm.astro[0m:[93m14[0m:[93m7[0m - [91merror[0m[90m ts(6133): [0m'type' is declared but its value is never read.

[7m14[0m const type = 'recovery' // For password reset flow, type is always recovery
[7m  [0m [91m      ~~~~[0m
[96msrc/pages/reset-password-confirm.astro[0m:[93m13[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type '{ url: URL; site: URL; }'.

[7m13[0m const email = Astro.cookies.get('auth_recovery_email')?.value
[7m  [0m [91m                    ~~~~~~~[0m
[96msrc/pages/reset-password-confirm.astro[0m:[93m12[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type '{ url: URL; site: URL; }'.

[7m12[0m const token = Astro.cookies.get('auth_recovery_token')?.value
[7m  [0m [91m                    ~~~~~~~[0m
[96msrc/pages/reset-password-confirm.astro[0m:[93m6[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'AuthService' is declared but its value is never read.

[7m6[0m import { AuthService } from '@/services/auth.service'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/reset-password.astro[0m:[93m11[0m:[93m58[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type '{ url: URL; site: URL; }'.

[7m11[0m const alreadyAuthenticated = await isAuthenticated(Astro.cookies)
[7m  [0m [91m                                                         ~~~~~~~[0m
[96msrc/pages/reset-password.astro[0m:[93m6[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'AuthService' is declared but its value is never read.

[7m6[0m import { AuthService } from '@/services/auth.service'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/search-demo.astro[0m:[93m3[0m:[93m8[0m - [91merror[0m[90m ts(2440): [0mImport declaration conflicts with local declaration of 'SearchDemo'.

[7m3[0m import SearchDemo from '@/components/SearchDemo.astro'
[7m [0m [91m       ~~~~~~~~~~[0m

[96msrc/pages/signin.astro[0m:[93m17[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType 'false' is not assignable to type 'BgType | undefined'.

[7m17[0m   bgType={false}
[7m  [0m [91m  ~~~~~~[0m

[96msrc/pages/signup.astro[0m:[93m7[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroGlobal'.

[7m7[0m import type { AstroGlobal } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~[0m

[96msrc/pages/therapists.astro[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType 'false' is not assignable to type 'BgType | undefined'.

[7m10[0m   bgType={false}
[7m  [0m [91m  ~~~~~~[0m

[96msrc/pages/admin/bias-detection.astro[0m:[93m28[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any[]; title: string; description: string; activeItem: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'activeItem' does not exist on type 'IntrinsicAttributes & Props'.

[7m28[0m   activeItem="bias-detection"
[7m  [0m [91m  ~~~~~~~~~~[0m
[96msrc/pages/admin/bias-detection.astro[0m:[93m16[0m:[93m42[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type '{ url: URL; site: URL; }'.

[7m16[0m const response = await verifyAdmin(Astro.request, context)
[7m  [0m [91m                                         ~~~~~~~[0m
[96msrc/pages/admin/bias-detection.astro[0m:[93m11[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'locals' does not exist on type '{ url: URL; site: URL; }'.

[7m11[0m   session: (Astro.locals as { session?: SessionData }).session || null,
[7m  [0m [91m                  ~~~~~~[0m

[96msrc/pages/admin/compatibility-dashboard.astro[0m:[93m90[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; title: string; description: string; showNavBar: boolean; showFooter: boolean; centered: boolean; contentClass: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'showNavBar' does not exist on type 'IntrinsicAttributes & Props'.

[7m90[0m   showNavBar={true}
[7m  [0m [91m  ~~~~~~~~~~[0m
[96msrc/pages/admin/compatibility-dashboard.astro[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'Chart' is declared but its value is never read.

[7m4[0m import { Chart } from 'chart.js/auto'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/compatibility-dashboard.astro[0m:[93m186[0m:[93m3[0m - [91merror[0m[90m ts(6192): [0mAll imports in import declaration are unused.

[7m186[0m   import type { ChartConfiguration, TooltipCallbacks } from 'chart.js'
[7m   [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/admin/demo-analytics.astro[0m:[93m299[0m:[93m28[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m299[0m           <CardDescription className="text-indigo-200/80">
[7m   [0m [91m                           ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m298[0m:[93m22[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m298[0m           <CardTitle className="text-indigo-100">Conversion Funnel</CardTitle>
[7m   [0m [91m                     ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m282[0m:[93m28[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m282[0m           <CardDescription className="text-gray-200/80">
[7m   [0m [91m                           ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m281[0m:[93m22[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m281[0m           <CardTitle className="text-gray-100">Live Event Stream</CardTitle>
[7m   [0m [91m                     ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m234[0m:[93m30[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m234[0m             <CardDescription className="text-orange-200/80">
[7m   [0m [91m                             ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m231[0m:[93m24[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m231[0m             <CardTitle className="text-orange-100"
[7m   [0m [91m                       ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m195[0m:[93m26[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m195[0m                   <Badge className="bg-blue-500/20 text-blue-300">Test</Badge>
[7m   [0m [91m                         ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m160[0m:[93m26[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m160[0m                   <Badge className="bg-green-500/20 text-green-300">Test</Badge>
[7m   [0m [91m                         ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m123[0m:[93m26[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m123[0m                   <Badge className="bg-purple-500/20 text-purple-300"
[7m   [0m [91m                         ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m112[0m:[93m30[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m112[0m             <CardDescription className="text-purple-200/80">
[7m   [0m [91m                             ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m109[0m:[93m24[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m109[0m             <CardTitle className="text-purple-100"
[7m   [0m [91m                       ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m88[0m:[93m24[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m88[0m             <CardTitle className="text-yellow-300 text-lg"
[7m  [0m [91m                       ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m87[0m:[93m23[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m87[0m           <CardHeader className="pb-2">
[7m  [0m [91m                      ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m74[0m:[93m24[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m74[0m             <CardTitle className="text-purple-300 text-lg"
[7m  [0m [91m                       ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m73[0m:[93m23[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m73[0m           <CardHeader className="pb-2">
[7m  [0m [91m                      ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m60[0m:[93m24[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m60[0m             <CardTitle className="text-green-300 text-lg"
[7m  [0m [91m                       ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m59[0m:[93m23[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m59[0m           <CardHeader className="pb-2">
[7m  [0m [91m                      ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m46[0m:[93m24[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m46[0m             <CardTitle className="text-blue-300 text-lg"
[7m  [0m [91m                       ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m45[0m:[93m23[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m45[0m           <CardHeader className="pb-2">
[7m  [0m [91m                      ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m29[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any[]; className: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'className' does not exist on type 'IntrinsicAttributes & Props'.

[7m29[0m           className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-green-500/20 border border-green-400/40 text-green-200 rounded-full"
[7m  [0m [91m          ~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m565[0m:[93m14[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ A: string; B: string; C: string; }'.

[7m565[0m       return colors[variant] || 'gray'
[7m   [0m [91m             ~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m563[0m:[93m21[0m - [91merror[0m[90m ts(7006): [0mParameter 'variant' implicitly has an 'any' type.

[7m563[0m     getVariantColor(variant) {
[7m   [0m [91m                    ~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m554[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'data' implicitly has an 'any' type.

[7m554[0m     calculateSignificance(data) {
[7m   [0m [91m                          ~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m554[0m:[93m27[0m - [91merror[0m[90m ts(6133): [0m'data' is declared but its value is never read.

[7m554[0m     calculateSignificance(data) {
[7m   [0m [91m                          ~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m549[0m:[93m9[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m549[0m         document.getElementById('recommendation').textContent =
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m547[0m:[93m9[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m547[0m         document.getElementById('confidence-level').textContent =
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m545[0m:[93m9[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m545[0m         document.getElementById('test-status').textContent =
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m540[0m:[93m9[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m540[0m         document.getElementById('recommendation').textContent =
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m538[0m:[93m9[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m538[0m         document.getElementById('confidence-level').textContent =
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m536[0m:[93m9[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m536[0m         document.getElementById('test-status').textContent =
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m533[0m:[93m13[0m - [91merror[0m[90m ts(6133): [0m'totalSessions' is declared but its value is never read.

[7m533[0m       const totalSessions = data.summary.unique_sessions
[7m   [0m [91m            ~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m531[0m:[93m35[0m - [91merror[0m[90m ts(7006): [0mParameter 'data' implicitly has an 'any' type.

[7m531[0m     updateStatisticalSignificance(data) {
[7m   [0m [91m                                  ~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m511[0m:[93m15[0m - [91merror[0m[90m ts(7006): [0mParameter 'event' implicitly has an 'any' type.

[7m511[0m         .map((event) => {
[7m   [0m [91m              ~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m510[0m:[93m7[0m - [91merror[0m[90m ts(18047): [0m'timeline' is possibly 'null'.

[7m510[0m       timeline.innerHTML = recentEvents
[7m   [0m [91m      ~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m505[0m:[93m9[0m - [91merror[0m[90m ts(18047): [0m'timeline' is possibly 'null'.

[7m505[0m         timeline.innerHTML =
[7m   [0m [91m        ~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m500[0m:[93m25[0m - [91merror[0m[90m ts(7006): [0mParameter 'events' implicitly has an 'any' type.

[7m500[0m     updateEventTimeline(events) {
[7m   [0m [91m                        ~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m496[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m496[0m       document.getElementById('funnel-cta-clicks-bar').style.width =
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m494[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m494[0m       document.getElementById('funnel-demo-interactions-bar').style.width =
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m491[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m491[0m       document.getElementById('funnel-cta-clicks-pct').textContent =
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m489[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m489[0m       document.getElementById('funnel-demo-interactions-pct').textContent =
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m482[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m482[0m       document.getElementById('funnel-cta-clicks').textContent = ctaClicks
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m480[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m480[0m       document.getElementById('funnel-demo-interactions').textContent =
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m479[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m479[0m       document.getElementById('funnel-page-views').textContent = pageViews
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m474[0m:[93m18[0m - [91merror[0m[90m ts(7006): [0mParameter 'funnelData' implicitly has an 'any' type.

[7m474[0m     updateFunnel(funnelData) {
[7m   [0m [91m                 ~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m468[0m:[93m9[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m468[0m         document.getElementById(
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m469[0m           `variant-${variant.toLowerCase()}-rate`,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m470[0m         ).textContent = rate + '%'
[7m   [0m [91m~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m465[0m:[93m9[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m465[0m         document.getElementById(
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m466[0m           `variant-${variant.toLowerCase()}-conversions`,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m467[0m         ).textContent = conversions
[7m   [0m [91m~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m462[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'number' is not assignable to type 'string'.

[7m462[0m         document.getElementById(
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m463[0m           `variant-${variant.toLowerCase()}-sessions`,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m464[0m         ).textContent = sessions
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m462[0m:[93m9[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m462[0m         document.getElementById(
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m463[0m           `variant-${variant.toLowerCase()}-sessions`,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m464[0m         ).textContent = sessions
[7m   [0m [91m~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m457[0m:[93m12[0m - [91merror[0m[90m ts(7006): [0mParameter 'e' implicitly has an 'any' type.

[7m457[0m           (e) => e.event === 'demo_cta_click',
[7m   [0m [91m           ~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m455[0m:[93m53[0m - [91merror[0m[90m ts(7006): [0mParameter 'e' implicitly has an 'any' type.

[7m455[0m         const sessions = new Set(variantEvents.map((e) => e.session_id)).size
[7m   [0m [91m                                                    ~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m453[0m:[93m12[0m - [91merror[0m[90m ts(7006): [0mParameter 'e' implicitly has an 'any' type.

[7m453[0m           (e) => e.ab_variant === variant,
[7m   [0m [91m           ~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m448[0m:[93m24[0m - [91merror[0m[90m ts(7006): [0mParameter 'data' implicitly has an 'any' type.

[7m448[0m     updateVariantStats(data) {
[7m   [0m [91m                       ~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m432[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m432[0m       document.getElementById('avg-scroll-depth').textContent =
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m430[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m430[0m       document.getElementById('avg-time-cta').textContent =
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m428[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m428[0m       document.getElementById('conversion-rate').textContent =
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m426[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m426[0m       document.getElementById('total-sessions').textContent =
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m424[0m:[93m21[0m - [91merror[0m[90m ts(7006): [0mParameter 'data' implicitly has an 'any' type.

[7m424[0m     updateDashboard(data) {
[7m   [0m [91m                    ~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m383[0m:[93m12[0m - [91merror[0m[90m ts(2339): [0mProperty 'data' does not exist on type 'DemoAnalyticsDashboard'.

[7m383[0m       this.data = {
[7m   [0m [91m           ~~~~[0m
[96msrc/pages/admin/demo-analytics.astro[0m:[93m382[0m:[93m12[0m - [91merror[0m[90m ts(2339): [0mProperty 'eventSource' does not exist on type 'DemoAnalyticsDashboard'.

[7m382[0m       this.eventSource = null
[7m   [0m [91m           ~~~~~~~~~~~[0m

[96msrc/pages/admin/fhe-dashboard.astro[0m:[93m13[0m:[93m42[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type '{ url: URL; site: URL; }'.

[7m13[0m const response = await verifyAdmin(Astro.request, context)
[7m  [0m [91m                                         ~~~~~~~[0m
[96msrc/pages/admin/fhe-dashboard.astro[0m:[93m8[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'locals' does not exist on type '{ url: URL; site: URL; }'.

[7m8[0m   session: (Astro.locals as { session?: SessionData }).session || null,
[7m [0m [91m                  ~~~~~~[0m

[96msrc/pages/admin/flagged-messages.astro[0m:[93m29[0m:[93m13[0m - [91merror[0m[90m ts(4111): [0mProperty 'flagged_reason' comes from an index signature, so it must be accessed with ['flagged_reason'].

[7m29[0m       (meta.flagged_reason as string) ||
[7m  [0m [91m            ~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/flagged-messages.astro[0m:[93m28[0m:[93m13[0m - [91merror[0m[90m ts(4111): [0mProperty 'reason' comes from an index signature, so it must be accessed with ['reason'].

[7m28[0m       (meta.reason as string) ||
[7m  [0m [91m            ~~~~~~[0m
[96msrc/pages/admin/flagged-messages.astro[0m:[93m11[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'redirect' does not exist on type '{ url: URL; site: URL; }'.

[7m11[0m   redirect: Astro.redirect,
[7m  [0m [91m                  ~~~~~~~~[0m
[96msrc/pages/admin/flagged-messages.astro[0m:[93m10[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type '{ url: URL; site: URL; }'.

[7m10[0m   cookies: Astro.cookies,
[7m  [0m [91m                 ~~~~~~~[0m

[96msrc/pages/admin/performance-dashboard.astro[0m:[93m7[0m:[93m7[0m - [91merror[0m[90m ts(6133): [0m'config' is declared but its value is never read.

[7m7[0m const config = getMonitoringConfig()
[7m [0m [91m      ~~~~~~[0m

[96msrc/pages/admin/security-settings.astro[0m:[93m10[0m:[93m44[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ url: URL; site: URL; }' is not assignable to parameter of type '{ request: Request; cookies: AstroCookies; redirect: (path: string) => Response; locals?: Record<string, unknown> | undefined; }'.
  Type '{ url: URL; site: URL; }' is missing the following properties from type '{ request: Request; cookies: AstroCookies; redirect: (path: string) => Response; locals?: Record<string, unknown> | undefined; }': request, cookies, redirect

[7m10[0m const authResponse = await requirePageAuth(Astro, 'admin')
[7m  [0m [91m                                           ~~~~~[0m

[96msrc/pages/admin/ai/high-risk-crises.astro[0m:[93m10[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'redirect' does not exist on type '{ url: URL; site: URL; }'.

[7m10[0m   redirect: Astro.redirect,
[7m  [0m [91m                  ~~~~~~~~[0m
[96msrc/pages/admin/ai/high-risk-crises.astro[0m:[93m9[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type '{ url: URL; site: URL; }'.

[7m9[0m   cookies: Astro.cookies,
[7m [0m [91m                 ~~~~~~~[0m

[96msrc/pages/admin/ai/model-performance.astro[0m:[93m10[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'redirect' does not exist on type '{ url: URL; site: URL; }'.

[7m10[0m   redirect: Astro.redirect,
[7m  [0m [91m                  ~~~~~~~~[0m
[96msrc/pages/admin/ai/model-performance.astro[0m:[93m9[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type '{ url: URL; site: URL; }'.

[7m9[0m   cookies: Astro.cookies,
[7m [0m [91m                 ~~~~~~~[0m

[96msrc/pages/admin/ai/performance.astro[0m:[93m15[0m:[93m42[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type '{ url: URL; site: URL; }'.

[7m15[0m const response = await verifyAdmin(Astro.request, context)
[7m  [0m [91m                                         ~~~~~~~[0m
[96msrc/pages/admin/ai/performance.astro[0m:[93m10[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'locals' does not exist on type '{ url: URL; site: URL; }'.

[7m10[0m   session: (Astro.locals as { session?: SessionData }).session || null,
[7m  [0m [91m                  ~~~~~~[0m

[96msrc/pages/admin/ai/usage.astro[0m:[93m10[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'redirect' does not exist on type '{ url: URL; site: URL; }'.

[7m10[0m   redirect: Astro.redirect,
[7m  [0m [91m                  ~~~~~~~~[0m
[96msrc/pages/admin/ai/usage.astro[0m:[93m9[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type '{ url: URL; site: URL; }'.

[7m9[0m   cookies: Astro.cookies,
[7m [0m [91m                 ~~~~~~~[0m

[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m322[0m:[93m41[0m - [91merror[0m[90m ts(2339): [0mProperty 'nextScheduledRun' does not exist on type '{ initialised: boolean; historyCount: number; }'.

[7m322[0m                             runnerState.nextScheduledRun,
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m320[0m:[93m37[0m - [91merror[0m[90m ts(2339): [0mProperty 'nextScheduledRun' does not exist on type '{ initialised: boolean; historyCount: number; }'.

[7m320[0m                       {runnerState?.nextScheduledRun
[7m   [0m [91m                                    ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m311[0m:[93m37[0m - [91merror[0m[90m ts(2339): [0mProperty 'schedule' does not exist on type '{ initialised: boolean; historyCount: number; }'.

[7m311[0m                       {runnerState?.schedule || 'Unknown'}
[7m   [0m [91m                                    ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m298[0m:[93m26[0m - [91merror[0m[90m ts(2339): [0mProperty 'isScheduled' does not exist on type '{ initialised: boolean; historyCount: number; }'.

[7m298[0m             runnerState?.isScheduled ? (
[7m   [0m [91m                         ~~~~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m287[0m:[93m39[0m - [91merror[0m[90m ts(2339): [0mProperty 'isScheduled' does not exist on type '{ initialised: boolean; historyCount: number; }'.

[7m287[0m               disabled={!runnerState?.isScheduled}
[7m   [0m [91m                                      ~~~~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m167[0m:[93m82[0m - [91merror[0m[90m ts(2339): [0mProperty 'totalTests' does not exist on type 'ValidationStats'.

[7m167[0m                   ? `${Math.round((validationStats.passedTests / validationStats.totalTests) * 100)}%`
[7m   [0m [91m                                                                                 ~~~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m167[0m:[93m52[0m - [91merror[0m[90m ts(2339): [0mProperty 'passedTests' does not exist on type 'ValidationStats'.

[7m167[0m                   ? `${Math.round((validationStats.passedTests / validationStats.totalTests) * 100)}%`
[7m   [0m [91m                                                   ~~~~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m166[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'totalTests' does not exist on type 'ValidationStats'.

[7m166[0m                 validationStats?.totalTests
[7m   [0m [91m                                 ~~~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m158[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'passedTests' does not exist on type 'ValidationStats'.

[7m158[0m               {validationStats?.passedTests || 0}
[7m   [0m [91m                                ~~~~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m144[0m:[93m45[0m - [91merror[0m[90m ts(2339): [0mProperty 'byModel' does not exist on type 'ValidationStats'.

[7m144[0m               {Object.keys(validationStats?.byModel || {}).length || 0}
[7m   [0m [91m                                            ~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m135[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'totalTests' does not exist on type 'ValidationStats'.

[7m135[0m               {validationStats?.totalTests || 0}
[7m   [0m [91m                                ~~~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m121[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'runCount' does not exist on type 'ValidationStats'.

[7m121[0m               {validationStats?.runCount || 0}
[7m   [0m [91m                                ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m112[0m:[93m46[0m - [91merror[0m[90m ts(2339): [0mProperty 'lastRun' does not exist on type 'ValidationStats'.

[7m112[0m                   ? new Date(validationStats.lastRun).toLocaleString()
[7m   [0m [91m                                             ~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m111[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'lastRun' does not exist on type 'ValidationStats'.

[7m111[0m                 validationStats?.lastRun
[7m   [0m [91m                                 ~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m16[0m:[93m25[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m16[0m   validationInitError = error.message
[7m  [0m [91m                        ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m638[0m:[93m35[0m - [91merror[0m[90m ts(7006): [0mParameter 'entry' implicitly has an 'any' type.

[7m638[0m             data.history.forEach((entry) => {
[7m   [0m [91m                                  ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m616[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'disabled' does not exist on type 'HTMLElement'.

[7m616[0m         unscheduleValidationBtn.disabled = false
[7m   [0m [91m                                ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m614[0m:[93m44[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m614[0m         alert(`Error canceling schedule: ${error.message}`)
[7m   [0m [91m                                           ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m592[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'disabled' does not exist on type 'HTMLElement'.

[7m592[0m         unscheduleValidationBtn.disabled = true
[7m   [0m [91m                                ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m584[0m:[93m31[0m - [91merror[0m[90m ts(2339): [0mProperty 'disabled' does not exist on type 'HTMLElement'.

[7m584[0m         scheduleValidationBtn.disabled = false
[7m   [0m [91m                              ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m582[0m:[93m42[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m582[0m         alert(`Error setting schedule: ${error.message}`)
[7m   [0m [91m                                         ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m559[0m:[93m42[0m - [91merror[0m[90m ts(2339): [0mProperty 'value' does not exist on type 'HTMLElement'.

[7m559[0m           schedule = cronScheduleSelect?.value
[7m   [0m [91m                                         ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m554[0m:[93m39[0m - [91merror[0m[90m ts(2339): [0mProperty 'value' does not exist on type 'HTMLElement'.

[7m554[0m           schedule = customCronInput?.value?.trim()
[7m   [0m [91m                                      ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m553[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'value' does not exist on type 'HTMLElement'.

[7m553[0m         if (cronScheduleSelect?.value === 'custom') {
[7m   [0m [91m                                ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m548[0m:[93m31[0m - [91merror[0m[90m ts(2339): [0mProperty 'disabled' does not exist on type 'HTMLElement'.

[7m548[0m         scheduleValidationBtn.disabled = true
[7m   [0m [91m                              ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m540[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'disabled' does not exist on type 'HTMLElement'.

[7m540[0m         stopContinuousBtn.disabled = false
[7m   [0m [91m                          ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m538[0m:[93m56[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m538[0m         alert(`Error stopping continuous validation: ${error.message}`)
[7m   [0m [91m                                                       ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m523[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'disabled' does not exist on type 'HTMLElement'.

[7m523[0m         stopContinuousBtn.disabled = true
[7m   [0m [91m                          ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m515[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'disabled' does not exist on type 'HTMLElement'.

[7m515[0m         startContinuousBtn.disabled = false
[7m   [0m [91m                           ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m513[0m:[93m56[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m513[0m         alert(`Error starting continuous validation: ${error.message}`)
[7m   [0m [91m                                                       ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m498[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'disabled' does not exist on type 'HTMLElement'.

[7m498[0m         startContinuousBtn.disabled = true
[7m   [0m [91m                           ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m490[0m:[93m26[0m - [91merror[0m[90m ts(2339): [0mProperty 'disabled' does not exist on type 'HTMLElement'.

[7m490[0m         runValidationBtn.disabled = false
[7m   [0m [91m                         ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m488[0m:[93m44[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m488[0m         alert(`Error running validation: ${error.message}`)
[7m   [0m [91m                                           ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m473[0m:[93m26[0m - [91merror[0m[90m ts(2339): [0mProperty 'disabled' does not exist on type 'HTMLElement'.

[7m473[0m         runValidationBtn.disabled = true
[7m   [0m [91m                         ~~~~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m463[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'value' does not exist on type 'EventTarget'.

[7m463[0m       if (e.target.value === 'custom') {
[7m   [0m [91m                   ~~~~~[0m
[96msrc/pages/admin/ai/validation-pipeline.astro[0m:[93m463[0m:[93m11[0m - [91merror[0m[90m ts(18047): [0m'e.target' is possibly 'null'.

[7m463[0m       if (e.target.value === 'custom') {
[7m   [0m [91m          ~~~~~~~~[0m

[96msrc/pages/admin/backups/index.astro[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'BackupRecoveryTab' is declared but its value is never read.

[7m4[0m import BackupRecoveryTab from '../../../components/admin/backup/BackupRecoveryTab'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/admin/consent/index.astro[0m:[93m9[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ url: URL; site: URL; }' is not assignable to parameter of type '{ request: Request; cookies: AstroCookies; redirect: (path: string) => Response; locals?: Record<string, unknown> | undefined; }'.
  Type '{ url: URL; site: URL; }' is missing the following properties from type '{ request: Request; cookies: AstroCookies; redirect: (path: string) => Response; locals?: Record<string, unknown> | undefined; }': request, cookies, redirect

[7m9[0m await requirePageAuth(Astro, 'admin')
[7m [0m [91m                      ~~~~~[0m

[96msrc/pages/admin/security/index.astro[0m:[93m53[0m:[93m29[0m - [91merror[0m[90m ts(7006): [0mParameter 'level' implicitly has an 'any' type.

[7m53[0m function getAlertLevelClass(level) {
[7m  [0m [91m                            ~~~~~[0m
[96msrc/pages/admin/security/index.astro[0m:[93m42[0m:[93m21[0m - [91merror[0m[90m ts(7006): [0mParameter 'date' implicitly has an 'any' type.

[7m42[0m function formatDate(date) {
[7m  [0m [91m                    ~~~~[0m

[96msrc/pages/admin/security/baa/management.astro[0m:[93m14[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'searchQuery' does not exist on type 'URLSearchParams'.

[7m14[0m const { status = '', searchQuery = '' } = Astro.url.searchParams
[7m  [0m [91m                     ~~~~~~~~~~~[0m
[96msrc/pages/admin/security/baa/management.astro[0m:[93m14[0m:[93m9[0m - [91merror[0m[90m ts(2339): [0mProperty 'status' does not exist on type 'URLSearchParams'.

[7m14[0m const { status = '', searchQuery = '' } = Astro.url.searchParams
[7m  [0m [91m        ~~~~~~[0m
[96msrc/pages/admin/security/baa/management.astro[0m:[93m6[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'BusinessAssociateType' is declared but its value is never read.

[7m6[0m   BusinessAssociateType,
[7m [0m [91m  ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/security/baa/management.astro[0m:[93m5[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'BaaStatus' is declared but its value is never read.

[7m5[0m   BaaStatus,
[7m [0m [91m  ~~~~~~~~~[0m
[96msrc/pages/admin/security/baa/management.astro[0m:[93m540[0m:[93m18[0m - [91merror[0m[90m ts(2551): [0mProperty 'submit' does not exist on type 'HTMLElement'. Did you mean 'onsubmit'?

[7m540[0m       searchForm.submit()
[7m   [0m [91m                 ~~~~~~[0m
[96msrc/pages/admin/security/baa/management.astro[0m:[93m533[0m:[93m47[0m - [91merror[0m[90m ts(2551): [0mProperty 'submit' does not exist on type 'HTMLElement'. Did you mean 'onsubmit'?

[7m533[0m       document.getElementById('search-form')?.submit()
[7m   [0m [91m                                              ~~~~~~[0m

[96msrc/pages/admin/security/baa/templates.astro[0m:[93m8[0m:[93m1[0m - [91merror[0m[90m ts(6192): [0mAll imports in import declaration are unused.

[7m 8[0m import {
[7m  [0m [91m~~~~~~~~[0m
[7m 9[0m   BusinessAssociateType,
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m   ServiceCategory,
[7m  [0m [91m~~~~~~~~~~~~~~~~~~[0m
[7m11[0m } from '../../../../lib/security/baa/types'
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/security/baa/templates.astro[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m ts(6192): [0mAll imports in import declaration are unused.

[7m4[0m import {
[7m [0m [91m~~~~~~~~[0m
[7m5[0m   standardSections,
[7m [0m [91m~~~~~~~~~~~~~~~~~~~[0m
[7m6[0m   standardPlaceholders,
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m7[0m } from '../../../../lib/security/baa/templates/hipaa-standard'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/admin/security/baa/templates.astro[0m:[93m227[0m:[93m44[0m - [91merror[0m[90m ts(2339): [0mProperty 'getAttribute' does not exist on type 'EventTarget'.

[7m227[0m         const templateId = e.currentTarget.getAttribute('data-template-id')
[7m   [0m [91m                                           ~~~~~~~~~~~~[0m
[96msrc/pages/admin/security/baa/templates.astro[0m:[93m227[0m:[93m28[0m - [91merror[0m[90m ts(18047): [0m'e.currentTarget' is possibly 'null'.

[7m227[0m         const templateId = e.currentTarget.getAttribute('data-template-id')
[7m   [0m [91m                           ~~~~~~~~~~~~~~~[0m

[96msrc/pages/admin/security/baa/vendors.astro[0m:[93m65[0m:[93m3[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'BusinessAssociateType | undefined'.
  Type 'string' is not assignable to type 'BusinessAssociateType | undefined'.

[7m65[0m   type || undefined,
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/admin/security/disaster-recovery/index.astro[0m:[93m285[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type '"verified" | "needs-testing" | "needs-update" | "in-development"'.

[7m285[0m                       {getStatusDisplayText(plan.status)}
[7m   [0m [91m                                            ~~~~~~~~~~~[0m
[96msrc/pages/admin/security/disaster-recovery/index.astro[0m:[93m283[0m:[93m125[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string' is not assignable to parameter of type '"verified" | "needs-testing" | "needs-update" | "in-development"'.

[7m283[0m                       class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(plan.status)}`}
[7m   [0m [91m                                                                                                                            ~~~~~~~~~~~[0m

[96msrc/pages/analytics/comparative-progress.astro[0m:[93m7[0m:[93m31[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type '{ url: URL; site: URL; }'.

[7m7[0m const isAuthenticated = Astro.cookies.get('auth-token') !== undefined
[7m [0m [91m                              ~~~~~~~[0m

[96msrc/pages/analytics/conversions.astro[0m:[93m8[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroGlobal'.

[7m8[0m import type { AstroGlobal } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~[0m

[96msrc/pages/analytics/index.astro[0m:[93m8[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroGlobal'.

[7m8[0m import type { AstroGlobal } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~[0m

[96msrc/pages/api/dashboard.ts[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroCookies'.

[7m4[0m import type { AstroCookies } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~[0m
[96msrc/pages/api/dashboard.ts[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m3[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/search.ts[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m2[0m import type { APIContext } from 'astro'
[7m [0m [91m              ~~~~~~~~~~[0m
[96msrc/pages/api/search.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/admin/metrics.ts[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m3[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/admin/sessions.ts[0m:[93m2[0m:[93m25[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m2[0m import type { APIRoute, APIContext } from 'astro'
[7m [0m [91m                        ~~~~~~~~~~[0m
[96msrc/pages/api/admin/sessions.ts[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m2[0m import type { APIRoute, APIContext } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/admin/users.ts[0m:[93m2[0m:[93m25[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m2[0m import type { APIRoute, APIContext } from 'astro'
[7m [0m [91m                        ~~~~~~~~~~[0m
[96msrc/pages/api/admin/users.ts[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m2[0m import type { APIRoute, APIContext } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/admin/patient-rights/delete-request.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/admin/patient-rights/update-deletion-request.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/completion.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"@/lib/ai/models/types"' has no exported member 'AIMessage'.

[7m1[0m import type { AIMessage } from '@/lib/ai/models/types'
[7m [0m [91m              ~~~~~~~~~[0m

[96msrc/pages/api/ai/crisis-detection.ts[0m:[93m165[0m:[93m30[0m - [91merror[0m[90m ts(2339): [0mProperty 'access_token' does not exist on type 'Session'.

[7m165[0m             session.session?.access_token?.substring(0, 8) ||
[7m   [0m [91m                             ~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/crisis-detection.ts[0m:[93m134[0m:[93m32[0m - [91merror[0m[90m ts(2339): [0mProperty 'access_token' does not exist on type 'Session'.

[7m134[0m               session.session?.access_token?.substring(0, 8) ||
[7m   [0m [91m                               ~~~~~~~~~~~~[0m

[96msrc/pages/api/ai/high-risk-detections.ts[0m:[93m1[0m:[93m25[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m1[0m import type { APIRoute, APIContext } from 'astro'
[7m [0m [91m                        ~~~~~~~~~~[0m
[96msrc/pages/api/ai/high-risk-detections.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute, APIContext } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/intervention-analysis.ts[0m:[93m64[0m:[93m7[0m - [91merror[0m[90m ts(2739): [0mType 'AIService' is missing the following properties from type 'AIService': createStreamingChatCompletion, dispose

[7m64[0m       aiService: aiService as unknown as AIService, // Force the type to match what InterventionAnalysisService expects
[7m  [0m [91m      ~~~~~~~~~[0m
[96msrc/pages/api/ai/intervention-analysis.ts[0m:[93m1[0m:[93m25[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m1[0m import type { APIRoute, APIContext } from 'astro'
[7m [0m [91m                        ~~~~~~~~~~[0m
[96msrc/pages/api/ai/intervention-analysis.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute, APIContext } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/response.ts[0m:[93m87[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m87[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/ai/response.ts[0m:[93m22[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m22[0m export const GET: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/ai/response.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/usage-stats.ts[0m:[93m91[0m:[93m11[0m - [91merror[0m[90m ts(2554): [0mExpected 4-6 arguments, but got 1.

[7m91[0m     await createAuditLog({
[7m  [0m [91m          ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/usage-stats.ts[0m:[93m75[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'length' does not exist on type 'AIUsageStats'.

[7m75[0m         statsCount: stats.length,
[7m  [0m [91m                          ~~~~~~[0m
[96msrc/pages/api/ai/usage-stats.ts[0m:[93m67[0m:[93m11[0m - [91merror[0m[90m ts(2554): [0mExpected 4-6 arguments, but got 1.

[7m67[0m     await createAuditLog({
[7m  [0m [91m          ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/usage-stats.ts[0m:[93m48[0m:[93m11[0m - [91merror[0m[90m ts(2554): [0mExpected 4-6 arguments, but got 1.

[7m48[0m     await createAuditLog({
[7m  [0m [91m          ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/usage-stats.ts[0m:[93m11[0m:[93m57[0m - [91merror[0m[90m ts(7031): [0mBinding element 'url' implicitly has an 'any' type.

[7m11[0m export const GET: APIRoute = async ({ request, cookies, url }) => {
[7m  [0m [91m                                                        ~~~[0m
[96msrc/pages/api/ai/usage-stats.ts[0m:[93m11[0m:[93m48[0m - [91merror[0m[90m ts(7031): [0mBinding element 'cookies' implicitly has an 'any' type.

[7m11[0m export const GET: APIRoute = async ({ request, cookies, url }) => {
[7m  [0m [91m                                               ~~~~~~~[0m
[96msrc/pages/api/ai/usage-stats.ts[0m:[93m11[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m11[0m export const GET: APIRoute = async ({ request, cookies, url }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/ai/usage-stats.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/usage.ts[0m:[93m22[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m22[0m export const GET: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/ai/usage.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/datasets/merge.ts[0m:[93m11[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m11[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/ai/datasets/merge.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/datasets/prepare.ts[0m:[93m13[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m13[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/ai/datasets/prepare.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/mental-health/analyze.ts[0m:[93m87[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m87[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/ai/mental-health/analyze.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/mental-health/status.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/recommendations/enhanced.ts[0m:[93m53[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m53[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/ai/recommendations/enhanced.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/validation/history.ts[0m:[93m29[0m:[93m24[0m - [91merror[0m[90m ts(4111): [0mProperty 'scope' comes from an index signature, so it must be accessed with ['scope'].

[7m29[0m           tokenPayload.scope === 'validation:read'
[7m  [0m [91m                       ~~~~~[0m
[96msrc/pages/api/ai/validation/history.ts[0m:[93m28[0m:[93m24[0m - [91merror[0m[90m ts(4111): [0mProperty 'purpose' comes from an index signature, so it must be accessed with ['purpose'].

[7m28[0m           tokenPayload.purpose === 'ai-validation' &&
[7m  [0m [91m                       ~~~~~~~[0m
[96msrc/pages/api/ai/validation/history.ts[0m:[93m12[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m12[0m export const GET: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/ai/validation/history.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/validation/results.ts[0m:[93m110[0m:[93m76[0m - [91merror[0m[90m ts(2339): [0mProperty 'runCount' does not exist on type 'ValidationStats'.

[7m110[0m         'ETag': `"validation-${validationResults.length}-${validationStats.runCount}"`,
[7m   [0m [91m                                                                           ~~~~~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m91[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m91[0m         userId: authResult.user?.id,
[7m  [0m [91m                           ~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m88[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m88[0m       authResult.user?.id || 'system',
[7m  [0m [91m                 ~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m56[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m56[0m           email: authResult.user?.email,
[7m  [0m [91m                            ~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m55[0m:[93m30[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m55[0m           userId: authResult.user?.id,
[7m  [0m [91m                             ~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m52[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m52[0m         authResult.user?.id || 'unknown',
[7m  [0m [91m                   ~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m50[0m:[93m24[0m - [91merror[0m[90m ts(2339): [0mProperty 'SECURITY_EVENT' does not exist on type 'typeof AuditEventType'.

[7m50[0m         AuditEventType.SECURITY_EVENT,
[7m  [0m [91m                       ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m47[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m47[0m     if (!authResult.user?.isAdmin) {
[7m  [0m [91m                    ~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m24[0m:[93m30[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m24[0m         ? `user:${authResult.user.id}`
[7m  [0m [91m                             ~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m23[0m:[93m46[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m23[0m       authResult.authenticated && authResult.user?.id
[7m  [0m [91m                                             ~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m23[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m23[0m       authResult.authenticated && authResult.user?.id
[7m  [0m [91m                 ~~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m16[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m16[0m export const GET: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/ai/validation/results.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/validation/run.ts[0m:[93m79[0m:[93m38[0m - [91merror[0m[90m ts(7006): [0mParameter 'r' implicitly has an 'any' type.

[7m79[0m         passedCount: results.filter((r) => r.passed).length,
[7m  [0m [91m                                     ~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m77[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m77[0m         userId: authResult.user?.id,
[7m  [0m [91m                           ~~~~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m74[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m74[0m       authResult.user?.id || 'system',
[7m  [0m [91m                 ~~~~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m68[0m:[93m53[0m - [91merror[0m[90m ts(2339): [0mProperty 'runValidation' does not exist on type 'EmotionValidationPipeline'.

[7m68[0m     const results = await emotionValidationPipeline.runValidation()
[7m  [0m [91m                                                    ~~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m42[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m42[0m           email: authResult.user?.email,
[7m  [0m [91m                            ~~~~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m41[0m:[93m30[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m41[0m           userId: authResult.user?.id,
[7m  [0m [91m                             ~~~~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m38[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m38[0m         authResult.user?.id || 'unknown',
[7m  [0m [91m                   ~~~~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m36[0m:[93m24[0m - [91merror[0m[90m ts(2339): [0mProperty 'SECURITY_EVENT' does not exist on type 'typeof AuditEventType'.

[7m36[0m         AuditEventType.SECURITY_EVENT,
[7m  [0m [91m                       ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m33[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m33[0m     if (!authResult.user?.isAdmin) {
[7m  [0m [91m                    ~~~~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m17[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m17[0m     if (!authResult.authenticated) {
[7m  [0m [91m                    ~~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m11[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m11[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/ai/validation/run.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m109[0m:[93m30[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m109[0m           userId: authResult.user?.id,
[7m   [0m [91m                             ~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m106[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m106[0m         authResult.user?.id || 'system',
[7m   [0m [91m                   ~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m79[0m:[93m30[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m79[0m           userId: authResult.user?.id,
[7m  [0m [91m                             ~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m76[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m76[0m         authResult.user?.id || 'system',
[7m  [0m [91m                   ~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m42[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m42[0m           email: authResult.user?.email,
[7m  [0m [91m                            ~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m41[0m:[93m30[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m41[0m           userId: authResult.user?.id,
[7m  [0m [91m                             ~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m38[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m38[0m         authResult.user?.id || 'unknown',
[7m  [0m [91m                   ~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m36[0m:[93m24[0m - [91merror[0m[90m ts(2339): [0mProperty 'SECURITY_EVENT' does not exist on type 'typeof AuditEventType'.

[7m36[0m         AuditEventType.SECURITY_EVENT,
[7m  [0m [91m                       ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m33[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m33[0m     if (!authResult.user?.isAdmin) {
[7m  [0m [91m                    ~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m17[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m17[0m     if (!authResult.authenticated) {
[7m  [0m [91m                    ~~~~~~~~~~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m11[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m11[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/ai/validation/schedule.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/analytics/comparative-progress.ts[0m:[93m28[0m:[93m48[0m - [91merror[0m[90m ts(7031): [0mBinding element 'cookies' implicitly has an 'any' type.

[7m28[0m export const get: APIRoute = async ({ request, cookies }) => {
[7m  [0m [91m                                               ~~~~~~~[0m
[96msrc/pages/api/analytics/comparative-progress.ts[0m:[93m28[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m28[0m export const get: APIRoute = async ({ request, cookies }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/analytics/comparative-progress.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m251[0m:[93m9[0m - [91merror[0m[90m ts(2783): [0m'page' is specified more than once, so this usage will be overwritten.

[7m251[0m         page: event.page,
[7m   [0m [91m        ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m250[0m:[93m9[0m - [91merror[0m[90m ts(2783): [0m'ab_variant' is specified more than once, so this usage will be overwritten.

[7m250[0m         ab_variant: event.ab_variant,
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m182[0m:[93m45[0m - [91merror[0m[90m ts(4111): [0mProperty 'PUBLIC_GA_MEASUREMENT_ID' comes from an index signature, so it must be accessed with ['PUBLIC_GA_MEASUREMENT_ID'].

[7m182[0m   const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID
[7m   [0m [91m                                            ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m164[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'message' does not exist in type 'AnalyticsProcessingError'.

[7m164[0m       message: 'Failed to retrieve analytics data',
[7m   [0m [91m      ~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m120[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'url' implicitly has an 'any' type.

[7m120[0m export const GET: APIRoute = async ({ url }) => {
[7m   [0m [91m                                      ~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m106[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'message' does not exist in type 'AnalyticsProcessingError'.

[7m106[0m       message: 'Failed to process analytics event',
[7m   [0m [91m      ~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m78[0m:[93m92[0m - [91merror[0m[90m ts(4111): [0mProperty 'CUSTOM_ANALYTICS_TOKEN' comes from an index signature, so it must be accessed with ['CUSTOM_ANALYTICS_TOKEN'].

[7m78[0m     const hasCustom = Boolean(import.meta.env.CUSTOM_ANALYTICS_ENDPOINT && import.meta.env.CUSTOM_ANALYTICS_TOKEN);
[7m  [0m [91m                                                                                           ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m78[0m:[93m47[0m - [91merror[0m[90m ts(4111): [0mProperty 'CUSTOM_ANALYTICS_ENDPOINT' comes from an index signature, so it must be accessed with ['CUSTOM_ANALYTICS_ENDPOINT'].

[7m78[0m     const hasCustom = Boolean(import.meta.env.CUSTOM_ANALYTICS_ENDPOINT && import.meta.env.CUSTOM_ANALYTICS_TOKEN);
[7m  [0m [91m                                              ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m77[0m:[93m49[0m - [91merror[0m[90m ts(4111): [0mProperty 'MIXPANEL_TOKEN' comes from an index signature, so it must be accessed with ['MIXPANEL_TOKEN'].

[7m77[0m     const hasMixpanel = Boolean(import.meta.env.MIXPANEL_TOKEN);
[7m  [0m [91m                                                ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m76[0m:[93m87[0m - [91merror[0m[90m ts(4111): [0mProperty 'GA_API_SECRET' comes from an index signature, so it must be accessed with ['GA_API_SECRET'].

[7m76[0m     const hasGA = Boolean(import.meta.env.PUBLIC_GA_MEASUREMENT_ID && import.meta.env.GA_API_SECRET);
[7m  [0m [91m                                                                                      ~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m76[0m:[93m43[0m - [91merror[0m[90m ts(4111): [0mProperty 'PUBLIC_GA_MEASUREMENT_ID' comes from an index signature, so it must be accessed with ['PUBLIC_GA_MEASUREMENT_ID'].

[7m76[0m     const hasGA = Boolean(import.meta.env.PUBLIC_GA_MEASUREMENT_ID && import.meta.env.GA_API_SECRET);
[7m  [0m [91m                                          ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m44[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'message' does not exist in type 'AnalyticsValidationError'.

[7m44[0m         message: 'Invalid analytics event data',
[7m  [0m [91m        ~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m16[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m16[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/analytics/demo-tracking.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/analytics/engagement.ts[0m:[93m130[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'message' does not exist in type 'AnalyticsProcessingError'.

[7m130[0m       message: 'Failed to fetch engagement metrics',
[7m   [0m [91m      ~~~~~~~[0m
[96msrc/pages/api/analytics/engagement.ts[0m:[93m17[0m:[93m27[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ request: any; cookies: any; }' is not assignable to parameter of type '{ request: Request; cookies: AstroCookies; redirect: (path: string) => Response; locals?: Record<string, unknown> | undefined; }'.
  Property 'redirect' is missing in type '{ request: any; cookies: any; }' but required in type '{ request: Request; cookies: AstroCookies; redirect: (path: string) => Response; locals?: Record<string, unknown> | undefined; }'.

[7m17[0m     await requirePageAuth({ request, cookies })
[7m  [0m [91m                          ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/engagement.ts[0m:[93m14[0m:[93m48[0m - [91merror[0m[90m ts(7031): [0mBinding element 'cookies' implicitly has an 'any' type.

[7m14[0m export const GET: APIRoute = async ({ request, cookies }) => {
[7m  [0m [91m                                               ~~~~~~~[0m
[96msrc/pages/api/analytics/engagement.ts[0m:[93m14[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m14[0m export const GET: APIRoute = async ({ request, cookies }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/analytics/engagement.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/analytics/treatment-forecast.ts[0m:[93m58[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'objectOutputType<{}, ZodTypeAny, "passthrough"> | undefined' is not assignable to type 'MentalHealthAnalysis | undefined'.
  Type 'objectOutputType<{}, ZodTypeAny, "passthrough">' is not assignable to type 'MentalHealthAnalysis | undefined'.

[7m58[0m       mentalHealthAnalysis,
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/treatment-forecast.ts[0m:[93m55[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'objectOutputType<{}, ZodTypeAny, "passthrough"> | null' is not assignable to type 'EmotionState'.
  Type 'null' is not assignable to type 'EmotionState'.

[7m55[0m       recentEmotionState,
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/treatment-forecast.ts[0m:[93m54[0m:[93m7[0m - [91merror[0m[90m ts(2741): [0mProperty 'messages' is missing in type '{} & { [k: string]: unknown; }' but required in type 'ChatSession'.

[7m54[0m       chatSession,
[7m  [0m [91m      ~~~~~~~~~~~[0m
[96msrc/pages/api/analytics/treatment-forecast.ts[0m:[93m53[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType '{ status: string; sessionId: string; startTime: string; emotionAnalysisEnabled: boolean; clientId: string; therapistId: string; securityLevel: string; endTime?: string | undefined; }' is not assignable to type 'TherapySession'.
  Types of property 'status' are incompatible.

[7m53[0m       session,
[7m  [0m [91m      ~~~~~~~[0m

[96msrc/pages/api/analytics/types.ts[0m:[93m1[0m:[93m31[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@/lib/types/api' or its corresponding type declarations.

[7m1[0m import type { APIError } from '@/lib/types/api'
[7m [0m [91m                              ~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/api/auth/callback.ts[0m:[93m31[0m:[93m47[0m - [91merror[0m[90m ts(2551): [0mProperty 'verifyOAuthCode' does not exist on type 'MongoAuthService'. Did you mean 'verifyAuthToken'?

[7m31[0m     const { user, token } = await authService.verifyOAuthCode(authCode)
[7m  [0m [91m                                              ~~~~~~~~~~~~~~~[0m

[96msrc/pages/api/auth/login.ts[0m:[93m58[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string' is not assignable to type '"tc128" | "tc192" | "tc256"'.

[7m58[0m         securityLevel: sessionData.securityLevel,
[7m  [0m [91m        ~~~~~~~~~~~~~[0m

[96msrc/pages/api/auth/signin.ts[0m:[93m22[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'token' does not exist on type 'AuthResult'.

[7m22[0m     const { user, token } = await mongoAuthService.signIn(email, password)
[7m  [0m [91m                  ~~~~~[0m
[96msrc/pages/api/auth/signin.ts[0m:[93m8[0m:[93m30[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m8[0m export const POST = async ({ request }) => {
[7m [0m [91m                             ~~~~~~~[0m

[96msrc/pages/api/auth/signout.ts[0m:[93m8[0m:[93m30[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m8[0m export const POST = async ({ request }) => {
[7m [0m [91m                             ~~~~~~~[0m

[96msrc/pages/api/auth/signup.ts[0m:[93m8[0m:[93m30[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m8[0m export const POST = async ({ request }) => {
[7m [0m [91m                             ~~~~~~~[0m

[96msrc/pages/api/auth/update-password.ts[0m:[93m32[0m:[93m11[0m - [91merror[0m[90m ts(2554): [0mExpected 3 arguments, but got 1.

[7m32[0m     await updatePassword(password)
[7m  [0m [91m          ~~~~~~~~~~~~~~[0m

[96msrc/pages/api/auth/verify.ts[0m:[93m61[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'id' does not exist on type 'never'.

[7m61[0m         resourceId: result.data.user.id,
[7m  [0m [91m                                     ~~[0m
[96msrc/pages/api/auth/verify.ts[0m:[93m59[0m:[93m32[0m - [91merror[0m[90m ts(2339): [0mProperty 'AUTH_VERIFY' does not exist on type 'typeof AuditEventType'.

[7m59[0m         action: AuditEventType.AUTH_VERIFY,
[7m  [0m [91m                               ~~~~~~~~~~~[0m
[96msrc/pages/api/auth/verify.ts[0m:[93m58[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'id' does not exist on type 'never'.

[7m58[0m         userId: result.data.user.id,
[7m  [0m [91m                                 ~~[0m
[96msrc/pages/api/auth/verify.ts[0m:[93m57[0m:[93m13[0m - [91merror[0m[90m ts(2554): [0mExpected 4-6 arguments, but got 1.

[7m57[0m       await createAuditLog({
[7m  [0m [91m            ~~~~~~~~~~~~~~[0m

[96msrc/pages/api/bias-detection/analyze.ts[0m:[93m46[0m:[93m13[0m - [91merror[0m[90m ts(2339): [0mProperty 'session' does not exist on type '{}'.

[7m46[0m     const { session } = body ?? {}
[7m  [0m [91m            ~~~~~~~[0m
[96msrc/pages/api/bias-detection/analyze.ts[0m:[93m8[0m:[93m16[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string | null'.
  Type 'undefined' is not assignable to type 'string | null'.

[7m8[0m     return m ? m[1] : null
[7m [0m [91m               ~~~~[0m

[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m535[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m535[0m       expect(mockBiasEngine.getDashboardData).toHaveBeenCalledWith({
[7m   [0m [91m                            ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m531[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m531[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m507[0m:[93m25[0m - [91merror[0m[90m ts(2339): [0mProperty 'info' does not exist on type 'Mock<Procedure>'.

[7m507[0m       expect(mockLogger.info).toHaveBeenCalledWith(
[7m   [0m [91m                        ~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m499[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m499[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m487[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m487[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m468[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m468[0m       mockBiasEngine.getDashboardData.mockImplementation(
[7m   [0m [91m                     ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m464[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m464[0m       expect(mockBiasEngine.getDashboardData).toHaveBeenCalledTimes(5)
[7m   [0m [91m                            ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m457[0m:[93m39[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m457[0m         requests.map((request) => GET({ request } as { request: Request })),
[7m   [0m [91m                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m445[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m445[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m437[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m437[0m       expect(mockBiasEngine.getDashboardData).toHaveBeenCalledWith({
[7m   [0m [91m                            ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m433[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m433[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m424[0m:[93m31[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m424[0m         expect(mockBiasEngine.getDashboardData).toHaveBeenCalledWith({
[7m   [0m [91m                              ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m421[0m:[93m36[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m421[0m         const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m405[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m405[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m402[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m402[0m       mockBiasEngine.getDashboardData.mockResolvedValue(emptyDashboardData)
[7m   [0m [91m                     ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m384[0m:[93m11[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'totalAlerts' does not exist in type 'BiasSummaryStats'.

[7m384[0m           totalAlerts: 0,
[7m   [0m [91m          ~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m370[0m:[93m25[0m - [91merror[0m[90m ts(2339): [0mProperty 'error' does not exist on type 'Mock<Procedure>'.

[7m370[0m       expect(mockLogger.error).toHaveBeenCalledWith(
[7m   [0m [91m                        ~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m361[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m361[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m347[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m347[0m       mockBiasEngine.getDashboardData.mockRejectedValue(error)
[7m   [0m [91m                     ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m339[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m339[0m       expect(mockBiasEngine.getDashboardData).toHaveBeenCalledWith({
[7m   [0m [91m                            ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m332[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m332[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m321[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m321[0m       expect(mockBiasEngine.getDashboardData).toHaveBeenCalledWith({
[7m   [0m [91m                            ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m314[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m314[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m306[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m306[0m       expect(mockBiasEngine.getDashboardData).toHaveBeenCalledWith({
[7m   [0m [91m                            ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m299[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m299[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m288[0m:[93m25[0m - [91merror[0m[90m ts(2339): [0mProperty 'info' does not exist on type 'Mock<Procedure>'.

[7m288[0m       expect(mockLogger.info).toHaveBeenCalledWith(
[7m   [0m [91m                        ~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m283[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'getDashboardData' does not exist on type 'Mock<Procedure>'.

[7m283[0m       expect(mockBiasEngine.getDashboardData).toHaveBeenCalledWith({
[7m   [0m [91m                            ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m274[0m:[93m34[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ request: { url: string; headers: { get: Mock<(key: string) => string | null>; }; }; }' to type '{ request: Request; }' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Types of property 'request' are incompatible.

[7m274[0m       const response = await GET({ request } as { request: Request })
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m264[0m:[93m55[0m - [91merror[0m[90m ts(2345): [0mArgument of type '() => Mock<Procedure>' is not assignable to parameter of type 'NormalizedProcedure<(cfg?: BiasDetectionConfig | undefined) => BiasDetectionEngine>'.
  Type 'Mock<Procedure>' is missing the following properties from type 'BiasDetectionEngine': config, pythonService, metricsCollector, alertSystem, and 22 more.

[7m264[0m     vi.mocked(BiasDetectionEngine).mockImplementation(() => mockBiasEngine)
[7m   [0m [91m                                                      ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m262[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'getDashboardData' does not exist in type 'Mock<Procedure>'.

[7m262[0m       getDashboardData: vi.fn().mockResolvedValue(mockDashboardData),
[7m   [0m [91m      ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m235[0m:[93m15[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'getLogger'.

[7m235[0m     vi.mocked(getLogger).mockReturnValue(mockLogger)
[7m   [0m [91m              ~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m230[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'info' does not exist in type 'Mock<Procedure>'.

[7m230[0m       info: vi.fn(),
[7m   [0m [91m      ~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.test.ts[0m:[93m25[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'totalAlerts' does not exist in type 'BiasSummaryStats'.

[7m25[0m       totalAlerts: 12,
[7m  [0m [91m      ~~~~~~~~~~~[0m

[96msrc/pages/api/bias-detection/dashboard.ts[0m:[93m28[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m28[0m     if (!authResult.user?.isAdmin) {
[7m  [0m [91m                    ~~~~[0m
[96msrc/pages/api/bias-detection/dashboard.ts[0m:[93m12[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m12[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m

[96msrc/pages/api/bias-detection/export.test.new.ts[0m:[93m218[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'getLogger'.

[7m218[0m     ;(getLogger as ReturnType<typeof vi.fn>).mockReturnValue(mockLogger)
[7m   [0m [91m      ~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/export.test.new.ts[0m:[93m39[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'totalAlerts' does not exist in type 'BiasSummaryStats'.

[7m39[0m       totalAlerts: 12,
[7m  [0m [91m      ~~~~~~~~~~~[0m

[96msrc/pages/api/bias-detection/export.test.ts[0m:[93m218[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'getLogger'.

[7m218[0m     ;(getLogger as ReturnType<typeof vi.fn>).mockReturnValue(mockLogger)
[7m   [0m [91m      ~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/export.test.ts[0m:[93m39[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'totalAlerts' does not exist in type 'BiasSummaryStats'.

[7m39[0m       totalAlerts: 12,
[7m  [0m [91m      ~~~~~~~~~~~[0m

[96msrc/pages/api/bias-detection/export.ts[0m:[93m316[0m:[93m47[0m - [91merror[0m[90m ts(4111): [0mProperty 'trendsDirection' comes from an index signature, so it must be accessed with ['trendsDirection'].

[7m316[0m         <p><strong>Trend:</strong> ${summary?.trendsDirection || 'N/A'}</p>
[7m   [0m [91m                                              ~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/export.ts[0m:[93m315[0m:[93m55[0m - [91merror[0m[90m ts(4111): [0mProperty 'alertsCount' comes from an index signature, so it must be accessed with ['alertsCount'].

[7m315[0m         <p><strong>Active Alerts:</strong> ${summary?.alertsCount || 'N/A'}</p>
[7m   [0m [91m                                                      ~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/export.ts[0m:[93m314[0m:[93m60[0m - [91merror[0m[90m ts(4111): [0mProperty 'averageBiasScore' comes from an index signature, so it must be accessed with ['averageBiasScore'].

[7m314[0m         <p><strong>Average Bias Score:</strong> ${summary?.averageBiasScore || 'N/A'}</p>
[7m   [0m [91m                                                           ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/export.ts[0m:[93m313[0m:[93m56[0m - [91merror[0m[90m ts(4111): [0mProperty 'totalSessions' comes from an index signature, so it must be accessed with ['totalSessions'].

[7m313[0m         <p><strong>Total Sessions:</strong> ${summary?.totalSessions || 'N/A'}</p>
[7m   [0m [91m                                                       ~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/export.ts[0m:[93m39[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m39[0m export const GET: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/bias-detection/export.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/bias-detection/test-notification.ts[0m:[93m73[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m73[0m         email: authResult.user?.email,
[7m  [0m [91m                          ~~~~[0m
[96msrc/pages/api/bias-detection/test-notification.ts[0m:[93m72[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m72[0m         userId: authResult.user?.id,
[7m  [0m [91m                           ~~~~[0m
[96msrc/pages/api/bias-detection/test-notification.ts[0m:[93m68[0m:[93m46[0m - [91merror[0m[90m ts(2339): [0mProperty 'sendTestNotification' does not exist on type 'BiasDetectionEngine'.

[7m68[0m     const result = await biasDetectionEngine.sendTestNotification(
[7m  [0m [91m                                             ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/bias-detection/test-notification.ts[0m:[93m28[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m28[0m     if (!authResult.user?.isAdmin) {
[7m  [0m [91m                    ~~~~[0m
[96msrc/pages/api/bias-detection/test-notification.ts[0m:[93m12[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m12[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m

[96msrc/pages/api/browser-compatibility/data.ts[0m:[93m142[0m:[93m38[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m142[0m         latest: reports.length > 0 ? reports[0].timestamp : null,
[7m   [0m [91m                                     ~~~~~~~~~~[0m
[96msrc/pages/api/browser-compatibility/data.ts[0m:[93m80[0m:[93m48[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m80[0m       const reportPath = path.join(reportsDir, file)
[7m  [0m [91m                                               ~~~~[0m
[96msrc/pages/api/browser-compatibility/data.ts[0m:[93m17[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m17[0m export const GET: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/browser-compatibility/data.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/crisis/session-flags.ts[0m:[93m226[0m:[93m39[0m - [91merror[0m[90m ts(2339): [0mProperty 'user_metadata' does not exist on type 'User'.

[7m226[0m     const userRole = sessionData.user.user_metadata?.['role']
[7m   [0m [91m                                      ~~~~~~~~~~~~~[0m
[96msrc/pages/api/crisis/session-flags.ts[0m:[93m118[0m:[93m39[0m - [91merror[0m[90m ts(2339): [0mProperty 'user_metadata' does not exist on type 'User'.

[7m118[0m     const userRole = sessionData.user.user_metadata?.['role']
[7m   [0m [91m                                      ~~~~~~~~~~~~~[0m
[96msrc/pages/api/crisis/session-flags.ts[0m:[93m49[0m:[93m41[0m - [91merror[0m[90m ts(2339): [0mProperty 'user_metadata' does not exist on type 'User'.

[7m49[0m       const userRole = sessionData.user.user_metadata?.['role']
[7m  [0m [91m                                        ~~~~~~~~~~~~~[0m
[96msrc/pages/api/crisis/session-flags.ts[0m:[93m28[0m:[93m41[0m - [91merror[0m[90m ts(2339): [0mProperty 'user_metadata' does not exist on type 'User'.

[7m28[0m       const userRole = sessionData.user.user_metadata?.['role']
[7m  [0m [91m                                        ~~~~~~~~~~~~~[0m

[96msrc/pages/api/demos/bias-detection/analyze.ts[0m:[93m17[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m17[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/analyze.ts[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m3[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m275[0m:[93m89[0m - [91merror[0m[90m ts(4111): [0mProperty 'metadata' comes from an index signature, so it must be accessed with ['metadata'].

[7m275[0m   content += `Report generated by Pixelated Empathy Bias Detection System v${exportData.metadata.version}\n`
[7m   [0m [91m                                                                                        ~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m275[0m:[93m78[0m - [91merror[0m[90m ts(18046): [0m'exportData.metadata' is of type 'unknown'.

[7m275[0m   content += `Report generated by Pixelated Empathy Bias Detection System v${exportData.metadata.version}\n`
[7m   [0m [91m                                                                             ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m272[0m:[93m43[0m - [91merror[0m[90m ts(2339): [0mProperty 'sevenDayTrend' does not exist on type '{}'.

[7m272[0m     content += `7-Day Trend: ${historical.sevenDayTrend}\n\n`
[7m   [0m [91m                                          ~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m271[0m:[93m47[0m - [91merror[0m[90m ts(2339): [0mProperty 'percentileRank' does not exist on type '{}'.

[7m271[0m     content += `Percentile Rank: ${historical.percentileRank}th\n`
[7m   [0m [91m                                              ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m270[0m:[93m47[0m - [91merror[0m[90m ts(2339): [0mProperty 'thirtyDayAverage' does not exist on type '{}'.

[7m270[0m     content += `30-Day Average: ${(historical.thirtyDayAverage * 100).toFixed(1)}%\n`
[7m   [0m [91m                                              ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m268[0m:[93m35[0m - [91merror[0m[90m ts(4111): [0mProperty 'historicalComparison' comes from an index signature, so it must be accessed with ['historicalComparison'].

[7m268[0m     const historical = exportData.historicalComparison
[7m   [0m [91m                                  ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m267[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'historicalComparison' comes from an index signature, so it must be accessed with ['historicalComparison'].

[7m267[0m   if (exportData.historicalComparison) {
[7m   [0m [91m                 ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m263[0m:[93m46[0m - [91merror[0m[90m ts(4111): [0mProperty 'description' comes from an index signature, so it must be accessed with ['description'].

[7m263[0m       content += `   Description: ${scenario.description}\n\n`
[7m   [0m [91m                                             ~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m262[0m:[93m45[0m - [91merror[0m[90m ts(4111): [0mProperty 'likelihood' comes from an index signature, so it must be accessed with ['likelihood'].

[7m262[0m       content += `   Likelihood: ${scenario.likelihood}\n`
[7m   [0m [91m                                            ~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m261[0m:[93m54[0m - [91merror[0m[90m ts(4111): [0mProperty 'expectedBiasReduction' comes from an index signature, so it must be accessed with ['expectedBiasReduction'].

[7m261[0m       content += `   Expected Reduction: ${(scenario.expectedBiasReduction * 100).toFixed(1)}%\n`
[7m   [0m [91m                                                     ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m261[0m:[93m45[0m - [91merror[0m[90m ts(18046): [0m'scenario.expectedBiasReduction' is of type 'unknown'.

[7m261[0m       content += `   Expected Reduction: ${(scenario.expectedBiasReduction * 100).toFixed(1)}%\n`
[7m   [0m [91m                                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m260[0m:[93m44[0m - [91merror[0m[90m ts(4111): [0mProperty 'change' comes from an index signature, so it must be accessed with ['change'].

[7m260[0m       content += `${index + 1}. ${scenario.change}\n`
[7m   [0m [91m                                           ~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m256[0m:[93m34[0m - [91merror[0m[90m ts(4111): [0mProperty 'counterfactualScenarios' comes from an index signature, so it must be accessed with ['counterfactualScenarios'].

[7m256[0m     const scenarios = exportData.counterfactualScenarios as Array<
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m253[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'counterfactualScenarios' comes from an index signature, so it must be accessed with ['counterfactualScenarios'].

[7m253[0m     Array.isArray(exportData.counterfactualScenarios)
[7m   [0m [91m                             ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m252[0m:[93m16[0m - [91merror[0m[90m ts(4111): [0mProperty 'counterfactualScenarios' comes from an index signature, so it must be accessed with ['counterfactualScenarios'].

[7m252[0m     exportData.counterfactualScenarios &&
[7m   [0m [91m               ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m244[0m:[93m16[0m - [91merror[0m[90m ts(2339): [0mProperty 'recommendations' does not exist on type '{}'.

[7m244[0m       analysis.recommendations.forEach((rec: string, index: number) => {
[7m   [0m [91m               ~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m242[0m:[93m46[0m - [91merror[0m[90m ts(2339): [0mProperty 'recommendations' does not exist on type '{}'.

[7m242[0m     if (analysis.recommendations && analysis.recommendations.length > 0) {
[7m   [0m [91m                                             ~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m242[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'recommendations' does not exist on type '{}'.

[7m242[0m     if (analysis.recommendations && analysis.recommendations.length > 0) {
[7m   [0m [91m                 ~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m236[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'layerResults' does not exist on type '{}'.

[7m236[0m     const layers = analysis.layerResults
[7m   [0m [91m                            ~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m233[0m:[93m41[0m - [91merror[0m[90m ts(2339): [0mProperty 'confidence' does not exist on type '{}'.

[7m233[0m     content += `Confidence: ${(analysis.confidence * 100).toFixed(1)}%\n\n`
[7m   [0m [91m                                        ~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m232[0m:[93m41[0m - [91merror[0m[90m ts(2339): [0mProperty 'alertLevel' does not exist on type '{}'.

[7m232[0m     content += `Alert Level: ${analysis.alertLevel.toUpperCase()}\n`
[7m   [0m [91m                                        ~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m231[0m:[93m49[0m - [91merror[0m[90m ts(2339): [0mProperty 'overallBiasScore' does not exist on type '{}'.

[7m231[0m     content += `Overall Bias Score: ${(analysis.overallBiasScore * 100).toFixed(1)}%\n`
[7m   [0m [91m                                                ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m230[0m:[93m40[0m - [91merror[0m[90m ts(2339): [0mProperty 'sessionId' does not exist on type '{}'.

[7m230[0m     content += `Session ID: ${analysis.sessionId}\n`
[7m   [0m [91m                                       ~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m227[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'analysis' comes from an index signature, so it must be accessed with ['analysis'].

[7m227[0m   if (exportData.analysis) {
[7m   [0m [91m                 ~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m215[0m:[93m55[0m - [91merror[0m[90m ts(2339): [0mProperty 'sevenDayTrend' does not exist on type '{}'.

[7m215[0m     csvRows.push(`Historical,7-Day Trend,${historical.sevenDayTrend},`)
[7m   [0m [91m                                                      ~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m214[0m:[93m59[0m - [91merror[0m[90m ts(2339): [0mProperty 'percentileRank' does not exist on type '{}'.

[7m214[0m     csvRows.push(`Historical,Percentile Rank,${historical.percentileRank},`)
[7m   [0m [91m                                                          ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m213[0m:[93m58[0m - [91merror[0m[90m ts(2339): [0mProperty 'thirtyDayAverage' does not exist on type '{}'.

[7m213[0m     csvRows.push(`Historical,30-Day Average,${historical.thirtyDayAverage},`)
[7m   [0m [91m                                                         ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m212[0m:[93m35[0m - [91merror[0m[90m ts(4111): [0mProperty 'historicalComparison' comes from an index signature, so it must be accessed with ['historicalComparison'].

[7m212[0m     const historical = exportData.historicalComparison
[7m   [0m [91m                                  ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m211[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'historicalComparison' comes from an index signature, so it must be accessed with ['historicalComparison'].

[7m211[0m   if (exportData.historicalComparison) {
[7m   [0m [91m                 ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m205[0m:[93m83[0m - [91merror[0m[90m ts(4111): [0mProperty 'description' comes from an index signature, so it must be accessed with ['description'].

[7m205[0m         `Counterfactual,Likelihood ${index + 1},${scenario.likelihood},${scenario.description}`,
[7m   [0m [91m                                                                                  ~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m205[0m:[93m60[0m - [91merror[0m[90m ts(4111): [0mProperty 'likelihood' comes from an index signature, so it must be accessed with ['likelihood'].

[7m205[0m         `Counterfactual,Likelihood ${index + 1},${scenario.likelihood},${scenario.description}`,
[7m   [0m [91m                                                           ~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m202[0m:[93m92[0m - [91merror[0m[90m ts(4111): [0mProperty 'change' comes from an index signature, so it must be accessed with ['change'].

[7m202[0m         `Counterfactual,Scenario ${index + 1},${scenario.expectedBiasReduction},${scenario.change}`,
[7m   [0m [91m                                                                                           ~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m202[0m:[93m58[0m - [91merror[0m[90m ts(4111): [0mProperty 'expectedBiasReduction' comes from an index signature, so it must be accessed with ['expectedBiasReduction'].

[7m202[0m         `Counterfactual,Scenario ${index + 1},${scenario.expectedBiasReduction},${scenario.change}`,
[7m   [0m [91m                                                         ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m197[0m:[93m34[0m - [91merror[0m[90m ts(4111): [0mProperty 'counterfactualScenarios' comes from an index signature, so it must be accessed with ['counterfactualScenarios'].

[7m197[0m     const scenarios = exportData.counterfactualScenarios as Array<
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m196[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'counterfactualScenarios' comes from an index signature, so it must be accessed with ['counterfactualScenarios'].

[7m196[0m   if (exportData.counterfactualScenarios) {
[7m   [0m [91m                 ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m160[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'layerResults' does not exist on type '{}'.

[7m160[0m     const layers = analysis.layerResults
[7m   [0m [91m                            ~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m157[0m:[93m50[0m - [91merror[0m[90m ts(2339): [0mProperty 'sessionId' does not exist on type '{}'.

[7m157[0m     csvRows.push(`Analysis,Session ID,${analysis.sessionId},`)
[7m   [0m [91m                                                 ~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m156[0m:[93m50[0m - [91merror[0m[90m ts(2339): [0mProperty 'confidence' does not exist on type '{}'.

[7m156[0m     csvRows.push(`Analysis,Confidence,${analysis.confidence},`)
[7m   [0m [91m                                                 ~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m154[0m:[93m76[0m - [91merror[0m[90m ts(2339): [0mProperty 'alertLevel' does not exist on type '{}'.

[7m154[0m       `Analysis,Overall Bias Score,${analysis.overallBiasScore},${analysis.alertLevel}`,
[7m   [0m [91m                                                                           ~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m154[0m:[93m47[0m - [91merror[0m[90m ts(2339): [0mProperty 'overallBiasScore' does not exist on type '{}'.

[7m154[0m       `Analysis,Overall Bias Score,${analysis.overallBiasScore},${analysis.alertLevel}`,
[7m   [0m [91m                                              ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m151[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'analysis' comes from an index signature, so it must be accessed with ['analysis'].

[7m151[0m   if (exportData.analysis) {
[7m   [0m [91m                 ~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m61[0m:[93m7[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'HistoricalComparison | null' is not assignable to parameter of type 'HistoricalComparison'.
  Type 'null' is not assignable to type 'HistoricalComparison'.

[7m61[0m       historicalComparison as HistoricalComparison | null,
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m11[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m11[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/export.ts[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m3[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/demos/bias-detection/presets.ts[0m:[93m11[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'url' implicitly has an 'any' type.

[7m11[0m export const GET: APIRoute = async ({ url }) => {
[7m  [0m [91m                                      ~~~[0m
[96msrc/pages/api/demos/bias-detection/presets.ts[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m3[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/demos/bias-detection/websocket.ts[0m:[93m137[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m137[0m export const POST: APIRoute = async ({ request }) => {
[7m   [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/websocket.ts[0m:[93m5[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m5[0m export const GET: APIRoute = async ({ request }) => {
[7m [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/websocket.ts[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m3[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m
[96msrc/pages/api/demos/bias-detection/websocket.ts[0m:[93m150[0m:[93m76[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m150[0m               connectionId: `ws_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
[7m   [0m [93m                                                                           ~~~~~~[0m

[96msrc/pages/api/emotions/dimensional.ts[0m:[93m18[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m18[0m export const GET: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/emotions/dimensional.ts[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m ts(2724): [0m'"../../../lib/ai/emotions/dimensionalTypes"' has no exported member named 'DimensionalEmotionMap'. Did you mean 'DimensionalEmotion'?

[7m5[0m import type { DimensionalEmotionMap } from '../../../lib/ai/emotions/dimensionalTypes'
[7m [0m [91m              ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/emotions/dimensional.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/emotions/real-time-analysis.ts[0m:[93m3[0m:[93m25[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m3[0m import type { APIRoute, APIContext } from 'astro'
[7m [0m [91m                        ~~~~~~~~~~[0m
[96msrc/pages/api/emotions/real-time-analysis.ts[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m3[0m import type { APIRoute, APIContext } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/examples/profiling-demo.ts[0m:[93m45[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m45[0m     const isProd = process.env.NODE_ENV === 'production'
[7m  [0m [91m                               ~~~~~~~~[0m
[96msrc/pages/api/examples/profiling-demo.ts[0m:[93m20[0m:[93m37[0m - [91merror[0m[90m ts(7006): [0mParameter '_' implicitly has an 'any' type.

[7m20[0m export const GET: APIRoute = async (_) => {
[7m  [0m [91m                                    ~[0m
[96msrc/pages/api/examples/profiling-demo.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/export/conversation.ts[0m:[93m239[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'JSON' does not exist on type 'typeof ExportFormat | typeof ExportFormat'.
  Property 'JSON' does not exist on type 'typeof ExportFormat'.

[7m239[0m       return ExportFormat.JSON
[7m   [0m [91m                          ~~~~[0m
[96msrc/pages/api/export/conversation.ts[0m:[93m236[0m:[93m27[0m - [91merror[0m[90m ts(2339): [0mProperty 'ENCRYPTED_ARCHIVE' does not exist on type 'typeof ExportFormat | typeof ExportFormat'.
  Property 'ENCRYPTED_ARCHIVE' does not exist on type 'typeof ExportFormat'.

[7m236[0m       return ExportFormat.ENCRYPTED_ARCHIVE
[7m   [0m [91m                          ~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/export/conversation.ts[0m:[93m230[0m:[93m43[0m - [91merror[0m[90m ts(2749): [0m'ExportFormat' refers to a value, but is being used as a type here. Did you mean 'typeof ExportFormat'?

[7m230[0m function mapExportFormat(format: string): ExportFormat {
[7m   [0m [91m                                          ~~~~~~~~~~~~[0m
[96msrc/pages/api/export/conversation.ts[0m:[93m219[0m:[93m11[0m - [91merror[0m[90m ts(2749): [0m'ExportFormat' refers to a value, but is being used as a type here. Did you mean 'typeof ExportFormat'?

[7m219[0m   format: ExportFormat,
[7m   [0m [91m          ~~~~~~~~~~~~[0m
[96msrc/pages/api/export/conversation.ts[0m:[93m115[0m:[93m53[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'RealFHEService' is not assignable to parameter of type 'FHEServiceInterface'.
  Property 'encryptData' is missing in type 'RealFHEService' but required in type 'FHEServiceInterface'.

[7m115[0m     const exportService = ExportService.getInstance(fheService)
[7m   [0m [91m                                                    ~~~~~~~~~~[0m
[96msrc/pages/api/export/conversation.ts[0m:[93m71[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m71[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/export/conversation.ts[0m:[93m15[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m15[0m export const GET: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/export/conversation.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/export/download/[id].ts[0m:[93m27[0m:[93m47[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m27[0m export const GET: APIRoute = async ({ params, request }) => {
[7m  [0m [91m                                              ~~~~~~~[0m
[96msrc/pages/api/export/download/[id].ts[0m:[93m27[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'params' implicitly has an 'any' type.

[7m27[0m export const GET: APIRoute = async ({ params, request }) => {
[7m  [0m [91m                                      ~~~~~~[0m
[96msrc/pages/api/export/download/[id].ts[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m3[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/fhe/process.ts[0m:[93m72[0m:[93m37[0m - [91merror[0m[90m ts(2339): [0mProperty 'processEncrypted' does not exist on type 'RealFHEService'.

[7m72[0m     const result = await fheService.processEncrypted(
[7m  [0m [91m                                    ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/fhe/process.ts[0m:[93m66[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType '"high"' is not assignable to type '"tc128" | "tc192" | "tc256"'.

[7m66[0m         securityLevel: 'high',
[7m  [0m [91m        ~~~~~~~~~~~~~[0m
[96msrc/pages/api/fhe/process.ts[0m:[93m63[0m:[93m21[0m - [91merror[0m[90m ts(2349): [0mThis expression is not callable.
  Type 'Boolean' has no call signatures.

[7m63[0m     if (!fheService.isInitialized()) {
[7m  [0m [91m                    ~~~~~~~~~~~~~[0m
[96msrc/pages/api/fhe/process.ts[0m:[93m63[0m:[93m21[0m - [91merror[0m[90m ts(2341): [0mProperty 'isInitialized' is private and only accessible within class 'RealFHEService'.

[7m63[0m     if (!fheService.isInitialized()) {
[7m  [0m [91m                    ~~~~~~~~~~~~~[0m
[96msrc/pages/api/fhe/process.ts[0m:[93m8[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m8[0m export const POST: APIRoute = async ({ request }) => {
[7m [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/fhe/process.ts[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m2[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m
[96msrc/pages/api/fhe/process.ts[0m:[93m17[0m:[93m29[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m17[0m     const rateLimitResult = await rateLimit.check(clientIp, 'anonymous')
[7m  [0m [93m                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/api/fhe/rotate-keys.ts[0m:[93m64[0m:[93m37[0m - [91merror[0m[90m ts(2339): [0mProperty 'rotateKeys' does not exist on type 'RealFHEService'.

[7m64[0m     const result = await fheService.rotateKeys()
[7m  [0m [91m                                    ~~~~~~~~~~[0m
[96msrc/pages/api/fhe/rotate-keys.ts[0m:[93m58[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType '"high"' is not assignable to type '"tc128" | "tc192" | "tc256"'.

[7m58[0m         securityLevel: 'high',
[7m  [0m [91m        ~~~~~~~~~~~~~[0m
[96msrc/pages/api/fhe/rotate-keys.ts[0m:[93m55[0m:[93m21[0m - [91merror[0m[90m ts(2349): [0mThis expression is not callable.
  Type 'Boolean' has no call signatures.

[7m55[0m     if (!fheService.isInitialized()) {
[7m  [0m [91m                    ~~~~~~~~~~~~~[0m
[96msrc/pages/api/fhe/rotate-keys.ts[0m:[93m55[0m:[93m21[0m - [91merror[0m[90m ts(2341): [0mProperty 'isInitialized' is private and only accessible within class 'RealFHEService'.

[7m55[0m     if (!fheService.isInitialized()) {
[7m  [0m [91m                    ~~~~~~~~~~~~~[0m
[96msrc/pages/api/fhe/rotate-keys.ts[0m:[93m8[0m:[93m49[0m - [91merror[0m[90m ts(7031): [0mBinding element 'cookies' implicitly has an 'any' type.

[7m8[0m export const POST: APIRoute = async ({ request, cookies }) => {
[7m [0m [91m                                                ~~~~~~~[0m
[96msrc/pages/api/fhe/rotate-keys.ts[0m:[93m8[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m8[0m export const POST: APIRoute = async ({ request, cookies }) => {
[7m [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/fhe/rotate-keys.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m
[96msrc/pages/api/fhe/rotate-keys.ts[0m:[93m17[0m:[93m29[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m17[0m     const rateLimitResult = await rateLimit.check(
[7m  [0m [93m                            ~~~~~~~~~~~~~~~~~~~~~~[0m
[7m18[0m       request.headers.get('x-forwarded-for') || 'anonymous',
[7m  [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m19[0m       'key-rotation',
[7m  [0m [93m~~~~~~~~~~~~~~~~~~~~~[0m
[7m20[0m     )
[7m  [0m [93m~~~~~[0m

[96msrc/pages/api/memory/create.ts[0m:[93m50[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m50[0m         userId: authResult.user?.id,
[7m  [0m [91m                           ~~~~[0m
[96msrc/pages/api/memory/create.ts[0m:[93m47[0m:[93m40[0m - [91merror[0m[90m ts(2339): [0mProperty 'createMemory' does not exist on type 'MemoryService'.

[7m47[0m     const result = await memoryService.createMemory(
[7m  [0m [91m                                       ~~~~~~~~~~~~[0m
[96msrc/pages/api/memory/create.ts[0m:[93m12[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m12[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m

[96msrc/pages/api/memory/delete.ts[0m:[93m47[0m:[93m59[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m47[0m     await memoryService.deleteMemory(memoryId, authResult.user?.id)
[7m  [0m [91m                                                          ~~~~[0m
[96msrc/pages/api/memory/delete.ts[0m:[93m47[0m:[93m25[0m - [91merror[0m[90m ts(2339): [0mProperty 'deleteMemory' does not exist on type 'MemoryService'.

[7m47[0m     await memoryService.deleteMemory(memoryId, authResult.user?.id)
[7m  [0m [91m                        ~~~~~~~~~~~~[0m
[96msrc/pages/api/memory/delete.ts[0m:[93m12[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m12[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m

[96msrc/pages/api/memory/search.ts[0m:[93m51[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m51[0m       authResult.user?.id,
[7m  [0m [91m                 ~~~~[0m
[96msrc/pages/api/memory/search.ts[0m:[93m49[0m:[93m40[0m - [91merror[0m[90m ts(2339): [0mProperty 'searchMemories' does not exist on type 'MemoryService'.

[7m49[0m     const result = await memoryService.searchMemories(
[7m  [0m [91m                                       ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/memory/search.ts[0m:[93m12[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m12[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m

[96msrc/pages/api/memory/update.ts[0m:[93m51[0m:[93m28[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m51[0m         userId: authResult.user?.id,
[7m  [0m [91m                           ~~~~[0m
[96msrc/pages/api/memory/update.ts[0m:[93m47[0m:[93m40[0m - [91merror[0m[90m ts(2339): [0mProperty 'updateMemory' does not exist on type 'MemoryService'.

[7m47[0m     const result = await memoryService.updateMemory(
[7m  [0m [91m                                       ~~~~~~~~~~~~[0m
[96msrc/pages/api/memory/update.ts[0m:[93m12[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m12[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m

[96msrc/pages/api/notifications/preferences.ts[0m:[93m94[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m94[0m       authResult.user?.id,
[7m  [0m [91m                 ~~~~[0m
[96msrc/pages/api/notifications/preferences.ts[0m:[93m93[0m:[93m46[0m - [91merror[0m[90m ts(2339): [0mProperty 'updatePreferences' does not exist on type 'NotificationService'.

[7m93[0m     const result = await notificationService.updatePreferences(
[7m  [0m [91m                                             ~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/notifications/preferences.ts[0m:[93m58[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m58[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m
[96msrc/pages/api/notifications/preferences.ts[0m:[93m28[0m:[93m77[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m28[0m     const preferences = await notificationService.getPreferences(authResult.user?.id)
[7m  [0m [91m                                                                            ~~~~[0m
[96msrc/pages/api/notifications/preferences.ts[0m:[93m28[0m:[93m51[0m - [91merror[0m[90m ts(2339): [0mProperty 'getPreferences' does not exist on type 'NotificationService'.

[7m28[0m     const preferences = await notificationService.getPreferences(authResult.user?.id)
[7m  [0m [91m                                                  ~~~~~~~~~~~~~~[0m
[96msrc/pages/api/notifications/preferences.ts[0m:[93m12[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m12[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m

[96msrc/pages/api/notifications/register.ts[0m:[93m48[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m48[0m       authResult.user?.id,
[7m  [0m [91m                 ~~~~[0m
[96msrc/pages/api/notifications/register.ts[0m:[93m12[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m12[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m

[96msrc/pages/api/notifications/send-test.ts[0m:[93m28[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m28[0m     if (!authResult.user?.isAdmin) {
[7m  [0m [91m                    ~~~~[0m
[96msrc/pages/api/notifications/send-test.ts[0m:[93m12[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m12[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m

[96msrc/pages/api/notifications/unregister.ts[0m:[93m28[0m:[93m65[0m - [91merror[0m[90m ts(2339): [0mProperty 'user' does not exist on type 'boolean'.

[7m28[0m     await notificationService.removePushSubscription(authResult.user?.id)
[7m  [0m [91m                                                                ~~~~[0m
[96msrc/pages/api/notifications/unregister.ts[0m:[93m12[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'authenticated' does not exist on type 'boolean'.

[7m12[0m     if (!authResult?.authenticated) {
[7m  [0m [91m                     ~~~~~~~~~~~~~[0m

[96msrc/pages/api/patient-rights/cancel-export.ts[0m:[93m15[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m15[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/patient-rights/cancel-export.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/patient-rights/create-export.ts[0m:[93m37[0m:[93m31[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'AuthUser'.

[7m37[0m       !(session as unknown as AuthUser).permissions?.includes(
[7m  [0m [91m                              ~~~~~~~~[0m
[96msrc/pages/api/patient-rights/create-export.ts[0m:[93m24[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m24[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/patient-rights/create-export.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/patient-rights/download-export.ts[0m:[93m123[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'PATIENT_ID' comes from an index signature, so it must be accessed with ['PATIENT_ID'].

[7m123[0m         patientId: process.env.PATIENT_ID || 'example-patient-id',
[7m   [0m [91m                               ~~~~~~~~~~[0m
[96msrc/pages/api/patient-rights/download-export.ts[0m:[93m15[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m15[0m export const GET: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/patient-rights/download-export.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/patient-rights/export-request.ts[0m:[93m25[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m25[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/patient-rights/export-request.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/patient-rights/export-status.ts[0m:[93m21[0m:[93m48[0m - [91merror[0m[90m ts(7031): [0mBinding element 'cookies' implicitly has an 'any' type.

[7m21[0m export const GET: APIRoute = async ({ request, cookies }) => {
[7m  [0m [91m                                               ~~~~~~~[0m
[96msrc/pages/api/patient-rights/export-status.ts[0m:[93m21[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m21[0m export const GET: APIRoute = async ({ request, cookies }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/patient-rights/export-status.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/patient-rights/get-export-status.ts[0m:[93m14[0m:[93m48[0m - [91merror[0m[90m ts(7031): [0mBinding element 'url' implicitly has an 'any' type.

[7m14[0m export const GET: APIRoute = async ({ request, url }) => {
[7m  [0m [91m                                               ~~~[0m
[96msrc/pages/api/patient-rights/get-export-status.ts[0m:[93m14[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m14[0m export const GET: APIRoute = async ({ request, url }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/patient-rights/get-export-status.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/patient-rights/initiate-export.ts[0m:[93m37[0m:[93m49[0m - [91merror[0m[90m ts(7031): [0mBinding element 'cookies' implicitly has an 'any' type.

[7m37[0m export const POST: APIRoute = async ({ request, cookies }) => {
[7m  [0m [91m                                                ~~~~~~~[0m
[96msrc/pages/api/patient-rights/initiate-export.ts[0m:[93m37[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m37[0m export const POST: APIRoute = async ({ request, cookies }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/patient-rights/initiate-export.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/patient-rights/request-export.ts[0m:[93m23[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m23[0m export const POST: APIRoute = async ({ request }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/patient-rights/request-export.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/patient-rights/update-export.ts[0m:[93m45[0m:[93m15[0m - [91merror[0m[90m ts(2339): [0mProperty 'app_metadata' does not exist on type 'User'.

[7m45[0m     if (!user.app_metadata?.permissions?.includes('update:data_exports')) {
[7m  [0m [91m              ~~~~~~~~~~~~[0m
[96msrc/pages/api/patient-rights/update-export.ts[0m:[93m31[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m31[0m export const put: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/patient-rights/update-export.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/psychology/generate-scenario.ts[0m:[93m320[0m:[93m209[0m - [91merror[0m[90m ts(2339): [0mProperty 'challenges' does not exist on type '{ name: string; age: number; gender: string; background: string; presentingConcern: string; history: string; currentSituation: string; }'.

[7m320[0m         currentSituation: `Client presents for session ${sessionContext.sessionNumber} with ongoing concerns about ${body.context}. ${clientProfile.challenges ? 'Current challenges include: ' + clientProfile.challenges.join(', ') + '.' : ''}`
[7m   [0m [91m                                                                                                                                                                                                                ~~~~~~~~~~[0m
[96msrc/pages/api/psychology/generate-scenario.ts[0m:[93m320[0m:[93m149[0m - [91merror[0m[90m ts(2339): [0mProperty 'challenges' does not exist on type '{ name: string; age: number; gender: string; background: string; presentingConcern: string; history: string; currentSituation: string; }'.

[7m320[0m         currentSituation: `Client presents for session ${sessionContext.sessionNumber} with ongoing concerns about ${body.context}. ${clientProfile.challenges ? 'Current challenges include: ' + clientProfile.challenges.join(', ') + '.' : ''}`
[7m   [0m [91m                                                                                                                                                    ~~~~~~~~~~[0m
[96msrc/pages/api/psychology/generate-scenario.ts[0m:[93m166[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType '{ age?: number | undefined; gender?: string | undefined; background?: string | undefined; presenting_concern?: string | undefined; } | { age: number; gender: string; background: string; ... 4 more ...; challenges: string[]; } | { ...; } | { ...; }' is not assignable to type '{ name: string; age: number; gender: string; background: string; presentingConcern: string; history: string; currentSituation: string; }'.
  Type '{ age?: number | undefined; gender?: string | undefined; background?: string | undefined; presenting_concern?: string | undefined; }' is missing the following properties from type '{ name: string; age: number; gender: string; background: string; presentingConcern: string; history: string; currentSituation: string; }': name, presentingConcern, history, currentSituation

[7m166[0m   return {
[7m   [0m [91m  ~~~~~~[0m
[96msrc/pages/api/psychology/generate-scenario.ts[0m:[93m159[0m:[93m63[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m159[0m   return `scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
[7m   [0m [93m                                                              ~~~~~~[0m

[96msrc/pages/api/security/events.ts[0m:[93m43[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m43[0m export const GET: APIRoute = async ({ request }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/security/events.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/security/backup/index.ts[0m:[93m79[0m:[93m46[0m - [91merror[0m[90m ts(2554): [0mExpected 0-1 arguments, but got 3.

[7m79[0m     const user = await protectRoute(request, locals, { role: 'admin' })
[7m  [0m [91m                                             ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/security/backup/index.ts[0m:[93m76[0m:[93m49[0m - [91merror[0m[90m ts(7031): [0mBinding element 'locals' implicitly has an 'any' type.

[7m76[0m export const POST: APIRoute = async ({ request, locals }) => {
[7m  [0m [91m                                                ~~~~~~[0m
[96msrc/pages/api/security/backup/index.ts[0m:[93m76[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m76[0m export const POST: APIRoute = async ({ request, locals }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/security/backup/index.ts[0m:[93m24[0m:[93m46[0m - [91merror[0m[90m ts(2554): [0mExpected 0-1 arguments, but got 3.

[7m24[0m     const user = await protectRoute(request, locals, { role: 'admin' })
[7m  [0m [91m                                             ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/security/backup/index.ts[0m:[93m21[0m:[93m48[0m - [91merror[0m[90m ts(7031): [0mBinding element 'locals' implicitly has an 'any' type.

[7m21[0m export const GET: APIRoute = async ({ request, locals }) => {
[7m  [0m [91m                                               ~~~~~~[0m
[96msrc/pages/api/security/backup/index.ts[0m:[93m21[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m21[0m export const GET: APIRoute = async ({ request, locals }) => {
[7m  [0m [91m                                      ~~~~~~~[0m
[96msrc/pages/api/security/backup/index.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m
[96msrc/pages/api/security/backup/index.ts[0m:[93m79[0m:[93m18[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m79[0m     const user = await protectRoute(request, locals, { role: 'admin' })
[7m  [0m [93m                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/api/security/backup/index.ts[0m:[93m24[0m:[93m18[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m24[0m     const user = await protectRoute(request, locals, { role: 'admin' })
[7m  [0m [93m                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/api/security/backup/recovery-tests.ts[0m:[93m84[0m:[93m22[0m - [91merror[0m[90m ts(6133): [0m'_locals' is declared but its value is never read.

[7m84[0m })(async ({ request, _locals }: AuthAPIContext) => {
[7m  [0m [91m                     ~~~~~~~[0m
[96msrc/pages/api/security/backup/recovery-tests.ts[0m:[93m84[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty '_locals' does not exist on type 'AuthAPIContext<Record<string, unknown>, Record<string, string | undefined>>'.

[7m84[0m })(async ({ request, _locals }: AuthAPIContext) => {
[7m  [0m [91m                     ~~~~~~~[0m
[96msrc/pages/api/security/backup/recovery-tests.ts[0m:[93m29[0m:[93m22[0m - [91merror[0m[90m ts(6133): [0m'_locals' is declared but its value is never read.

[7m29[0m })(async ({ request, _locals }: AuthAPIContext) => {
[7m  [0m [91m                     ~~~~~~~[0m
[96msrc/pages/api/security/backup/recovery-tests.ts[0m:[93m29[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty '_locals' does not exist on type 'AuthAPIContext<Record<string, unknown>, Record<string, string | undefined>>'.

[7m29[0m })(async ({ request, _locals }: AuthAPIContext) => {
[7m  [0m [91m                     ~~~~~~~[0m

[96msrc/pages/api/sessions/index.ts[0m:[93m153[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType 'import("/home/vivi/pixelated/src/lib/ai/models/ai-types").TherapySession[]' is not assignable to type 'import("/home/vivi/pixelated/src/lib/ai/interfaces/therapy").TherapySession[]'.
  Type 'TherapySession' is missing the following properties from type 'TherapySession': securityLevel, emotionAnalysisEnabled

[7m153[0m     const sessions: TherapySession[] = await repository.getSessions(filter)
[7m   [0m [91m          ~~~~~~~~[0m
[96msrc/pages/api/sessions/index.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/sessions/[sessionId]/temporal-emotions.ts[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m3[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/treatment-plans/[planId].ts[0m:[93m151[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'objectOutputType<{ id: ZodOptional<ZodString>; description: ZodOptional<ZodString>; targetDate: ZodNullable<ZodOptional<ZodString>>; status: ZodOptional<...>; objectives: ZodOptional<...>; }, ZodTypeAny, "passthrough">[]' is not assignable to type 'TreatmentGoal[]'.
  Type 'objectOutputType<{ id: ZodOptional<ZodString>; description: ZodOptional<ZodString>; targetDate: ZodNullable<ZodOptional<ZodString>>; status: ZodOptional<...>; objectives: ZodOptional<...>; }, ZodTypeAny, "passthrough">' is missing the following properties from type 'TreatmentGoal': treatment_plan_id, target_date, created_at, updated_at

[7m151[0m       goals: updates.goals || [],
[7m   [0m [91m      ~~~~~[0m
[96msrc/pages/api/treatment-plans/[planId].ts[0m:[93m102[0m:[93m46[0m - [91merror[0m[90m ts(7031): [0mBinding element 'locals' implicitly has an 'any' type.

[7m102[0m export const PUT = async ({ params, request, locals }) => {
[7m   [0m [91m                                             ~~~~~~[0m
[96msrc/pages/api/treatment-plans/[planId].ts[0m:[93m102[0m:[93m37[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m102[0m export const PUT = async ({ params, request, locals }) => {
[7m   [0m [91m                                    ~~~~~~~[0m
[96msrc/pages/api/treatment-plans/[planId].ts[0m:[93m102[0m:[93m29[0m - [91merror[0m[90m ts(7031): [0mBinding element 'params' implicitly has an 'any' type.

[7m102[0m export const PUT = async ({ params, request, locals }) => {
[7m   [0m [91m                            ~~~~~~[0m
[96msrc/pages/api/treatment-plans/[planId].ts[0m:[93m53[0m:[93m37[0m - [91merror[0m[90m ts(7031): [0mBinding element 'locals' implicitly has an 'any' type.

[7m53[0m export const GET = async ({ params, locals }) => {
[7m  [0m [91m                                    ~~~~~~[0m
[96msrc/pages/api/treatment-plans/[planId].ts[0m:[93m53[0m:[93m29[0m - [91merror[0m[90m ts(7031): [0mBinding element 'params' implicitly has an 'any' type.

[7m53[0m export const GET = async ({ params, locals }) => {
[7m  [0m [91m                            ~~~~~~[0m

[96msrc/pages/api/treatment-plans/index.ts[0m:[93m120[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType '{ id: string; treatment_plan_id: string; description: string; target_date: string | null | undefined; status: "Not Started" | "In Progress" | "Achieved" | "Partially Achieved" | "Not Achieved"; created_at: string; updated_at: string; objectives: { ...; }[]; }[]' is not assignable to type 'TreatmentGoal[]'.
  Type '{ id: string; treatment_plan_id: string; description: string; target_date: string | null | undefined; status: "Not Started" | "In Progress" | "Achieved" | "Partially Achieved" | "Not Achieved"; created_at: string; updated_at: string; objectives: { ...; }[]; }' is not assignable to type 'TreatmentGoal'.

[7m120[0m       goals: planData.goals.map((goal, index) => ({
[7m   [0m [91m      ~~~~~[0m
[96msrc/pages/api/treatment-plans/index.ts[0m:[93m75[0m:[93m49[0m - [91merror[0m[90m ts(7031): [0mBinding element 'locals' implicitly has an 'any' type.

[7m75[0m export const POST: APIRoute = async ({ request, locals }) => {
[7m  [0m [91m                                                ~~~~~~[0m
[96msrc/pages/api/treatment-plans/index.ts[0m:[93m75[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'request' implicitly has an 'any' type.

[7m75[0m export const POST: APIRoute = async ({ request, locals }) => {
[7m  [0m [91m                                       ~~~~~~~[0m
[96msrc/pages/api/treatment-plans/index.ts[0m:[93m46[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'locals' implicitly has an 'any' type.

[7m46[0m export const GET: APIRoute = async ({ locals }) => {
[7m  [0m [91m                                      ~~~~~~[0m
[96msrc/pages/api/treatment-plans/index.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/v1/search.ts[0m:[93m21[0m:[93m39[0m - [91merror[0m[90m ts(7031): [0mBinding element 'url' implicitly has an 'any' type.

[7m21[0m export const GET: APIRoute = async ({ url }) => {
[7m  [0m [91m                                      ~~~[0m
[96msrc/pages/api/v1/search.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/api/v1/preferences/index.ts[0m:[93m175[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'JsonValue' is not assignable to type '{ [key: string]: unknown; showWelcomeScreen?: boolean | undefined; autoSave?: boolean | undefined; fontSize?: string | undefined; } | undefined'.
  Type 'null' is not assignable to type '{ [key: string]: unknown; showWelcomeScreen?: boolean | undefined; autoSave?: boolean | undefined; fontSize?: string | undefined; } | undefined'.

[7m175[0m       { preferences: newPrefs as unknown as JsonValue },
[7m   [0m [91m        ~~~~~~~~~~~[0m
[96msrc/pages/api/v1/preferences/index.ts[0m:[93m141[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'JsonValue' is not assignable to type '{ [key: string]: unknown; showWelcomeScreen?: boolean | undefined; autoSave?: boolean | undefined; fontSize?: string | undefined; } | undefined'.
  Type 'null' is not assignable to type '{ [key: string]: unknown; showWelcomeScreen?: boolean | undefined; autoSave?: boolean | undefined; fontSize?: string | undefined; } | undefined'.

[7m141[0m       { preferences: newPrefs as unknown as JsonValue },
[7m   [0m [91m        ~~~~~~~~~~~[0m

[96msrc/pages/api-docs/ai/mental-health/analyze.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIRoute'.

[7m1[0m import type { APIRoute } from 'astro'
[7m [0m [91m              ~~~~~~~~[0m

[96msrc/pages/blog/index.astro[0m:[93m38[0m:[93m37[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
  No index signature with a parameter of type 'string' was found on type '{}'.

[7m38[0m   .sort((a, b) => tagFrequency[b] - tagFrequency[a])
[7m  [0m [91m                                    ~~~~~~~~~~~~~~~[0m
[96msrc/pages/blog/index.astro[0m:[93m38[0m:[93m19[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
  No index signature with a parameter of type 'string' was found on type '{}'.

[7m38[0m   .sort((a, b) => tagFrequency[b] - tagFrequency[a])
[7m  [0m [91m                  ~~~~~~~~~~~~~~~[0m
[96msrc/pages/blog/index.astro[0m:[93m33[0m:[93m26[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.

[7m33[0m     tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
[7m  [0m [91m                         ~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/blog/index.astro[0m:[93m33[0m:[93m5[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.

[7m33[0m     tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/blog/index.astro[0m:[93m32[0m:[93m35[0m - [91merror[0m[90m ts(7006): [0mParameter 'tag' implicitly has an 'any' type.

[7m32[0m   (post.data.tags || []).forEach((tag) => {
[7m  [0m [91m                                  ~~~[0m
[96msrc/pages/blog/index.astro[0m:[93m31[0m:[93m19[0m - [91merror[0m[90m ts(7006): [0mParameter 'post' implicitly has an 'any' type.

[7m31[0m allPosts.forEach((post) => {
[7m  [0m [91m                  ~~~~[0m

[96msrc/pages/browser-compatibility/dashboard.astro[0m:[93m84[0m:[93m3[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m84[0m   issuesByBrowser[issue.browser].push(issue)
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/browser-compatibility/visual-regression.astro[0m:[93m536[0m:[93m3[0m - [93mwarning[0m[90m ts(7027): [0mUnreachable code detected.

[7m536[0m   document.getElementById('refresh-data')?.addEventListener('click', () => {
[7m   [0m [93m  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m537[0m     window.location.reload()
[7m   [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m538[0m   })
[7m   [0m [93m~~~~[0m
[96msrc/pages/browser-compatibility/visual-regression.astro[0m:[93m534[0m:[93m9[0m - [93mwarning[0m[90m astro(4000): [0mThis script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

[7m534[0m <script define:vars={{ visualData, placeholderThumbnail }}>
[7m   [0m [93m        ~~~~~~~~~~~[0m

[96msrc/pages/client/[clientId]/temporal-analysis.astro[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroGlobal'.

[7m3[0m import type { AstroGlobal } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~[0m

[96msrc/pages/dashboard/index.astro[0m:[93m6[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'requireAuth' is declared but its value is never read.

[7m6[0m import { requireAuth } from '@/lib/auth'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/dashboard/emotions/dimensional-analysis.astro[0m:[93m9[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'AstroCookies'.

[7m9[0m import type { AstroCookies } from 'astro'
[7m [0m [91m              ~~~~~~~~~~~~[0m

[96msrc/pages/demo/bias-detection.astro[0m:[93m379[0m:[93m67[0m - [93mwarning[0m[90m ts(6385): [0m'(from: number, length?: number | undefined): string' is deprecated.

[7m379[0m           'demo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
[7m   [0m [93m                                                                  ~~~~~~[0m

[96msrc/pages/demo/chat.astro[0m:[93m96[0m:[93m65[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; variant: "outline"; class: string; id: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'id' does not exist on type 'IntrinsicAttributes & Props'.

[7m96[0m               <BrutalistButton variant="outline" class="flex-1" id="sample-crisis">
[7m  [0m [91m                                                                ~~[0m
[96msrc/pages/demo/chat.astro[0m:[93m93[0m:[93m67[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; variant: "secondary"; class: string; id: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'id' does not exist on type 'IntrinsicAttributes & Props'.

[7m93[0m               <BrutalistButton variant="secondary" class="flex-1" id="sample-depression">
[7m  [0m [91m                                                                  ~~[0m
[96msrc/pages/demo/chat.astro[0m:[93m90[0m:[93m65[0m - [91merror[0m[90m ts(2322): [0mType '{ children: string; variant: "primary"; class: string; id: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'id' does not exist on type 'IntrinsicAttributes & Props'.

[7m90[0m               <BrutalistButton variant="primary" class="flex-1" id="sample-anxiety">
[7m  [0m [91m                                                                ~~[0m
[96msrc/pages/demo/chat.astro[0m:[93m5[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'BrutalistBadge' is declared but its value is never read.

[7m5[0m import BrutalistBadge from '@/components/ui/BrutalistBadge.astro'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/demo/chat.astro[0m:[93m395[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'_chatDemo' is declared but its value is never read.

[7m395[0m     const _chatDemo = new ChatDemoInterface()
[7m   [0m [91m          ~~~~~~~~~[0m

[96msrc/pages/demo/clinical-vault-trainer.astro[0m:[93m33[0m:[93m33[0m - [91merror[0m[90m ts(2538): [0mType 'undefined' cannot be used as an index type.

[7m33[0m const currentVariant = variants[variantKey]
[7m  [0m [91m                                ~~~~~~~~~~[0m
[96msrc/pages/demo/clinical-vault-trainer.astro[0m:[93m5[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'BrutalistBadge' is declared but its value is never read.

[7m5[0m import BrutalistBadge from '@/components/ui/BrutalistBadge.astro'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/demo/clinical-vault-trainer.astro[0m:[93m482[0m:[93m57[0m - [91merror[0m[90m ts(2339): [0mProperty 'dataset' does not exist on type 'Element'.

[7m482[0m               document.querySelector('[data-variant]')?.dataset.variant ||
[7m   [0m [91m                                                        ~~~~~~~[0m
[96msrc/pages/demo/clinical-vault-trainer.astro[0m:[93m439[0m:[93m41[0m - [91merror[0m[90m ts(4111): [0mProperty 'variant' comes from an index signature, so it must be accessed with ['variant'].

[7m439[0m         const variant = target.dataset?.variant
[7m   [0m [91m                                        ~~~~~~~[0m
[96msrc/pages/demo/clinical-vault-trainer.astro[0m:[93m438[0m:[93m41[0m - [91merror[0m[90m ts(4111): [0mProperty 'demoCta' comes from an index signature, so it must be accessed with ['demoCta'].

[7m438[0m         const ctaType = target.dataset?.demoCta
[7m   [0m [91m                                        ~~~~~~~[0m
[96msrc/pages/demo/clinical-vault-trainer.astro[0m:[93m425[0m:[93m57[0m - [91merror[0m[90m ts(2339): [0mProperty 'dataset' does not exist on type 'Element'.

[7m425[0m               document.querySelector('[data-variant]')?.dataset?.variant ||
[7m   [0m [91m                                                        ~~~~~~~[0m
[96msrc/pages/demo/clinical-vault-trainer.astro[0m:[93m409[0m:[93m57[0m - [91merror[0m[90m ts(2339): [0mProperty 'dataset' does not exist on type 'Element'.

[7m409[0m               document.querySelector('[data-variant]')?.dataset.variant ||
[7m   [0m [91m                                                        ~~~~~~~[0m
[96msrc/pages/demo/clinical-vault-trainer.astro[0m:[93m400[0m:[93m40[0m - [91merror[0m[90m ts(4111): [0mProperty 'demoAction' comes from an index signature, so it must be accessed with ['demoAction'].

[7m400[0m         const action = target.dataset?.demoAction
[7m   [0m [91m                                       ~~~~~~~~~~[0m
[96msrc/pages/demo/clinical-vault-trainer.astro[0m:[93m389[0m:[93m53[0m - [91merror[0m[90m ts(2339): [0mProperty 'dataset' does not exist on type 'Element'.

[7m389[0m           document.querySelector('[data-variant]')?.dataset?.variant ||
[7m   [0m [91m                                                    ~~~~~~~[0m
[96msrc/pages/demo/clinical-vault-trainer.astro[0m:[93m371[0m:[93m7[0m - [91merror[0m[90m ts(2717): [0mSubsequent property declarations must have the same type.  Property 'gtag' must be of type '((command: string, event: string, params: Record<string, unknown>) => void) | undefined', but here has type '((command: "event", action: string, params: { [key: string]: any; }) => void) | undefined'.

[7m371[0m       gtag?: (
[7m   [0m [91m      ~~~~[0m

[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m180[0m:[93m13[0m - [91merror[0m[90m ts(2322): [0mType '{ "client:load": true; enableExport: true; showHistoricalData: true; class: string; }' is not assignable to type 'IntrinsicAttributes & BiasDetectionDemoProps'.
  Property 'class' does not exist on type 'IntrinsicAttributes & BiasDetectionDemoProps'. Did you mean 'className'?

[7m180[0m             class="w-full"
[7m   [0m [91m            ~~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m10[0m:[93m3[0m - [91merror[0m[90m ts(2322): [0mType '{ children: any; title: string; description: string; keywords: string; }' is not assignable to type 'IntrinsicAttributes & Props'.
  Property 'keywords' does not exist on type 'IntrinsicAttributes & Props'.

[7m10[0m   keywords="bias detection, AI therapy, mental health, therapeutic training, bias analysis, cultural competency"
[7m  [0m [91m  ~~~~~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m399[0m:[93m13[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'gtag'.

[7m399[0m             gtag('event', 'demo_interaction', {
[7m   [0m [91m            ~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m398[0m:[93m22[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'gtag'.

[7m398[0m           if (typeof gtag !== 'undefined') {
[7m   [0m [91m                     ~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m397[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'textContent' does not exist on type 'EventTarget'.

[7m397[0m         if (e.target?.textContent?.includes('Export Data')) {
[7m   [0m [91m                      ~~~~~~~~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m386[0m:[93m13[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'gtag'.

[7m386[0m             gtag('event', 'demo_interaction', {
[7m   [0m [91m            ~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m385[0m:[93m22[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'gtag'.

[7m385[0m           if (typeof gtag !== 'undefined') {
[7m   [0m [91m                     ~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m384[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'closest' does not exist on type 'EventTarget'.

[7m384[0m         if (e.target?.closest('.preset-scenario-selector')) {
[7m   [0m [91m                      ~~~~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m373[0m:[93m13[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'gtag'.

[7m373[0m             gtag('event', 'demo_interaction', {
[7m   [0m [91m            ~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m372[0m:[93m22[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'gtag'.

[7m372[0m           if (typeof gtag !== 'undefined') {
[7m   [0m [91m                     ~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m371[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'textContent' does not exist on type 'EventTarget'.

[7m371[0m         if (e.target?.textContent?.includes('Analyze for Bias')) {
[7m   [0m [91m                      ~~~~~~~~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m359[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'gtag'.

[7m359[0m       gtag('event', 'page_view', {
[7m   [0m [91m      ~~~~[0m
[96msrc/pages/demo/enhanced-bias-detection.astro[0m:[93m358[0m:[93m16[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'gtag'.

[7m358[0m     if (typeof gtag !== 'undefined') {
[7m   [0m [91m               ~~~~[0m

[96msrc/pages/demo/psychology-pipeline-processor.astro[0m:[93m754[0m:[93m44[0m - [91merror[0m[90m ts(4111): [0mProperty 'variant' comes from an index signature, so it must be accessed with ['variant'].

[7m754[0m         const ctaVariant = target.dataset?.variant
[7m   [0m [91m                                           ~~~~~~~[0m
[96msrc/pages/demo/psychology-pipeline-processor.astro[0m:[93m753[0m:[93m41[0m - [91merror[0m[90m ts(4111): [0mProperty 'demoCta' comes from an index signature, so it must be accessed with ['demoCta'].

[7m753[0m         const ctaType = target.dataset?.demoCta
[7m   [0m [91m                                        ~~~~~~~[0m
[96msrc/pages/demo/psychology-pipeline-processor.astro[0m:[93m719[0m:[93m40[0m - [91merror[0m[90m ts(4111): [0mProperty 'demoAction' comes from an index signature, so it must be accessed with ['demoAction'].

[7m719[0m         const action = target.dataset?.demoAction
[7m   [0m [91m                                       ~~~~~~~~~~[0m
[96msrc/pages/demo/psychology-pipeline-processor.astro[0m:[93m703[0m:[93m46[0m - [91merror[0m[90m ts(4111): [0mProperty 'variant' comes from an index signature, so it must be accessed with ['variant'].

[7m703[0m     const variant = variantElement?.dataset?.variant || 'unknown'
[7m   [0m [91m                                             ~~~~~~~[0m
[96msrc/pages/demo/psychology-pipeline-processor.astro[0m:[93m689[0m:[93m7[0m - [91merror[0m[90m ts(2717): [0mSubsequent property declarations must have the same type.  Property 'gtag' must be of type '((command: string, event: string, params: Record<string, unknown>) => void) | undefined', but here has type '((command: "event", action: string, params: { [key: string]: any; }) => void) | undefined'.

[7m689[0m       gtag?: (
[7m   [0m [91m      ~~~~[0m

[96msrc/pages/demo/security-bias-detection-engine.astro[0m:[93m37[0m:[93m33[0m - [91merror[0m[90m ts(2538): [0mType 'undefined' cannot be used as an index type.

[7m37[0m const currentVariant = variants[variantKey]
[7m  [0m [91m                                ~~~~~~~~~~[0m
[96msrc/pages/demo/security-bias-detection-engine.astro[0m:[93m735[0m:[93m44[0m - [91merror[0m[90m ts(4111): [0mProperty 'variant' comes from an index signature, so it must be accessed with ['variant'].

[7m735[0m         const ctaVariant = target.dataset?.variant
[7m   [0m [91m                                           ~~~~~~~[0m
[96msrc/pages/demo/security-bias-detection-engine.astro[0m:[93m734[0m:[93m41[0m - [91merror[0m[90m ts(4111): [0mProperty 'demoCta' comes from an index signature, so it must be accessed with ['demoCta'].

[7m734[0m         const ctaType = target.dataset?.demoCta
[7m   [0m [91m                                        ~~~~~~~[0m
[96msrc/pages/demo/security-bias-detection-engine.astro[0m:[93m700[0m:[93m40[0m - [91merror[0m[90m ts(4111): [0mProperty 'demoAction' comes from an index signature, so it must be accessed with ['demoAction'].

[7m700[0m         const action = target.dataset?.demoAction
[7m   [0m [91m                                       ~~~~~~~~~~[0m
[96msrc/pages/demo/security-bias-detection-engine.astro[0m:[93m684[0m:[93m46[0m - [91merror[0m[90m ts(4111): [0mProperty 'variant' comes from an index signature, so it must be accessed with ['variant'].

[7m684[0m     const variant = variantElement?.dataset?.variant || 'unknown'
[7m   [0m [91m                                             ~~~~~~~[0m
[96msrc/pages/demo/security-bias-detection-engine.astro[0m:[93m670[0m:[93m7[0m - [91merror[0m[90m ts(2717): [0mSubsequent property declarations must have the same type.  Property 'gtag' must be of type '((command: string, event: string, params: Record<string, unknown>) => void) | undefined', but here has type '((command: "event", action: string, params: { [key: string]: any; }) => void) | undefined'.

[7m670[0m       gtag?: (
[7m   [0m [91m      ~~~~[0m

[96msrc/pages/demo/synthetic-training-generator.astro[0m:[93m37[0m:[93m33[0m - [91merror[0m[90m ts(2538): [0mType 'undefined' cannot be used as an index type.

[7m37[0m const currentVariant = variants[variantKey]
[7m  [0m [91m                                ~~~~~~~~~~[0m
[96msrc/pages/demo/synthetic-training-generator.astro[0m:[93m788[0m:[93m57[0m - [91merror[0m[90m ts(2339): [0mProperty 'dataset' does not exist on type 'Element'.

[7m788[0m               document.querySelector('[data-variant]')?.dataset.variant ||
[7m   [0m [91m                                                        ~~~~~~~[0m
[96msrc/pages/demo/synthetic-training-generator.astro[0m:[93m745[0m:[93m41[0m - [91merror[0m[90m ts(4111): [0mProperty 'variant' comes from an index signature, so it must be accessed with ['variant'].

[7m745[0m         const variant = target.dataset?.variant
[7m   [0m [91m                                        ~~~~~~~[0m
[96msrc/pages/demo/synthetic-training-generator.astro[0m:[93m744[0m:[93m41[0m - [91merror[0m[90m ts(4111): [0mProperty 'demoCta' comes from an index signature, so it must be accessed with ['demoCta'].

[7m744[0m         const ctaType = target.dataset?.demoCta
[7m   [0m [91m                                        ~~~~~~~[0m
[96msrc/pages/demo/synthetic-training-generator.astro[0m:[93m731[0m:[93m57[0m - [91merror[0m[90m ts(2339): [0mProperty 'dataset' does not exist on type 'Element'.

[7m731[0m               document.querySelector('[data-variant]')?.dataset.variant ||
[7m   [0m [91m                                                        ~~~~~~~[0m
[96msrc/pages/demo/synthetic-training-generator.astro[0m:[93m715[0m:[93m57[0m - [91merror[0m[90m ts(2339): [0mProperty 'dataset' does not exist on type 'Element'.

[7m715[0m               document.querySelector('[data-variant]')?.dataset?.variant ||
[7m   [0m [91m                                                        ~~~~~~~[0m
[96msrc/pages/demo/synthetic-training-generator.astro[0m:[93m706[0m:[93m40[0m - [91merror[0m[90m ts(4111): [0mProperty 'demoAction' comes from an index signature, so it must be accessed with ['demoAction'].

[7m706[0m         const action = target.dataset?.demoAction
[7m   [0m [91m                                       ~~~~~~~~~~[0m
[96msrc/pages/demo/synthetic-training-generator.astro[0m:[93m695[0m:[93m53[0m - [91merror[0m[90m ts(2339): [0mProperty 'dataset' does not exist on type 'Element'.

[7m695[0m           document.querySelector('[data-variant]')?.dataset.variant ||
[7m   [0m [91m                                                    ~~~~~~~[0m
[96msrc/pages/demo/synthetic-training-generator.astro[0m:[93m677[0m:[93m7[0m - [91merror[0m[90m ts(2717): [0mSubsequent property declarations must have the same type.  Property 'gtag' must be of type '((command: string, event: string, params: Record<string, unknown>) => void) | undefined', but here has type '((command: "event", action: string, params: { [key: string]: any; }) => void) | undefined'.

[7m677[0m       gtag?: (
[7m   [0m [91m      ~~~~[0m

[96msrc/pages/dev/accessibility-test.astro[0m:[93m14[0m:[93m11[0m - [91merror[0m[90m ts(6196): [0m'LoadingIndicatorProps' is declared but never used.

[7m14[0m interface LoadingIndicatorProps {
[7m  [0m [91m          ~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/dev/browser-compatibility-test.astro[0m:[93m77[0m:[93m53[0m - [91merror[0m[90m ts(2339): [0mProperty 'showModelSelector' does not exist on type '{}'.

[7m77[0m                   showModelSelector={section.props?.showModelSelector}
[7m  [0m [91m                                                    ~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/dev/browser-compatibility-test.astro[0m:[93m76[0m:[93m47[0m - [91merror[0m[90m ts(2339): [0mProperty 'description' does not exist on type '{}'.

[7m76[0m                   description={section.props?.description}
[7m  [0m [91m                                              ~~~~~~~~~~~[0m
[96msrc/pages/dev/browser-compatibility-test.astro[0m:[93m75[0m:[93m41[0m - [91merror[0m[90m ts(2339): [0mProperty 'title' does not exist on type '{}'.

[7m75[0m                   title={section.props?.title}
[7m  [0m [91m                                        ~~~~~[0m
[96msrc/pages/dev/browser-compatibility-test.astro[0m:[93m15[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType '(_props: Props) => any' is not assignable to type 'ComponentType<unknown> | undefined'.
  Type '(_props: Props) => any' is not assignable to type 'FunctionComponent<unknown>'.

[7m15[0m     component: AIChat,
[7m  [0m [91m    ~~~~~~~~~[0m
[96msrc/pages/dev/browser-compatibility-test.astro[0m:[93m6[0m:[93m15[0m - [91merror[0m[90m ts(6196): [0m'CompatibilityIssue' is declared but never used.

[7m6[0m import type { CompatibilityIssue, TestSections } from '../../types/testing'
[7m [0m [91m              ~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/dev/browser-compatibility-test.astro[0m:[93m5[0m:[93m25[0m - [91merror[0m[90m ts(6133): [0m'SEVERITY_STYLES' is declared but its value is never read.

[7m5[0m import { LOADING_SIZES, SEVERITY_STYLES } from '../../constants/testing'
[7m [0m [91m                        ~~~~~~~~~~~~~~~[0m
[96msrc/pages/dev/browser-compatibility-test.astro[0m:[93m375[0m:[93m5[0m - [91merror[0m[90m ts(6133): [0m'removeIssue' is declared but its value is never read.

[7m375[0m     removeIssue,
[7m   [0m [91m    ~~~~~~~~~~~[0m

[96msrc/pages/examples/_recommendation-display.tsx[0m:[93m65[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType '{ recommendations: EnhancedRecommendation[]; clientName: string; onSelect: (recommendation: EnhancedRecommendation) => void; showEfficacyStats: boolean; showPersonalizationDetails: boolean; showAlternatives: boolean; }' is not assignable to type 'IntrinsicAttributes & RecommendationDisplayProps'.
  Property 'clientName' does not exist on type 'IntrinsicAttributes & RecommendationDisplayProps'.

[7m65[0m           clientName="Alex Johnson"
[7m  [0m [91m          ~~~~~~~~~~[0m
[96msrc/pages/examples/_recommendation-display.tsx[0m:[93m3[0m:[93m45[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/types/recommendations' or its corresponding type declarations.

[7m3[0m import type { EnhancedRecommendation } from '../../lib/ai/types/recommendations'
[7m [0m [91m                                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/examples/_recommendation-display.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useState } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/pages/profile/index.astro[0m:[93m9[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"astro"' has no exported member 'APIContext'.

[7m9[0m import type { APIContext } from 'astro'
[7m [0m [91m              ~~~~~~~~~~[0m

[96msrc/pages/settings/ai-preferences.astro[0m:[93m12[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'request' does not exist on type '{ url: URL; site: URL; }'.

[7m12[0m   request: Astro.request,
[7m  [0m [91m                 ~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m11[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'redirect' does not exist on type '{ url: URL; site: URL; }'.

[7m11[0m   redirect: Astro.redirect,
[7m  [0m [91m                  ~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m10[0m:[93m18[0m - [91merror[0m[90m ts(2339): [0mProperty 'cookies' does not exist on type '{ url: URL; site: URL; }'.

[7m10[0m   cookies: Astro.cookies,
[7m  [0m [91m                 ~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m464[0m:[93m31[0m - [91merror[0m[90m ts(7006): [0mParameter 'message' implicitly has an 'any' type.

[7m464[0m     function showNotification(message, type = 'info') {
[7m   [0m [91m                              ~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m455[0m:[93m15[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m455[0m               error.message || 'Failed to reset preferences',
[7m   [0m [91m              ~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m434[0m:[93m13[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m434[0m             error.message || 'Failed to save preferences',
[7m   [0m [91m            ~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m407[0m:[93m39[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'HTMLElement' is not assignable to parameter of type 'HTMLFormElement'.
  Type 'HTMLElement' is missing the following properties from type 'HTMLFormElement': acceptCharset, action, autocomplete, elements, and 15 more.

[7m407[0m         const formData = new FormData(form)
[7m   [0m [91m                                      ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m401[0m:[93m14[0m - [91merror[0m[90m ts(2339): [0mProperty 'enableCrisisDetection' does not exist on type 'HTMLElement'.

[7m401[0m         form.enableCrisisDetection.checked ? 'block' : 'none'
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m401[0m:[93m9[0m - [91merror[0m[90m ts(18047): [0m'form' is possibly 'null'.

[7m401[0m         form.enableCrisisDetection.checked ? 'block' : 'none'
[7m   [0m [91m        ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m400[0m:[93m7[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m400[0m       document.getElementById('crisisDetectionSensitivityGroup').style.display =
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m398[0m:[93m12[0m - [91merror[0m[90m ts(2339): [0mProperty 'aiSuggestions' does not exist on type 'HTMLElement'.

[7m398[0m       form.aiSuggestions.checked = !!prefs.aiSuggestions
[7m   [0m [91m           ~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m398[0m:[93m7[0m - [91merror[0m[90m ts(18047): [0m'form' is possibly 'null'.

[7m398[0m       form.aiSuggestions.checked = !!prefs.aiSuggestions
[7m   [0m [91m      ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m397[0m:[93m12[0m - [91merror[0m[90m ts(2339): [0mProperty 'saveAnalysisResults' does not exist on type 'HTMLElement'.

[7m397[0m       form.saveAnalysisResults.checked = !!prefs.saveAnalysisResults
[7m   [0m [91m           ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m397[0m:[93m7[0m - [91merror[0m[90m ts(18047): [0m'form' is possibly 'null'.

[7m397[0m       form.saveAnalysisResults.checked = !!prefs.saveAnalysisResults
[7m   [0m [91m      ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m396[0m:[93m12[0m - [91merror[0m[90m ts(2339): [0mProperty 'crisisDetectionSensitivity' does not exist on type 'HTMLElement'.

[7m396[0m       form.crisisDetectionSensitivity.value = prefs.crisisDetectionSensitivity
[7m   [0m [91m           ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m396[0m:[93m7[0m - [91merror[0m[90m ts(18047): [0m'form' is possibly 'null'.

[7m396[0m       form.crisisDetectionSensitivity.value = prefs.crisisDetectionSensitivity
[7m   [0m [91m      ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m395[0m:[93m12[0m - [91merror[0m[90m ts(2339): [0mProperty 'enableCrisisDetection' does not exist on type 'HTMLElement'.

[7m395[0m       form.enableCrisisDetection.checked = !!prefs.enableCrisisDetection
[7m   [0m [91m           ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m395[0m:[93m7[0m - [91merror[0m[90m ts(18047): [0m'form' is possibly 'null'.

[7m395[0m       form.enableCrisisDetection.checked = !!prefs.enableCrisisDetection
[7m   [0m [91m      ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m394[0m:[93m12[0m - [91merror[0m[90m ts(2339): [0mProperty 'enableSentimentAnalysis' does not exist on type 'HTMLElement'.

[7m394[0m       form.enableSentimentAnalysis.checked = !!prefs.enableSentimentAnalysis
[7m   [0m [91m           ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m394[0m:[93m7[0m - [91merror[0m[90m ts(18047): [0m'form' is possibly 'null'.

[7m394[0m       form.enableSentimentAnalysis.checked = !!prefs.enableSentimentAnalysis
[7m   [0m [91m      ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m392[0m:[93m22[0m - [91merror[0m[90m ts(18046): [0m'rb' is of type 'unknown'.

[7m392[0m         rb.checked = rb.value === prefs.responseStyle
[7m   [0m [91m                     ~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m392[0m:[93m9[0m - [91merror[0m[90m ts(18046): [0m'rb' is of type 'unknown'.

[7m392[0m         rb.checked = rb.value === prefs.responseStyle
[7m   [0m [91m        ~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m391[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'responseStyle' does not exist on type 'HTMLElement'.

[7m391[0m       Array.from(form.responseStyle).forEach((rb) => {
[7m   [0m [91m                      ~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m391[0m:[93m18[0m - [91merror[0m[90m ts(18047): [0m'form' is possibly 'null'.

[7m391[0m       Array.from(form.responseStyle).forEach((rb) => {
[7m   [0m [91m                 ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m389[0m:[93m22[0m - [91merror[0m[90m ts(18046): [0m'rb' is of type 'unknown'.

[7m389[0m         rb.checked = rb.value === prefs.responseLength
[7m   [0m [91m                     ~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m389[0m:[93m9[0m - [91merror[0m[90m ts(18046): [0m'rb' is of type 'unknown'.

[7m389[0m         rb.checked = rb.value === prefs.responseLength
[7m   [0m [91m        ~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m388[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'responseLength' does not exist on type 'HTMLElement'.

[7m388[0m       Array.from(form.responseLength).forEach((rb) => {
[7m   [0m [91m                      ~~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m388[0m:[93m18[0m - [91merror[0m[90m ts(18047): [0m'form' is possibly 'null'.

[7m388[0m       Array.from(form.responseLength).forEach((rb) => {
[7m   [0m [91m                 ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m386[0m:[93m54[0m - [91merror[0m[90m ts(18046): [0m'cb' is of type 'unknown'.

[7m386[0m         cb.checked = prefs.preferredModels?.includes(cb.value)
[7m   [0m [91m                                                     ~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m386[0m:[93m9[0m - [91merror[0m[90m ts(18046): [0m'cb' is of type 'unknown'.

[7m386[0m         cb.checked = prefs.preferredModels?.includes(cb.value)
[7m   [0m [91m        ~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m385[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'preferredModels' does not exist on type 'HTMLElement'.

[7m385[0m       Array.from(form.preferredModels).forEach((cb) => {
[7m   [0m [91m                      ~~~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m385[0m:[93m18[0m - [91merror[0m[90m ts(18047): [0m'form' is possibly 'null'.

[7m385[0m       Array.from(form.preferredModels).forEach((cb) => {
[7m   [0m [91m                 ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m384[0m:[93m12[0m - [91merror[0m[90m ts(2339): [0mProperty 'defaultModel' does not exist on type 'HTMLElement'.

[7m384[0m       form.defaultModel.value = prefs.defaultModel
[7m   [0m [91m           ~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m384[0m:[93m7[0m - [91merror[0m[90m ts(18047): [0m'form' is possibly 'null'.

[7m384[0m       form.defaultModel.value = prefs.defaultModel
[7m   [0m [91m      ~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m382[0m:[93m28[0m - [91merror[0m[90m ts(7006): [0mParameter 'prefs' implicitly has an 'any' type.

[7m382[0m     function setFormValues(prefs) {
[7m   [0m [91m                           ~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m378[0m:[93m9[0m - [91merror[0m[90m ts(18047): [0m'loadingIndicator' is possibly 'null'.

[7m378[0m         loadingIndicator.classList.add('hidden')
[7m   [0m [91m        ~~~~~~~~~~~~~~~~[0m
[96msrc/pages/settings/ai-preferences.astro[0m:[93m369[0m:[93m7[0m - [91merror[0m[90m ts(18047): [0m'loadingIndicator' is possibly 'null'.

[7m369[0m       loadingIndicator.classList.remove('hidden')
[7m   [0m [91m      ~~~~~~~~~~~~~~~~[0m

[96msrc/scripts/buffer-polyfill.js[0m:[93m1[0m:[93m25[0m - [93mwarning[0m[90m ts(80002): [0mThis constructor function may be converted to a class declaration.

[7m1[0m export default function BufferPolyfill(arg, encodingOrOffset, length) {
[7m [0m [93m                        ~~~~~~~~~~~~~~[0m

[96msrc/scripts/mental-arena-generate.ts[0m:[93m383[0m:[93m26[0m - [91merror[0m[90m ts(2571): [0mObject is of type 'unknown'.

[7m383[0m     const metadataPath = options['output-path'].replace(
[7m   [0m [91m                         ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/scripts/mental-arena-generate.ts[0m:[93m380[0m:[93m24[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'PathLike | FileHandle'.

[7m380[0m     await fs.writeFile(options['output-path'], jsonlData)
[7m   [0m [91m                       ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/scripts/mental-arena-generate.ts[0m:[93m312[0m:[93m54[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ numSessions: number; maxTurns: number; disorders: any; qualityThreshold: number; enableValidation: unknown; }' is not assignable to parameter of type 'GenerateSyntheticDataOptions'.
  Types of property 'enableValidation' are incompatible.

[7m312[0m       await adapter.generateSyntheticDataWithMetrics(generationOptions)
[7m   [0m [91m                                                     ~~~~~~~~~~~~~~~~~[0m
[96msrc/scripts/mental-arena-generate.ts[0m:[93m305[0m:[93m26[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'string'.

[7m305[0m       maxTurns: parseInt(options['max-turns']),
[7m   [0m [91m                         ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/scripts/mental-arena-generate.ts[0m:[93m304[0m:[93m29[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'string'.

[7m304[0m       numSessions: parseInt(options['num-conversations']),
[7m   [0m [91m                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/scripts/mental-arena-generate.ts[0m:[93m279[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'unknown' is not assignable to type 'string'.

[7m279[0m       pythonPath: options['python-path'],
[7m   [0m [91m      ~~~~~~~~~~[0m
[96msrc/scripts/mental-arena-generate.ts[0m:[93m237[0m:[93m27[0m - [91merror[0m[90m ts(2571): [0mObject is of type 'unknown'.

[7m237[0m     const disorderNames = options['disorders']
[7m   [0m [91m                          ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/scripts/mental-arena-generate.ts[0m:[93m233[0m:[93m36[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'unknown' is not assignable to parameter of type 'string'.

[7m233[0m     const outputDir = path.dirname(options['output-path'])
[7m   [0m [91m                                   ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/scripts/mental-llama-analyze.ts[0m:[93m75[0m:[93m17[0m - [91merror[0m[90m ts(2352): [0mConversion of type '{ [key: string]: unknown; }' to type 'CliOptions' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Property 'outputPath' is missing in type '{ [key: string]: unknown; }' but required in type 'CliOptions'.

[7m75[0m const options = program.opts() as CliOptions
[7m  [0m [91m                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/scripts/rollback.ts[0m:[93m100[0m:[93m11[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m100[0m           return tags[0]
[7m   [0m [91m          ~~~~~~[0m
[96msrc/scripts/rollback.ts[0m:[93m94[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m94[0m         return rollbackTag
[7m  [0m [91m        ~~~~~~[0m
[96msrc/scripts/rollback.ts[0m:[93m52[0m:[93m50[0m - [91merror[0m[90m ts(4111): [0mProperty 'EMAIL_API_KEY' comes from an index signature, so it must be accessed with ['EMAIL_API_KEY'].

[7m52[0m           'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
[7m  [0m [91m                                                 ~~~~~~~~~~~~~[0m
[96msrc/scripts/rollback.ts[0m:[93m47[0m:[93m21[0m - [91merror[0m[90m ts(4111): [0mProperty 'EMAIL_API_KEY' comes from an index signature, so it must be accessed with ['EMAIL_API_KEY'].

[7m47[0m     if (process.env.EMAIL_API_KEY) {
[7m  [0m [91m                    ~~~~~~~~~~~~~[0m
[96msrc/scripts/rollback.ts[0m:[93m38[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'SLACK_WEBHOOK' comes from an index signature, so it must be accessed with ['SLACK_WEBHOOK'].

[7m38[0m     await fetch(process.env.SLACK_WEBHOOK || '', {
[7m  [0m [91m                            ~~~~~~~~~~~~~[0m

[96msrc/scripts/task-manager-cli.ts[0m:[93m225[0m:[93m4[0m - [91merror[0m[90m ts(2339): [0mProperty 'requiredOption' does not exist on type 'Command'.

[7m225[0m   .requiredOption('-f, --file <path>', 'Path for new task list file')
[7m   [0m [91m   ~~~~~~~~~~~~~~[0m
[96msrc/scripts/task-manager-cli.ts[0m:[93m175[0m:[93m4[0m - [91merror[0m[90m ts(2339): [0mProperty 'requiredOption' does not exist on type 'Command'.

[7m175[0m   .requiredOption('-f, --file <path>', 'Path to task list file')
[7m   [0m [91m   ~~~~~~~~~~~~~~[0m
[96msrc/scripts/task-manager-cli.ts[0m:[93m123[0m:[93m4[0m - [91merror[0m[90m ts(2339): [0mProperty 'requiredOption' does not exist on type 'Command'.

[7m123[0m   .requiredOption('-s, --summary <summary>', 'Test task summary')
[7m   [0m [91m   ~~~~~~~~~~~~~~[0m
[96msrc/scripts/task-manager-cli.ts[0m:[93m44[0m:[93m4[0m - [91merror[0m[90m ts(2339): [0mProperty 'requiredOption' does not exist on type 'Command'.

[7m44[0m   .requiredOption('-f, --file <path>', 'Path to task list file')
[7m  [0m [91m   ~~~~~~~~~~~~~~[0m
[96msrc/scripts/task-manager-cli.ts[0m:[93m15[0m:[93m4[0m - [91merror[0m[90m ts(2349): [0mThis expression is not callable.
  Type 'String' has no call signatures.

[7m15[0m   .name('task-manager')
[7m  [0m [91m   ~~~~[0m

[96msrc/scripts/test-breach-notification.ts[0m:[93m279[0m:[93m4[0m - [91merror[0m[90m ts(2339): [0mProperty 'argument' does not exist on type 'Command'.

[7m279[0m   .argument('<id>', 'Breach notification ID')
[7m   [0m [91m   ~~~~~~~~[0m
[96msrc/scripts/test-breach-notification.ts[0m:[93m243[0m:[93m49[0m - [91merror[0m[90m ts(7006): [0mParameter 'index' implicitly has an 'any' type.

[7m243[0m       breaches.slice(0, limit).forEach((breach, index) => {
[7m   [0m [91m                                                ~~~~~[0m
[96msrc/scripts/test-breach-notification.ts[0m:[93m243[0m:[93m41[0m - [91merror[0m[90m ts(7006): [0mParameter 'breach' implicitly has an 'any' type.

[7m243[0m       breaches.slice(0, limit).forEach((breach, index) => {
[7m   [0m [91m                                        ~~~~~~[0m
[96msrc/scripts/test-breach-notification.ts[0m:[93m222[0m:[93m11[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(options: { limit: string; }) => Promise<void>' is not assignable to parameter of type '(...args: unknown[]) => void | Promise<void>'.
  Types of parameters 'options' and 'args' are incompatible.

[7m222[0m   .action(async (options: { limit: string }) => {
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/scripts/test-breach-notification.ts[0m:[93m121[0m:[93m5[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(options: { "type": string; "severity": string; "description": string; "affected-data": string; "users": string; "detection": string; "remediation": string; }) => Promise<...>' is not assignable to parameter of type '(...args: unknown[]) => void | Promise<void>'.
  Types of parameters 'options' and 'args' are incompatible.

[7m121[0m     async (options: {
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~[0m
[7m122[0m       'type': string
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m128[0m       'remediation': string
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m129[0m     }) => {
[7m   [0m [91m~~~~~~~~~~~[0m
[96msrc/scripts/test-breach-notification.ts[0m:[93m26[0m:[93m5[0m - [91merror[0m[90m ts(2345): [0mArgument of type '(options: { type: string; severity: string; users: string; }) => Promise<void>' is not assignable to parameter of type '(...args: unknown[]) => void | Promise<void>'.
  Types of parameters 'options' and 'args' are incompatible.

[7m26[0m     async (options: { type: string; severity: string; users: string }) => {
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/scripts/test-breach-notification.ts[0m:[93m15[0m:[93m4[0m - [91merror[0m[90m ts(2349): [0mThis expression is not callable.
  Type 'String' has no call signatures.

[7m15[0m   .name('test-breach-notification')
[7m  [0m [91m   ~~~~[0m
[96msrc/scripts/test-breach-notification.ts[0m:[93m4[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"../lib/security/breach-notification"' has no exported member 'BreachNotificationSystem'.

[7m4[0m import { BreachNotificationSystem } from '../lib/security/breach-notification'
[7m [0m [91m         ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/scripts/test-evidence-system.ts[0m:[93m9[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"../lib/ai/mental-llama/evidence/EvidenceExtractor.test"' has no exported member 'runAllTests'.

[7m9[0m import { runAllTests } from '../lib/ai/mental-llama/evidence/EvidenceExtractor.test'
[7m [0m [91m         ~~~~~~~~~~~[0m

[96msrc/services/auth.service.ts[0m:[93m217[0m:[93m7[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'metadata' does not exist in type 'Partial<User>'.

[7m217[0m       metadata: profile.metadata,
[7m   [0m [91m      ~~~~~~~~[0m
[96msrc/services/auth.service.ts[0m:[93m195[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'metadata' does not exist on type 'User'.

[7m195[0m     metadata: user.metadata || {},
[7m   [0m [91m                   ~~~~~~~~[0m
[96msrc/services/auth.service.ts[0m:[93m194[0m:[93m21[0m - [91merror[0m[90m ts(2339): [0mProperty 'metadata' does not exist on type 'User'.

[7m194[0m     avatarUrl: user.metadata?.avatarUrl || user.avatarUrl || '',
[7m   [0m [91m                    ~~~~~~~~[0m
[96msrc/services/auth.service.ts[0m:[93m190[0m:[93m13[0m - [91merror[0m[90m ts(2322): [0mType '"admin" | "therapist" | "user"' is not assignable to type 'UserRole'.
  Type '"user"' is not assignable to type 'UserRole'.

[7m190[0m     roles: [user.role],
[7m   [0m [91m            ~~~~~~~~~[0m
[96msrc/services/auth.service.ts[0m:[93m189[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'metadata' does not exist on type 'User'.

[7m189[0m     fullName: user.metadata?.fullName || user.fullName || '',
[7m   [0m [91m                   ~~~~~~~~[0m
[96msrc/services/auth.service.ts[0m:[93m187[0m:[93m17[0m - [91merror[0m[90m ts(2339): [0mProperty 'metadata' does not exist on type 'User'.

[7m187[0m     image: user.metadata?.avatarUrl || user.avatarUrl || '',
[7m   [0m [91m                ~~~~~~~~[0m
[96msrc/services/auth.service.ts[0m:[93m186[0m:[93m16[0m - [91merror[0m[90m ts(2339): [0mProperty 'metadata' does not exist on type 'User'.

[7m186[0m     name: user.metadata?.fullName || user.fullName || '',
[7m   [0m [91m               ~~~~~~~~[0m
[96msrc/services/auth.service.ts[0m:[93m136[0m:[93m63[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 3.

[7m136[0m     await authService.changePassword(userId, currentPassword, newPassword)
[7m   [0m [91m                                                              ~~~~~~~~~~~[0m
[96msrc/services/auth.service.ts[0m:[93m59[0m:[93m33[0m - [91merror[0m[90m ts(2339): [0mProperty 'token' does not exist on type 'AuthResult'.

[7m59[0m     const { user: signedInUser, token } = await authService.signIn(
[7m  [0m [91m                                ~~~~~[0m
[96msrc/services/auth.service.ts[0m:[93m58[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'_user' is declared but its value is never read.

[7m58[0m     const _user = await authService.createUser(email, password)
[7m  [0m [91m          ~~~~~[0m
[96msrc/services/auth.service.ts[0m:[93m16[0m:[93m19[0m - [91merror[0m[90m ts(2339): [0mProperty 'token' does not exist on type 'AuthResult'.

[7m16[0m     const { user, token } = await authService.signIn(email, password)
[7m  [0m [91m                  ~~~~~[0m

[96msrc/services/crisisEventDb.ts[0m:[93m26[0m:[93m17[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m26[0m     process.env.NODE_ENV === 'production'
[7m  [0m [91m                ~~~~~~~~[0m
[96msrc/services/crisisEventDb.ts[0m:[93m24[0m:[93m33[0m - [91merror[0m[90m ts(4111): [0mProperty 'DATABASE_URL' comes from an index signature, so it must be accessed with ['DATABASE_URL'].

[7m24[0m   connectionString: process.env.DATABASE_URL,
[7m  [0m [91m                                ~~~~~~~~~~~~[0m
[96msrc/services/crisisEventDb.ts[0m:[93m19[0m:[93m18[0m - [91merror[0m[90m ts(4111): [0mProperty 'DATABASE_URL' comes from an index signature, so it must be accessed with ['DATABASE_URL'].

[7m19[0m if (!process.env.DATABASE_URL) {
[7m  [0m [91m                 ~~~~~~~~~~~~[0m

[96msrc/simulator/index.tsx[0m:[93m2[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'useAnonymizedMetrics' is declared but its value is never read.

[7m2[0m import { useAnonymizedMetrics } from './hooks'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/components/EmotionDetector.tsx[0m:[93m18[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'isProcessing' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m18[0m   const { isRunning, isProcessing } = useSimulatorContext()
[7m  [0m [91m                     ~~~~~~~~~~~~[0m
[96msrc/simulator/components/EmotionDetector.tsx[0m:[93m18[0m:[93m11[0m - [91merror[0m[90m ts(2339): [0mProperty 'isRunning' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m18[0m   const { isRunning, isProcessing } = useSimulatorContext()
[7m  [0m [91m          ~~~~~~~~~[0m

[96msrc/simulator/components/EmotionDisplay.tsx[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React from 'react'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/components/EmpathyMeter.tsx[0m:[93m166[0m:[93m46[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m166[0m         const trendDiff = lastTwoValues[1] - lastTwoValues[0]
[7m   [0m [91m                                             ~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/EmpathyMeter.tsx[0m:[93m166[0m:[93m27[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m166[0m         const trendDiff = lastTwoValues[1] - lastTwoValues[0]
[7m   [0m [91m                          ~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/EmpathyMeter.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useEffect, useRef } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/simulator/components/FeedbackPanel.tsx[0m:[93m117[0m:[93m42[0m - [91merror[0m[90m ts(7006): [0mParameter 'index' implicitly has an 'any' type.

[7m117[0m         {realtimeFeedback.map((feedback, index) => (
[7m   [0m [91m                                         ~~~~~[0m
[96msrc/simulator/components/FeedbackPanel.tsx[0m:[93m117[0m:[93m32[0m - [91merror[0m[90m ts(7006): [0mParameter 'feedback' implicitly has an 'any' type.

[7m117[0m         {realtimeFeedback.map((feedback, index) => (
[7m   [0m [91m                               ~~~~~~~~[0m
[96msrc/simulator/components/FeedbackPanel.tsx[0m:[93m64[0m:[93m44[0m - [91merror[0m[90m ts(2339): [0mProperty 'isConnected' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m64[0m   const { realtimeFeedback, clearFeedback, isConnected } = useSimulator()
[7m  [0m [91m                                           ~~~~~~~~~~~[0m
[96msrc/simulator/components/FeedbackPanel.tsx[0m:[93m64[0m:[93m29[0m - [91merror[0m[90m ts(2339): [0mProperty 'clearFeedback' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m64[0m   const { realtimeFeedback, clearFeedback, isConnected } = useSimulator()
[7m  [0m [91m                            ~~~~~~~~~~~~~[0m
[96msrc/simulator/components/FeedbackPanel.tsx[0m:[93m64[0m:[93m11[0m - [91merror[0m[90m ts(2339): [0mProperty 'realtimeFeedback' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m64[0m   const { realtimeFeedback, clearFeedback, isConnected } = useSimulator()
[7m  [0m [91m          ~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/components/RealTimeFeedbackPanel.tsx[0m:[93m241[0m:[93m15[0m - [91merror[0m[90m ts(2322): [0mType 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.

[7m241[0m               value={
[7m   [0m [91m              ~~~~~[0m
[96msrc/simulator/components/RealTimeFeedbackPanel.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useState, useEffect } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/simulator/components/RealTimePrompts.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useEffect, useState } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/simulator/components/ScenarioInfo.tsx[0m:[93m134[0m:[93m27[0m - [91merror[0m[90m ts(7006): [0mParameter 'word' implicitly has an 'any' type.

[7m134[0m                     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
[7m   [0m [91m                          ~~~~[0m
[96msrc/simulator/components/ScenarioInfo.tsx[0m:[93m127[0m:[93m43[0m - [91merror[0m[90m ts(7006): [0mParameter 'skill' implicitly has an 'any' type.

[7m127[0m               {scenario.targetSkills.map((skill) => (
[7m   [0m [91m                                          ~~~~~[0m
[96msrc/simulator/components/ScenarioInfo.tsx[0m:[93m117[0m:[93m52[0m - [91merror[0m[90m ts(7006): [0mParameter 'approach' implicitly has an 'any' type.

[7m117[0m                 {scenario.suggestedApproaches.map((approach) => (
[7m   [0m [91m                                                   ~~~~~~~~[0m
[96msrc/simulator/components/ScenarioInfo.tsx[0m:[93m105[0m:[93m47[0m - [91merror[0m[90m ts(7006): [0mParameter 'issue' implicitly has an 'any' type.

[7m105[0m               {scenario.presentingIssues.map((issue) => (
[7m   [0m [91m                                              ~~~~~[0m
[96msrc/simulator/components/ScenarioInfo.tsx[0m:[93m55[0m:[93m16[0m - [91merror[0m[90m ts(7053): [0mElement implicitly has an 'any' type because expression of type 'any' can't be used to index type 'Record<TherapeuticDomain, string>'.

[7m55[0m               {domainLabels[scenario.domain]}
[7m  [0m [91m               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/ScenarioInfo.tsx[0m:[93m11[0m:[93m3[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'cognitive_behavioral' does not exist in type 'Record<TherapeuticDomain, string>'.

[7m11[0m   cognitive_behavioral: 'Cognitive Behavioral Therapy',
[7m  [0m [91m  ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/ScenarioInfo.tsx[0m:[93m2[0m:[93m15[0m - [91merror[0m[90m ts(2305): [0mModule '"../types"' has no exported member 'SimulationScenario'.

[7m2[0m import type { SimulationScenario, TherapeuticDomain } from '../types'
[7m [0m [91m              ~~~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/components/ScenarioSelector.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React, { useState, useMemo } from 'react'
[7m [0m [91m       ~~~~~[0m

[96msrc/simulator/components/SimulationContainer.tsx[0m:[93m79[0m:[93m30[0m - [91merror[0m[90m ts(7006): [0mParameter 'err' implicitly has an 'any' type.

[7m79[0m       endSimulation().catch((err) =>
[7m  [0m [91m                             ~~~[0m
[96msrc/simulator/components/SimulationContainer.tsx[0m:[93m72[0m:[93m17[0m - [91merror[0m[90m ts(7006): [0mParameter 'error' implicitly has an 'any' type.

[7m72[0m         .catch((error) => {
[7m  [0m [91m                ~~~~~[0m
[96msrc/simulator/components/SimulationContainer.tsx[0m:[93m37[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'isConnected' does not exist on type 'SimulatorState'.

[7m37[0m     isConnected,
[7m  [0m [91m    ~~~~~~~~~~~[0m
[96msrc/simulator/components/SimulationContainer.tsx[0m:[93m36[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'transcribedText' does not exist on type 'SimulatorState'.

[7m36[0m     transcribedText,
[7m  [0m [91m    ~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/SimulationContainer.tsx[0m:[93m35[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'endSimulation' does not exist on type 'SimulatorState'.

[7m35[0m     endSimulation,
[7m  [0m [91m    ~~~~~~~~~~~~~[0m
[96msrc/simulator/components/SimulationContainer.tsx[0m:[93m34[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'startSimulation' does not exist on type 'SimulatorState'.

[7m34[0m     startSimulation,
[7m  [0m [91m    ~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/SimulationContainer.tsx[0m:[93m33[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'realtimeFeedback' does not exist on type 'SimulatorState'.

[7m33[0m     realtimeFeedback,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/SimulationContainer.tsx[0m:[93m31[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'currentScenario' does not exist on type 'SimulatorState'.

[7m31[0m     currentScenario,
[7m  [0m [91m    ~~~~~~~~~~~~~~~[0m

[96msrc/simulator/components/SimulationControls.tsx[0m:[93m21[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'isConnected' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m21[0m     isConnected,
[7m  [0m [91m    ~~~~~~~~~~~[0m
[96msrc/simulator/components/SimulationControls.tsx[0m:[93m20[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'transcribedText' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m20[0m     transcribedText,
[7m  [0m [91m    ~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/SimulationControls.tsx[0m:[93m19[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'toggleEnhancedModels' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m19[0m     toggleEnhancedModels,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/SimulationControls.tsx[0m:[93m18[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'isUsingEnhancedModels' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m18[0m     isUsingEnhancedModels,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/SimulationControls.tsx[0m:[93m17[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'toggleSpeechRecognition' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m17[0m     toggleSpeechRecognition,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/SimulationControls.tsx[0m:[93m16[0m:[93m5[0m - [91merror[0m[90m ts(2339): [0mProperty 'isSpeechRecognitionEnabled' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m16[0m     isSpeechRecognitionEnabled,
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/components/SpeechPatternDisplay.tsx[0m:[93m22[0m:[93m30[0m - [91merror[0m[90m ts(7006): [0mParameter 'pattern' implicitly has an 'any' type.

[7m22[0m         {speechPatterns.map((pattern) => (
[7m  [0m [91m                             ~~~~~~~[0m
[96msrc/simulator/components/SpeechPatternDisplay.tsx[0m:[93m5[0m:[93m11[0m - [91merror[0m[90m ts(2339): [0mProperty 'speechPatterns' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m5[0m   const { speechPatterns } = useSimulator()
[7m [0m [91m          ~~~~~~~~~~~~~~[0m

[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m246[0m:[93m13[0m - [91merror[0m[90m ts(7030): [0mNot all code paths return a value.

[7m246[0m   useEffect(() => {
[7m   [0m [91m            ~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m194[0m:[93m34[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useCallback'.

[7m194[0m   const handleSignalingMessage = useCallback(
[7m   [0m [91m                                 ~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m177[0m:[93m30[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useCallback'.

[7m177[0m   const createAndSendOffer = useCallback(async () => {
[7m   [0m [91m                             ~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m173[0m:[93m5[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'createAndSendOffer' used before its declaration.

[7m173[0m     createAndSendOffer,
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m147[0m:[93m35[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useCallback'.

[7m147[0m   const handleConnectionFailure = useCallback(async () => {
[7m   [0m [91m                                  ~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m147[0m:[93m9[0m - [91merror[0m[90m ts(7022): [0m'handleConnectionFailure' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer.

[7m147[0m   const handleConnectionFailure = useCallback(async () => {
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m112[0m:[93m28[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useCallback'.

[7m112[0m   const setupMediaStream = useCallback(async () => {
[7m   [0m [91m                           ~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m109[0m:[93m51[0m - [91merror[0m[90m ts(2448): [0mBlock-scoped variable 'handleConnectionFailure' used before its declaration.

[7m109[0m   }, [sessionId, userId, onConnectionStateChange, handleConnectionFailure])
[7m   [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m58[0m:[93m36[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'useCallback'.

[7m58[0m   const initializePeerConnection = useCallback(() => {
[7m  [0m [91m                                   ~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m58[0m:[93m9[0m - [91merror[0m[90m ts(7022): [0m'initializePeerConnection' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer.

[7m58[0m   const initializePeerConnection = useCallback(() => {
[7m  [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m32[0m:[93m29[0m - [91merror[0m[90m ts(4111): [0mProperty 'TURN_SERVER_PASSWORD' comes from an index signature, so it must be accessed with ['TURN_SERVER_PASSWORD'].

[7m32[0m     credential: process.env.TURN_SERVER_PASSWORD,
[7m  [0m [91m                            ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m31[0m:[93m27[0m - [91merror[0m[90m ts(4111): [0mProperty 'TURN_SERVER_USERNAME' comes from an index signature, so it must be accessed with ['TURN_SERVER_USERNAME'].

[7m31[0m     username: process.env.TURN_SERVER_USERNAME,
[7m  [0m [91m                          ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/VideoDisplay.tsx[0m:[93m28[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'TURN_SERVER_URL' comes from an index signature, so it must be accessed with ['TURN_SERVER_URL'].

[7m28[0m       process.env.TURN_SERVER_URL || 'turn:turn.pixelatedempathy.com:3478',
[7m  [0m [91m                  ~~~~~~~~~~~~~~~[0m

[96msrc/simulator/components/index.ts[0m:[93m11[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"./ScenarioSelector"' has no exported member 'default'.

[7m11[0m export { default as ScenarioSelector } from './ScenarioSelector'
[7m  [0m [91m         ~~~~~~~[0m
[96msrc/simulator/components/index.ts[0m:[93m6[0m:[93m10[0m - [91merror[0m[90m ts(2305): [0mModule '"./SimulationContainer"' has no exported member 'default'.

[7m6[0m export { default as SimulationContainer } from './SimulationContainer'
[7m [0m [91m         ~~~~~~~[0m

[96msrc/simulator/components/__tests__/EmotionAnalysis.test.tsx[0m:[93m15[0m:[93m28[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ valence: number; energy: number; dominance: number; }' is not assignable to parameter of type 'boolean'.

[7m 15[0m         onAnalysisComplete({
[7m   [0m [91m                           ~[0m
[7m 16[0m           valence: 0.8,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m 18[0m           dominance: 0.7,
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m 19[0m         })
[7m   [0m [91m~~~~~~~~~[0m

[96msrc/simulator/components/__tests__/TechniqueDisplay.test.tsx[0m:[93m39[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ name: string; confidence: number; }[]' is not assignable to parameter of type 'null | undefined'.

[7m39[0m     renderWithContext(mockTechniques)
[7m  [0m [91m                      ~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/__tests__/TechniqueDisplay.test.tsx[0m:[93m29[0m:[93m23[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ name: string; confidence: number; }[]' is not assignable to parameter of type 'null | undefined'.

[7m29[0m     renderWithContext(mockTechniques)
[7m  [0m [91m                      ~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/__tests__/TechniqueDisplay.test.tsx[0m:[93m14[0m:[93m40[0m - [91merror[0m[90m ts(2322): [0mType 'null' is not assignable to type 'DetectedTechnique[] | undefined'.

[7m14[0m     <SimulatorProvider initialState={{ detectedTechniques: techniques }}>
[7m  [0m [91m                                       ~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/components/__tests__/TechniqueDisplay.test.tsx[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React from 'react'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/hooks/useEmotionDetection.ts[0m:[93m97[0m:[93m44[0m - [91merror[0m[90m ts(7006): [0mParameter 'emotion' implicitly has an 'any' type.

[7m97[0m             analysis.emotions.reduce((sum, emotion) => {
[7m  [0m [91m                                           ~~~~~~~[0m
[96msrc/simulator/hooks/useEmotionDetection.ts[0m:[93m97[0m:[93m39[0m - [91merror[0m[90m ts(7006): [0mParameter 'sum' implicitly has an 'any' type.

[7m97[0m             analysis.emotions.reduce((sum, emotion) => {
[7m  [0m [91m                                      ~~~[0m
[96msrc/simulator/hooks/useEmotionDetection.ts[0m:[93m76[0m:[93m44[0m - [91merror[0m[90m ts(7006): [0mParameter 'emotion' implicitly has an 'any' type.

[7m76[0m             analysis.emotions.reduce((sum, emotion) => {
[7m  [0m [91m                                           ~~~~~~~[0m
[96msrc/simulator/hooks/useEmotionDetection.ts[0m:[93m76[0m:[93m39[0m - [91merror[0m[90m ts(7006): [0mParameter 'sum' implicitly has an 'any' type.

[7m76[0m             analysis.emotions.reduce((sum, emotion) => {
[7m  [0m [91m                                      ~~~[0m
[96msrc/simulator/hooks/useEmotionDetection.ts[0m:[93m55[0m:[93m44[0m - [91merror[0m[90m ts(7006): [0mParameter 'emotion' implicitly has an 'any' type.

[7m55[0m             analysis.emotions.reduce((sum, emotion) => {
[7m  [0m [91m                                           ~~~~~~~[0m
[96msrc/simulator/hooks/useEmotionDetection.ts[0m:[93m55[0m:[93m39[0m - [91merror[0m[90m ts(7006): [0mParameter 'sum' implicitly has an 'any' type.

[7m55[0m             analysis.emotions.reduce((sum, emotion) => {
[7m  [0m [91m                                      ~~~[0m
[96msrc/simulator/hooks/useEmotionDetection.ts[0m:[93m19[0m:[93m36[0m - [91merror[0m[90m ts(4111): [0mProperty 'EMOTION_LLAMA_API_KEY' comes from an index signature, so it must be accessed with ['EMOTION_LLAMA_API_KEY'].

[7m19[0m         const apiKey = process.env.EMOTION_LLAMA_API_KEY
[7m  [0m [91m                                   ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useEmotionDetection.ts[0m:[93m18[0m:[93m37[0m - [91merror[0m[90m ts(4111): [0mProperty 'EMOTION_LLAMA_API_URL' comes from an index signature, so it must be accessed with ['EMOTION_LLAMA_API_URL'].

[7m18[0m         const baseUrl = process.env.EMOTION_LLAMA_API_URL
[7m  [0m [91m                                    ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useEmotionDetection.ts[0m:[93m12[0m:[93m11[0m - [91merror[0m[90m ts(2339): [0mProperty 'updateEmotionState' does not exist on type '{ state: SimulatorState; dispatch: Dispatch<SimulatorAction>; }'.

[7m12[0m   const { updateEmotionState } = useSimulatorContext()
[7m  [0m [91m          ~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useEmotionDetection.ts[0m:[93m2[0m:[93m38[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/providers/EmotionLlamaProvider' or its corresponding type declarations.

[7m2[0m import { EmotionLlamaProvider } from '../../lib/ai/providers/EmotionLlamaProvider'
[7m [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/hooks/useSimulator.ts[0m:[93m322[0m:[93m3[0m - [91merror[0m[90m ts(6133): [0m'response' is declared but its value is never read.

[7m322[0m   response: string,
[7m   [0m [91m  ~~~~~~~~[0m
[96msrc/simulator/hooks/useSimulator.ts[0m:[93m312[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'TherapeuticTechnique | undefined' is not assignable to type 'TherapeuticTechnique'.
  Type 'undefined' is not assignable to type 'TherapeuticTechnique'.

[7m312[0m     unusedRecommendedTechniques[
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m313[0m       Math.floor(Math.random() * unusedRecommendedTechniques.length)
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m314[0m     ],
[7m   [0m [91m~~~~~[0m
[96msrc/simulator/hooks/useSimulator.ts[0m:[93m307[0m:[93m13[0m - [91merror[0m[90m ts(2322): [0mType 'TherapeuticTechnique | undefined' is not assignable to type 'TherapeuticTechnique'.
  Type 'undefined' is not assignable to type 'TherapeuticTechnique'.

[7m307[0m     return [otherTechniques[Math.floor(Math.random() * otherTechniques.length)]]
[7m   [0m [91m            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSimulator.ts[0m:[93m275[0m:[93m43[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m275[0m       return `While your approach using ${techniques[0].replace(
[7m   [0m [91m                                          ~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSimulator.ts[0m:[93m265[0m:[93m48[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m265[0m       return `You're on the right track with ${techniques[0].replace(
[7m   [0m [91m                                               ~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSimulator.ts[0m:[93m254[0m:[93m54[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m254[0m       return `Your response shows good effort with ${techniques[0].replace(
[7m   [0m [91m                                                     ~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSimulator.ts[0m:[93m251[0m:[93m33[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m251[0m       return `Great job using ${techniques[0].replace(/_/g, ' ')}! This is particularly effective for this client's ${scenario.domain} concerns. Your approach demonstrates attunement to the client's needs.`
[7m   [0m [91m                                ~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSimulator.ts[0m:[93m41[0m:[93m26[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m41[0m         const scenario = await getScenarioById(scenarioId)
[7m  [0m [93m                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/hooks/useSpeechRecognition.ts[0m:[93m221[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'null' is not assignable to type '() => void'.

[7m221[0m         recognitionRef.current.onend = null
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSpeechRecognition.ts[0m:[93m220[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'null' is not assignable to type '(event: SpeechRecognitionErrorEvent) => void'.

[7m220[0m         recognitionRef.current.onerror = null
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSpeechRecognition.ts[0m:[93m219[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType 'null' is not assignable to type '(event: SpeechRecognitionEvent) => void'.

[7m219[0m         recognitionRef.current.onresult = null
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSpeechRecognition.ts[0m:[93m205[0m:[93m9[0m - [91merror[0m[90m ts(18047): [0m'recognitionRef.current' is possibly 'null'.

[7m205[0m         recognitionRef.current.start()
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSpeechRecognition.ts[0m:[93m142[0m:[93m13[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m142[0m         if (event.results[i].isFinal) {
[7m   [0m [91m            ~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSpeechRecognition.ts[0m:[93m140[0m:[93m32[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m140[0m         const { transcript } = event.results[i][0]
[7m   [0m [91m                               ~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSpeechRecognition.ts[0m:[93m140[0m:[93m17[0m - [91merror[0m[90m ts(2339): [0mProperty 'transcript' does not exist on type '{ transcript: string; } | undefined'.

[7m140[0m         const { transcript } = event.results[i][0]
[7m   [0m [91m                ~~~~~~~~~~[0m
[96msrc/simulator/hooks/useSpeechRecognition.ts[0m:[93m139[0m:[93m57[0m - [91merror[0m[90m ts(2339): [0mProperty 'length' does not exist on type '{ [index: number]: { [index: number]: { transcript: string; }; isFinal: boolean; }; }'.

[7m139[0m       for (let i = event.resultIndex; i < event.results.length; i++) {
[7m   [0m [91m                                                        ~~~~~~[0m
[96msrc/simulator/hooks/useSpeechRecognition.ts[0m:[93m127[0m:[93m5[0m - [91merror[0m[90m ts(2322): [0mType 'SpeechRecognitionInterface | null' is not assignable to type 'SpeechRecognition | null'.
  Type 'SpeechRecognitionInterface' is missing the following properties from type 'SpeechRecognition': onresult, onerror, onend

[7m127[0m     recognitionRef.current = createSpeechRecognition(enhancedConfig)
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/services/FeedbackService.ts[0m:[93m721[0m:[93m7[0m - [91merror[0m[90m ts(18046): [0m'prediction' is of type 'unknown'.

[7m721[0m       prediction.dispose()
[7m   [0m [91m      ~~~~~~~~~~[0m
[96msrc/simulator/services/FeedbackService.ts[0m:[93m717[0m:[93m36[0m - [91merror[0m[90m ts(18046): [0m'prediction' is of type 'unknown'.

[7m717[0m       const predictionData = await prediction.data()
[7m   [0m [91m                                   ~~~~~~~~~~[0m
[96msrc/simulator/services/FeedbackService.ts[0m:[93m716[0m:[93m46[0m - [91merror[0m[90m ts(2339): [0mProperty 'predict' does not exist on type '{}'.

[7m716[0m       const prediction = this.techniqueModel.predict(features) as unknown // tf.Tensor
[7m   [0m [91m                                             ~~~~~~~[0m
[96msrc/simulator/services/FeedbackService.ts[0m:[93m13[0m:[93m41[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/mental-llama/MentalLLaMAAdapter' or its corresponding type declarations.

[7m13[0m import type { MentalLLaMAAdapter } from '../../lib/ai/mental-llama/MentalLLaMAAdapter'
[7m  [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/services/WebRTCService.ts[0m:[93m475[0m:[93m17[0m - [91merror[0m[90m ts(6133): [0m'handleReceivedIceCandidate' is declared but its value is never read.

[7m475[0m   private async handleReceivedIceCandidate(
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/services/WebRTCService.ts[0m:[93m320[0m:[93m9[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m320[0m         event.streams[0].getTracks().forEach((track) => {
[7m   [0m [91m        ~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/services/WebRTCService.ts[0m:[93m224[0m:[93m16[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m224[0m         sum += dataArray[i]
[7m   [0m [91m               ~~~~~~~~~~~~[0m
[96msrc/simulator/services/WebRTCService.ts[0m:[93m21[0m:[93m11[0m - [91merror[0m[90m ts(6133): [0m'lastIceCandidate' is declared but its value is never read.

[7m21[0m   private lastIceCandidate: RTCIceCandidate | null = null
[7m  [0m [91m          ~~~~~~~~~~~~~~~~[0m

[96msrc/simulator/utils/scenarios.ts[0m:[93m215[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'Scenario | undefined' is not assignable to type 'Scenario | null'.
  Type 'undefined' is not assignable to type 'Scenario | null'.

[7m215[0m     : availableScenarios[Math.floor(Math.random() * availableScenarios.length)]
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/simulator/utils/scenarios.ts[0m:[93m214[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'Scenario | undefined' is not assignable to type 'Scenario | null'.
  Type 'undefined' is not assignable to type 'Scenario | null'.

[7m214[0m     ? matchingDifficulty[Math.floor(Math.random() * matchingDifficulty.length)]
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/tests/browser-compatibility.test.ts[0m:[93m55[0m:[93m46[0m - [91merror[0m[90m ts(4111): [0mProperty 'chromium' comes from an index signature, so it must be accessed with ['chromium'].

[7m55[0m             ...compatibilityResults.browsers.chromium?.features,
[7m  [0m [91m                                             ~~~~~~~~[0m
[96msrc/tests/browser-compatibility.test.ts[0m:[93m53[0m:[93m44[0m - [91merror[0m[90m ts(4111): [0mProperty 'chromium' comes from an index signature, so it must be accessed with ['chromium'].

[7m53[0m           ...compatibilityResults.browsers.chromium,
[7m  [0m [91m                                           ~~~~~~~~[0m
[96msrc/tests/browser-compatibility.test.ts[0m:[93m52[0m:[93m39[0m - [91merror[0m[90m ts(4111): [0mProperty 'chromium' comes from an index signature, so it must be accessed with ['chromium'].

[7m52[0m         compatibilityResults.browsers.chromium = {
[7m  [0m [91m                                      ~~~~~~~~[0m
[96msrc/tests/browser-compatibility.test.ts[0m:[93m52[0m:[93m9[0m - [91merror[0m[90m ts(2322): [0mType '{ features: { [x: string]: boolean; }; pages?: Record<string, PageResult> | undefined; }' is not assignable to type '{ pages: Record<string, PageResult>; features: Record<string, boolean>; }'.
  Types of property 'pages' are incompatible.

[7m52[0m         compatibilityResults.browsers.chromium = {
[7m  [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/tests/browser-compatibility.test.ts[0m:[93m33[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'SKIP_BROWSER_COMPAT_TESTS' comes from an index signature, so it must be accessed with ['SKIP_BROWSER_COMPAT_TESTS'].

[7m33[0m const skipTests = process.env.SKIP_BROWSER_COMPAT_TESTS === 'true'
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/tests/cross-browser-compatibility.test.ts[0m:[93m63[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType '{ features: { [x: string]: boolean; }; pages?: Record<string, PageResult> | undefined; }' is not assignable to type '{ pages: Record<string, PageResult>; features: Record<string, boolean>; }'.
  Types of property 'pages' are incompatible.

[7m63[0m       compatibilityResults.browsers['chromium'] = {
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/tests/cross-browser-compatibility.test.ts[0m:[93m42[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'SKIP_BROWSER_COMPAT_TESTS' comes from an index signature, so it must be accessed with ['SKIP_BROWSER_COMPAT_TESTS'].

[7m42[0m const skipTests = process.env.SKIP_BROWSER_COMPAT_TESTS === 'true'
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/tests/crypto.test.ts[0m:[93m803[0m:[93m30[0m - [91merror[0m[90m ts(4111): [0mProperty 'PATIENT_ID' comes from an index signature, so it must be accessed with ['PATIENT_ID'].

[7m803[0m       patientId: process.env.PATIENT_ID || 'example-patient-id',
[7m   [0m [91m                             ~~~~~~~~~~[0m
[96msrc/tests/crypto.test.ts[0m:[93m731[0m:[93m13[0m - [91merror[0m[90m ts(6133): [0m'encryptedData' is declared but its value is never read.

[7m731[0m             encryptedData: string,
[7m   [0m [91m            ~~~~~~~~~~~~~[0m
[96msrc/tests/crypto.test.ts[0m:[93m728[0m:[93m13[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m728[0m             return parts[parts.length - 1]
[7m   [0m [91m            ~~~~~~[0m
[96msrc/tests/crypto.test.ts[0m:[93m414[0m:[93m43[0m - [91merror[0m[90m ts(4111): [0mProperty 'SKIP_CRYPTO_ROTATION_TEST' comes from an index signature, so it must be accessed with ['SKIP_CRYPTO_ROTATION_TEST'].

[7m414[0m   const skipKeyRotationTest = process.env.SKIP_CRYPTO_ROTATION_TEST === 'true'
[7m   [0m [91m                                          ~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/tests/crypto.test.ts[0m:[93m133[0m:[93m30[0m - [91merror[0m[90m ts(18048): [0m'versionString' is possibly 'undefined'.

[7m133[0m     const version = parseInt(versionString.substring(1), 10)
[7m   [0m [91m                             ~~~~~~~~~~~~~[0m
[96msrc/tests/crypto.test.ts[0m:[93m25[0m:[93m36[0m - [91merror[0m[90m ts(4111): [0mProperty 'SKIP_FHE_TESTS' comes from an index signature, so it must be accessed with ['SKIP_FHE_TESTS'].

[7m25[0m const SKIP_FHE_TESTS = process.env.SKIP_FHE_TESTS === 'true'
[7m  [0m [91m                                   ~~~~~~~~~~~~~~[0m

[96msrc/tests/mobile-compatibility.test.ts[0m:[93m91[0m:[93m47[0m - [91merror[0m[90m ts(2339): [0mProperty 'name' does not exist on type 'DeviceDescriptor'.

[7m91[0m         path: `./test-results/mobile/${device.name.replace(/\s+/g, '-')}-home.png`,
[7m  [0m [91m                                              ~~~~[0m
[96msrc/tests/mobile-compatibility.test.ts[0m:[93m56[0m:[93m55[0m - [91merror[0m[90m ts(2339): [0mProperty 'name' does not exist on type 'DeviceDescriptor'.

[7m56[0m     test(`Homepage should render properly on ${device.name}`, async ({
[7m  [0m [91m                                                      ~~~~[0m
[96msrc/tests/mobile-compatibility.test.ts[0m:[93m50[0m:[93m31[0m - [91merror[0m[90m ts(4111): [0mProperty 'SKIP_BROWSER_COMPAT_TESTS' comes from an index signature, so it must be accessed with ['SKIP_BROWSER_COMPAT_TESTS'].

[7m50[0m const skipTests = process.env.SKIP_BROWSER_COMPAT_TESTS === 'true'
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/tests/performance.test.ts[0m:[93m396[0m:[93m46[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m396[0m           await fs.readFile(join(resultsDir, jsonFiles[0]), 'utf-8'),
[7m   [0m [91m                                             ~~~~~~~~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m345[0m:[93m19[0m - [91merror[0m[90m ts(7031): [0mBinding element 'data' implicitly has an 'any' type.

[7m345[0m           ({ url, data }) => {
[7m   [0m [91m                  ~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m345[0m:[93m14[0m - [91merror[0m[90m ts(7031): [0mBinding element 'url' implicitly has an 'any' type.

[7m345[0m           ({ url, data }) => {
[7m   [0m [91m             ~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m327[0m:[93m51[0m - [91merror[0m[90m ts(7006): [0mParameter '_request' implicitly has an 'any' type.

[7m327[0m       await page.route(`**${path}`, async (route, _request) => {
[7m   [0m [91m                                                  ~~~~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m327[0m:[93m44[0m - [91merror[0m[90m ts(7006): [0mParameter 'route' implicitly has an 'any' type.

[7m327[0m       await page.route(`**${path}`, async (route, _request) => {
[7m   [0m [91m                                           ~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m306[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m306[0m           results.pages[name].FID = inputDelay
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m239[0m:[93m36[0m - [91merror[0m[90m ts(7006): [0mParameter 'fn' implicitly has an 'any' type.

[7m239[0m             functions.reduce((sum, fn) => sum + (fn.ranges[0]?.count || 0), 0)
[7m   [0m [91m                                   ~~[0m
[96msrc/tests/performance.test.ts[0m:[93m239[0m:[93m31[0m - [91merror[0m[90m ts(7006): [0mParameter 'sum' implicitly has an 'any' type.

[7m239[0m             functions.reduce((sum, fn) => sum + (fn.ranges[0]?.count || 0), 0)
[7m   [0m [91m                              ~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m235[0m:[93m59[0m - [91merror[0m[90m ts(7006): [0mParameter 'entry' implicitly has an 'any' type.

[7m235[0m         const jsExecutionTime = jsCoverage.reduce((total, entry) => {
[7m   [0m [91m                                                          ~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m235[0m:[93m52[0m - [91merror[0m[90m ts(7006): [0mParameter 'total' implicitly has an 'any' type.

[7m235[0m         const jsExecutionTime = jsCoverage.reduce((total, entry) => {
[7m   [0m [91m                                                   ~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m232[0m:[93m19[0m - [91merror[0m[90m ts(7006): [0mParameter 'entry' implicitly has an 'any' type.

[7m232[0m           (total, entry) => total + (entry.source?.length || 0),
[7m   [0m [91m                  ~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m232[0m:[93m12[0m - [91merror[0m[90m ts(7006): [0mParameter 'total' implicitly has an 'any' type.

[7m232[0m           (total, entry) => total + (entry.source?.length || 0),
[7m   [0m [91m           ~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m147[0m:[93m33[0m - [91merror[0m[90m ts(4111): [0mProperty 'SKIP_PERFORMANCE_TESTS' comes from an index signature, so it must be accessed with ['SKIP_PERFORMANCE_TESTS'].

[7m147[0m   const skipTests = process.env.SKIP_PERFORMANCE_TESTS === 'true'
[7m   [0m [91m                                ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m125[0m:[93m32[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m125[0m       environment: process.env.NODE_ENV || 'development',
[7m   [0m [91m                               ~~~~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m4[0m:[93m26[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'playwright' or its corresponding type declarations.

[7m4[0m import { chromium } from 'playwright'
[7m [0m [91m                         ~~~~~~~~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m1[0m:[93m36[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'playwright' or its corresponding type declarations.

[7m1[0m import type { Browser, Page } from 'playwright'
[7m [0m [91m                                   ~~~~~~~~~~~~[0m
[96msrc/tests/performance.test.ts[0m:[93m345[0m:[93m11[0m - [93mwarning[0m[90m ts(80006): [0mThis may be converted to an async function.

[7m345[0m           ({ url, data }) => {
[7m   [0m [93m          ~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/tests/simple-browser-compatibility.test.ts[0m:[93m102[0m:[93m37[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | null' is not assignable to parameter of type 'string'.
  Type 'null' is not assignable to type 'string'.

[7m102[0m     const featuresJson = JSON.parse(content)
[7m   [0m [91m                                    ~~~~~~~[0m
[96msrc/tests/simple-browser-compatibility.test.ts[0m:[93m88[0m:[93m21[0m - [91merror[0m[90m ts(4111): [0mProperty 'CI' comes from an index signature, so it must be accessed with ['CI'].

[7m88[0m     if (process.env.CI) {
[7m  [0m [91m                    ~~[0m
[96msrc/tests/simple-browser-compatibility.test.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m ts(7006): [0mParameter 'directory' implicitly has an 'any' type.

[7m5[0m function ensureDirectoryExists(directory) {
[7m [0m [91m                               ~~~~~~~~~[0m

[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m616[0m:[93m9[0m - [91merror[0m[90m ts(2739): [0mType 'AIService' is missing the following properties from type 'AIService': createStreamingChatCompletion, dispose

[7m616[0m         aiService: mockAIService,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m604[0m:[93m9[0m - [91merror[0m[90m ts(2739): [0mType 'AIService' is missing the following properties from type 'AIService': createStreamingChatCompletion, dispose

[7m604[0m         aiService: mockAIService,
[7m   [0m [91m        ~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m593[0m:[93m23[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m593[0m         crisisService.detectBatch([
[7m   [0m [91m                      ~~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m552[0m:[93m25[0m - [91merror[0m[90m ts(2339): [0mProperty 'severity' does not exist on type 'CrisisDetectionResult'.

[7m552[0m       expect(results[1].severity).toBe('none')
[7m   [0m [91m                        ~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m552[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m552[0m       expect(results[1].severity).toBe('none')
[7m   [0m [91m             ~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m551[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m551[0m       expect(results[1].isCrisis).toBe(false)
[7m   [0m [91m             ~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m550[0m:[93m25[0m - [91merror[0m[90m ts(2339): [0mProperty 'severity' does not exist on type 'CrisisDetectionResult'.

[7m550[0m       expect(results[0].severity).toBe('high')
[7m   [0m [91m                        ~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m550[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m550[0m       expect(results[0].severity).toBe('high')
[7m   [0m [91m             ~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m549[0m:[93m14[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m549[0m       expect(results[0].isCrisis).toBe(true)
[7m   [0m [91m             ~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m542[0m:[93m43[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m542[0m       const results = await crisisService.detectBatch([
[7m   [0m [91m                                          ~~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m462[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ sensitivityLevel: "low"; }' is not assignable to parameter of type 'CrisisDetectionOptions'.
  Type '{ sensitivityLevel: "low"; }' is missing the following properties from type 'CrisisDetectionOptions': userId, source

[7m462[0m         { sensitivityLevel: 'low' },
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m412[0m:[93m9[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ sensitivityLevel: "high"; }' is not assignable to parameter of type 'CrisisDetectionOptions'.
  Type '{ sensitivityLevel: "high"; }' is missing the following properties from type 'CrisisDetectionOptions': userId, source

[7m412[0m         { sensitivityLevel: 'high' },
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m374[0m:[93m34[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m374[0m       await expect(crisisService.detectCrisis('Test text')).rejects.toThrow(
[7m   [0m [91m                                 ~~~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m365[0m:[93m34[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m365[0m       await expect(crisisService.detectCrisis('Test text')).rejects.toThrow()
[7m   [0m [91m                                 ~~~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m330[0m:[93m42[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m330[0m       const result = await crisisService.detectCrisis(
[7m   [0m [91m                                         ~~~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m281[0m:[93m42[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m281[0m       const result = await crisisService.detectCrisis(
[7m   [0m [91m                                         ~~~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m232[0m:[93m42[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m232[0m       const result = await crisisService.detectCrisis(
[7m   [0m [91m                                         ~~~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m168[0m:[93m42[0m - [91merror[0m[90m ts(2554): [0mExpected 2 arguments, but got 1.

[7m168[0m       const result = await crisisService.detectCrisis(
[7m   [0m [91m                                         ~~~~~~~~~~~~[0m
[96msrc/tests/ai/crisis-detection.test.ts[0m:[93m130[0m:[93m7[0m - [91merror[0m[90m ts(2739): [0mType 'AIService' is missing the following properties from type 'AIService': createStreamingChatCompletion, dispose

[7m130[0m       aiService: mockAIService,
[7m   [0m [91m      ~~~~~~~~~[0m

[96msrc/tests/components/demo/ScenarioGenerationDemo.test.tsx[0m:[93m3[0m:[93m36[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../components/demo/ScenarioGenerationDemo' or its corresponding type declarations.

[7m3[0m import ScenarioGenerationDemo from '../components/demo/ScenarioGenerationDemo'
[7m [0m [91m                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/tests/components/demo/ScenarioGenerationDemo.test.tsx[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React from 'react'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/tests/components/ui/ProgressBar.test.tsx[0m:[93m3[0m:[93m25[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../components/ui/progress-bar' or its corresponding type declarations.

[7m3[0m import ProgressBar from '../components/ui/progress-bar'
[7m [0m [91m                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/tests/components/ui/ProgressBar.test.tsx[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m ts(6133): [0m'React' is declared but its value is never read.

[7m1[0m import React from 'react'
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/utils/accessibilityPolyfills.ts[0m:[93m170[0m:[93m50[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m170[0m if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
[7m   [0m [91m                                                 ~~~~~~~~[0m
[96msrc/utils/accessibilityPolyfills.ts[0m:[93m95[0m:[93m52[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m95[0m   if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
[7m  [0m [91m                                                   ~~~~~~~~[0m
[96msrc/utils/accessibilityPolyfills.ts[0m:[93m29[0m:[93m47[0m - [91merror[0m[90m ts(2551): [0mProperty 'activeElemen' does not exist on type 'Document'. Did you mean 'activeElement'?

[7m29[0m         this.previousActiveElement = document.activeElemen
[7m  [0m [91m                                              ~~~~~~~~~~~~[0m

[96msrc/utils/accessibilityTestUtils.ts[0m:[93m696[0m:[93m45[0m - [91merror[0m[90m ts(18048): [0m'B' is possibly 'undefined'.

[7m696[0m   return 0.2126 * R + 0.7152 * G + 0.0722 * B
[7m   [0m [91m                                            ~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m696[0m:[93m32[0m - [91merror[0m[90m ts(18048): [0m'G' is possibly 'undefined'.

[7m696[0m   return 0.2126 * R + 0.7152 * G + 0.0722 * B
[7m   [0m [91m                               ~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m696[0m:[93m19[0m - [91merror[0m[90m ts(18048): [0m'R' is possibly 'undefined'.

[7m696[0m   return 0.2126 * R + 0.7152 * G + 0.0722 * B
[7m   [0m [91m                  ~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m660[0m:[93m16[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m660[0m       parseInt(rgbaMatch[3], 10),
[7m   [0m [91m               ~~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m659[0m:[93m16[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m659[0m       parseInt(rgbaMatch[2], 10),
[7m   [0m [91m               ~~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m658[0m:[93m16[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m658[0m       parseInt(rgbaMatch[1], 10),
[7m   [0m [91m               ~~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m648[0m:[93m16[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m648[0m       parseInt(rgbMatch[3], 10),
[7m   [0m [91m               ~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m647[0m:[93m16[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m647[0m       parseInt(rgbMatch[2], 10),
[7m   [0m [91m               ~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m646[0m:[93m16[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m646[0m       parseInt(rgbMatch[1], 10),
[7m   [0m [91m               ~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m631[0m:[93m21[0m - [91merror[0m[90m ts(18048): [0m'heading' is possibly 'undefined'.

[7m631[0m     previousLevel = heading.level
[7m   [0m [91m                    ~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m627[0m:[93m77[0m - [91merror[0m[90m ts(18048): [0m'heading' is possibly 'undefined'.

[7m627[0m         element: `<h${heading.level} id="${heading.id}">${heading.text}</h${heading.level}>`,
[7m   [0m [91m                                                                            ~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m627[0m:[93m59[0m - [91merror[0m[90m ts(18048): [0m'heading' is possibly 'undefined'.

[7m627[0m         element: `<h${heading.level} id="${heading.id}">${heading.text}</h${heading.level}>`,
[7m   [0m [91m                                                          ~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m627[0m:[93m44[0m - [91merror[0m[90m ts(18048): [0m'heading' is possibly 'undefined'.

[7m627[0m         element: `<h${heading.level} id="${heading.id}">${heading.text}</h${heading.level}>`,
[7m   [0m [91m                                           ~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m627[0m:[93m23[0m - [91merror[0m[90m ts(18048): [0m'heading' is possibly 'undefined'.

[7m627[0m         element: `<h${heading.level} id="${heading.id}">${heading.text}</h${heading.level}>`,
[7m   [0m [91m                      ~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m626[0m:[93m74[0m - [91merror[0m[90m ts(18048): [0m'heading' is possibly 'undefined'.

[7m626[0m         description: `Heading level skipped from h${previousLevel} to h${heading.level}`,
[7m   [0m [91m                                                                         ~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m623[0m:[93m9[0m - [91merror[0m[90m ts(18048): [0m'heading' is possibly 'undefined'.

[7m623[0m     if (heading.level > previousLevel + 1) {
[7m   [0m [91m        ~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m617[0m:[93m23[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m617[0m   let previousLevel = headings[0].level
[7m   [0m [91m                      ~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m612[0m:[93m87[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m612[0m       element: `<h${headings[0].level} id="${headings[0].id}">${headings[0].text}</h${headings[0].level}>`,
[7m   [0m [91m                                                                                      ~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m612[0m:[93m65[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m612[0m       element: `<h${headings[0].level} id="${headings[0].id}">${headings[0].text}</h${headings[0].level}>`,
[7m   [0m [91m                                                                ~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m612[0m:[93m46[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m612[0m       element: `<h${headings[0].level} id="${headings[0].id}">${headings[0].text}</h${headings[0].level}>`,
[7m   [0m [91m                                             ~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m612[0m:[93m21[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m612[0m       element: `<h${headings[0].level} id="${headings[0].id}">${headings[0].text}</h${headings[0].level}>`,
[7m   [0m [91m                    ~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m611[0m:[93m70[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m611[0m       description: `Page should start with an h1, but starts with h${headings[0].level}`,
[7m   [0m [91m                                                                     ~~~~~~~~~~~[0m
[96msrc/utils/accessibilityTestUtils.ts[0m:[93m608[0m:[93m7[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m608[0m   if (headings[0].level !== 1) {
[7m   [0m [91m      ~~~~~~~~~~~[0m

[96msrc/utils/cdnUtils.ts[0m:[93m5[0m:[93m19[0m - [91merror[0m[90m ts(4111): [0mProperty 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].

[7m5[0m   if (process.env.NODE_ENV === 'development') {
[7m [0m [91m                  ~~~~~~~~[0m
[96msrc/utils/cdnUtils.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../cdn-asset-map.json' or its corresponding type declarations.

[7m1[0m import assetMap from '../cdn-asset-map.json'
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/utils/data.ts[0m:[93m77[0m:[93m20[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m77[0m       const num = +parts[i]
[7m  [0m [91m                   ~~~~~~~~[0m

[96msrc/utils/formatDate.ts[0m:[93m119[0m:[93m5[0m - [91merror[0m[90m ts(2722): [0mCannot invoke an object which is possibly 'undefined'.

[7m119[0m     tokens[match](),
[7m   [0m [91m    ~~~~~~~~~~~~~[0m

[96msrc/utils/image-utils.ts[0m:[93m54[0m:[93m23[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m54[0m     return parts[0] / parts[1]
[7m  [0m [91m                      ~~~~~~~~[0m
[96msrc/utils/image-utils.ts[0m:[93m54[0m:[93m12[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m54[0m     return parts[0] / parts[1]
[7m  [0m [91m           ~~~~~~~~[0m

[96msrc/workers/analytics-worker.ts[0m:[93m96[0m:[93m5[0m - [91merror[0m[90m ts(2578): [0mUnused '@ts-expect-error' directive.

[7m96[0m     // @ts-expect-error - tests may rely on .emit existing on the mocked server
[7m  [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/workers/analytics-worker.ts[0m:[93m50[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType 'AnalyticsService | undefined' is not assignable to type 'AnalyticsService'.
  Type 'undefined' is not assignable to type 'AnalyticsService'.

[7m50[0m       analyticsService = mockedInstances[0]
[7m  [0m [91m      ~~~~~~~~~~~~~~~~[0m

[96msrc/workers/notification-worker.ts[0m:[93m20[0m:[93m40[0m - [91merror[0m[90m ts(2554): [0mExpected 0 arguments, but got 2.

[7m20[0m   const wsServer = new WebSocketServer(WS_PORT, notificationService)
[7m  [0m [91m                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/workers/__tests__/analytics-worker.test.ts[0m:[93m256[0m:[93m7[0m - [91merror[0m[90m ts(2684): [0mThe 'this' context of type 'void' is not assignable to method's 'this' of type 'WebSocket'.

[7m256[0m       messageHandler(JSON.stringify({ type: 'invalid' }))
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/workers/__tests__/analytics-worker.test.ts[0m:[93m249[0m:[93m11[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(predicate: (value: [event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void], index: number, obj: [event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void][]) => value is [event: ...], thisArg?: any): [event: ...] | undefined', gave the following error.
  Overload 2 of 2, '(predicate: (value: [event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void], index: number, obj: [event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void][]) => unknown, thisArg?: any): [event: ...] | undefined', gave the following error.

[7m249[0m           (call: [string, (...args: unknown[]) => void]) =>
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m250[0m             call[0] === 'message',
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/workers/__tests__/analytics-worker.test.ts[0m:[93m225[0m:[93m7[0m - [91merror[0m[90m ts(2684): [0mThe 'this' context of type 'void' is not assignable to method's 'this' of type 'WebSocket'.

[7m225[0m       messageHandler(
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m
[7m226[0m         JSON.stringify({
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m229[0m         }),
[7m   [0m [91m~~~~~~~~~~~[0m
[7m230[0m       )
[7m   [0m [91m~~~~~~~[0m
[96msrc/workers/__tests__/analytics-worker.test.ts[0m:[93m216[0m:[93m11[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(predicate: (value: [event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void], index: number, obj: [event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void][]) => value is [event: ...], thisArg?: any): [event: ...] | undefined', gave the following error.
  Overload 2 of 2, '(predicate: (value: [event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void], index: number, obj: [event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void][]) => unknown, thisArg?: any): [event: ...] | undefined', gave the following error.

[7m216[0m           (call: [string, (...args: unknown[]) => void]) =>
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m217[0m             call[0] === 'message',
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/workers/__tests__/analytics-worker.test.ts[0m:[93m191[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'ANALYTICS_WS_PORT' does not exist on type 'MockedFunction<() => { NODE_ENV: "test" | "production" | "development"; PORT: number; LOG_LEVEL: "error" | "debug" | "info" | "warn" | "verbose"; ENABLE_RATE_LIMITING: boolean; ANALYTICS_WS_PORT: number; ... 62 more ...; MENTALLAMA_PYTHON_BRIDGE_SCRIPT_PATH?: string | undefined; }>'.

[7m191[0m       vi.mocked(env).ANALYTICS_WS_PORT = '8090'
[7m   [0m [91m                     ~~~~~~~~~~~~~~~~~[0m
[96msrc/workers/__tests__/analytics-worker.test.ts[0m:[93m179[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'ANALYTICS_WS_PORT' does not exist on type 'MockedFunction<() => { NODE_ENV: "test" | "production" | "development"; PORT: number; LOG_LEVEL: "error" | "debug" | "info" | "warn" | "verbose"; ENABLE_RATE_LIMITING: boolean; ANALYTICS_WS_PORT: number; ... 62 more ...; MENTALLAMA_PYTHON_BRIDGE_SCRIPT_PATH?: string | undefined; }>'.

[7m179[0m       vi.mocked(env).ANALYTICS_WS_PORT = undefined
[7m   [0m [91m                     ~~~~~~~~~~~~~~~~~[0m
[96msrc/workers/__tests__/analytics-worker.test.ts[0m:[93m77[0m:[93m9[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 2, '(predicate: (value: any[], index: number, obj: any[][]) => value is any[], thisArg?: any): any[] | undefined', gave the following error.
  Overload 2 of 2, '(predicate: (value: any[], index: number, obj: any[][]) => unknown, thisArg?: any): any[] | undefined', gave the following error.

[7m77[0m         (call: [string, (...args: unknown[]) => void]) =>
[7m  [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m78[0m           call[0] === 'connection',
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/workers/__tests__/analytics-worker.test.ts[0m:[93m61[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'ANALYTICS_WS_PORT' does not exist on type 'MockedFunction<() => { NODE_ENV: "test" | "production" | "development"; PORT: number; LOG_LEVEL: "error" | "debug" | "info" | "warn" | "verbose"; ENABLE_RATE_LIMITING: boolean; ANALYTICS_WS_PORT: number; ... 62 more ...; MENTALLAMA_PYTHON_BRIDGE_SCRIPT_PATH?: string | undefined; }>'.

[7m61[0m     vi.mocked(env).ANALYTICS_WS_PORT = '8083'
[7m  [0m [91m                   ~~~~~~~~~~~~~~~~~[0m

[96msrc/workers/__tests__/notification-worker.test.ts[0m:[93m177[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'NOTIFICATION_WS_PORT' does not exist on type 'MockedFunction<() => { NODE_ENV: "test" | "production" | "development"; PORT: number; LOG_LEVEL: "error" | "debug" | "info" | "warn" | "verbose"; ENABLE_RATE_LIMITING: boolean; ANALYTICS_WS_PORT: number; ... 62 more ...; MENTALLAMA_PYTHON_BRIDGE_SCRIPT_PATH?: string | undefined; }>'.

[7m177[0m       vi.mocked(env).NOTIFICATION_WS_PORT = '8090'
[7m   [0m [91m                     ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/workers/__tests__/notification-worker.test.ts[0m:[93m164[0m:[93m22[0m - [91merror[0m[90m ts(2339): [0mProperty 'NOTIFICATION_WS_PORT' does not exist on type 'MockedFunction<() => { NODE_ENV: "test" | "production" | "development"; PORT: number; LOG_LEVEL: "error" | "debug" | "info" | "warn" | "verbose"; ENABLE_RATE_LIMITING: boolean; ANALYTICS_WS_PORT: number; ... 62 more ...; MENTALLAMA_PYTHON_BRIDGE_SCRIPT_PATH?: string | undefined; }>'.

[7m164[0m       vi.mocked(env).NOTIFICATION_WS_PORT = undefined
[7m   [0m [91m                     ~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/workers/__tests__/notification-worker.test.ts[0m:[93m45[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'NOTIFICATION_WS_PORT' does not exist on type 'MockedFunction<() => { NODE_ENV: "test" | "production" | "development"; PORT: number; LOG_LEVEL: "error" | "debug" | "info" | "warn" | "verbose"; ENABLE_RATE_LIMITING: boolean; ANALYTICS_WS_PORT: number; ... 62 more ...; MENTALLAMA_PYTHON_BRIDGE_SCRIPT_PATH?: string | undefined; }>'.

[7m45[0m     vi.mocked(env).NOTIFICATION_WS_PORT = '8082'
[7m  [0m [91m                   ~~~~~~~~~~~~~~~~~~~~[0m

[96mtests/accessibility/accessibility-audit.spec.ts[0m:[93m108[0m:[93m29[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m108[0m         const nextElement = await page.locator(':focus').first()
[7m   [0m [93m                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/accessibility/accessibility-audit.spec.ts[0m:[93m87[0m:[93m28[0m - [93mwarning[0m[90m ts(80007): [0m'await' has no effect on the type of this expression.

[7m87[0m       let currentElement = await page.locator(':focus').first()
[7m  [0m [93m                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtests/accessibility/color-contrast.spec.ts[0m:[93m574[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m574[0m     await hasDarkModeToggle[0].click()
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m454[0m:[93m65[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m454[0m           return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
[7m   [0m [91m                                                                ~~~~~~~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m454[0m:[93m46[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m454[0m           return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
[7m   [0m [91m                                             ~~~~~~~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m454[0m:[93m27[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m454[0m           return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
[7m   [0m [91m                          ~~~~~~~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m448[0m:[93m25[0m - [91merror[0m[90m ts(18048): [0m'v' is possibly 'undefined'.

[7m448[0m             const val = v / 255
[7m   [0m [91m                        ~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m330[0m:[93m65[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m330[0m           return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
[7m   [0m [91m                                                                ~~~~~~~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m330[0m:[93m46[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m330[0m           return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
[7m   [0m [91m                                             ~~~~~~~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m330[0m:[93m27[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m330[0m           return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
[7m   [0m [91m                          ~~~~~~~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m324[0m:[93m25[0m - [91merror[0m[90m ts(18048): [0m'v' is possibly 'undefined'.

[7m324[0m             const val = v / 255
[7m   [0m [91m                        ~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m180[0m:[93m69[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m180[0m               return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
[7m   [0m [91m                                                                    ~~~~~~~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m180[0m:[93m50[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m180[0m               return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
[7m   [0m [91m                                                 ~~~~~~~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m180[0m:[93m31[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m180[0m               return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
[7m   [0m [91m                              ~~~~~~~[0m
[96mtests/accessibility/color-contrast.spec.ts[0m:[93m174[0m:[93m29[0m - [91merror[0m[90m ts(18048): [0m'v' is possibly 'undefined'.

[7m174[0m                 const val = v / 255
[7m   [0m [91m                            ~[0m

[96mtests/ai/crisis-detection.test.ts[0m:[93m38[0m:[93m7[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/services/crisis-detection.js' or its corresponding type declarations.

[7m38[0m       '../../lib/ai/services/crisis-detection.js'
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/ai/crisis-detection.test.ts[0m:[93m34[0m:[93m39[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/logger/getAppLogger.js' or its corresponding type declarations.

[7m34[0m     const loggerModule = await import('../../lib/logger/getAppLogger.js')
[7m  [0m [91m                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/ai/crisis-detection.test.ts[0m:[93m5[0m:[93m35[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/AIService.js' or its corresponding type declarations.

[7m5[0m import type { AICompletion } from '../../lib/ai/AIService.js'
[7m [0m [91m                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/ai/crisis-detection.test.ts[0m:[93m4[0m:[93m8[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/crisis/types.js' or its corresponding type declarations.

[7m4[0m } from '../../lib/ai/crisis/types.js'
[7m [0m [91m       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtests/ai/intervention-analysis.test.ts[0m:[93m5[0m:[93m45[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/services/intervention-analysis.ts' or its corresponding type declarations.

[7m5[0m import { InterventionAnalysisService } from '../../lib/ai/services/intervention-analysis.ts'
[7m [0m [91m                                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/ai/intervention-analysis.test.ts[0m:[93m3[0m:[93m32[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/models/types.ts' or its corresponding type declarations.

[7m3[0m import type { AIService } from '../../lib/ai/models/types.ts'
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/ai/intervention-analysis.test.ts[0m:[93m1[0m:[93m32[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/models/types.ts' or its corresponding type declarations.

[7m1[0m import type { AIMessage } from '../../lib/ai/models/types.ts'
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtests/ai/response-generation.test.ts[0m:[93m2[0m:[93m43[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/services/response-generation.ts' or its corresponding type declarations.

[7m2[0m import { ResponseGenerationService } from '../../lib/ai/services/response-generation.ts'
[7m [0m [91m                                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/ai/response-generation.test.ts[0m:[93m1[0m:[93m43[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/models/ai-types.ts' or its corresponding type declarations.

[7m1[0m import type { AIMessage, AIService } from '../../lib/ai/models/ai-types.ts'
[7m [0m [91m                                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtests/ai/sentiment-analysis.test.ts[0m:[93m306[0m:[93m52[0m - [91merror[0m[90m ts(7006): [0mParameter 'msg' implicitly has an 'any' type.

[7m306[0m             const messagesWithName = messages.map((msg) => ({
[7m   [0m [91m                                                   ~~~[0m
[96mtests/ai/sentiment-analysis.test.ts[0m:[93m305[0m:[93m50[0m - [91merror[0m[90m ts(7006): [0mParameter 'options' implicitly has an 'any' type.

[7m305[0m           createChatCompletion: async (messages, options) => {
[7m   [0m [91m                                                 ~~~~~~~[0m
[96mtests/ai/sentiment-analysis.test.ts[0m:[93m305[0m:[93m40[0m - [91merror[0m[90m ts(7006): [0mParameter 'messages' implicitly has an 'any' type.

[7m305[0m           createChatCompletion: async (messages, options) => {
[7m   [0m [91m                                       ~~~~~~~~[0m
[96mtests/ai/sentiment-analysis.test.ts[0m:[93m279[0m:[93m52[0m - [91merror[0m[90m ts(7006): [0mParameter 'msg' implicitly has an 'any' type.

[7m279[0m             const messagesWithName = messages.map((msg) => ({
[7m   [0m [91m                                                   ~~~[0m
[96mtests/ai/sentiment-analysis.test.ts[0m:[93m277[0m:[93m50[0m - [91merror[0m[90m ts(7006): [0mParameter 'options' implicitly has an 'any' type.

[7m277[0m           createChatCompletion: async (messages, options) => {
[7m   [0m [91m                                                 ~~~~~~~[0m
[96mtests/ai/sentiment-analysis.test.ts[0m:[93m277[0m:[93m40[0m - [91merror[0m[90m ts(7006): [0mParameter 'messages' implicitly has an 'any' type.

[7m277[0m           createChatCompletion: async (messages, options) => {
[7m   [0m [91m                                       ~~~~~~~~[0m
[96mtests/ai/sentiment-analysis.test.ts[0m:[93m2[0m:[93m42[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/services/sentiment-analysis' or its corresponding type declarations.

[7m2[0m import { SentimentAnalysisService } from '../../lib/ai/services/sentiment-analysis'
[7m [0m [91m                                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/ai/sentiment-analysis.test.ts[0m:[93m1[0m:[93m32[0m - [91merror[0m[90m ts(2307): [0mCannot find module '../../lib/ai/models/types' or its corresponding type declarations.

[7m1[0m import type { AIService } from '../../lib/ai/models/types'
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtests/browser/auth.spec.ts[0m:[93m79[0m:[93m34[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

[7m79[0m   const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle' })
[7m  [0m [93m                                 ~~~~~~~~~~~~~~~~~[0m

[96mtests/browser/responsive.spec.ts[0m:[93m71[0m:[93m20[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

[7m71[0m         await page.waitForNavigation()
[7m  [0m [93m                   ~~~~~~~~~~~~~~~~~[0m

[96mtests/cross-browser/browser-compatibility.spec.ts[0m:[93m557[0m:[93m62[0m - [91merror[0m[90m ts(2339): [0mProperty 'launch' does not exist on type 'Devices | BrowserType<{}> | typeof errors | APIRequest | Selectors | Electron | Android'.
  Property 'launch' does not exist on type 'typeof errors'.

[7m557[0m         await playwright[browser as keyof typeof playwright].launch()
[7m   [0m [91m                                                             ~~~~~~[0m
[96mtests/cross-browser/browser-compatibility.spec.ts[0m:[93m555[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'name' does not exist on type 'DeviceDescriptor'.

[7m555[0m     test(`${device.name} with ${browser}`, async ({ playwright }) => {
[7m   [0m [91m                   ~~~~[0m
[96mtests/cross-browser/browser-compatibility.spec.ts[0m:[93m555[0m:[93m13[0m - [91merror[0m[90m ts(18048): [0m'device' is possibly 'undefined'.

[7m555[0m     test(`${device.name} with ${browser}`, async ({ playwright }) => {
[7m   [0m [91m            ~~~~~~[0m
[96mtests/cross-browser/browser-compatibility.spec.ts[0m:[93m496[0m:[93m42[0m - [93mwarning[0m[90m ts(6385): [0m'navigation' is deprecated.

[7m496[0m           navigation: typeof performance.navigation !== 'undefined',
[7m   [0m [93m                                         ~~~~~~~~~~[0m

[96mtests/e2e/auth-journey.spec.ts[0m:[93m37[0m:[93m16[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

[7m37[0m     await page.waitForNavigation({ waitUntil: 'networkidle' })
[7m  [0m [93m               ~~~~~~~~~~~~~~~~~[0m

[96mtests/e2e/bias-detection-dashboard.spec.ts[0m:[93m660[0m:[93m61[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ min: number; }' is not assignable to parameter of type 'number'.

[7m660[0m       await expect(page.locator('[aria-live]')).toHaveCount({ min: 1 })
[7m   [0m [91m                                                            ~~~~~~~~~~[0m
[96mtests/e2e/bias-detection-dashboard.spec.ts[0m:[93m639[0m:[93m42[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ min: number; }' is not assignable to parameter of type 'number'.

[7m639[0m       await expect(headings).toHaveCount({ min: 1 })
[7m   [0m [91m                                         ~~~~~~~~~~[0m
[96mtests/e2e/bias-detection-dashboard.spec.ts[0m:[93m115[0m:[93m47[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ min: number; }' is not assignable to parameter of type 'number'.

[7m115[0m       await expect(chartCanvases).toHaveCount({ min: 1 })
[7m   [0m [91m                                              ~~~~~~~~~~[0m

[96mtests/e2e/contextual-assistance-integration.spec.ts[0m:[93m28[0m:[93m16[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

[7m28[0m     await page.waitForNavigation({ waitUntil: 'networkidle' })
[7m  [0m [93m               ~~~~~~~~~~~~~~~~~[0m

[96mtests/e2e/dashboard-journey.spec.ts[0m:[93m183[0m:[93m38[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ min: number; }' is not assignable to parameter of type 'number'.

[7m183[0m     await expect(charts).toHaveCount({ min: 1 })
[7m   [0m [91m                                     ~~~~~~~~~~[0m
[96mtests/e2e/dashboard-journey.spec.ts[0m:[93m94[0m:[93m38[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ min: number; }' is not assignable to parameter of type 'number'.

[7m94[0m     await expect(charts).toHaveCount({ min: 1 })
[7m  [0m [91m                                     ~~~~~~~~~~[0m
[96mtests/e2e/dashboard-journey.spec.ts[0m:[93m77[0m:[93m15[0m - [91merror[0m[90m ts(18048): [0m'link' is possibly 'undefined'.

[7m77[0m         await link.click()
[7m  [0m [91m              ~~~~[0m
[96mtests/e2e/dashboard-journey.spec.ts[0m:[93m74[0m:[93m26[0m - [91merror[0m[90m ts(18048): [0m'link' is possibly 'undefined'.

[7m74[0m       const href = await link.getAttribute('href')
[7m  [0m [91m                         ~~~~[0m
[96mtests/e2e/dashboard-journey.spec.ts[0m:[93m47[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ min: number; }' is not assignable to parameter of type 'number'.

[7m47[0m     await expect(chartElements).toHaveCount({ min: 1 })
[7m  [0m [91m                                            ~~~~~~~~~~[0m

[96mtests/e2e/demo-workflow.spec.ts[0m:[93m337[0m:[93m60[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ min: number; }' is not assignable to parameter of type 'number'.

[7m337[0m       await expect(page.locator('h1, h2, h3')).toHaveCount({ min: 3 })
[7m   [0m [91m                                                           ~~~~~~~~~~[0m
[96mtests/e2e/demo-workflow.spec.ts[0m:[93m334[0m:[93m62[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ min: number; }' is not assignable to parameter of type 'number'.

[7m334[0m       await expect(page.locator('[aria-label]')).toHaveCount({ min: 5 })
[7m   [0m [91m                                                             ~~~~~~~~~~[0m

[96mtests/e2e/mobile-responsiveness.spec.ts[0m:[93m241[0m:[93m36[0m - [91merror[0m[90m ts(18048): [0m'device' is possibly 'undefined'.

[7m241[0m         await page.setViewportSize(device.viewport)
[7m   [0m [91m                                   ~~~~~~[0m
[96mtests/e2e/mobile-responsiveness.spec.ts[0m:[93m234[0m:[93m19[0m - [91merror[0m[90m ts(18048): [0m'device' is possibly 'undefined'.

[7m234[0m           height: device.viewport.width,
[7m   [0m [91m                  ~~~~~~[0m
[96mtests/e2e/mobile-responsiveness.spec.ts[0m:[93m233[0m:[93m18[0m - [91merror[0m[90m ts(18048): [0m'device' is possibly 'undefined'.

[7m233[0m           width: device.viewport.height,
[7m   [0m [91m                 ~~~~~~[0m
[96mtests/e2e/mobile-responsiveness.spec.ts[0m:[93m23[0m:[93m51[0m - [91merror[0m[90m ts(18048): [0m'device' is possibly 'undefined'.

[7m23[0m       expect(viewport?.width).toBeLessThanOrEqual(device.viewport.width)
[7m  [0m [91m                                                  ~~~~~~[0m
[96mtests/e2e/mobile-responsiveness.spec.ts[0m:[93m12[0m:[93m51[0m - [91merror[0m[90m ts(2339): [0mProperty 'name' does not exist on type 'DeviceDescriptor'.

[7m12[0m   test.describe(`Mobile Responsiveness - ${device.name}`, () => {
[7m  [0m [91m                                                  ~~~~[0m
[96mtests/e2e/mobile-responsiveness.spec.ts[0m:[93m12[0m:[93m44[0m - [91merror[0m[90m ts(18048): [0m'device' is possibly 'undefined'.

[7m12[0m   test.describe(`Mobile Responsiveness - ${device.name}`, () => {
[7m  [0m [91m                                           ~~~~~~[0m

[96mtests/e2e/test-utils.ts[0m:[93m52[0m:[93m14[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

[7m52[0m   await page.waitForNavigation({ waitUntil: 'networkidle' })
[7m  [0m [93m             ~~~~~~~~~~~~~~~~~[0m
[96mtests/e2e/test-utils.ts[0m:[93m37[0m:[93m14[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

[7m37[0m   await page.waitForNavigation({ waitUntil: 'networkidle' })
[7m  [0m [93m             ~~~~~~~~~~~~~~~~~[0m

[96mtests/e2e/user-acceptance.spec.ts[0m:[93m28[0m:[93m16[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

[7m28[0m     await page.waitForNavigation({ waitUntil: 'networkidle' })
[7m  [0m [93m               ~~~~~~~~~~~~~~~~~[0m

[96mtests/e2e/user-experience.spec.ts[0m:[93m57[0m:[93m16[0m - [91merror[0m[90m ts(2551): [0mProperty '_hasTransition' does not exist on type 'Window & typeof globalThis'. Did you mean 'CSSTransition'?

[7m57[0m         window._hasTransition = false
[7m  [0m [91m               ~~~~~~~~~~~~~~[0m
[96mtests/e2e/user-experience.spec.ts[0m:[93m52[0m:[93m23[0m - [91merror[0m[90m ts(2551): [0mProperty '_hasTransition' does not exist on type 'Window & typeof globalThis'. Did you mean 'CSSTransition'?

[7m52[0m         return window._hasTransition === true
[7m  [0m [91m                      ~~~~~~~~~~~~~~[0m
[96mtests/e2e/user-experience.spec.ts[0m:[93m44[0m:[93m16[0m - [91merror[0m[90m ts(2339): [0mProperty '_checkTransition' does not exist on type 'Window & typeof globalThis'.

[7m44[0m         window._checkTransition(element)
[7m  [0m [91m               ~~~~~~~~~~~~~~~~[0m
[96mtests/e2e/user-experience.spec.ts[0m:[93m42[0m:[93m7[0m - [91merror[0m[90m ts(2322): [0mType '<T extends Node>(element: T) => Node' is not assignable to type '<T extends Node>(node: T) => T'.
  Type 'Node' is not assignable to type 'T'.

[7m42[0m       Element.prototype.appendChild = function (element) {
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/e2e/user-experience.spec.ts[0m:[93m37[0m:[93m18[0m - [91merror[0m[90m ts(2551): [0mProperty '_hasTransition' does not exist on type 'Window & typeof globalThis'. Did you mean 'CSSTransition'?

[7m37[0m           window._hasTransition = true
[7m  [0m [91m                 ~~~~~~~~~~~~~~[0m
[96mtests/e2e/user-experience.spec.ts[0m:[93m32[0m:[93m43[0m - [91merror[0m[90m ts(7006): [0mParameter 'element' implicitly has an 'any' type.

[7m32[0m       window._checkTransition = function (element) {
[7m  [0m [91m                                          ~~~~~~~[0m
[96mtests/e2e/user-experience.spec.ts[0m:[93m32[0m:[93m14[0m - [91merror[0m[90m ts(2339): [0mProperty '_checkTransition' does not exist on type 'Window & typeof globalThis'.

[7m32[0m       window._checkTransition = function (element) {
[7m  [0m [91m             ~~~~~~~~~~~~~~~~[0m
[96mtests/e2e/user-experience.spec.ts[0m:[93m211[0m:[93m16[0m - [93mwarning[0m[90m ts(6387): [0mThe signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

[7m211[0m     await page.waitForNavigation()
[7m   [0m [93m               ~~~~~~~~~~~~~~~~~[0m

[96mtests/e2e/mcp-examples/auth-flow.spec.ts[0m:[93m128[0m:[93m30[0m - [91merror[0m[90m ts(2531): [0mObject is possibly 'null'.

[7m128[0m     const newContext = await page.context().browser().newContext()
[7m   [0m [91m                             ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/e2e/mcp-examples/auth-flow.spec.ts[0m:[93m2[0m:[93m29[0m - [91merror[0m[90m ts(2307): [0mCannot find module '@playwright/mcp' or its corresponding type declarations.

[7m2[0m import { mcpSnapshot } from '@playwright/mcp'
[7m [0m [91m                            ~~~~~~~~~~~~~~~~~[0m

[96mtests/integration/layout-integration.spec.ts[0m:[93m69[0m:[93m61[0m - [91merror[0m[90m ts(2339): [0mProperty 'greaterThan' does not exist on type '(count: number, options?: { timeout?: number | undefined; } | undefined) => Promise<void>'.

[7m69[0m     await expect(page.locator('.article-card')).toHaveCount.greaterThan(0)
[7m  [0m [91m                                                            ~~~~~~~~~~~[0m

[96mtests/integration/static-generation.spec.ts[0m:[93m164[0m:[93m17[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 5, '(condition: boolean, description?: string | undefined): void', gave the following error.
  Overload 2 of 5, '(callback: ConditionBody<PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions>, description?: string | undefined): void', gave the following error.

[7m164[0m       test.skip('No code blocks found in the blog post')
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/integration/static-generation.spec.ts[0m:[93m134[0m:[93m17[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 5, '(condition: boolean, description?: string | undefined): void', gave the following error.
  Overload 2 of 5, '(callback: ConditionBody<PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions>, description?: string | undefined): void', gave the following error.

[7m134[0m       test.skip('No blog post with code examples found')
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/integration/static-generation.spec.ts[0m:[93m11[0m:[93m61[0m - [91merror[0m[90m ts(2339): [0mProperty 'greaterThan' does not exist on type '(count: number, options?: { timeout?: number | undefined; } | undefined) => Promise<void>'.

[7m11[0m     await expect(page.locator('.article-card')).toHaveCount.greaterThan(1)
[7m  [0m [91m                                                            ~~~~~~~~~~~[0m

[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m521[0m:[93m20[0m - [91merror[0m[90m ts(18048): [0m'page' is possibly 'undefined'.

[7m521[0m       await expect(page.locator('text=Validation Results')).toBeVisible({
[7m   [0m [91m                   ~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m518[0m:[93m24[0m - [91merror[0m[90m ts(18048): [0m'page' is possibly 'undefined'.

[7m518[0m       const textArea = page.locator('[placeholder*="Enter psychology content"]')
[7m   [0m [91m                       ~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m515[0m:[93m9[0m - [91merror[0m[90m ts(18048): [0m'page' is possibly 'undefined'.

[7m515[0m         page.locator('[data-testid="validation-section"]'),
[7m   [0m [91m        ~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m513[0m:[93m13[0m - [91merror[0m[90m ts(18048): [0m'page' is possibly 'undefined'.

[7m513[0m       await page.click('[data-testid="validation-tab"]')
[7m   [0m [91m            ~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m510[0m:[93m26[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m510[0m       const deviceName = mobileDevices[i].name
[7m   [0m [91m                         ~~~~~~~~~~~~~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m398[0m:[93m19[0m - [91merror[0m[90m ts(18048): [0m'device.viewport' is possibly 'undefined'.

[7m398[0m           height: device.viewport.width,
[7m   [0m [91m                  ~~~~~~~~~~~~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m397[0m:[93m18[0m - [91merror[0m[90m ts(18048): [0m'device.viewport' is possibly 'undefined'.

[7m397[0m           width: device.viewport.height,
[7m   [0m [91m                 ~~~~~~~~~~~~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m379[0m:[93m36[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'ViewportSize | undefined' is not assignable to parameter of type '{ width: number; height: number; }'.
  Type 'undefined' is not assignable to type '{ width: number; height: number; }'.

[7m379[0m         await page.setViewportSize(device.viewport)
[7m   [0m [91m                                   ~~~~~~~~~~~~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m366[0m:[93m19[0m - [91merror[0m[90m ts(18048): [0m'device.viewport' is possibly 'undefined'.

[7m366[0m           height: device.viewport.width,
[7m   [0m [91m                  ~~~~~~~~~~~~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m365[0m:[93m18[0m - [91merror[0m[90m ts(18048): [0m'device.viewport' is possibly 'undefined'.

[7m365[0m           width: device.viewport.height,
[7m   [0m [91m                 ~~~~~~~~~~~~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m35[0m:[93m54[0m - [91merror[0m[90m ts(18048): [0m'device.viewport' is possibly 'undefined'.

[7m35[0m         expect(viewport?.height).toBeLessThanOrEqual(device.viewport.height)
[7m  [0m [91m                                                     ~~~~~~~~~~~~~~~[0m
[96mtests/mobile/mobile-responsiveness.spec.ts[0m:[93m34[0m:[93m53[0m - [91merror[0m[90m ts(18048): [0m'device.viewport' is possibly 'undefined'.

[7m34[0m         expect(viewport?.width).toBeLessThanOrEqual(device.viewport.width)
[7m  [0m [91m                                                    ~~~~~~~~~~~~~~~[0m

[96mtests/monitoring/monitoring.spec.ts[0m:[93m254[0m:[93m25[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m254[0m         await page.goto(fullUrl, { timeout: 10000 })
[7m   [0m [91m                        ~~~~~~~[0m

[96mtests/performance/page-performance.spec.ts[0m:[93m99[0m:[93m54[0m - [91merror[0m[90m ts(2339): [0mProperty 'timing' does not exist on type 'Response'.

[7m99[0m         ? response.timing().responseStart - response.timing().requestStart
[7m  [0m [91m                                                     ~~~~~~[0m
[96mtests/performance/page-performance.spec.ts[0m:[93m99[0m:[93m20[0m - [91merror[0m[90m ts(2339): [0mProperty 'timing' does not exist on type 'Response'.

[7m99[0m         ? response.timing().responseStart - response.timing().requestStart
[7m  [0m [91m                   ~~~~~~[0m

[96mtests/security/ai-endpoint-scanner.ts[0m:[93m241[0m:[93m15[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m241[0m     message = error.message
[7m   [0m [91m              ~~~~~[0m

[96mtests/security/ai-vulnerability-scanner.ts[0m:[93m569[0m:[93m3[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'writeReport'.

[7m569[0m   writeReport(results)
[7m   [0m [91m  ~~~~~~~~~~~[0m
[96mtests/security/ai-vulnerability-scanner.ts[0m:[93m471[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'log'.

[7m471[0m       log('Testing for SQL injection in AI admin endpoints...')
[7m   [0m [91m      ~~~[0m
[96mtests/security/ai-vulnerability-scanner.ts[0m:[93m399[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'log'.

[7m399[0m       log('Testing for SSRF in AI completion endpoint...')
[7m   [0m [91m      ~~~[0m
[96mtests/security/ai-vulnerability-scanner.ts[0m:[93m341[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'log'.

[7m341[0m       log('Testing for IDOR in AI usage statistics...')
[7m   [0m [91m      ~~~[0m
[96mtests/security/ai-vulnerability-scanner.ts[0m:[93m261[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'log'.

[7m261[0m       log('Testing for rate limiting on AI completion endpoint...')
[7m   [0m [91m      ~~~[0m
[96mtests/security/ai-vulnerability-scanner.ts[0m:[93m154[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'log'.

[7m154[0m       log('Testing for CSRF protection on AI admin endpoints...')
[7m   [0m [91m      ~~~[0m
[96mtests/security/ai-vulnerability-scanner.ts[0m:[93m83[0m:[93m7[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'log'.

[7m83[0m       log('Testing for XSS in AI completion response...')
[7m  [0m [91m      ~~~[0m
[96mtests/security/ai-vulnerability-scanner.ts[0m:[93m68[0m:[93m7[0m - [91merror[0m[90m ts(6133): [0m'reportFile' is declared but its value is never read.

[7m68[0m const reportFile = path.join(
[7m  [0m [91m      ~~~~~~~~~~[0m

[96mtests/security/run-security-tests.ts[0m:[93m539[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m539[0m           severityCounts[item.severity]++
[7m   [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m602[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'fullPage' does not exist in type '{ animations?: "disabled" | "allow" | undefined; caret?: "initial" | "hide" | undefined; mask?: Locator[] | undefined; maskColor?: string | undefined; maxDiffPixelRatio?: number | undefined; ... 5 more ...; timeout?: number | undefined; }'.

[7m602[0m         fullPage: true,
[7m   [0m [91m        ~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m596[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m596[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m594[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m594[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m585[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'getViewportSizes' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m585[0m         DashboardVisualTestUtils.getViewportSizes().desktop,
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m562[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m562[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m560[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m560[0m       await DashboardVisualTestUtils.setupMockData(page, criticalAlertData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m536[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m536[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m534[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m534[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m522[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m522[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m520[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m520[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m515[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'getViewportSizes' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m515[0m         DashboardVisualTestUtils.getViewportSizes().desktop,
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m492[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m492[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m490[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m490[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m477[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m477[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m475[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m475[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m424[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'getViewportSizes' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m424[0m         DashboardVisualTestUtils.getViewportSizes().desktop,
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m415[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'fullPage' does not exist in type '{ animations?: "disabled" | "allow" | undefined; caret?: "initial" | "hide" | undefined; mask?: Locator[] | undefined; maskColor?: string | undefined; maxDiffPixelRatio?: number | undefined; ... 5 more ...; timeout?: number | undefined; }'.

[7m415[0m         fullPage: true,
[7m   [0m [91m        ~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m409[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m409[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m407[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m407[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m402[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'getViewportSizes' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m402[0m         DashboardVisualTestUtils.getViewportSizes().tablet,
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m386[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m386[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m384[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m384[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m378[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'fullPage' does not exist in type '{ animations?: "disabled" | "allow" | undefined; caret?: "initial" | "hide" | undefined; mask?: Locator[] | undefined; maskColor?: string | undefined; maxDiffPixelRatio?: number | undefined; ... 5 more ...; timeout?: number | undefined; }'.

[7m378[0m         fullPage: true,
[7m   [0m [91m        ~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m372[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m372[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m370[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m370[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m365[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'getViewportSizes' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m365[0m         DashboardVisualTestUtils.getViewportSizes().mobile,
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m342[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m342[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m340[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m340[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m318[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m318[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m316[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m316[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m296[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m296[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m294[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m294[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m288[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'fullPage' does not exist in type '{ animations?: "disabled" | "allow" | undefined; caret?: "initial" | "hide" | undefined; mask?: Locator[] | undefined; maskColor?: string | undefined; maxDiffPixelRatio?: number | undefined; ... 5 more ...; timeout?: number | undefined; }'.

[7m288[0m         fullPage: true,
[7m   [0m [91m        ~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m282[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m282[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m280[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m280[0m       await DashboardVisualTestUtils.setupMockData(page, criticalAlertData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m274[0m:[93m9[0m - [91merror[0m[90m ts(2353): [0mObject literal may only specify known properties, and 'fullPage' does not exist in type '{ animations?: "disabled" | "allow" | undefined; caret?: "initial" | "hide" | undefined; mask?: Locator[] | undefined; maskColor?: string | undefined; maxDiffPixelRatio?: number | undefined; ... 5 more ...; timeout?: number | undefined; }'.

[7m274[0m         fullPage: true,
[7m   [0m [91m        ~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m268[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'waitForDashboardLoad' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m268[0m       await DashboardVisualTestUtils.waitForDashboardLoad(page)
[7m   [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m266[0m:[93m38[0m - [91merror[0m[90m ts(2339): [0mProperty 'setupMockData' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m266[0m       await DashboardVisualTestUtils.setupMockData(page, mockDashboardData)
[7m   [0m [91m                                     ~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m259[0m:[93m34[0m - [91merror[0m[90m ts(2339): [0mProperty 'getViewportSizes' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m259[0m         DashboardVisualTestUtils.getViewportSizes().desktop,
[7m   [0m [91m                                 ~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m253[0m:[93m36[0m - [91merror[0m[90m ts(2339): [0mProperty 'hideElementsWithRandomContent' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m253[0m     await DashboardVisualTestUtils.hideElementsWithRandomContent(page)
[7m   [0m [91m                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m250[0m:[93m36[0m - [91merror[0m[90m ts(2339): [0mProperty 'mockAuthenticatedSession' does not exist on type 'typeof DashboardVisualTestUtils'.

[7m250[0m     await DashboardVisualTestUtils.mockAuthenticatedSession(page)
[7m   [0m [91m                                   ~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mtests/visual/bias-dashboard.visual.spec.ts[0m:[93m238[0m:[93m14[0m - [91merror[0m[90m ts(2339): [0mProperty 'mockAuth' does not exist on type 'Window & typeof globalThis'.

[7m238[0m       window.mockAuth = {
[7m   [0m [91m             ~~~~~~~~[0m

[96mscripts/generate-compatibility-report.js[0m:[93m10[0m:[93m12[0m - [93mwarning[0m[90m ts(80001): [0mFile is a CommonJS module; it may be converted to an ES module.

[7m10[0m const fs = require('fs')
[7m  [0m [93m           ~~~~~~~~~~~~~[0m

[96mscripts/monitor-memory.js[0m:[93m8[0m:[93m12[0m - [93mwarning[0m[90m ts(80001): [0mFile is a CommonJS module; it may be converted to an ES module.

[7m8[0m const fs = require('fs')
[7m [0m [93m           ~~~~~~~~~~~~~[0m

[96mscripts/extract-backgrounds.ts[0m:[93m32[0m:[93m44[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 4, '(arrayBuffer: WithImplicitCoercion<ArrayBufferLike>, byteOffset?: number | undefined, length?: number | undefined): Buffer<ArrayBufferLike>', gave the following error.
  Overload 2 of 4, '(string: WithImplicitCoercion<string>, encoding?: BufferEncoding | undefined): Buffer<ArrayBuffer>', gave the following error.

[7m32[0m     fs.writeFileSync(filePath, Buffer.from(data, 'base64'))
[7m  [0m [91m                                           ~~~~[0m

[96mscripts/load-test.ts[0m:[93m244[0m:[93m41[0m - [91merror[0m[90m ts(18048): [0m'p99' is possibly 'undefined'.

[7m244[0m       console.log(`  99th percentile: ${p99.toFixed(2)}ms`)
[7m   [0m [91m                                        ~~~[0m
[96mscripts/load-test.ts[0m:[93m243[0m:[93m41[0m - [91merror[0m[90m ts(18048): [0m'p95' is possibly 'undefined'.

[7m243[0m       console.log(`  95th percentile: ${p95.toFixed(2)}ms`)
[7m   [0m [91m                                        ~~~[0m
[96mscripts/load-test.ts[0m:[93m200[0m:[93m78[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ EX: number; }' is not assignable to parameter of type 'number'.

[7m200[0m       await this.redis.set(`pattern:${Date.now()}`, JSON.stringify(pattern), {
[7m   [0m [91m                                                                             ~[0m
[7m201[0m         EX: 3600,
[7m   [0m [91m~~~~~~~~~~~~~~~~~[0m
[7m202[0m       })
[7m   [0m [91m~~~~~~~[0m
[96mscripts/load-test.ts[0m:[93m186[0m:[93m78[0m - [91merror[0m[90m ts(2345): [0mArgument of type '{ EX: number; }' is not assignable to parameter of type 'number'.

[7m186[0m       await this.redis.set(`analytics:${Date.now()}`, JSON.stringify(event), {
[7m   [0m [91m                                                                             ~[0m
[7m187[0m         EX: 3600,
[7m   [0m [91m~~~~~~~~~~~~~~~~~[0m
[7m188[0m       })
[7m   [0m [91m~~~~~~~[0m
[96mscripts/load-test.ts[0m:[93m126[0m:[93m22[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m126[0m               error: error.message,
[7m   [0m [91m                     ~~~~~[0m
[96mscripts/load-test.ts[0m:[93m122[0m:[93m25[0m - [91merror[0m[90m ts(18048): [0m'scenario' is possibly 'undefined'.

[7m122[0m               scenario: scenario.name,
[7m   [0m [91m                        ~~~~~~~~[0m
[96mscripts/load-test.ts[0m:[93m115[0m:[93m25[0m - [91merror[0m[90m ts(18048): [0m'scenario' is possibly 'undefined'.

[7m115[0m               scenario: scenario.name,
[7m   [0m [91m                        ~~~~~~~~[0m
[96mscripts/load-test.ts[0m:[93m110[0m:[93m28[0m - [91merror[0m[90m ts(18048): [0m'scenario' is possibly 'undefined'.

[7m110[0m         for (const step of scenario.steps) {
[7m   [0m [91m                           ~~~~~~~~[0m

[96mscripts/provision-grafana-dashboard.ts[0m:[93m48[0m:[93m39[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m48[0m       console.error('Response data:', error.response.data)
[7m  [0m [91m                                      ~~~~~[0m
[96mscripts/provision-grafana-dashboard.ts[0m:[93m47[0m:[93m9[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m47[0m     if (error.response) {
[7m  [0m [91m        ~~~~~[0m
[96mscripts/provision-grafana-dashboard.ts[0m:[93m46[0m:[93m52[0m - [91merror[0m[90m ts(18046): [0m'error' is of type 'unknown'.

[7m46[0m     console.error('Error provisioning dashboard:', error.message)
[7m  [0m [91m                                                   ~~~~~[0m

[96mscripts/setup-env.ts[0m:[93m35[0m:[93m37[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m35[0m   const nodeMajorVersion = parseInt(process.versions.node.split('.')[0], 10)
[7m  [0m [91m                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mplugins/remark-directive-sugar.ts[0m:[93m277[0m:[93m34[0m - [91merror[0m[90m ts(18048): [0m'badge' is possibly 'undefined'.

[7m277[0m             resolvedBadgeColor = badge.color
[7m   [0m [91m                                 ~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m276[0m:[93m33[0m - [91merror[0m[90m ts(18048): [0m'badge' is possibly 'undefined'.

[7m276[0m             resolvedBadgeText = badge.text
[7m   [0m [91m                                ~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m267[0m:[93m15[0m - [91merror[0m[90m ts(6133): [0m'_resolvedBadge' is declared but its value is never read.

[7m267[0m           let _resolvedBadge = ''
[7m   [0m [91m              ~~~~~~~~~~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m242[0m:[93m21[0m - [91merror[0m[90m ts(6133): [0m'_match' is declared but its value is never read.

[7m242[0m               const _match = id.match(GITHUB_REPO_REGEXP)
[7m   [0m [91m                    ~~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m213[0m:[93m15[0m - [91merror[0m[90m ts(2322): [0mType 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m213[0m               _resolvedTab = match[1]
[7m   [0m [91m              ~~~~~~~~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m181[0m:[93m38[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m181[0m           if (children.length > 0 && children[0].type === 'text') {
[7m   [0m [91m                                     ~~~~~~~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m173[0m:[93m15[0m - [91merror[0m[90m ts(6133): [0m'_resolvedImageUrl' is declared but its value is never read.

[7m173[0m           let _resolvedImageUrl = ''
[7m   [0m [91m              ~~~~~~~~~~~~~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m172[0m:[93m15[0m - [91merror[0m[90m ts(6133): [0m'_resolvedLink' is declared but its value is never read.

[7m172[0m           let _resolvedLink = ''
[7m   [0m [91m              ~~~~~~~~~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m146[0m:[93m35[0m - [91merror[0m[90m ts(4111): [0mProperty 'title' comes from an index signature, so it must be accessed with ['title'].

[7m146[0m                 title: attributes.title || 'Video Player',
[7m   [0m [91m                                  ~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m144[0m:[93m38[0m - [91merror[0m[90m ts(4111): [0mProperty 'noScale' comes from an index signature, so it must be accessed with ['noScale'].

[7m144[0m                 style: `${attributes.noScale && 'transform: none'}`,
[7m   [0m [91m                                     ~~~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m137[0m:[93m34[0m - [91merror[0m[90m ts(4111): [0mProperty 'noScale' comes from an index signature, so it must be accessed with ['noScale'].

[7m137[0m             style: `${attributes.noScale && 'margin: 1rem 0'}`,
[7m   [0m [91m                                 ~~~~~~~[0m
[96mplugins/remark-directive-sugar.ts[0m:[93m124[0m:[93m23[0m - [91merror[0m[90m ts(2722): [0mCannot invoke an object which is possibly 'undefined'.

[7m124[0m                 src = VIDEO_PLATFORMS[key](id)
[7m   [0m [91m                      ~~~~~~~~~~~~~~~~~~~~[0m

[96mplugins/remark-image-container.ts[0m:[93m103[0m:[93m45[0m - [91merror[0m[90m ts(2345): [0mArgument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

[7m103[0m         if (match && VALID_TAGS_FOR_IMG.has(match[1])) {
[7m   [0m [91m                                            ~~~~~~~~[0m
[96mplugins/remark-image-container.ts[0m:[93m88[0m:[93m50[0m - [91merror[0m[90m ts(4111): [0mProperty 'href' comes from an index signature, so it must be accessed with ['href'].

[7m88[0m         if (!node.attributes || !node.attributes.href) {
[7m  [0m [91m                                                 ~~~~[0m
[96mplugins/remark-image-container.ts[0m:[93m64[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m64[0m           children[0].children[0].type === 'image' &&
[7m  [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mplugins/remark-image-container.ts[0m:[93m63[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m63[0m           children[0].type === 'paragraph' &&
[7m  [0m [91m          ~~~~~~~~~~~[0m
[96mplugins/remark-image-container.ts[0m:[93m58[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m58[0m           children[0].children[0].type === 'text'
[7m  [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96mplugins/remark-image-container.ts[0m:[93m56[0m:[93m11[0m - [91merror[0m[90m ts(2532): [0mObject is possibly 'undefined'.

[7m56[0m           children[0].type === 'paragraph' &&
[7m  [0m [91m          ~~~~~~~~~~~[0m

Result (1546 files): 
- 2651 errors
- 0 warnings
- 111 hints

 ELIFECYCLE  Command failed with exit code 1.
