import React, {useEffect, useState} from 'react';
import '/src/app.css';
import {useParams} from 'react-router-dom'
import ButtonCustom from "../components/ButtonCustom";
import Loader from "../components/Loader";
import EmployeeView from "./EmployeeView";
import EmployeeEdit from './EmployeeEdit';
import {Button} from "@mui/material";

import {EmployeesCardStore} from '../store/EmployeeCard';
import { observer } from 'mobx-react-lite';

const store = new EmployeesCardStore;

export interface Employee {
    name: string,
    email: string,
    phone: string,
    username: string,
    website: string
}

export default function EmployeeCard() {

    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        store.fetchEmployee()
    }, [])


    const setEmployeeInfo = (param: keyof Employee, value: string) => {
        setEmployee((prev) => ({
            ...prev,
            [param]: value
        }))
    }

    return (
        !store.isLoading ?
            <>
                {store.isEdit ? (
                        <EmployeeEdit
                            email={store.employeeCard.email}
                            name={store.employeeCard.name}
                            phone={store.employeeCard.phone}
                            username={store.employeeCard.username}
                            website={store.employeeCard.website}
                            setEmployeeInfo={setEmployeeInfo}
                        />
                    ) :
                    employee && (
                        <EmployeeView email={store.employeeCard.email}
                                      name={store.employeeCard.name}
                                      phone={store.employeeCard.phone}
                                      username={store.employeeCard.username}
                                      website={store.employeeCard.website}/>
                    )
                }
                <div>
                    <Button variant="contained" disabled={store.isEdit} onClick={store.onclick}>Edit</Button>
                    <Button variant="contained" disabled={!store.isEdit} onClick={store.saveEmployee}>Save</Button>
                </div>
            </> :
            <Loader/>
    )
}
