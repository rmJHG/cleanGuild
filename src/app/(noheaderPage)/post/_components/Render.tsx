import { useState } from 'react';
import GuildInfo from './GuildInfo';
import LimitedInfo from './LimitedInfo';
import ContactInfo from './ContactInfo';
import PostContent from './PostContent';
import classes from './_styles/render.module.css';

type Step = 1 | 2 | 3 | 4;

export default function Render({ guildData }: { guildData: GuildData }) {
  const [pageState, setPageState] = useState<Step>(1);

  console.log(guildData, 'guildData');

  const currentNoblePoint: number = guildData!.guild_noblesse_skill.reduce((a, b) => {
    return a + b.skill_level;
  }, 0);
  const renderStep = () => {
    const handleNext = (nextStep: Step) => {
      setPageState(nextStep);
    };

    const handlePrev = (prevStep: Step) => {
      setPageState(prevStep);
    };
    switch (pageState) {
      case 1:
        return (
          <GuildInfo guildData={{ ...guildData, currentNoblePoint }} onNext={() => handleNext(2)} />
        );
      case 2:
        return <LimitedInfo onNext={() => handleNext(3)} onPrev={() => handlePrev(1)} />;
      case 3:
        return (
          <ContactInfo
            onNext={() => handleNext(4)}
            onPrev={() => handlePrev(2)}
            guildMember={guildData.guild_member}
            guildMasterName={guildData.guild_master_name}
          />
        );
      case 4:
        return (
          <PostContent
            guildData={{ ...guildData, currentNoblePoint }}
            onPrev={() => handlePrev(3)}
          />
        );
    }
  };

  return <div className={classes.container}>{renderStep()}</div>;
}
