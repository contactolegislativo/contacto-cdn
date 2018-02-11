import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendanceList } from '../actions';
import { Loader } from 'react-echart';

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
          <td className="d-none d-sm-table-cell">{item.id}</td>
          <td className="d-none d-sm-table-cell">{item.state}</td>
          <td className="d-none d-sm-table-cell">{item.district}</td>
          <td className="d-none d-sm-table-cell">{item.type}</td>
          <td help={item.attendanceEntity}>
            <a href={url} target="_blank">
              {item.displayName}
            </a>
            &nbsp;
            <span className="text-muted">({item.party.toUpperCase()})</span>
            <span className="d-block d-sm-none text-muted">
              {item.state} | D.{item.district}
            </span>
          </td>
          <td className="d-none d-sm-table-cell">{item.party.toUpperCase()}</td>
          <td>{item.entries}</td>
        </tr>
      );
    });
  }

  render() {
    if(this.props.attendanceList.length === 0)
      return <Loader width={this.props.frame.width}/>;

    return (
      <div className="table-container">
        <table className="table table-sm table-striped">
          <thead className="thead-dark">
            <tr>
              <th className="d-none d-sm-table-cell">#</th>
              <th className="d-none d-sm-table-cell">Estado</th>
              <th className="d-none d-sm-table-cell">Distrito</th>
              <th className="d-none d-sm-table-cell">Tipo</th>
              <th>Nombre</th>
              <th className="d-none d-sm-table-cell">Partido</th>
              <th>#A</th>
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
