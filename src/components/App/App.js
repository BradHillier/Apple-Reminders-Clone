import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated } from '@react-spring/web'

import './App.css';
import { Todo, Button } from '../Todo/Todo'
import { create, remove, toggleFlagged } from '../Todo/todoSlice';
import { SwipableOptions } from '../List/List'
import { useSelector, useDispatch } from 'react-redux';

function App() {
    const todos = useSelector(state => state.todo.todos)
    const dispatch = useDispatch()

    /* Save the state in local storage */
    // const all_todos = useSelector(state => state.todo.todos)
    // window.localStorage.setItem('state', JSON.stringify(all_todos))


    const transitions = useTransition(todos, {
        keys: (todo) => todo.id,
        from:  { 
            height: '3em', 
            opacity: 0,
            transform: 'translateY(-40px)' 
        },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: [
            { height: '0em', opacity: 0 },
        ]
    })


    return (
        <div className="App">
            <div className="heading">
                <h1 style={{display: 'inline-block'}}>Todo List</h1>
            </div>
            <div className="container">
                 {transitions((style, todo) => (
                     <animated.div style={style} key={todo.id}>
                        <SwipableOptions>
                            <Todo {...todo} />
                            <Button desc="Details" color="#48484A" />
                            <Button desc="Flag" color="#FF9E0A"
                                 onClick={() => dispatch(toggleFlagged(todo.id))} />
                            <Button desc="Delete" color="#FF453A" 
                                 onClick={() => dispatch(remove(todo.id))} />
                        </SwipableOptions>
                     </animated.div>
                 ))}
            </div>
                <div className="btn-bottom"> 
                    <button onClick={() => dispatch(create())}>
                        <FontAwesomeIcon icon={faCirclePlus} className="icon" />
                        &ensp; New Reminder
                    </button>
                </div>
        </div>
    );
}

export default App;
