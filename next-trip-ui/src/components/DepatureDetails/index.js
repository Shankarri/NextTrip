
import React, { Component } from 'react';

// Importing HTML Elements from Material UI
import { 
        Grid, 
        Card, CardHeader, CardContent,
        Icon, Chip, Avatar,Button,
} from '@material-ui/core';

import * as c from '../../utils/constants';
import './style.css';

class DepartureDetails extends Component {

    state={
        showMore : false,
    }

    render() {

        let { Stop,Departures } = this.props.departuresDetails;

        let { showMore } = this.state;

        return (
                <CardContent>
                    <Grid container
                        direction="row"
                        justify="space-around"
                        alignItems="stretch">

                        <span>Stop {Stop.StopId} : {Stop.Description} </span>
                        
                        <Chip variant="outlined"
                                color="primary" 
                                avatar={<Avatar> <Icon >watch_later</Icon> </Avatar>}
                                label={<h3>{c.convertTimeForDisplay(new Date())}</h3>} 
                        />
                    
                    </Grid>
                    {Departures && Departures.length > 0 ?
                        (Departures.map((departure,index) =>
                        ((!showMore && index <3) || showMore) &&
                        <Card className='departureDetailsCard' key={index}>
                                <CardContent>
                                    <Grid container
                                        direction="row"
                                        justify="space-around"
                                        alignItems="stretch">
                                        <Grid item xs={9}>
                                            <b>{departure.RouteId}{departure.Terminal}</b> {departure.Description}
                                        </Grid>
                                        <Grid item xs={2} align='right'>
                                        
                                        {departure.Actual && departure.Actual === true ?
                                        
                                        <>
                                            <Icon className='wifiSignal' color='primary'>rss_feed</Icon>
                                            <b>{departure.DepartureText}</b>
                                        </>
                                        :
                                        <b>{c.convertTimeForDisplay(new Date(departure.DepartureTime))}</b>
                                        }
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))
                        :
                        <Card className='departureDetailsCard'>
                            <CardContent align='center'>
                                <h3> No Departures at this time</h3>
                            </CardContent>
                        </Card>
                    }
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item xs={8}>
                            {Departures.length >3 && 
                                (showMore ?
                                <Button variant="outlined" onClick={() => this.setState({ showMore: !showMore })}>
                                    <Icon>remove_circle_outline</Icon>
                                    <span> &nbsp; &nbsp;Show less departure times </span>
                                </Button>
                                :
                                <Button variant="outlined" onClick={() => this.setState({ showMore: !showMore })}>
                                    <Icon>add_circle_outline</Icon>
                                    <span> &nbsp; &nbsp;Show more departure times </span>
                                </Button>
                                )
                            }
                        </Grid>
                        <Grid item xs={4}>
                            <h5 align='right'>
                                <Icon className='wifiSignal' color='primary'>rss_feed</Icon> 
                                Real-time departures
                            </h5>
                        </Grid>
                    </Grid>
                    
                </CardContent>
        );
    }
}

export default DepartureDetails;