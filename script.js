import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
    import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDNxE0VN3dwGmKK6cpbhHTorWtJWkoAFio",
      authDomain: "login-with-firebase-8471d.firebaseapp.com",
      databaseURL: "https://login-with-firebase-8471d-default-rtdb.firebaseio.com",
      projectId: "login-with-firebase-8471d",
      storageBucket: "login-with-firebase-8471d.appspot.com",
      messagingSenderId: "230816036738",
      appId: "1:230816036738:web:a23bf3f1ff6eb0242e019b",
      measurementId: "G-TP6ZVFQT7K"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();
    const db = getDatabase(app);

    function writeUserData(userId, email) {
      set(ref(db, 'users/' + userId), {
        email: email
      }).then(() => {
        console.log('User data written successfully!');
      }).catch((error) => {
        console.error('Error writing user data:', error);
      });
    }

    function readUserData(userId) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          document.getElementById('user-email').textContent = snapshot.val().email;
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error('Error reading user data:', error);
      });
    }

    document.getElementById('signup-button').addEventListener('click', () => {
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Sign Up Success', user);
          writeUserData(user.uid, email);
        })
        .catch((error) => {
          console.error('Sign Up Error', error);
        });
    });

    document.getElementById('login-button').addEventListener('click', () => {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Login Success', user);
          readUserData(user.uid);
        })
        .catch((error) => {
          console.error('Login Error', error);
        });
    });

    document.getElementById('logout-button').addEventListener('click', () => {
      signOut(auth)
        .then(() => {
          console.log('Logout Success');
        })
        .catch((error) => {
          console.error('Logout Error', error);
        });
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        document.getElementById('login-div').style.display = 'none';
        document.getElementById('signup-div').style.display = 'none';
        document.getElementById('user-div').style.display = 'block';
        readUserData(user.uid);
      } else {
        document.getElementById('login-div').style.display = 'block';
        document.getElementById('signup-div').style.display = 'block';
        document.getElementById('user-div').style.display = 'none';
      }
    });

    // Function to read and display entire database content
    function readEntireDatabase() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `/`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("Database Content:", snapshot.val());
          document.getElementById('database-content').textContent = JSON.stringify(snapshot.val(), null, 2);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error("Error reading database:", error);
      });
    }
document.getElementById('login-button').addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Logged in
      const user = userCredential.user;
      console.log('Login Success', user);
      // Redirect to menu.html
      window.location.href = 'menu.html';
    })
    .catch((error) => {
      console.error('Login Error', error);
    });
});


    // Call the function to read and display database content
    readEntireDatabase();