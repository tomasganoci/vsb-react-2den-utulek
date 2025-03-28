import React, { useState } from "react";
import "./DogForm.css";

function DogForm({ data, onAdd }) {
  const [valid, setValid] = useState(false);
  const [newDog, setNewDog] = useState({
    id: data.length > 0 ? Math.max(...data.map((dog) => dog.id)) : 1,
    name: "",
    breed: "",
    age: "",
  });

  const handleChange = (e) => {
    const source = e.target.name;
    const val = e.target.value;
    let updatedDog;
    switch (source) {
      case "name": {
        updatedDog = { ...newDog, name: val };
        break;
      }
      case "breed": {
        updatedDog = { ...newDog, breed: val };
        break;
      }
      case "age": {
        updatedDog = { ...newDog, age: val };
        break;
      }
      default:
        break;
    }
    setNewDog(updatedDog);
    validateData(updatedDog);
  };

  const validateData = (dog) => {
    if (dog.age === "" || parseInt(dog.age) < 0 || parseInt(dog.age) > 25) {
      setValid(false);
    } else if (dog.name.trim().length === 0 || dog.breed.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const resetNewDog = () => {
    const temp = {
      id: newDog.id + 1,
      name: "",
      breed: "",
      age: "",
    };
    setNewDog(temp);
    validateData(temp);
  };

  return (
    <div className="dog-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd(newDog);
          resetNewDog();
        }}
      >
        <fieldset>
          <legend>Add dog</legend>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newDog.name}
            onChange={handleChange}
          />
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            name="breed"
            id="breed"
            value={newDog.breed}
            onChange={handleChange}
          />
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            min={0}
            id="age"
            value={newDog.age}
            onChange={handleChange}
          />
          <button disabled={!valid} type="submit">
            Add
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default DogForm;
