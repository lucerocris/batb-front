interface user{
    ID: number;
    NAME: string;
    ITEMSORDERED: number;
    ISORDERING:boolean;
    PHONENUMBER:number;
    CITY:string;
    COUNTRY:string;
}


export const userTableHeaders: {
  id: number;
  KEY: keyof user;
  LABEL: string;
}[] = [
  { id: 1, KEY: "ID", LABEL: "ID" },
  { id: 2, KEY: "NAME", LABEL: "Name" },
  { id: 3, KEY: "ITEMSORDERED", LABEL: "Items Ordered" },
  { id: 4, KEY: "ISORDERING", LABEL: "Currently Ordering" },
  { id: 5, KEY: "PHONENUMBER", LABEL: "Phone Number"},
  { id: 6, KEY: "CITY", LABEL: "City Address"},
  { id: 7, KEY: "COUNTRY", LABEL: "Country of residence"},
];
