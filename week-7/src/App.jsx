import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import {
  countAtom,
  evenSelector,
  filteredTodoSelector,
  filterTodoAtom,
  todoAtom,
} from "./store/atoms/count";
import { useState } from "react";

function App() {
  return (
    <div>
      <RecoilRoot>
        {/* <Count /> */}
        <AddTodo />
        <FilterTodo />
        <ShowTodo />
      </RecoilRoot>
    </div>
  );
}

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const setTodo = useSetRecoilState(todoAtom);
  return (
    <>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={() => {
          console.log(title, description);
          setTodo((todos) => [
            ...todos,
            {
              title,
              description,
            },
          ]);
        }}
      >
        Add Todo
      </button>
    </>
  );
};
const FilterTodo = () => {
  const setFilter = useSetRecoilState(filterTodoAtom);
  return (
    <div>
      <input
        type="text"
        placeholder="filter"
        onChange={(e) => setFilter(e.target.value)}
      />
      {/* <button>Filter</button> */}
    </div>
  );
};
const ShowTodo = () => {
  const todos = useRecoilValue(todoAtom);
  const filteredTodos = useRecoilValue(filteredTodoSelector);

  return (
    <div>
      {(filteredTodos || todos).map((todo, index) => (
        <div key={index}>
          <h1>{todo.title}</h1>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

function Count() {
  console.log("re-render");
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);

  return (
    <div>
      <b>{count}</b>
      <EvenCountRenderer />
    </div>
  );
}

function EvenCountRenderer() {
  const isEven = useRecoilValue(evenSelector);

  return <div>{isEven ? "It is even" : "It is Odd"}</div>;
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);
  console.log("buttons re-rendererd");

  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default App;
