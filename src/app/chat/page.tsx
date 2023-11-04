// ./app/page.js
"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { Chat } from "@/components/chat/chat";
import { ChatMessage, LangToken } from "@/types";
import { getLastAssistantMessage, parseMessage } from "@/utils/chat.helper";

function LangCard({ token }: { token: LangToken }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="p-4">
      <div className="card bg-white w-60 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{token.word}</h2>
          <i>{token.category}</i>
          <b>{token.translation}</b>
          <div className="form-control w-1/2 ml-auto mt-2">
            <label className="cursor-pointer label ">
              <span className="text-neutral pr-4">save</span>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="checkbox checkbox-accent"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardsList(props: { data: LangToken[] }) {
  return (
    <section className="flex flex-row flex-wrap justify-center">
      {props.data.map((t: LangToken) => (
        <LangCard token={t} />
      ))}{" "}
    </section>
  );
}

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const [cardsData, setCardsData] = useState<LangToken[]>([]);

  useEffect(() => {
    const response = getLastAssistantMessage(messages as ChatMessage[]);
    if (response) {
      const tokens = parseMessage(response.content);
      setCardsData(tokens);
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-center items-center w-screen p-10">
      {false && <Chat messages={messages as ChatMessage[]} />}
      <form onSubmit={handleSubmit} className="w-1/2 h-1/3">
        <textarea
          className="textarea textarea-accent w-full h-full bg-white"
          value={input}
          placeholder="Say something in Spanish..."
          onChange={handleInputChange}
        ></textarea>
        <button className="btn btn-accent float-right" type="submit">
          Go!
        </button>
      </form>

      <CardsList data={cardsData} />
    </div>
  );
}
