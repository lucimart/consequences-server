// @ts-ignore
export const post = (parent, _, context) => {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).post();
};

// @ts-ignore
export const reply = (parent, _, context) => {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).reply();
};

// @ts-ignore
export const user = (parent, _, context) => {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
};
