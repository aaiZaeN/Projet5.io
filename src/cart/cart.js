import '../assets/styles/style.scss'
import './cart.scss';

const produitSell = "cameras";
const url = "http://localhost:3000/api/" + produitSell + "/";



//Tableau et objet demandé par l'API pour la commande
let contact;
let products = [];
/*Page panier
**********************************************/

//Appel de l'API
function getAPI(){
  fetch(url)
      .then(res => res.json())
      .then(product => {
          console.log(product)
      }).catch(err => {
          console.error('Error: ', err);
    });
  };  
  
  const productAPI =  getAPI();

//Vérifier si le panier existe
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
      columnRemove.textContent = "";
      

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
        nameProduct.innerHTML = product.name;
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

  //Vérification des inputs
  function checkInputs() {
    //controle regex
    let checkString = /[a-zA-A]/;
    let checkNumber = /[0-9]/;
    //controle mail
    let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
    let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

    //message fin du controle
    let checkMessage = "";

    //Récupération des inputs
    let formName = document.getElementById("formName").value;
    let formFirstName = document.getElementById("formFirstName").value;
    let formMail = document.getElementById("formMail").value;
    let formAdresse = document.getElementById("formAddress").value;
    let formCity = document.getElementById("formCity").value;

    //tests des inputs du formulaire
      //Test du nom (aucun chiffre ou charactère spécial)
      if(checkNumber.test(formName) == true || checkSpecialCharacter.test(formName) == true || formName == ""){
        checkMessage = "Vérifiez ou renseignez votre nom";
      }else{
        console.log('Administration : Nom ok');
      };
      //Test du prénom (aucun chiffre ou charactère spécial)
      if(checkNumber.test(formFirstName) == true || checkSpecialCharacter.test(formFirstName) == true || formFirstName == ""){
        checkMessage = checkMessage + "\n" + "Vérifiez ou renseignez votre prénom";
      }else{
        console.log('Administration : Prénom ok');
      };
      //Test du mail (regex source L256)
      if(checkMail.test(formMail) == false){
        checkMessage = checkMessage + "\n" + "Vérifiez ou renseignez votre mail";
      }else{
        console.log("Administration : Adresse mail ok");
      };
      //Test adresse (pas de charactères spéciaux)
      if(checkSpecialCharacter.test(formAdresse) == true || formAdresse == ""){
        checkMessage = checkMessage + "\n" + "Vérifiez ou renseignez votre adresse";
      }else{
        console.log("Administration : Adresse ok");
      };
      //Test de la ville (pas de chiffre ou charactères spéciaux)
      if(checkSpecialCharacter.test(formCity) == true && checkNumber.test(formCity) == true || formCity == ""){
        checkMessage = checkMessage + "\n" + "Vérifiez ou renseignez votre ville"
      }else{
        console.log("Administration : Ville ok")
      };
      //Si un champs n'est pas valide => message d'alerte
      if(checkMessage != ""){
        alert('Il est nécessaire de :' + '\n' + checkMessage);
      }
      //Si tout est valide => construction de l'objet contact
      else{
        contact = {
          firstName : formFirstName,
          lastName : formName,
          address : formAdresse,
          city : formCity,
          email : formMail
        };
        return contact;
      };
  };


  //Vérifier panier
  function checkBasket() {
    //Minimum 1 produit dans le panier
    let basketStatus = JSON.parse(localStorage.getItem('userBasket'));
    //Si panier est vide => suppression localStorage + alerte
    if(basketStatus == null){
      //Si le localStorage à été supprimer => alerte
      alert('Il y a un problème avec votre panier, merci de recharger la page');
      return false
    }else if(basketStatus.length < 1 || basketStatus == null){
      console.log('Administration : ERROR => le localStorage ne contient pas de panier')
      alert('Votre panier est vide');
      return false;
    }else{
      console.log('Administration : Un ou des article(s) sont dans le panier')
        //Si article(s) dans le panier => remplissage products envoyé à l'API
        JSON.parse(localStorage.getItem('userBasket')).forEach((product) =>{
          products.push(product._id);
        });
        console.log("Administration : Ce tableau sera envoyé à l'API : " + products)
        return true;
    }
  };

async function sendRequest(order) {
    const response = await fetch(url + "order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: order
    });
      //Save retour de l'API dans sessionStorage
      //console.log(await response.json())
      sessionStorage.setItem('order', JSON.stringify(await response.json()));

      //Charger page order-confirm 
      window.open('./confirm-order.html')
  }


//ecoute du click sur le bouton envoyer
function validForm(){
  let formBtn = document.getElementById("formButton");
  formBtn.addEventListener('click',function() {
  if(checkBasket() == true && checkInputs() != null){
    console.log("Administration : L'envoi peut être effectué");
  //crétion de l'objet à envoyer
  let objet = {
    contact,
    products
  };
  console.log('Administration : ' + objet);
  //=> JSON
  let objetRequest = JSON.stringify(objet);
  console.log('Administration : ' + objetRequest);
  //Envoi de l'objet
  sendRequest(objetRequest);

  //Une fois la commande effectuée => retour étt initial
  contact = {};
  products = [];
  localStorage.clear();
  }else{
    console.log('Administration : ERROR');
  };
});
};

validForm();