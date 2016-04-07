var JobForm = React.createClass({

    getInitialState: function () {
        return {
            id: null,
            title: 'Java Developer',
            description: 'Java Developer',
            company: '',
            jobHunter: '',
            salary: '65000.00 - 70000.00',
            state: 'REQUEST'
        };
    },
    
    render: function () {

        return <div className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">Job
                            data: {this.state.id ? this.state.title : 'add new Job'}</h4>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Job name"
                                   value={this.state.title}
                                   onChange={this.update.bind(null,'title')}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Job Description"
                                   value={this.state.description}
                                   onChange={this.update.bind(null,'description')}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Job Link"
                                   value={this.state.url}
                                   onChange={this.update.bind(null,'url')}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Company"
                                   value={this.state.company}
                                   onChange={this.update.bind(null,'company')}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Job Hunter"
                                   value={this.state.jobHunter}
                                   onChange={this.update.bind(null,'jobHunter')}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="salary"
                                   value={this.state.salary}
                                   onChange={this.update.bind(null,'salary')}/>
                        </div>
                        <div className="form-group">
                            <SelectBox url='/rest/job/status' value={this.state.state}
                                       onChange={this.update.bind(null,'state')}/>
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
        this.$el = $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.reset);

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
        dispatcher.dispatch({type: 'save-update', data: this.state});

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
            title: 'Java Developer',
            description: 'Java Developer',
            company: '',
            jobHunter: '',
            salary: '65000.00 - 70000.00',
            state: 'REQUEST'
        });
    },

    show: function () {
        this.$el.modal('show');
    }
});