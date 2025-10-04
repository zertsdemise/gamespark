const games = [
  { name: "Sock Dodgeball", players: "2+", materials: "Socks", type: "Indoor" },
  { name: "Shadow Tag", players: "2+", materials: "None", type: "Outdoor" },
  { name: "Story Chain", players: "3+", materials: "None", type: "Creative" },
];

document.getElementById("generateBtn").addEventListener("click", () => {
  const game = games[Math.floor(Math.random() * games.length)];
  document.getElementById("gameDisplay").innerHTML = `
    <h2>${game.name}</h2>
    <p>Players: ${game.players}</p>
    <p>Materials: ${game.materials}</p>
    <p>Type: ${game.type}</p>
  `;
});

// Auth
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signed up!"))
    .catch(err => alert(err.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Logged in!"))
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut().then(() => alert("Logged out!"));
}

// Submit Game
function submitGame() {
  const user = auth.currentUser;
  if (!user) {
    alert("Please log in first.");
    return;
  }

  const game = {
    name: document.getElementById("gameName").value,
    players: document.getElementById("gamePlayers").value,
    materials: document.getElementById("gameMaterials").value,
    type: document.getElementById("gameType").value,
    userId: user.uid,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  db.collection("games").add(game)
    .then(() => alert("Game submitted!"))
    .catch(err => alert(err.message));
}