import { useEffect, useState } from "react";
import { Button, Space, InputNumber,Modal } from "antd";
import {SettingFilled} from "@ant-design/icons";

function App() {
  const [now, setNow] = useState(new Date());
  const [inputWorking, setInputWorking]=useState(15);
  const [inputShortBreak, setInputBreakTime]=useState(3);
  const [inputLongBreak, setInputLongBreak]=useState(5);
  const [isDisplay, setDisplay] = useState(false);

  const [mode, setMode] = useState("Working");
  const [count, setCount] = useState(inputWorking);

  const [pause, setPause] = useState(true);
  // current time on display
  useEffect(()=>{
    console.log(inputWorking," ",inputShortBreak," ",inputLongBreak )
    
    if(mode === "Working")setCount(inputWorking);
    if(mode === "Short-Break")setCount(inputShortBreak);
    if(mode === "Long-Break")setCount(inputLongBreak);
  },[inputWorking,inputShortBreak, inputLongBreak, mode])

  useEffect(() => {
    setTimeout(() => {
      setNow(new Date());
    }, 1000);
  }, [now]);

  // mode time counting

  useEffect(() => {
      const countDown = setInterval(() => {
        if(!pause){
        if (count > 0) {
          setCount(count - 1);
        } else {
          if (mode === "Working") {
            setCount(inputShortBreak);
            setMode("Short-Break");
            setPause(!pause)
          } else if(mode === "Short-Break"){
            setCount(inputLongBreak);
            setMode("Long-Break");
            setPause(!pause)
          }else{
            setCount(inputWorking);
            setMode("Working");
            setPause(!pause)
          }
        }
      }
      }, 1000);
    return () =>{ clearInterval(countDown)}
  }, [pause, count, inputShortBreak, inputLongBreak,inputWorking, mode]);
  function handleClick(){
    setDisplay(!isDisplay);
  }
  
  const handleCancel = () => {
    setDisplay(false);
  };
  return (
    <div >
    
    <div style={{display:"flex", justifyContent:"center",
    backgroundColor: mode == "Working" ? "pink" : (mode=="Short-Break"?"#c9e9f6":"#80b280"),
    height:'100vh', alignItems:"center" }}>
      <Space
        direction="vertical"
        style={{ alignItems: "center", borderRadius:10,
        backgroundColor: `rgba(240, 240, 240, 0.2)`, height:"30vh",
        position: 'relative'}}
      >
        <Button   type="text" onClick={()=>handleClick()} icon={<SettingFilled />} style={{position: 'absolute', right:0}}/>
        <Space>CURRENT TIME:{now.toLocaleTimeString()}</Space>
        <div >
          <Button style={{ background: "transparent" }} onClick={()=>setMode('Working')}>Pomodoro</Button>
          <Button style={{ background: "transparent" }} onClick={()=>setMode('Short-Break')}> Short Break</Button>
          <Button style={{ background: "transparent" }} onClick={()=>setMode('Long-Break')}>Long Break</Button>
        </div>
        <div style={{ width: 300,height: 'fit-content', fontSize: 50, textAlign: "center" }}>{count}</div>
        <Button
          style={{ background: "transparent", fontSize: 25, height: 'fit-content', color:'black'}}
          onClick={()=>setPause(!pause)}
        >{pause?'START':'PAUSE'}</Button>
        {/* {isDisplay &&<div>
            <InputNumber onChange={(value)=>setInputWorking(value)} value={inputWorking}></InputNumber>
            <InputNumber onChange={(value)=>setInputBreakTime(value)} value={inputShortBreak}></InputNumber>
            <InputNumber onChange={(value)=>setInputLongBreak(value)} value={inputLongBreak}></InputNumber>
        </div>} */}
        <Modal
        open={isDisplay}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={[
        //   <Button key="back" onClick={handleCancel}>
        //     Return
        //   </Button>,
        //   <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
        //     Submit
        //   </Button>,
        //   <Button
        //     key="link"
        //     href="https://google.com"
        //     type="primary"
        //     loading={loading}
        //     onClick={handleOk}
        //   >
        //     Search on Google
        //   </Button>,
        // ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      </Space>
    </div>
    </div>
  )
}

export default App;
