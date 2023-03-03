// multi select component

import { useState, useEffect } from 'react';

// child imports
import AvatarComponent from './Avatar';

export default function ReactSelect({ dataOptions, setUserData, userData }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(
    userData?.clinicians.map((doctor) => {
      return {
        id: doctor?.id,
        optName: `${doctor?.first_name} ${doctor?.last_name}`,
      };
    }) ?? [],
  );

  useEffect(() => {
    setOptions(dataOptions);
  }, [dataOptions]);

  useEffect(() => {
    setUserData((prevState) => ({ ...prevState, clinicians: selected.map((item) => item.id) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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
          : 'Select Clinicians'}
      </div>
      <div className="OptNames">
        {options.length > 0 ? (
          options?.map((opt) => (
            <div className="customOptions" role="presentation" onClick={() => handleSelect(opt)}>
              {/* <img src="" alt="" /> */}
              <AvatarComponent alt={opt.optName} className="opt_avatar" />
              <p className="optName">{opt.optName}</p>
            </div>
          ))
        ) : (
          <p className="notxt"> No Clinicians found</p>
        )}
      </div>
    </div>
  );
}
