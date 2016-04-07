var AddButton = React.createClass({
    render: function () {
        return <div className="form-group">
            <button type="button" onClick={this.props.addEntry} className="btn btn-primary pull-right">Add new Job
            </button>
        </div>
    }
});