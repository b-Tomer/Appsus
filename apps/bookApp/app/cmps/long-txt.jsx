const { useState } = React

export function LongTxt({ text }) {
  if(!text) return
  const isMoreThan100 = (text.length >= 100)
  const [showAll, setShowAll] = useState(false)

  return (
    <section>
      <h1>{(isMoreThan100 && !showAll) ? text.slice(0, 100) + '...' : text}</h1>
      {!isMoreThan100 ? null : (
        <button onClick={() => setShowAll(!showAll)}>
          {(isMoreThan100 && !showAll) ? 'Read more..' : 'Read less...'}{' '}
        </button>
      )}
    </section>
  )
}
