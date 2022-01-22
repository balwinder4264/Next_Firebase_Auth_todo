// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../firebase"
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import initMiddleware from '../../lib/init-middleware'


import Cors from 'cors'
// Initialize the cors middleware

export default async function handler(req, res) {
  const collectionref = collection(db, "todos");
  const q = query(collectionref, orderBy("timestamp", "desc"));
  //Get all the docs
  const todos = [];
  const querrySnapshot = await getDocs(q);
  //itrate through that data
  querrySnapshot.forEach(doc => {
    todos.push({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime() })
  })
  res.status(200).json({ name: "todos" })
}
