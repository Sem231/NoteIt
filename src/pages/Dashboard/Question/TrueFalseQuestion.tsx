// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import OpenAI from 'openai'
import { useDispatch, useSelector } from "react-redux";
import { setTrueFalseQuestion, selectTrueFalseQuestion } from "../../../components/feature/videoSlice.js"
import { ScaleLoader } from "react-spinners";
const TrueFalseQuestion = ({ text }: any) => {
  const dispatch = useDispatch()
  const summary = useSelector(selectTrueFalseQuestion)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Summarization is happening as we speak, so please wait patiently while we condense all the boring stuff into something much more exciting.")
  const [Prompt, setPrompt] = useState("")
  const apiKey = ""
  const openai = new OpenAI({
    apiKey: apiKey, // defaults to process.env["OPENAI_API_KEY"]
    dangerouslyAllowBrowser: true
  });
  const splitText = (text: any, maxLength: number) => {

    const words = text.split(" ");
    let result = [];
    let currentChunk = "";
    for (const word of words) {
      if ((currentChunk + word).length <= maxLength) {
        currentChunk += word + " ";
      } else {
        result.push(currentChunk.trim());
        currentChunk = word + " ";
      }
    }

    if (currentChunk) {
      result.push(currentChunk.trim());
    }

    return result;
  };
  let GPT35Turbo = async (truncatedText: any) => {
    setLoading(true)
    if (truncatedText === "") {
      return
    } else {
      let summaries: any = [];
      const chunks = splitText(truncatedText, 4000);
      for (const chunk of chunks) {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: `You are a proffetional True/False Question Generator.` },
            { role: "system", content: `` },
            { role: "user", content: `${Prompt}.following text is :\n\n${chunk}\n` },
          ],
          max_tokens: 160,

        });

        const summary = response.choices[0].message?.content
        console.log(summary)
        summaries.push(summary);
        summaries.join("\n")
      }
      // setSummary(summaries)
      dispatch(setTrueFalseQuestion(summaries))
      setLoading(false)
    }


    // return res.status(201).send(summaries)
  };
  const hasEffectRun = useRef(false);
  useEffect(() => {
    if (!hasEffectRun.current) {
      const language = localStorage.getItem("language");
      const tone = localStorage.getItem("tone");
      const style = localStorage.getItem("style");
      const length = 3
      let prompt = `Please create only '3' True/False Question with true or false option of the following text in  language of ${language}. Use a ${tone} tone of voice. Use a ${style} writing style.`;
      //  displayLoadingText();
      if (!summary.length > 0) {
        GPT35Turbo(text)
        setPrompt(prompt)
      }
      hasEffectRun.current = true;
    }
  }, [])
  let list;
  summary?.map((inputText, i) => {
    list = inputText[i].split("\n")

    console.log(list)
  });
  return (
    <div className="mt-5">
      {
        loading ?
          <div className="flex items-center justify-center h-[600px]">
            <ScaleLoader color="black" />
          </div> :

          <div>
            {
              list?.map((item: any, index: any) => {
                return (
                  <div key={index} className=" mt-2 p-3 bg-white shadow-4 rounded-md">
                    <p style={{ fontSize: '18px', color: '#333', fontFamily: 'New Century Schoolbook', fontWeight: 500, padding: "5px 10px", textTransform: 'capitalize' }}  >{item}</p>
                  </div>
                )
              })
            }
          </div>}
    </div>
  )
}

export default TrueFalseQuestion