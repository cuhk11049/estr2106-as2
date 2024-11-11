

import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {useLocation } from 'react-router-dom';


function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        {' '}
        No Match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              {' '}
              <Link to="/">Home</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="/Images">Images</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="/Slideshow">Slideshow</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="/ImageEditing">ImageEditing</Link>{' '}
            </li>
          </ul>
        </div>
        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Images" element={<Image />} />
          <Route path="/Slideshow" element={<Slideshow />} />
          <Route path="/ImageEditing" element={<ImageEditing />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

function ImageEditing() {

  const [brightness, setBrightness] = React.useState(100);
  const [blur,setBlur] = React.useState(0);
  const [isFlipped,setIsFlipped] = React.useState(false);      

  const handleBrighten = ()=> {
    setBrightness((prevBrightness)=> Math.min(prevBrightness + 20, 200));
  }
  
  const handleDarken = () => {
    setBrightness((prevBrightness)=> Math.max(prevBrightness-20,0));
  } 
  const handleFlip = () => {
    setIsFlipped((prevFlip) => !prevFlip);
  };
  const handleMoreBlurry = () => {
    setBlur((prevBlur) => prevBlur + 2);
  };
  const handleSharper = () => {
    setBlur((prevBlur) => Math.max(prevBlur - 2, 0));
  };
  const imageStyle = {
    width: '50%',
    filter: `brightness(${brightness}%) blur(${blur}px)`,
    transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
  };
  return(
    <div>
      <h1>Image Editing</h1>
      <img src={"images/" +data[0].filename} style={imageStyle}/>
      <div>
        <button onClick={handleBrighten}>Brighten</button>
        <button onClick={handleDarken}>Darken</button>
        <button onClick={handleFlip}>Flip</button>
        <button onClick={handleMoreBlurry}>More Blurry</button>
        <button onClick={handleSharper}>More Clean</button>
      </div>
    </div>
  );
}



class Home extends React.Component{
  render(){
    return(
      <img src={"App.png"} style={{width:"90%"}}/>
    );
  }

}

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageID: 0,
      currentInterval: 1500,
      imageSize: 400,
      isSlideshowRunning: false,
      images: data.slice(), 
    };
    this.startslideshow = this.startslideshow.bind(this);
    this.stopslideshow = this.stopslideshow.bind(this);
    this.slower = this.slower.bind(this);
    this.faster = this.faster.bind(this);
    this.resize = this.resize.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.slideshowInterval = null;
  }

  startslideshow() {
    if (this.slideshowInterval) return; // Slideshow is already running
    this.setState({ isSlideshowRunning: true });
    this.slideshowInterval = setInterval(() => {
      this.setState((prevState) => ({
        currentImageID: (prevState.currentImageID + 1) % prevState.images.length,
      }));
    }, this.state.currentInterval);
  }

  stopslideshow() {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
      this.slideshowInterval = null;
      this.setState({ isSlideshowRunning: false });
    }
  }

  slower() {
    this.setState(
      (prevState) => ({ currentInterval: prevState.currentInterval + 200 }),
      () => {
        if (this.state.isSlideshowRunning) {
          this.stopslideshow();
          this.startslideshow();
        }
      }
    );
  }

  faster() {
    this.setState(
      (prevState) => ({
        currentInterval: Math.max(prevState.currentInterval - 200, 200),
      }),
      () => {
        if (this.state.isSlideshowRunning) {
          this.stopslideshow();
          this.startslideshow();
        }
      }
    );
  }

  resize() {
    this.setState((prevState) => ({
      imageSize: prevState.imageSize === 400 ? 200 : 400,
    }));
  }

  shuffle() {
    this.setState((prevState) => {
      const shuffledImages = prevState.images.slice();
      // Fisher-Yates shuffle algorithm
      for (let i = shuffledImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
      }
      return { images: shuffledImages, currentImageID: 0 };
    });
  }

  render() {
    const { images, currentImageID, imageSize } = this.state;
    return (
      <div>
        <button onClick={this.startslideshow}>Start slideshow</button>
        <button onClick={this.stopslideshow}>Stop slideshow</button>
        <button onClick={this.slower}>Slower</button>
        <button onClick={this.faster}>Faster</button>
        <button onClick={this.shuffle}>Shuffle</button>
        <button onClick={this.resize}>Resize</button>
        <br />
        <img
          src={"images/" + images[currentImageID].filename}
          style={{ width: imageSize }}
        />
        <br />
        <p>{images[currentImageID].filename}</p>
      </div>
    );
  }
}


const data = [
  {filename: "cuhk-2013.jpg", year:2013, remarks: "Sunset over CUHK"}, 
  {filename: "cuhk-2017.jpg", year:2017, remarks: "Bird's-eye view of CUHK"},
  {filename: "sci-2013.jpg", year:2013, remarks: "The CUHK Emblem"}, 
  {filename: "shb-2013.jpg", year:2013, remarks: "The Engineering Buildings"},
  {filename: "stream-2009.jpg", year:2009, remarks: "Nature hidden in the campus"},
  ];

class Image extends React.Component{
  render(){
      return(
          // Change hello world to the class components Title and Gallery
          <>
              <Title name = "CUHK pictures"/>
              <Gallery/>
          </>
      )
  }
}

class Title extends React.Component {
  // Add your code here
  render(){
      return(
          <header className="bg-warning">
          <h1 className="display-4 text-center">{this.props.name}</h1>
          </header>
      );
  }
  // You can design your own CSS styles
}

class Gallery extends React.Component{
  // Add your code here
  render(){
      return(
          <main>{data.map((file,index) => <FileCard i={index} key={index}/> )}
</main>
          
      );
  }
} 
  
class FileCard extends React.Component{
  // Add your code here
  // Use Bootstrap cards
  
  constructor(props){
      super(props);
      this.state = { selected:-1};
  }
  Mousedown(index) {
          this.setState({ selected: index });
  }
  Mouseup(index){
          this.setState({ selected: -1 });
  }
  render(){
      let i = this.props.i;
      return(
          <div className ="card d-inline-block m-2" style={{width: this.state.selected == i?400:200}} onMouseDown={() => this.Mousedown(i)} onMouseUp={() => this.Mouseup(i)}>
              <img src={"images/" +data[i].filename} className ="w-100"/>
              <div className="card-body">
                  <h6 className="card-title">{data[i].filename}</h6>
                  <p className="card-text">{data[i].year}</p>
              </div>
          </div>
      );
  }
}


const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App />);


