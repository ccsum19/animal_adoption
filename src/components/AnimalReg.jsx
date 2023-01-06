import './AnimalReg.css';
import {useState, useContext} from 'react';
import {myPetsContext} from './myPetsContext.js'

function AnimalReg() {
  
  const myPets = useContext(myPetsContext);
  
  var [count, setCount] = useState(0);
  var pets = [];
  var pet = {};
  async function handRegistration(e) {
    e.preventDefault();
    const form = e.target;
    pet = {
      username: "",
      name: form[0].value,
      description: form[1].value,
      notes: "",
    }
    
    await fetch("/getusername", {
        method: "POST",
        headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      })
      .then(res =>res.json())
      .then(data => pet.username = data.username);
      console.log(pet);
    fetch("/addpet", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
      body: JSON.stringify(pet)
     })
      .then(res =>res.json())
      .then(data =>{
        if(data.petAdded) {
          addToMyPets(count, pet.name, pet.description, pet.notes);
        }
      });
  }
    
  function Intro () {
     return( <div className="AnimalRef" id="register-intro">
        <h2> Hello! </h2>
        <p> To aid in the process of our supervised introduction and/or applying for adoption, you can upload information in the form below about any pets you may have.</p>
      </div>);
  }
  
  
  function petContainer(num, name, desc, notes) {
    return (
      <div className="PetContainer" id={num}>
        <h3> {name} </h3>
        <p> Description: {desc} </p>
        <p> Notes: {notes} </p>
        
        <form action="/" className="edit">
          <input type="submit" value="Edit"/>
        </form>
        <form action="/" className="delete">
          <input type="submit" value="Delete"/>
        </form>
      </div>
      );
  }
  
  function addToMyPets(num, name, desc, notes) {
    myPets.list.push(petContainer(num, name, desc, notes));
    setCount(count + 1);
  }
  
  function Mypets() {
    console.log(myPets.list.length);
    if(myPets.list.length === 0) {
      fetch("/getusername", {
          method: "POST",
          headers: {
          "Content-type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        })
        .then(res =>res.json())
        .then(data => pet.username = data.username);
        console.log(pet);
        fetch("/getpets", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
        body: JSON.stringify(pet)
       })
        .then(res =>res.json())
        .then(data => pets = data.pets);
        
        console.log(pets)
        for(let i = 0; i < pets.length; i++) {
          addToMyPets(i, pets[i].name, pets[i].description, pets[i].notes);
        };
    }
    console.log(myPets.list.length);
  if(myPets.list.lentgth ===0) {
    return (
    <div id="my-pets">
      <h2> My Pets </h2>
      <p> No pets </p>
    </div>);
    }
    
    console.log(myPets.list);
    return (
    <div id="my-pets">
      <h2> My Pets </h2>
      <div className="Pets"> {myPets.list} </div>
    </div>
      
    );
  }
  
  function Registration() {
     return(
      <div className="AnimalReg" id="register-form">
        <h1>Register Pet</h1>
        <form onSubmit={event => handRegistration(event)}>
                
          <label htmlFor="name"><b>Name</b></label>
          <input typr="text" placeholder="Add Name" name="name" id="name" required/>
          <br/>
          <label htmlFor="description"><b>Description</b></label>
          <input type="text" placeholder="Add Description" name="descritption" id="description" required/>
          <br/>
          <input type="submit" className="submit-pet" value="Add Pet"/>
                
        </form>
      </div>);
  }
    return (
      <div className="AnimalRef" id="animal-reg-container">
        <Intro/>
        <Mypets/>
        <Registration/>
      </div>
      );
  }

export default AnimalReg;
