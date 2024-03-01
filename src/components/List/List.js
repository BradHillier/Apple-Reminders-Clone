import React, { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

import './List.css'

// The minimum distance of a horizontal gesture to open or close the options
const TOGGLE_MIN_TRAVEL = 20

/**
 * Check if a gesture's dominant axis is the x-axis.
 * @param {number} dx - The difference in the x-axis.
 * @param {number} dy - The difference in the y-axis.
 * @returns {boolean} - True if the gesture is primarily horizontal.
 */
const isHorizontalGesture = (dx: number, dy: number): boolean  => {
    return Math.abs(dx) > Math.abs(dy)
}

const wasRightSwipe = (dx, direction) => {
    return dx <= -TOGGLE_MIN_TRAVEL && direction[0] === -1
}

const doesRefContainElement = (ref, element) => {
    return ref.current && ref.current.contains(element)
}



/**
 * 
 *
 * @param {
 *      Object: { 
 *          allowsFullSwipe: boolean = true,
 *          leading: [],
 *          traling: [],
 *      }
 *      SwipeAction: 
 */
export const SlidingListItem = ({ 
    mainContent,
    swipeActions
}) => {

    const [style, api] = useSpring(() => ({ 
        x: 0,
        config: {
            mass: 1,
            tension: 250,
            friction: 10,
            restVelocity: 0.2
        }
    }));

    // Ref for the main container. Used to check if gesture occured 
    const contentRef = useRef(null)
    const swipeActionRef = useRef(null)

    const [isOpen, setOpen] = useState(false)
    const [fullDrag, setFullDrag] = useState(false)


    // The width of each item when the options are open
    const openItemWidth = 80

    /**
     * Get the width an option item should be given the current
     * difference along the x-axis of the gesture. 
     * @param {number} dx - The difference in the x-axis.
     * @returns {string} - The width of the option item as a CSS string.
     */
    const getItemWidth = (dx, index) => {
        if (fullDrag) {
            switch (index) {
                case 2: 
                    return `${contentRef.current.offsetWidth - 20}px`
                default:
                    return '0px'
            }
        } 
        if (dx < 0) {
            return `${Math.abs(dx) / swipeActions.trailing.length}px`
        }
        return '0px'
    }

    const swipeOpenSlider = velocity => {
        api.start({ 
            x: -(openItemWidth * swipeActions.trailing.length),
            config: {
               mass: 2, 
               friction: Math.max(50 - (velocity[0] * 10), 10),
               tension: 300,
               clamp: false,
            }
        })
        setOpen(true)
    }

    const closeSliderAt = velocity => {
       api.start({ 
           x: 0,
           config: {
               mass: 2, 
               friction: Math.max(50 - (velocity[0] * 10), 10),
               tension: 250,
               clamp: false
           }
       })
        setOpen(false)
    }

    const closeSlider = () => {
       api.start({ 
           x: 0,
           config: {
               mass: 2, 
               friction: 35,
               tension: 250,
               clamp: false
           }
       })
        setOpen(false)
    }

    const moveSliderTo = position => {
        api.start({ 
            x: position,
            config: {
                friction: 10
            }
        })
    }

    const isFullSwipe = (x, dx) => {
        const isDistAtleastHalfScreen = contentRef.current.offsetWidth / 2 < Math.abs(dx)
        const isOnEdgeOfScreen = x < 100

        return isDistAtleastHalfScreen && isOnEdgeOfScreen
    }

    const bind = useGesture({
        onDrag: ({ xy: [x], active, velocity, movement: [dx], target }) => {

            // Prevent vertical scroll while dragging
            document.body.classList.toggle('no-scroll', isHorizontalGesture(...velocity))

            // If an input is in focus on mobile, this will hide the keyboard
            document.activeElement.blur()

            if (doesRefContainElement(contentRef, target)) {
                if (isOpen) {
                    moveSliderTo(-(openItemWidth * swipeActions.trailing.length) + dx)
                } else {
                    if (dx < 0) {
                        moveSliderTo(dx)
                    }
                }
                isFullSwipe(x, dx) ? setFullDrag(true) : setFullDrag(false)

            } else if (doesRefContainElement(swipeActionRef, target)) {
            } else if (isOpen) {
                closeSlider()
           }
        },
        onDragEnd: ({ velocity, xy: [x], movement: [dx], direction, target }) => {
            if (doesRefContainElement(contentRef, target)) {
                if (fullDrag) {
                    swipeActions.trailing[2].props.onClick()
                }
                if (wasRightSwipe(dx, direction)) {
                    swipeOpenSlider(velocity)
                } else {
                    closeSliderAt(velocity)
                }
            } else {
                closeSlider()
            }
        },
    },
    { target: window });

    return (
        <div className='flex-container'>

            <animated.div 
                className='main-container'
                {...bind}
                style={style}
                ref={contentRef}
            >
                {mainContent}
            </animated.div>
            
            {/** 
             * Each of the buttons that will appear when swiping
             * buttons will grow in size the further the user gets
             * from the initial gesture position
             */}
            <div 
                className='options-container'
                ref={swipeActionRef}
            > 
                {swipeActions.trailing.map((child, index) => (
                    <animated.div 
                        {...bind}
                        style={{ 
                            width: style.x.to((value) => getItemWidth(value, index)),
                            right: 100 * index
                        }}
                    >
                        {child}
                    </animated.div>
                ))}
            </div>
        </div>
    );
};

