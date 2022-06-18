import './App.css';

import TextField from '@mui/material/TextField';
import { useState } from 'react';
import BasicPopover from './PopOver';
function App() {
 const [text,setText]=useState("")
const [gif,setGif]=useState("")
  const [feed, setFeed] = useState([])
  
  const dateNow=new Date
  const onTextChange = (e) => {
    const textValue = e.target.value;
    setText(textValue)

  }
  const selectGif = (url) => {
    setGif(url)
  }
  

  const addPost = () => {
    let payload = {
      text: text,
      gif:gif
    }

    setFeed([...feed,payload])
  }
  return (
    <div className="app">
      <div className="app__navbar">
        <h2>Giphy Posts</h2>
      </div>
      <div className="app__container">
      <div className="input__area">
          <input  
            type="text"
            placeholder='What is in your mind..'
            onChange={onTextChange}
          />
          {/* <button>Insert Gifs</button> */}
          <BasicPopover handleGifClick={selectGif}/>
          <button onClick={addPost}>Post</button>
      </div>

        <div className="feed__area">
          <h2>Your Feed</h2>

          {feed.length==0 && <p>No Content to Show.. Post Something to see the feed!</p>}
          {feed.map((post) => {
            return (
              <div>
               {post.gif!=="" && <img src={post.gif} alt="You can add gif too" width='400px' height="240px" />}
                <h3>{post.text}</h3>
    </div>
  )
})}
      </div>
      </div>
    
    </div>
  );
}

export default App;
