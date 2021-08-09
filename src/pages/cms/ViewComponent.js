import React , {useEffect , useState} from "react";
import grapesjs from 'grapesjs';
import gjsPresentWebPage from "grapesjs-preset-webpage"
function ViewComponent() {
  const [editor , setEditor] = useState(null);
  const getHtml = () =>{
    console.log(JSON.stringify(editor.getComponents()))
  }
  useEffect(()=>{
    
    const editor = grapesjs.init({
      container: "#editor",
      storageManager: {
        id: 'gjs-', 
        type: 'remote',
        stepsBeforeSave: 3,
        urlStore: 'http://localhost:8080/api/cms',
        urlLoad: 'http://localhost:8080/api/tutorials',
        // For custom parameters/headers on requests
        // params: { _some_token: '....' },
        // headers: { "Access-Control-Allow-Origin" :"*" },
      },
      assetManager: {
        assets: [
          'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
          // Pass an object with your properties
          {
            type: 'image',
            src: 'http://placehold.it/350x250/459ba8/fff/image2.jpg',
            height: 350,
            width: 250, 
            name: 'displayName'
          },
          {
            // As the 'image' is the base type of assets, omitting it will
            // be set as `image` by default
            src: 'http://placehold.it/350x250/79c267/fff/image3.jpg',
            height: 350,
            width: 250,
            name: 'displayName'
          },
         ],
      },
      plugins: ['gjs-preset-webpage'],
      pluginsOpts: {
        'gjs-preset-webpage': {
          // options
        }
      }  
    })
    setEditor(editor);
    var blockManager = editor.BlockManager;
    blockManager.add('my-first-block', {
      label: `<div>
      <img src="https://picsum.photos/70/70"/>
      <div class="my-label-block">блок</div>
    </div>`,
      content: '<div class="my-block">This is a simple block</div>',
    });
    blockManager.add('the-row-block', {
      label: '3 багана',
      content: '<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">' +
          '<div class="cell" data-gjs-draggable=".row"></div>' +
          '<div class="cell" data-gjs-draggable=".row"></div>' +
          '<div class="cell" data-gjs-draggable=".row"></div>' +
        '</div>',
    });
  } ,[])
  
  return(
    <div className="App">
       <button onClick={()=>getHtml()} type="button">Save</button>
      <div id="editor">
       
      </div>
    </div>
  )
}

export default ViewComponent;