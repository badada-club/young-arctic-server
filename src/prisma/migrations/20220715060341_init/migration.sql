-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "cost" TEXT,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vk_events" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "creator_vk_id" TEXT NOT NULL,
    "group_vk_id" TEXT NOT NULL,

    CONSTRAINT "vk_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vk_users" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "vk_id" TEXT NOT NULL,

    CONSTRAINT "vk_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raffles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "raffles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raffle_user" (
    "user_id" INTEGER NOT NULL,
    "raffle_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "raffle_user_pkey" PRIMARY KEY ("user_id","raffle_id")
);

-- CreateTable
CREATE TABLE "webhook_targets" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "webhook_targets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vk_events_event_id_key" ON "vk_events"("event_id");

-- CreateIndex
CREATE INDEX "vk_events_creator_vk_id_idx" ON "vk_events"("creator_vk_id");

-- CreateIndex
CREATE UNIQUE INDEX "vk_users_user_id_key" ON "vk_users"("user_id");

-- CreateIndex
CREATE INDEX "vk_users_vk_id_idx" ON "vk_users"("vk_id");

-- CreateIndex
CREATE UNIQUE INDEX "raffles_event_id_key" ON "raffles"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "raffles_id_event_id_key" ON "raffles"("id", "event_id");

-- AddForeignKey
ALTER TABLE "vk_events" ADD CONSTRAINT "vk_events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vk_users" ADD CONSTRAINT "vk_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raffles" ADD CONSTRAINT "raffles_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
