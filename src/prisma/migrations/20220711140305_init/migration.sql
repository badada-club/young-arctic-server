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

-- CreateIndex
CREATE UNIQUE INDEX "vk_event_event_id_key" ON "vk_event"("event_id");

-- CreateIndex
CREATE INDEX "vk_event_creator_vk_id_idx" ON "vk_event"("creator_vk_id");

-- AddForeignKey
ALTER TABLE "vk_event" ADD CONSTRAINT "vk_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
