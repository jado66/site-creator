import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import ContentEditable from "react-contenteditable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom"
    }
  }
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function EditableLineGraph(props) {
  const [labels, setLabels] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug"
  ]);

  const [title, setTitle] = useState("Title")
  
  const contentEditable = useRef();

  const [datasets, setDatasets] = useState([
    {
      label: "Graph 1",
      tempData: "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
      error: false,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }
  ]);

  const updateFieldChanged = (evt, index) => {
    let newArr = [...datasets]; // copying the old datas array

    let propertyName = evt.target.name;
    let value = evt.target.value;
    // If the value is a list, parse through it

    newArr[index][propertyName] = value; // replace e.target.value with whatever you want to change it to

    if (propertyName === "tempData") {
      try {
        newArr[index].data = JSON.parse(value);
        newArr[index].error = false;
      } catch (error) {
        newArr[index].error = true;
      }
    }

    setDatasets(newArr);
  };

  const addDataSet = () => {
    let newDataSet = {
      label: `Graph ${datasets.length+1}`,
      data: [],
      borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
      backgroundColor: 'black'
    };

    setDatasets([...datasets, newDataSet]);
  };

  const deleteDataSet = (index) => {

    if (datasets.length === 1){
      setDatasets([]);
    }

    if (index == 0){
      setDatasets([...datasets.slice(index+1)]);
    }

    else if (index === datasets.length -1){
      setDatasets([...datasets.slice(0,index)]);
    }

    else{
      setDatasets([...datasets.slice(0,index ),...datasets.slice(index+1)]);
    }

  };

  const data = {
    labels,
    datasets: datasets
  };

  const controls = datasets.map((dataset, index) => {
    return (
      <div className="input-group mb-1">
        <input
          className="form-control"
          value={dataset.label}
          name={"label"}
          onChange={(evt) => {
            updateFieldChanged(evt, index);
          }}
        />
        <input
          className="form-control"
          value={dataset.tempData}
          name={"tempData"}
          onChange={(evt) => {
            updateFieldChanged(evt, index);
          }}
        />
        <input
          className="form-control-color"
          type={"color"}
          value={dataset.borderColor}
          name={"borderColor"}
          onChange={(evt) => {
            updateFieldChanged(evt, index);
          }}
        />
        <input
          type={"color"}
          className="form-control-color"
          value={dataset.backgroundColor}
          name={"backgroundColor"}
          onChange={(evt) => {
            updateFieldChanged(evt, index);
          }}
        />
         <button className="btn " type="button" id="button-addon1" onClick={()=>{deleteDataSet(index)}}><FontAwesomeIcon icon = {faTrashAlt} /></button>
        {/* {dataset.error && <span>Error</span>} */}
      </div>
    );
  });

  return (
    <div className="boxShadow p-3" style={{backgroundColor:props.webStyle.lightShade}}>
      <ContentEditable
        className='apply-font-primary'
        style={{color:props.webStyle.darkShade}}
        spellCheck = "false"
        innerRef={contentEditable}
        html={title} // innerHTML of the editable div
        disabled={!props.webStyle.isEditMode}      // use true to disable editing
        onChange={(evt)=>{setTitle(evt.target.value)}} // handle innerHTML change
        tagName='h3' // Use a custom HTML tag (uses a div by default)
      />
      <Line options={options} data={data} />
      <div >
        <div className="input-group my-3">
          <label className="input-group-text">X Axis Labels</label>
          <input
            className="form-control"
            value={JSON.stringify(labels)}
            onChange={(evt) => {
              setLabels(JSON.parse(evt.target.value));
            }}/>
        </div>
        
        {controls}
        <div className="mt-3">
          <button className="btn btn-light btn-outline-secondary" onClick={addDataSet} >Add Dataset  <FontAwesomeIcon className="ms-2" icon = {faPlus}/></button>
        </div>
      </div>
    </div>
  );
}

