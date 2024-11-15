let users = [
    { "username": "jk", "password": "sala",'token': ' '},
    {"username": "pl", "password": "pass",'token': ' '},

]

let data = [
    { "id": "1", "Firstname": "Jyri", "Surname": "Kemppainen" },
    { "id": "2", "Firstname": "Petri", "Surname": "Laitinen" }
]

const getUsers = ()=>{

    return users
}
const getData =()=>{

    return data
}

export{

    getUsers,
    getData
}