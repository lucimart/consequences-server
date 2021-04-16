"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.group = exports.author = void 0;
// @ts-ignore
var author = function (parent, _, context) {
    return context.prisma.group.findUnique({ where: { id: parent.id } }).author();
};
exports.author = author;
// @ts-ignore
var group = function (parent, _, context) {
    return context.prisma.group.findUnique({ where: { id: parent.id } }).group();
};
exports.group = group;
