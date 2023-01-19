import AvatarComponent from './Avatar';
import AddMore from '../assets/icons/AddMore.svg';

export default function PatientTopSection() {
  const docData = [
    // {
    //   name: 'Dr Sameer',
    //   expert: 'Muscular dystrophy',
    //   actions: 'Created Sabbir’s profile',
    // },
    // {
    //   name: 'Dr Usman Ali',
    //   expert: 'Muscular dystrophy',
    //   actions: 'Created Saleh’s profile',
    // },
    // {
    //   name: 'Dr Sameer',
    //   expert: 'Muscular dystrophy',
    //   actions: 'Created Sabbir’s profile',
    // },
    // {
    //   name: 'Dr Usman Ali',
    //   expert: 'Muscular dystrophy',
    //   actions: 'Created Saleh’s profile',
    // },
    {
      name: 'Dr Sameer',
      expert: 'Muscular dystrophy',
      actions: 'Created Sabbir’s profile',
    },
    {
      name: 'Dr Usman Ali',
      expert: 'Muscular dystrophy',
      actions: 'Created Saleh’s profile',
    },
  ];

  return (
    <div className="PatientTopSection">
      <div className="PatientSubTopSection">
        {docData.map((data) => (
          <div className="topSec">
            <div>
              <AvatarComponent alt={data.name} className="top_sec_avatar" />
            </div>
            <div className="topSecDetails">
              <p className="topSecDocName">{data.name}</p>
              <p className="topSecExpertise">{data.expert}</p>
              <p className="topSecActions">{data.actions}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="addMore">
        Add More <img src={AddMore} alt="" />
      </p>
    </div>
  );
}
