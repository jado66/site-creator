import React, { useState, useEffect,useContext } from 'react'

import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import QuillComponent from "../QuillComponent"

import {WebContext} from "../../App"

export default function PlanComparison (props){
    const [admin, setAdmin] = useState(false)
    const [edit, setEdit] = useState(false)
    const [header, setHeader] = useState("Header")
    const [colNameHtmls, setColNameHtmls] = useState(["Package 1","Package 2","Package 3"])
    const [captionHtml, setCaptionHtml] = useState("* Here is a table caption")
    const [colCount, setColCount] = useState(3)
    const [tempColCount, setTempColCount] = useState(3)
    const [rowGroupCount, setRowGroupCount] = useState(2)
    const [tempRowGroupCount, setTempRowGroupCount] = useState(2)
    const [rowGroups, setRowGroups] = useState([3,4])
    const [tempRowGroups, setTempRowGroups] = useState([3,4])
    
    const contentEditables = [React.createRef(),React.createRef(),React.createRef(),React.createRef()]
    const headerEditable = React.createRef()

    const webContext = useContext(WebContext);

    const captionEditable = React.createRef()
  

  const editColHeader = (evt,colIndex) => {
    const newColHeaders = Object.assign([...colNameHtmls], {
        [colIndex]: evt.target.value
    });
    setColNameHtmls(newColHeaders);
    // localStorage.setItem(this.props.id+'-colNames',JSON.stringify(newColHeaders));
  }

   useEffect(() => {
    if (props.content){
        setColNameHtmls(props.content.colNameHtmls)
        setCaptionHtml(props.content.captionHtml)
        setHeader(props.content.header)
        setColCount(props.content.colCount)
        setTempColCount(props.content.colCount)
        setRowGroupCount(props.content.rowGroupCount)
        setTempRowGroupCount(props.content.rowGroupCount)
        setRowGroups(props.content.rowGroups)
        setTempRowGroups(props.content.rowGroups)
        }
      


    // const storedColNames = JSON.parse(localStorage.getItem(this.props.id+'-colNames'))
    // const storedColCount = localStorage.getItem(this.props.id+'-colCount')
    // const storedRowGroupCount = localStorage.getItem(this.props.id+'-rowGroupCount')
    // const storedRowGroups = JSON.parse(localStorage.getItem(this.props.id+'-rowGroups'))

    // if (storedColNames){
    //     setColNameHtmls(storedColNames)
    // }
    // if (storedColCount){
    //     setColCount(parseInt(storedColCount))
    // }
    // if (storedRowGroupCount){
    //     setRowGroupCount(parseInt(storedRowGroupCount))
    // }
    // if (storedRowGroups){
    //     setRowGroups(storedRowGroups)
    // }

  }, []);

  const saveTableDimensions = () =>{

    // Check Columns
    let newColNames = [...colNameHtmls]

    if (tempColCount > colNameHtmls.length){
        for (var i = 0; i < tempColCount - colNameHtmls.length; i++){
            newColNames.push("New Col")
            contentEditables.push(React.createRef())
        }
    }
    else if (tempColCount < colNameHtmls.length){
        for (var i = 0; i < colNameHtmls.length - tempColCount; i++){
            newColNames.pop()
            contentEditables.pop()
        }
    }
    
    // Check Row Groups
    let newRowGroups = [...rowGroups]

    if (tempRowGroups > rowGroupCount){
        for (var i = 0; i < tempColCount - colNameHtmls.length; i++){
            newColNames.push("New Col")
            contentEditables.push(React.createRef())
        }
    }
    else if (tempColCount < colNameHtmls.length){
        for (var i = 0; i < colNameHtmls.length - tempColCount; i++){
            newColNames.pop()
            contentEditables.pop()
        }
    }

    setColNameHtmls(newColNames)
    setColCount(tempColCount)
    setRowGroupCount(tempRowGroupCount)
    setRowGroups(tempRowGroups)
        
    
        // localStorage.setItem(this.props.id+'-colNames',JSON.stringify(newColNames));
        // localStorage.setItem(this.props.id+'-colCount',colCount);
        // localStorage.setItem(this.props.id+'-rowGroupCount',rowGroupCount);
        // localStorage.setItem(this.props.id+'-rowGroups', JSON.stringify(rowGroups))
  }
  


    let tableHeaders = []
    
    colNameHtmls.forEach((value,i)=>{
        tableHeaders.push(
            <ContentEditable
                style={{width: "18%"}}
                className="text-center font-shrink"
                spellCheck = "false"
                innerRef={contentEditables[i]}
                html={value} // innerHTML of the editable div
                disabled={!webContext.webStyle.isEditMode}       // use true to disable editing
                onChange={(evt)=>{editColHeader(evt,i)}} // handle innerHTML change
                tagName='th'/>
        // <th style={{width: "18%"}}>{value}</th>
        )
    })

    let groups = []

    let k = 0
    for (var i = 0; i < rowGroupCount; i++){
        
        let groupRows = [];

        for (var j = 0; j < rowGroups[i]; j++){
            let newID = props.id+`-g${i},r${j}`
            groupRows.push(
                <PlanComparisonRow webStyle = {webContext.webStyle} content = {props.content.comparisonRowContent[k]} colCount ={colCount} id = {newID} key = {newID}/>
            )
            k++;
        }
        
        groups.push(
            <tbody >
                {groupRows}
            </tbody>
        )
        k++;
    }

    let adminGroupRowInputs = []

    for (var i = 0; i < rowGroupCount; i++){ 
        adminGroupRowInputs.push(
            <input className='form-control' value={rowGroups[i]}/>
        )
    }


    // let tableHeader = [<th style={{width: "18%"}}>Gold</th>,<th style={{width: "18%"}}>Platinum</th>]


    return(
        <div className={(webContext.webStyle.isMobile?" px-2 ":" px-5")} data-no-dnd="true">
            <div className={' boxShadow pt-2 ' } style={{backgroundColor:webContext.webStyle.lightShade}}>
                <ContentEditable
                className='text-center'
                    spellCheck = "false"
                    innerRef={headerEditable}
                    html={header} // innerHTML of the editable div
                    disabled={!webContext.webStyle.isEditMode}       // use true to disable editing
                    onChange={(evt)=>{this.setState({header:evt.target.value})}} // handle innerHTML change
                    tagName='h1'/>
                <div className={edit?"row mb-3":"hidden"}>
                    <div className="col-5">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id=""> Cols & Groups :</span>
                            </div>
                            <input className='form-control' value={tempColCount} onChange={(evt)=>{setTempColCount(evt.target.value)}}/>
                            <input className='form-control' value={tempRowGroupCount} onChange={(evt)=>{setTempRowGroupCount(evt.target.value)}}/>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className='input-group'>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Group Rows:</span>
                            </div>
                            {adminGroupRowInputs}
                            <div className='input-group-append'>
                                <button onClick={saveTableDimensions} className='btn btn-light btn-outline-secondary' >Update</button>
                            </div>
                        </div>
                    </div>
                </div>

                    
                <table className="table table-responsive text-center table-hover borderless" >
                <ContentEditable
                    spellCheck = "false"
                    className={webContext.webStyle.isMobile?" px-2 ":" px-3"}
                    innerRef={captionEditable}
                    html={captionHtml} // innerHTML of the editable div
                    disabled={!webContext.webStyle.isEditMode}       // use true to disable editing
                    onChange={(evt)=>{setCaptionHtml(evt.target.value)}} // handle innerHTML change
                    tagName='caption'/>
                {/* <caption>*All content from shoots, behind-the-scenes, IG lives, extra promtional stories...</caption> */}
                <thead className='relative-div' onMouseEnter={()=>{setAdmin(true)}} onMouseLeave={()=>{setAdmin(false)}}>
                    <tr>
                    <th style={{width: "28%"}}></th>
                    {tableHeaders}
                    </tr>
                    <div className={'relative-l'+((admin || edit) && webContext.webStyle.isEditMode ?"":" hidden")}>
                        <button onClick={()=>{setEdit(!edit)}} className='btn no-back ' >Dimensions <FontAwesomeIcon  icon={edit?faCheck:faPencilAlt}/></button>
                    </div>
                </thead>
                    {groups}
                </table>
            </div>
        </div>
    )
  
}


