// @ts-ignore
export const author = (parent, _, context) => {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).author();
};

// @ts-ignore
export const text = (parent, _, context) => {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).text();
};

// @ts-ignore
export const image = (parent, _, context) => {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).image();
};

// @ts-ignore
export const group = (parent, _, context) => {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).group();
};

// @ts-ignore
export const votes = (parent, _, context) => {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).votes();
};

// @ts-ignore
export const replies = (parent, _, context) => {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).replies();
};

// @ts-ignore
export const parent = (parent, _, context) => {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).parent();
};

// @ts-ignore
export const children = (parent, _, context) => {
  return context.prisma.post
    .findUnique({ where: { id: parent.id } })
    .children();
};
