var React = require('react'),
    Tbody = React.createClass({
        
        render: function() {
            return <tbody className='tbody'>
                    {this.props.children}
                </tbody>;
        }

    });

module.exports = Tbody;
