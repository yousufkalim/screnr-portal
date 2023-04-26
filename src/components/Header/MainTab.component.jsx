import React from 'react';
import Stack from '@mui/material/Stack';
import Tab from './ActiveTab.component';

export default function HeaderMainTab({ activeTab, handleTabsSwitch, tabs }) {
  return (
    <Stack direction="row" spacing={6} alignItems="center">
      {tabs?.map(({ path, label, IconComponent }) => (
        <Tab
          key={path}
          activeTab={activeTab}
          path={path}
          label={label}
          IconComponent={IconComponent}
          handleTabsSwitch={handleTabsSwitch}
        />
      ))}
    </Stack>
  );
}
