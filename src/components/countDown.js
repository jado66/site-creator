import { useEffect, useState, useContext } from "react";

import {WebContext} from "../App"
// const webContext = useContext(WebContext);


const calculateTimeLeft = (date) => {
  let difference = +new Date(date) - +new Date();

  let timeLeft = [];

  if (difference > 0) {
    timeLeft = [
      Math.floor(difference / (1000 * 60 * 60 * 24)),
      Math.floor((difference / (1000 * 60 * 60)) % 24),
      Math.floor((difference / 1000 / 60) % 60),
      Math.floor((difference / 1000) % 60)
    ];
  }

  return timeLeft;
};

export default function CountDown(props) {
  const [date, setDate] = useState(`${new Date().getFullYear()}-02-22`);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));
  const [includes, setIncludes] = useState([true, true]);
  const [edit, setEdit] = useState(false);
  const [timeStyle, setTimeStyle] = useState("Words");
  const [showButtons, setShowButtons] = useState(false);
  const [finalText, setFinalText] = useState("Hip Hip Hooray");

  const webContext = useContext(WebContext);

  // const setContent = (content) =>{
  //   //const \[(.+), .+ use.+
  //   // set$1(content.$1)
  //   setDate(content.date)
  //   setIncludes(content.includes);
  //   setTimeStyle(content.timeStyle)
  //   setFinalText(content.finalText)
  // } 

  // const getContent = () =>{
  //   //const \[(.+), .+ use.+
  //   //content.$1 = $1
  //   let content = {}
  //   content.date = date
  //   content.includes = includes
  //   content.timeStyle = timeStyle
  //   content.finalText = finalText
  //   return content
  // }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (webContext.msgPort == "save"){

      const componentData = { 
        name: props.componentName,
        id: props.id,
        content: {
          date:date,
          timeLeft:timeLeft,
          includes:includes,
          edit:edit,
          timeStyle:timeStyle,
          showButtons:showButtons,
          finalText:finalText
        }
      }

      webContext.saveComponentData(props.pageName,props.index,componentData)
    }
  }, [webContext.msgPort]);


  const formatDateString = () => {
    let timeStr = [];

    switch (timeStyle) {
      case "Words":
        // timeStr = [...timeLeft]
        const units = ["day", "hour", "min", "second"];

        timeLeft.forEach((val, i) => {
          if (val !== 0) {
            timeStr.push(`${val} ${units[i]}${val > 1 ? "s" : ""}`);
          }
        });

        if (!includes[1]) {
          timeStr.pop();
          if (!includes[0]) {
            timeStr.pop();
          }
        }

        if (timeStr.length > 0) {
          timeStr = timeStr.reduce((res, k, i) =>
            [res, k].join(i === timeStr.length - 1 ? ", and " : ", ")
          );
        }

        break;
      case "Colon :":
        timeLeft.forEach((val, i) => {
          if (i === 0) {
            timeStr.push(`${val}`);
          } else {
            timeStr.push(`00${val}`.slice(-2));
          }
        });
        timeStr = timeStr.join(" : ");
        break;
      case "Dash -":
        timeLeft.forEach((val, i) => {
          if (i === 0) {
            timeStr.push(`${val}`);
          } else {
            timeStr.push(`00${val}`.slice(-2));
          }
        });
        timeStr = timeStr.join(" - ");
        break;
      default:
        break;
    }

    return timeStr;
  };

  const timeStr = formatDateString();

  if (edit) {
    return (
    <div className="px-5 ">
      <div className="card rounded-3 boxShadow px-3 pt-3 mt-3 px-5">
        <div className="me-5 pe-3">
          <input
            className="form-control mb-3 "
            type="datetime-local"
            value={date}
            onChange={(evt) => {
              setDate(evt.target.value);
            }}
          />
        </div>

        <div classname="form-check mb-3 text-start ">
          <input
            classname="form-check-input"
            type="checkbox"
            checked={includes[0]}
            onClick={() => {
              setIncludes([!includes[0], !includes[0]]);
            }}
          />
          <label classname="form-check-label ms-2" for="flexCheckDefault">
            Include Minutes
          </label>
        </div>
        <div classname="form-check mb-3 text-start">
          <input
            classname="form-check-input"
            type="checkbox"
            checked={includes[1]}
            onClick={() => {
              if (!includes[0]) {
                setIncludes([!includes[1], !includes[1]]);
              } else {
                setIncludes([includes[0], !includes[1]]);
              }
            }}
          />
          <label classname="form-check-label ms-2" for="flexCheckDefault">
            Include Seconds
          </label>
        </div>

        <div classname="input-group mb-3">
          <label classname="input-group-text" for="inputGroupSelect01">
            Time Style
          </label>
          <select
            classname="form-select"
            id="inputGroupSelect01"
            value={timeStyle}
            onChange={(evt) => {
              setTimeStyle(evt.target.value);
            }}
          >
            <option>Words</option>
            <option>Colon :</option>
            <option>Dash -</option>
          </select>
        </div>

        <div classname="input-group mb-3">
          <span classname="input-group-text">Finished Text</span>
          <input
            type="text"
            classname="form-control"
            value={finalText}
            onChange={(evt) => {
              setFinalText(evt.target.value);
            }}
            placeholder="Hip Hip Hooray"
          />
        </div>

        <div className="position-absolute top-0 end-0 pt-3 pe-2">
          <button
            className="btn mb-3 "
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
    );
  } else {
    return (
        <div className="px-5 " >
      <div
        className="card rounded-3 boxShadow px-3 py-5 position-relative"
        style={{backgroundColor:webContext.webStyle.darkAccent}}
        onMouseEnter={() => {
          setShowButtons(true);
        }}
        onMouseLeave={() => {
          setShowButtons(false);
        }}
      >
        {timeStr.length > 1 && (
          <input
            className="mb-3 h1"
            type="text"
            placeholder={"Website is Currently Under Construction:"}
            value={"Website is Currently Under Construction:"}
            style={{ textAlign: "center", border: "none" ,color:webContext.webStyle.lightShade,background:"none"}}
          />
        )}

        {timeStr.length > 1 ? (
          <span className="mb-3 text-center h2" style={{color:webContext.webStyle.lightShade}}>{timeStr}</span>
        ) : (
          <span>{finalText}</span>
        )}

        {timeStr.length > 1 && (
          <input
          className=" h2"
            type="text"
            value={"until the site launches!"}
            style={{ textAlign: "center", border: "none" ,color:webContext.webStyle.lightShade,background:"none"}}
          />
        )}

        {showButtons && (
          <div className="position-absolute top-0 end-0 p-2">
            <button
              className="btn btn-light"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      </div>
    );
  }
}
