/* jshint esversion: 6 */
import express from 'express';
const app = express();
const PORT = process.env.PORT || 4321;

app.get('/health', (req, res) => res.status(200).send('OK'));

app.get('/', (req, res) => res.send('Pixelated Empathy Home'));

app.listen(PORT, () => console.log(`pixelated-app listening on port ${PORT}`));

!function(){
  try {
    const e = "undefined" != typeof window ? window
      : "undefined" != typeof global ? global
      : "undefined" != typeof globalThis ? globalThis
      : "undefined" != typeof self ? self : {};
    const n = (new e.Error).stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "93104627-6895-5eb0-96a4-0c009e1915b5");
  } catch (err) {
    console.error('Sentry debug ID assignment failed:', err);
  }
}();
