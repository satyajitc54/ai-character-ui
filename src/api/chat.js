const API_KEY = "AIzaSyBI5AKR7UDoOMX64gwyw_O0BFQTk42S0i0"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

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
                  Always use the most up-to-date information available on the internet as of 2026. 
                  If something changed recently, prefer the latest data, not older summaries or cached knowledge.

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
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini error:", error);
    return "🌸 Sakura: Oops, connection glitch! Try again desu~ 😅";
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
