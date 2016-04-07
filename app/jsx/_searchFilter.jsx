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