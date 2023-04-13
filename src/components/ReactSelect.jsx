// multi select component
import { useState, useEffect } from 'react';
import AvatarComponent from './Avatar';

export default function ReactSelect({ dataOptions, setUserData, userData }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [preSelected] = useState(
    userData?.clinicians.map((doctor) => ({
      id: doctor?.id,
      optName: `${doctor?.first_name} ${doctor?.last_name}`,
    })) ?? [],
  );

  useEffect(() => {
    setOptions(dataOptions);
    setSelected([]);
  }, [dataOptions]);

  useEffect(() => {
    const clinicians = preSelected.map((item) => item.id).concat(selected.map((item) => item.id));
    setUserData((prevState) => ({ ...prevState, clinicians }));
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
        {preSelected.map((opt) => (
          <div className="customOptions" role="presentation">
            <AvatarComponent alt={opt.optName} className="opt_avatar" />
            <p className="optName">{opt.optName}</p>
          </div>
        ))}
        {selected.length > 0
          ? selected.map((opt) => (
              <div
                className="customOptions"
                role="presentation"
                onClick={() => handleUnselect(opt)}
              >
                <AvatarComponent alt={opt.optName} className="opt_avatar" />
                <p className="optName">{opt.optName}</p>
              </div>
            ))
          : !preSelected.length && 'Select Clinicians'}
      </div>
      <div className="OptNames">
        {options.length > 0 ? (
          options?.map((opt) => (
            <div className="customOptions" role="presentation" onClick={() => handleSelect(opt)}>
              <AvatarComponent alt={opt.optName} className="opt_avatar" />
              <p className="optName">{opt.optName}</p>
            </div>
          ))
        ) : (
          <p className="notxt">No Clinicians found</p>
        )}
      </div>
    </div>
  );
}
