// @ts-nocheck
import { useRef, useState, useEffect } from 'react';
import Layout from '../../components/layout';
// import styles from '../../styles/Home.css';
import '../../styles/Home.css';
import { Message } from '../../types/chat';
// import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '../../components/ui/LoadingDots';
import { Document } from 'langchain/document';
import { FiEdit } from 'react-icons/fi';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFileData,
  selectFileName,
} from '../../components/feature/AudioSlice';
import { Modal } from '@mui/material';
import { setDIndex } from '../../components/feature/videoSlice.js';
import { toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
// import type { NextApiRequest, NextApiResponse } from 'next';

export default function ChatWithYourNote() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState([]);
  const TextFromAudio = useSelector(selectFileData);
  const fileName = useSelector(selectFileName);
  console.log(fileName);
  const [directory, setDirectory] = useState(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const hasEffectRun = useRef(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [chatLoading, setChatLoading] = useState(false);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: 'Hi, what would you like to learn about this document?',
        type: 'apiMessage',
      },
    ],
    history: [],
  });

  const { messages, history } = messageState;
  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const getTopic = async () => {
    await axios
      .get('https://noteit-server-1.onrender.com/getTopic')
      .then((res) => {
        setTopic(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createChat = async () => {
    setChatLoading(true);
    await axios
      .post('https://noteit-server-1.onrender.com/ingest/text', {
        text: TextFromAudio?.Text,
        dire: fileName,
      })
      .then((res) => {
        toast('Chat created successfully');
        dispatch(
          setDIndex({
            DIndex: 0,
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast(err.response.data.message || err.message);
      });
  };

  useEffect(() => {
    textAreaRef.current?.focus();
    getTopic();
  }, []);

  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();
    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery('');

    try {
      const response = await fetch(
        'https://noteit-server-1.onrender.com/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            directoryName: directory,
            query: question,
          }),
        }
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.response.text,
              sourceDocs: data.response.sourceDocuments,
            },
          ],
          history: [...state.history, [question, data.response.text]],
        }));
      }
      console.log('messageState', messageState);
      setLoading(false);
      //scroll to bottom
      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  }

  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key == 'Enter') {
      e.preventDefault();
    }
  };
  const handleDirectory = (item: any, index: number) => {
    setActiveIndex(index);
    setDirectory(item);
  };
  const CreateM = () => {
    setOpen(true);
  };

  return (
    <>
      <Layout>
        <div className="mx-auto flex flex-1 flex-row gap-4">
          <div className="mt-5 h-screen w-[220px] overflow-y-auto overflow-x-hidden pl-3 [&::-webkit-scrollbar]:hidden ">
            <div className="flex flex-row items-center justify-between">
              <p className="font-satoshi text-xl font-medium ">ChatList</p>
              <div
                onClick={CreateM}
                className="ml-3 cursor-pointer rounded-md bg-black py-2 px-3"
              >
                {
                  <p className="font-satoshi text-sm font-medium text-white">
                    Create Chat
                  </p>
                }
              </div>
            </div>
            {topic.map((item, index) => {
              return (
                <div
                  onClick={() => handleDirectory(item, index)}
                  className={`relative cursor-pointer rounded-md px-3 py-2 ${
                    index === activeIndex ? 'bg-[lightgray]' : 'bg-[whitesmoke]'
                  } mt-2`}
                  key={index}
                >
                  <p className="w-40 truncate overflow-ellipsis text-center text-lg font-medium text-black">
                    {item}
                  </p>
                  <FiEdit color="black" className="absolute right-2 top-3" />
                </div>
              );
            })}
          </div>
          {directory ? (
            <div className="mx-auto -ml-5 flex flex-col gap-4 ">
              <main className={'main'}>
                <div className={'cloud'}>
                  <div ref={messageListRef} className={'messagelist'}>
                    {messages.map((message, index) => {
                      let icon;
                      let className;
                      if (message.type === 'apiMessage') {
                        icon = (
                          <img
                            key={index}
                            src="/public/bot-image.png"
                            alt="AI"
                            width="40"
                            height="40"
                            className={'boticon'}
                          />
                        );
                        className = 'apimessage';
                      } else {
                        icon = (
                          <img
                            key={index}
                            src="/public/usericon.png"
                            alt="Me"
                            width="30"
                            height="30"
                            className={'usericon'}
                          />
                        );
                        // The latest message sent by the user will be animated while waiting for a response
                        className =
                          loading && index === messages.length - 1
                            ? 'usermessagewaiting'
                            : 'usermessage';
                      }
                      return (
                        <>
                          <div
                            key={`chatMessage-${index}`}
                            className={className}
                          >
                            {icon}
                            <div className={'markdownanswer'}>
                              <ReactMarkdown linkTarget="_blank">
                                {message.message}
                              </ReactMarkdown>
                            </div>
                          </div>
                          {message.sourceDocs && (
                            <div
                              className="p-5"
                              key={`sourceDocsAccordion-${index}`}
                            >
                              <Accordion
                                type="single"
                                collapsible
                                className="flex-col"
                              >
                                {message.sourceDocs.map((doc, index) => (
                                  <div key={`messageSourceDocs-${index}`}>
                                    <AccordionItem value={`item-${index}`}>
                                      <AccordionTrigger>
                                        <h3>Source {index + 1}</h3>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <ReactMarkdown linkTarget="_blank">
                                          {doc.pageContent}
                                        </ReactMarkdown>
                                        <p className="mt-2">
                                          <b>Source:</b> {doc.metadata.source}
                                        </p>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </div>
                                ))}
                              </Accordion>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className={'center'}>
                  <div className={'cloudform'}>
                    <form onSubmit={handleSubmit}>
                      <textarea
                        disabled={loading}
                        onKeyDown={handleEnter}
                        ref={textAreaRef}
                        autoFocus={false}
                        rows={1}
                        maxLength={512}
                        id="userInput"
                        name="userInput"
                        placeholder={
                          loading
                            ? 'Waiting for response...'
                            : 'What is this legal case about?'
                        }
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={'textarea'}
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className={'generatebutton'}
                      >
                        {loading ? (
                          <div className={'loadingwheel'}>
                            <LoadingDots color="#000" />
                          </div>
                        ) : (
                          // Send icon SVG in input field
                          <svg
                            viewBox="0 0 20 20"
                            className={'svgicon'}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                          </svg>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
                {error && (
                  <div className="border-red-400 rounded-md border p-4">
                    <p className="text-red-500">{error}</p>
                  </div>
                )}
              </main>
            </div>
          ) : (
            <div className={'main'}>
              <div className="cloud">
                <p className="font-satoshi text-lg font-medium text-black">
                  No Content found for creating your chat OR No chat has
                  selected{' '}
                </p>
              </div>
            </div>
          )}
        </div>
        <div>
          <Modal
            keepMounted
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div
              style={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '59.4%',
                transform: 'translate(-50%, -50%)',
                width: '30%',
                bgcolor: '#1C1B22',
                boxShadow: 24,
                p: 1,
                outline: 0,
                height: 300,
                border: '2px',
              }}
              className=" relative flex h-screen items-center justify-center overflow-y-auto overflow-x-hidden  rounded-md bg-white py-2  [&::-webkit-scrollbar]:hidden"
            >
              <div>
                {TextFromAudio.Text ? (
                  <div className="flex flex-row items-center justify-center">
                    <p>Notes found </p>
                    <div
                      onClick={createChat}
                      className="ml-3 cursor-pointer rounded-md bg-black py-2 px-3"
                    >
                      {chatLoading ? (
                        <div className="flex h-full items-center justify-center">
                          <ScaleLoader color="white" />
                        </div>
                      ) : (
                        <p className="font-satoshi text-lg font-medium text-white">
                          Create Chat
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="font-satoshi text-lg font-medium text-black">
                    No Notes found for creating chats
                  </p>
                )}
              </div>
            </div>
          </Modal>
        </div>
        <footer className="m-auto p-4">
          <a href="https://twitter.com/mayowaoshin"></a>
        </footer>
      </Layout>
    </>
  );
}
