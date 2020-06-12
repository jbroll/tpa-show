import React from 'react';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import CircularProgress from '@material-ui/core/CircularProgress'
import { Redirect, withRouter } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import TabTOS from './TabTOS';
import TabPrivacy from './TabPrivacy';
import { useAuth } from './ProvideAuth';
import OkButton from './OkButton';

export function TabShowTOS(props) {
    const [tab, setTab] = React.useState("TOS");
    const [waiting, setWaiting] = React.useState(false);
    const auth = useAuth();
    const tos = auth && auth.user && auth.claims.tos;

    const handleChange = (e, value) => {
        setTab(value);
    };

    const handleSetTOS = (e) => {
        setWaiting(true);
        auth.setTOS(e.target.checked).finally(data => {
            setWaiting(false);
        });
    };

    const handleClick = () => {
        props.history.push("/");
    }

    return (
        <div>
        <Box mt={3}>
            <Typography>
                You must argee to the Terms of Serice before you 
                may complete your entry.
            </Typography>
            <Box display="flex">

                <Box flexGrow={1}>
                    <FormControlLabel 
                        control={ waiting ?  <Box padding={1} ><CircularProgress size={25}/></Box>  :
                            <Checkbox checked={tos} 
                                onChange={handleSetTOS}
                                name="tos" inputProps={{ 'aria-label': 'TOS' }} />
                        } 
                        label="I Accept the Terms of Service"
                        />
                </Box>
                <Box mr={2} visibility={tos ? "visible" : "hidden"}>
                    <OkButton onClick={handleClick} />
                </Box>
            </Box>
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

export default withRouter(TabShowTOS);