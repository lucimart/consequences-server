"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
// @ts-ignore
var post = function (parent, _, context) {
    return context.prisma.group.findUnique({ where: { id: parent.id } }).post();
};
exports.post = post;
