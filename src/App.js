import './Styles.scss'
import { FaClipboard } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  number,
  upperCaseLetters,
  lowerCaseLettters,
  specialCharacters
} from './Character'
import { COPY_SUCCESS, ALERT } from './Message'


function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(20);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const copyBtn = useRef();

  const handleGeneratePassword = () => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      notifs(ALERT, true)
    }

    let characterList = '';
    if (uppercase) {
      characterList += upperCaseLetters;
    }
    if (lowercase) {
      characterList += lowerCaseLettters;
    }
    if (numbers) {
      characterList += number;
    }
    if (symbols) {
      characterList += specialCharacters;
    }
    setPassword(passwordCreator(characterList));
  }

  useEffect(() => {
    handleGeneratePassword();
  }, [])

  const passwordCreator = (characterList) => {
    let password = '';
    let characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = getRandomIndex(characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  }

  const getRandomIndex = (limit) => {
    return Math.round(Math.random() * limit);
  }

  const copyFromClipBoard = () => {
    const newTextArea = document.createElement('textarea');
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand('copy');
    newTextArea.remove();

    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false;
    }, [3000]);
  }

  const notifs = (message, Error = false) => {
    if (Error) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  };

  const handleCopy = () => {
    copyFromClipBoard();
    notifs(COPY_SUCCESS, false);
  }


  return (
    <div className="container">
      <div className='generator'>
        <h2 className='generator_header'>Password Generator</h2>
        <div className='generator_password'>
          {password}
          <button className='generator_passwordGenerateBtn' ref={copyBtn} onClick={handleCopy}>
            <FaClipboard className='clipboard_icon' />
          </button>
          <ToastContainer />
        </div>

        <div className='form-group'>
          <label htmlFor='password-length'>Password Length</label>
          <input 
            name='password-length' 
            id='password-length' 
            type='number'
            max='20'
            min='7'
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='uppercase-letters'>Include Uppercase Letter</label>
          <input 
            id='uppercase-letter'
            name='uppercase-letter'
            type='checkbox'
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
          <input 
            id='lowercase-letters'
            name='lowercase-letters'
            type='checkbox'
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='include-numbers'>Include Numbers</label>
          <input 
            id='include-numbers'
            name='include-numbers'
            type='checkbox'
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='include-symbols'>Include Symbols</label>
          <input 
            id='include-symbols'
            name='include-symbols'
            type='checkbox'
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
          />
        </div>

        <button className='generator_btn' onClick={handleGeneratePassword}>Generate New Password</button>
      </div>
    </div>
  );
}

export default App;
