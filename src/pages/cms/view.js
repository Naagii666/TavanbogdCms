import React from 'react';
import dynamic from 'next/dynamic';
const DynamicComponent = dynamic(() => import('./MyComponent'), { ssr: false })

export default function View() {
  
  return (
    <div style={{ margin: '0 auto', width: "100%" }}>
         <DynamicComponent />
    </div>
  );
}




