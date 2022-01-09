import { async } from '@firebase/util'
import { collection, doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase'
import { useRouter } from "next/router";
function Detail({ todoProps }) {
    const router = useRouter()
    const todo = JSON.parse(todoProps)
    console.log("todoProps=>", todo)
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className=' bg-red-50 p-20'>
                <div>
                    <div className=' text-red-600'>
                        Title
                    </div>

                    {todo.title}
                </div>
                <div>
                    <div className=' text-red-600'>
                        Detail
                    </div>

                    {todo.detail}
                </div>
                <button className=' bg-blue-800 p-2 rounded text-white' onClick={() => router.push("/")}>Back to home</button>

            </div>

        </div>
    )
}

export default Detail;


export const getServerSideProps = async (context) => {
    const id = context.params.id;
    // console.log("todoProps=>", id)
    const docRef = doc(db, "todos", id);
    const docSnap = await getDoc(docRef);

    return {
        props: { todoProps: JSON.stringify(docSnap.data()) || null }
    }
}