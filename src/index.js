
import "./assets/styles/style.scss";
import "./index.scss";

/* Appel de l'API */

const produitSell = "cameras"
const url = "http://localhost:3000/api/" + produitSell + "/";

const apiUrl = fetch(url);

apiUrl
  .then(async (response) => {
    try {
      const api = await response.json();
      console.log(api);
    } catch (e) {
      console.log(e);
    }
  })
  .catch((error) => console.log(error));


