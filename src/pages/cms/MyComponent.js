// import { Tabs } from "antd";
// import { useEffect, useState , text , useContext} from "react";
// import Context from '@context/Context';
// import 'grapesjs/dist/css/grapes.min.css';
// // import MainLayout from "@components/layouts/MainLayout";
// import grapesjs from 'grapesjs';
// const MyComponent = () => {

//   useEffect(() => {
//     const editor = grapesjs.init({
//       layerManager: {
//         appendTo: '.layers-container'
//       },
//       storageManager: {
//         id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
//         type: 'local',          // Type of the storage
//         autosave: true,         // Store data automatically
//         autoload: true,         // Autoload stored data on init
//         stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
//         storeComponents: true,  // Enable/Disable storing of components in JSON format
//         storeStyles: true,      // Enable/Disable storing of rules in JSON format
//         storeHtml: true,        // Enable/Disable storing of components as HTML string
//         storeCss: true,         // Enable/Disable storing of rules as CSS string
//       },
//       // storageManager: {
//       //   type: 'remote',
//       //   stepsBeforeSave: 10,
//       //   urlStore: 'http://store/endpoint',
//       //   urlLoad: 'http://load/endpoint',
//       //   params: {}, // Custom parameters to pass with the remote storage request, eg. CSRF token
//       //   headers: {}, // Custom headers for the remote storage request
//       // },
//       mediaCondition: 'min-width', // default is `max-width`
//       deviceManager: {
//         devices: [{
//           name: 'Mobile',
//           width: '320',
//           widthMedia: '',
//         }, {
//           name: 'Desktop',
//           width: '',
//           widthMedia:'1024',
//         }]
//       },
//       panels: {
//         defaults: [
//           {
//             id: 'panel-devices',
//             el: '.panel__devices',
//             buttons: [{
//                 id: 'device-desktop',
//                 label: 'D',
//                 command: 'set-device-desktop',
//                 active: true,
//                 togglable: false,
//               }, {
//                 id: 'device-mobile',
//                 label: 'M',
//                 command: 'set-device-mobile',
//                 togglable: false,
//             }],
//           },{
//           id: 'layers',
//           el: '.panel__right',
//           // Make the panel resizable
//           resizable: {
//             maxDim: 350,
//             minDim: 200,
//             tc: 0, // Top handler
//             cl: 1, // Left handler
//             cr: 0, // Right handler
//             bc: 0, // Bottom handler
//             // Being a flex child we need to change `flex-basis` property
//             // instead of the `width` (default)
//             keyWidth: 'flex-basis',
//           },
          
//         },
        
//         {
//           id: 'panel-switcher',
//           el: '.panel__switcher',
//           buttons: [{
//               id: 'show-layers',
//               active: true,
//               label: 'Layers',
//               command: 'show-layers',
//               // Once activated disable the possibility to turn it off
//               togglable: false,
//             }, {
//               id: 'show-style',
//               active: true,
//               label: 'Styles',
//               command: 'show-styles',
//               togglable: false,
//           },
//           {
//             id: 'show-traits',
//             active: true,
//             label: 'Traits',
//             command: 'show-traits',
//             togglable: false,
//         }],
//         },
//       ]},
//       traitManager: {
//         appendTo: '.traits-container',
//       },
//       selectorManager: {
//         appendTo: '.styles-container'
//       },
//       styleManager: {
//         appendTo: '.styles-container',
//         sectors: [{
//             name: 'Dimension',
//             open: false,
//             // Use built-in properties
//             buildProps: ['width', 'min-height', 'padding'],
//             // Use `properties` to define/override single property
//             properties: [
//               {
//                 // Type of the input,
//                 // options: integer | radio | select | color | slider | file | composite | stack
//                 type: 'integer',
//                 name: 'The width', // Label for the property
//                 property: 'width', // CSS property (if buildProps contains it will be extended)
//                 units: ['px', '%'], // Units, available only for 'integer' types
//                 defaults: 'auto', // Default value
//                 min: 0, // Min value, available only for 'integer' types
//               }
//             ]
//           },{
//             name: 'Extra',
//             open: false,
//             buildProps: ['background-color', 'box-shadow', 'custom-prop'],
//             properties: [
//               {
//                 id: 'custom-prop',
//                 name: 'Custom Label',
//                 property: 'font-size',
//                 type: 'select',
//                 defaults: '32px',
//                 // List of options, available only for 'select' and 'radio'  types
//                 options: [
//                   { value: '12px', name: 'Tiny' },
//                   { value: '18px', name: 'Medium' },
//                   { value: '32px', name: 'Big' },
//                 ],
//             }
//             ]
//           }]
//       },
//     // });
    
      
//       // Indicate where to init the editor. You can also pass an HTMLElement
//       container: '#gjs',
//       // Get the content for the canvas directly from the element
//       // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
//       fromElement: true,
//       // Size of the editor
//       height: '300px',
//       width: 'auto',
//       // Disable the storage manager for the moment
//       // storageManager: false,
//       // Avoid any default panel
//       panels: { defaults: [] },
//       blockManager: {
//           appendTo:'#blocks',
//           // appendTo: document.getElementById("blocks"),
//           blocks: [
//             {
//               id: 'section', // id is mandatory
//               label: '<b>Section</b>', // You can use HTML/SVG inside labels
//               attributes: { class:'gjs-block-section' },
//               content: `<section>
//                 <h1>This is a simple title</h1>
//                 <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
//               </section>`,
//             }, {
//               id: 'text',
//               label: 'Text',
//               content: '<div data-gjs-type="text">Insert your text here</div>',
//             }, {
//               id: 'image',
//               label: 'Image',
//               // Select the component once it's dropped
//               select: true,
//               // You can pass components as a JSON instead of a simple HTML string,
//               // in this case we also use a defined component type `image`
//               content: { type: 'image' },
//               // This triggers `active` event on dropped components and the `image`
//               // reacts by opening the AssetManager
//               activate: true,
//             }
//           ]
//         },
        
