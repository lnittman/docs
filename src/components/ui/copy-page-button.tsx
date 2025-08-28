'use client';

import { Check, Copy } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';

export function CopyPageButton() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      // Get the main content element
      const content = document.querySelector('article');
      if (!content) {
        return;
      }

      // Get text content, preserving some structure
      const textContent = content.innerText || content.textContent || '';

      await navigator.clipboard.writeText(textContent);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (_err) {}
  };

  return (
    <Button className="gap-1.5" onClick={handleCopy} size="sm" variant="ghost">
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          <span>copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>copy page</span>
        </>
      )}
    </Button>
  );
}
