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
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var unreads;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //add popup class when in popup view
                    $('body').toggleClass('popup', chrome.extension.getViews({ type: "popup" }).length > 0);
                    //menu buttons
                    $('body').on('click', '.refresh-all-btn', function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, background.execute('/refresh')];
                                case 1:
                                    _a.sent();
                                    render();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    $('body').on('click', '.options-btn', function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, new Promise(function (r) { return chrome.runtime.openOptionsPage(r); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    $('body').on('click', '.sort-btn', function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, background.execute('/sort')];
                                case 1:
                                    _a.sent();
                                    render();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    //item buttons
                    $('body').on('click', '.refresh-btn', function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var id;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = $(e.currentTarget).data('id');
                                    return [4 /*yield*/, background.execute('/tracks/refresh', id)];
                                case 1:
                                    _a.sent();
                                    render();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    $('body').on('click', '.delete-btn', function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var id;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = $(e.currentTarget).data('id');
                                    return [4 /*yield*/, background.execute('/tracks/delete', id)];
                                case 1:
                                    _a.sent();
                                    render();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    $('body').on('click', '.move-up-btn', function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var id;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = $(e.currentTarget).data('id');
                                    return [4 /*yield*/, background.execute('/tracks/move-up', id)];
                                case 1:
                                    _a.sent();
                                    render();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    $('body').on('click', '.move-down-btn', function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var id;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = $(e.currentTarget).data('id');
                                    return [4 /*yield*/, background.execute('/tracks/move-down', id)];
                                case 1:
                                    _a.sent();
                                    render();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    $('body').on('click', '.edit-btn', function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var id, track;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = $(e.currentTarget).data('id');
                                    return [4 /*yield*/, background.execute('/tracks/get', id)];
                                case 1:
                                    track = _a.sent();
                                    $('.edit-save-btn').data('id', track.trackingNumber);
                                    $('.edit-description').val(track.description);
                                    $('#edit-modal').modal('show');
                                    render();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    $('body').on('click', '.edit-save-btn', function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var id, description;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = $(e.currentTarget).data('id');
                                    description = $('.edit-description').val();
                                    return [4 /*yield*/, background.execute('/tracks/update', { trackingNumber: id, description: description })];
                                case 1:
                                    _a.sent();
                                    $('#edit-modal').modal('hide');
                                    render();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    //page events
                    $('body').on('click auxclick', 'a', function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(e.ctrlKey || e.button == 1)) return [3 /*break*/, 2];
                                    e.preventDefault();
                                    return [4 /*yield*/, new Promise(function (r) { return chrome.tabs.create({ url: e.currentTarget.href, selected: false }, r); })];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    //render page
                    return [4 /*yield*/, render()];
                case 1:
                    //render page
                    _a.sent();
                    return [4 /*yield*/, background.execute('/unreads')];
                case 2:
                    unreads = _a.sent();
                    unreads.forEach(function (t) { return $(".tracks tr[data-id='".concat(t, "'")).addClass('flash'); });
                    setTimeout(function () { return $('.tracks tr').removeClass('flash'); }, 1000);
                    return [4 /*yield*/, background.execute('/unreads/clear')];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
function render() {
    return __awaiter(this, void 0, void 0, function () {
        var tracks, _i, tracks_1, track;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, background.execute('/tracks')];
                case 1:
                    tracks = _a.sent();
                    $('.tracks').empty();
                    for (_i = 0, tracks_1 = tracks; _i < tracks_1.length; _i++) {
                        track = tracks_1[_i];
                        $('.tracks').append(parseHtml(/* html */ "\n\t\t\t<tr data-id=\"".concat(track.trackingNumber, "\">\n\t\t\t\t*if(").concat(!!track.carrier, "){<td title=\"").concat(track.carrier, "\"><img class=\"carrier-icon\" src=\"/images/").concat(track.carrier, ".png\"></td>}\n\t\t\t\t*if(").concat(!track.carrier, "){<td class=\"text-center\"><i class=\"fa fa-question-circle\"></i></td>}\n\t\t\t\t<td>").concat(track.description || '', "</td>\n\t\t\t\t*if(").concat(!!track.url, "){<td><a href=\"").concat(track.url, "\" target=\"_blank\">").concat(track.trackingNumber, "</a></td>}\n\t\t\t\t*if(").concat(!track.url, "){<td>").concat(track.trackingNumber, "</td>}\n\t\t\t\t<td class=\"").concat(track.status == 'Delivered' ? 'text-success' : '', "\">").concat(track.status || N_A(), "</td>\n\t\t\t\t<td title=\"update count: ").concat(track.updateCount, "\">").concat(track.date ? formatDate(track.date) : N_A(), "</td>\n\t\t\t\t<td>\n\t\t\t\t\t<div class=\"dropdown\">\n\t\t\t\t\t\t<div class=\"btn btn-sm btn-light dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"fa fa-ellipsis-v\"></i></div>\n\t\t\t\t\t\t<div class=\"dropdown-menu dropdown-menu-right\">\n\t\t\t\t\t\t\t<div class=\"dropdown-item refresh-btn\" data-id=\"").concat(track.trackingNumber, "\"><i class=\"fa fa-refresh fa-fw mr-1\"></i> Refresh</div>\n\t\t\t\t\t\t\t<div class=\"dropdown-item edit-btn\" data-id=\"").concat(track.trackingNumber, "\"><i class=\"fa fa-edit fa-fw mr-1\"></i> Edit</div>\n\t\t\t\t\t\t\t<div class=\"dropdown-item delete-btn\" data-id=\"").concat(track.trackingNumber, "\"><i class=\"fa fa-trash fa-fw mr-1\"></i> Delete</div>\n\t\t\t\t\t\t\t<div class=\"dropdown-item move-up-btn\" data-id=\"").concat(track.trackingNumber, "\"><i class=\"fa fa-level-up fa-fw mr-1\"></i> Move up</div>\n\t\t\t\t\t\t\t<div class=\"dropdown-item move-down-btn\" data-id=\"").concat(track.trackingNumber, "\"><i class=\"fa fa-level-down fa-fw mr-1\"></i> Move down</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t")));
                    }
                    //hide/show no tracks message
                    $('.no-tracks').toggleClass('d-none', !!tracks.length);
                    return [4 /*yield*/, renderLoadingTracks()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function renderLoadingTracks() {
    return __awaiter(this, void 0, void 0, function () {
        var loadingTracks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, background.execute('/loading')];
                case 1:
                    loadingTracks = _a.sent();
                    $(".tracks tr").removeClass('loading');
                    loadingTracks.forEach(function (t) { return $(".tracks tr[data-id='".concat(t, "'")).addClass('loading'); });
                    return [2 /*return*/];
            }
        });
    });
}
chrome.runtime.onMessage.addListener(function (msg, sender, send) {
    new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(msg.route == '/loading')) return [3 /*break*/, 2];
                    return [4 /*yield*/, renderLoadingTracks()];
                case 1:
                    _a.sent();
                    resolve();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }).then(send);
    return true;
});
