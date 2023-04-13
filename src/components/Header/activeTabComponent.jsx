import React from 'react';

function Tab({ activeTab, path, label, IconComponent, handleTabsSwitch }) {
  const isActive = activeTab === path;
  const isPatientStats = label === 'Patient Statics';
  if (isActive) {
    return (
      <div className="tab2_div">
        <IconComponent />
        <span>{label}</span>
      </div>
    );
  }
  if (isPatientStats) {
    return <IconComponent className="tab_icon" />;
  }
  return <IconComponent onClick={() => handleTabsSwitch(path)} className="tab_icon" />;
}

export default Tab;
