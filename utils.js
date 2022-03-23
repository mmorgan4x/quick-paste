var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var background = /** @class */ (function () {
    function background() {
    }
    background.execute = function (route, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (t) { return chrome.runtime.sendMessage({ route: route, data: data }, t); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return background;
}());
var popup = /** @class */ (function () {
    function popup() {
    }
    popup.execute = function (route, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (t) { return chrome.runtime.sendMessage({ route: route, data: data }, t); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return popup;
}());
var storage = /** @class */ (function () {
    function storage() {
    }
    storage.set = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // this.cache.set(key, Promise.resolve(value));
                    return [4 /*yield*/, new Promise(function (t) {
                            var _a;
                            return chrome.storage.sync.set((_a = {}, _a[key] = value, _a), t);
                        })];
                    case 1:
                        // this.cache.set(key, Promise.resolve(value));
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    storage.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (t) { return chrome.storage.sync.get(key, t); }).then(function (t) { return t[key]; })];
                    case 1: 
                    // if (!this.cache.has(key)) {
                    //   this.cache.set(key, new Promise(t => chrome.storage.sync.get(key, t)).then(t => t[key]));
                    // }
                    // return await this.cache.get(key) as T;
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    storage.getTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('tracks')];
                    case 1: return [2 /*return*/, (_a.sent()) || []];
                }
            });
        });
    };
    storage.setTracks = function (tracks) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.set('tracks', tracks)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    storage.getTrack = function (trackingNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTracks()];
                    case 1: return [2 /*return*/, (_a.sent()).find(function (t) { return t.trackingNumber == trackingNumber; })];
                }
            });
        });
    };
    storage.setTrack = function (track) {
        return __awaiter(this, void 0, void 0, function () {
            var tracks, oldTrack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTracks()];
                    case 1:
                        tracks = _a.sent();
                        oldTrack = tracks.find(function (t) { return t.trackingNumber == track.trackingNumber; });
                        if (oldTrack) {
                            Object.assign(oldTrack, track);
                        }
                        else {
                            tracks.push(track);
                        }
                        return [4 /*yield*/, storage.setTracks(tracks)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    storage.getUnreadTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('unreadTracks')];
                    case 1: return [2 /*return*/, (_a.sent()) || []];
                }
            });
        });
    };
    storage.setUnreadTracks = function (trackingNumbers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.set('unreadTracks', trackingNumbers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    storage.getLoadingTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('loadingTracks')];
                    case 1: return [2 /*return*/, (_a.sent()) || []];
                }
            });
        });
    };
    storage.setLoadingTracks = function (trackingNumbers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.set('loadingTracks', trackingNumbers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    storage.setLoadingTrack = function (trackingNumber, toggle) {
        return __awaiter(this, void 0, void 0, function () {
            var trackingNumbers, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLoadingTracks()];
                    case 1:
                        trackingNumbers = _a.sent();
                        if (toggle) {
                            if (!trackingNumbers.includes(trackingNumber)) {
                                trackingNumbers.push(trackingNumber);
                            }
                        }
                        else {
                            i = trackingNumbers.indexOf(trackingNumber);
                            if (i >= 0) {
                                trackingNumbers.splice(i, 1);
                            }
                        }
                        return [4 /*yield*/, this.setLoadingTracks(trackingNumbers)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    storage.cache = new Map();
    return storage;
}());
var api = /** @class */ (function () {
    function api() {
    }
    api.fetch = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(this.baseUrl).concat(url)).then(function (t) { return t.json(); }).then(function (t) { return t; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    api.fetchTrack = function (trackingNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch("/track/".concat(trackingNumber)).catch(function (t) { return null; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    api.baseUrl = 'https://mmorgan-tracking-app.herokuapp.com';
    return api;
}());
function promisify(fn, context) {
    return function (t) { return new Promise(function (r) { return (context ? fn.bind(context) : fn)(t, r); }); };
}
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function N_A() {
    return '<span class="na">N/A</span>';
}
function parseHtml(str) {
    var done = false;
    while (!done) {
        var i = /\*if\(([^\)]+)\)\{([^\}]+)\}/.exec(str);
        if (i) {
            var condition = !!JSON.parse(i[1].replace(/'/g, '"'));
            var val = i[2];
            str = str.replace(i[0], condition ? val : '');
        }
        else {
            done = true;
        }
    }
    return str;
}
