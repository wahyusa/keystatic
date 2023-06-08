import { ReactNode } from 'react';
import { VoussoirProvider } from '@voussoir/core';

export function FrameComponent({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="my-2 px-6 py-8 bg-keystatic-gray-light rounded-lg">
      <VoussoirProvider colorScheme="light" scale="medium">
        {children}
      </VoussoirProvider>
    </div>
  );
}