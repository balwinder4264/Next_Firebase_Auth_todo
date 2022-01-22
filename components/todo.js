import moment from "moment"
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useTodo } from '../store/websiteLook';
import { useRouter } from "next/router";
const Todo = ({ id, timestamp, title, detail }) => {
    const router = useRouter();
    const { setTitle, settDetail, setTodoIdForUpdate } = useTodo()
    const deleteHandler = async (e) => {
        //one document delete 
        const docRef = doc(db, "todos", id);
        await deleteDoc(docRef)
        alert("item deleted");
    }
    const seeMore = (e) => {
        e.stopPropagation();
        router.push(`/todos/${id}`)
    }
    return <div className="flex flex-col border-2 shadow-lg p-4 w-2/4" onClick={() => {
        settDetail(title);
        setTitle(detail);
        setTodoIdForUpdate(id)
    }}>
        <div className="flex font-medium space-x-5" >
            <div>
                {title}
            </div>
            <div>
                {detail}

            </div>
            <button onClick={(e) => deleteHandler(e)} className=" bg-red-500 p-2 rounded">Delete</button>
            <div onClick={(e) => seeMore(e)}>
                <DotsVerticalIcon className=" h-5" />
            </div>

        </div>

        <div >
            {moment(timestamp).format("MMM do,yyyy")}
        </div>


    </div>
}

export default Todo