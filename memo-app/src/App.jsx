import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [memos, setMemos] = useState([])

  const handleAdd = () => {
    if (text.trim() === '') return

    const newMemo = {
      id: Date.now(),
      text,
      createdAt: new Date(),
    }
    setMemos([newMemo, ...memos])
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div id="app">
      <h1>メモアプリ</h1>
      <div className="memo-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="メモを入力"
        />
        <button onClick={handleAdd}>追加</button>
      </div>
      <ul className="memo-list">
        {memos.map((memo) => (
          <li key={memo.id} className="memo-item">
            <p className="memo-text">{memo.text}</p>
            <time className="memo-date">
              {memo.createdAt.toLocaleString('ja-JP')}
            </time>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
