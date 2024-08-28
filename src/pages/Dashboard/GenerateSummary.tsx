// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import OpenAI from 'openai';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSummary,
  selectSummary,
} from '../../components/feature/videoSlice.js';
import { ScaleLoader } from 'react-spinners';
import axios from 'axios';

const GenerateSummary = ({ text }: any) => {
  const dispatch = useDispatch();
  const summary = useSelector(selectSummary);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    'Summarization is happening as we speak, so please wait patiently while we condense all the boring stuff into something much more exciting.'
  );
  const [Prompt, setPrompt] = useState('');
  const apiKey = '';
  const openai = new OpenAI({
    apiKey: apiKey, // defaults to process.env["OPENAI_API_KEY"]
    dangerouslyAllowBrowser: true,
  });
  const splitText = (text: any, maxLength: number) => {
    const words = text.split(' ');
    let result = [];
    let currentChunk = '';
    for (const word of words) {
      if ((currentChunk + word).length <= maxLength) {
        currentChunk += word + ' ';
      } else {
        result.push(currentChunk.trim());
        currentChunk = word + ' ';
      }
    }

    if (currentChunk) {
      result.push(currentChunk.trim());
    }

    return result;
  };
  let GPT35Turbo = async (truncatedText: any) => {
    const studioId = localStorage.getItem('studioI');
    setLoading(true);
    if (truncatedText === '') {
      return;
    } else {
      let summaries: any = [];
      const chunks = splitText(truncatedText, 4000);
      for (const chunk of chunks) {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a proffetional Text Summarizer.`,
            },
            { role: 'system', content: `` },

            {
              role: 'user',
              content: `${Prompt}.following text is :\n\n${chunk}\n`,
            },
          ],
          max_tokens: 160,
        });

        const summary = response.choices[0].message?.content;

        summaries.push(summary);
        summaries.join('\n');
      }
      // setSummary(summaries)
      console.log(summaries);
      dispatch(setSummary(summaries));
      setLoading(false);
      let concatenatedString;
      concatenatedString = summaries.join('.');
      await axios
        .post(
          `https://noteit-server-1.onrender.com/UpdateWithSummary/${studioId}`,
          {
            SummaryText: concatenatedString,
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // return res.status(201).send(summaries)
  };
  const hasEffectRun = useRef(false);
  useEffect(() => {
    if (!hasEffectRun.current) {
      const language = localStorage.getItem('language');
      const tone = localStorage.getItem('tone');
      const style = localStorage.getItem('style');
      const length = 3;
      let prompt = `Please summarize of the following text in ${length} sentence and must summarize in ${language} language. Use a ${tone} tone of voice. Use a ${style} writing style.`;
      //  displayLoadingText();
      if (!summary.length > 0) {
        GPT35Turbo(text);
        setPrompt(prompt);
      }
      hasEffectRun.current = true;
    }
  }, []);
  let filteredArray;
  summary?.map((inputText, i) => {
    filteredArray = inputText[i]?.split('\n').filter((item) => item !== '');
    console.log(filteredArray);
    // console.log(inputText[i].split("\n"))
  });
  return (
    <div>
      { }
      {loading ? (
        <div className="flex h-[600px] items-center justify-center">
          <ScaleLoader color="black" />
        </div>
      ) : (
        <div>
          {filteredArray?.map((item: any, index: any) => {
            return (
              <div key={index}>
                <p
                  style={{
                    fontSize: '18px',
                    color: '#333',
                    fontFamily: 'New Century Schoolbook',
                    fontWeight: 500,
                    padding: '5px 10px',
                    textTransform: 'capitalize',
                  }}
                >
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GenerateSummary;
