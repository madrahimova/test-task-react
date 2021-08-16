import React from 'react';
import {Switch, Route} from 'react-router-dom';

import FileDropAreaPage from './components/FileDropAreaPage';
import ParticipantsListPage from './components/ParticipantsListPage';

const Router = () => {
    return(
        <Switch>
            <Route exact path="/" component={FileDropAreaPage}/>
            <Route path="/participants" component={ParticipantsListPage}/>
        </Switch>
    );
}

export default Router;
