import React from 'react'
import './App.css'
import Header from './Header'
import Meme from "./Memes"

function App() {
//create an object as state that'll store the text data and image 
const[memeData, setMemeData] = React.useState({
    topText:"",
    bottomText:"",
    randomMeme: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"

})

// //state for adding items into list (array)
const [addMeme, setAddMeme] = React.useState([])

//function to add items to a list 
function handleSubmit(event){
    event.preventDefault()
    setAddMeme([...addMeme,memeData])
    setMemeData({
        topText:"",
        bottomText:"",
        randomMeme: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    });
    }

//create state that will store api data into an empty array
const[apiMemes, setApiMemes] = React.useState([])

React.useEffect(()=>{
    axios.get("https://api.imgflip.com/get_memes")
    .then(response => {
        setApiMemes(response.data.data.memes)
        console.log(apiMemes)
    })
},[]) 

function handleChange(event) {
    const {name, value} = event.target
    setMemeData(prevMeme => ({
        ...prevMeme,
        [name]: value
    }))
}

function handleDelete(index) { //takes an index parameter and is used to delete a specific item from addMeme array
    const filteredItems = addMeme.filter((item, memeIndex)=>memeIndex !== index)//item represents the current item being processed by filter(), 
//while memeIndex represents its index in the array.
    setAddMeme(filteredItems) //updates the state of the component by setting the addMeme state to the filteredItems array
}
const [memeEdit, setMemeEdit]= React.useState(null)
const [editTopText, setEditTopText] = React.useState('')
const [editBottomText, setEditBottomText] = React.useState('')

function saveMemeEdit(index){
const updatedMeme = addMeme.map((meme,memeIndex)=>{
    if(memeIndex === index){
        meme.topText = editTopText
        meme.bottomText = editBottomText
    }
    return meme
})
setAddMeme(updatedMeme)
setMemeEdit(null)
setEditTopText('')
setEditBottomText('')
}


function getNewImage(){
const randomIndexNum = Math.floor(Math.random() * apiMemes.length)
const randomImgUrl = apiMemes[randomIndexNum].url
setMemeData(prevData=>({
    ...prevData,
    randomMeme: randomImgUrl
}))



}
return(
    <div>
        <Header/>
        <Meme
            key={memeData.index}
            item={memeData}
            getNewImage = {getNewImage}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            addMeme= {addMeme}
            handleDelete={handleDelete}
            setMemeEdit= {setMemeEdit}
            setEditTopText={setEditTopText}
            setEditBottomText={setEditBottomText}
            memeEdit={memeEdit}
            editBottomText={editBottomText}
            editTopText={editTopText}
            saveMemeEdit={saveMemeEdit}
        />
    </div>
)
}

export default App
