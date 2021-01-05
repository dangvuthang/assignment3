if (!(sessionStorage.getItem("name") && sessionStorage.getItem("room"))) {
  alert("Please provide your name and room to continue");
  window.location = window.origin;
}
const currentUserName = sessionStorage.getItem("name");
const currentRoom = sessionStorage.getItem("room");

const socket = io("https://assignment3-it.herokuapp.com");
socket.emit("joinChat", { username: currentUserName, room: currentRoom });
const inputMessage = document.querySelector("#chatMessage");
const formMessage = document.querySelector("#formMessage");
const chatMessageBox = document.querySelector("#chatMessageBox");
const userList = document.querySelector("#userLists");

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
          src="https://res.cloudinary.com/dybygufkr/image/upload/v1593000869/avatar_q2ysxd.jpg"
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

const showUsers = users => {
  const html = users
    .map(
      user => `
      <a
        href="#"
        class="list-group-item list-group-item-action border-0"
      >
        <div class="d-flex align-items-start">
          <img
            src="https://res.cloudinary.com/dybygufkr/image/upload/v1593000869/avatar_q2ysxd.jpg"
            class="rounded-circle mr-1"
            alt="Avatar image"
            width="40"
            height="40"
          />
          <div class="flex-grow-1 ml-3">
            ${user.username}
            <div class="small">
              <span class="fas fa-circle chat-online"></span> Online
            </div>
          </div>
        </div>
      </a>
    `
    )
    .join("");
  userList.innerHTML = html;
};

const showRoom = room => {};

socket.on("message", messageObj => {
  showMessage(messageObj);
  chatMessageBox.scrollTop = chatMessageBox.scrollHeight;
});

socket.on("roomUsers", roomUsersObj => {
  const { room, users } = roomUsersObj;
  // showRoom(room);
  showUsers(users);
});

formMessage.addEventListener("submit", e => {
  e.preventDefault();
  const value = inputMessage.value;
  socket.emit("chatMessage", value);

  inputMessage.value = "";
  inputMessage.focus();
});
