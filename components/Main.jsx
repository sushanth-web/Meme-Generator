import { useState,useEffect } from "react"

export default function Main() {
const[meme,setMeme]=useState({
    topText:"one does not simply",
    bottomText:"walk into mordor",
    imageURl:"http://i.imgflip.com/1bij.jpg"
})

const[allMemes,setAllMemes]=useState([])

useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
    .then(response=>response.json())
    .then(data=>setAllMemes(data.data.memes))
},[])

function getMemeImage(){
    const randomNum=Math.floor(Math.random() * allMemes.length)
    const newMemeUrl=allMemes[randomNum].url
    setMeme(prev => ({
        ...prev,
        imageURl:newMemeUrl
    }))
}

function change(event){
    const{value,name}=event.currentTarget
    setMeme(prev => ({
        ...prev,
        [name]:value
    }))
}
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={change}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={change}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src= {meme.imageURl}/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}

