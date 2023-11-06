import {
  ChatMessage,
  LangToken,
  TokenSeparator,
  WordsSeparator,
} from "@/types";

export const parseMessage = (message: string): LangToken[] => {
  const tokens = message
    .split(TokenSeparator)
    .map((t) => t.split(WordsSeparator));

  return tokens.map((t) => ({
    category: t[0],
    word: t[1],
    translation: t[2],
  }));
};

export const getLastAssistantMessage = (
  messages: ChatMessage[],
): ChatMessage => {
  const m = messages.filter((m) => m.role === "assistant");
  return m[m.length - 1];
};

export const getUserMessages = (messages: ChatMessage[]): ChatMessage[] => {
  return messages.filter((m) => m.role === "user");
};
