"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeOuter = exports.serialize = void 0;
const html_js_1 = require("../common/html.js");
const default_js_1 = require("../tree-adapters/default.js");
// Sets
const VOID_ELEMENTS = new Set([
    html_js_1.TAG_NAMES.AREA,
    html_js_1.TAG_NAMES.BASE,
    html_js_1.TAG_NAMES.BASEFONT,
    html_js_1.TAG_NAMES.BGSOUND,
    html_js_1.TAG_NAMES.BR,
    html_js_1.TAG_NAMES.COL,
    html_js_1.TAG_NAMES.EMBED,
    html_js_1.TAG_NAMES.FRAME,
    html_js_1.TAG_NAMES.HR,
    html_js_1.TAG_NAMES.IMG,
    html_js_1.TAG_NAMES.INPUT,
    html_js_1.TAG_NAMES.KEYGEN,
    html_js_1.TAG_NAMES.LINK,
    html_js_1.TAG_NAMES.META,
    html_js_1.TAG_NAMES.PARAM,
    html_js_1.TAG_NAMES.SOURCE,
    html_js_1.TAG_NAMES.TRACK,
    html_js_1.TAG_NAMES.WBR,
]);
function isVoidElement(node, options) {
    return (options.treeAdapter.isElementNode(node) &&
        options.treeAdapter.getNamespaceURI(node) === html_js_1.NS.HTML &&
        VOID_ELEMENTS.has(options.treeAdapter.getTagName(node)));
}
const defaultOpts = {
    treeAdapter: default_js_1.defaultTreeAdapter,
    scriptingEnabled: true,
};
/**
 * Serializes an AST node to an HTML string.
 *
 * @example
 *
 * ```js
 * const parse5 = require('parse5');
 *
 * const document = parse5.parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>');
 *
 * // Serializes a document.
 * const html = parse5.serialize(document);
 *
 * // Serializes the <html> element content.
 * const str = parse5.serialize(document.childNodes[1]);
 *
 * console.log(str); //> '<head></head><body>Hi there!</body>'
 * ```
 *
 * @param node Node to serialize.
 * @param options Serialization options.
 */
function serialize(node, options) {
    var _a;
    const defaultTreeAdapter = defaultOpts.treeAdapter;
    const opts = Object.assign(Object.assign(Object.assign({}, defaultOpts), options), { treeAdapter: Object.assign(Object.assign({}, defaultTreeAdapter), ((_a = options === null || options === void 0 ? void 0 : options.treeAdapter) !== null && _a !== void 0 ? _a : {})) });
    if (isVoidElement(node, opts)) {
        return "";
    }
    return serializeChildNodes(node, opts);
}
exports.serialize = serialize;
/**
 * Serializes an AST element node to an HTML string, including the element node.
 *
 * @example
 *
 * ```js
 * const parse5 = require('parse5');
 *
 * const document = parse5.parseFragment('<div>Hello, <b>world</b>!</div>');
 *
 * // Serializes the <div> element.
 * const html = parse5.serializeOuter(document.childNodes[0]);
 *
 * console.log(str); //> '<div>Hello, <b>world</b>!</div>'
 * ```
 *
 * @param node Node to serialize.
 * @param options Serialization options.
 */
