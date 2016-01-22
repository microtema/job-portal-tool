'use strict';

var HeadLine = React.createClass({
    render: function () {
        return <div className="row "><h1>Job Portal Tool</h1></div>
    }
});

var SearchFilter = React.createClass({
    render: function () {
        return <div className="row ">
            <div className="col-lg-4 col-lg-offset-4">
                <input type="search" value={this.props.filterText} onChange={this.handleChange} className="form-control"
                       placeholder="Search for Job"/>
            </div>
        </div>
    },
    handleChange: function (e) {
        this.props.onSearch(e.target.value);
    }
});

var JobEntries = React.createClass({

    render: function () {

        var props = this.props;
        var rows = this.props.entries
            .filter(function (data) {
                var filterText = props.filterText.toLocaleLowerCase();
                for (var p in data) {
                    if ((data[p] + '').toLocaleLowerCase().indexOf(filterText) > -1) {
                        return true;
                    }
                }
                return false;
            })
            .map(function (data) {
                return <JobEntry key={data.id} data={data}/>
            });

        return <div className="row spacer">
            <table width="100%" className="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Job name</th>
                    <th>Company</th>
                    <th>Assistant</th>
                    <th>Salary</th>
                    <th>Start Date</th>
                    <th>State</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    }
});

var JobEntry = React.createClass({
    render: function () {
        return <tr>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.company}</td>
            <td>{this.props.data.assistant}</td>
            <td>{this.props.data.salary}</td>
            <td>{this.props.data.startDate}</td>
            <td>{this.props.data.state}</td>
            <td>
                <button className="btn btn-default btn-sm" type="submit" onClick={this.editJobEntry}>Edit</button>
            </td>
            <td>
                <button className="btn btn-default btn-sm" type="submit" onClick={this.deleteJobEntry}>Delete</button>
            </td>
        </tr>
    },
    editJobEntry: function () {
        alert('edit: ' + this.props.data.id);
    },
    deleteJobEntry: function () {
        alert('delete: ' + this.props.data.id);
    }
});

var JobPortal = React.createClass({

    getInitialState: function () {
        return {filterText: ''};
    },

    handleUserInput: function (searchTearm) {
        this.setState({filterText: searchTearm});
    },

    render: function () {
        return <div className="container">
            <HeadLine />
            <SearchFilter onSearch={this.handleUserInput} filterText={this.state.filterText}/>
            <JobEntries entries={this.props.entries} filterText={this.state.filterText}/>
        </div>
    }
});

var entries = [{
    id: 1,
    name: 'Software Developer',
    company: 'Inovex',
    assistant: 'Frau Marina',
    salary: 80,
    startDate: null,
    state: "unknown"
},
    {
        id: 2,
        name: 'Software Developer',
        company: 'Exxeta',
        assistant: 'Frau Josefina',
        salary: 100,
        startDate: null,
        state: "waiting"
    }];


var Emitter = new EventEmitter();
var Dispatcher = new Flux.Dispatcher();

var JobStore = function () {

    this.entries = [];

    Dispatcher.dispatch(function (payload) {
        alert('dispatch event: ' + payload.type);
    });
};

ReactDOM.render(<JobPortal entries={entries}/>, document.getElementById('container'));

