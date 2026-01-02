
import { useState, useRef, useEffect } from "react";
import { sendMessage, speechToText, textToSpeech } from "../api/chat";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (message) => {
    if (!message.trim() || isLoading) return;
    
    setMessages(prev => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    const history = messages.map(m => `${m.role}: ${m.content}`);
    const response = await sendMessage(message, history);
    
    setMessages(prev => [...prev, { role: "assistant", content: response }]);
    textToSpeech(response);
    setIsLoading(false);
  };

  const handleVoice = async () => {
    setIsListening(true);
    const spoken = await speechToText();
    setIsListening(false);
    
    if (spoken) {
      setInput(spoken);
      await handleSubmit(spoken);
    }
  };

  return (
    <div className="chat-input-wrapper">
      <div className="messages-container" ref={messagesEndRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <span>{msg.content}</span>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <span>Sakura is typing<span>•</span></span>
          </div>
        )}
      </div>

      <div className="input-bar">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Sakura anything... (or use voice 🎤)"
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(input)}
          disabled={isLoading}
        />
        <button onClick={handleVoice} disabled={isLoading}>
          {isListening ? "🔴" : "🎙️"}
        </button>
        <button onClick={() => handleSubmit(input)} disabled={isLoading || !input.trim()}>
          ➤
        </button>
      </div>
    </div>
  );
}
