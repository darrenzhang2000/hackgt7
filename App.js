import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LineChart from 'react-linechart';


export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/pie">Pie</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/pie">
            <Pie />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

function Pie() {
  return <div style={{padding:5, backgroundColor:"#fbfbf8", textAlign:'center'}}>

    <h1>Your top 10</h1>
      <PieChart
        data={[
          { title: 'One', value: 10, color: '#E38627' },
          { title: 'Two', value: 15, color: '#C13C37' },
          { title: 'Threes', value: 20, color: '#6A2135' },
        ]}
        animate={true}
        radius={5}
        center={[25,6]}
        viewBoxSize={[50,11]}
      />
      <List>
        <Divider></Divider>
          <ListItem button>
            <ListItemText  style={{textAlign:'center'}}>Target</ListItemText>
          </ListItem>
        <Divider></Divider>
          <ListItem button>
            <ListItemText  style={{textAlign:'center'}}>Amazon</ListItemText>
          </ListItem>
        <Divider></Divider>
          <ListItem button>
            <ListItemText  style={{textAlign:'center'}}>All</ListItemText>
          </ListItem>
        <Divider></Divider>
      </List>

  </div>
}

function Dashboard() {
  const data = [
    {									
        color: "steelblue", 
        points: [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: -3},{x: 9, y: 2},{x: 14, y: 7},{x: 20, y: 14}] 
    }
  ];

  return (
    <div style={{padding:5, backgroundColor:"#fbfbf8", textAlign:'center', margin:30}}>
        <div style={{float:'left'}}>
          <h1>Investments</h1>
          
        </div>

        <div style={{float:'right'}}>
            <h1>NCR Logs</h1>
            <LineChart 
                width={600}
                height={400}
                data={data}
            />
        </div>				
    </div>
  );
}
