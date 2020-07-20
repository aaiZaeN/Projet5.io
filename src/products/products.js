import '../assets/styles/style.scss'
import './products.scss';
import '../index.js'

let idProduit = "";

const produitSell = "cameras";
idProduit = location.search.substring(4);
const url = "http://localhost:3000/api/" + produitSell + "/"+idProduit;

  fetch(url)
    .then(res => res.json())
    .then(product => {
        console.log(product)
         
          let productId = product;
          console.log(productId)
          
          const produitSelected = product; /* ici */
          console.log("administration :  Vous regardez la page du produit id_"+produitSelected._id+" : "+product.name);

          let section = document.getElementById("section");
          section.style.display = "block";

          document.getElementById("imgProduct").setAttribute("src", produitSelected.imageUrl);
          document.getElementById("nameProduct").innerHTML = produitSelected.name;
          document.getElementById("descriptionProduct").innerHTML = produitSelected.description;
          document.getElementById("priceProduct").innerHTML = produitSelected.price / 100 + " euros";

          //Début panier à déplacer dans
          if(localStorage.getItem("userBasket")){
            console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
          }else{
            console.log("Administration : Le panier n'existe pas, il va être créer et envoyé dans le localStorage");
          //Il existe pas alors on le créer
          //Panier = tableau d'objets  	
              let basketInit = [];
              localStorage.setItem("userBasket", JSON.stringify(basketInit));
            };
            
            //User a maintenant un panier
            let userBasket = JSON.parse(localStorage.getItem("userBasket"));
            console.log(userBasket)
            //Au clic de l'user mettre le produit dans le panier
            let inputBuy = document.getElementById("ajouterProduitPanier");
            inputBuy.addEventListener("click", async function() {
              const products = await product;
            //Récupération du panier dans le localStorage et ajout du produit dans le panier avant de le revoyer dans le localStorage
            userBasket.push(products);
            localStorage.setItem("userBasket", JSON.stringify(userBasket));
            console.log("Administration : le produit a été ajouté au panier");
            alert("Vous avez ajouté ce produit dans votre panier: "+product.name)
          });
          

          switch(produitSell){
            case "cameras":
            produitSelected.lenses.forEach((produit)=>{
              let optionProduct = document.createElement("option");
              document.getElementById("optionSelect").appendChild(optionProduct).innerHTML = produit;
            });
          }
                
   }).catch(err => {
      console.error('Error: ', err);
});


  