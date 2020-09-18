import React, { useState } from 'react';
import './App.css'

import { Grommet, Box, Button, Grid, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import MainContainer from './MainContainer';

const AppGrid = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <Grommet full theme={grommet}>
      <Grid
        fill
        rows={['auto', 'flex']}
        columns={['auto', 'flex']}
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'sidebar', start: [0, 1], end: [0, 1] },
          { name: 'main', start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box
          gridArea="header"
          direction="row"
          align="center"
          justify="between"
          pad={{ horizontal: 'medium', vertical: 'small' }}
          background="dark-3"
        >
          <Button onClick={() => setSidebar(!sidebar)}>
            <Text size="large"><div className='img_logo'></div></Text>
          </Button>
          <Text>Admin</Text>
        </Box>
        {sidebar && (
          <Box
            gridArea="sidebar"
            background="dark-2"
            width="small"
            animation={[
              { type: 'fadeIn', duration: 300 },
              { type: 'slideRight', size: 'xlarge', duration: 150 },
            ]}
          >
            {['First', 'Second', 'Third'].map(name => (
              <Button key={name} href="#" hoverIndicator>
                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                  <Text>{name}</Text>
                </Box>
              </Button>
            ))}
          </Box>
        )}
        <Box gridArea="main" justify="center" align="center">
          <MainContainer />
        </Box>
      </Grid>
    </Grommet>
  );
};

export default AppGrid