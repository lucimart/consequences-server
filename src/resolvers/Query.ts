import { PrismaClient } from ".prisma/client";
import { Post } from "@prisma/client";

const prisma = new PrismaClient();

const postsByGroup = async (groupId, context) =>
  await context.prisma.group.findUnique({ where: { id: groupId } }).posts();

export const feed = async (
  _parent,
  { groupId = 1, parentId, take = 10 },
  context
) => {
  parentId = parentId ? parentId : (await postsByGroup(groupId, context)).id;
  let parent = await prisma.post.findUnique({
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
