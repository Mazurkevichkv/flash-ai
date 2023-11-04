import { ChatMessage } from "@/types";

export const Chat = ({ messages }: { messages: ChatMessage[] }) => {
  return messages.map((m) => (
    <div key={m.id}>
      {m.role}: {m.content}
    </div>
  ));
};