//     });
    
    
  
  
//     editor.BlockManager.add('my-block-id', {
//       // label: '...',
//       // category: '...',
//       // // ...
//       content: {
//         tagName: 'div',
//         draggable: false,
//         attributes: { 'some-attribute': 'some-value' },
//         components: [
//           {
//             tagName: 'span',
//             content: '<b>Some static content</b>',
//           }, {
//             tagName: 'div',
//             // use `content` for static strings, `components` string will be parsed
//             // and transformed in Components
//             components: '<span>HTML at some point</span>',
//           }
//         ]
//       }
//     });
//     editor.Commands.add('set-device-desktop', {
//       run: editor => editor.setDevice('Desktop')
//     });
//     editor.Commands.add('set-device-mobile', {
//       run: editor => editor.setDevice('Mobile')
//     });
//     editor.Commands.add('show-traits', {
//       getTraitsEl(editor) {
//         const row = editor.getContainer().closest('.editor-row');
//         return row.querySelector('.traits-container');
//       },
//       run(editor, sender) {
//         this.getTraitsEl(editor).style.display = '';
//       },
//       stop(editor, sender) {
//         this.getTraitsEl(editor).style.display = 'none';
//       },
//     });
//     editor.Commands.add('show-layers', {
//       getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
//       getLayersEl(row) { return row.querySelector('.layers-container') },
    
//       run(editor, sender) {
//         const lmEl = this.getLayersEl(this.getRowEl(editor));
//         lmEl.style.display = '';
//       },
//       stop(editor, sender) {
//         const lmEl = this.getLayersEl(this.getRowEl(editor));
//         lmEl.style.display = 'none';
//       },
//     });
//     editor.Commands.add('show-styles', {
//       getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
//       getStyleEl(row) { return row.querySelector('.styles-container') },
    
