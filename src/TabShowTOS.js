import React from 'react';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';

import Typography from '@material-ui/core/Typography';
import TabTOS from './TabTOS';
import TabPrivacy from './TabPrivacy';
import { useAuth } from './ProvideAuth';

export default function TabShowTOS(props) {
    const [tab, setTab] = React.useState("TOS");
    const auth = useAuth();
    const tos = auth && auth.user && auth.claims.tos;

    const handleChange = (e, value) => {
        setTab(value);
    };

    const handleSetTOS = (e) => {
        auth.setTOS(e.target.checked);
    };

    return (
        <div>
        <Box mt={3}>
            <Typography>
                You must argee to the Terms of Serice before you 
                may complete your entry.
            </Typography>
            <FormControlLabel 
                control={
                    <Checkbox checked={tos} 
                        onChange={handleSetTOS}
                        name="tos" inputProps={{ 'aria-label': 'TOS' }} />
                } 
                label="I Accept the Terms of Service"
                />
        </Box>
        <TabContext value={tab}>
            <Box>
            <Tabs onChange={handleChange}>
                    <Tab label="Terms of Service" value="TOS" />
                    <Tab label="Privacy Policy"   value="PP" />
                </Tabs>
            </Box>
            <TabPanel value="TOS">
                <TabTOS />
            </TabPanel>
            <TabPanel value="PP">
                <TabPrivacy />
            </TabPanel>
        </TabContext>
        </div>
        
    );
}
