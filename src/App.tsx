import { useEffect, useState } from "react";
import CreditStepper from "./components/CreditStepper/CreditStepper";

const App = () => {
  const [limits, setLimits] = useState({})
  const [simulation, setSimulation] = useState({amount: 0, duration: 0})

  useEffect(() => { 
    const fetchLimits = async () => {
      try {
        const response = await fetch('http://localhost:3001/limits')
  
        if(!response.ok){
          throw new Error('Bad request')
        }
  
        const values = await response.json();
        setLimits(values)
  
      } catch (error) {
        throw new Error("Some error ocurred")
      }
    }
    fetchLimits()
  }, [])

  return <div>
  <CreditStepper limits={limits} setSimulation={setSimulation} simulation={simulation} />
  </div>;
};

export default App;
