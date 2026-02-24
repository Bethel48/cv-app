import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

// ==============================
// LOGIN FUNCTION
// ==============================
window.loginUser = async function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "home.html";
    } catch (error) {
        alert(error.message);
    }
};

// ==============================
// LOGOUT FUNCTION
// ==============================
window.logoutUser = function() {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        alert(error.message);
    });
};

// ==============================
// PROTECT PAGES
// ==============================
onAuthStateChanged(auth, (user) => {
    if (!user && !window.location.pathname.includes("index.html")) {
        window.location.href = "index.html";
    }

    if (user && document.getElementById("userEmail")) {
        document.getElementById("userEmail").textContent = user.email;
    }
});

// ==============================
// HIGHLIGHT ACTIVE PAGE
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    if (path.includes("home.html")) document.getElementById("homeLink")?.classList.add("active");
    if (path.includes("skills.html")) document.getElementById("skillsLink")?.classList.add("active");
    if (path.includes("experience.html")) document.getElementById("experienceLink")?.classList.add("active");
});