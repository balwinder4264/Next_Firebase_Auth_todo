import React, { useEffect, useRef, useState } from 'react'
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore'

import { useAuth } from '../Auth';
import { db } from '../firebase'
import { useTodo } from '../store/websiteLook';

const TodoForm = () => {
    const inputAreaRef = useRef();
    const { currentUser } = useAuth()
    const { title, detail, setTitle, settDetail, setTodoIdForUpdate, todoIdForUpdate } = useTodo()


    const addTodoHandler = async () => {
        if (!title || !detail) {
            alert("Enbter the valeu ");
            return
        }
        const data = {
            "title": title,
            "detail": detail,
            "email": currentUser.email
        }
        if (todoIdForUpdate) {
            //upadte todo

            const docRef = doc(db, "todos", todoIdForUpdate);
            const todoUpdated = { ...data };
            updateDoc(docRef, todoUpdated)
            setTitle("");
            settDetail("");
            setTodoIdForUpdate(false)
            alert(`todo with id ${docRef.id} is updated succesfully`)

        } else {
            const collectionRef = collection(db, "todos");
            const docRef = await addDoc(collectionRef, { ...data, timestamp: serverTimestamp() });
            setTitle("");
            settDetail("");

            alert(`todo with id ${docRef.id} is added succesfully`)
        }



    }
    useEffect(() => {
        const checkIfClickedOutSide = (e) => {

            if (!inputAreaRef.current.contains(e.target)) {
                settDetail("")
                setTitle("")
                setTodoIdForUpdate(false)

            }
        }
        document.addEventListener("mousedown", checkIfClickedOutSide)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutSide)
        }
    }, [])
    return (
        <div className='flex justify-center flex-col items-center gap-y-4 ' ref={inputAreaRef}>


            <div >
                <input placeholder='title' className=' border-2 p-2 rounded' value={title} onChange={(event) => setTitle(event.target.value)}></input>
            </div>
            <div>
                <input value={detail} onChange={(event) => settDetail(event.target.value)} placeholder='detail' className=' border-2 p-2 rounded '></input>
            </div>
            <div>
                <button onClick={() => addTodoHandler()} className=' bg-indigo-500 p-2 rounded-full' >Add todo</button>
            </div>
        </div>
    )
}

export default TodoForm
