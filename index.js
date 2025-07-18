import { FetchWrapper } from "./fetchWrapper.js";
import { capitalize, calculateCalories } from "./helper.js";
import snackbar from "https://cdn.skypack.dev/snackbar";

const api = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/foodname"
);

const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");
const foodList = document.querySelector("#food-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const body = {
    fields: {
      name: { stringValue: name.value },
      carbs: { integerValue: carbs.value },
      protein: { integerValue: protein.value },
      fat: { integerValue: fat.value },
    },
  };

  api.post("/", body).then((data) => {
    console.log(data);

    if (data.error) {
      snackbar.show("Some data is missing.");
      return;
    }

    foodList.insertAdjacentHTML(
      "beforeend",
      `<li class="card">
          <div>
            <h3 class="name">${capitalize(name.value)}</h3>
            <div class="calories">${calculateCalories(
              carbs.value,
              protein.value,
              fat.value
            )} calories</div>
            <ul class="macros">
              <li class="carbs"><div>Carbs</div><div class="value">${
                carbs.value
              }g</div></li>
              <li class="protein"><div>Protein</div><div class="value">${
                protein.value
              }g</div></li>
              <li class="fat"><div>Fat</div><div class="value">${
                fat.value
              }g</div></li>
            </ul>
          </div>
        </li>`
    );

    snackbar.show("Food added successfully.");

    name.value = "";
    carbs.value = "";
    protein.value = "";
    fat.value = "";
  });
});

const init = () => {
  api.get("/?pageSize=50").then((data) => {
    if (!data.documents) {
      snackbar.show("No entries found");
      return;
    }

    data.documents?.forEach((doc) => {
      const fields = doc.fields;
      console.log(fields);
      foodList.insertAdjacentHTML(
        "beforeend",
        `
        <li class="card">
        <div>
            <h3 class="name">${capitalize(fields.name.stringValue)}</h3>
            <div class="calories">${calculateCalories(
              fields.carbs.integerValue,
              fields.protein.integerValue,
              fields.fat.integerValue
            )}</div>
            <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${
              fields.carbs.integerValue
            }g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${
              fields.protein.integerValue
            }g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${
              fields.fat.integerValue
            }g</div></li>
            </ul>
        </div>
        </li>
        `
      );
    });
  });
};
init();
