var RatingBox = React.createClass({

    propTypes: {
        rating: React.PropTypes.number.isRequired
    },

    handleRating: function (e) {

        e.stopPropagation();
        e.preventDefault();


        var elem = $(e.target);
        var currentIndex = parseInt(elem.attr('id'));
        var increase = elem.hasClass('glyphicon-star-empty');
        var elements = elem.parent().find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty').toArray();

        if (increase) {
            for (var index = 0; index <= currentIndex; index++) {
                $(elements[index]).addClass('glyphicon-star').removeClass('glyphicon-star-empty');
            }
        } else {
            for (var index = 0; index < currentIndex; index++) {
                $(elements[index]).addClass('glyphicon-star').removeClass('glyphicon-star-empty');
            }
        }

        var rating = increase ? currentIndex + 1 : currentIndex;

        this.props.onChange(rating);

        return false;
    },
    render: function () {
        return <div>
            <span id="0" onClick={this.handleRating}
                  className={this.props.rating > 0 ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}
                  aria-hidden="true"></span>
            <span id="1" onClick={this.handleRating}
                  className={this.props.rating > 1 ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}
                  aria-hidden="true"></span>
            <span id="2" onClick={this.handleRating}
                  className={this.props.rating > 2 ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}
                  aria-hidden="true"></span>
            <span id="3" onClick={this.handleRating}
                  className={this.props.rating > 3 ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}
                  aria-hidden="true"></span>
            <span id="4" onClick={this.handleRating}
                  className={this.props.rating > 4 ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}
                  aria-hidden="true"></span>
        </div>;
    }
});