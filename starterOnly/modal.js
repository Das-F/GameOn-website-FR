function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector('form[name="reserve"]');
const close = document.querySelector(".close");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"], input[type="date"], input[type="number"], input[type="radio"], input[type="checkbox"]'
);

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".icon");
  const nav = document.getElementById("myTopnav");

  if (menuIcon && nav) {
    menuIcon.addEventListener("click", (e) => {
      e.preventDefault();
      nav.classList.toggle("responsive");
    });
  }
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal event
close.addEventListener("click", () => {
  modalbg.style.display = "none";
});

// ErrorDisplay function
const errorDisplay = (inputId, message, valid, directElement = null) => {
  const input = directElement || document.getElementById(inputId);
  if (!input) return;

  const formData = input.closest(".formData");
  if (!formData) return;

  const span = formData.querySelector(".error-msg");

  if (!valid) {
    formData.classList.add("error");
    span.textContent = message;
  } else {
    formData.classList.remove("error");
    span.textContent = "";
  }
};

// Inputs functions
const firstChecker = (value) => {
  value = value.trim();
  if (value.length > 0 && value.length < 2) {
    errorDisplay("first", "Le prénom doit faire au moins 2 caractères", false);
    return false;
  } else if (!value.match(/^[a-zA-ZÀ-ÿ '-]+$/)) {
    errorDisplay(
      "first",
      "Le prénom ne doit pas contenir de caractères spéciaux",
      false
    );
    return false;
  } else {
    errorDisplay("first", "", true);
    return true;
  }
};

const lastChecker = (value) => {
  value = value.trim();
  if (value.length > 0 && value.length < 2) {
    errorDisplay("last", "Le nom doit faire au moins 2 caractères", false);
    return false;
  } else if (!value.match(/^[a-zA-ZÀ-ÿ '-]+$/)) {
    errorDisplay(
      "last",
      "Le nom ne doit pas contenir de caractères spéciaux",
      false
    );
    return false;
  } else {
    errorDisplay("last", "", true);
    return true;
  }
};

const emailChecker = (value) => {
  value = value.trim();
  if (!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    return false;
  } else {
    errorDisplay("email", "", true);
    return true;
  }
};

const birthChecker = (value) => {
  if (!value) {
    errorDisplay(
      "birthdate",
      "Merci de renseigner votre date de naissance",
      false
    );
    return false;
  }
  const birthDate = new Date(value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear(); //
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  if (isNaN(birthDate.getTime())) {
    errorDisplay("birthdate", "Format de date invalide", false);
    return false;
  } else if (age < 13) {
    errorDisplay("birthdate", "Vous devez avoir au moins 13 ans", false);
    return false;
  } else if (age > 120) {
    errorDisplay(
      "birthdate",
      "Veuillez entrer une date de naissance valide",
      false
    );
    return false;
  } else {
    errorDisplay("birthdate", "", true);
    return true;
  }
};

const quantityChecker = (value) => {
  const number = parseInt(value, 10);

  if (value === "") {
    errorDisplay("quantity", "Veuillez renseigner une quantité", false);
    return false;
  } else if (isNaN(number) || number < 0) {
    errorDisplay("quantity", "Entrez un nombre valide", false);
    return false;
  } else if (number > 99) {
    errorDisplay("quantity", "La quantité ne peut pas dépasser 99", false);
    return false;
  } else {
    errorDisplay("quantity", "", true);
    return true;
  }
};

const locationChecker = (value) => {
  const anyLocationInput = document.querySelector('input[name="location"]');
  if (!value) {
    errorDisplay(
      "location",
      "Merci de choisir une ville",
      false,
      anyLocationInput
    );
    return false;
  } else {
    errorDisplay("location", "", true, anyLocationInput);
    return true;
  }
};

const cgvChecker = (value) => {
  if (!value) {
    errorDisplay(
      "checkbox1",
      "Vous devez vérifier et accepter les CGV pour continuer",
      false
    );
    return false;
  } else {
    errorDisplay("checkbox1", "", true);
    return true;
  }
};

//Inputs EventListeners to check validity
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        firstChecker(e.target.value);
        break;
      case "last":
        lastChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "birthdate":
        birthChecker(e.target.value);
        break;
      case "quantity":
        quantityChecker(e.target.value);
        break;
      case "location":
        locationChecker(e.target.value);
        break;
      case "checkbox1":
        cgvChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});
// Submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const checkbox1 = document.getElementById("checkbox1");
  const checkbox2 = document.getElementById("checkbox2");
  const location = document.querySelector('input[name="location"]:checked');

  // Verification
  if (
    firstChecker(first.value) === true &&
    lastChecker(last.value) === true &&
    emailChecker(email.value) === true &&
    birthChecker(birthdate.value) === true &&
    quantityChecker(quantity.value) === true &&
    locationChecker(location ? location.value : null) === true &&
    cgvChecker(checkbox1.checked) === true
  ) {
    const data = {
      first: first.value,
      last: last.value,
      email: email.value,
      birthdate: birthdate.value,
      quantity: quantity.value,
      location: location.value,
      newsletter: checkbox2.checked,
    };
    console.log("Données envoyées :", data);

    // Creation success message
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.innerHTML = `
      <p>Merci pour<br>votre inscription</p>
      <button>Fermer</button>
    `;
    form.style.display = "none";
    form.parentNode.appendChild(successMessage);

    //Close button
    successMessage.querySelector("button").addEventListener("click", () => {
      modalbg.style.display = "none";
    });
  } else {
    console.log("Formulaire incomplet ou invalide");
  }
});
