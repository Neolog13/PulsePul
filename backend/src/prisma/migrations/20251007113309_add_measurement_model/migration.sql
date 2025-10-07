-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "sap" TEXT NOT NULL,
    "dap" TEXT NOT NULL,
    "pulse" TEXT NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);
