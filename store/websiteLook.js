import { createContext, useState, useContext } from 'react';

const TodoContext = createContext({
    title: "",
    detail: "",
    setTitle: (txt) => setTitle(txt),
    settDetail: (txt) => settDetail(txt),
    todoIdForUpdate: false,
    setTodoIdForUpdate: (txt) => setTodoForUpdate(txt)

});
export const useTodo = () => {
    const app = useContext(TodoContext);
    return app;
};
export function TodoContextProvider(props) {
    const [title, setTitle] = useState("")
    const [detail, settDetail] = useState("")
    const [todoIdForUpdate, setTodoIdForUpdate] = useState(false)
    const context = {
        title: title,
        detail: detail,
        setTitle: setTitle,
        settDetail: settDetail,
        todoIdForUpdate: todoIdForUpdate,
        setTodoIdForUpdate: setTodoIdForUpdate
    };

    return (
        <TodoContext.Provider value={context}>
            {props.children}
        </TodoContext.Provider>
    );
}

export default TodoContext;
