var SelectBox = React.createClass({

    propTypes: {
        url: React.PropTypes.string.isRequired
    },
    getInitialState: function () {
        return {
            options: []
        }
    },

    getUrl: function () {
        console.info('componentDidMount', this.props.url);

        return endpoint['localhost'][this.props.url]();
    },
    componentDidMount: function () {
        $.ajax({
            url: this.getUrl(),
            success: this.successHandler
        })
    },
    successHandler: function (data) {
        for (var i = 0; i < data.length; i++) {
            var option = data[i];
            this.state.options.push(
                <option key={i} value={option}>{option}</option>
            );
        }
        this.forceUpdate();
    },
    render: function () {
        return <select className="form-control" value={this.props.value} onChange={this.props.onChange}>
            {this.state.options}
        </select>;
    }
});