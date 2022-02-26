import { useState, useEffect, useContext } from "react";
import ReactQuill from 'react-quill';
import '../../quill.css';
import { modules, formats } from "../QuillComponent";
import QuillToolbarMini from "../QuillToolbarMini";
import { WebContext } from "../../App";
import sendMailEmailJsDotEnv from "../../functions/browserEmail";

// TODO validate forms

export default function DynamicForm(props) {

  const webContext = useContext(WebContext)

  const [edit, setEdit] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [emailBodyTemplate, setEmailBodyTemplate] = useState("")
  const [emailRecipient, setEmailRecipient] = useState("self")
  const [emailSubject, setEmailSubject] = useState("")
  const [bodyVariables, setBodyVariables] = useState([])
  const [inputs, setInputs] = useState([
    {
      varName: "Name",
      type: "Text",
      placeholder: "John Doe",
      value: "",
      required: true,
      misc: {}
    },
    {
      varName: "Mobile Number",
      type: "Phone",
      value: "",
      placeholder: "(123) - 456 -7890",
      required: true,
      misc: {}
    },
    {
      varName: "Additional Notes",
      type: "Text Area",
      value: "",
      placeholder:
        "Hi, please note I will have to leave 5 minutes early from my appt.",
      required: false,
      misc: {}
    }
  ]);

  const setContent = (content) =>{
    //const \[(.+), .+ use.+
    // set$1(content.$1)
    setEmailBodyTemplate(content.emailBodyTemplate)
    setEmailRecipient(content.emailRecipient)
    setEmailSubject(content.emailSubject)
    setBodyVariables(content.bodyVariables)
    setInputs(content.inputs)
  } 

  const getContent = () =>{
    //const \[(.+), .+ use.+
    //content.$1 = $1
    let content = {}
    content.emailBodyTemplate = emailBodyTemplate
    content.emailRecipient = emailRecipient
    content.emailSubject = emailSubject
    content.bodyVariables = bodyVariables
    content.inputs = inputs
    return (content)
  }

  // Load content
  useEffect(() => {
    if (Object.keys(props.content).length > 0){
      setContent(props.content)
    }
  }, []);

  // Save data
  useEffect(() => {
    if (webContext.msgPort == "save"){
      const componentData = { 
        name: props.componentName,
        id: props.id,
        content: getContent()
      }
      webContext.saveComponentData(props.pageName,props.index,componentData)
    }
  }, [webContext.msgPort]);

  const sendEmail = () =>{
    
    // alert(JSON.stringify(inputs))
    
    let emailTo = ""

    let inputDict = {}
    
    inputs.forEach(input=>{
        inputDict[input.varName] = input.value
    })

    let emailBodySplit = emailBodyTemplate.split(/\{|\}/g)

    if (emailBodySplit.length === 0){
        return
    }

    emailBodySplit = emailBodySplit.filter(val => val != "")
    emailBodySplit = emailBodySplit.map(val => val in inputDict?inputDict[val]:val)

    let emailBody = emailBodySplit.join("")

    switch (emailRecipient){
        case "self":
            emailTo = ["Self"]
            break;
        case "user":
            emailTo = [inputDict["Email"]]
            break;
        case "both":
            emailTo = [inputDict["Email"], "Self"]
            break;
    }

    const emailParams = {
        Subject:emailSubject,
        Body:"<body>"+emailBody+"</body>",
        Recipient:emailTo
    }

    sendMailEmailJsDotEnv(emailParams)
    // alert("Test Email\n"+testEmail)
  }

  const validateEmailVariables = () =>{

    if (!emailBodyTemplate){
        alert("Email doesn't have a body!")
        return false
    }

    let formVariables = inputs.map(input => input.varName);

    // Get all matches of {{}} and then map to get the inner content
    let bodyVariableMatches = emailBodyTemplate.match(/\{\{(\w|\s)+\}\}/g)

    let variablesInBody = [...(bodyVariableMatches?bodyVariableMatches:[])].map(val => val.slice(2,-2))
    setBodyVariables(variablesInBody)

    let unusedFormVariables = formVariables.filter(varName => !variablesInBody.includes(varName));
    let unmatchedBodyVariables = variablesInBody.filter(varName => !formVariables.includes(varName));

    // If we are sending to the user we don't need to include the email in the body
    if (emailRecipient !== "self" && !unusedFormVariables.includes("Email")){
        alert(`The form doesn't ask for the user's email address, yet "Send To ${emailRecipient[0].toUpperCase()+emailRecipient.slice(1)}" is selected.`+
              `\n\nEither change the intended recipient or include an Email input in the form.`)
        return false
    }
    else{
        unusedFormVariables = unusedFormVariables.filter(el => el !== 'Email'); // will return ['A', 'C']
    }

    // We don't have any variables in the form that don't appear in the body. Unincluding the email
    if (!unmatchedBodyVariables.length > 0){

        // Do we have variables in the form that don't appear in the body? We can proceed if so, but it probably isn't intended
        if (unusedFormVariables.length > 1){
            if (window.confirm(`The following variables are used in the email: ${JSON.stringify(unusedFormVariables)}. Would you like to continue?`)){
                return true
            }
            else{
                return false
            }
        }
        else{
            return true
        }
    }
    else{
        alert(`There are variables in the email template body that aren't in the form :${JSON.stringify(unmatchedBodyVariables)}`)
        return false
    }
  }

  const sendTestEmail = () =>{

    if (!validateEmailVariables()){
        return false
    }

    let emailTo = ""

    let inputDict = {}
    
    inputs.forEach(input=>{
        inputDict[input.varName] = input.placeholder
    })

    if (emailBodyTemplate.trim() === ""){
        alert("Email needs a body")
        return false
    }

    let emailBodySplit = emailBodyTemplate.split(/\{|\}/g)

    if (emailBodySplit.length === 0){
        return
    }

    emailBodySplit = emailBodySplit.filter(val => val != "")
    emailBodySplit = emailBodySplit.map(val => val in inputDict?inputDict[val]:val)

    let emailBody = emailBodySplit.join("")

    switch (emailRecipient){
        case "self":
            emailTo = "Self"
            break;
        case "user":
            emailTo = inputDict["Email"]
            break;
        case "both":
            emailTo = inputDict["Email"] + ", user"
            break;
    }

    const testEmail = `To: ${emailTo}\n`+
                      `Subject: ${emailSubject}\n`+
                      `Body: ${"<body>"+emailBody+"</body>"}`

    alert(JSON.stringify(testEmail))
    
  }

  const editStateValue = (index, key, value) => {
    let newInputs = [...inputs];

    newInputs[index][key] = value;

    setInputs(newInputs);
  };

  const editStateValueMisc = (index, key, value) => {
    let newInputs = [...inputs];

    newInputs[index].misc[key] = value;

    setInputs(newInputs);
  };

  const deleteInput = (index) => {
    let newInputs = [...inputs];
    setInputs([...newInputs.slice(0, index - 1), ...newInputs.slice(index)]);
  };

  const addInput = () => {
    setInputs([
      ...inputs,
      {
        varName: "New Input",
        type: "Text",
        placeholder: "Placeholder",
        required: true,
        misc: {}
      }
    ]);
  };

  const readOnlyFormInputs = [];
  const editFormInputs = [];

  inputs.forEach((inputData, i) => {
    let readOnlyInput = null;
    let editInput = null;

    switch (inputData.type) {
      case "Text Area":
        readOnlyInput = (
          <textarea
            className="form-control"
            style={{ minHeight: "90px" }}
            placeholder={inputData.placeholder}
            value={inputData.value}
            onChange={(evt) => {
                editStateValue(i, "value", evt.target.value);
              }}
          ></textarea>
        );
        editInput = (
          <textarea
            className="form-control"
            style={{ minHeight: "90px" }}
            value={inputData.placeholder}
            onChange={(evt) => {
              editStateValue(i, "placeholder", evt.target.value);
            }}
          ></textarea>
        );
        break;
      case "Checkbox": // Checkboxes must include their own inline label
        readOnlyInput = (
          <div classname="form-check">
            <input
                classname="form-check-input"
                type="checkbox"
                defaultChecked={inputData.placeholder}
                value={inputData.value}
                onClick={(evt) => {
                    editStateValue(i, "value", !inputData.value);
                }}
            />
            <label classname="form-check-label ms-2" for="flexCheckDefault">
              {inputData.varName}
            </label>
          </div>
        );
        editInput = (
          <div classname="input-group-text ">
            <input
              classname="form-check-input mt-0 "
              type="checkbox"
              checked={inputData.placeholder}
              onClick={(evt) => {
                editStateValue(i, "placeholder", !inputData.placeholder);
              }}
            />
          </div>
        );
        break;
      case "Radio":
        break;
      case "Select":
        break;
      case "Number":
        let minNum = Object.keys(inputData.misc).includes("min")
          ? inputData.misc.min
          : "";
        let maxNum = Object.keys(inputData.misc).includes("max")
          ? inputData.misc.max
          : "";

        readOnlyInput = [
          <input
            type={inputData.type}
            className="form-control"
            placeholder={inputData.placeholder}
            value={inputData.value}
            onChange={(evt) => {
              editStateValue(i, "value", evt.target.value);
            }}
            min={minNum}
            max={maxNum}
          />
        ];

        editInput = [
          <input
            classname="form-control "
            type="number"
            value={inputData.placeholder}
            onChange={(evt) => {
              editStateValue(i, "placeholder", evt.target.value);
            }}
          />,
          <span classname="input-group-text" id="basic-addon2">
            {inputData.type !== "Checkbox" ? "Min/Max" : "Default State"}
          </span>,
          <input
            classname="form-control flex-grow-0"
            style={{ minWidth: "4em" }}
            type="number"
            value={minNum}
            placeholder="-"
            onChange={(evt) => {
              editStateValueMisc(i, "min", evt.target.value);
            }}
          />,
          <input
            // Hide wheels
            classname="form-control flex-grow-0"
            type="number"
            style={{ minWidth: "4em" }}
            placeholder="-"
            value={maxNum}
            onChange={(evt) => {
              editStateValueMisc(i, "max", evt.target.value);
            }}
          />
        ];
        break;
      case "Range":
        let min = Object.keys(inputData.misc).includes("min")
          ? inputData.misc.min
          : "";
        let max = Object.keys(inputData.misc).includes("max")
          ? inputData.misc.max
          : "";

        readOnlyInput = (
          <div classname="input-group border">
            {/* <input
              type={inputData.type}
              className="form-range"
              placeholder={inputData.placeholder}
              min={min}
              max={max}
            /> */}
            <input
                type="number"
                className="form-control border-0 flex-grow-0"
                style={{ minWidth: "4em" }}
                value={inputData.value}
                onChange={(evt) => {
                    editStateValue(i, "value", evt.target.value);
                    }}
            />
            <input
              type="range"
              className="form-range w-auto my-auto px-3 flex-grow-1"
              value={inputData.value}
              min={min}
              max={max}
              onChange={(evt) => {
                editStateValue(i, "value", evt.target.value);
              }}
            />
          </div>
        );

        editInput = [
          <input
            classname="form-control "
            type="number"
            value={inputData.value}
            onChange={(evt) => {
              editStateValue(i, "placeholder", evt.target.value);
              editStateValue(i, "value", evt.target.value);
            }}
          />,
          <span classname="input-group-text" id="basic-addon2">
            {inputData.type !== "Checkbox" ? "Min/Max" : "Default State"}
          </span>,
          <input
            classname="form-control flex-grow-0"
            style={{ minWidth: "4em" }}
            type="number"
            value={min}
            placeholder="-"
            onChange={(evt) => {
              editStateValueMisc(i, "min", evt.target.value);
            }}
          />,
          <input
            // Hide wheels
            classname="form-control flex-grow-0"
            type="number"
            style={{ minWidth: "4em" }}
            placeholder="-"
            value={max}
            onChange={(evt) => {
              editStateValueMisc(i, "max", evt.target.value);
            }}
          />
        ];
        break;

      default:
        readOnlyInput = (
          <input
            type={inputData.type}
            className="form-control"
            placeholder={inputData.placeholder}
            value={inputData.value}
            onChange={(evt) => {
                editStateValue(i, "value", evt.target.value);
                }}
          />
        );
        editInput = (
          <input
            type={inputData.type}
            className="form-control"
            value={inputData.placeholder}
            onChange={(evt) => {
              editStateValue(i, "placeholder", evt.target.value);
            }}
          />
        );
        break;
    }

    readOnlyFormInputs.push(
      <div className="form-group mb-3">
        {inputData.type !== "Checkbox" && (
          <label classname="form-label">{inputData.varName}</label>
        )}
        {readOnlyInput}
      </div>
    );

    editFormInputs.push(
      <div className="form-group mb-3">
        {/* inputData.type !== "Checkbox" && ( */}

        <input
          type="text"
          classname="form-label border-0 p-0 bg-transparent"
          value={inputData.varName}
          onChange={(evt) => {
            editStateValue(i, "varName", evt.target.value);
          }}
        />
        <div classname="input-group mb-3">
          <span classname="input-group-text" id="basic-addon2">
            {inputData.type !== "Checkbox" ? "Placeholder" : "Default State"}
          </span>
          {editInput}
          {inputData.type === "Checkbox" && <div classname="col border"></div>}

          <select
            classname="btn border-dark text-start"
            value={inputData.type}
            onChange={(evt) => {
              editStateValue(i, "type", evt.target.value);
            }}
          >
            <option>Checkbox</option>
            <option>Date</option>
            <option>Datetime-local</option>
            <option>Email</option>
            <option>Month</option>
            <option>Number</option>
            <option>Phone</option>
            <option>Radio</option>
            <option>Range</option>
            <option>Text</option>
            <option>Text Area</option>
            <option>Select</option>
            <option>Week</option>
          </select>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              deleteInput(i);
            }}
          >
            D
          </button>
        </div>
      </div>
    );
  });

  //  {/* <select classname="form-select" value={input.type}>

  //             </select> */}

  return (
    <div
      className="mb-4 p-3 mt-3 text-start relative-div"
      onMouseEnter={() => {
        setShowButtons(true);
      }}
      onMouseLeave={() => {
        setShowButtons(false);
      }}
    >
      {edit ? (
        <form>
          {editFormInputs}
          <div >
            <button
              type="button"
              classname="btn btn-light btn-outline-dark align-self-middle"
              onClick={() => {
                addInput();
              }}
            >
              Add
            </button>
          </div>

          {props.emailSendor && 
            <div className="mt-3">
                <hr/>
                <h4 className="text-center">Email Template</h4>
                <label classname="form-label">Recipient:</label>
                <div className="input-group form-control mb-3">
                    <input className="my-auto" type="radio" name="recipient" value="self" defaultChecked checked = {emailRecipient === "self"} onClick={()=>{setEmailRecipient("self")}}/>
                    <label className="ms-2" for="recipient">Send To Me</label><br/>
                    <input className="my-auto ms-3" type="radio" name="recipient" value="user" checked = {emailRecipient === "user"} onClick={()=>{setEmailRecipient("user")}}/>
                    <label className="ms-2" for="recipient">Send To User</label><br/> 
                    <input className="my-auto ms-3" type="radio" name="recipient" value="both" checked = {emailRecipient === "both"} onClick={()=>{setEmailRecipient("both")}}/>
                    <label className="ms-2" for="recipient">Send To Both</label><br/>  
                </div>
                <label classname="form-label">Email Subject:</label>
                <input className="form-control mb-3" type="text" value = {emailSubject} onChange={(evt)=>{setEmailSubject(evt.target.value)}} placeholder="Appointment Confirmation: No Reply"/>
                <label classname="form-label">Email Body:</label>
                <div className="form-control mb-3">
                    <QuillToolbarMini className = "mb-3 border-0" />
                    <ReactQuill
                        className={"text-left px-3 "+ props.className}
                        theme="snow"
                        value={emailBodyTemplate}
                        onChange={setEmailBodyTemplate}
                        placeholder={"Dear {{Name}}"}
                        modules={modules}
                        formats={formats}
                    />
                </div>
                <button className="btn btn-light btn-outline-dark" type="button" onClick={()=>{
                    sendTestEmail()
                }}>Test Email</button>
            </div> }
        </form>
      ) : (
        <div>
          <form>
            {readOnlyFormInputs}
            <button className="btn btn-light btn-outline-dark" type="button" onClick={()=>{
                    sendEmail()
                }}>Send Email</button>
          </form>
        </div>
      )}

      {showButtons && (
        <div className="position-absolute top-0 end-0 pt-2 pe-2">
          <button
            className="btn mb-3 "
            onClick={() => {
                if (props.emailSendor && edit){
                    if (validateEmailVariables()){
                        setEdit(!edit);
                    }
                }
                else{
                    setEdit(!edit);

                }
            }}
          >
            {edit ? "Back" : "Edit"}
          </button>
        </div>
      )}
    </div>
  );
}
