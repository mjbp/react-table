var React = require('react'),
    classNames = require('classnames'),
    ThPseudo = React.createClass({
        
        propTypes: {
            active: React.PropTypes.bool,
            onClick: React.PropTypes.func,
            className: React.PropTypes.string,
            sortDirection: React.PropTypes.string,
            value: React.PropTypes.string,
            type: React.PropTypes.string,
            allowDelete: React.PropTypes.bool,
            onDelete: React.PropTypes.func
        },
        
        getDefaultProps: function() {
            return {
                type: 'th',
                sortDirection: 'asc',
                className: '',
            };
        },
        
        handleClick: function(e) {
            this.props.onClick(this.props.value, this.props.sortDirection);
        },
        
        deleteClick: function(e) {
            e.stopPropagation();
            this.props.onDelete(this.props.value);
        },
        
        render: function() {
            var classlist = classNames(this.props.className, this.props.type, 'sort--' + this.props.sortDirection, {
                'sort--active': this.props.active,
            });
            
            return <div className={classlist} onClick={this.props.onClick ? this.handleClick : null}>
                    {this.props.value ? this.props.value : this.props.children}
                    {(this.props.allowDelete && this.props.onDelete) && <button className='th-delete' onClick={this.deleteClick}>
                        <svg fill="#FFFFFF" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                            <title>Delete column</title>
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                        </button>}
                </div>;
        }

    });

module.exports = ThPseudo;
