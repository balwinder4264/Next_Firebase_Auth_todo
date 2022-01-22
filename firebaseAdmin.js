

const admin = require("firebase-admin");
const serviceAccount = require("./secret.json");
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}
export const vertifyIdToken = (token) => {
    return admin.auth().verifyIdToken(token).catch(error => { throw error })
}


export const getTodos = async () => {

    const db = admin.firestore();
    return await db.collection("todos").get().then((docs) => {
        const temp = [];
        docs.docs.forEach((data) => {
            temp.push(data.data())
        })
        return temp;
    });
}

