/**
 * BroadcastChannel utility for cross-tab communication
 */

const CHANNEL_NAME = "notes-app";

export type BroadcastMessage = {
  type: "note-created" | "note-updated" | "note-deleted";
  noteId?: number;
};

// Create a singleton broadcast channel
let channel: BroadcastChannel | null = null;

export function getBroadcastChannel(): BroadcastChannel {
  if (!channel) {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }
  return channel;
}

export function broadcastNoteChange(message: BroadcastMessage) {
  const channel = getBroadcastChannel();
  channel.postMessage(message);
}

export function subscribeToBroadcast(callback: (message: BroadcastMessage) => void) {
  const channel = getBroadcastChannel();
  const handler = (event: MessageEvent<BroadcastMessage>) => callback(event.data);
  channel.addEventListener("message", handler);

  // Return cleanup function
  return () => channel.removeEventListener("message", handler);
}
