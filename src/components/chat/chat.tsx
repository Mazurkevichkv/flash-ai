import { ChatMessage } from "@/types";
import { getUserMessages } from "@/utils/chat.helper";

export const Chat = ({ messages }: { messages: ChatMessage[] }) => {
  const userMessages = getUserMessages(messages);

  return userMessages.map((m) => (
    <div key={m.id}>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-success">{m.content}</div>
      </div>
    </div>
  ));
};
