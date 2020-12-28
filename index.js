if (!location.search.includes("?name=")) {
  alert("Please provide your name in the main page to continue");
  window.location = location.origin;
}
const currentUserName = location.search.substring(6);
console.log(currentUserName);
const socket = io("http://localhost:5000");
socket.emit("joinChat", currentUserName);
const inputMessage = document.querySelector("#chatMessage");
const formMessage = document.querySelector("#formMessage");
const chatMessageBox = document.querySelector("#chatMessageBox");
const showMessage = messageObj => {
  const { username, createdAt, message } = messageObj;
  let htmltag;
  console.log({ username, currentUserName });
  console.log(username === currentUserName);
  if (username === "Chatbox")
    htmltag = `
      <div class="chat-message-center pb-4">
        <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
          <div class="font-weight-bold mb-1">Chatbox</div>
          ${message}
        </div>
      </div>
    `;
  else
    htmltag = `
    <div class="${
      currentUserName === username ? "chat-message-right" : "chat-message-left"
    } pb-4">
      <div>
        <img
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          class="rounded-circle mr-1"
          alt="Chris Wood"
          width="40"
          height="40"
        />
        <div class="text-muted small text-nowrap mt-2">
          ${createdAt}
        </div>
      </div>
      <div class="flex-shrink-1 bg-light rounded py-2 px-3 ${
        currentUserName === username ? "mr-3" : "ml-3"
      }">
        <div class="font-weight-bold mb-1">${username}</div>
        ${message}
      </div>
    </div>
  `;
  chatMessageBox.insertAdjacentHTML("beforeend", htmltag);
};

socket.on("message", messageObj => {
  showMessage(messageObj);
  chatMessageBox.scrollTop = chatMessageBox.scrollHeight;
});

formMessage.addEventListener("submit", e => {
  e.preventDefault();
  const value = inputMessage.value;
  socket.emit("chatMessage", value);

  inputMessage.value = "";
  inputMessage.focus();
});
