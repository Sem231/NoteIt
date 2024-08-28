// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import OpenAI from 'openai'
import { useDispatch, useSelector } from "react-redux";
import { setKeyword, selectKeyword } from "../../components/feature/videoSlice.js"
import { ScaleLoader } from "react-spinners";
const GenerateKeyword = ({ text }: any) => {
  const dispatch = useDispatch()
  const summary = useSelector(selectKeyword)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Summarization is happening as we speak, so please wait patiently while we condense all the boring stuff into something much more exciting.")
  const [Prompt, setPrompt] = useState("")
  const apiKey = ""

  const openai = new OpenAI({
    apiKey: apiKey, // defaults to process["OPENAI_API_KEY"]
    dangerouslyAllowBrowser: true
  });
  // const [summary, setSummary] = useState([]);
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
            { role: "system", content: `You are a proffetional Keyword finder.` },
            { role: "system", content: `` },


            { role: "user", content: `${Prompt}.following text is \n\n${chunk}\n` },
          ],
          max_tokens: 160,

        });

        const summary = response.choices[0].message?.content
        console.log(summary)
        summaries.push(summary);
        summaries.join("\n")
      }
      // setSummary(summaries)
      dispatch(setKeyword(summaries))
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
      let prompt = `Please find the important Keyword and seperate the using comma of the following text in language ${language}. Use a ${tone} tone of voice. Use a ${style} writing style`;

      //  displayLoadingText();
      if (!summary.length > 0) {
        GPT35Turbo(text)
        setPrompt(prompt)
      }
      hasEffectRun.current = true;
    }
  }, [])
  let keyWords;
  summary?.map((inputText, i) => {
    if (inputText[i].includes("Keywords:")) {
      const parts = inputText[i].split(':').map(part => part.trim());

      if (parts.length === 2 && parts[0] === "Keywords") {
        // Extract the keywords as an array
        keyWords = parts[1].split(',').map(keyword => keyword.trim());
        // console.log("Text: ", keyWords);
      }
    } else {
      // No "Keywords:" found, split the text using a comma
      keyWords = inputText[i].split(',').map(part => part.trim());
      // console.log("Text: ", keyWords);
    }
    // console.log(inputText[i].split(","))
  });
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <div>
      {
        loading ?
          <div className="flex items-center justify-center h-[600px]">
            <ScaleLoader color="black" />
          </div> :
          <div>

            <div className="flex flex-row items-center flex-wrap">
              {
                keyWords?.map((item: any, index: any) => {
                  return (
                    <div style={{ backgroundColor: getRandomColor() }} className="px-5 py-2 rounded-md cursor-pointer  text-white  m-1" key={index}>
                      <p style={{ fontSize: '16px', color: 'white', fontFamily: 'New Century Schoolbook', fontWeight: 600, padding: "5px 10px", textTransform: 'capitalize' }}  >{item}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>}
    </div>
  )
}

export default GenerateKeyword