import '../assets/styles/style.scss'
import './confirm-order.scss';


//Affichage sur la page de confirmation 
function resultOrder() {
  if(sessionStorage.getItem('order') != null){
    //Parse du sessionStorage
    let order = JSON.parse(sessionStorage.getItem('order'));
    //Implémentation des infos (prénom) et de l'id de commande
    document.getElementById('lastName').innerHTML = order.contact.lastName
    document.getElementById('orderId').innerHTML = order.orderId

    //suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
    sessionStorage.removeItem('order');
  }else{
    alert("Aucune commande passée, vous êtes arrivé ici par erreur");
  window.open("./index.html");
  }
}
resultOrder();

