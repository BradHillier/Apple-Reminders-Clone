import { SwipeActionsWrapper } from './List/List'
import { Button } from './Todo/Todo'
import { iOS_colors } from '../iOSSystemColors'



export function SwipeableReminder(reminder) {
    return (
        <SwipeActionsWrapper
            mainContent={<Todo {...reminder} />}
            swipeActions={{
                allowsFullSwipe: true,
                leading: [],
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
                ]
            }}
        />
    )
}
