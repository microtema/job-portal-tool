'use strict';

var HeadLine = React.createClass({
    render: function () {
        return <div className="row "><h1>Job Portal Tool</h1></div>
    }
});

var SearchFilter = React.createClass({
    render: function () {
        return <div className="form-group">
            <input type="sform-groupearch" value={this.props.filterText} onChange={this.handleChange}
                   className="form-control"
                   placeholder="Search for Job"/>
        </div>
    },
    handleChange: function (e) {
        this.props.onSearch(e.target.value);
    }
});

var JobEntries = React.createClass({

    getInitialState: function () {
        return {entries: []};
    },

    render: function () {

        var props = this.props;
        var rows = this.state.entries
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
                    <th>Meet Date</th>
                    <th>Start Date</th>
                    <th>State</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    },

    componentDidMount: function () {
        dispatcher.dispatch({type: 'all'});
    },

    componentWillMount: function () {
        emitter.on('changed', function (entries) {
            this.setState({entries: entries});
        }.bind(this));
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
            <td>{this.props.data.meetDate}</td>
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
        dispatcher.dispatch({type: 'edit', data: this.props.data});
    },
    deleteJobEntry: function () {
        dispatcher.dispatch({type: 'delete', data: this.props.data});
    }
});

var JobPortal = React.createClass({

    getInitialState: function () {
        return {filterText: ''};
    },

    handleUserInput: function (searchTearm) {
        this.setState({filterText: searchTearm});
    },

    addEntry: function () {
        dispatcher.dispatch({type: 'add'});
    },

    render: function () {
        return <div className="container">
            <HeadLine />
            <SearchFilter onSearch={this.handleUserInput} filterText={this.state.filterText}/>
            <JobEntries filterText={this.state.filterText}/>
            <AddButton addEntry={this.addEntry}/>
            <JobForm />
        </div>
    }
});

var AddButton = React.createClass({
    render: function () {
        return <div className="form-group">
            <button type="button" onClick={this.props.addEntry} className="btn btn-primary pull-right">Add new Job
            </button>
        </div>
    }
});

var JobForm = React.createClass({

    getInitialState: function () {
        return {
            id: null,
            name: '',
            company: '',
            assistant: '',
            salary: 0.0,
            startDate: null,
            meetDate: null,
            state: 'unknown'
        };
    },

    render: function () {
        return <div className="modal fade" tabindex="-1" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">Job data: {this.state.id}</h4>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Job name"
                                   value={this.state.name}
                                   onChange={this.update.bind(null,'name')}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Company"
                                   value={this.state.company}
                                   onChange={this.update.bind(null,'company')}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Assistant"
                                   value={this.state.assistant}
                                   onChange={this.update.bind(null,'assistant')}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="salary"
                                   value={this.state.salary}
                                   onChange={this.update.bind(null,'salary')}/>
                        </div>
                        <div className="form-group">
                            <div className='input-group date' id='datetimepicker_meetDate'>
                                <input type="text" className="form-control" placeholder="Meet Date"
                                       value={this.state.meetDate} onBlur={this.update.bind(null,'meetDate')}
                                       onChange={this.update.bind(null,'meetDate')}/>
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className='input-group date' id='datetimepicker_startDate'>
                                <input type="text" className="form-control" placeholder="Start Date"
                                       value={this.state.startDate} onBlur={this.update.bind(null,'startDate')}
                                       onChange={this.update.bind(null,'startDate')}/>
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <select className="form-control" value={this.state.state}
                                    onChange={this.update.bind(null,'state')}>
                                <option >Probation</option>
                                <option >Interview (Phone)</option>
                                <option >Interview (Present)</option>
                                <option >Unknown</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.cancel}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.save}>Save changes</button>
                    </div>
                </div>
            </div>
        </ div >;
    },

    componentWillMount: function () {

        console.info('listen on on - edit-event ');

        emitter.on('edit', function (data) {
            console.info('on - edit ', data);

            this.setState(data);
            this.show();
        }.bind(this));

        emitter.on('add', function () {
            console.info('on - add ');

            this.reset();
            this.show();
        }.bind(this));
    },

    componentDidMount: function () {
        this.$el = $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.reset.bind);

        emitter.on('changed', function (data) {
            console.info('hide modal form', data);

            this.$el.modal('hide');
        }.bind(this));


        this.$el.find('.date').datetimepicker();
    },

    update: function (propertyName, e) {
        var propertyState = {};
        propertyState[propertyName] = e.target.value;

        this.setState(propertyState);
    },

    save: function (e) {
        dispatcher.dispatch({type: 'save', data: this.state});

        e.preventDefault();

        return false;
    },

    cancel: function (e) {

        e.preventDefault();

        this.reset();

        return false;
    },

    reset: function () {
        this.setState({
            id: null,
            name: '',
            company: '',
            assistant: '',
            salary: 0.0,
            startDate: null,
            meetDate: null,
            state: ''
        });
    },

    show: function () {
        this.$el.modal('show');
    }
});


var JobStore = function () {

    this.entries = [];

    dispatcher.register(function (payload) {
        console.info('on event: ' + payload.type);

        switch (payload.type) {
            case 'add' :
                this.onAdd(payload);
                break;
            case 'edit' :
                this.onEdit(payload);
                break;
            case  'save' :
                this.onSave(payload);
                break;
            case 'delete' :
                this.onDelete(payload);
                break;
            case 'all' :
                this._notify();
                break;
        }
    }.bind(this));

    this.onEdit = function (payload) {
        emitter.emit(payload.type, payload.data);
    };

    this.onAdd = function (payload) {
        emitter.emit(payload.type);
    };

    this.onDelete = function (payload) {

        console.info('delete: ', payload.data);

        this.entries = _.without(this.entries, payload.data);

        this._notify();
    };

    this.onSave = function (payload) {
        console.info('emit event: ', payload.data);

        var data = _.find(this.entries, {id: payload.data.id});

        if (data == null) {

            payload.data.id = this.entries.length ? _.max(this.entries, function (data) {
                return data.id;
            }).id + 1 : 0;

            console.info('create new entry: ', payload.data);

            this.entries.push(payload.data);
        } else {
            _.extend(data, payload.data);

            console.info('update entry: ', data);
        }

        this._notify();
    };

    this._notify = function () {
        console.info('notify: ', this.entries);

        emitter.emit('changed', this.entries);
    };

    this.request = function () {
        $.get('data.json', function (entries) {
            this.entries = entries;
            this._notify();
        }.bind(this));
    };

    this.request();
};

var emitter = new EventEmitter();
var dispatcher = new Flux.Dispatcher();
var jobStore = new JobStore();

ReactDOM.render(
    <JobPortal />
    , document.getElementById('container'));

