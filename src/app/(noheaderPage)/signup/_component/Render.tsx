import { useState } from 'react';
import TermCondition from './TermCondition';
import SignUp from './Signup';

export default function Render() {
  const [pageState, setPageState] = useState<number>(1);

  const renderStep = () => {
    const handleNext = (nextStep: number) => {
      console.log(pageState);
      setPageState(nextStep);
    };

    const handlePrev = (prevStep: number) => {
      setPageState(prevStep);
    };

    switch (pageState) {
      case 1:
        return <TermCondition onNext={handleNext} />;
      case 2:
        return <SignUp onPrev={(n) => handlePrev(n)} />;
    }
  };

  return <>{renderStep()}</>;
}
