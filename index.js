import { FetchWrapper } from "./fetchWrapper.js";

const api = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/foodname"
);

const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");

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
      return;
    }
    name.value = "";
    carbs.value = "";
    protein.value = "";
    fat.value = "";
  });
});
