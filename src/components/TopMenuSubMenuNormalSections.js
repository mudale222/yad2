

import React from 'react'
import NadlanDropDownContent from './NadlanDropDownContent'
import CarDropDownContent from './CarDropDownContent'

const TopMenuSubMenuNormalSections = () => {
    const carNormalSubMenuButtons = ["פרטי", "מסחרי", "ג'יפים", "אופנועים", "אופנועים", "קטנועים", "משאיות", "כלי שיט", "מיוחדים", "אביזרים"]

    const renderButtons = () => {
        return carNormalSubMenuButtons.reverse().map((carName) => (
            <li>{carName}</li>
        ))
    }

    return (
        <div className="normal-topBar-wrapper">
            {renderButtons()}
        </div>
    )
}

export { TopMenuSubMenuNormalSections as default }
