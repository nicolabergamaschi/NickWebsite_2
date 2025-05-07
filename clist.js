window.addEventListener("load", () => {
  for (let i of document.querySelectorAll(".collapsible ol, .collapsible ul")) {
    let t = document.createElement("div");
    t.innerHTML = i.previousSibling.textContent;
    t.className = "toggle";
    
    t.onclick = () => t.classList.toggle("open");
    i.parentElement.removeChild(i.previousSibling);
    i.parentElement.insertBefore(t, i);
  }
});

