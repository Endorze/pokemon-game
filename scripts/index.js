let currentBackground = -1;
let currentDialogue = 0;
let playerName = "";
let playerHealth = 20;
//playerName = prompt("Hello trainer, what is your name?");
const redImage = "../images/red.webp";
const charmanderImage = "../images/charmander.png";
let prevDialogDiv = null;
// const backgroundImages = [
//   redImage,
//   redImage,
//   charmanderImage,
//   "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
//   "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
//   "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
//   "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
//   "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
//   "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
//   "https://img.myshopline.com/image/store/1705286183817/Pokemon-Legends-Arceus-(5)_416x.jpeg?w=1500&h=844&q=80",
// ];

const dialogueObject = [
{
    name: "Red",
    text: `I have been waiting for you ${playerName}.`,
    buttonText: "Continue",
    backgroundImage: redImage
},
{
    name: "Red",
    text: `There's no time to explain, its dangerous to go alone, take this!`,
    buttonText: "Continue",
    backgroundImage: redImage
},
{
    name: "",
    text: `You recieved a Charmander`,
    buttonText: "Continue",
    backgroundImage: charmanderImage
},
    
]    

const playSound = (sound) => {
  let audio = new Audio(`../mp3/${sound}`) 
  audio.play();
}


const switchBackground = () => {
  const startScreen = document.querySelector(".start-screen");
  

  startScreen.style.display = "none";
  currentBackground = (currentBackground + 1) % dialogueObject.length;
 

  dialogue(dialogueObject[currentBackground]);
};

const dialogue = (dialogueData) => {
  const gamingWindow = document.querySelector(".gaming-window");
  gamingWindow.style.backgroundImage = `url('${dialogueData.backgroundImage}')`;

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
      playSound("hover.mp3")
    }
  });

  dialogueDiv.appendChild(dialogueName);
  dialogueDiv.appendChild(dialogueText);
  dialogueDiv.appendChild(button);

  if (prevDialogDiv) gamingWindow.removeChild(prevDialogDiv)
  gamingWindow.appendChild(dialogueDiv);
  prevDialogDiv = dialogueDiv;
};

