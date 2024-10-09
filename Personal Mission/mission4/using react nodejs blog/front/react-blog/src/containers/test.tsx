import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, RotateCw, X } from "lucide-react";

interface WebBrowserProps {
  url: string;
  onUrlSubmit: (url: string) => void;
  onClose: () => void;
}

const WebBrowser: React.FC<WebBrowserProps> = ({
  url,
  onUrlSubmit,
  onClose,
}) => {
  const [inputUrl, setInputUrl] = useState(url);
  const [currentUrl, setCurrentUrl] = useState(url);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setInputUrl(url);
    setCurrentUrl(url);
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let processedUrl = inputUrl;
    if (!inputUrl.startsWith("http://") && !inputUrl.startsWith("https://")) {
      processedUrl = `https://${inputUrl}`;
    }
    setCurrentUrl(processedUrl);
    onUrlSubmit(processedUrl);
  };

  const handleBack = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.history.back();
    }
  };

  const handleForward = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.history.forward();
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      <div className="flex items-center space-x-2 p-2 bg-gray-100">
        <button onClick={handleBack} className="p-1 hover:bg-gray-200 rounded">
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleForward}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <ArrowRight size={20} />
        </button>
        <button
          onClick={handleRefresh}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <RotateCw size={20} />
        </button>
        <form onSubmit={handleSubmit} className="flex-grow">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            placeholder="Enter URL"
          />
        </form>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
          <X size={20} />
        </button>
      </div>
      <div className="flex-grow">
        <iframe
          ref={iframeRef}
          src={currentUrl}
          className="w-full h-full border-none"
          title="Web Browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default WebBrowser;
