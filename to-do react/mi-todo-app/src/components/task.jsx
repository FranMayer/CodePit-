function Tarea({ texto, completada, onToggle, onEliminar }) {
    return (
        <li className="tarea" style={{ textDecoration: completada ? 'line-through' : 'none' }}>
        {texto}
        <button onClick={onToggle}>
          {completada ? '❌' : '✅'}
        </button>
        <button onClick={onEliminar}>🗑️</button>
      </li>
      
    )
  }
  
  export default Tarea
  