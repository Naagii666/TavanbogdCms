import { Editor, Frame, Element } from '@craftjs/core';
// import { Typography, Paper, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import dynamic from 'next/dynamic';
const DynamicComponent = dynamic(() => import('./MyComponent'), { ssr: false })

// const useStyles = makeStyles(() => ({
//   root: {
//     padding: 0,
//     background: 'rgb(252, 253, 253)',
//   },
// }));
export default function App() {
  // const classes = useStyles();

  
  return (
    <div style={{ margin: '0 auto', width: "100%" }}>
         <DynamicComponent />
    </div>
  );
}

// import React , {useEffect , useState} from "react";
// import { grapesjs } from "grapesjs";

// function App() {
//   const [editor , setEditor] = useState(null);
//   useEffect(()=>{
//     const editor = grapesjs.init({
//       container: "#editor",

//     })
//     setEditor(editor)
//   } ,[])
//   return(
//     <div className="App">
//       <div id="editor">

//       </div>
//     </div>
//   )
// }

// export default App;



