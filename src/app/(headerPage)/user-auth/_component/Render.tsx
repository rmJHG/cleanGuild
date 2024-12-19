'use client';
import { useState } from 'react';
import Example from './Example';
import CheckList from './CheckList';
import FindMainChar from './FindMainChar';
import { Char } from '@/types/char';
import SaveImage from './SaveImage';

type Step = 1 | 2 | 3 | 4;
export default function Render() {
  const [pageState, setPageState] = useState<Step>(1);
  const [img, setImg] = useState<File | null>(null);
  const [mainChar, setMainChar] = useState<Char[] | null>(null);
  const [selectedChar, setSelectedChar] = useState<Char | null>(null);
  const renderStep = () => {
    const handleNext = (nextStep: Step) => {
      setPageState(nextStep);
    };

    const handlePrev = (prevStep: Step) => {
      setPageState(prevStep);
    };

    switch (pageState) {
      case 1:
        return <CheckList onNext={() => handleNext(2)} />;
      case 2:
        return <Example onNext={() => handleNext(3)} onPrev={() => handlePrev(1)} />;
      case 3:
        return (
          <FindMainChar
            onPrev={() => handlePrev(2)}
            onNext={() => handleNext(4)}
            setImg={setImg}
            setMainChar={setMainChar}
            img={img}
            mainChar={mainChar}
          />
        );
      case 4:
        return (
          <SaveImage
            onPrev={() => handlePrev(3)}
            img={img}
            mainChar={mainChar}
            setImg={setImg}
            setMainChar={setMainChar}
            setSelectedChar={setSelectedChar}
            selectedChar={selectedChar}
          />
        );
    }
  };
  return <>{renderStep()}</>;
}
