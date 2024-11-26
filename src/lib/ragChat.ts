import { RAGChat, upstash } from "@upstash/rag-chat";
import { redis } from "./radis";

export const ragChat = new RAGChat({
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
  redis: redis, //to persist our previous chat in databasse of upstash
});
