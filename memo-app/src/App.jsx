import { useEffect, useState } from 'react'
import './App.css'

const CATEGORIES = ['仕事', '個人', 'アイデア']
const STORAGE_KEY = 'memos'

const loadMemos = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return parsed.map((memo) => ({ ...memo, createdAt: new Date(memo.createdAt) }))
  } catch {
    return []
  }
}

function App() {
  const [text, setText] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [memos, setMemos] = useState(loadMemos)
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [filterCategory, setFilterCategory] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos))
  }, [memos])

  const handleAdd = () => {
    if (text.trim() === '') return

    const newMemo = {
      id: Date.now(),
      text,
      category,
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

  const displayedMemos = filterCategory
    ? memos.filter((memo) => memo.category === filterCategory)
    : memos

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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>追加</button>
      </div>
      <div className="category-filter">
        <button
          className={filterCategory === null ? 'active' : ''}
          onClick={() => setFilterCategory(null)}
        >
          すべて
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={filterCategory === c ? 'active' : ''}
            onClick={() => setFilterCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="memo-list">
        {displayedMemos.map((memo) => (
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
                <span className="memo-category">{memo.category}</span>
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
