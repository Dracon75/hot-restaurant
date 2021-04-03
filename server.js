// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reserved Tables (DATA)

const reservations = [];

const waitingList = [];

// Routes

// Basic routing stuff
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/make', (req, res) => res.sendFile(path.join(__dirname, 'make.html')));

app.get('/view', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

// Displays all reservations
app.get('/api/reservations', (req, res) => res.json(reservations));

// Displays all waiting list
app.get('/api/waitingList', (req, res) => res.json(waitingList));

// // Displays a single character, or returns false
// app.get('/api/characters/:character', (req, res) => {
//   const chosen = req.params.character;

//   console.log(chosen);

//   /* Check each character routeName and see if the same as "chosen"
//    If the statement is true, send the character back as JSON,
//    otherwise tell the user no character was found */

//   for (let i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

// Create New Table Reservation - takes in JSON input
app.post('/api/reservation', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  if(reservations.length < 5) {
    const newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.customerName = newReservation.customerName.replace(/\s+/g, '').toLowerCase();
  newReservation.customerEmail = newReservation.customerEmail.replace(/\s+/g, '').toLowerCase();
  console.log(newReservation);

  reservations.push(newReservation);
  res.json(newReservation);
  } else {
    const newWaitingList = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newWaitingList.customerName = newWaitingList.customerName.replace(/\s+/g, '').toLowerCase();
    newWaitingList.customerEmail = newWaitingList.customerEmail.replace(/\s+/g, '').toLowerCase();
    console.log(newWaitingList);
  
    waitingList.push(newWaitingList);
    res.json(newWaitingList);
  }
  
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
