
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}


// Get the necessary elements from the DOM
const roomTypeSelect = document.querySelector('select[name="room"]');
const dateInput = document.querySelector('input[name="dob"]');
const cartTable = document.querySelector('#cart table');
const checkoutButton = document.querySelector('#cart input[type="submit"]');

// Add event listener to update the cart when the room type or date changes
roomTypeSelect.addEventListener('change', updateCart);
dateInput.addEventListener('change', updateCart);

// Update the cart based on the selected room type and date
function updateCart() {
  const roomType = roomTypeSelect.value;
  const date = dateInput.value;
  const price = getRoomPrice(roomType);
  const vat = calculateVAT(price);
  const total = price + vat;

  // Update the cart table with the new values
  const cartRow = document.createElement('tr');
  cartRow.innerHTML = `
    <td>${roomType}</td>
    <td>${date}</td>
    <td>$${price.toFixed(2)}</td>
    <td>$${vat.toFixed(2)}</td>
    <td>$${total.toFixed(2)}</td>
  `;

  // Remove existing rows from the cart table
  const existingRows = cartTable.querySelectorAll('tr:not(:first-child)');
  existingRows.forEach(row => row.remove());

  // Add the new row to the cart table
  cartTable.appendChild(cartRow);
}

// Get the price of the selected room type
function getRoomPrice(roomType) {
  switch (roomType) {
    case 'standard':
      return 100;
    case 'suite':
      return 150;
    case 'family':
      return 200;
    default:
      return 0;
  }
}

// Calculate the VAT based on the price
function calculateVAT(price) {
  const vatRate = 0.12; // Assuming 12% VAT
  return price * vatRate;
}

// Add event listener to the checkout button
checkoutButton.addEventListener('click', checkout);

// Handle the checkout process
function checkout(event) {
  event.preventDefault();
  // Add your logic for the checkout process here
  alert('Checkout clicked!');
}
