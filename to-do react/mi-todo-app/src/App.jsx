import Tarea from './components/task'
import './index.css'
import { useState, useEffect } from "react";

function App() {
  const [tarea, setTarea] = useState('')
  const [listaTareas, setListaTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas")
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : []
  })
  const [editandoId, setEditandoId] = useState(null)
const [textoEditado, setTextoEditado] = useState('')
  // Cargar tareas desde localStorage
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas")
    if (tareasGuardadas) {
      const tareasParseadas = JSON.parse(tareasGuardadas)
      setListaTareas(tareasParseadas)
    }
  }, [])

  // Guardar tareas en localStorage
  useEffect(() => {
  
    localStorage.setItem("tareas", JSON.stringify(listaTareas))
  }, [listaTareas])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (tarea.trim() === '') return

    const nuevaTarea = {
      id: Date.now(),
      texto: tarea,
      completada: false
    }

    setListaTareas([...listaTareas, nuevaTarea])
    setTarea('')
  }

  const toggleCompletada = (id) => {
    setListaTareas(
      listaTareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    )
  }

  const eliminarTarea = (id) => {
    setListaTareas(listaTareas.filter((t) => t.id !== id))
  }

  const comenzarEdicion = (id, texto) => {
    setEditandoId(id)
    setTextoEditado(texto)
  }

  const guardarEdicion = (id) => {
    setListaTareas(
      listaTareas.map((t) =>
        t.id === id ? { ...t, texto: textoEditado } : t
      )
    )
    setEditandoId(null)
    setTextoEditado('')
  }

  return (
    <div className="container">
      <h1>📝To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribí una tarea..."
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
  {listaTareas.map((t) => (
    <li key={t.id} className="tarea" style={{ textDecoration: t.completada ? 'line-through' : 'none' }}>
      {editandoId === t.id ? (
        <>
          <input
            type="text"
            value={textoEditado}
            onChange={(e) => setTextoEditado(e.target.value)}
          />
          <button onClick={() => guardarEdicion(t.id)}>💾</button>
          <button onClick={() => setEditandoId(null)}>❌</button>
        </>
      ) : (
        <>
          {t.texto}
          <button onClick={() => toggleCompletada(t.id)}>
            {t.completada ? '❌' : '✅'}
          </button>
          <button onClick={() => comenzarEdicion(t.id, t.texto)}>✏️</button>
          <button onClick={() => eliminarTarea(t.id)}>🗑️</button>
        </>
      )}
    </li>
  ))}
</ul>
      <footer>
        <p>Hecho por Fran Mayer</p>
      </footer>
    </div>
  )
}

export default App
