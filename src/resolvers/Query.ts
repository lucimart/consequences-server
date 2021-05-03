import { PrismaClient } from "@prisma/client";
import { Context } from "../context";

const prisma = new PrismaClient();

const postsByGroup = async (groupId, context: Context) =>
  await context.prisma.group.findUnique({ where: { id: groupId } }).posts();

export const feed = async (
  _parent,
  { groupId = 1, parentId, take = 10 },
  context: Context
) => {
  parentId = parentId ? parentId : (await postsByGroup(groupId, context))[0].id;
  let parent = await context.prisma.post.findUnique({
    where: { id: parentId },
    include: { children: true },
  });
  let tree: any[] = [];
  let children;
  let i = -1;
  while (++i < take) {
    tree.push(parent);
    if (tree[i]?.children.length > 0) {
      children = tree[i]?.children
        .sort(
          (child1: any, child2: any) => child1.votesCount - child2.votesCount
        )
        .reverse();
      parent = await prisma.post.findUnique({
        where: { id: children[0].id },
        include: { children: true },
      });
    } else break;
  }
  return tree;
};

export const text = async (_parent, { postId }, context: Context) => {
  return await context.prisma.text.findUnique({
    where: { postId: parseInt(postId) },
    include: { post: true },
  });
};
