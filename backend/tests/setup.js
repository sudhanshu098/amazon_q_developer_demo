// Mock Redis client for testing
const mockClient = {
  data: new Map(),
  counters: new Map(),
  
  async keys(pattern) {
    const keys = Array.from(this.data.keys());
    if (pattern === 'user:*') {
      return keys.filter(key => key.startsWith('user:'));
    }
    return keys;
  },
  
  async hGetAll(key) {
    return this.data.get(key) || {};
  },
  
  async hSet(key, obj) {
    this.data.set(key, { ...this.data.get(key), ...obj });
  },
  
  async incr(key) {
    const current = this.counters.get(key) || 0;
    const newValue = current + 1;
    this.counters.set(key, newValue);
    return newValue;
  },
  
  async exists(key) {
    return this.data.has(key) ? 1 : 0;
  },
  
  async del(key) {
    return this.data.delete(key) ? 1 : 0;
  },
  
  async flushAll() {
    this.data.clear();
    this.counters.clear();
  }
};

beforeEach(async () => {
  await mockClient.flushAll();
});

global.mockClient = mockClient;