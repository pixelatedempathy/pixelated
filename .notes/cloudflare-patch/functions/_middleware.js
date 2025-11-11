// Polyfill MessageChannel for Cloudflare Workers - MUST BE FIRST
if (typeof MessageChannel === 'undefined') {
  globalThis.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = { postMessage: () => {}, onmessage: null, start: () => {}, close: () => {}, addEventListener: () => {}, removeEventListener: () => {} }
      this.port2 = { postMessage: () => {}, onmessage: null, start: () => {}, close: () => {}, addEventListener: () => {}, removeEventListener: () => {} }
    }
  }
}

export async function onRequest(context) {
  return await context.next()
}
