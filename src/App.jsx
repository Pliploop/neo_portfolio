import React from 'react';
import DitherField from './fx/DitherField';

export default function App() {
  return (
    <div data-testid="app-root" className="min-h-screen grid place-items-center">
      <div className="w-[480px] h-[480px] blob-1"><DitherField seed={7} /></div>
    </div>
  );
}
