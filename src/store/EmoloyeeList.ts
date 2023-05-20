import { makeObservable, observable, computed, runInAction } from "mobx"

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

export class EmployeesListStore {
    employees: EmployeeInList[] = [];
    isLoading: boolean;

    constructor() {
        makeObservable(this, {
            employees: observable,
            isLoading: observable,
            totalEmployees: computed,
        })
    }

    fetchEmployees = async () => {
        runInAction(() => {
            this.isLoading = true;
        })

        const response = await fetch('https://jsonplaceholder.typicode.com/users/')
        const data: EmployeeInList[] = await response.json()

        runInAction(() => {
            this.employees = data;
            this.isLoading = false;
        })
    }

    get totalEmployees() {
        return this.employees.length;
    }
}
