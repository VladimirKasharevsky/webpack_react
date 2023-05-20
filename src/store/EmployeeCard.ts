import { makeObservable, observable, computed, runInAction } from "mobx"
import {Employee} from "../pages/EmployeeCard";

interface EmployeeInList {
    address: {
        city: string,
        geo: {
            lat: string,
            lng: string,
        }
        street: string,
        suite: string,
        zipcode: string,
    },
    company: {
        bs: string,
        catchPhrase: string,
        name: string,
    }
    email: string,
    id: number,
    name: string,
    phone: string,
    username: string,
    website: string,
}

export class EmployeesCardStore {
    employeeCard: EmployeeInList;
    id: string;
    isLoading: boolean;
    isEdit: boolean;

    constructor() {
        makeObservable(this, {
            employeeCard: observable,
            isLoading: observable,
            isEdit:observable
        })
    }

    fetchEmployee = async () => {
        runInAction(() => {
            this.isLoading = true;
            this.isEdit = true;
            this.id  = id;
        })

        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + id)
        const data: EmployeeInList = await response.json()

        runInAction(() => {
            this.employeeCard = data;
            this.isLoading = false;
            this.isEdit = false;
        })
    }

    saveEmployee = async () => {
        this.isLoading = true;
        const request = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.employeeCard)
        };
        fetch('https://jsonplaceholder.typicode.com/users/' + id, request)
            .then(response => response.json())
            .then(json => {
                this.employeeCard = json;
                this.isLoading = false;
                this.isEdit = false;
            });
    }

    onclick = () => {
       this.isEdit = true;
    }
}
