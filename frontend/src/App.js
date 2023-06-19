import './App.css';
import { useState } from 'react';
import Dgraph from './Dgraph';
function App() {
  const [mainPercentage, setMainPercentage] = useState(0);
  const [moreClass, setMoreClass] = useState(0);
  const [classEntered, setClassEntered] = useState("");
  const [classTotal, setClassTotal] = useState("");
  const [percentage, setPercentage] = useState(75);
  const [cutPercentage, setCutPercentage] = useState(0);
  const [showCut,setShowCut] = useState(false);
  const [toCut, setToCut] = useState("");
  const [posiblCut,setPosiblCut] = useState(0);
  return (
    <div className="App">
      <div className='main'>
        <header className="classRatioHeader">CLASS RATIO : </header>
        <div className='classRatio'>
          <input className='inputBox'  value={classEntered} onFocus={()=>setClassEntered("")} onChange={(e)=>setClassEntered(isNaN(+e.target.value)?0:+e.target.value)}></input>
          <h1 className='slash'>/</h1>
          <input className='inputBox'  value={classTotal} onFocus={()=>setClassTotal("")} onChange={(e)=>setClassTotal(isNaN(+e.target.value)?0:+e.target.value)}></input>
        </div>
        <div className='targetPercentage'>
          <p>TARGET :</p>
          <input  className='inputBox' value={percentage} onFocus={()=>setPercentage("")} onChange={(e)=>setPercentage(isNaN(+e.target.value)?0:+e.target.value)}></input>
          <p>%</p>
        </div>

        <button className='buttons' onClick={()=>
          {
            setMainPercentage(Math.round(100*classEntered/classTotal));
            (Math.ceil((100*classEntered-percentage*classTotal)/(percentage-100)))>=0?setMoreClass(Math.ceil((100*classEntered-percentage*classTotal)/(percentage-100))):setMoreClass(0);
            ((100*classEntered-classTotal*percentage)/percentage)>=0?setPosiblCut(Math.floor((100*classEntered-classTotal*percentage)/percentage)):setPosiblCut(0)
          }  
        }
        >calculate</button>
      <div className='answerDiv'>
        <div className='mainPercentage'>

          {mainPercentage>=percentage?<Dgraph colour={"green"} percentage={mainPercentage} width={100}/>:<Dgraph colour={"red"} percentage={mainPercentage} width={100}/>}
        </div>
        <div className='feedbackText'>
          <p>ENTER {moreClass} CLASSES</p>  
          <p>CUT {posiblCut} CLASSES</p>
        </div>
        </div>
          <button className='buttons'onClick={()=>setShowCut(!showCut)}>cut class</button>
          {showCut &&
            <input className='inputBox' value={toCut} onFocus={()=>setToCut("")} onChange={(e)=>setToCut(isNaN(+e.target.value)?0:+e.target.value)}></input>
          }
          {showCut &&
            <button className='buttons' onClick={()=>setCutPercentage(Math.round(100*classEntered/(classTotal+toCut)))}>cut percentage</button>
          }
          {showCut && <p className='atndWilBec'>Attendance will become</p>}
          {cutPercentage>={mainPercentage}?showCut && <Dgraph colour={"green"} percentage={cutPercentage} width={100}/>:showCut && <Dgraph colour={"red"} percentage={cutPercentage} width={100}/>}
      </div>
    </div>
  );
}
export default App;
