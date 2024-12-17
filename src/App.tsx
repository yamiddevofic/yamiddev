import React from 'react'
import { Layout } from './components/templates/Layout.tsx'
import { HomePage } from './components/pages/HomePage.tsx'
import './App.css'

function App() {

  return (
    <>
      <Layout>
        <HomePage />
      </Layout>
    </>
  )
}

export default App
