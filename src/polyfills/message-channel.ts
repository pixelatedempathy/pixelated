if (typeof MessageChannel === 'undefined') {
  (globalThis as any).MessageChannel = class {
    port1 = { postMessage: () => {}, onmessage: null, start: () => {}, close: () => {} }
    port2 = { postMessage: () => {}, onmessage: null, start: () => {}, close: () => {} }
  }
}
