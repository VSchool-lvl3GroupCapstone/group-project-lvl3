import React from 'react'
import './App.css'
import Header from './Header'
import Meme from "./Meme"

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
    setMemeData({// this sets the resets inputs to blank and sets default image after meme is added to list 
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

//function that controls all input changes
function handleChange(event) {
    const {name, value} = event.target//destructured object that targets the inputs name and values 
    setMemeData(prevMeme => ({
        ...prevMeme,
        [name]: value
    }))
}

function handleDelete(index) { //takes an index parameter and is used to delete a specific item from addMeme array
    const filteredItems = addMeme.filter((item, memeIndex)=>memeIndex !== index)//item represents the current meme being processed by filter(), 
//while memeIndex represents its index in the array.
    setAddMeme(filteredItems) //updates the state of the component by setting the addMeme state to the filteredItems array
}

//setting state for edit  button 
const [memeEdit, setMemeEdit]= React.useState(null)// the meme that will be edited identified by index. default index is null
const [editTopText, setEditTopText] = React.useState('')// state of edited toptext 
const [editBottomText, setEditBottomText] = React.useState('')//state of edited bottom txt 

//function for editing text 
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

//gets a random image from the api array 
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
