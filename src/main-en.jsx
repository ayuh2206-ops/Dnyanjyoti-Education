import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './shared/App';
import { content, COLLECTION, SETTINGS, LANGUAGE } from './content/en';
import './style.css';

const root = createRoot(document.getElementById('root'));
root.render(<App content={content} COLLECTION={COLLECTION} SETTINGS={SETTINGS} LANGUAGE={LANGUAGE} />);
