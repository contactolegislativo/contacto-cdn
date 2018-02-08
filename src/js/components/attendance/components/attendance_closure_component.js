import React from 'react';

export default function(props) {
  return (
    <div className="chart mb-0">
      <div className="grade full-panel text-center">
        <div className="center-content">
          <h3 className="mb-5">Invita a tus amigos a conocer mas sobre sus legisladores</h3>
          <ul className="btn-bar">
            <li className="btn btn-primary">
              <a target="_blank" className="text-white" href="http://www.facebook.com/sharer/sharer.php?u=http://contactolegislativo.com&amp;title=¿Sabes que diputado te representa?">
                <i className="fa fa-2x fa-facebook-official"></i> <span>Compartir</span>
              </a>
            </li>
            <li className="btn btn-info">
              <a target="_blank" className="text-white" href="https://twitter.com/intent/tweet?screen_name=contactolegislativo&amp;text=Te invito a conocer mas sobre el diputado que te representa en @clegislativomx http://contactolegislativo.com">
                <i className="fa fa-2x fa-twitter-square"></i> <span>Compartir</span>
              </a>
            </li>
            <li className="btn btn-success">
              <a target="_blank" className="text-white" data-action="share/whatsapp/share" href="whatsapp://send?text=Te invito a conocer mas sobre el diputado que te representa en http://contactolegislativo.com">
                <i className="fa fa-2x fa-whatsapp"></i> <span>Compartir</span>
              </a>
            </li>
          </ul>
          <h3 className="mt-5">por un México con ciudadanos informados y diputados responsables</h3>
        </div>
      </div>
      <div className="grade full-panel text-center">
        <div className="center-content">
          <h3 className="mb-3">Te invitamos a seguir de cerca nuestra propuesta en redes sociales</h3>
          <ul className="btn-bar mt-5">
            <li className="btn btn-primary">
              <a className="text-white" target="_blank" href="http://www.facebook.com/contactolegislativo">
                <i className="fa fa-2x fa-facebook-official"></i>
              </a>
            </li>
            <li className="btn btn-info">
              <a className="text-white" target="_blank" href="http://www.twitter.com/clegislativomx">
                <i className="fa fa-2x fa-twitter"></i>
              </a>
            </li>
          </ul>
          <div className="crafted">
            <span>Crafted with love by</span>
            <a href="http://www.facebook.com/wedevelopmx" target="_blank">
              <img src="/assets/img/wedevelop_white_trans.png"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
