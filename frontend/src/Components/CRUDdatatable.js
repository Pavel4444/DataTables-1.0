import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import axios from 'axios';
import {Messages} from 'primereact/messages';
import {Message} from 'primereact/message';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {ContextMenu} from 'primereact/contextmenu';
import {MultiSelect} from 'primereact/multiselect';
import {InputText} from 'primereact/inputtext';
import "primeflex/primeflex.css";

class DataTableDemo extends Component {

    constructor() {
        super();
        let dynamicColumns = [
            { field: 'Username', header: 'Username', key: 'Username' },
            { field: 'Name', header: 'Name', key: 'Name' },
            { field: 'Id', header: 'Id', key: 'Id' },
        ];

        this.state = {
            persons: [

            ],
        };


        this.state = {
            cols: dynamicColumns
        };

        this.colOptions = [];
        for (let col of dynamicColumns) {
            this.colOptions.push({ label: col.header, value: col });
        }
        this.onColumnToggle = this.onColumnToggle.bind(this);
        this.save = this.save.bind(this);
        this.onEmployeeSelect = this.onEmployeeSelect.bind(this);
        this.delete = this.delete.bind(this);
        this.addNew = this.addNew.bind(this);


    }



    onEmployeeSelect(e) {
        this.newEmployee = false;
        this.setState({
            visible: true,
            person: Object.assign({}, e.data)
        });
    }


    updateProperty(property, value) {
        let person = this.state.person;
        person[property] = value;
        this.setState({ person: person });
    }

    save() {
        const { crudPersons } = this.props;
        let persons = [...crudPersons];

        let person = {
            id: this.state.person.Id,
            name: this.state.person.Name,
            username: this.state.person.Username,
            email: this.state.person.Email,
            phone: this.state.person.Phone,
            website: this.state.person.Website
        }


        if (this.newEmployee) {

            persons.push(this.state.person);
            axios.post(`/api/employees2/`, person);
            this.setState({ persons: persons, employee: null, person: null, visible: false });
            this.messages.show({ severity: 'success', summary: 'Success employee saved' });

        }

        else {
            persons[this.findSelectedCarIndex()] = this.state.person;
            axios.put(`/api/employees2/${this.state.person.Id}`, person);
            this.setState({ persons: persons, employee: null, person: null, visible: false });
            this.messages.show({ severity: 'success', summary: 'Success employee saved' });


        }
        console.log(person);
    }


    delete() {
        const { crudPersons } = this.props;
        let index = this.findSelectedCarIndex();
        this.setState({
            persons: crudPersons.filter((val, i) => i !== index),
            employee: null,
            person: null,
            visible: false
        });
        this.messages.show({ severity: 'info', summary: 'Success employee deleted' });
        axios.delete(`/api/employees2/${this.state.person.Id}`);
    }

    addNew(person) {
        this.newEmployee = true;
        this.setState({
            person: { Id: '', Username: '', Name: '', Phone: '', Website: '', Email: '' },
            visible: true
        });
    }


    findSelectedCarIndex() {
        const { crudPersons } = this.props;
        return crudPersons.indexOf(this.state.employee);
    }

    onColumnToggle(event) {
        this.setState({ cols: event.value });
    }




    render() {

        const { crudPersons } = this.props;

        const header =
            <div className="p-col-12">
                <div className="p-col-12" style={{ borderBottom: 'solid', borderColor: 'white' }}><h2>Employee table</h2></div>

                <div className="p-col-12">
                    <div className="p-inputgroup">

                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value }) } placeholder="Global Search" style={{ maxWidth: '1000px' }} />

                    </div>

                </div>
            </div>

        const footer = <div className="p-grid p-justify-between" style={{ marginTop: '.25em' }}>
            <div className="p-col-5" style={{ marginLeft: '.50em' }}><Button  label="Add new" icon="pi pi-plus" onClick={this.addNew}/></div>
            <div className="p-col-6" style={{ marginLeft: '.50em' }}><MultiSelect value={this.state.cols} options={this.colOptions} onChange={this.onColumnToggle}/></div>

        </div>;

        const dialogFooter = <div style={{ textAlign: 'right' }}>
            <Button  label="Save" icon="pi pi-check" onClick={this.save}/>
            <Button  label="Delete" icon="pi pi-times" onClick={this.delete}/>
        </div>;

        const dynamicColumns = this.state.cols.map(col =>
            <Column key={col.field} field={col.field} header={col.header} sortable={true} filter={true} />
        );



        return (




            <div>

                <Messages ref={(el) => this.messages = el} />
                {this.state.showMessage && (
                    <DataTableDemo />


                ) }

                <div class="p-grid p-justify-between" style={{ marginTop: '.25em' }}>
                    <div class="p-md-1"></div>
                    <div class="p-col-12 p-md-10" style={{ backgroundColor: '#FAF9F6' }} >

                        <DataTable value={crudPersons} selectionMode="single" header={header} footer={footer} globalFilter={this.state.globalFilter} emptyMessage="No records found"
                            resizableColumns={true} columnResizeMode="expand"
                            selection={this.state.employee} onSelectionChange={e => this.setState({ employee: e.value }) } onRowDoubleClick={this.onEmployeeSelect}>
                            {dynamicColumns}
                        </DataTable>
                    </div>
                    <div class="p-md-1"></div>
                </div>

                <Dialog header="Employee Details" footer={dialogFooter}  visible={this.state.visible} style={{ width: '50vw' }} modal={true} onHide={() => this.setState({ visible: false }) }>
                    {this.state.person &&
                        <div className="p-grid p-fluid">

                            <div className="p-col-4" style={{ padding: '.75em' }}><label>Username</label></div>
                            <div className="p-col-8" style={{ padding: '.5em' }}>
                                <InputText id="Username" onChange={(e) => { this.updateProperty('Username', e.target.value) } } value={this.state.person.Username}/>
                            </div>

                            <div className="p-col-4" style={{ padding: '.75em' }}><label>Full name</label></div>
                            <div className="p-col-8" style={{ padding: '.5em' }}>
                                <InputText id="Name" onChange={(e) => { this.updateProperty('Name', e.target.value) } } value={this.state.person.Name}/>
                            </div>

                            <div className="p-col-4" style={{ padding: '.75em' }}><label>Phone</label></div>
                            <div className="p-col-8" style={{ padding: '.5em' }}>
                                <InputText id="Phone" onChange={(e) => { this.updateProperty('Phone', e.target.value) } } value={this.state.person.Phone}/>
                            </div>

                            <div className="p-col-4" style={{ padding: '.75em' }}><label>Website</label></div>
                            <div className="p-col-8" style={{ padding: '.5em' }}>
                                <InputText id="Website" onChange={(e) => { this.updateProperty('Website', e.target.value) } } value={this.state.person.Website}/>
                            </div>

                            <div className="p-col-4" style={{ padding: '.75em' }}><label>E-mail</label></div>
                            <div className="p-col-8" style={{ padding: '.5em' }}>
                                <InputText id="E-mail" onChange={(e) => { this.updateProperty('Email', e.target.value) } } value={this.state.person.Email}/>
                            </div>
                        </div>
                    }
                </Dialog>


            </div>


        );
    }
}
export default DataTableDemo;