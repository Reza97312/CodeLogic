// import { useState, useEffect, useRef } from "react";
// import TextsmsIcon from "@mui/icons-material/Textsms";
// import CloseIcon from "@mui/icons-material/Close";
// import lottieimg from "../../assets/Images/Tech support and customer service.json";
// import lottieimg2 from "../../assets/Images/chatbot animation.json";
// import Lottie from "lottie-react";

// export default function ChatBot() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const API_URL = "http://localhost:5000/api/chat";

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "deepseek/deepseek-chat-v3.1:free",
//           messages: [...messages, userMessage],
//         }),
//       });

//       const data = await response.json();
//       const botReply =
//         data?.choices?.[0]?.message?.content || "متأسفانه پاسخی دریافت نشد.";

//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: botReply },
//       ]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "❌ خطا در اتصال به سرور." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//         className=" cursor-pointer fixed bottom-27 right-7.5 w-16 h-16 rounded-full bg-[#008c78]  text-white shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-300 z-50"
//       >
//         <Lottie
//           animationSpeed={2}
//           style={{ width: 50, height: 50 }}
//           animationData={lottieimg2}
//           loop={true}
//         />
//       </button>

//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             onClick={() => setOpen(false)}
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//           ></div>

//           <div className="relative bg-white w-[400px] max-w-[90%] h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-fadeIn">
//             <div className="bg-[#008c78]  p-4 flex justify-between items-center text-white shadow-md">
//               <h3 className="text-lg font-bold">چت‌ بات </h3>
//               <button
//                 onClick={() => setOpen(false)}
//                 className=" cursor-pointer text-2xl hover:text-gray-200 transition"
//               >
//                 <CloseIcon />
//               </button>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 flex flex-col  items-center">
//               {messages.length === 0 && !loading && (
//                 <div className="font-semibold text-center pt-15">
//                   <Lottie animationData={lottieimg} loop={true} />
//                   <p className="mt-5"> هر سوالی داری از من بپرس... </p>
//                 </div>
//               )}

//               {messages.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`flex w-full ${
//                     msg.role === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[75%] px-4 py-2 rounded-xl shadow-lg ${
//                       msg.role === "user"
//                         ? "bg-[#008c78] text-white rounded-bl-none hover:scale-105 transition-transform duration-200"
//                         : "bg-white text-gray-900 rounded-br-none hover:scale-105 transition-transform duration-200"
//                     }`}
//                   >
//                     {msg.content}
//                   </div>
//                 </div>
//               ))}

//               {loading && (
//                 <div className="text-gray-500 animate-pulse w-full ">
//                   در حال پاسخ...
//                 </div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             <div className="p-3  bg-white flex space-x-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="پیامت را بنویس…"
//                 className="flex-1 px-3 py-2 border-2 border-[#008c78] rounded-lg  focus:outline-none duration-300  "
//               />
//               <button
//                 onClick={sendMessage}
//                 className=" cursor-pointer px-4 py-2 bg-[#008c78] text-white rounded-lg hover:bg-[#00bfa5] transition-colors"
//               >
//                 ارسال
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { useState, useEffect, useRef } from "react";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CloseIcon from "@mui/icons-material/Close";
import lottieimg from "../../assets/Images/Tech support and customer service.json";
import lottieimg2 from "../../assets/Images/chatbot animation.json";
import Lottie from "lottie-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_URL = "http://localhost:5000/api/chat";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      const botReply =
        data?.choices?.[0]?.message?.content || "متأسفانه پاسخی دریافت نشد.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ خطا در اتصال به سرور." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" cursor-pointer fixed bottom-27 right-7.5 w-16 h-16 rounded-full bg-[#008c78]  text-white shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-300 z-50"
      >
        <Lottie
          animationSpeed={2}
          style={{ width: 50, height: 50 }}
          animationData={lottieimg2}
          loop={true}
        />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          ></div>

          <div className="relative bg-white w-[400px] max-w-[90%] h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-fadeIn">
            <div className="bg-[#008c78]  p-4 flex justify-between items-center text-white shadow-md">
              <h3 className="text-lg font-bold">چت‌ بات </h3>
              <button
                onClick={() => setOpen(false)}
                className=" cursor-pointer text-2xl hover:text-gray-200 transition"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 flex flex-col  items-center">
              {messages.length === 0 && !loading && (
                <div className="font-semibold text-center pt-15">
                  <Lottie animationData={lottieimg} loop={true} />
                  <p className="mt-5"> هر سوالی داری از من بپرس... </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex w-full ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-xl shadow-lg ${
                      msg.role === "user"
                        ? "bg-[#008c78] text-white rounded-bl-none hover:scale-105 transition-transform duration-200"
                        : "bg-white text-gray-900 rounded-br-none hover:scale-105 transition-transform duration-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-gray-500 animate-pulse w-full ">
                  در حال پاسخ...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-3  bg-white flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="پیامت را بنویس…"
                className="flex-1 px-3 py-2 border-2 border-[#008c78] rounded-lg  focus:outline-none duration-300  "
              />
              <button
                onClick={sendMessage}
                className=" cursor-pointer px-4 py-2 bg-[#008c78] text-white rounded-lg hover:bg-[#00bfa5] transition-colors"
              >
                ارسال
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
