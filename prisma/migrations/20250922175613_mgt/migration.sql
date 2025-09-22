-- CreateTable
CREATE TABLE "public"."buddies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT[],
    "size" TEXT NOT NULL,
    "age_years" INTEGER NOT NULL,
    "adopted" BOOLEAN NOT NULL,
    "colors" TEXT[],
    "description" TEXT NOT NULL,
    "traits" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "buddies_pkey" PRIMARY KEY ("id")
);
