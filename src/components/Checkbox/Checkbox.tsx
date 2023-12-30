import React, { MouseEventHandler } from 'react';
import './Checkbox.css';


type Props = {
    isChecked: boolean,
    onToggle: MouseEventHandler,
}


const Checkbox = ({isChecked, onToggle}: Props) => (
    <div className="checkbox">
        <div
             className={isChecked ? "checked" : "unchecked"}
             onClick={onToggle}
         >
            <div className="outer" >
                <div className="inner" />
            </div>
        </div>
    </div>
)

export default Checkbox