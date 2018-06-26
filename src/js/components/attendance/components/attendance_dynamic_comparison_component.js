import React, { Component } from 'react';
import { Loader } from 'react-echart';
import { Scene } from 'attendance';

function expand(scenes) {
  return scenes.map((scene, index) => {
    return <Scene key={index} {...scene }/>
  });
}

function swap(element, replaceble, transition) {
  element.className = element.className.replace(' ' + replaceble, '');
  if(element.className.indexOf(transition) < 0)
    element.className += ' ' + transition;
}

function monitor(element, treshold, initial, transition, end) {
  if(window.scrollY < treshold.top) {
    swap(element, transition, initial);
  } else if(window.scrollY > treshold.top && window.scrollY < treshold.bottom) {
    swap(element, initial, transition);
    swap(element, end, transition);
  } else {
    swap(element, transition, end);
  }
}

function bounce(treshold, scene) {
  let bound = scene.getBoundingClientRect();
  if(bound.bottom < 3 * treshold) {
    swap(scene, 'enter', 'exit')
  } else if(bound.top <= treshold ) {
    swap(scene, 'exit', 'enter');
  } else {
    swap(scene, 'enter', 'exit');
  }
}

export default class AttendanceDynamicComparison extends Component {
  componentDidMount(prevProps, prevState) {
    // Scenes to be animated
    var scenes = document.querySelectorAll('.scene.animated');
    // Scene to be static
    var fixed = document.querySelector('.scene.absolute');
    // Determine areas to play with
    var viewHeight = fixed.getBoundingClientRect().height;
    var treshold = viewHeight / 4;
    var playground = {
      top: fixed.getBoundingClientRect().top,
      bottom: scenes[scenes.length - 1].getBoundingClientRect().top
    };

    function onScroll(e) {
      scenes.forEach(bounce.bind(this, treshold));
      monitor(fixed, playground, 'absolute top', 'fixed', 'absolute bottom');
    }

    scenes.forEach(bounce.bind(this, treshold));

    window.addEventListener('scroll', onScroll);
    window.onscroll = onScroll;

  }

  render() {
    // We need to have attedance and attendance frequency to display this chart
    if(this.props.baseline === 0 || this.props.scenes.length === 0)
      return <Loader width={this.props.frame.width}/>;

    let deputy = {
      main: {
        name: this.props.deputy.name,
        resource: `/assets/img/deputies/${this.props.deputy.slug}.png`
      },
      secondary: {
        name: `${this.props.deputy.party.toUpperCase()}`,
        resource: `/assets/img/${this.props.deputy.party}.png`
      },
      header: { upper: 'Tu diputado tiene MEJOR asistencia que', lower: 'XXX diputados de la camara' },
      title: `${this.props.baseline} Asistencias`,
      isFixed: true
    };

    return (
      <div className="chart">
        <div className="layout">
          <Scene {...deputy}/>
          { expand(this.props.scenes) }
        </div>
      </div>
    );
  }
}
