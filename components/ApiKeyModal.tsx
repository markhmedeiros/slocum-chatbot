import React, { useState } from 'react';

interface ApiKeyModalProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Activate Chatbot</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Please enter your Google Gemini API key to begin.
            </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              API Key
            </label>
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="mt-1 block w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D13E2C] transition duration-200"
              required
              aria-label="Google Gemini API Key"
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D13E2C] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D13E2C] disabled:bg-opacity-50"
            disabled={!apiKey.trim()}
          >
            Save & Start Chat
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Your API key is stored only in your browser's session storage and is never sent to our servers.</p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#D13E2C] hover:text-red-700"
          >
            Get your API key from Google AI Studio &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
