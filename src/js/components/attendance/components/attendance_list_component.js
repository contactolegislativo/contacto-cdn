import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendanceList } from '../actions';

var normalize = function(r) {
  r = r.replace(new RegExp(/[àáâãäå]/g),"a");
  r = r.replace(new RegExp(/[èéêë]/g),"e");
  r = r.replace(new RegExp(/[ìíîï]/g),"i");
  r = r.replace(new RegExp(/[òóôõö]/g),"o");
  r = r.replace(new RegExp(/[ùúûü]/g),"u");
  return r;
};

class AttendanceList extends Component {
  componentWillMount() {
    // Read API
    this.props.fetchAttendanceList();
  }

  componentDidUpdate() {
    let $table = $('.table');
    $('.table').dataTable({
      "language": {
        "lengthMenu": "Mostrando _MENU_ diputados por pagina",
        "zeroRecords": "No se encontro",
        "info": "Mostrando _PAGE_ de _PAGES_",
        "infoEmpty": "Ningun diputado disponible",
        "infoFiltered": "(filtrado de un total de _MAX_ diputados)"
      }
    });
  }

  renderPlaceholder() {
    return (
      <div>
        <h3 className="text-center"></h3>
        <h5 className="text-center mt-2"></h5>
        <div style={{"height": this.props.width + 'px'}}>
          <h4>Loading ...</h4>
        </div>
      </div>
    );
  }

  renderItems() {
    return this.props.attendanceList.map(item => {
      let path = normalize(item.state).replace(/ /g,'-').toLowerCase();
      let url = '';
      if(item.type === 'Representación proporcional') {
        url = `/legislatura/LXIII/diputado/${path}/circunscripcion/${item.district}/${item.id}`;
      } else {
        url = `/legislatura/LXIII/diputado/${path}/distrito/${item.district}`;
      }

      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.state}</td>
          <td>{item.district}</td>
          <td>{item.type}</td>
          <td help={item.attendanceEntity}>
            <a href={url} target="_blank">
              {item.displayName}
            </a>
          </td>
          <td>{item.party}</td>
          <td>{item.entries}</td>
        </tr>
      );
    });
  }

  render() {
    if(this.props.attendanceList.length === 0)
      return this.renderPlaceholder();

    return (
      <div className="pl-5 pr-5">
        <table className="table table-sm table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Estado</th>
              <th>Distrito</th>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Partido</th>
              <th>Asistencias</th>
            </tr>
          </thead>
          <tbody>
            { this.renderItems() }
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    attendanceList: state.attendanceList
  };
}, { fetchAttendanceList })(AttendanceList);
