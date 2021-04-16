// @ts-ignore
export const author = (parent, _, context) => {
  return context.prisma.reply.findUnique({ where: { id: parent.id } }).author();
};

// @ts-ignore
export const post = (parent, _, context) => {
  return context.prisma.reply.findUnique({ where: { id: parent.id } }).post();
};

// @ts-ignore
export const votes = (parent, _, context) => {
  return context.prisma.reply.findUnique({ where: { id: parent.id } }).votes();
};

// @ts-ignore
export const parent = (parent, _, context) => {
  return context.prisma.reply.findUnique({ where: { id: parent.id } }).parent();
};

// @ts-ignore
export const children = (parent, _, context) => {
  return context.prisma.reply.findUnique({ where: { id: parent.id } }).author();
};
