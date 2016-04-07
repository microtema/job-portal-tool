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
            <AddButton addEntry={this.addEntry} />
            <JobForm />
        </div>
    }
});