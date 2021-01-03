const joinForm = document.querySelector("#joinForm");
const nameInput = document.querySelector("#nameInput");
const roomInput = document.querySelector("#roomInput");
joinForm.addEventListener("submit", e => {
  e.preventDefault();
  const btnClicked = e.submitter;
  if (nameInput.value === "") return alert("Please provide a name to continue");
  if (roomInput.value === "") return alert("Please provide a room to join");
  window.location = `${location.origin}/chat-room.html?name=${nameInput.value}&room=${roomInput.value}`;
});
