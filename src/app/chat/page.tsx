// ./app/page.js
"use client";

import { useCompletion } from "ai/react";
import { useEffect, useState } from "react";
import { Chat } from "@/components/chat/chat";
import { LangToken, TokenCompletionMode } from "@/types";
import { parseMessage } from "@/utils/chat.helper";

function LangCardContent({
  token,
  showFullInfo = false,
}: {
  token: LangToken;
  showFullInfo?: boolean;
}) {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex flex-col">
      <header className="flex justify-between space-x-4">
        <h2 className="card-title">{token.word}</h2>
        <div className="form-control">
          <label className="cursor-pointer label ">
            <div className="tooltip tooltip-accent" data-tip="save">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="checkbox checkbox-accent"
              />
            </div>
          </label>
        </div>
      </header>
      <i>{token.category}</i>
      <b>{token.translation}</b>
      {token.details && showFullInfo && (
        <>
          <br />
          <pre className="whitespace-pre-wrap">{token.details}</pre>
        </>
      )}
    </div>
  );
}

function LangCard({
  token,
  complete,
}: {
  token: LangToken;
  complete: (s: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="p-2 min-w-fit md:w-1/2 w-full">
      <div className="card bg-white shadow-xl">
        <div className="card-body">
          <LangCardContent token={token} />
        </div>
        <button
          className="btn btn-accent"
          onClick={() => {
            setIsModalOpen(true);
            // @ts-ignore
            document.getElementById(token.word)?.showModal();
          }}
        >
          more
        </button>
      </div>
      <WordModal token={token} isOpen={isModalOpen} complete={complete} />
    </div>
  );
}

function WordModal({
  token,
  isOpen,
  complete,
}: {
  token: LangToken;
  isOpen: boolean;
  complete: (s: string) => void;
}) {
  useEffect(() => {
    if (isOpen) {
      complete(`Word: ${token.word}`);
    }
  }, [isOpen]);

  return (
    <dialog id={token.word} className="modal">
      <div className="modal-box bg-white">
        <LangCardContent token={token} showFullInfo={true} />
        <div className="w-full h-20 justify-center flex ">
          {!token.details && (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

function CardsList(props: { data: LangToken[] }) {
  const { complete } = useCompletion({
    api: "api/chat",
    body: {
      mode: TokenCompletionMode.DETAILED_INFO,
    },
  });

  const handleComplete = (token: LangToken, req: string) => {
    complete(req).then((res) => {
      token.details = res || "not found";
    });
  };

  return (
    <section className="flex flex-row flex-wrap justify-center">
      {props.data.map((t: LangToken) => (
        <LangCard
          key={t.word}
          token={t}
          complete={(req) => handleComplete(t, req)}
        />
      ))}
    </section>
  );
}

export default function Page() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    body: {
      mode: TokenCompletionMode.TOKEN_GENERATION,
    },
    api: "api/chat",
  });

  const [cardsData, setCardsData] = useState<LangToken[]>([]);

  useEffect(() => {
    if (completion) {
      const tokens = parseMessage(completion);
      setCardsData(tokens);
    }
  }, [completion]);

  return (
    <div className="flex flex-col justify-center items-center max-w-screen p-4">
      <form onSubmit={handleSubmit} className="w-full md:w-1/2  h-60">
        <textarea
          className="textarea textarea-accent w-full h-[70%] bg-white"
          value={input}
          placeholder="Say something in Spanish..."
          onChange={handleInputChange}
        ></textarea>
        <button className="btn btn-accent float-right" type="submit">
          Go!
        </button>
      </form>
      {input && <Chat messages={[{ role: "user", content: input, id: "" }]} />}
      <CardsList data={cardsData} />
    </div>
  );
}
