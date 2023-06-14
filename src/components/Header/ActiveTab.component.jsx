import React from 'react';

function Tab({ activeTab, path, label, IconComponent, handleTabsSwitch }) {
  if (activeTab === path) {
    return (
      <div className="tab2_div">
        <IconComponent className="nav_icons" />
        <span className="nav_icons_txt">{label}</span>
      </div>
    );
  }
  if (label === 'Patient Statics') {
    return <IconComponent className="tab_icon" />;
  }
  return <IconComponent onClick={() => handleTabsSwitch(path)} className="tab_icon" />;
}

export default Tab;
