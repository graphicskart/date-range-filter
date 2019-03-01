import React, { Component } from 'react';
import moment from 'moment';


const fields = ['Current Month', 'Previous Month', 'Current Year', 'Previous Year'];
class FastFilter extends Component {
    constructor() {
        super();
        this.state = {
            value: 'Select Month',
        }
    }
    dateChange(item) {
        this.setState({
            value: item,
        })
        let startDate, endDate;
        switch (item) {
            case 'Current Month':
                startDate = moment().startOf('month')
                endDate = moment().endOf('month')
                break;
            case 'Previous Month':
                let previousMonth = moment().subtract(1, 'month').format('MM/DD/YYYY')
                startDate = moment(previousMonth).startOf('month')
                endDate = moment(previousMonth).endOf('month')
                break;
            case 'Current Year':
                startDate = moment().startOf('year')
                endDate = moment().endOf('year')
                break;
            case 'Previous Year':
                let firstDateOfYear = moment().startOf('year').format('MM/DD/YYYY')
                let lastDateOfYear = moment().endOf('year').format('MM/DD/YYYY')
                startDate = moment(firstDateOfYear).subtract(1, 'year')
                endDate = moment(lastDateOfYear).subtract(1, 'year')
                break;
        }
        this.props.filterDates(startDate, endDate)
        this.props.onClose()

    }

    render() {
        const { value } = this.state;
        return (
            <div> 
                <ul className="listFilters"  >
                    {fields.map((item, index)=>{
                    return <li  className={this.state.value == item && 'active'} key={index} value={value} onClick={this.dateChange.bind(this,item)}>{item}</li>
                    })}
                </ul>
            </div>
        )}
}
export default (FastFilter)