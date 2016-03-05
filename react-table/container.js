var React = require('react'),
    ReactDOM = require('react-dom'),
    PersonnelContainer = require('./containers/personnel/PersonnelContainer'),
    App = React.createClass({
        
    render: function () {
        return <PersonnelContainer />
      }

});

ReactDOM.render(
    <App />,
    document.getElementById('js-personnel')
);