interface user{
    ID: number;
    NAME: string;
    ITEMSORDERED: number;
    ISORDERING:boolean;
    PHONENUMBER:number;
    CITY:string;
    COUNTRY:string;
}


export const users: user[] = [
{ID: 2324, NAME: "John Persona", ITEMSORDERED: 4, ISORDERING: false, PHONENUMBER: 232565113, CITY: "Chicago", COUNTRY: "USA"},
{ID: 2355, NAME: "Mike Lucero", ITEMSORDERED: 2, ISORDERING: false, PHONENUMBER: 998265113, CITY: "Bordeaux", COUNTRY: "France"},
{ID: 4441, NAME: "Lawrence Wickermann", ITEMSORDERED: 6, ISORDERING: true, PHONENUMBER: 111425521, CITY: "Nanjing", COUNTRY: "China"},
];