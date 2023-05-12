import React from 'react';

function Tab({ activeTab, path, label, IconComponent, handleTabsSwitch }) {
  if (activeTab === path) {
    return (
      <div className="tab2_div">
        <IconComponent />
        <span>{label}</span>
      </div>
    );
  }
  if (label === 'Patient Statics') {
    return <IconComponent className="tab_icon" />;
  }
  return <IconComponent onClick={() => handleTabsSwitch(path)} className="tab_icon" />;
}

export default Tab;
