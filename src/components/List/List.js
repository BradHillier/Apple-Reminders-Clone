import React, { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture, useDrag } from '@use-gesture/react';

import './List.css'

export const SwipableOptions = ({ onSwipe, children }) => {

    // Used to control the main contents offset from its original position
    // when dragging
    const [style, api] = useSpring(() => ({ x: 0 })); 
    const containerRef = useRef(null);

    // Get
    const getButtonSize = x => {
        if (x < 0) {
            // plus one to exclude the main element and just count buttons
            return `${Math.abs(x) / (children.length - 1)}px`
        }
        return '0px'
    }

    const toggleMinTravel = 40;

    const bind = useGesture({
        onDrag: (state) => {

            // Prevent vertical scroll while dragging
            document.body.classList.toggle('no-scroll', Math.abs(state.velocity[0]) > Math.abs(state.velocity[1] / 2))
            if (containerRef.current && containerRef.current.contains(state.event.target)) {
                api.start({ x: state.active ? state.movement[0] : 0 })

            // If this is not the component the user is interacting with,
            // put it back into it's original position
           // } else if (state.velocity[0] > 0.2) { 
           //     api.start({ x: 0 })
            } else if (Math.abs(state.movement[0]) > toggleMinTravel) {
               api.start({ x: 0 })
           }
        },
        onDragEnd: (state) => {
            // document.body.classList.remove('no-scroll')
            if (containerRef.current && containerRef.current.contains(state.event.target)) {
                if (state.movement[0] <= -toggleMinTravel && state.direction[0] === -1) {
                    api.start({ x: -(55 * children.length) })
                } else if (state.movement[0] > toggleMinTravel) {
                    api.start({ x: 0 })
                }
            }
        },
    },
    { target: window });

    return (
        <div className='flex-container'>

            <animated.div className='main-container'
                {...bind}
                style={{...style}}
                ref={containerRef}
            >
                {children[0]}
            </animated.div>
            
            {/** 
             * Each of the buttons that will appear when swiping
             * buttons will grow in size the further the user gets
             * from the initial gesture position
             */}
            <div className='options-container'> 
                {children.slice(1).map(child => {
                    return (
                        <animated.div
                            {...bind}
                            style={{ 
                                width: style.x.to((value) => getButtonSize(value)),
                            }}
                        >
                            {child}
                        </animated.div>
                    )

                })}
            </div>
        </div>
    );
};

