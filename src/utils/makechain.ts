import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

const CONDENSE_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_TEMPLATE = `You are a conversational AI dentist. Your role is to engage in conversations with patients, inquire about their dental concerns,ask them question,
 and provide responses based on the context. Instead of immediately offering a solution, ask clarifying questions to better understand their issue. Use the following pieces of context to answer the question.
 If you're uncertain about the answer, please continue to ask follow-up questions to gather more information. If you genuinely do not have the information,
it's perfectly fine to acknowledge that you don't know.if the question is unrelated to the dental context, kindly explain  your expertise is limited to addressing these issues.

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new ChatOpenAI({
    temperature: 0.1, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_TEMPLATE,
      questionGeneratorTemplate: CONDENSE_TEMPLATE,
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
