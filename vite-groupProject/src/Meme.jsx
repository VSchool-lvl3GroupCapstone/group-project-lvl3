import React from "react"

export default function Meme(props){


const addedItem = props.addMeme.map((input,index)=>(
    <div key={index} className="addedMemeDiv">
            <img src={input.randomMeme} className="memeImage" />
            {
                props.memeEdit === index? 
                <div className="addedInputs">
                    <input type="text" onChange={(e)=>props.setEditTopText(e.target.value)} value ={props.editTopText} placeholder="Top Text" className="topTextAdded"/>
                    <input type="text" onChange={(e)=>props.setEditBottomText(e.target.value)} value ={props.editBottomText} placeholder="Bottom Text" className="bottomTextAdded"/>
                </div>:
                <div className="savedText">
                    <h2 className="memeTopText">{input.topText}</h2>
                    <h2 className="memeBottomText">{input.bottomText}</h2>
                </div>
            }
            <button onClick={() => props.handleDelete(index)} className="deleteBtn">Delete</button> 
            <button onClick={() => props.setMemeEdit(index)} className="editBtn">Edit Text</button>
            <button onClick={()=> props.saveMemeEdit(index)} className="saveBtn">Save</button>
    </div>
    ))

    return(
        <main className="memeContainer">
            <form className="form" onSubmit={props.handleSubmit}>
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--topInput"
                    name="topText"
                    value={props.item.topText}
                    onChange={props.handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--bottomInput"
                    name="bottomText"
                    value={props.item.bottomText}
                    onChange={props.handleChange}
                />
                <button type='button'
                    className="form--button"
                    onClick={props.getNewImage}
                >
                    Refresh meme image
                </button>
                <button className="formAddBtn">Add Item</button> 
            </form>
            <div className="memePreview">
                <img src={props.item.randomMeme} className="memeImagePreview" />
                <h2 className="meme--text top">{props.item.topText}</h2>
                <h2 className="meme--text bottom">{props.item.bottomText}</h2>
            </div>
            <div className="memeList">
                <h1 className="savedTitle">Saved Memes</h1>
                {addedItem}
            </div>
        </main>
    )
}