// @ts-ignore
const author = async (parent, _, context) => {
  return await context.prisma.author
    .findUnique({ where: { id: parent.authorId } })
    .author();
};

// @ts-ignore
const group = async (parent, _, context) => {
  return await context.prisma.group
    .findUnique({ where: { id: parent.groupId } })
    .group();
};

// @ts-ignore
const text = async (parent, _, context) => {
  return await context.prisma.text
    .findUnique({ where: { postId: parent.id } })
    .text();
};

// @ts-ignore
const image = async (parent, _, context) => {
  return await context.prisma.image
    .findUnique({ where: { postId: parent.id } })
    .image();
};

export { author, group, text, image };
