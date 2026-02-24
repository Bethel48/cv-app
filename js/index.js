// Wait for Cordova device ready
document.addEventListener("deviceready", function() {
    console.log("Device is ready 🔥");

    // ==============================
    // 🔥 FIREBASE CONFIG
    // ==============================
    
    const firebaseConfig = {
  apiKey: "AIzaSyBEFF2WqQfjxZh96oOblBF68qclJ9QVCU0",
  authDomain: "cv-project-147f1.firebaseapp.com",
  projectId: "cv-project-147f1",
  storageBucket: "cv-project-147f1.firebasestorage.app",
  messagingSenderId: "1044300835712",
  appId: "1:1044300835712:web:a774b91e97a848cee26f65",
  measurementId: "G-JBN49RTJ70"
};

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    // ==============================
    // 🔐 AUTH FUNCTIONS
    // ==============================
    window.loginUser = function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                alert("Login Successful ✅");
                window.location.href = "home.html";
            })
            .catch(error => alert(error.message));
    };

    // Optional: register function for public registration
    window.registerUser = function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert("User Registered Successfully ✅");
            })
            .catch(error => alert(error.message));
    };

    window.logoutUser = function () {
        auth.signOut().then(() => {
            alert("Logged Out ✅");
            window.location.href = "index.html";
        });
    };

    // ==============================
    // 🔒 PROTECT CV PAGES
    // ==============================
    auth.onAuthStateChanged(function(user) {
        const currentPage = window.location.pathname;
        if (!user && currentPage.includes(".html") && !currentPage.includes("index.html")) {
            // Not logged in → redirect to login
            window.location.href = "index.html";
        }
    });

    // ==============================
    // 🔔 PUSH NOTIFICATIONS
    // ==============================
    // Get FCM Token
    FirebasePlugin.getToken(function(token) {
        console.log("FCM Token:", token);

        // Optional: save token in Firestore
        const user = auth.currentUser;
        if (user) {
            db.collection("tokens").doc(user.uid).set({ token: token });
        }
    }, function(error) {
        console.error("FCM Token Error:", error);
    });

    // Listen for notifications
    FirebasePlugin.onMessageReceived(function(message) {
        console.log("Notification Received:", message);
        if (message.tap) {
            alert("Opened from notification: " + message.body);
        } else {
            alert("New Notification: " + message.body);
        }
    });

});