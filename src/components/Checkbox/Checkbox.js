import './Checkbox.css';


export function Checkbox(props) {
    const outer = props.isChecked ? "outer-checked" : "outer-unchecked"

    return (
        <div className={outer} onClick={props.onToggle}>
            <div className="inner" />
        </div>
    )
}
