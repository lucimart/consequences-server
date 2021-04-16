// @ts-ignore
const author = async (parent, _, context) => {
  return await context.prisma.author
    .findUnique({ where: { id: parent.id } })
    .author();
};

// @ts-ignore
const group = async (parent, _, context) => {
  return await context.prisma.group
    .findUnique({ where: { id: parent.id } })
    .group();
};

// @ts-ignore
const text = async (parent, _, context) => {
  return await context.prisma.text
    .findUnique({ where: { id: parent.id } })
    .text();
};

// @ts-ignore
const image = async (parent, _, context) => {
  return await context.prisma.image
    .findUnique({ where: { id: parent.id } })
    .image();
};

export { author, group, text, image };
