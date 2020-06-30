
import "./assets/styles/style.scss";
import "./index.scss";

/* Appel de l'API */

const produitSell = "cameras";
const url = "http://localhost:3000/api/" + produitSell + "/";

const apiUrl = fetch(url);

apiUrl
  .then(async (response) => {
    try {
      const productsApi = await response.json();
      const products = await productsApi;

    let listProduct = document.createElement("section")
    listProduct.setAttribute("class", "list-product");
    
		//Ajout de la section dans le HTML
		let main = document.getElementById("parent");
		main.appendChild(listProduct);

      products.forEach(product => {
        //création des élements de la structure de la liste des produits en vente
      	//Une div conteneur/2 div(block gauche et droit)/une image/le nom(titre)/le prix(p)/le lien(a)
      let productBlock = document.createElement("div");
      let productLeft = document.createElement("div");
      let productRight = document.createElement("div");
      let productImage = document.createElement("img");
      let productName = document.createElement("h2");
      let productPrice = document.createElement("p");
      let productLink = document.createElement("a");

      	//Ajout des attributs au balise pour la création du style via le css
      productBlock.setAttribute("class", "listProductBlock");
      productLeft.setAttribute("class", "listProductBlockLeft");
      productRight.setAttribute("class", "listProductBlockRight");
      productImage.setAttribute("src", product.imageUrl);
      productImage.setAttribute("alt", "image du produit"); 
      productLink.setAttribute("href", "products.html?id=" + product._id);

     	//Block conteneur en flex
      	//Block gauche comprend l'image du produit
     	//Bloc droit comprend le nom/prix/le lien du produit
     	listProduct.appendChild(productBlock);
     	productBlock.appendChild(productLeft);
     	productLeft.appendChild(productImage);
     	productBlock.appendChild(productRight);
     	productRight.appendChild(productName);
     	productRight.appendChild(productPrice);
     	productRight.appendChild(productLink);

      	//Déterminer le contenu des balises
      productName.textContent = product.name;
      productPrice.textContent = product.price / 100 + " euros";
      productLink.textContent = "Voir le produit";
      });
      /*Affichage page d'accueil*/
    } catch (e) {
      console.log(e);
    }
  })
  .catch((error) => console.log(error));
      

