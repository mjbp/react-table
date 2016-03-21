var React = require('react'),
    Table = require('./Table'),
    Tr = require('./Tr'),
    Thead = require('./Thead'),
    Tbody = require('./Tbody'),
    Th = require('./Th'),
    Td = require('./Td'),
    ThPseudo = require('./ThPseudo'),
    ActionsMenu = require('../actionsMenu/ActionsMenu'),
    AutoCompleteTextInput = require('../autocomplete/AutoCompleteTextInput'),
    DataList = require('react-datalist'),
    TableContainer = React.createClass({
        
        propTypes: {
            rawData: React.PropTypes.array,
            columns: React.PropTypes.array,
            searchableColumns: React.PropTypes.array,
            icons: React.PropTypes.object,
            rowActions: React.PropTypes.element
        },
        
        getInitialState: function() {
            return {
                rawData: [],
                liveData: [],
                suggestions: [],
                sortBy: null,
                filter: null,
                sortDirection: 'asc',
                columns: [],
                searchableColumns: [],
                removedColumns: []
            };
        },
        
        componentDidMount: function() {
            this.setState({
                rawData: this.props.rawData,
                liveData: this.props.rawData,
                columns: this.props.columns,
                searchableColumns: this.props.searchableColumns
            });
        },
        
        sortData: function(facet, direction) {
            var sorted = this.state.liveData.sort(function(a, b){
                return a[facet].localeCompare(b[facet]);
            });
            if(direction === 'asc') { return sorted.reverse(); }
            else { return sorted;}
        },
        
        filterData: function(f) {
            var matchingSuggestions = [],
                matchingData = this.state.rawData.filter(function(datum){
                        return this.state.searchableColumns.filter(function(col){
                            if(~datum[col].toLowerCase().indexOf(f.toLowerCase())) {
                                if(!~matchingSuggestions.indexOf(datum[col])) {
                                    matchingSuggestions.push(datum[col]);
                                }
                                return true;
                            } else {
                                return false;
                            }
                        }.bind(this)).length;
                }.bind(this));
            
            this.setState({
                liveData: matchingData,
                suggestions: matchingSuggestions
            });
        },
        
        handleThClick: function(v, d) {
            var switchedDirection = (this.state.sortDirection === 'asc' ? 'desc' : 'asc');
            this.setState({
                sortBy: v,
                liveData: this.sortData(v, switchedDirection),
                sortDirection: switchedDirection
            });
        },
        
        handleSubmit: function() {
            this.setState({
                suggestions: []
            });
        },
        
        handleFilterChange: function(q) {
            this.filterData(q);
        },
        
        handleDelete: function(col) {
            this.setState({
                removedColumns: this.state.removedColumns.concat([col]),
                columns: this.state.columns.map(function(column){
                    return column.title === col ? {
                        title: column.title,
                        display: false
                    } : column
                })//remove from searchabe columns??
            });
        },
        
        makeSortButtons: function() {
            return this.state.columns.map(function(column, i){
                return !!column.display && <ThPseudo type='nav-actions__link' sortDirection={this.state.sortDirection} active={this.state.sortBy === column.title} onClick={function(e){
                    this.handleThClick(column.title, this.state.sortDirection === 'asc' ? 'desc' : 'asc');
                }.bind(this)} value={column.title.substr(0, 1).toUpperCase() + column.title.substr(1)} key={'col-sort-' + i} />
            }.bind(this));
        },
        
        restoreColumn: function(col) {
            this.setState({
                removedColumns: this.state.removedColumns.filter(function(column){
                    return col !== column;
                }),
                columns: this.state.columns.map(function(column){
                    return column.title === col ? {
                        title: column.title,
                        display: true
                    } : column
                })//remove from searchabe columns??
            });
        },
        
        makeRemovedColumnButtons: function() {
            return this.state.removedColumns.map(function(col, i){
                return <div key={'removed-tag-' + i} className='tag__item' onClick={function(){
                    this.restoreColumn(col);
                }.bind(this)}>
                            <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        {col}
                    </div>
            }.bind(this));
        },
        
        makeColumns: function() {
            return this.state.columns.map(function(column, i){
                return !!column.display && <Th allowDelete={true} sortDirection={this.state.sortDirection} active={this.state.sortBy === column.title} onDelete={this.handleDelete} onClick={this.handleThClick} value={column.title} key={'col-' + i} />
            }.bind(this));
        },
        
        makeRows: function() {
            return this.state.liveData.map(function(row, i){
                return <Tr key={'row-' + i}>
                        {this.state.columns.map(function(column, j){
                                return column.display && <Td key={'row-' + i + '-cell-' + j} sortDirection={this.state.sortDirection} dataTh={column.title}><a className='tr__link' href='/site-inspections/inspection/'>{row[column.title]}</a></Td>
                            }.bind(this))}
                        {this.props.rowActions && <Td className={'td--actions'}>{this.props.rowActions}</Td>}
                    </Tr>
            }.bind(this));
        },
        
        render: function(){
            return <div>{this.state.columns.length && 
                         <div>
                            <div className='dataset'>
                                <form action='#' className='dataset-form'>
                                    <div className='row'>
                                        <div className='fieldset col medium-3 xsmall-12'>
                                            <fieldset className='form-row form-row--radio-set'>
                                                <legend className='legend'>Board</legend>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-board-1'>NHS Ayrshire and Arran</label>
                                                    <input type='radio' id='dataset-board-1' name='dataset-board' value='NHS Ayrshire and Arran' required defaultChecked />
                                                </div>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-board-2'>Board 2</label>
                                                    <input type='radio' id='dataset-board-2' name='dataset-board' value='Board 2' required />
                                                </div>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-board-3'>Board 3</label>
                                                    <input type='radio' id='dataset-board-3' name='dataset-board' value='Board 3' required />
                                                </div>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-board-4'>Board 4</label>
                                                    <input type='radio' id='dataset-board-4' name='dataset-board' value='Board 4' required />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className='fieldset col medium-3 xsmall-12'>
                                            <fieldset className='form-row form-row--radio-set'>
                                                <legend className='legend'>Sector</legend>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-sector-1'>Community</label>
                                                    <input type='radio' id='dataset-sector-1' name='dataset-sector' value='Community' required defaultChecked />
                                                </div>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-sector-2'>Acute - Crosshouse and ACH</label>
                                                    <input type='radio' id='dataset-sector-2' name='dataset-sector' value='Acute - Crosshouse and ACH' required />
                                                </div>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-sector-3'>Acute - Ayr, Biggart, Heathfield</label>
                                                    <input type='radio' id='dataset-sector-3' name='dataset-sector' value='Acute - Ayr, Biggart, Heathfield' required />
                                                </div>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-sector-4'>A&AHB- South Sector Community</label>
                                                    <input type='radio' id='dataset-sector-4' name='dataset-sector' value='A&AHB- South Sector Community' required />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className='fieldset col medium-3 xsmall-12'>
                                            <fieldset className='form-row form-row--radio-set'>
                                                <legend className='legend'>Site</legend>
                                                <DataList className='form-datalist field' list='datalist-site' options={['site one', 'site two', 'site three', 'site four', 'site five', 'site six']} forcePoly={true} placeholder='Find site...' />
                                            </fieldset>
                                            <fieldset className='form-row form-row--radio-set'>
                                                <legend className='legend'>Ward or area</legend>
                                                <DataList className='form-datalist field' list='datalist-ward-area' options={['ward one', 'ward two', 'ward three', 'area one', 'area two', 'area three']} forcePoly={true} placeholder='Find ward or estate...' />
                                            </fieldset>
                                        </div>
                                        <div className='fieldset col medium-3 xsmall-12'>
                                            <fieldset className='form-row form-row--radio-set'>
                                                <legend className='legend'>Question set type</legend>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-type-1'>All</label>
                                                    <input type='radio' id='dataset-type-1' name='dataset-type' value='All' required defaultChecked />
                                                </div>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-type-2'>Hard FM</label>
                                                    <input type='radio' id='dataset-type-2' name='dataset-type' value='Hard FM' required />
                                                </div>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-type-3'>Soft FM</label>
                                                    <input type='radio' id='dataset-type-3' name='dataset-type' value='Soft FM' required />
                                                </div>
                                                <div className='form-row form-row--radio'>
                                                    <label className='label' htmlFor='dataset-type-4'>Other</label>
                                                    <input type='radio' id='dataset-type-4' name='dataset-type' value='Other' required />
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='filter'>
                                <AutoCompleteTextInput 
                                    suggestions={this.state.suggestions}
                                    className='field filter__string'
                                    id='filter'
                                    placeholder='filter'
                                    onValueChange={this.handleFilterChange}
                                    onSubmit={this.handleSubmit}>
                                        <svg className='form-row__inset-icon' fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                                            <title>Filter</title>
                                            <path d='M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z'></path>
                                            <path d='M0 0h24v24H0z' fill='none'></path>
                                        </svg>   
                                </AutoCompleteTextInput>
                                <div className='nav-icons'>
                                    <div className='tooltip__container'>
                                        <button className='btn__print tooltip__trigger'>
                                            <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z'></path><path d='M0 0h24v24H0z' fill='none'></path></svg>
                                        </button>
                                        <div className='tooltip'>Print full report</div>
                                    </div>
                                    <div className='tooltip__container'>
                                        <a href='./add/' className='btn__add tooltip__trigger'>
                                            <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                                                <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'></path>
                                                <path d='M0 0h24v24H0z' fill='none'></path>
                                            </svg>
                                        </a>
                                        <div className='tooltip'>Add new inspection</div>
                                    </div>
                                    <ActionsMenu icon={this.props.icons.sort}>
                                        {this.makeSortButtons()}
                                    </ActionsMenu>
                                </div>
                            </div>
                            {!!this.state.removedColumns.length && 
                            <div className='tag__container'><div className='tags'>
                                <div className='tags__list'>
                                    {this.makeRemovedColumnButtons()}
                                </div>
                            </div></div>}
                            <div className='table__container'>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            {this.makeColumns()}
                                            <Th className='th th--actions' key={'col-actions'}><span className='hidden'>Actions</span></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.makeRows()}
                                    </Tbody>
                                </Table>
                            </div>
                        </div>
                     || null}
                </div> 
        }
        
    });
    
module.exports = TableContainer;