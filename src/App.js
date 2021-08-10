import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [perPage, setPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const indexLastTodo = currentPage * perPage;
  const indexFirstTodo = indexLastTodo - perPage;
  const currentTodos = todos.slice(indexFirstTodo, indexLastTodo);
  const pageNumbers = [];

  useEffect(() => {
    async function getTodos() {
      const res = await axios.get("https://tony-json-server.herokuapp.com/api/todos")
      const { data } = res.data;
      setTodos(data);
    }
    getTodos();
    
  }, [])

  for (var i = 1; i <= Math.ceil(todos.length / perPage); i++) {
    pageNumbers.push(i);
  }

  console.log(todos)

  return (
    <div className="App">
      {currentTodos.length > 0 && currentTodos.map(todo => <div key={todo.id}>{todo.title}  </div>)}
      <ul>
        {pageNumbers.length > 0 && pageNumbers.map(num => (
          <li key={num}>
            <a href="/" onClick={() => setCurrentPage(num)}>
              {num}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
