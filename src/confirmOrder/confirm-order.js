import '../assets/styles/style.scss'
import './confirm-order.scss';

//Affichage sur la page de confirmation 
function resultOrder() {
  if(sessionStorage.getItem('order') != null){
    //Parse du sessionStorage
    let order = JSON.parse(sessionStorage.getItem('order'));

    let sommeConfirmTotal = 0;
    order.products.forEach((orderArticle) => {
    sommeConfirmTotal += orderArticle.price / 100;
    });

    //Implémentation des infos (prénom) et de l'id de commande
    document.getElementById('thankYou').innerHTML = "Merci pour ta commande : "+order.contact.firstName+" "+"!"
    document.getElementById('orderId').innerHTML = "Voici ton numéro de commande : "+order.orderId
    document.getElementById('email').innerHTML = "Mail : "+order.contact.email
    document.getElementById('name').innerHTML = "Livré au nom de : "+order.contact.lastName+" "+order.contact.firstName
    document.getElementById('address').innerHTML = "A l'adresse suivante : "+order.contact.address+" "+order.contact.city
    document.getElementById('price').innerHTML = "Prix total de la commande : "+sommeConfirmTotal+" €"

    //suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
    sessionStorage.removeItem('order');
  }else{
    console.log('Aucune commande passée !');
    alert("Aucune commande passée, vous êtes arrivé ici par erreur");
    window.location = "./index.html";
  }
}
resultOrder();