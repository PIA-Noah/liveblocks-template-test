import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Presence, Storage, UserMeta } from "@/spreadsheet/types";

import Router from "next/router";
import { DOCUMENT_URL } from "@/constants";
import { authorizeLiveblocks, getSpecificDocuments } from "@/lib/actions";
import { getUsers } from "./lib/database";

const client = createClient({
  authEndpoint: async () => {
    const { data, error } = await authorizeLiveblocks();

    if (error) {
      Router.push({
        query: {
          ...Router.query,
          error: encodeURIComponent(JSON.stringify(error)),
        },
      });
      return;
    }

    return data;
  },

  // Resolve user IDs into name/avatar/etc for Comments/Notifications
  async resolveUsers({ userIds }) {
    const users = await getUsers({ userIds });
    return users.map((user) => user || {});
  },

  // Resolve a mention suggestion into a userId e.g. `@tat` → `tatum.paolo@example.com`
  async resolveMentionSuggestions({ text }) {
    const users = await getUsers({ search: text });
    return users.map((user) => user?.id || "");
  },

  // Resolve a room ID into room information for Notifications
  async resolveRoomsInfo({ roomIds }) {
    const documents = await getSpecificDocuments({ documentIds: roomIds });
    return documents.map((document) => ({
      name: document ? document.name : undefined,
      url: document ? DOCUMENT_URL(document.type, document.id) : undefined,
    }));
  },
});

// Optionally, the type of custom events broadcast and listened for in this
// room. Must be JSON-serializable.
export type RoomEvent = {
  type: "SHARE_DIALOG_UPDATE";
};

export const {
  RoomProvider,
  useRoom,
  useHistory,
  useSelf,
  useCanUndo,
  useCanRedo,
  useOthers,
  useBroadcastEvent,
  useEventListener,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
