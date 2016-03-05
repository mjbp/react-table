var React = require('react'),
    classNames = require('classnames'),
    Tr = React.createClass({
        
        propTypes: {
            className: React.PropTypes.string,
            onClick: React.PropTypes.func
        },
        
        getDefaultProps: function() {
            return {
                className: ''
            };
        },
        
        handleClick: function() {
            this.props.onClick(this);
        },
        
        render: function() {
            var classlist = classNames('tr', this.props.className);
            return <tr className={classlist} onClick={this.props.onClick}>
                    {this.props.children}
                </tr>;
        }

    });

module.exports = Tr;
