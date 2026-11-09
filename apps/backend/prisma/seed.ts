import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { departmentData } from "../src/api/v1/data/departments";
import { roleData } from "../src/api/v1/data/roles";

// 1. Setup connection string and driver adapter for Prisma 7
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required for seeding");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.role.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();

  for (const department of departmentData) {
    await prisma.department.create({
      data: {
        name: department.name,
        employees: {
          create: department.employees.map((employee) => ({
            firstName: employee.firstName,
            lastName: employee.lastName,
          })),
        },
      },
    });
  }

  for (const role of roleData) {
    await prisma.role.create({
      data: {
        title: role.title,
        employee: role.employee
          ? {
              create: {
                firstName: role.employee.firstName,
                lastName: role.employee.lastName,
              },
            }
          : undefined,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });