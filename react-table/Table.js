var React = require('react'),
    Table = React.createClass({
        
        propTypes: {
            data: React.PropTypes.object,
            columns: React.PropTypes.object
        },
        
        componentDidMount: function() {
        },
        
        handleChange: function(e) {},
        
        render: function() {
            return <table className='table' aria-live='assertive' aria-relevant='additions removals'>
                    {this.props.children}
                </table>;
        }

    });

module.exports = Table;
