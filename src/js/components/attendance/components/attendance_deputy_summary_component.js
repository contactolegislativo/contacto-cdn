import React from 'react';

export default function(props) {
  let twitter = `https://twitter.com/intent/tweet?screen_name=&text=Diputado%20@${props.deputy.twitter.replace('https://twitter.com/', '')}%20usted%20me%20representa,%20y%20estoy%20al%20pendiente%20de%20su%20desempe%C3%B1o%20en%20%23contactoLegislativo%20contactolegislativo.com`;
  let mail = `mailto:${props.deputy.email}?subject=Tu me representas y estoy al pendiente de su desempeño en %23contactoLegislativo&body=Dip.${props.deputy.name}, tu me representas y estoy al pendiente de su desempeño en %23contactoLegislativo (http://contactolegislativo.com)`;

  return (
    <div className="chart">
      <div className="grade full-panel text-center">
        <div className="center-content">
          <h1 className="h2 mb-3" >{ props.deputy.name }</h1>
          <div className="picture">
            <div className="main yellow">
              <img src={`http://sitl.diputados.gob.mx/LXIII_leg/${props.deputy.picture}`} />
            </div>
          </div>
          <div className="star-ratings-css">
            <div className="star-ratings-css-top" style={{width: `${props.percentage}%`}}>
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div className="star-ratings-css-bottom">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
          <h3 className="pt-5 mb-3">Comparte tu feedback con tu diputado</h3>
          <ul className="btn-group mt-4 p-0">
            <li className="circle-btn"><a target="_blank" href={mail}><i className="fa fa-envelope"></i></a></li>
            <li className="circle-btn"><a target="_blank" href={`${props.deputy.facebook}`}><i className="fa fa-facebook"></i></a></li>
            <li className="circle-btn"><a target="_blank" href={twitter}><i className="fa fa-twitter"></i></a></li>
          </ul>
          <div className="clearfix pb-5"></div>
        </div>
      </div>
    </div>
  );
}
