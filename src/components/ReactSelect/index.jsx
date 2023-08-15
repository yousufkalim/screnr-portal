// multi select component
import { useState, useEffect } from 'react';
import AvatarComponent from '../Avatar/Avatar.Component';

export default function ReactSelect({ dataOptions, setUserData, userData, clinicianData }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [preSelected] = useState(
    userData?.clinicians.map((doctor) => ({
      id: doctor?.id,
      optName: `${doctor?.first_name} ${doctor?.last_name}`,
    })) ?? [],
  );

  const temppp = dataOptions.find((item) => {
    return item.id === clinicianData?.id;
  });

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
  useEffect(() => {
    if (temppp) {
      setSelected([temppp]);
      setOptions((prev) => {
        return prev.filter((_) => _.id !== temppp.id);
      });
    }
  }, [temppp]);
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
          : !preSelected.length && 'Select Clinician'}
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
          <p className="notxt">No Clinician found</p>
        )}
      </div>
    </div>
  );
}