//           rowComparisons: [
//             {
//               header: "Components",
//               rowChecks: [false, false, false]
//             },
//             {
//               header: "Calender",
//               rowChecks: [true, true, true]
//             },
//             {
//               header: "Email List",
//               rowChecks: [true, true, true]
//             },
//             {
//               header: "Socials Analytics",
//               rowChecks: [false, false, true]
//             },
//             {
//               header: "Modern Web Technology**",
//               rowChecks: [false, false, true]
//             },
//             {
//               header: "Instant Changes",
//               rowChecks: [false, false, true]
//             },
//             {
//               header: "Free To Use ***",
//               rowChecks: [false, false, true]
//             },
//             {
//               header: "Add your own",
//               rowChecks: [false, true, true]
//             }
//           ],
//           caption: `* We don't provide domain names or web hosting (neither are free but it will still cheaper than the alternatives). Go to the "Get Your Own" page to get some pointers.\`+
//                               ** Wix and Wordpress are built using PHP which was created in 1994. We rely primarily on React which was released almost 2 decades later
//                               *** Wix and Wordpress are both "Free to use" but expect to pay for any necessary features.`.replace(
//             /\n +/g,
//             "\n"


function PlanComparisonRow(props){
    const [header, setHeader] = useState(`Feature`);
    const [rowChecks,setRowChecks] = useState([false,false,false,false])
    const contentEditable = React.createRef();

    useEffect(() => {
        // alert("col count changed")
        if (props.colCount > rowChecks.length){
            let newCheckRow = [...rowChecks]
            for (var i = 0; i < props.colCount - rowChecks.length; i++){
                newCheckRow.push(false)
            }
            setRowChecks(newCheckRow)
        }
        else if (props.colCount < rowChecks.length){
            let newCheckRow = [...rowChecks]
            for (var i = 0; i < rowChecks.length - props.colCount; i++){
                newCheckRow.pop()
            }
            setRowChecks(newCheckRow)
        }
      }, [props.colCount]);

      useEffect(() => {

        if (props.content){
            setHeader(props.content.header)
            setRowChecks(props.content.rowChecks)
          }

        // const storedName = localStorage.getItem(props.id+'-name');
        // const storedChecks = JSON.parse(localStorage.getItem(props.id+'-checkRow'))
        
        // if (storedName){
        //     setHeader(storedName)
        // }

        // if (storedChecks){
        //     setRowChecks(storedChecks)
        // }

      }, []);
    

    const handleRowNameChange = (evt) =>{
        setHeader(evt.target.value)
        // localStorage.setItem(props.id+'-name',evt.target.value);
    }

    const checkCol = (colNumber) =>{
        if (!props.webStyle.isEditMode){
            return
        }
        let newCheckRow = [...rowChecks]
        newCheckRow[colNumber] = !newCheckRow[colNumber]
        setRowChecks(newCheckRow)
        // localStorage.setItem(props.id+'-checkRow',JSON.stringify(newCheckRow));

    }

    const columns = rowChecks.map((value,index)  => (
        <td className='p-0 align-middle' key={props.id+`${index}`} onClick={()=>{checkCol(index)}}>{value&&<FontAwesomeIcon size={'xs'} icon={faCheck} />}</td>
    ))

    return(
        <tr>
            <ContentEditable
                className={"text-start font-shrink "+(props.webStyle.isMobile?"ps-2":"ps-4")}
                spellCheck = "false"
                scope = "row"
                innerRef={contentEditable}
                html={header} // innerHTML of the editable div
                disabled={!props.webStyle.isEditMode}       // use true to disable editing
                onChange={handleRowNameChange} // handle innerHTML change
                tagName='th'/>
            {columns}
        </tr>
    )
}



