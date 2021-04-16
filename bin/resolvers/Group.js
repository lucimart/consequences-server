"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.owner = void 0;
// @ts-ignore
var owner = function (parent, _, context) {
    return context.prisma.group.findUnique({ where: { id: parent.id } }).owner();
};
exports.owner = owner;
