/* jshint esversion: 11 */

import { useState, useCallback, useEffect, useRef } from "react"

function App() {

  const [length, setLength] = useState('8')
  const [numbers, setNumbers] = useState('false')
  const [characters, setCharacters] = useState('false')
  const [password, setPassword] = useState('')

  const generatePassword = useCallback(

    () => {

      let string = "abcdefghijklmnopqrstuvwxyzABCEDFGHIJKLMNOPRSTUVWXY"
      let result = ''
      
      if(numbers){
        string += "0123456789"
      }
  
      if(characters){
        string += "!@#$%^&*()_+"
      }
  
      for (let i = 0; i < length; i++) {
        const char = Math.floor(Math.random() * string.length + 1)
        result += string.charAt(char)      
      }
  
      setPassword(result)
  
    }
    
    ,[length, numbers, characters, setPassword])

    useEffect(() => {
      generatePassword()
    }, [length, numbers, characters, generatePassword])

    const passwordRef = useRef()

    const copyToClipboard = useCallback(() => {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
    }, [password])

  return (
    <>
      <div className="max-w-3xl bg-gray-700 color text-white text-center m-auto mt-5 p-5 rounded-lg">
        <h1 className="text-2xl">Password generator</h1>
        <div className="max-w-2xl flex mt-4">
          <input 
          name="Password"
          placeholder="your password"
          className="min-w-full p-3 rounded-l-xl text-gray-950"
          value={password}
          readOnly
          />
          <button 
          className="bg-blue-500 px-3 rounded-r-xl hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={copyToClipboard}
          >Copy</button>
        </div>
        <div className="mt-3 flex">
          <div className="flex-1">
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => {setLength(e.target.value)}}
            ref={passwordRef}
            />
            <label className="text-lg ml-2">Length ({length})</label>
          </div>
          <div className="flex-1">
            <input 
            type="checkbox"
            defaultChecked={numbers}
            id="numberInput"
            onChange={() => {setNumbers((prev) => !prev)}}
            />
            <label className="text-lg ml-2">Numbers</label>
          </div>
          <div className="flex-1">
            <input 
            type="checkbox"
            defaultChecked={characters}
            id="characterInput"
            onChange={() => {setCharacters((prev) => !prev)}}
            />
            <label className="text-lg ml-2">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
