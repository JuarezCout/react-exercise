import CreditStepper from './components/CreditStepper';
import { LimitsProvider } from './context/LimitsContext';

const App = () => {
  return (
    <div>
      <LimitsProvider>
        <CreditStepper />
      </LimitsProvider>
    </div>
  );
};

export default App;
