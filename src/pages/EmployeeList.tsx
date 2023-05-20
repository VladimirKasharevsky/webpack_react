import React, {useEffect, useState} from 'react'
import '/src/app.css';
import {Link} from "react-router-dom";
import Loader from "../components/Loader";
import {List, ListItemText} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import {EmployeesListStore} from '../store/EmoloyeeList';
import { observer } from 'mobx-react-lite';

const store = new EmployeesListStore();

function EmployeeList() {
    useEffect(() => {
        store.fetchEmployees()
    }, [])

    return (
        <>
            {!store.isLoading ? (
                <div>
                    <List component="nav">
                        {store.employees.map((record) => (
                            <ListItem
                                key={record.id}
                                component={Link}
                                to={'/employee/' + record.id}
                            >
                                <ListItemText primary={record.name}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            ) : (
                <Loader/>
            )}
        </>
    );
}

export default observer(EmployeeList);
