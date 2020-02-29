import React from 'react';

import {
    Row,
    Col,
    Button,
    Container,
    Card,
    CardBody,
    Modal,
    ModalBody
} from 'shards-react'

function getMonthName(month) {
    const monthNames = ["Enero", "February", "Marzo", "April", "Mayo", "June",
                        "Julio", "Agosto", "September", "October", "Noviembre", "December"];
    return monthNames[month - 1];
}

function getFullDate(date) {
    date = date.split('-');
    const day = date[2];
    const month = date[1];
    const year = date[0];
    const monthName = getMonthName(month);

    return parseInt(day) + ' ' + monthName + ' ' + year;
}

function HolidayDates(dates,todaysDate,passed,viewHoliday) {
    todaysDate = todaysDate.split('-');
    const todaysDay = todaysDate[2];
    const todaysMonth = todaysDate[1];
    const todaysYear = todaysDate[0];

    return dates.map((date,index) => {
        date = date.split('-');
        const day = date[2];
        const month = date[1];
        const year = date[0];

        if(((day > todaysDay) && (month >= todaysMonth)) || (year > todaysYear)) {
            if(passed === true) {
                return undefined
            } else {
                const monthName = getMonthName(month);
                return (
                    <Col key={index} className="date" lg={2} md={3} xs={4} 
                    onClick = {()=> {viewHoliday(index)}}>
                        <Row className="date-day">
                            <Col>{day}</Col>
                        </Row>
                        <Row className="date-month">
                            <Col>{monthName}</Col>
                        </Row>
                    </Col>
                );
            }
        } else {
            if((passed === true) && (day !== todaysDay)) {
                const monthName = getMonthName(month);
                return (
                    <Col key={index} className="date" lg={2} md={3} xs={4}
                    onClick = {()=>{viewHoliday(index)}}>
                        <Row className="date-day">
                            <Col>{day}</Col>
                        </Row>
                        <Row className="date-month">
                            <Col>{monthName}</Col>
                        </Row>
                    </Col>
                );
            } else {
                return undefined;
            }
        }
    })
}

function HolidayCalendar(props) {
    return <div className="holiday-calendar">
			<Modal open={this.state.modalState} toggle={this.toggleModal} size="lg" centered>
				<ModalBody>
					<Row className="heading">
						<Col>
							{getFullDate(this.state.holidayDate)}
						</Col>
					</Row>
					<Row className="name">
						<Col>
							{this.state.holidayName}
						</Col>
					</Row>
					<Row className="type">
						<Col>
							<span className="type-box">
								{this.state.holidayType}
							</span>
						</Col>
					</Row>
					<Row className="description">
						{this.state.holidayDescription}
					</Row>
					<Row className="closemodal">
						<Col>
							<Button onClick={this.toggleModal} theme="success" squared>
								Close / Cerrar
							</Button>
						</Col>
					</Row>
				</ModalBody>
			</Modal>
			<Row className="heading">
				<Col className="heading-text">
					{this.state.name}
				</Col>
			</Row>
			<Row className="controls">
				<Col className="control">
					<Button theme="light" squared active={!this.state.passed} onClick={this.togglePassed}>
						Next Holidays / Próximas Vacaciones
					</Button>
				</Col>
				<Col className="control">
					<Button theme="light" squared active={this.state.passed} onClick={this.togglePassed}>
						Passed Holidays / Feriados Pasados
					</Button>
				</Col>
			</Row>
			<Row className="calendar">
				<Col>
					<Card>
						<CardBody>
							<Container>
								<Row>
									{HolidayDates(this.state.listOfDates, this.state.todaysDate, this.state.passed, this.viewHoliday)}
								</Row>
							</Container>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>;
}

export default HolidayCalendar;