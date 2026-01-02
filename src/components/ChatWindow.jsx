export default function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((msg, i) => (
        <div key={i} className={`msg ${msg.sender}`}>
          {msg.text}
        </div>
      ))}
    </div>
  );
}
