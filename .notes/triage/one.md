src/simulator/hooks/useEmotionDetection.ts:97:39 - warning ts(7044): Parameter 'sum' implicitly has an 'any' type, but a better type may be inferred from usage.

97             analysis.emotions.reduce((sum, emotion) => {
                                         ~~~
src/simulator/hooks/useEmotionDetection.ts:76:44 - warning ts(7044): Parameter 'emotion' implicitly has an 'any' type, but a better type may be inferred from usage.

76             analysis.emotions.reduce((sum, emotion) => {
                                              ~~~~~~~
src/simulator/hooks/useEmotionDetection.ts:76:39 - warning ts(7044): Parameter 'sum' implicitly has an 'any' type, but a better type may be inferred from usage.

76             analysis.emotions.reduce((sum, emotion) => {
                                         ~~~
src/simulator/hooks/useEmotionDetection.ts:55:44 - warning ts(7044): Parameter 'emotion' implicitly has an 'any' type, but a better type may be inferred from usage.

55             analysis.emotions.reduce((sum, emotion) => {
                                              ~~~~~~~
src/simulator/hooks/useEmotionDetection.ts:55:39 - warning ts(7044): Parameter 'sum' implicitly has an 'any' type, but a better type may be inferred from usage.

55             analysis.emotions.reduce((sum, emotion) => {
                                         ~~~

src/simulator/hooks/useSimulator.ts:322:3 - error ts(6133): 'response' is declared but its value is never read.

322   response: string,
      ~~~~~~~~
src/simulator/hooks/useSimulator.ts:312:5 - error ts(2322): Type 'TherapeuticTechnique | undefined' is not assignable to type 'TherapeuticTechnique'.
  Type 'undefined' is not assignable to type 'TherapeuticTechnique'.

312     unusedRecommendedTechniques[
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
313       Math.floor(Math.random() * unusedRecommendedTechniques.length)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
314     ],
    ~~~~~
src/simulator/hooks/useSimulator.ts:307:13 - error ts(2322): Type 'TherapeuticTechnique | undefined' is not assignable to type 'TherapeuticTechnique'.
  Type 'undefined' is not assignable to type 'TherapeuticTechnique'.

307     return [otherTechniques[Math.floor(Math.random() * otherTechniques.length)]]
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/simulator/hooks/useSimulator.ts:275:43 - error ts(2532): Object is possibly 'undefined'.

275       return `While your approach using ${techniques[0].replace(
                                              ~~~~~~~~~~~~~
src/simulator/hooks/useSimulator.ts:265:48 - error ts(2532): Object is possibly 'undefined'.

265       return `You're on the right track with ${techniques[0].replace(
                                                   ~~~~~~~~~~~~~
src/simulator/hooks/useSimulator.ts:254:54 - error ts(2532): Object is possibly 'undefined'.

254       return `Your response shows good effort with ${techniques[0].replace(
                                                         ~~~~~~~~~~~~~
src/simulator/hooks/useSimulator.ts:251:33 - error ts(2532): Object is possibly 'undefined'.

251       return `Great job using ${techniques[0].replace(/_/g, ' ')}! This is particularly effective for this client's ${scenario.domain} concerns. Your approach demonstrates attunement to the client's needs.`
                                    ~~~~~~~~~~~~~
src/simulator/hooks/useSimulator.ts:41:26 - warning ts(80007): 'await' has no effect on the type of this expression.

41         const scenario = await getScenarioById(scenarioId)
                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/simulator/hooks/useSpeechRecognition.ts:237:2 - error ts(2454): Variable 'startListening' is used before being assigned.

237  startListening,
     ~~~~~~~~~~~~~~
src/simulator/hooks/useSpeechRecognition.ts:237:2 - error ts(2448): Block-scoped variable 'startListening' used before its declaration.

237  startListening,
     ~~~~~~~~~~~~~~
src/simulator/hooks/useSpeechRecognition.ts:221:9 - error ts(2322): Type 'null' is not assignable to type '() => void'.

221         recognitionRef.current.onend = null
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/simulator/hooks/useSpeechRecognition.ts:220:9 - error ts(2322): Type 'null' is not assignable to type '(event: SpeechRecognitionErrorEvent) => void'.

220         recognitionRef.current.onerror = null
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/simulator/hooks/useSpeechRecognition.ts:219:9 - error ts(2322): Type 'null' is not assignable to type '(event: SpeechRecognitionEvent) => void'.

219         recognitionRef.current.onresult = null
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/simulator/hooks/useSpeechRecognition.ts:205:9 - error ts(18047): 'recognitionRef.current' is possibly 'null'.

205         recognitionRef.current.start()
            ~~~~~~~~~~~~~~~~~~~~~~
src/simulator/hooks/useSpeechRecognition.ts:142:13 - error ts(2532): Object is possibly 'undefined'.

142         if (event.results[i].isFinal) {
                ~~~~~~~~~~~~~~~~
src/simulator/hooks/useSpeechRecognition.ts:140:32 - error ts(2532): Object is possibly 'undefined'.

140         const { transcript } = event.results[i][0]
                                   ~~~~~~~~~~~~~~~~
src/simulator/hooks/useSpeechRecognition.ts:140:17 - error ts(2339): Property 'transcript' does not exist on type '{ transcript: string; } | undefined'.

140         const { transcript } = event.results[i][0]
                    ~~~~~~~~~~
src/simulator/hooks/useSpeechRecognition.ts:139:57 - error ts(2339): Property 'length' does not exist on type '{ [index: number]: { [index: number]: { transcript: string; }; isFinal: boolean; }; }'.

139       for (let i = event.resultIndex; i < event.results.length; i++) {
                                                            ~~~~~~
src/simulator/hooks/useSpeechRecognition.ts:127:5 - error ts(2322): Type 'SpeechRecognitionInterface | null' is not assignable to type 'SpeechRecognition | null'.
  Type 'SpeechRecognitionInterface' is missing the following properties from type 'SpeechRecognition': onresult, onerror, onend

127     recognitionRef.current = createSpeechRecognition(enhancedConfig)
        ~~~~~~~~~~~~~~~~~~~~~~

src/simulator/services/FeedbackService.ts:721:7 - error ts(18046): 'prediction' is of type 'unknown'.

721       prediction.dispose()
          ~~~~~~~~~~
src/simulator/services/FeedbackService.ts:717:36 - error ts(18046): 'prediction' is of type 'unknown'.

717       const predictionData = await prediction.data()
                                       ~~~~~~~~~~
src/simulator/services/FeedbackService.ts:716:46 - error ts(2339): Property 'predict' does not exist on type '{}'.

716       const prediction = this.techniqueModel.predict(features) as unknown // tf.Tensor
                                                 ~~~~~~~
src/simulator/services/FeedbackService.ts:341:9 - error ts(2322): Type 'string | null' is not assignable to type 'null'.
  Type 'string' is not assignable to type 'null'.

341         therapeuticSuggestions = response.choices?.[0]?.message?.content || null
            ~~~~~~~~~~~~~~~~~~~~~~
src/simulator/services/FeedbackService.ts:13:41 - error ts(2307): Cannot find module '../../lib/ai/mental-llama/MentalLLaMAAdapter' or its corresponding type declarations.

13 import type { MentalLLaMAAdapter } from '../../lib/ai/mental-llama/MentalLLaMAAdapter'
                                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/simulator/services/WebRTCService.ts:475:17 - error ts(6133): 'handleReceivedIceCandidate' is declared but its value is never read.

475   private async handleReceivedIceCandidate(
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~
src/simulator/services/WebRTCService.ts:320:9 - error ts(2532): Object is possibly 'undefined'.

320         event.streams[0].getTracks().forEach((track) => {
            ~~~~~~~~~~~~~~~~
src/simulator/services/WebRTCService.ts:224:16 - error ts(2532): Object is possibly 'undefined'.

224         sum += dataArray[i]
                   ~~~~~~~~~~~~
src/simulator/services/WebRTCService.ts:21:11 - error ts(6133): 'lastIceCandidate' is declared but its value is never read.

21   private lastIceCandidate: RTCIceCandidate | null = null
             ~~~~~~~~~~~~~~~~

src/simulator/utils/scenarios.ts:215:7 - error ts(2322): Type 'Scenario | undefined' is not assignable to type 'Scenario | null'.
  Type 'undefined' is not assignable to type 'Scenario | null'.

215     : availableScenarios[Math.floor(Math.random() * availableScenarios.length)]
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/simulator/utils/scenarios.ts:214:7 - error ts(2322): Type 'Scenario | undefined' is not assignable to type 'Scenario | null'.
  Type 'undefined' is not assignable to type 'Scenario | null'.

214     ? matchingDifficulty[Math.floor(Math.random() * matchingDifficulty.length)]
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/test/utils/astro.ts:47:3 - error ts(2322): Type '{ props: Record<string, unknown>; request: Request; url: URL; redirect: Mock<Procedure>; response: Response; slots: {}; site: URL; generator: string; }' is not assignable to type 'void'.

47   return {
     ~~~~~~

src/tests/browser-compatibility.test.ts:52:9 - error ts(2322): Type '{ features: { [x: string]: boolean; }; pages?: Record<string, PageResult> | undefined; }' is not assignable to type '{ pages: Record<string, PageResult>; features: Record<string, boolean>; }'.
  Types of property 'pages' are incompatible.

52         compatibilityResults.browsers['chromium'] = {
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/cross-browser-compatibility.test.ts:63:7 - error ts(2322): Type '{ features: { [x: string]: boolean; }; pages?: Record<string, PageResult> | undefined; }' is not assignable to type '{ pages: Record<string, PageResult>; features: Record<string, boolean>; }'.
  Types of property 'pages' are incompatible.

63       compatibilityResults.browsers['chromium'] = {
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/performance.test.ts:442:60 - error ts(1064): The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<void>'?

442 export async function simulateUserInteraction(page: Page): void {
                                                               ~~~~
src/tests/performance.test.ts:396:46 - error ts(2345): Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

396           await fs.readFile(join(resultsDir, jsonFiles[0]), 'utf-8'),
                                                 ~~~~~~~~~~~~
src/tests/performance.test.ts:306:11 - error ts(2532): Object is possibly 'undefined'.

306           results.pages[name].FID = inputDelay
              ~~~~~~~~~~~~~~~~~~~
src/tests/performance.test.ts:4:26 - error ts(2307): Cannot find module 'playwright' or its corresponding type declarations.

4 import { chromium } from 'playwright'
                           ~~~~~~~~~~~~
src/tests/performance.test.ts:1:36 - error ts(2307): Cannot find module 'playwright' or its corresponding type declarations.

1 import type { Browser, Page } from 'playwright'
                                     ~~~~~~~~~~~~
src/tests/performance.test.ts:345:11 - warning ts(80006): This may be converted to an async function.

345           ({ url, data }) => {
              ~~~~~~~~~~~~~~~~~~~~
src/tests/performance.test.ts:334:11 - warning ts(7043): Variable 'response' implicitly has an 'any' type, but a better type may be inferred from usage.

334       let response
              ~~~~~~~~
src/tests/performance.test.ts:327:51 - warning ts(7044): Parameter '_request' implicitly has an 'any' type, but a better type may be inferred from usage.

327       await page.route(`**${path}`, async (route, _request) => {
                                                      ~~~~~~~~
src/tests/performance.test.ts:327:44 - warning ts(7044): Parameter 'route' implicitly has an 'any' type, but a better type may be inferred from usage.

327       await page.route(`**${path}`, async (route, _request) => {
                                               ~~~~~
src/tests/performance.test.ts:239:36 - warning ts(7044): Parameter 'fn' implicitly has an 'any' type, but a better type may be inferred from usage.

239             functions.reduce((sum, fn) => sum + (fn.ranges[0]?.count || 0), 0)
                                       ~~
src/tests/performance.test.ts:239:31 - warning ts(7044): Parameter 'sum' implicitly has an 'any' type, but a better type may be inferred from usage.

239             functions.reduce((sum, fn) => sum + (fn.ranges[0]?.count || 0), 0)
                                  ~~~
src/tests/performance.test.ts:235:59 - warning ts(7044): Parameter 'entry' implicitly has an 'any' type, but a better type may be inferred from usage.

235         const jsExecutionTime = jsCoverage.reduce((total, entry) => {
                                                              ~~~~~
src/tests/performance.test.ts:235:52 - warning ts(7044): Parameter 'total' implicitly has an 'any' type, but a better type may be inferred from usage.

235         const jsExecutionTime = jsCoverage.reduce((total, entry) => {
                                                       ~~~~~
src/tests/performance.test.ts:232:19 - warning ts(7044): Parameter 'entry' implicitly has an 'any' type, but a better type may be inferred from usage.

232           (total, entry) => total + (entry.source?.length || 0),
                      ~~~~~
src/tests/performance.test.ts:232:12 - warning ts(7044): Parameter 'total' implicitly has an 'any' type, but a better type may be inferred from usage.

232           (total, entry) => total + (entry.source?.length || 0),
               ~~~~~

src/tests/simple-browser-compatibility.test.ts:109:12 - error ts(18046): 'featuresJson' is of type 'unknown'.

109     expect(featuresJson.css.flexbox).toBe(true)
               ~~~~~~~~~~~~
src/tests/simple-browser-compatibility.test.ts:108:12 - error ts(18046): 'featuresJson' is of type 'unknown'.

108     expect(featuresJson.arrayMethods).toBe(true)
               ~~~~~~~~~~~~
src/tests/simple-browser-compatibility.test.ts:107:12 - error ts(18046): 'featuresJson' is of type 'unknown'.

107     expect(featuresJson.promise).toBe(true)
               ~~~~~~~~~~~~
src/tests/simple-browser-compatibility.test.ts:106:12 - error ts(18046): 'featuresJson' is of type 'unknown'.

106     expect(featuresJson.fetch).toBe(true)
               ~~~~~~~~~~~~
src/tests/simple-browser-compatibility.test.ts:102:37 - error ts(2345): Argument of type 'string | null' is not assignable to parameter of type 'string'.
  Type 'null' is not assignable to type 'string'.

102     const featuresJson = JSON.parse(content) as unknown
                                        ~~~~~~~
src/tests/simple-browser-compatibility.test.ts:88:21 - error ts(4111): Property 'CI' comes from an index signature, so it must be accessed with ['CI'].

88     if (process.env.CI) {
                       ~~
src/tests/simple-browser-compatibility.test.ts:5:32 - warning ts(7044): Parameter 'directory' implicitly has an 'any' type, but a better type may be inferred from usage.

5 function ensureDirectoryExists(directory): void {
                                 ~~~~~~~~~

src/tests/ai/crisis-detection.test.ts:180:60 - error ts(2352): Conversion of type '{ content: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number; }; model: string; id: string; created: number; choices: never[]; }' to type 'AICompletion' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Property 'provider' is missing in type '{ content: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number; }; model: string; id: string; created: number; choices: never[]; }' but required in type 'AICompletion'.

180       mockAIService.createChatCompletion.mockResolvedValue({
                                                               ~
181         content: JSON.stringify({
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
... 
192         choices: []
    ~~~~~~~~~~~~~~~~~~~
193       } as AICompletion)
    ~~~~~~~~~~~~~~~~~~~~~~~
src/tests/ai/crisis-detection.test.ts:132:60 - error ts(2352): Conversion of type '{ content: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number; }; model: string; id: string; created: number; choices: never[]; }' to type 'AICompletion' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Property 'provider' is missing in type '{ content: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number; }; model: string; id: string; created: number; choices: never[]; }' but required in type 'AICompletion'.

132       mockAIService.createChatCompletion.mockResolvedValue({
                                                               ~
133         content: 'invalid json response',
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
... 
138         choices: []
    ~~~~~~~~~~~~~~~~~~~
139       } as AICompletion)
    ~~~~~~~~~~~~~~~~~~~~~~~
src/tests/ai/crisis-detection.test.ts:84:60 - error ts(2352): Conversion of type '{ content: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number; }; model: string; id: string; created: number; choices: never[]; }' to type 'AICompletion' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Property 'provider' is missing in type '{ content: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number; }; model: string; id: string; created: number; choices: never[]; }' but required in type 'AICompletion'.

 84       mockAIService.createChatCompletion.mockResolvedValue({
                                                               ~
 85         content: JSON.stringify({
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
... 
 96         choices: []
    ~~~~~~~~~~~~~~~~~~~
 97       } as AICompletion)
    ~~~~~~~~~~~~~~~~~~~~~~~
src/tests/ai/crisis-detection.test.ts:50:60 - error ts(2352): Conversion of type '{ content: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number; }; model: string; id: string; created: number; choices: never[]; }' to type 'AICompletion' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Property 'provider' is missing in type '{ content: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number; }; model: string; id: string; created: number; choices: never[]; }' but required in type 'AICompletion'.

 50       mockAIService.createChatCompletion.mockResolvedValue({
                                                               ~
 51         content: JSON.stringify({
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
... 
 62         choices: []
    ~~~~~~~~~~~~~~~~~~~
 63       } as AICompletion)
    ~~~~~~~~~~~~~~~~~~~~~~~

src/tests/components/demo/ScenarioGenerationDemo.test.tsx:2:36 - error ts(2307): Cannot find module '../components/demo/ScenarioGenerationDemo' or its corresponding type declarations.

2 import ScenarioGenerationDemo from '../components/demo/ScenarioGenerationDemo'
                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/tests/components/ui/ProgressBar.test.tsx:2:25 - error ts(2307): Cannot find module '../components/ui/progress-bar' or its corresponding type declarations.

2 import ProgressBar from '../components/ui/progress-bar'
                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/utils/auth.ts:131:11 - error ts(2304): Cannot find name 'ObjectId'.

131   userId: ObjectId
              ~~~~~~~~
src/utils/auth.ts:129:9 - error ts(2304): Cannot find name 'ObjectId'.

129   _id?: ObjectId
            ~~~~~~~~
src/utils/auth.ts:124:16 - error ts(2304): Cannot find name 'ObjectId'.

124   resolvedBy?: ObjectId
                   ~~~~~~~~
src/utils/auth.ts:117:11 - error ts(2304): Cannot find name 'ObjectId'.

117   userId: ObjectId
              ~~~~~~~~
src/utils/auth.ts:115:9 - error ts(2304): Cannot find name 'ObjectId'.

115   _id?: ObjectId
            ~~~~~~~~
src/utils/auth.ts:102:16 - error ts(2304): Cannot find name 'ObjectId'.

102   therapistId: ObjectId
                   ~~~~~~~~
src/utils/auth.ts:101:11 - error ts(2304): Cannot find name 'ObjectId'.

101   userId: ObjectId
              ~~~~~~~~
src/utils/auth.ts:99:9 - error ts(2304): Cannot find name 'ObjectId'.

99   _id?: ObjectId
           ~~~~~~~~
src/utils/auth.ts:88:11 - error ts(2304): Cannot find name 'ObjectId'.

88   userId: ObjectId
             ~~~~~~~~
src/utils/auth.ts:86:9 - error ts(2304): Cannot find name 'ObjectId'.

86   _id?: ObjectId
           ~~~~~~~~
src/utils/auth.ts:75:11 - error ts(2304): Cannot find name 'ObjectId'.

75   userId: ObjectId
             ~~~~~~~~
src/utils/auth.ts:73:9 - error ts(2304): Cannot find name 'ObjectId'.

73   _id?: ObjectId
           ~~~~~~~~
src/utils/auth.ts:67:12 - error ts(2304): Cannot find name 'ObjectId'.

67   userId?: ObjectId // For user-specific todos
              ~~~~~~~~
src/utils/auth.ts:62:9 - error ts(2304): Cannot find name 'ObjectId'.

62   _id?: ObjectId
           ~~~~~~~~
src/utils/auth.ts:53:11 - error ts(2304): Cannot find name 'ObjectId'.

53   userId: ObjectId
             ~~~~~~~~
src/utils/auth.ts:52:9 - error ts(2304): Cannot find name 'ObjectId'.

52   _id?: ObjectId
           ~~~~~~~~
src/utils/auth.ts:31:9 - error ts(2304): Cannot find name 'ObjectId'.

31   _id?: ObjectId
           ~~~~~~~~
src/utils/auth.ts:26:33 - error ts(2339): Property 'id' does not exist on type 'MockObjectId'.

26     toHexString() { return this.id }
                                   ~~
src/utils/auth.ts:25:30 - error ts(2339): Property 'id' does not exist on type 'MockObjectId'.

25     toString() { return this.id }
                                ~~
src/utils/auth.ts:23:12 - error ts(2339): Property 'id' does not exist on type 'MockObjectId'.

23       this.id = id || 'mock-object-id'
              ~~
src/utils/auth.ts:16:35 - error ts(2339): Property 'id' does not exist on type 'MockObjectId'.

16       toHexString() { return this.id }
                                     ~~
src/utils/auth.ts:15:32 - error ts(2339): Property 'id' does not exist on type 'MockObjectId'.

15       toString() { return this.id }
                                  ~~
src/utils/auth.ts:13:14 - error ts(2339): Property 'id' does not exist on type 'MockObjectId'.

13         this.id = id || 'mock-object-id'
                ~~
src/utils/auth.ts:2:5 - error ts(6133): '_ObjectId' is declared but its value is never read.

2 let _ObjectId: any
      ~~~~~~~~~

src/utils/data.ts:60:5 - error ts(2322): Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

60     return match[1]
       ~~~~~~
src/utils/data.ts:48:5 - error ts(2322): Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

48     return match[1]
       ~~~~~~

src/utils/performance-optimization.ts:153:47 - warning ts(7044): Parameter 'entryList' implicitly has an 'any' type, but a better type may be inferred from usage.

153     const observer = new PerformanceObserver((entryList) => {
                                                  ~~~~~~~~~
src/utils/performance-optimization.ts:127:47 - warning ts(7044): Parameter 'entryList' implicitly has an 'any' type, but a better type may be inferred from usage.

127     const observer = new PerformanceObserver((entryList) => {
                                                  ~~~~~~~~~
src/utils/performance-optimization.ts:101:24 - warning ts(7044): Parameter 'entry' implicitly has an 'any' type, but a better type may be inferred from usage.

101       entries.forEach((entry) => {
                           ~~~~~
src/utils/performance-optimization.ts:98:47 - warning ts(7044): Parameter 'entryList' implicitly has an 'any' type, but a better type may be inferred from usage.

98     const observer = new PerformanceObserver((entryList) => {
                                                 ~~~~~~~~~
src/utils/performance-optimization.ts:64:47 - warning ts(7044): Parameter 'entryList' implicitly has an 'any' type, but a better type may be inferred from usage.

64     const observer = new PerformanceObserver((entryList) => {
                                                 ~~~~~~~~~

src/workers/analytics-worker.ts:167:7 - warning ts(7027): Unreachable code detected.

167       return
          ~~~~~~

src/workers/email-worker.ts:3:38 - error ts(2345): Argument of type '{ prefix: string; }' is not assignable to parameter of type 'string'.

3 const logger = createBuildSafeLogger({ prefix: 'email-worker' })
                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/workers/__tests__/notification-worker.test.ts:220:31 - error ts(2345): Argument of type '{ prefix: string; }' is not assignable to parameter of type 'string'.

220         createBuildSafeLogger({ prefix: 'notification-worker' }).error,
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/workers/__tests__/notification-worker.test.ts:204:31 - error ts(2345): Argument of type '{ prefix: string; }' is not assignable to parameter of type 'string'.

204         createBuildSafeLogger({ prefix: 'notification-worker' }).error,
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/workers/__tests__/notification-worker.test.ts:143:31 - error ts(2345): Argument of type '{ prefix: string; }' is not assignable to parameter of type 'string'.

143         createBuildSafeLogger({ prefix: 'notification-worker' }).info,
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/workers/__tests__/notification-worker.test.ts:128:31 - error ts(2345): Argument of type '{ prefix: string; }' is not assignable to parameter of type 'string'.

128         createBuildSafeLogger({ prefix: 'notification-worker' }).info,
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/workers/__tests__/notification-worker.test.ts:111:31 - error ts(2345): Argument of type '{ prefix: string; }' is not assignable to parameter of type 'string'.

111         createBuildSafeLogger({ prefix: 'notification-worker' }).error,
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/workers/__tests__/notification-worker.test.ts:90:31 - error ts(2345): Argument of type '{ prefix: string; }' is not assignable to parameter of type 'string'.

90         createBuildSafeLogger({ prefix: 'notification-worker' }).error,
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/workers/__tests__/notification-worker.test.ts:65:31 - error ts(2345): Argument of type '{ prefix: string; }' is not assignable to parameter of type 'string'.

65         createBuildSafeLogger({ prefix: 'notification-worker' }).info,
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

tests/accessibility/accessibility-audit.spec.ts:113:29 - warning ts(80007): 'await' has no effect on the type of this expression.

113         const nextElement = await page.locator(':focus').first()
                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
tests/accessibility/accessibility-audit.spec.ts:92:28 - warning ts(80007): 'await' has no effect on the type of this expression.

92       let currentElement = await page.locator(':focus').first()
                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

tests/ai/response-generation.test.ts:369:9 - error ts(2353): Object literal may only specify known properties, and 'systemPrompt' does not exist in type 'ResponseGenerationConfig'.

369         systemPrompt: customPrompt,
            ~~~~~~~~~~~~
tests/ai/response-generation.test.ts:336:53 - error ts(2345): Argument of type '{ aiService: AIService; }' is not assignable to parameter of type 'ResponseGenerationConfig'.
  Property 'model' is missing in type '{ aiService: AIService; }' but required in type 'ResponseGenerationConfig'.

336       const service = new ResponseGenerationService({
                                                        ~
337         aiService: mockAIService,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
338       })
    ~~~~~~~
tests/ai/response-generation.test.ts:326:52 - error ts(2554): Expected 1 arguments, but got 2.

326         responseService.generateResponse(messages, {
                                                       ~
327           stream: true,
    ~~~~~~~~~~~~~~~~~~~~~~~
328           onStream: mockCallback,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
329         }),
    ~~~~~~~~~
tests/ai/response-generation.test.ts:301:56 - error ts(2554): Expected 1 arguments, but got 2.

301       await responseService.generateResponse(messages, {
                                                           ~
302         stream: true,
    ~~~~~~~~~~~~~~~~~~~~~
303         onStream: mockCallback,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
304       })
    ~~~~~~~
tests/ai/response-generation.test.ts:126:56 - error ts(2554): Expected 1 arguments, but got 2.

126       await responseService.generateResponse(messages, {
                                                           ~
127         maxResponseTokens: 500,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
128       })
    ~~~~~~~
tests/ai/response-generation.test.ts:89:56 - error ts(2554): Expected 1 arguments, but got 2.

89       await responseService.generateResponse(messages, {
                                                          ~
90         temperature: 0.2,
   ~~~~~~~~~~~~~~~~~~~~~~~~~
91       })
   ~~~~~~~
tests/ai/response-generation.test.ts:4:8 - error ts(6133): 'ResponseGenerationConfig' is declared but its value is never read.

4   type ResponseGenerationConfig,
         ~~~~~~~~~~~~~~~~~~~~~~~~

tests/ai/sentiment-analysis.test.ts:311:15 - error ts(2698): Spread types may only be created from object types.

311               ...(await mockAIService.createChatCompletion(
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
312                 messagesWithName,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
313                 options,
    ~~~~~~~~~~~~~~~~~~~~~~~~
314               )),
    ~~~~~~~~~~~~~~~~
tests/ai/sentiment-analysis.test.ts:284:15 - error ts(2698): Spread types may only be created from object types.

284               ...(await mockAIService.createChatCompletion(
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
285                 messagesWithName,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
286                 options,
    ~~~~~~~~~~~~~~~~~~~~~~~~
287               )),
    ~~~~~~~~~~~~~~~~
tests/ai/sentiment-analysis.test.ts:2:42 - error ts(2307): Cannot find module '@/lib/ai/services/sentiment-analysis' or its corresponding type declarations.

2 import { SentimentAnalysisService } from '@/lib/ai/services/sentiment-analysis'
                                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
tests/ai/sentiment-analysis.test.ts:306:52 - warning ts(7044): Parameter 'msg' implicitly has an 'any' type, but a better type may be inferred from usage.

306             const messagesWithName = messages.map((msg) => ({
                                                       ~~~
tests/ai/sentiment-analysis.test.ts:305:50 - warning ts(7044): Parameter 'options' implicitly has an 'any' type, but a better type may be inferred from usage.

305           createChatCompletion: async (messages, options) => {
                                                     ~~~~~~~
tests/ai/sentiment-analysis.test.ts:305:40 - warning ts(7044): Parameter 'messages' implicitly has an 'any' type, but a better type may be inferred from usage.

305           createChatCompletion: async (messages, options) => {
                                           ~~~~~~~~
tests/ai/sentiment-analysis.test.ts:279:52 - warning ts(7044): Parameter 'msg' implicitly has an 'any' type, but a better type may be inferred from usage.

279             const messagesWithName = messages.map((msg) => ({
                                                       ~~~
tests/ai/sentiment-analysis.test.ts:277:50 - warning ts(7044): Parameter 'options' implicitly has an 'any' type, but a better type may be inferred from usage.

277           createChatCompletion: async (messages, options) => {
                                                     ~~~~~~~
tests/ai/sentiment-analysis.test.ts:277:40 - warning ts(7044): Parameter 'messages' implicitly has an 'any' type, but a better type may be inferred from usage.

277           createChatCompletion: async (messages, options) => {
                                           ~~~~~~~~

tests/api/utils/APITestUtils.ts:372:20 - error ts(2345): Argument of type 'any' is not assignable to parameter of type 'never'.

372       results.push(...(batchResults as any));
                       ~~~~~~~~~~~~~~~~~~~~~~~~
tests/api/utils/APITestUtils.ts:88:13 - error ts(6133): 'data' is declared but its value is never read.

88       const data = await response.json();
               ~~~~
tests/api/utils/APITestUtils.ts:60:23 - error ts(2339): Property 'token' does not exist on type 'Response'.

60       return response.token;
                         ~~~~~
tests/api/utils/APITestUtils.ts:59:68 - error ts(2339): Property 'token' does not exist on type 'Response'.

59       this.testUsers.set('primary', { ...response, token: response.token });
                                                                      ~~~~~

tests/browser/auth.spec.ts:79:34 - warning ts(6387): The signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

79   const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle' })
                                    ~~~~~~~~~~~~~~~~~

tests/cross-browser/browser-compatibility.spec.ts:403:42 - warning ts(6385): 'navigation' is deprecated.

403           navigation: typeof performance.navigation !== 'undefined',
                                             ~~~~~~~~~~

tests/e2e/auth-journey.spec.ts:37:16 - warning ts(6387): The signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

37     await page.waitForNavigation({ waitUntil: 'networkidle' })
                  ~~~~~~~~~~~~~~~~~

tests/e2e/contextual-assistance-integration.spec.ts:28:16 - warning ts(6387): The signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

28     await page.waitForNavigation({ waitUntil: 'networkidle' })
                  ~~~~~~~~~~~~~~~~~

tests/e2e/mobile-responsiveness.spec.ts:241:36 - error ts(18048): 'device' is possibly 'undefined'.

241         await page.setViewportSize(device.viewport)
                                       ~~~~~~
tests/e2e/mobile-responsiveness.spec.ts:234:19 - error ts(18048): 'device' is possibly 'undefined'.

234           height: device.viewport.width,
                      ~~~~~~
tests/e2e/mobile-responsiveness.spec.ts:233:18 - error ts(18048): 'device' is possibly 'undefined'.

233           width: device.viewport.height,
                     ~~~~~~
tests/e2e/mobile-responsiveness.spec.ts:23:51 - error ts(18048): 'device' is possibly 'undefined'.

23       expect(viewport?.width).toBeLessThanOrEqual(device.viewport.width)
                                                     ~~~~~~
tests/e2e/mobile-responsiveness.spec.ts:12:51 - error ts(2339): Property 'name' does not exist on type 'DeviceDescriptor'.

12   test.describe(`Mobile Responsiveness - ${device.name}`, () => {
                                                     ~~~~
tests/e2e/mobile-responsiveness.spec.ts:12:44 - error ts(18048): 'device' is possibly 'undefined'.

12   test.describe(`Mobile Responsiveness - ${device.name}`, () => {
                                              ~~~~~~

tests/e2e/test-utils.ts:52:14 - warning ts(6387): The signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

52   await page.waitForNavigation({ waitUntil: 'networkidle' })
                ~~~~~~~~~~~~~~~~~
tests/e2e/test-utils.ts:37:14 - warning ts(6387): The signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

37   await page.waitForNavigation({ waitUntil: 'networkidle' })
                ~~~~~~~~~~~~~~~~~

tests/e2e/user-acceptance.spec.ts:28:16 - warning ts(6387): The signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

28     await page.waitForNavigation({ waitUntil: 'networkidle' })
                  ~~~~~~~~~~~~~~~~~

tests/e2e/user-experience.spec.ts:57:16 - error ts(2551): Property '_hasTransition' does not exist on type 'Window & typeof globalThis'. Did you mean 'CSSTransition'?

57         window._hasTransition = false
                  ~~~~~~~~~~~~~~
tests/e2e/user-experience.spec.ts:52:23 - error ts(2551): Property '_hasTransition' does not exist on type 'Window & typeof globalThis'. Did you mean 'CSSTransition'?

52         return window._hasTransition === true
                         ~~~~~~~~~~~~~~
tests/e2e/user-experience.spec.ts:44:16 - error ts(2339): Property '_checkTransition' does not exist on type 'Window & typeof globalThis'.

44         window._checkTransition(element)
                  ~~~~~~~~~~~~~~~~
tests/e2e/user-experience.spec.ts:42:7 - error ts(2322): Type '<T extends Node>(element: T) => Node' is not assignable to type '<T extends Node>(node: T) => T'.
  Type 'Node' is not assignable to type 'T'.

42       Element.prototype.appendChild = function (element) {
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
tests/e2e/user-experience.spec.ts:37:18 - error ts(2551): Property '_hasTransition' does not exist on type 'Window & typeof globalThis'. Did you mean 'CSSTransition'?

37           window._hasTransition = true
                    ~~~~~~~~~~~~~~
tests/e2e/user-experience.spec.ts:32:14 - error ts(2339): Property '_checkTransition' does not exist on type 'Window & typeof globalThis'.

32       window._checkTransition = function (element) {
                ~~~~~~~~~~~~~~~~
tests/e2e/user-experience.spec.ts:211:16 - warning ts(6387): The signature '(options?: { timeout?: number | undefined; url?: string | RegExp | ((url: URL) => boolean) | undefined; waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined; } | undefined): Promise<...>' of 'page.waitForNavigation' is deprecated.

211     await page.waitForNavigation()
                   ~~~~~~~~~~~~~~~~~
tests/e2e/user-experience.spec.ts:32:43 - warning ts(7044): Parameter 'element' implicitly has an 'any' type, but a better type may be inferred from usage.

32       window._checkTransition = function (element) {
                                             ~~~~~~~

tests/e2e/mcp-examples/auth-flow.spec.ts:128:30 - error ts(2531): Object is possibly 'null'.

128     const newContext = await page.context().browser().newContext()
                                 ~~~~~~~~~~~~~~~~~~~~~~~~
tests/e2e/mcp-examples/auth-flow.spec.ts:2:29 - error ts(2307): Cannot find module '@playwright/mcp' or its corresponding type declarations.

2 import { mcpSnapshot } from '@playwright/mcp'
                              ~~~~~~~~~~~~~~~~~

tests/e2e/specs/dashboard/dashboard.spec.ts:18:52 - error ts(6133): 'page' is declared but its value is never read.

18   test('should display dashboard elements', async ({ page }) => {
                                                      ~~~~~~~~

tests/integration/bias-detection-api.integration.test.ts:438:75 - error ts(2339): Property 'json' does not exist on type 'never'.

438         const rateLimitData: ApiResponse = await rateLimitedResponses[0]!.json()
                                                                              ~~~~
tests/integration/bias-detection-api.integration.test.ts:433:62 - error ts(2339): Property 'status' does not exist on type 'never'.

433       const rateLimitedResponses = responses.filter((r) => r.status === 429)
                                                                 ~~~~~~
tests/integration/bias-detection-api.integration.test.ts:413:11 - error ts(2345): Argument of type 'Promise<Response>' is not assignable to parameter of type 'never'.

413           fetch(analyzeEndpoint, {
              ~~~~~~~~~~~~~~~~~~~~~~~~
414             method: 'POST',
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~
... 
425             }),
    ~~~~~~~~~~~~~~~
426           }),
    ~~~~~~~~~~~~

tests/integration/layout-integration.spec.ts:69:61 - error ts(2339): Property 'greaterThan' does not exist on type '(count: number, options?: { timeout?: number | undefined; } | undefined) => Promise<void>'.

69     await expect(page.locator('.article-card')).toHaveCount.greaterThan(0)
                                                               ~~~~~~~~~~~

tests/integration/static-generation.spec.ts:164:17 - error ts(2769): No overload matches this call.
  Overload 1 of 5, '(condition: boolean, description?: string | undefined): void', gave the following error.
  Overload 2 of 5, '(callback: ConditionBody<PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions>, description?: string | undefined): void', gave the following error.

164       test.skip('No code blocks found in the blog post')
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
tests/integration/static-generation.spec.ts:134:17 - error ts(2769): No overload matches this call.
  Overload 1 of 5, '(condition: boolean, description?: string | undefined): void', gave the following error.
  Overload 2 of 5, '(callback: ConditionBody<PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions>, description?: string | undefined): void', gave the following error.

134       test.skip('No blog post with code examples found')
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
tests/integration/static-generation.spec.ts:11:61 - error ts(2339): Property 'greaterThan' does not exist on type '(count: number, options?: { timeout?: number | undefined; } | undefined) => Promise<void>'.

11     await expect(page.locator('.article-card')).toHaveCount.greaterThan(1)
                                                               ~~~~~~~~~~~

tests/mobile/mobile-responsiveness.spec.ts:391:20 - error ts(18048): 'page' is possibly 'undefined'.

391       await expect(page.locator('text=Validation Results')).toBeVisible({
                       ~~~~
tests/mobile/mobile-responsiveness.spec.ts:388:24 - error ts(18048): 'page' is possibly 'undefined'.

388       const textArea = page.locator('[placeholder*="Enter psychology content"]')
                           ~~~~
tests/mobile/mobile-responsiveness.spec.ts:385:9 - error ts(18048): 'page' is possibly 'undefined'.

385         page.locator('[data-testid="validation-section"]'),
            ~~~~
tests/mobile/mobile-responsiveness.spec.ts:383:13 - error ts(18048): 'page' is possibly 'undefined'.

383       await page.click('[data-testid="validation-tab"]')
                ~~~~
tests/mobile/mobile-responsiveness.spec.ts:380:26 - error ts(2532): Object is possibly 'undefined'.

380       const deviceName = mobileDevices[i].name
                             ~~~~~~~~~~~~~~~~
tests/mobile/mobile-responsiveness.spec.ts:286:17 - error ts(18048): 'device.viewport' is possibly 'undefined'.

286         height: device.viewport.width,
                    ~~~~~~~~~~~~~~~
tests/mobile/mobile-responsiveness.spec.ts:285:16 - error ts(18048): 'device.viewport' is possibly 'undefined'.

285         width: device.viewport.height,
                   ~~~~~~~~~~~~~~~
tests/mobile/mobile-responsiveness.spec.ts:271:34 - error ts(2345): Argument of type 'ViewportSize | undefined' is not assignable to parameter of type '{ width: number; height: number; }'.
  Type 'undefined' is not assignable to type '{ width: number; height: number; }'.

271       await page.setViewportSize(device.viewport);
                                     ~~~~~~~~~~~~~~~
tests/mobile/mobile-responsiveness.spec.ts:266:17 - error ts(18048): 'device.viewport' is possibly 'undefined'.

266         height: device.viewport.width,
                    ~~~~~~~~~~~~~~~
tests/mobile/mobile-responsiveness.spec.ts:265:16 - error ts(18048): 'device.viewport' is possibly 'undefined'.

265         width: device.viewport.height,
                   ~~~~~~~~~~~~~~~
tests/mobile/mobile-responsiveness.spec.ts:38:52 - error ts(18048): 'device.viewport' is possibly 'undefined'.

38       expect(viewport?.height).toBeLessThanOrEqual(device.viewport.height);
                                                      ~~~~~~~~~~~~~~~
tests/mobile/mobile-responsiveness.spec.ts:37:51 - error ts(18048): 'device.viewport' is possibly 'undefined'.

37       expect(viewport?.width).toBeLessThanOrEqual(device.viewport.width);
                                                     ~~~~~~~~~~~~~~~

tests/regression/regression-suite.spec.ts:270:41 - warning ts(7044): Parameter 'route' implicitly has an 'any' type, but a better type may be inferred from usage.

270     await page.route('**/api/**', async route => {
                                            ~~~~~

tests/regression/utils/RegressionUtils.ts:24:45 - warning ts(7044): Parameter 'route' implicitly has an 'any' type, but a better type may be inferred from usage.

24         await page.route('**/api/**', async route => {
                                               ~~~~~
tests/regression/utils/RegressionUtils.ts:20:39 - warning ts(7044): Parameter 'route' implicitly has an 'any' type, but a better type may be inferred from usage.

20         await page.route('**/api/**', route => route.abort());
                                         ~~~~~
tests/regression/utils/RegressionUtils.ts:13:45 - warning ts(7044): Parameter 'route' implicitly has an 'any' type, but a better type may be inferred from usage.

13         await page.route('**/api/**', async route => {
                                               ~~~~~

tests/usability/utils/UsabilityUtils.ts:203:21 - warning ts(80007): 'await' has no effect on the type of this expression.

203           viewport: await page.viewportSize(),
                        ~~~~~~~~~~~~~~~~~~~~~~~~~

plugins/remark-directive-sugar.ts:175:15 - error ts(6133): '_isOrg' is declared but its value is never read.

175           let _isOrg = false
                  ~~~~~~
plugins/remark-directive-sugar.ts:174:15 - error ts(6133): '_resolvedTab' is declared but its value is never read.

174           let _resolvedTab = ''
                  ~~~~~~~~~~~~