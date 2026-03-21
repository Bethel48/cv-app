import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBEFF2WqQfjxZh96oOblBF68qclJ9QVCU0",
  authDomain: "cv-project-147f1.firebaseapp.com",
  projectId: "cv-project-147f1",
  storageBucket: "cv-project-147f1.firebasestorage.app",
  messagingSenderId: "1044300835712",
  appId: "1:1044300835712:web:a774b91e97a848cee26f65"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function isLoginPage() {
  const path = window.location.pathname;
  return path.endsWith("index.html") || path === "/" || path.endsWith("/cv-app/");
}

window.loginUser = async function () {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");

  const email = emailEl ? emailEl.value.trim() : "";
  const password = passwordEl ? passwordEl.value : "";

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "home.html";
  } catch (error) {
    alert(error.message);
  }
};

window.registerUser = async function () {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");

  const email = emailEl ? emailEl.value.trim() : "";
  const password = passwordEl ? passwordEl.value : "";

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "home.html";
  } catch (error) {
    alert(error.message);
  }
};

window.logoutUser = async function () {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (!user && !isLoginPage()) {
    window.location.href = "index.html";
    return;
  }

  if (user && isLoginPage()) {
    return;
  }

  const userEmail = document.getElementById("userEmail");
  if (user && userEmail) {
    userEmail.textContent = user.email;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("home.html")) {
    document.getElementById("homeLink")?.classList.add("active");
  }
  if (path.includes("skills.html")) {
    document.getElementById("skillsLink")?.classList.add("active");
  }
  if (path.includes("experience.html")) {
    document.getElementById("experienceLink")?.classList.add("active");
  }
});