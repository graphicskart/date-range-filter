import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { DropdownButton } from 'react-bootstrap'
import FastFilter from './FastFilter'
import OutsideClickHandler from 'react-outside-click-handler';
import './index.css'

class DateFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment(),
            isOpen: false
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    getStartDate = () =>{
        let savedStartDate = localStorage.getItem('reportStartDate');
        return savedStartDate ? savedStartDate : this.state.startDate
    }

    getEndDate = () =>{
        let savedEndDate = localStorage.getItem('reportEndDate');
        return savedEndDate ? savedEndDate : this.state.endDate
    }

    handleChangeStart(date, end) {
        let endDate = this.getEndDate()
        if (end) {
            endDate = end
        }
        if (moment(endDate).diff(date, 'days') <= 0) {
            this.setState({ startDate: moment().subtract(1, 'days') })
            //this.props.dispatch(setReportsStartDate(moment().subtract(1, 'days')));
            let formattedStartDate = moment().format('YYYY/MM/DD');
            localStorage.setItem('reportStartDate', formattedStartDate);
        } else {
            this.setState({startDate: date})
            //this.props.dispatch(setReportsStartDate(date));
            let formattedStartDate = date.format('YYYY/MM/DD');
            localStorage.setItem('reportStartDate', formattedStartDate);
        }
     
    }

    handleChangeEnd(date, start) {
        let startDate = this.getStartDate()
        if (start) {
            startDate = start;
        }
        if (moment(startDate).diff(date, 'days') > 0) {
            this.setState({endDate: moment()})
            //this.props.dispatch(setReportsEndDate(moment()));
            let formattedEndDate = moment().format('YYYY/MM/DD');
            localStorage.setItem('reportEndDate', formattedEndDate);
        } else {
          this.setState({endDate: date})
            //this.props.dispatch(setReportsEndDate(date));
            let formattedEndDate = date.format('YYYY/MM/DD');
            localStorage.setItem('reportEndDate', formattedEndDate);
        }
    }

    filterData = (startDate, endDate) => {
      console.log(startDate, endDate)
        //this.props.filterData(startDate, endDate)
    }

    filterDates(start, end) {
        let endDate = end.format('YYYY/MM/DD')
        let startDate = start.format('YYYY/MM/DD')
        this.handleChangeStart(start, endDate)
        this.handleChangeEnd(end, startDate)
        this.filterData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
    }
    openDateSelector = () => {
        let {isOpen} = this.state
        this.setState({isOpen: !isOpen})
    }

    closeDateSelector = () => {
      this.setState({isOpen: false})
    }
  
    goButton =()=> {
        let formattedStartDate = this.getStartDate();
        let formattedEndDate = this.getEndDate();

        this.filterData(formattedStartDate, formattedEndDate);
        this.openDateSelector();
    }

    bindDateFormat(date){
        let isMoment = date instanceof moment;
        if(!isMoment){
            date = moment(date)
        }
        return moment(date).format('DD/MM/YYYY')
    }

    renderFormat(){
      return 'DD/MM/YYYY'
    }

    render() {
     let {isOpen} = this.state
        let dropdownTitle = <div className="date">
            <label className="startEndDate">From: <span className="getDate">{this.bindDateFormat(this.getStartDate())}</span></label>
            <label className="startEndDate">To: <span className="getDate">{this.bindDateFormat(this.getEndDate())}</span></label>

        </div>
        return (
            <div className="report-request indent-after">
            <h4><span>Date Filter</span></h4>
            <OutsideClickHandler
                onOutsideClick={this.closeDateSelector}
            >
                <DropdownButton
                        title={dropdownTitle}
                        id={`dropdown-basic`}
                        noCaret
                        open={isOpen}
                        className="filterDropdown"
                        onClick={() => this.openDateSelector()}
                    >
                        <div>
                            <div className="dateCon">
                                <div className="toDatePicker">
                                    <label>From</label>
                                    <div>
                                    <DatePicker
                                        dateFormat={this.renderFormat()}
                                        onChangeRaw={(e) => e.preventDefault()}
                                        dropdownMode="select"
                                        selected={moment(this.getStartDate())}
                                        selectsStart
                                        startDate={moment(this.getStartDate())}
                                        endDate={moment(this.getEndDate())}
                                        onChange={this.handleChangeStart}
                                    />
                                    </div>
                                </div>
                                <div className="fromDatePicker">
                                    <label>To</label>
                                    <DatePicker
                                        dateFormat={this.renderFormat()}
                                        onChangeRaw={(e) => e.preventDefault()}
                                        dropdownMode="select"
                                        selected={moment(this.getEndDate())}
                                        selectsEnd
                                        startDate={moment(this.getStartDate())}
                                        endDate={moment(this.getEndDate())}
                                        onChange={this.handleChangeEnd}
                                    />
                                </div>
                                <div>
                                    <button className="filterButton" onClick={this.goButton}>Go</button>
                                </div>
                            </div>
                            <FastFilter
                                onClose={this.closeDateSelector}
                                filterDates={this.filterDates.bind(this)}
                            />
                        </div>

                    </DropdownButton>
                </OutsideClickHandler>
            </div>
        );

    }
}


export default(DateFilter)