const joinForm = document.querySelector("#joinForm");
const nameInput = document.querySelector("#nameInput");
const roomInput = document.querySelector("#roomInput");
joinForm.addEventListener("submit", e => {
  e.preventDefault();
  if (nameInput.value === "") return alert("Please provide a name to continue");
  if (roomInput.value === "") return alert("Please provide a room to join");
  sessionStorage.setItem("name", nameInput.value);
  sessionStorage.setItem("room", roomInput.value);
  const currentLocation = location.href;
  if (currentLocation.includes("/index.html")) {
    const url = currentLocation.replace("index.html", "chat-room.html");
    return (window.location = url);
  }
  window.location = location.href + "chat-room.html";
});
