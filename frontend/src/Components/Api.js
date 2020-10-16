import React, { Component } from 'react';
import axios from 'axios';
import Hlavnicards from './Hlavnicards';
import Datatable from './Datatable';
import Charts from './Chart';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import DataTableDemo from './CRUDdatatable';
import {Button} from 'primereact/button';

class Api extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      global: [],
      date: [],
      chartdata: [],
      json: [],

    };
this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount() {

    axios.get(`/api/corona1`)
      .then(response => response.data)
      .then((data) => {
        this.setState({ json: data })

      })

    axios.get(`https://api.covid19api.com/summary`)
      .then(response => response.data)
      .then((data) => {
        this.setState({ countries: data.Countries })
        this.setState({ global: data.Global })
        this.setState({ date: data.Date })

      })

    axios.get(`/api/employees2/`)
      .then(res => {
        const persons =
          res.data.map(person => ({
            Username: `${person.username}`,
            Name: `${person.name}`,
            Id: `${person.id}`,
            Email: `${person.email}`,
            Phone: `${person.phone}`,
            Website: `${person.website}`,
          }));
        this.setState({ persons });
      })


  }


  render() {



    return (

      <div class="p-grid">
        <div class="p-col-12"><Datatable summaryCountries={this.state.countries} /></div>
        <div class="p-col-12"><DataTableDemo crudPersons={this.state.persons} refr={this.componentDidMount} /></div>
        <div class="p-col-12" style={{ textAlign: 'center' }}><Button  label="Refresh" icon="pi pi-plus" onClick={this.componentDidMount} style={{ align: 'right' }}/></div>
      </div>




    );
  }
}

export default Api;