//       run(editor, sender) {
//         const smEl = this.getStyleEl(this.getRowEl(editor));
//         smEl.style.display = '';
//       },
//       stop(editor, sender) {
//         const smEl = this.getStyleEl(this.getRowEl(editor));
//         smEl.style.display = 'none';
//       },
//     });
//     editor.Panels.addPanel({
//       id: 'panel-top',
//       el: '.panel__top',
//     });
//     editor.Panels.addPanel({
//       id: 'basic-actions',
//       el: '.panel__basic-actions',
//       buttons: [
//         {
//           id: 'visibility',
//           active: true, // active by default
//           className: 'btn-toggle-borders',
//           label: '<u>B</u>',
//           command: 'sw-visibility', // Built-in command
//         }, {
//           id: 'export',
//           className: 'btn-open-export',
//           label: 'Exp',
//           command: 'export-template',
//           context: 'export-template', // For grouping context of buttons from the same panel
//         }, {
//           id: 'show-json',
//           className: 'btn-show-json',
//           label: 'JSON',
//           context: 'show-json',
//           command(editor) {
//             editor.Modal.setTitle('Components JSON')
//               .setContent(`<textarea style="width:100%; height: 250px;">
//                 ${JSON.stringify(editor.getComponents())}
//               </textarea>`)
//               .open();
//           },
//         }
//       ],
//     });
//     editor.on('run:export-template:before', opts => {
//       console.log('Before the command run');
//       if (0 /* some condition */) {
//         opts.abort = 1;
//       }
//     });
//     editor.on('run:export-template', () => console.log('After the command run'));
//     editor.on('abort:export-template', () => console.log('Command aborted'));
//     editor.on('change:device', () => console.log('Current device: ', editor.getDevice()));
//     editor.setDevice('Desktop');
    
//   }, []);
//   // The wrapper is the root Component
//   // const wrapper = editor.DomComponents.getWrapper();
//   // const myComponent = wrapper.find('div.my-component')[0];
//   // myComponent.components().forEach(component => /* ... do something ... */);
//   // myComponent.components('<div>New content</div>');
  
//   return (
//     // <MainLayout title="Профайл">
//     <div>
//         <div class="panel__top">
//             <div class="panel__basic-actions"></div>
//             <div class="panel__devices"></div>
//             <div class="panel__switcher"></div>
//         </div>
//         <div class="editor-row">
//           <div class="editor-canvas">
//             <div id="gjs">
//                 <h1>Hello World Component!</h1>
//             </div>
//           </div>
//           <div class="panel__right">
//             <div class="layers-container"></div>
//             <div class="styles-container"></div>
//             <div class="traits-container"></div>
//           </div>
//         </div>
//         <div id="blocks"></div>
//         <div id="my-block-id"></div>
//     </div>
//     // </MainLayout>
//   )
// }

// export default MyComponent;


import React , {useEffect , useState} from "react";
import grapesjs from 'grapesjs';
import gjsPresentWebPage from "grapesjs-preset-webpage"
function App() {
  const [editor , setEditor] = useState(null);
  const getHtml = () =>{
    console.log(JSON.stringify(editor.getComponents()))
  }
  useEffect(()=>{
    
    const editor = grapesjs.init({
      container: "#editor",
      // storageManager: {
      //   type: 'remote',
      //   stepsBeforeSave: 3,
      //   urlStore: 'http://endpoint/store-template/some-id-123',
      //   urlLoad: 'http://endpoint/load-template/some-id-123',
      //   // For custom parameters/headers on requests
      //   params: { _some_token: '....' },
      //   headers: { Authorization: 'Basic ...' },
      // },
      // storageManager: {
      //   id: 'gjs-',             // Prefix identifier that will be used on parameters
      //   type: 'local',          // Type of the storage
      //   autosave: true,         // Store data automatically
      //   autoload: true,         // Autoload stored data on init
      //   stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
      // },
      storageManager: {
        id: 'gjs-', 
        type: 'remote',
        stepsBeforeSave: 3,
        contentTypeJson : true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        // storeCss: true, 
        // urlStore : `http://localhost:8080/api/cms/pages/${location.pathname.split('/')[2]}`,
        // urlLoad : `http://localhost:8080/api/cms/pages/${location.pathname.split('/')[2]}`,
        urlStore: 'http://localhost:8080/api/cms/pages',
        urlLoad: 'http://localhost:8080/api/cms/pages',
        // For custom parameters/headers on requests
        // params: { _some_token: '....' },
        headers: { 
          'Content-Type' : 'application/Json'
        },
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
    // editor.addComponents(`<div>
    //   <img src="https://path/image" />
    //   <span title="foo">Custom component</span>
    // </div>`);
    setEditor(editor);
    // const am = editor.AssetManager;
    // am.add([
    //   {
    //     category: 'c1',
    //     src: 'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
    //   }, {
    //     category: 'c1',
    //     src: 'http://placehold.it/350x250/459ba8/fff/image2.jpg',
    //   }, {
    //     category: 'c2',
    //     src: 'http://placehold.it/350x250/79c267/fff/image3.jpg',
    //   }
    // ]);
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

export default App;