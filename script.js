class ThrottledFunction extends Function {
    constructor(fn, interval) {
        super('...args', 'return this._call(...args)');
        this.lastCall = 0;
        this._call = (...args) => {
            const now = Date.now();
            if (now - this.lastCall >= interval) {
                this.lastCall = now;
                return fn(...args);
            }
        };
    }
}

const throttledLog = new ThrottledFunction(console.log, 2000);
throttledLog("Bu chiqadi");
setTimeout(() => throttledLog("Bu 2 soniyadan keyin chiqadi"), 2500);
