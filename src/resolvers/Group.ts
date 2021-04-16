// @ts-ignore
export const owner = (parent, _, context) => {
  return context.prisma.group.findUnique({ where: { id: parent.id } }).owner();
};

// @ts-ignore
export const posts = (parent, _, context) => {
  return context.prisma.group.findUnique({ where: { id: parent.id } }).posts();
};

// @ts-ignore
export const members = (parent, _, context) => {
  return context.prisma.group
    .findUnique({ where: { id: parent.id } })
    .members();
};
