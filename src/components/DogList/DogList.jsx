import React from "react";
import "./DogList.css";

function DogList({ data, onDelete }) {
  return (
    <div className="list">
      {data.map((dog) => {
        return (
          <div className="item" key={dog.id}>
            <span>
              {dog.name} / {dog.breed} / {dog.age}
            </span>
            <button onClick={() => onDelete(dog.id)} className="btn-delete">
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default DogList;
