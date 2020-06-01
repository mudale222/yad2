import React from 'react'

const TopMenuSubMenuSpecialSections = () => {
    const carSpecialSubMenuButtons = [{ name: "מחירון רכב", path: "" }, { name: "מכרזים וכינוסים", path: "" }, { name: "מימון רכב", path: "" }]

    const renderButtons = () => {
        return carSpecialSubMenuButtons.reverse().map((nameAndSymbol) => (
            <>
                <li>{nameAndSymbol.name}</li>
                {
                    nameAndSymbol.path !== "" ?
                        <img src={nameAndSymbol.path} alt={nameAndSymbol.name} className="top-subMenu-small-icon" ></img>
                        : ""
                }
            </>
        ))
    }

    return (
        <div className="special-topBar-wrapper">
            {/* <li>אזור אישי</li>
            <img src="person.png" className="top-menu-small-icon person-png"></img>
            <li>מודעות שמורות</li>
            <img src="heart.png" className="top-menu-small-icon heart-png"></img>
            <li>חיפושים אחרונים</li>
            <img src="search.png" className="top-menu-small-icon search-png"></img>
            <li>השוואת רכבים</li>
            <img src="arrows.png" className="top-menu-small-icon arrows-png"></img>*/}
            {renderButtons()}
        </div>
    )
}

export { TopMenuSubMenuSpecialSections as default }
