-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vk_event" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "creator_vk_id" TEXT NOT NULL,
    "group_vk_id" TEXT NOT NULL,

    CONSTRAINT "vk_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vk_user" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "vk_id" TEXT NOT NULL,

    CONSTRAINT "vk_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raffle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "Raffle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaffleUser" (
    "user_id" INTEGER NOT NULL,
    "raffle_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "RaffleUser_pkey" PRIMARY KEY ("user_id","raffle_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vk_event_event_id_key" ON "vk_event"("event_id");

-- CreateIndex
CREATE INDEX "vk_event_creator_vk_id_idx" ON "vk_event"("creator_vk_id");

-- CreateIndex
CREATE UNIQUE INDEX "vk_user_user_id_key" ON "vk_user"("user_id");

-- CreateIndex
CREATE INDEX "vk_user_vk_id_idx" ON "vk_user"("vk_id");

-- CreateIndex
CREATE UNIQUE INDEX "Raffle_event_id_key" ON "Raffle"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "Raffle_id_event_id_key" ON "Raffle"("id", "event_id");

-- AddForeignKey
ALTER TABLE "vk_event" ADD CONSTRAINT "vk_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vk_user" ADD CONSTRAINT "vk_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
