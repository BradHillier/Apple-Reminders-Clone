import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated } from '@react-spring/web'
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import '../../styles/iOSSystemColors.css'
import { Todo, Button } from '../Todo/Todo'
import { create, remove, toggleFlagged } from '../Todo/todoSlice';
import { SlidingListItem } from '../List/List'
import { iOS_colors } from '../../iOSSystemColors'

function App() {
    const todos = useSelector(state => state.todo.todos)
    const dispatch = useDispatch()

    /* Save the state in local storage */
    // const all_todos = useSelector(state => state.todo.todos)
    //  window.localStorage.setItem('state', JSON.stringify(all_todos))
    //

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
                <h1 style={{display: 'inline-block'}}>
                    Reminders
                </h1>
            </div>
            <div className="container">
                 {transitions((style, todo) => (

                     <animated.div style={style} key={todo.id}>

                        <SlidingListItem
                            mainContent={<Todo {...todo} />}
                            swipeActions={{
                                allowsFullSwipe: true,
                                trailing: [
                                    <Button 
                                        label="Details" 
                                        tint={iOS_colors.gray3}
                                    />,
                                    <Button 
                                        onClick={() => dispatch(toggleFlagged(todo.id))}
                                        label="Flag" 
                                        tint={iOS_colors.orange}
                                    />,
                                    <Button 
                                         onClick={() => dispatch(remove(todo.id))} 
                                         label="Delete" 
                                         tint={iOS_colors.red} 
                                    />
                                ],
                                leading: [
                                ]
                            }}
                         />
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
