{/* <script src="https://apis.google.com/js/platform.js"></script> */}

// var CLIENT_ID = ;
// var API_KEY = 'AIzaSyDHats_HK5c5t1lbkPyHVz2LdqRQSXg3i8';


require('dotenv').config({ path: `../../.env` })
const { google } = require("googleapis");

const { OAuth2 } = google.auth
    

let auth = new google.auth.OAuth2(
    process.env.REACT_APP_CLIENT_ID, //Client ID
    process.env.REACT_APP_CLIENT_SECRET // Client Secret
);


// console.log(JSON.stringify(process.env))

auth.setCredentials({refresh_token:process.env.REACT_APP_REFRESH_TOKEN})

const calendar = google.calendar({version: 'v3', auth});

function listEvents() {
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });
}

function populateAsync(month) {
    return new Promise(function(resolve, reject){

        var days = []
        var date = new Date();
        const y = date.getFullYear();
        const firstDay = new Date(y, month, 1);
        const lastDay = new Date(y, month + 1, 0);
        
        const dayCount = lastDay.getDate()

        let resolveCount = 0

        for (var i = 0; i < lastDay.getDate(); i++){
            days.push(null);
        }

        for (var i = 0; i < dayCount; i++){
            checkIfDayHasEvents(month,i+1).then((result) => {//do something with arr
                // days[i] = result;

                days[result[0]] = result[1]

                // console.log(JSON.stringify(result))

                resolveCount++
                
                if (resolveCount == dayCount){
                    resolve(days)
                }
            });
        }
    })
} 

function getDaysWithEvents(month){

    month = month - 1 //Jan = 0, Feb = 1

    let days = []

    populateAsync(month).then(function(days){//do something with arr
        console.log(JSON.stringify(days))
    });
}

async function checkIfDayHasEvents(month,date){
    return new Promise(function(resolve, reject){
        const eventStartTime = new Date()
        eventStartTime.setMonth(month)
        eventStartTime.setDate(date)
        eventStartTime.setHours(0,0,0,0)
        
        const eventEndTime = new Date()
        eventEndTime.setMonth(month)
        eventEndTime.setDate(date)
        eventEndTime.setHours(23,59,59,999)

        // console.log(eventStartTime)
        // console.log(eventEndTime)

        calendar.freebusy.query({
            resource:{
                timeMin: eventStartTime,
                timeMax: eventEndTime,
                timeZone: 'America/Denver',
                items: [{ id: 'primary'}],
            },
        },
            (err, res)=>{
                if (err) return console.error("Free Busy Query Error: ",reject(err))
        
                // Only detects busy events right now
                const eventsArr = res.data.calendars.primary.busy
        
                if (eventsArr.length > 0){
                    console.log(`Event found on - Date (${date})`)
                }

                resolve([date-1,eventsArr.length > 0]);
            })
        })   
}

function addTestEvent(){
    
    const eventDay = new Date()
    eventDay.setDate(eventDay.getDate() + 2)

    let dateStr = `${eventDay.getFullYear()}-${`0${eventDay.getMonth()+1}`.slice(-2)}-${`0${eventDay.getDate()}`.slice(-2)}`

    console.log(dateStr)
}

getDaysWithEvents(2)