var React = require('react'),
    Thead = React.createClass({
        
        render: function() {
            return <thead className='thead'>
                    {this.props.children}
                </thead>;
        }

    });

module.exports = Thead;
