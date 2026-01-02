const API_KEY = "AIza-your-gemini-key-here";  // ← Paste your key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

export async function sendMessage(message, history = []) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{
            text: `You are Sakura, my anime personal assistant. Be friendly and helpful with bookings, code, Japanese, and real-time info.

Previous chat: ${history.slice(-3).join("\n")}

User: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    return "Sorry Sakura is having trouble connecting! 😅";
  }
}

export async function speechToText() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  
  return new Promise((resolve) => {
    recognition.onresult = (event) => resolve(event.results[0][0].transcript);
    recognition.onerror = () => resolve(null);
    recognition.start();
  });
}

export async function textToSpeech(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const voice = voices.find(v => v.name.includes("Aria") || v.name.includes("Samantha")) || voices[0];
  utterance.voice = voice;
  utterance.rate = 1.1;
  utterance.pitch = 1.3;
  speechSynthesis.speak(utterance);
}
