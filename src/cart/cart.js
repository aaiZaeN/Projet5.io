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
      document.getElementById("emptyBasket").remove();

      //Structure tableau  
      let bill = document.createElement("table");
      let rowTable = document.createElement("tr");
      let columnName = document.createElement("th");
      let columnUnitPrice = document.createElement("th");
      let columnRemove = document.createElement("th");
      let rowTotal = document.createElement("tr");
      let columnTotalRef = document.createElement("th");
      let columnPrice = document.createElement("td");

      //Placement de la structure dans la page et du contenu des entetes
      let billSection = document.getElementById("basketResume");
      billSection.appendChild(bill);
      bill.appendChild(rowTable);
      rowTable.appendChild(columnName);
      columnName.textContent = "Nom du produit";
      rowTable.appendChild(columnUnitPrice);
      columnUnitPrice.textContent = "Prix du produit";
      rowTable.appendChild(columnRemove);
      columnRemove.textContent = "Supprimer un produit";
      

      //Pour chaque produit du panier, on créé une ligne avec le nom, le prix, l'accessoire (lenses)
      
      //Init de l'incrémentation de l'id des lignes pour chaque produit
      let i = 0;
      
      JSON.parse(localStorage.getItem("userBasket")).forEach((product)=>{
        //Création de la ligne
        let rowProduct = document.createElement("tr");
        let nameProduct = document.createElement("td");
        let priceUnitProduct = document.createElement("td");
        let removeProduct = document.createElement("i");

        //Attribution des class pour le css
        rowProduct.setAttribute("id", "product"+i);
        removeProduct.setAttribute("id", "remove"+i);
        removeProduct.setAttribute('class', "fas fa-trash-alt cancelProduct");
        
        //cancelProduct 
        removeProduct.addEventListener('click', cancelProduct.bind(i));
        i++;

        
        bill.appendChild(rowProduct);
        rowProduct.appendChild(nameProduct);
        rowProduct.appendChild(priceUnitProduct);
        rowProduct.appendChild(removeProduct);

        //Contenu des lignes
        nameProduct.innerHTML = product.name+" + "+product.lenses;
        priceUnitProduct.textContent = product.price / 100 + " €";
    });

      //Dernière ligne du tableau : Total
      bill.appendChild(rowTotal);
      rowTotal.appendChild(columnTotalRef);
      columnTotalRef.textContent = "Total à payer"
      rowTotal.appendChild(columnPrice);
      columnPrice.setAttribute("id", "sommeTotal")

      //Calcule de l'addition total
      let totalPrice = 0;
      JSON.parse(localStorage.getItem("userBasket")).forEach((product)=>{
      	totalPrice += product.price / 100;
      });

      //Total à payer dans l'addition
      console.log("Administration : " + totalPrice);
      document.getElementById("sommeTotal").textContent = totalPrice + " €";
      
  };

  
  //Supprimer un produit du panier
 function cancelProduct (i){
  	console.log("Administration : Enlever le produit à l'index " + i);
      //recupérer le array
      userBasket.splice(i, 1); 
      console.log("Administration : " + userBasket);
      //vide le localstorage
      localStorage.clear();
      console.log("Administration : localStorage vidé");
      // mettre à jour le localStorage avec le nouveau panier
      localStorage.setItem('userBasket', JSON.stringify(userBasket));
      console.log("Administration : localStorage mis à jour");
      //relancer la création de l'addition
      window.location.reload();
  };


  //POST Formulaire

    //Récupération des inputs
    let formName = document.getElementById("formName").value;
    let formFirstName = document.getElementById("formFirstName").value;
    let formMail = document.getElementById("formMail").value;
    let formZipCode = document.getElementById("formZipCode").value;
    let formAdresse = document.getElementById("formAdresse").value;
    let formCity = document.getElementById("formCity").value;

async function sendRequest() {
  try {
    const formOrder = {
        formName : formName,
        formFirstName : formFirstName,
        formMail : formMail,
        formZipCode : formZipCode,
        formAdresse : formAdresse,
        formCity : formCity
    };  
    const reponse = await fetch("http://localhost:3000/api/" + "/order", {
      method: "POST",
      headers: {
        "Conten-Type": "application/json"
      },
      body: JSON.stringify(formOrder)
    });
    const json = await response.json();
    afficherLeResultat(json);
  } catch (err) {
    console.error(err);
  }
}
sendRequest();

//ecoute du click sur le bouton envoyer

//creer alerte "commande passée avec succés" + infos

