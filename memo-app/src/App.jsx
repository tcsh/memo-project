import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [memos, setMemos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

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

  const handleDelete = (id) => {
    setMemos(memos.filter((memo) => memo.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setEditingText('')
    }
  }

  const handleEditStart = (memo) => {
    setEditingId(memo.id)
    setEditingText(memo.text)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditingText('')
  }

  const handleEditSave = () => {
    if (editingText.trim() === '') return

    setMemos(
      memos.map((memo) =>
        memo.id === editingId ? { ...memo, text: editingText } : memo
      )
    )
    setEditingId(null)
    setEditingText('')
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave()
    } else if (e.key === 'Escape') {
      handleEditCancel()
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
            {editingId === memo.id ? (
              <>
                <input
                  type="text"
                  className="memo-edit-input"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  autoFocus
                />
                <div className="memo-actions">
                  <button onClick={handleEditSave}>保存</button>
                  <button onClick={handleEditCancel}>キャンセル</button>
                </div>
              </>
            ) : (
              <>
                <p className="memo-text">{memo.text}</p>
                <time className="memo-date">
                  {memo.createdAt.toLocaleString('ja-JP')}
                </time>
                <div className="memo-actions">
                  <button onClick={() => handleEditStart(memo)}>編集</button>
                  <button onClick={() => handleDelete(memo.id)}>削除</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
