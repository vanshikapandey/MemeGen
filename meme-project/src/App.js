import React , {useState , useEffect} from 'react';
import MemeGen from './components/MemeGen'
import FontSizeChanger from 'react-font-size-changer';
import AOS from 'aos';
import './App.css';

const objectToQueryParam =(obj)=>{
  const params = Object.entries(obj).map(([key,value]) => `${key}=${value}`)
  return '?'+ params.join('&')
}

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });
   
  const [templates , setTemplates] =  useState([]);
  const [template , setTemplate] = useState(null);
  const [topText ,setTopText]=useState('Text1');
  const [bottomText ,setBottomText]=useState('Text2');
  const [meme ,setMeme]=useState(null);

  const handleDownload = (e, meme) => {
    e.preventDefault();
    fetch(meme, {method: "GET", headers:{}}).then(res => {
      res.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const  link = document.createElement("a");
        link.href=url;
        let imageName = meme.split('/')[meme.split('/').length - 1];
        console.log(imageName);
        link.setAttribute("download",imageName )
        document.querySelector("#download").appendChild(link);
        link.click();
      });
    }).catch(err => console.log(err))
  }

  useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes").then(res=> res.json().then(response=> setTemplates(response.data.memes))
    );
  }, []);

   if (meme){
     console.log(meme)
     return (
     <div className="memeclass" align ="center">
       <h1 
       data-aos-duration="1000"
       data-aos="fade-right">

        Your meme is ready!!!
        </h1>
       <a href={meme} download>
       <img src={meme} 
        alt="meme"/>
        </a>
        <br/><br/>
       <button onClick={()=>{window.location.reload()}}>
        Get a new meme
        </button>
        <a href={meme} target="_blank" onClick={e => handleDownload(e, meme)}>
          <button type="button">Download</button>
        </a>
        <span id="download"></span>
        
     </div>
     )
   }
  
   return(
  <div className ="main-div" align="center"> 
      
   {template && (  
    <form align="center" onSubmit ={ async e=>{
            e.preventDefault();
            const params ={
                          template_id:template.id,
                          text0:topText,
                          text1:bottomText,
                          username:"VanshikaPandey1",
                          password:"hello"
      };
      const response = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`);
      const json = await response.json();
      setMeme(json.data.url)
    }}
    >
      <h1 
      data-aos-duration="1000" 
      data-aos="zoom-out">
      Meme is just a CLICK away!!
      </h1>
     
      <MemeGen template={template} /><br/>

            <FontSizeChanger
                targets={['#target .content']}
                onChange={(element, newValue, oldValue) => {
                  console.log(element, newValue, oldValue);
                }}
                options={{
                  stepSize: 2,
                  range: 3
                }}
                customButtons={{
                  up: <span style={{'fontSize': '36px'}}>A</span>,
                  down: <span style={{'fontSize': '20px'}}>A</span>,
                  style: {
                    backgroundColor: 'black',
                    color: 'white',
                    WebkitBoxSizing: 'border-box',
                    WebkitBorderRadius: '5px',
                    width: '60px'
                  },
                  buttonsMargin: 10
                }}          
        />

      <div id="target">
        <input className="content" 
               type="text" 
               placeholder="top-text"
               value={topText} 
               onChange={e=>{
                setTopText(e.target.value)}}>
              </input><br/>
              <input className="content" 
               type="text"
               placeholder="bottom-text"
               value={bottomText} 
               onChange={e=>{
                 setBottomText(e.target.value)}}>
              </input><br/><br/>
      </div>
      <div  className="main-div2">
        <button type="submit" >Generate</button>
        <button onClick={()=>{window.location.reload()}}>Change Template</button>
     </div>
  </form>
  )}
      {!template && (
        <>
        <h1 data-aos="fade-right" 
            data-aos-duration="1000">
          <i className='fas fa-grin-squint-tears'></i>
          Welcome to MemeGen
          <i className='fas fa-grin-squint-tears'></i>
      </h1>

        <h2 data-aos="fade-left"
            data-aos-duration="3000"
            >Choose a template for meme<br/><br/>
        </h2>
     
        {templates.map(template=>  {
      return ( <MemeGen 
         style={{
                   padding:"10px 10px 10px 10px"}}
                   template ={template}
                   onClick={() =>{ setTemplate(template);
        }}
       />
      );
   })}
  </>
)}
</div>
);
}

export default App;
