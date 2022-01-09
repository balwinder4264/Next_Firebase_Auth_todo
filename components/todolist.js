const { useState, useEffect } = require("react")
import { collection, doc, onSnapshot, orderBy, query, getDoc, where } from "firebase/firestore";
import { useAuth } from "../Auth";
import { db } from "../firebase"
import Todo from "./todo";
const TodoList = ({ todosProps }) => {
    console.log("todosProps balwinder =>", todosProps)
    const [todos, setTodos] = useState([]);
    const { currentUser } = useAuth()
    // useEffect(() => {
    //     setTodos(JSON.parse(todosProps))
    // }, [])
    useEffect(() => {
        const collectionRef = collection(db, "todos");
        const q = query(collectionRef, where("email", "==", currentUser?.email), orderBy("timestamp", "desc"));
        const unsubscrib = onSnapshot(q, (querySnapshot) => {

            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(), id: doc.id,
                timestamp: doc.data().timestamp?.toDate().getTime()
            }))
            setTodos(data)
        })
        return unsubscrib
    }, [])
    // if (todos.length < 1) {
    //     return <div>loaind.....</div>
    // }
    return <div className="flex justify-center flex-col items-center m-10">
        {todos.map((item) => {
            return <Todo
                id={item.id}
                timestamp={item.timestamp}
                title={item.title}
                detail={item.detail}
            />
        })}
    </div>
}

export default TodoList