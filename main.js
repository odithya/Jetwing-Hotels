let currentBookingDetails = {};
let overallBookingDetails = {};

let loyaltyPoints = 0;

function bookNow() {
  const roomType = document.getElementById('roomType').value;
  const numberofAdults = parseInt(document.getElementById('numberofAdults').value, 10);
  const numberofChildren = parseInt(document.getElementById('numberofChildren').value, 10);
  const duration = parseInt(document.getElementById('duration').value, 10);
  const wifi = document.getElementById('wifi').checked;
  const view = document.getElementById('view').value;
  const promoCode = document.getElementById('promoCode').value;

  // Implement room booking logic based on provided calculations
  const roomCosts = {
    single: 25000,
    double: 35000,
    triple: 40000,
  };

  let totalRoomCost = roomCosts[roomType] * numberofAdults;

  if (numberofChildren > 0) {
    totalRoomCost += 5000 * numberofChildren; // Additional cost for kids
  }

  if (wifi) {
    totalRoomCost += 1000; // Additional cost for WiFi
  }

  if (view === 'pool') {
    totalRoomCost += 2000; // Additional cost for pool view
  } else if (view === 'garden') {
    totalRoomCost += 1500; // Additional cost for garden view
  }

  if (promoCode === 'promo123') {
    totalRoomCost *= 0.95; // 5% discount for promo code
  }

  // Update current booking details
  currentBookingDetails = {
    roomType,
    numberofAdults,
    numberofChildren,
    duration,
    wifi,
    view,
    promoCode,
    totalCost: totalRoomCost,
  };

  // Update overall booking details
  overallBookingDetails = {
    ...overallBookingDetails,
    roomBooking: currentBookingDetails,
  };

  // Update loyalty points if applicable
  updateLoyaltyPoints();

  // Display confirmation messages
  displayBookingConfirmation();

  // Reset form
  resetForm();
}

function bookAdventure() {
  const adventure = document.getElementById('adventure').value;
  const guide = document.getElementById('guide').checked;

  // Implement adventure booking logic based on provided calculations
  const adventureCosts = {
    divingLocalAdult: 5000,
    divingLocalKids: 2000,
    divingForeignAdult: 10000,
    divingForeignKids: 5000,
  };

  let totalAdventureCost = adventureCosts[adventure];

  if (guide) {
    totalAdventureCost += (adventure.includes('Adult') ? 1000 : 500); // Additional cost for a guide
  }

  // Update current booking details
  currentBookingDetails = {
    adventure,
    guide,
    totalCost: totalAdventureCost,
  };

  // Update overall booking details
  overallBookingDetails = {
    ...overallBookingDetails,
    adventureBooking: currentBookingDetails,
  };

  // Update loyalty points if applicable
  updateLoyaltyPoints();

  // Display adventure details in confirmation message
  displayAdventureConfirmation();

  // Reset form
  resetForm();
}



function checkLoyalty() {
  //  loyalty points
  alert(`You have ${loyaltyPoints} loyalty points.`);
}

function updateLoyaltyPoints() {
  // Update loyalty points if the number of rooms in the order is greater than 3
  const totalRooms = (currentBookingDetails.roomBooking ? currentBookingDetails.roomBooking.numberofAdults : 0) +
    (currentBookingDetails.roomBooking ? currentBookingDetails.roomBooking.numberofChildren : 0);

  if (totalRooms > 3) {
    loyaltyPoints += 20;
    // Save loyaltyPoints in local storage if needed
  }
}

function displayBookingConfirmation() {
  // Display confirmation messages for room booking
  alert(`Room booking confirmed!\nTotal cost: LKR ${currentBookingDetails.totalCost}`);

  // Display booking details in the summary table
  document.getElementById('summaryFirstName').innerText = document.getElementById('firstName').value;
  document.getElementById('summaryLastName').innerText = document.getElementById('lastName').value;
  document.getElementById('summaryDuration').innerText = document.getElementById('duration').value + ' days';
  document.getElementById('summaryRoomType').innerText = document.getElementById('roomType').value;
  document.getElementById('summaryWiFi').innerText = document.getElementById('wifi').checked ? 'Yes' : 'No';
  document.getElementById('summaryView').innerText = document.getElementById('view').value;
  document.getElementById('summaryAdults').innerText = document.getElementById('numberofAdults').value;
  document.getElementById('summaryChildren').innerText = document.getElementById('numberofChildren').value;
  document.getElementById('summaryAdventure').innerText = document.getElementById('adventure').value;
}
