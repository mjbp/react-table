var React = require('react'),
    classNames = require('classnames'),
    Td = React.createClass({
        
        propTypes: {
            className: React.PropTypes.string,
            dataTh: React.PropTypes.string,
            colSpan: React.PropTypes.number,
            style: React.PropTypes.object
        },
        
        getDefaultProps: function() {
            return {
                className: '',
                colSpan: null
            };
        },
        
        render: function() {
            var classlist = classNames('td', this.props.className);
                
            return <td style={this.props.style} colSpan={this.props.colSpan} className={classlist} data-th={this.props.dataTh || null}>
                    {this.props.children}
                </td>;
        }

    });

module.exports = Td;
