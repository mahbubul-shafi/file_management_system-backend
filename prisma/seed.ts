import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@storage.com";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: Role.ADMIN,
        isEmailVerified: true,
      },
    });

    console.log("✅ Default admin created");
  } else {
    console.log("⚠️ Admin already exists");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());