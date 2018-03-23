import React from 'react';

function generateRadarProps(props) {
  let {data} = props;
  let indicator = [], data = [];
  let legend = ['pri', 'pan', 'prd', 'morena', 'pve', 'encuentro', 'movimiento_ciudadano', 'panal', 'sp', 'independiente'];
  data.forEach(item => {
    let values = [];
    indicator.push({ name: item.party, max: 100 });
    for(field in legend) {
      values.push(item[field]);
    }
    data.push({ name: item.party, value: values });
  });
}

export default function(props) {
  let radarProps = generateRadarProps(props);
  return <Radar {...radarProps} {...props}/>
}
