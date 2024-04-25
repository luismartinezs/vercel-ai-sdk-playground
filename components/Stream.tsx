"use client";
import { useEffect, useState } from "react";

type StreamProps = {};

const source = {
  start(controller) {
    const words = [
      "Hello",
      "there,",
      "how",
      "are",
      "you",
      "doing",
      "today?",
      "Hope",
      "everything",
      "is",
      "great",
      "and",
      "you",
      "are",
      "enjoying",
      "your",
      "day.",
    ];
    let currentIdx = 0;

    const pushData = () => {
      if (currentIdx < words.length) {
        controller.enqueue(words[currentIdx] + " ");
        currentIdx++;
        setTimeout(pushData, 100);
      } else {
        controller.close();
      }
    };

    pushData();
  },
};

const stream = new ReadableStream(source);

const Stream = (): React.JSX.Element => {
  const [streamText, setStreamText] = useState("");
  const [reader, setReader] = useState<ReadableStreamDefaultReader>(null!);

  useEffect(() => {
    const newReader = stream.getReader();
    setReader(newReader);

    return () => {
      newReader && newReader.releaseLock();
    };
  }, []);

  useEffect(() => {
    if (reader) {
      reader.read().then(function processText({ done, value }) {
        if (done) {
          console.log("Stream finished.");
          return;
        }
        setStreamText(prevText => prevText + value);
        reader.read().then(processText);
      });
    }
  }, [reader]);

  return (
    <div>
      <h1>Streamed Text:</h1>
      <p>{streamText}</p>
    </div>
  );
};

export default Stream;
