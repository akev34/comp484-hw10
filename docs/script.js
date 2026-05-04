$(function () {
  // =====================================================================
  // (A) LOG CUSTOM — A styled banner using the %c format specifier
  // =====================================================================
  console.log(
    "%c🐾 Giga Pet — Application Started",
    "color:#fff; background:#c44569; padding:6px 14px; border-radius:4px; font-size:14px; font-weight:bold;"
  );

  // =====================================================================
  // (B) LOG INFO — Lower-priority informational message
  // =====================================================================
  console.info("Initializing pet info and binding button click handlers.");

  // Initial render
  checkAndUpdatePetInfoInHtml();

  // Bind button click handlers
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);

  // Hidden trigger: clicking the pet image fires the TypeError + Violation demos
  $(".pet-image, .pet-image-container").on("click", function () {
    triggerViolation();
    triggerTypeError();
  });

  // =====================================================================
  // (C) LOG TABLE — Display the initial pet stats as a formatted table
  // =====================================================================
  console.table(pet_info);

  // =====================================================================
  // (D) CAUSE A 404 NETWORK ERROR — Fetch a URL that does not exist
  // =====================================================================
  fetch("https://jsonplaceholder.typicode.com/this-endpoint-does-not-exist")
    .then(function (response) {
      if (!response.ok) {
        console.error(
          "Pet data fetch failed. HTTP status:",
          response.status
        );
      }
    })
    .catch(function (err) {
      console.error("Network error while fetching pet data:", err);
    });
});

// ========================================================================
// PET DATA
// ========================================================================
var pet_info = { name: "Sparky", weight: 5, happiness: 10 };

// ========================================================================
// BUTTON HANDLERS
// ========================================================================
function clickedTreatButton() {
  // ---------------------------------------------------------------------
  // (E) LOG GROUP — Group related log lines together (collapsible)
  // ---------------------------------------------------------------------
  console.group("Treat Button Clicked");
  console.log("Before:", JSON.parse(JSON.stringify(pet_info)));

  pet_info.weight = Number(pet_info.weight) + 1;
  pet_info.happiness = pet_info.happiness + 2;

  console.log("After:", JSON.parse(JSON.stringify(pet_info)));
  console.groupEnd();

  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  console.group("Play Button Clicked");
  pet_info.happiness = pet_info.happiness + 3;
  pet_info.weight = Number(pet_info.weight) - 1;
  console.log("Updated:", JSON.parse(JSON.stringify(pet_info)));
  console.groupEnd();
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  console.group("Exercise Button Clicked");
  pet_info.happiness = pet_info.happiness - 1;
  pet_info.weight = Number(pet_info.weight) - 2;
  console.log("Updated:", JSON.parse(JSON.stringify(pet_info)));
  console.groupEnd();
  checkAndUpdatePetInfoInHtml();
}

// ========================================================================
// VALIDATION + RENDER
// ========================================================================
function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  // ---------------------------------------------------------------------
  // (F) LOG WARNING — Triggers when weight drops below zero
  // ---------------------------------------------------------------------
  if (Number(pet_info.weight) < 0) {
    console.warn("Pet weight has dropped below zero. Resetting to 0.");
    pet_info.weight = 0;
  }

  // ---------------------------------------------------------------------
  // (G) LOG ERROR — Triggers when happiness drops below zero
  // ---------------------------------------------------------------------
  if (pet_info.happiness < 0) {
    console.error("Pet happiness is critically low — pet may run away!");
    pet_info.happiness = 0;
  }
}

function updatePetInfoInHtml() {
  $(".name").text(pet_info["name"]);
  $(".weight").text(pet_info["weight"]);
  $(".happiness").text(pet_info["happiness"]);
}

// ========================================================================
// (H) CAUSE A TypeError — Calling a method on undefined
//     Triggered by clicking the pet image area.
// ========================================================================
function triggerTypeError() {
  var undefinedPet;
  console.log("About to call .toUpperCase() on undefined...");
  undefinedPet.toUpperCase();
}

// ========================================================================
// (I) CAUSE A "Violation" — Block the main thread long enough that
//     Chrome reports a "[Violation] 'setTimeout' handler took <Nms>".
// ========================================================================
function triggerViolation() {
  setTimeout(function () {
    var start = Date.now();
    while (Date.now() - start < 250) {
      // intentional blocking loop
    }
  }, 0);
}
