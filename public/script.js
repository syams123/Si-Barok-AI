const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
 
function addMessage(sender, text, isBot){
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", isBot ? "bot" : "user");
 
  const senderLabel = document.createElement("div");
  senderLabel.className = "sender";
  senderLabel.textContent = sender;
  msgDiv.appendChild(senderLabel);
 
  const messageText = document.createElement("div");
  const lines = text.split(/\n+/);
  lines.forEach(line => {
    if(line.trim()){
      const p = document.createElement("p");
      p.textContent = line.trim();
      messageText.appendChild(p);
    }
  });
 
  msgDiv.appendChild(messageText);
  chatBox.appendChild(msgDiv);
 
  chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
}
 
chatForm.addEventListener("submit", async e => {
  e.preventDefault();
  const message = userInput.value.trim();
  if(!message) return;
  addMessage("Anda", message, false);
  userInput.value="";
 
  try {
    const res = await fetch("/api/chat", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    if(data.reply) addMessage("Si Barok", data.reply, true);
    else addMessage("Si Barok","Ups, ada error 😅", true);
  } catch (err) {
    addMessage("Si Barok","⚡ Gagal nyambung ke server", true);
  }
});