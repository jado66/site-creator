import { useState, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import sendMailEmailJsDotEnv from '../../functions/browserEmail'
// import getEvents from '../functions/googleCalendarAPI'
import {WebContext} from "../../App"

export default function Appointments(props) {
    const { webStyle } = useContext(WebContext);
    
    const [edit, setEdit] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [date, setDate] = useState(new Date());
    const [daysWithEvents, setDaysWithEvents] = useState(
        [false,false,false,false,false,true,false,false,true,false,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    )
    const [dayAppts, setDayAppts] = useState([
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm"
  ]);
  const [takenDayTimes, setTakenDayTimes] = useState([
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "4:00 pm",
    "5:00 pm"
  ]);

  

  const getDaysWithEvents = ()=>{
      // Get from API
    //   alert("New month")

      let days = []

      for (i = 0; i < 31; i++){
          days.push(Math.random()>.8)
      }

      setDaysWithEvents(days)
  }

  const getDayEvents = () =>{
    // getEvents();
    // alert("Get Events")
    let dayEvents = []

    for (var i = 7; i <= 12; i++){
        if (Math.random()>.4){
            dayEvents.push(`${i}:00 `+(i != 12?"am":"pm"))
        }
    }

    for (var i = 1; i <= 8; i++){
        if (Math.random()>.4){
            dayEvents.push(`${i}:00 pm`)
        }
    }

    setDayAppts(dayEvents)


  }

  const changeDate = (e) => {
    setDate(e);
    getDayEvents(e);
    // Get day appts
  };

  let datApptPerCol = dayAppts.length / 3;

  let dayAppColumns = [];

  var k = 0;
  for (var i = 0; i < 3; i++) {
    let columnApps = [];

    for (var j = 0; j < datApptPerCol; j++) {
      if (k > dayAppts.length - 1) {
        break;
      }

      let taken = takenDayTimes.includes(dayAppts[k]);

      columnApps.push(
        <span
          key={`${date}-${i}-${j}`}
          className={
            "row mb-3 mx-2 justify-content-center rounded-pill px-1 py-1  " +
            (taken ? "bg-light border border-dark " : "bg-info fw-bold")
          }
        >
          {dayAppts[k]}
        </span>
      );
      k++;
    }
    dayAppColumns.push(
      <div className="col mt-2" key={`${date}-${i}`}>
        {columnApps}
      </div>
    );
  }

  return (
    <div className="px-5 mb-3">
        <div
        className="card mb-4 rounded-3 p-3 mt-3 boxShadow"
        style={{backgroundColor:webStyle.lightShade}}
        onMouseEnter={() => {
            setShowButtons(true);
        }}
        onMouseLeave={() => {
            setShowButtons(false);
        }}
        >
        <span className="mb-3">Appointments</span>
        {edit ? (
            <form>
                <button type="button" onClick={getDayEvents}>Test</button>
            <hr />
            <label className="form-label text-start ms-2">
                Google Calendar Integration Info
            </label>

            <div className="input-group mb-3">
                <span className="input-group-text">Google API Token</span>
                <input type="text" className="form-control" placeholder="Token" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Google Calendar ID</span>
                <input type="text" className="form-control" placeholder="Token" />
            </div>
            <hr />
            <label className="form-label text-start ms-2">
                Dedicated Email Athentication
            </label>
            <div className="input-group mb-3">
                <span className="input-group-text">User (From Email)</span>
                <input type="text" className="form-control" placeholder="User" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input type="password" className="form-control" />
            </div>
            <hr />
            <label className="form-label text-start ms-2">
                Confirmation Email Subject
            </label>
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Appointment Confirmed on {{date}}"
                />
            </div>
            <label className="form-label text-start ms-2">
                Confirmation Email Body
            </label>
            <div className="input-group mb-3">
                <textarea
                className="form-control"
                style={{ minHeight: "100px" }}
                placeholder={
                    "Dear {{name}},\n\nYou have been booked for an appointment at our place at {{time}} on the {{date}}. Please arrive 15 mins early..."
                }
                ></textarea>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-text">
                <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                />
                </div>
                <span className="input-group-text">Email Copy To:</span>
                <input
                type="text"
                className="form-control"
                placeholder={"MyEmail@Business.com"}
                />
            </div>
            <button
                onClick={() => {
                setEdit(!edit);
                }}
                className="btn btn-outline-secondary text-dark"
            >
                Update
            </button>
            </form>
        ) : (
            <div>
            <div className="row g-0 border border-dark mb-3 pb-3" style={{backgroundColor:"white"}}>
                <div className="col-6 g-0 border-end">
                <Calendar
                    className="border-0  mx-auto"
                    // maxDetail="month"
                   
                    onActiveStartDateChange={({ action}) => {
                        if (action === "next" || action === "prev"){
                            getDaysWithEvents()
                        }
                    }}
                    showNeighboringMonth = {false}
                    tileDisabled = {({ date, view }) => view === "month"?daysWithEvents[date.getDate()-1]:false}
                    value={date}
                    // onClickDay = {()=>{alert("Day Click")}}
                    onClickMonth = {()=>{getDaysWithEvents()}}
                    // showNavigation = "false"
                    // onDrillUp = {()=>alert("drill up")}
                    prev2Label = {null}
                    next2Label = {null}
                    onChange = {changeDate}
                    // showNavigation = {false}
                    // onChange={changeDate}
                />
                </div>

                <div className="col-6 g-0 px-2">
                <div className="row g-0 my-auto h-100 align-content-start">
                    <h6 className="mb-4 mt-2 text-center">Times</h6>
                    {dayAppColumns}
                </div>
                </div>
            </div>
            <form>
                <p className="mb-3 px-3">
                After selecting an appointment please enter your information and
                then you will be directed to a checkout page where you can comfirm
                your appointment.
                </p>
                <div className="form-group mb-3">
                <label for="formGroupExampleInput">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="John Doe"
                />
                </div>
                <div className="form-group mb-3">
                <label for="formGroupExampleInput2">Mobile Number</label>
                <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="(123) - 456 - 7890"
                />
                </div>
                <div className="form-group mb-3">
                <label for="formGroupExampleInput2">Additional Notes</label>
                <textarea
                    className="form-control"
                    style={{ minHeight: "90px" }}
                    placeholder={
                    "Hi, please note I will have to leave 5 minutes early from my appt."
                    }
                ></textarea>
                </div>
                <button type="button" className="btn btn-light btn-outline-dark"
                    onClick={()=>{
                        sendMailEmailJsDotEnv()
                    }}>
                Continue
                </button>
            </form>
            </div>
        )}
        {showButtons && (
            <div className="position-absolute top-0 end-0 pt-2 pe-2">
            <button
                className="btn mb-3 "
                onClick={() => {
                setEdit(!edit);
                }}
            >
                {edit ? "Back" : "Edit"}
            </button>
            </div>
        )}
        </div>
    </div>
  );
}
