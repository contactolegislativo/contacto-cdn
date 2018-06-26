import React, { Component } from 'react';

/*
{
  main: {
    name: '',
    resource: ''
  },
  secondary: {
    name: '',
    resource: ''
  },
  title: ''
  header: {
    upper: '',
    lower: ''
  },
  isFixed: true | false
}
*/

function renderSecondary(item) {
  if(item) {
    return <img className="secondary" alt={ item.name } src={ `${ item.resource }`}/>;
  }
}

export default function(props) {
  return (
    <div className={ props.isFixed ? 'scene absolute top' : 'scene animated'}>
      <div className="scene-row">
        <h3 className={ props.isFixed ? 'pb-5 invisible' : 'pb-5'}>{ props.header ? props.header.upper : '' }</h3>
        <div className={ props.isFixed ? 'scene-column left' : 'scene-column right'}>
          <div className="picture">
            <div className="main red">
              <img alt={ props.main.name } src={ `${ props.main.resource } `}/>
            </div>
            { renderSecondary(props.secondary) }
          </div>
          <span className="h4">{ props.title }</span>
        </div>
        <h3 className={ props.isFixed ? 'pt-5 invisible' : 'pt-5 '}>{ props.header ? props.header.lower : '' }</h3>
      </div>
    </div>
  );
}
