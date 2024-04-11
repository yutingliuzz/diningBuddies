// import React from "react";
// import './Chat.css';
// import { useRef, useState } from "react";
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp} from 'firebase/firestore';

// const ChatMessage = ({message, user}) => {
//   const { text, uid, photoURL } = message;

//   const messageClass = uid === user.uid ? 'sent' : 'received';

//   return (<>
//     <div className={`message ${messageClass}`}>
//       <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
//       <p>{text}</p>
//     </div>
//   </>)
// }

// const Chat = ({user, firestore}) => {
//   const dummy = useRef();
//   const messagesRef = collection(firestore, 'messages');
//   const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));

//   const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

//   const [formValue, setFormValue] = useState('');

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     const { uid, photoURL } = user;

//     try {
//       await addDoc(messagesRef, {
//         text: formValue,
//         createdAt: serverTimestamp(),
//         uid,
//         photoURL
//       });
//       console.log("Document successfully written!");
//     } catch (error) {
//       console.error("Error writing document: ", error);
//     }

//     setFormValue('');
//     dummy.current.scrollIntoView({ behavior: 'smooth' });
//   }

//     if (!user){
//         return <div>not signed in </div>
//     }
//       return (<>
//     <main>

//       {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} user={user}/>)}

//       <span ref={dummy}></span>

//     </main>

//     <form onSubmit={sendMessage}>

//       <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

//       <button type="submit" disabled={!formValue}>🕊️</button>

//     </form>
//   </>)
// }

// export default Chat;
