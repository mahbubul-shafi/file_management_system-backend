import prisma from "../../config/prisma";

const createFolder = async (userId: string, payload: any) => {
  const { name, parentId } = payload;

  // 1️⃣ Get active subscription
  const activeSubscription = await prisma.userSubscription.findFirst({
    where: {
      userId,
      isActive: true,
    },
    include: {
      package: true,
    },
  });

  if (!activeSubscription) {
    throw new Error("No active subscription found");
  }

  const packageLimits = activeSubscription.package;

  // 2️⃣ Check total folders
  const totalFolders = await prisma.folder.count({
    where: { userId },
  });

  if (totalFolders >= packageLimits.maxFolders) {
    throw new Error("Max folder limit reached");
  }

  let level = 1;

  // 3️⃣ Check nesting
  if (parentId) {
    const parentFolder = await prisma.folder.findUnique({
      where: { id: parentId },
    });

    if (!parentFolder) {
      throw new Error("Parent folder not found");
    }

    level = parentFolder.level + 1;

    if (level > packageLimits.maxNestingLevel) {
      throw new Error("Max nesting level exceeded");
    }
  }

  // 4️⃣ Create folder
  const folder = await prisma.folder.create({
    data: {
      name,
      userId,
      parentId: parentId || null,
      level,
    },
  });

  return folder;
};

export const FolderService = {
  createFolder,
};