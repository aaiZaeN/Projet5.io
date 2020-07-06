import '../assets/styles/style.scss'
import './cart.scss';

/*Page panier
**********************************************/

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


    //Vérifie si un produit est dans le panier
    if(JSON.parse(localStorage.getItem("userBasket")).length > 0){
      //Si produit dans le panier = supprimer message + creer tableau
      document.getElementById("panierVide").remove();

      //Structure tableau  
      let facture = document.createElement("table");
      let ligneTableau = document.createElement("tr");
      let colonneNom = document.createElement("th");
      let colonnePrixUnitaire = document.createElement("th");
      let colonneRemove = document.createElement("th");
      let ligneTotal = document.createElement("tr");
      let colonneRefTotal = document.createElement("th");
      let colonnePrixPaye = document.createElement("td");

      //Placement de la structure dans la page et du contenu des entetes
      let factureSection = document.getElementById("basketResume");
      factureSection.appendChild(facture);
      facture.appendChild(ligneTableau);
      ligneTableau.appendChild(colonneNom);
      colonneNom.textContent = "Nom du produit";
      ligneTableau.appendChild(colonnePrixUnitaire);
      colonnePrixUnitaire.textContent = "Prix du produit";
      /*ligneTableau.appendChild(colonneRemove);
      colonneRemove.textContent = "Annuler un produit";
      */

      //Pour chaque produit du panier, on créé une ligne avec le nom, le prix, l'accessoire (lenses)
      
      //Init de l'incrémentation de l'id des lignes pour chaque produit
      let i = 0;
      
      JSON.parse(localStorage.getItem("userBasket")).forEach((product)=>{
        //Création de la ligne
        let ligneProduit = document.createElement("tr");
        let nomProduit = document.createElement("td");
        let prixUnitProduit = document.createElement("td");
        let removeProduit = document.createElement("i");

        //Attribution des class pour le css
        ligneProduit.setAttribute("id", "product"+i);
        removeProduit.setAttribute("id", "remove"+i);
        removeProduit.setAttribute('class', "fas fa-trash-alt annulerProduit");
        
        //annulerProduit 
        removeProduit.addEventListener('click', annulerProduit.bind(i));
        i++;

        
        facture.appendChild(ligneProduit);
        ligneProduit.appendChild(nomProduit);
        ligneProduit.appendChild(prixUnitProduit);
        ligneProduit.appendChild(removeProduit);

        //Contenu des lignes
        nomProduit.innerHTML = product.name;
        prixUnitProduit.textContent = product.price / 100 + " €";
    });

      //Dernière ligne du tableau : Total
      facture.appendChild(ligneTotal);
      ligneTotal.appendChild(colonneRefTotal);
      colonneRefTotal.textContent = "Total à payer"
      ligneTotal.appendChild(colonnePrixPaye);
      colonnePrixPaye.setAttribute("id", "sommeTotal")

      //Calcule de l'addition total
      let totalPaye = 0;
      JSON.parse(localStorage.getItem("userBasket")).forEach((product)=>{
      	totalPaye += product.price / 100;
      });

      //Total à payer dans l'addition
      console.log("Administration : " + totalPaye);
      document.getElementById("sommeTotal").textContent = totalPaye + " €";
      
  };

  
  //Supprimer un produit du panier
 function annulerProduit (i){
  	console.log("Administration : Enlever le produit à l'index " + i);
      //recupérer le array
      userBasket.splice(i, 1); 
      console.log("Administration : " + userBasket);
      //vide le localstorage
      localStorage.clear();
      console.log("Administration : localStorage vidé");
      // mettre à jour le localStorage avec le nouveau panier
      localStorage.setItem('userPanier', JSON.stringify(userBasket));
      console.log("Administration : localStorage mis à jour");
      //relancer la création de l'addition
      window.location.reload();
  };
