// @ts-ignore
export const ownerOf = (parent, _, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).ownerOf();
};

// @ts-ignore
export const posts = (parent, _, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).posts();
};

// @ts-ignore
export const profile = (parent, _, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).profile();
};

// @ts-ignore
export const role = (parent, _, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).role();
};

// @ts-ignore
export const memberOf = (parent, _, context) => {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .memberOf();
};

// @ts-ignore
export const votes = (parent, _, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).votes();
};

// @ts-ignore
export const replies = (parent, _, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).replies();
};
