import React from 'react';

var getPartyBudget = function(party) {
  let budget = 0;

  switch (party) {
    case 'pan':
      budget = 791060175;
      break;
    case 'pri':
      budget = 1043302925;
      break;
    case 'pve':
      budget = 356997830;
      break
    case 'prd':
      budget = 477648679;
      break;
    case 'morena':
      budget = 400849652;
      break;
    case 'movimiento ciudadano':
      budget = 331566510;
      break;
    case 'panal':
      budget = 258750925;
      break;
    case 'encuentro':
      budget = 245942944;
      break;
  }

  return budget;
}

export default function(props) {
  let totalBudget = 4138727087;
  let budget = getPartyBudget(props.party);

  let tweetText = `https://twitter.com/intent/tweet?screen_name=&amp;text=@${props.twitter.replace('https://twitter.com/','')} Queremos devolverle los partidos a las personas, tu me representas y quiero que apoyes %23SinVotoNoHayDinero %23ContactoLegislativo sinvotonohaydinero.mx`;
  let mailText = `mailto:${props.email}?subject=Tu me representas y quiero que apoyes %23SinVotoNoHayDinero&amp;body=Queremos devolverle los partidos a las personas. Dip.${props.deputyName}, tu me representas y quiero que apoyes %23SinVotoNoHayDinero sinvotonohaydinero.mx`;

  return (
    <div className="chart">
      <div className="vpanel text-center">
        <div>
          <h3 className="mb-1">Y su partido recibirá
            <a href="http://www.ine.mx/archivos3/portal/historico/recursos/IFE-v2/DS/DS-CG/DS-SesionesCG/CG-acuerdos/2016/08_Agosto/CGex201608-26/CGex201608-26-ap-1.pdf">
              ${budget.toLocaleString()} MX </a> este año
            </h3>
          <h3 className="mb-5 hidden-xs">¿Consideras que es demasiado presupuesto?</h3>
          <div className="party-budget">
            <img className="party" src={`/assets/img/${props.party}.png`}/>
            <img className="budget" src="/assets/img/notes.png"/>
          </div>
        </div>
        <h4 className="mt-3">Te invitamos a participar en la iniciativa <a href="http://sinvotonohaydinero.mx/" target="_blank">#SinVotoNoHayDinero</a> que propone recortar el gasto de los partidos</h4>
        <h4 className="mt-3 mb-5">Escribe a tu diputado invitándolo a unirse a la iniciativa</h4>
        <ul className="btn-group">
          <li className="circle-btn animated infinite wobble"><a target="_blank" href={tweetText}><i className="fa fa-3x fa-twitter"></i></a></li>
          <li className="circle-btn animated infinite wobble"><a target="_top" href={mailText}><i className="fa fa-3x fa-envelope"></i></a></li>
        </ul>
      </div>
    </div>
  );
}
