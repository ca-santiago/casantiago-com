"use client";
import React from 'react';
import * as sanitizeHtml from 'sanitize-html';
import hljs from 'highlight.js';

import './content.css';
import 'highlight.js/styles/atom-one-dark.css';

const RenderRawEntry = ({ title, content }) => {

  React.useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className='content-container'>
      {/* <h3 className='ml-2'>getHTML and setInner</h3>
      <div className='m-2 border p-3 rounded-md border-slate-300'> */}
      <section id="content-heading" dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }}></section>
      <section id="content-body" dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}></section>
      {/* </div> */}
    </div>
  );
}

export default RenderRawEntry;
