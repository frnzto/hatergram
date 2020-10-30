import React, { useState, useEffect } from 'react'

import "./DarkModeToggler.css"

function DarkModeToggler() {
    const checkDarkMode = localStorage.getItem("DarkMode")
    const [darkMode , setDarkMode]= useState(checkDarkMode === "true" ? true : false)

    let root= document.documentElement
    console.log(checkDarkMode)
    const toggle=()=>{
        if(darkMode){
            localStorage.setItem("DarkMode", false)
            setDarkMode(prevState => !prevState)
        }else{
            localStorage.setItem("DarkMode", true)
            setDarkMode(prevState => !prevState)
        }
    }
    const changeToDarkColors = () => {
        root.style.setProperty('--body-bg-color', "#18191a")
        root.style.setProperty('--text-color', "#a8abaf")
        root.style.setProperty('--logo-color', "#a8abaf")
        root.style.setProperty('--form-main-color', "#242526")
        root.style.setProperty('--form-main-color-hover', "#3a3b3c")
        root.style.setProperty('--username-caption-color', "#e4e6eb")
        root.style.setProperty('--white-color', "#3a3b3c")
        root.style.setProperty('--comments-text-color', "#e4e6eb")

    }

    const changeToLightColors = () => {
        root.style.setProperty('--body-bg-color', " #f3f6f6")
        root.style.setProperty('--text-color', "#eb6678")
        root.style.setProperty('--logo-color', "#2a363b")
        root.style.setProperty('--form-main-color', "#acdbdf")
        root.style.setProperty('--form-main-color-hover', "#c4ebf0")
        root.style.setProperty('--username-caption-color', "#2a363b")
        root.style.setProperty('--white-color', "white")
        root.style.setProperty('--comments-text-color', "#546b75")


        
    }
    
        
    darkMode ? changeToDarkColors() :changeToLightColors()

    return (
        
        <div  className={`toggler__container ${darkMode ? "night": ""}`}>
            <div onClick={toggle} className={`toggler__notch ${darkMode ? "night": ""}`}></div>
        </div>
    )
}

export default DarkModeToggler 
