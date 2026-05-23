'use client'

import { useState } from 'react'

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div key={i} className={`faq-item${openIndex === i ? ' active' : ''}`}>
          <button
            className="faq-question"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
            type="button"
          >
            {item.question}
            <span className="faq-icon">{openIndex === i ? '−' : '+'}</span>
          </button>
          {openIndex === i && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
