const joinForm = document.querySelector("#joinForm");
const nameInput = document.querySelector("#nameInput");
const roomInput = document.querySelector("#roomInput");
joinForm.addEventListener("submit", e => {
  e.preventDefault();
  if (nameInput.value === "") return alert("Please provide a name to continue");
  if (roomInput.value === "") return alert("Please provide a room to join");
  sessionStorage.setItem("name", nameInput.value);
  sessionStorage.setItem("room", roomInput.value);
  window.location = `${location.origin}/chat-room.html`;
});
