import { createSelector } from "@reduxjs/toolkit";


export const searchTextSelector = state => state.filters.search
export const filterStatusSelector = state => state.filters.status
export const filterPrioritiesSelector = state => state.filters.priorities
export const todoListSelector = (state) =>  state.todoList

// {

//     const searchText = searchTextSelector(state)

//     const todosRemaining = state.todoList.filter((todo) => {
//         return todo.name.includes(state.filters.search)
//     })
//     return todosRemaining
// };

export const todosRemainingSelector = createSelector(
    todoListSelector, 
    filterStatusSelector,
    searchTextSelector, 
    filterPrioritiesSelector,
    (todoList, status, searchText, priorities) => {
        return todoList.filter(todo => {
            if (status === 'All') {
                return priorities 
                ? todo.name.includes(searchText) && priorities.includes(todo.priority) 
                : todo.name.includes(searchText)
            }

            return (
                todo.name.includes(searchText) && 
                (status === 'Completed' ? todo.completed : !todo.completed) && 
                (priorities  ? todo.name.includes(searchText) : true)
            )
        }
    )
})