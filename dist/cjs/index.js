"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFragment = exports.parse = exports.TokenizerMode = exports.Tokenizer = exports.Token = exports.html = exports.foreignContent = exports.serializeOuter = exports.serialize = exports.Parser = exports.defaultTreeAdapter = void 0;
const index_js_1 = require("./parser/index.js");
var default_js_1 = require("./tree-adapters/default.js");
Object.defineProperty(exports, "defaultTreeAdapter", { enumerable: true, get: function () { return default_js_1.defaultTreeAdapter; } });
var index_js_2 = require("./parser/index.js");
Object.defineProperty(exports, "Parser", { enumerable: true, get: function () { return index_js_2.Parser; } });
var index_js_3 = require("./serializer/index.js");
Object.defineProperty(exports, "serialize", { enumerable: true, get: function () { return index_js_3.serialize; } });
Object.defineProperty(exports, "serializeOuter", { enumerable: true, get: function () { return index_js_3.serializeOuter; } });
/** @internal */
exports.foreignContent = __importStar(require("./common/foreign-content.js"));
/** @internal */
exports.html = __importStar(require("./common/html.js"));
/** @internal */
exports.Token = __importStar(require("./common/token.js"));
/** @internal */
var index_js_4 = require("./tokenizer/index.js");
Object.defineProperty(exports, "Tokenizer", { enumerable: true, get: function () { return index_js_4.Tokenizer; } });
Object.defineProperty(exports, "TokenizerMode", { enumerable: true, get: function () { return index_js_4.TokenizerMode; } });
// Shorthands
/**
 * Parses an HTML string.
 *
 * @param html Input HTML string.
 * @param options Parsing options.
 * @returns Document
 *
 * @example
 *
 * ```js
 * const parse5 = require('parse5');
 *
 * const document = parse5.parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>');
 *
 * console.log(document.childNodes[1].tagName); //> 'html'
 *```
 */
function parse(html, options) {
    return index_js_1.Parser.parse(html, options);
}
exports.parse = parse;
function parseFragment(fragmentContext, html, options) {
    if (typeof fragmentContext === 'string') {
        options = html;
        html = fragmentContext;
        fragmentContext = null;
    }
    const parser = index_js_1.Parser.getFragmentParser(fragmentContext, options);
    parser.tokenizer.write(html, true);
    return parser.getFragment();
}
exports.parseFragment = parseFragment;
//# sourceMappingURL=index.js.map