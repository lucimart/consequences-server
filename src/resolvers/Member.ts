// @ts-ignore
export const user = (parent, _, context) => {
  return context.prisma.member.findUnique({ where: { id: parent.id } }).user();
};

// @ts-ignore
export const group = (parent, _, context) => {
  return context.prisma.member.findUnique({ where: { id: parent.id } }).group();
};
