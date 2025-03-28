import { useState } from "react";
import "./App.css";
import rawData from "./dogsData.json";
import DogList from "./components/DogList/DogList";
import DogForm from "./components/DogForm/DogForm";

function App() {
  const [listOfDogs, setListOfDogs] = useState(rawData.dogs);

  const handleDelete = (dogId) => {
    const filteredDogs = listOfDogs.filter((dog) => dog.id !== dogId);
    setListOfDogs(filteredDogs);
  };

  const handleAdd = (dogToAdd) => {
    const numberOfDogs = listOfDogs.length + 1;
    const needForDog = {
      food: "Nemáš pro něho jídlo!",
      vaccine: "Nemáš pro něho dostatek vakcín!",
      pills: "Nemáš pro něho dostatek léků!",
    };

    for (const key in needForDog) {
      if (dogRequirements[key] * numberOfDogs > shelterStorage[key]) {
        alert(needForDog[key]);
        return;
      }
    }
    setListOfDogs([...listOfDogs, dogToAdd]);
  };
  const [activeTab, setActiveTab] = useState(1);

  const [shelterStorage, setShelterStorage] = useState({
    food: 35,
    vaccine: 15,
    pills: 20,
  });
  const dogRequirements = { food: 10, vaccine: 1, pills: 2 };

  const [tempStorage, setTempStorage] = useState({
    food: 0,
    vaccine: 0,
    pills: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempStorage((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleAddToStorage = (e) => {
    e.preventDefault();
    setShelterStorage((prev) => ({
      food: prev.food + tempStorage.food,
      vaccine: prev.vaccine + tempStorage.vaccine,
      pills: prev.pills + tempStorage.pills,
    }));
    setTempStorage({ food: 0, vaccine: 0, pills: 0 });
  };

  return (
    <div className="page-container">
      <div className="page-toggler">
        <button
          type="button"
          name="list-of-dogs"
          className={`toggler-btn ${activeTab === 1 ? "active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          Seznam psů
        </button>
        <button
          type="button"
          name="shelter-storage"
          className={`toggler-btn ${activeTab === 2 ? "active" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          Sklad útulku
        </button>
      </div>
      {activeTab === 1 && (
        <>
          <DogList data={listOfDogs} onDelete={handleDelete} />
          <DogForm data={listOfDogs} onAdd={handleAdd} />
        </>
      )}
      {activeTab === 2 && (
        <>
          <h1>Aktuální zásoby</h1>
          <p>Jídlo: {shelterStorage.food} kg</p>
          <p>Vakcíny: {shelterStorage.vaccine} ks</p>
          <p>Pilulky: {shelterStorage.pills} ks</p>
          <div className="shelter-form">
            <form
              onSubmit={(e) => {
                handleAddToStorage(e);
              }}
            >
              <fieldset>
                <legend>Přidat zásoby</legend>
                <label htmlFor="food">Přidat jídlo:</label>
                <input
                  type="number"
                  name="food"
                  id="food"
                  value={tempStorage.food}
                  onChange={handleChange}
                />
                <label htmlFor="vaccine">Přidat vakcínu:</label>
                <input
                  type="number"
                  name="vaccine"
                  id="vaccine"
                  value={tempStorage.vaccine}
                  onChange={handleChange}
                />
                <label htmlFor="pills">Přidat pilulku:</label>
                <input
                  type="number"
                  name="pills"
                  id="pills"
                  value={tempStorage.pills}
                  onChange={handleChange}
                />
                <button type="submit">Doplnit zásoby</button>
              </fieldset>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
