class background {
  static async execute<T>(route: string, data?: any) {
    return await new Promise<T>(t => chrome.runtime.sendMessage({ route, data }, t));
  }
}

class popup {
  static async execute<T>(route: string, data?: any) {
    return await new Promise<T>(t => chrome.runtime.sendMessage({ route, data }, t));
  }
}

class storage {
  static cache = new Map<string, Promise<any>>();

  static async set<T>(key: string, value: T) {
    // this.cache.set(key, Promise.resolve(value));
    await new Promise<void>(t => chrome.storage.sync.set({ [key]: value }, t));
  }
  static async get<T>(key: string) {
    // if (!this.cache.has(key)) {
    //   this.cache.set(key, new Promise(t => chrome.storage.sync.get(key, t)).then(t => t[key]));
    // }
    // return await this.cache.get(key) as T;
    return await new Promise(t => chrome.storage.sync.get(key, t)).then(t => t[key] as T);
  }

  static async getEntries() {
    return await this.get<TextEntry[]>('entries') || [];
  }
  static async setEntries(tracks: TextEntry[]) {
    return await this.set('entries', tracks);
  }

}

function parseHtml(str: string) {
  let done = false;
  while (!done) {
    let i = /\*if\(([^\)]+)\)\{([^\}]+)\}/.exec(str);
    if (i) {
      let condition = !!JSON.parse(i[1].replace(/'/g, '"'));
      let val = i[2];
      str = str.replace(i[0], condition ? val : '');
    }
    else {
      done = true;
    }
  }
  return str;
}
