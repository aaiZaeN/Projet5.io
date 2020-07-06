
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
				createPhotoBlock(product, listProduct)
			});
		
      /*Affichage page d'accueil*/
    } catch (e) {
      console.log(e);
    }
  })
  .catch((error) => console.log(error));
	
	

	function createPhotoBlock(product, listProduct){
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
	}
	
	/*création du LocalStorage pour le user*/

/* vérifier si le LocalStorage existe */
if(localStorage.getItem("userBasket")){
	console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
}else{
	console.log("Administration : Le panier n'existe pas, il va être créer et envoyé dans le localStorage");
	
/* Il existe pas alors on le créer
***  Panier = tableau d'objets */  	
  	let basketInit = [];
  	localStorage.setItem("userBasket", JSON.stringify(basketInit));
	};
	
  /*User a maintenant un panier*/
	let userBasket = JSON.parse(localStorage.getItem("userBasket"));
	console.log(userBasket)

	/*Exemple
function test(){
	return new Promise((resolve, reject) => {
		// do a thing, possibly async, then…
		if (/* everything turned out) {
			return resolve("Stuff worked!");
		}
		else {
			return reject(Error("It broke"));
		}
	 });
}

test().then(result => {
	console.log(result); // "Stuff worked!"
 }).catch(err => {
 console.error(err);
 })

 let result = await test();

 try {
	let result = await test();
	} catch( err ) {
	console.log('error')
	}*/