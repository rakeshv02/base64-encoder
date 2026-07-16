import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);

  const handleEncode = (text) => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setOutput(encoded);
    } catch (error) {
      setOutput('Error encoding. Try again.');
    }
  };

  const handleDecode = (text) => {
    try {
      const decoded = decodeURIComponent(escape(atob(text)));
      setOutput(decoded);
    } catch (error) {
      setOutput('Error decoding. Invalid Base64.');
    }
  };

  const handleChange = (text) => {
    setInput(text);
    if (mode === 'encode') {
      handleEncode(text);
    } else {
      handleDecode(text);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInput('');
    setOutput('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-4">
      <div className="max-w-3xl mx-auto py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Base64 Encoder</h1>
          <p className="text-gray-400">Encode and decode Base64 strings instantly. Essential for APIs, emails, and data encoding.</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={toggleMode}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
          >
            Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
          </button>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="w-full h-32 px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-gray-500 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Output */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-3 bg-slate-800 border border-slate-700 text-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            disabled={!output}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy Result'}
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Info */}
        <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-3">What is Base64?</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Base64 is a binary-to-text encoding scheme that converts binary data into ASCII text format. It's widely used in APIs, email systems, and data transmission where binary data needs to be represented as text.
          </p>
        </div>
      </div>

      {/* AdSense Ad Placeholder */}
      <div className="max-w-3xl mx-auto mt-12">
        <div className="bg-slate-800 border border-slate-700 rounded p-4 text-center text-gray-500 text-sm">
          [AdSense Ad Space]
        </div>
      </div>
    </div>
  );
}
