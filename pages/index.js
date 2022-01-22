import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TodoList from "../components/todolist"
import TodoForm from '../components/todoForm'
import { TodoContextProvider } from "../store/websiteLook"
import SignIn from '../components/signIn'
import { useAuth } from '../Auth'
import { auth, db } from '../firebase'
import nookies from 'nookies'
import { vertifyIdToken } from '../firebaseAdmin'
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
export default function Home({ todosProps }) {
  const { currentUser } = useAuth()
  console.log("currentUser=>", currentUser)
  return (
    <div className=" flex flex-col gap-y-20">
      <TodoContextProvider>
        <div className=' flex justify-center gap-x-3 mt-5'>
          <div>
            <Image src={currentUser.photoURL} height={100} width={100} />
          </div>
          <div>
            {currentUser.displayName}
          </div>
          <div>
            <button onClick={() => auth.signOut()} className=' bg-blue-600 p-2 rounded'>Logout</button>

          </div>


        </div>
        <TodoForm />
        <TodoList todosProps={todosProps} />
      </TodoContextProvider>
    </div>
  )
}

export async function getServerSideProps(context) {
  const todos = [];
  try {
    const cookies = nookies.get(context);

    const token = await vertifyIdToken(cookies.token);
    console.log("cookies=>", cookies.token)
    const { email } = token;
    //How to get tabel information 
    const collectionref = collection(db, "todos");
    //Querry on that table
    const q = query(collectionref, where("email", "==", email), orderBy("timestamp", "desc"));
    //Get all the docs
    const querrySnapshot = await getDocs(q);
    //itrate through that data
    querrySnapshot.forEach(doc => {
      todos.push({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime() })
    })
  } catch (error) {
    console.log("eror=>", error)
  }
  return {
    props: {
      todosProps: JSON.stringify(todos) || []
    }
  }
}
