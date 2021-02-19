import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  let [loading, setLoading] = useState(true)
  let [tours, setTours] = useState([])

  let removeTour = (id) => {
    let newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  let fetchTours = async () => {
    setLoading(true)

    try {
      let response = await fetch(url)
      let tours = await response.json()
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTours()
  }, [])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <div className='title'>
        <h2>no tours left</h2>
        <button className='btn' onClick={fetchTours}>
          refresh
        </button>
      </div>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
