// multi select component

import { useState } from 'react';
import AvatarComponent from './Avatar';

export default function ReactSelect() {
  const [options, setOptions] = useState([
    { id: '1', optName: 'Arooj Ishfaq' },
    { id: '2', optName: 'Jenney Resputin' },
  ]);
  const [selected, setSelected] = useState([]);

  const handleSelect = (opt) => {
    setSelected([...selected, opt]);
    setOptions((prev) => {
      return prev.filter((_) => _.id !== opt.id);
    });
  };
  const handleUnselect = (opt) => {
    setSelected((prev) => {
      return prev.filter((_) => _.id !== opt.id);
    });
    setOptions([...options, opt]);
  };

  return (
    <div>
      <div className="customSelect">
        {selected.length > 0
          ? selected.map((opt) => (
              <div
                className="customOptions"
                role="presentation"
                onClick={() => handleUnselect(opt)}
              >
                {/* <img src="" alt="" /> */}
                <AvatarComponent alt={opt.optName} className="opt_avatar" />
                <p className="optName">{opt.optName}</p>
              </div>
            ))
          : 'Select Clinic'}
      </div>
      <div className="OptNames">
        {options.map((opt) => (
          <div className="customOptions" role="presentation" onClick={() => handleSelect(opt)}>
            {/* <img src="" alt="" /> */}
            <AvatarComponent alt={opt.optName} className="opt_avatar" />
            <p className="optName">{opt.optName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
