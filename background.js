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
var _this = this;
chrome.runtime.onInstalled.addListener(function () { return init(); });
function init() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Starting Tracker...");
                    chrome.alarms.create('alarm1', { periodInMinutes: 15 });
                    chrome.contextMenus.create({ title: "Tracker App - add track for \"%s\"", contexts: ["selection"], id: 'ADD:TRACK' });
                    return [4 /*yield*/, setBadge(0)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function refreshAll() {
    return __awaiter(this, void 0, void 0, function () {
        var trackingNumbers, _i, trackingNumbers_1, trackingNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('updating all...');
                    return [4 /*yield*/, storage.getTracks()];
                case 1:
                    trackingNumbers = (_a.sent()).map(function (t) { return t.trackingNumber; });
                    _i = 0, trackingNumbers_1 = trackingNumbers;
                    _a.label = 2;
                case 2:
                    if (!(_i < trackingNumbers_1.length)) return [3 /*break*/, 5];
                    trackingNumber = trackingNumbers_1[_i];
                    return [4 /*yield*/, refreshTrack(trackingNumber)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('update complete');
                    return [2 /*return*/];
            }
        });
    });
}
function refreshTrack(trackingNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var oldTrack, track, unreadTracks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("updating ".concat(trackingNumber, "..."));
                    return [4 /*yield*/, storage.setLoadingTrack(trackingNumber, true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, popup.execute('/loading')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, storage.getTrack(trackingNumber)];
                case 3:
                    oldTrack = _a.sent();
                    return [4 /*yield*/, api.fetchTrack(trackingNumber)];
                case 4:
                    track = _a.sent();
                    if (!!track) return [3 /*break*/, 7];
                    return [4 /*yield*/, storage.setLoadingTrack(trackingNumber, false)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, popup.execute('/loading')];
                case 6:
                    _a.sent();
                    console.log("error updating ".concat(trackingNumber));
                    _a.label = 7;
                case 7:
                    if (!(track.status != oldTrack.status)) return [3 /*break*/, 11];
                    return [4 /*yield*/, notify(track.status, track.trackingNumber)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, storage.getUnreadTracks()];
                case 9:
                    unreadTracks = _a.sent();
                    if (!!unreadTracks.includes(trackingNumber)) return [3 /*break*/, 11];
                    unreadTracks.push(trackingNumber);
                    return [4 /*yield*/, storage.setUnreadTracks(unreadTracks)];
                case 10:
                    _a.sent();
                    setBadge(unreadTracks.length);
                    _a.label = 11;
                case 11:
                    track.updateCount = (track.updateCount || 0) + 1;
                    return [4 /*yield*/, storage.setTrack(track)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, storage.setLoadingTrack(trackingNumber, false)];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, popup.execute('/loading')];
                case 14:
                    _a.sent();
                    console.log("updated ".concat(trackingNumber));
                    return [2 /*return*/];
            }
        });
    });
}
function addTrack(trackingNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var tracks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storage.getTracks()];
                case 1:
                    tracks = _a.sent();
                    if (!!tracks.find(function (t) { return t.trackingNumber == trackingNumber; })) return [3 /*break*/, 4];
                    tracks.push({ trackingNumber: trackingNumber });
                    return [4 /*yield*/, storage.setTracks(tracks)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, notifySilent('Track added', trackingNumber)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, notifySilent('Track already exists', trackingNumber)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function notify(title, message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (r) { return chrome.notifications.create(null, { type: 'basic', iconUrl: 'images/icon.png', title: title, message: message }, r); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function notifySilent(title, message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (r) { return chrome.notifications.create(null, { type: 'basic', iconUrl: 'images/icon.png', title: title, message: message, silent: true }, r); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//background router
chrome.runtime.onMessage.addListener(function (msg, sender, send) {
    new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var tracks, asc, desc, tracks, id_1, tracks, track, newTrack_1, tracks, track, id_2, tracks, i, id, id_3, tracks, i, track, id_4, tracks, i, track, id_5, tracks, i, unreads, loadingTracks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(msg.route == '/refresh')) return [3 /*break*/, 2];
                    return [4 /*yield*/, refreshAll()];
                case 1:
                    _a.sent();
                    resolve(null);
                    _a.label = 2;
                case 2:
                    if (!(msg.route == '/sort')) return [3 /*break*/, 5];
                    return [4 /*yield*/, storage.getTracks()];
                case 3:
                    tracks = _a.sent();
                    asc = tracks.concat().sort(function (a, b) { return (new Date(a.date).getTime() || Infinity) - (new Date(b.date).getTime() || Infinity); });
                    desc = asc.concat().reverse();
                    tracks = JSON.stringify(tracks) == JSON.stringify(asc) ? desc : asc;
                    return [4 /*yield*/, storage.setTracks(tracks)];
                case 4:
                    _a.sent();
                    resolve(null);
                    _a.label = 5;
                case 5:
                    if (!(msg.route == '/tracks')) return [3 /*break*/, 7];
                    return [4 /*yield*/, storage.getTracks()];
                case 6:
                    tracks = _a.sent();
                    resolve(tracks);
                    _a.label = 7;
                case 7:
                    if (!(msg.route == '/tracks/get')) return [3 /*break*/, 9];
                    id_1 = msg.data;
                    return [4 /*yield*/, storage.getTracks()];
                case 8:
                    tracks = _a.sent();
                    track = tracks.find(function (t) { return t.trackingNumber == id_1; });
                    resolve(track);
                    _a.label = 9;
                case 9:
                    if (!(msg.route == '/tracks/update')) return [3 /*break*/, 12];
                    newTrack_1 = msg.data;
                    return [4 /*yield*/, storage.getTracks()];
                case 10:
                    tracks = _a.sent();
                    track = tracks.find(function (t) { return t.trackingNumber == newTrack_1.trackingNumber; });
                    Object.assign(track, newTrack_1);
                    return [4 /*yield*/, storage.setTracks(tracks)];
                case 11:
                    _a.sent();
                    resolve(null);
                    _a.label = 12;
                case 12:
                    if (!(msg.route == '/tracks/delete')) return [3 /*break*/, 16];
                    id_2 = msg.data;
                    return [4 /*yield*/, storage.getTracks()];
                case 13:
                    tracks = _a.sent();
                    i = tracks.findIndex(function (t) { return t.trackingNumber == id_2; });
                    if (!(i >= 0)) return [3 /*break*/, 15];
                    tracks.splice(i, 1);
                    return [4 /*yield*/, storage.setTracks(tracks)];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    resolve(null);
                    _a.label = 16;
                case 16:
                    if (!(msg.route == '/tracks/refresh')) return [3 /*break*/, 18];
                    id = msg.data;
                    return [4 /*yield*/, refreshTrack(id)];
                case 17:
                    _a.sent();
                    resolve(null);
                    _a.label = 18;
                case 18:
                    if (!(msg.route == '/tracks/move-up')) return [3 /*break*/, 22];
                    id_3 = msg.data;
                    return [4 /*yield*/, storage.getTracks()];
                case 19:
                    tracks = _a.sent();
                    i = tracks.findIndex(function (t) { return t.trackingNumber == id_3; });
                    if (!(i - 1 >= 0)) return [3 /*break*/, 21];
                    track = tracks[i];
                    tracks.splice(i, 1);
                    tracks.splice(i - 1, 0, track);
                    return [4 /*yield*/, storage.setTracks(tracks)];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21:
                    resolve(null);
                    _a.label = 22;
                case 22:
                    if (!(msg.route == '/tracks/move-down')) return [3 /*break*/, 26];
                    id_4 = msg.data;
                    return [4 /*yield*/, storage.getTracks()];
                case 23:
                    tracks = _a.sent();
                    i = tracks.findIndex(function (t) { return t.trackingNumber == id_4; });
                    if (!(i + 1 <= tracks.length)) return [3 /*break*/, 25];
                    track = tracks[i];
                    tracks.splice(i, 1);
                    tracks.splice(i + 1, 0, track);
                    return [4 /*yield*/, storage.setTracks(tracks)];
                case 24:
                    _a.sent();
                    _a.label = 25;
                case 25:
                    resolve(null);
                    _a.label = 26;
                case 26:
                    if (!(msg.route == '/tracks/delete')) return [3 /*break*/, 30];
                    id_5 = msg.data;
                    return [4 /*yield*/, storage.getTracks()];
                case 27:
                    tracks = _a.sent();
                    i = tracks.findIndex(function (t) { return t.trackingNumber == id_5; });
                    if (!(i >= 0)) return [3 /*break*/, 29];
                    tracks.splice(i, 1);
                    return [4 /*yield*/, storage.setTracks(tracks)];
                case 28:
                    _a.sent();
                    _a.label = 29;
                case 29:
                    resolve(null);
                    _a.label = 30;
                case 30:
                    if (!(msg.route == '/unreads')) return [3 /*break*/, 32];
                    return [4 /*yield*/, storage.getUnreadTracks()];
                case 31:
                    unreads = _a.sent();
                    resolve(unreads);
                    _a.label = 32;
                case 32:
                    if (!(msg.route == '/unreads/clear')) return [3 /*break*/, 35];
                    return [4 /*yield*/, storage.setUnreadTracks([])];
                case 33:
                    _a.sent();
                    return [4 /*yield*/, setBadge(0)];
                case 34:
                    _a.sent();
                    resolve(null);
                    _a.label = 35;
                case 35:
                    if (!(msg.route == '/loading')) return [3 /*break*/, 37];
                    return [4 /*yield*/, storage.getLoadingTracks()];
                case 36:
                    loadingTracks = _a.sent();
                    resolve(loadingTracks);
                    _a.label = 37;
                case 37:
                    resolve(null);
                    return [2 /*return*/];
            }
        });
    }); }).then(send);
    return true;
});
chrome.contextMenus.onClicked.addListener(function (info) {
    if (info.menuItemId == 'ADD:TRACK') {
        addTrack(info.selectionText);
    }
});
chrome.alarms.onAlarm.addListener(function (info) {
    if (info.name == 'alarm1') {
        refreshAll();
    }
});
function setBadge(count, isError) {
    return __awaiter(this, void 0, void 0, function () {
        var color;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    color = isError ? '#dc3545' : '#28a745';
                    return [4 /*yield*/, new Promise(function (r) { return chrome.action.setBadgeBackgroundColor({ color: color }, r); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (r) { return chrome.action.setBadgeText({ text: count ? count.toString() : '' }, r); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//-----------
