export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export enum TokenCompletionMode {
  TOKEN_GENERATION,
  DETAILED_INFO,
}

export const TokenSeparator = "|";
export const WordsSeparator = ":";

export type LangToken = {
  category: string;
  word: string;
  translation: string;
  details?: string;
};
