var JobEntry = React.createClass({
    render: function () {
        return <tr onClick={this.editJobEntry} className={this.props.data.state == 'PROBATION' ? 'active' : 'info'}>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.title}</td>
            <td>{this.props.data.company}</td>
            <td>{this.props.data.jobHunter ? this.props.data.jobHunter : '---'}</td>
            <td>{this.props.data.salary}</td>
            <td>{this.props.data.meetDate ? this.props.data.meetDate : '---'}</td>
            <td>{this.props.data.state}</td>
            <td><RatingBox rating={this.props.data.favorite} onChange={this.handleFavorite}/>
            </td>
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

    handleFavorite: function (favorite) {
        this.props.data.favorite = favorite;
        dispatcher.dispatch({type: 'save-update', data: this.props.data});
    },

    deleteJobEntry: function (e) {

        dispatcher.dispatch({type: 'delete', data: this.props.data});

        e.stopPropagation();
        e.preventDefault();

        return false;
    }
});