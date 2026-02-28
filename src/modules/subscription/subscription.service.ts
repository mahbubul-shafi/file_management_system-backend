import prisma from "../../config/prisma";
import { FileType } from "@prisma/client";

const createPackage = async (payload: any) => {
  const {
    name,
    maxFolders,
    maxNestingLevel,
    maxFileSizeMB,
    totalFileLimit,
    filesPerFolder,
    allowedFileTypes,
  } = payload;

  const existing = await prisma.subscriptionPackage.findUnique({
    where: { name },
  });

  if (existing) {
    throw new Error("Package already exists");
  }

  const newPackage = await prisma.subscriptionPackage.create({
    data: {
      name,
      maxFolders,
      maxNestingLevel,
      maxFileSizeMB,
      totalFileLimit,
      filesPerFolder,
      allowedFileTypes: {
        create: allowedFileTypes.map((type: FileType) => ({
          fileType: type,
        })),
      },
    },
    include: {
      allowedFileTypes: true,
    },
  });

  return newPackage;
};

const getAllPackages = async () => {
  return prisma.subscriptionPackage.findMany({
    include: { allowedFileTypes: true },
  });
};

const updatePackage = async (id: string, payload: any) => {
  const {
    maxFolders,
    maxNestingLevel,
    maxFileSizeMB,
    totalFileLimit,
    filesPerFolder,
    allowedFileTypes,
  } = payload;

  await prisma.packageAllowedFileType.deleteMany({
    where: { packageId: id },
  });

  return prisma.subscriptionPackage.update({
    where: { id },
    data: {
      maxFolders,
      maxNestingLevel,
      maxFileSizeMB,
      totalFileLimit,
      filesPerFolder,
      allowedFileTypes: {
        create: allowedFileTypes.map((type: FileType) => ({
          fileType: type,
        })),
      },
    },
    include: { allowedFileTypes: true },
  });
};

const deletePackage = async (id: string) => {
  return prisma.subscriptionPackage.delete({
    where: { id },
  });
};

export const SubscriptionService = {
  createPackage,
  getAllPackages,
  updatePackage,
  deletePackage,
};