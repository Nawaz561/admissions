/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

const useStyles = {
    table: {
        minWidth: 0,
    },
};

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            admissions: [],
        };
        this.deleteapplication = this.deleteapplication.bind(this);
        this.fetch = this.fetch.bind(this);
    }

    async componentDidMount() {
        this.fetch();
    }

    async fetch() {
        const { data } = await axios.get('http://localhost:5000/admissions');
        this.setState({ admissions: data, isLoading: false });
    }

    async deleteapplication(admissionsId) {
        await axios.delete(`http://localhost:5000/admissions/${admissionsId}`);
        await this.fetch();
    }

    

    render() {
        const { classes } = this.props;
        const { admissions, isLoading } = this.state;

        if (isLoading === true) {
            return <h1>Loading...</h1>;
        }

      
        return (
            
   
    <div className={classes.root}>
      <AppBar position="static"> <Typography variant="h4" >your admission has been submitted</Typography></AppBar>
               
     
                  <TableContainer component={Paper}> 
                    <Table className={classes} aria-label="simple table">
                        
                            <TableRow>
                                
                            </TableRow>
                    
                        <TableBody>
                            {admissions.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="left">{row.code}</TableCell>
                                    <TableCell align="left"> 
                                        <Button 
                                            variant="contained"
                                            onClick={() => this.deleteapplication(row._id)}
                                            color="secondary"
                                        >
                                            Deleteadmission
                                        </Button>
                                      
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> 
              
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(Display));

       