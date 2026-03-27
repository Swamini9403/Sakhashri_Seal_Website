/**
 * console-purge.js
 * Aggressively silences Cursor IDE extension noise (404s and logs)
 */
(function() {
    const noisePatterns = ['zybTrackerStatisticsAction', 'WAP plat undefined', 'copilot.b68e6a51.js'];

    // 1. Monkey-patch Console methods
    const methods = ['log', 'debug', 'info', 'warn', 'error'];
    methods.forEach(method => {
        const original = console[method];
        console[method] = function() {
            const msg = Array.from(arguments).join(' ');
            if (noisePatterns.some(p => msg.includes(p))) return;
            original.apply(console, arguments);
        };
    });

    // 2. Monkey-patch Fetch to prevent 404 logs from network noise
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
        const url = typeof input === 'string' ? input : (input.url || '');
        if (noisePatterns.some(p => url.includes(p))) {
            return Promise.resolve(new Response(JSON.stringify({ success: true }), {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/json' }
            }));
        }
        return originalFetch.apply(this, arguments);
    };

    // 3. Monkey-patch XMLHttpRequest for the same reason
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        this._url = url;
        if (typeof url === 'string' && noisePatterns.some(p => url.includes(p))) {
            // Override send to do nothing and return success
            this.send = function() {
                Object.defineProperty(this, 'readyState', { value: 4 });
                Object.defineProperty(this, 'status', { value: 200 });
                Object.defineProperty(this, 'responseText', { value: '{"success":true}' });
                if (this.onreadystatechange) this.onreadystatechange();
                if (this.onload) this.onload();
            };
            return;
        }
        return originalOpen.apply(this, arguments);
    };

    // 4. Global error handler for extension-injected errors
    window.addEventListener('error', function(event) {
        if (event.filename && noisePatterns.some(p => event.filename.includes(p))) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, true);

    console.log('🛡️ Console Filter Active: Noisy extension logs suppressed.');
})();
