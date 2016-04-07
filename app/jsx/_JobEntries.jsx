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
            <div className="table-responsive">
                <table width="100%" className="table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Job name</th>
                        <th>Company</th>
                        <th>Assistant</th>
                        <th>Salary</th>
                        <th>Meet Date</th>
                        <th>State</th>
                        <th>Rating</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
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