function serializeOuter(node, options) {
    var _a;
    const defaultTreeAdapter = defaultOpts.treeAdapter;
    const opts = Object.assign(Object.assign(Object.assign({}, defaultOpts), options), { treeAdapter: Object.assign(Object.assign({}, defaultTreeAdapter), ((_a = options === null || options === void 0 ? void 0 : options.treeAdapter) !== null && _a !== void 0 ? _a : {})) });
    return serializeNode(node, opts);
}
exports.serializeOuter = serializeOuter;
function serializeChildNodes(parentNode, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    let html = "";
    // Get container of the child nodes
    const container = ((_b = (_a = options.treeAdapter) === null || _a === void 0 ? void 0 : _a.isElementNode) === null || _b === void 0 ? void 0 : _b.call(_a, parentNode)) &&
        ((_d = (_c = options.treeAdapter) === null || _c === void 0 ? void 0 : _c.getTagName) === null || _d === void 0 ? void 0 : _d.call(_c, parentNode)) === html_js_1.TAG_NAMES.TEMPLATE &&
        ((_f = (_e = options.treeAdapter) === null || _e === void 0 ? void 0 : _e.getNamespaceURI) === null || _f === void 0 ? void 0 : _f.call(_e, parentNode)) === html_js_1.NS.HTML
        ? (_h = (_g = options.treeAdapter) === null || _g === void 0 ? void 0 : _g.getTemplateContent) === null || _h === void 0 ? void 0 : _h.call(_g, parentNode)
        : parentNode;
    const childNodes = (_k = (_j = options.treeAdapter) === null || _j === void 0 ? void 0 : _j.getChildNodes) === null || _k === void 0 ? void 0 : _k.call(_j, container);
    if (childNodes) {
        for (const currentNode of childNodes) {
            html += serializeNode(currentNode, options);
        }
    }
    return html;
}
function serializeNode(node, options) {
    if (options.treeAdapter.isElementNode(node)) {
        return serializeElement(node, options);
    }
    if (options.treeAdapter.isTextNode(node)) {
        return serializeTextNode(node, options);
    }
    if (options.treeAdapter.isCommentNode(node)) {
        return serializeCommentNode(node, options);
    }
    if (options.treeAdapter.isDocumentTypeNode(node)) {
        return serializeDocumentTypeNode(node, options);
    }
    // Return an empty string for unknown nodes
    return "";
}
function serializeElement(node, options) {
    var _a, _b;
    const tn = (_b = (_a = options.treeAdapter).getTagName) === null || _b === void 0 ? void 0 : _b.call(_a, node);
    return `<${tn}${serializeAttributes(node, options)}>${isVoidElement(node, options)
        ? ""
        : `${serializeChildNodes(node, options)}</${tn}>`}`;
}
function serializeAttributes(node, { treeAdapter }) {
    let html = "";
    for (const attr of treeAdapter.getAttrList(node)) {
        html += " ";
        if (!attr.namespace) {
            html += attr.name;
        }
        else
            switch (attr.namespace) {
                case html_js_1.NS.XML: {
                    html += `xml:${attr.name}`;
                    break;
                }
                case html_js_1.NS.XMLNS: {
                    if (attr.name !== "xmlns") {
                        html += "xmlns:";
                    }
                    html += attr.name;
                    break;
                }
                case html_js_1.NS.XLINK: {
                    html += `xlink:${attr.name}`;
                    break;
                }
                default: {
                    html += `${attr.prefix}:${attr.name}`;
                }
            }
        html += `="${attr.value}"`;
    }
    return html;
}
function serializeTextNode(node, options) {
    var _a, _b;
    const { treeAdapter } = options;
    const content = (_b = (_a = treeAdapter.getTextNodeContent) === null || _a === void 0 ? void 0 : _a.call(treeAdapter, node)) !== null && _b !== void 0 ? _b : "";
    return content;
}
function serializeCommentNode(node, { treeAdapter }) {
    var _a;
    return `<!--${(_a = treeAdapter === null || treeAdapter === void 0 ? void 0 : treeAdapter.getCommentNodeContent) === null || _a === void 0 ? void 0 : _a.call(treeAdapter, node)}-->`;
}
function serializeDocumentTypeNode(node, { treeAdapter }) {
    var _a;
    return `<!DOCTYPE ${(_a = treeAdapter === null || treeAdapter === void 0 ? void 0 : treeAdapter.getDocumentTypeNodeName) === null || _a === void 0 ? void 0 : _a.call(treeAdapter, node)}>`;
}
//# sourceMappingURL=index.js.map