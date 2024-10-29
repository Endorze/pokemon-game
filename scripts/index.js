let currentBackground = 0;
let currentDialogue = 0;
let playerName = "";
playerName = prompt("Hello trainer, what is your name?");
const redImage = "../images/red.webp";
const backgroundImages = [
  "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
  redImage,
  "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
  "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
  "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
  "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
  "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
  "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
  "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
  "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
];

const dialogueObject = [
{
    name: "Red",
    text: `I have been waiting for you ${playerName}`,
    buttonText: "Continue",
},
{
    name: "Red",
    text: `We need to get you in shape, pick a starter!`,
    buttonText: "Continue",
},
{
    name: "Red",
    text: `We need to get you in shape, pick a starter!`,
    buttonText: "Continue",
},
    
]    


const switchBackground = () => {
  const startScreen = document.querySelector(".start-screen");
  const gamingWindow = document.querySelector(".gaming-window");

  startScreen.style.display = "none";
  currentBackground = (currentBackground + 1) % backgroundImages.length;
  gamingWindow.style.backgroundImage = `url('${backgroundImages[currentBackground]}')`;

  dialogue(dialogueObject[currentBackground]);
};

const dialogue = (dialogueData) => {

  const dialogueDiv = document.createElement("div");
  dialogueDiv.classList.add("dialogue-box");

  const dialogueName = document.createElement("h2");
  dialogueName.textContent = dialogueData.name;

  const dialogueText = document.createElement("p");
  dialogueText.textContent = dialogueData.text;

  const button = document.createElement("button");
  button.textContent = dialogueData.buttonText;

  button.addEventListener("click", () => {
    if (button.textContent === "Continue") {
      switchBackground();
    }
  });

  dialogueDiv.appendChild(dialogueName);
  dialogueDiv.appendChild(dialogueText);
  dialogueDiv.appendChild(button);

  const gamingWindow = document.querySelector(".gaming-window");
  gamingWindow.appendChild(dialogueDiv);
};

