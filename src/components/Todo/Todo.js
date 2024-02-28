import './Todo.css';
import { useDispatch } from 'react-redux';
import { toggleComplete, updateText } from './todoSlice';
import Checkbox from '../Checkbox/Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'


function EditableText({ text, onKeyDown }) {
    return (
        <input autoFocus={true} type="text"
            value={text}
            onChange={onKeyDown}
        />
    )
//    const isSelected = useSelector(state => state.todo.selected === props.id)
//
//    if (isSelected) {
//        return (
//            <input autoFocus={true} type="text"
//                value={props.description}
//                onChange={event => dispatch(updateText({
//                    id: props.id,
//                    description: event.target.value
//                }))}
//                onKeyDown={event => dispatch(stopEditing(event.code))}
//            />
//        )
//    } else {
//        return (
//            <span className="description">{props.description}</span>
//        )
//    }
}


export function Todo(props) {
    const dispatch = useDispatch()

    const keyDownHandler = event => {
        dispatch(updateText({
            id: props.id, 
            description: event.target.value
        }))
    }

    return (
        <div className="todo" >
            <Checkbox isChecked={props.isComplete}
                onToggle={() => dispatch(toggleComplete(props.id))}
            />
            <EditableText text={props.description}
                onKeyDown={keyDownHandler}
            />
            { (props.isFlagged) ?
                <div className="flag-icon">
                    <FontAwesomeIcon icon={faFlag} />
                </div>
                : ''
            }
        </div>
    );
}

export function Button(props) {
    return (
        <button style={{
            width: '100%',
            height: '100%',
            fontSize: '0.9em',
            background: props.tint
        }}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}

