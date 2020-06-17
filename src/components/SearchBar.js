import React from 'react';
import { connect } from 'react-redux';
import { updateCarSearchParmas } from '../actions/actions'
import { onOffDropList } from '../logic/onOffDropList'
import { makersAndModels, areas } from '../other/utilities'

const SearchBar = (props) => {
    let counter = 0;

    const renderYears = () => {
        let years = []
        for (let i = 1971; i <= 2020; i++)
            years.push(i)
        return years.reverse().map(year => (
            <li key={++counter}>{year}</li>
        ))
    }

    const updateSearchParams = (e, propName, theProp) => {
        // console.log("TTTTT", e.target.parentNode.textContent, e.target.checked)
        if (!(e.target.checked)) {
            const makerArrWithoutUncheckedItem = theProp.filter(maker => maker !== e.target.parentNode.textContent)
            props.dispatch(updateCarSearchParmas({ [propName]: [...makerArrWithoutUncheckedItem] }))
        } else
            props.dispatch(updateCarSearchParmas({ [propName]: [...theProp, e.target.parentNode.textContent] }))
    }

    const submitForm = (e) => {
        // e.preventDefault()
        // const formValues = {
        //     maker: e.target[24].value,
        //     model: e.target[23].value,
        //     fromYear: e.target[14].value,
        //     toYear: e.target[5].value,
        //     fromPrice: e.target[4].value,
        //     toPrice: e.target[3].value,
        //     area: e.target[2].value
        // }
        // console.log(JSON.stringify(formValues))
        // throw new Error()
    }


    return (
        <div className="search-bar-div">
            <form className="search-form" onSubmit={submitForm}>
                <h3><span>?איזה רכב תרצו לחפש</span></h3>
                <ul className="search-columns">
                    <li className="search-button-li"><button type="submit" className="search-button">
                        <span className="button_content"><i className="y2i_search"></i> <span className="button_text">חיפוש</span>
                        </span></button>
                    </li>
                    <li><div className="dropdown_btn"><button type="button" className="advance-search">
                        <span className="button_content"><i className="y2i_plus_o"></i>
                            <span className="button_text">חיפוש מתקדם</span></span></button></div>
                    </li>
                    <li>אזור
                    <input className="search-bar-input" type="text" name="" autoComplete="off" placeholder="בחרו אזור" title=""
                            onClick={() => onOffDropList(".area")} ></input>
                        <ul className="searchBarDropDown area hidden" onChange={(e) => {
                            updateSearchParams(e, "area", props.carSearchParmas.area)
                        }}>
                            {areas.map((oneArea) => {
                                const zonesLi = oneArea.zones.map((oneZone) => (
                                    <li><input key={oneZone} type="checkbox" />{oneZone}</li>
                                ))
                                zonesLi.unshift(<li><b><input key={oneArea.region} type="checkbox" />{oneArea.region}</b></li>)
                                return zonesLi
                            })}
                        </ul>
                    </li>
                    <li>מחיר בש"ח
                    <div className="search-bar-input-wrapper">
                            <input className="search-bar-input-double" type="text" name="" autoComplete="off" placeholder="עד מחיר"
                                onChange={(e) => props.dispatch(updateCarSearchParmas({ toPrice: e.target.value }))}></input>
                            <input className="search-bar-input-double" type="text" name="" autoComplete="off" placeholder="ממחיר"
                                onChange={(e) => props.dispatch(updateCarSearchParmas({ fromPrice: e.target.value }))}></input>
                        </div>
                    </li>
                    <li>שנה
                    <div className="search-bar-input-wrapper">
                            <li>
                                <input className="search-bar-input-double" type="text" name="" autoComplete="off" placeholder="עד שנה"
                                    onClick={() => onOffDropList(".toYear")}></input>
                                <ul className="searchBarDropDown toYear hidden" onClick={(e) => {
                                    props.dispatch(updateCarSearchParmas({
                                        toYear: e.target.innerText
                                    }))
                                }}>
                                    {renderYears()}
                                </ul>
                                <input className="search-bar-input-double" type="text" name="" autoComplete="off" placeholder="משנה"
                                    onClick={() => onOffDropList(".fromYear")} ></input>
                                <ul className="searchBarDropDown fromYear hidden" onClick={(e) => {
                                    props.dispatch(updateCarSearchParmas({
                                        fromYear: e.target.innerText
                                    }))
                                }}>
                                    {renderYears()}
                                </ul>
                            </li>
                        </div>
                    </li>
                    <li>דגם
                    <input className="search-bar-input" type="text" name="" autoComplete="off" placeholder="בחרו דגם" title=""
                            onClick={() => onOffDropList(".model")} ></input>
                        <ul className="searchBarDropDown model hidden" onChange={(e) => {
                            updateSearchParams(e, "model", props.carSearchParmas.model)
                        }} >
                            {props.carSearchParmas.maker !== "" && props.carSearchParmas.maker !== undefined &&
                                makersAndModels.map((oneMakerModel) => {
                                    if (props.carSearchParmas.maker.includes(oneMakerModel.maker)) {
                                        return oneMakerModel.models.map((oneModel) => (
                                            <li key={++counter}><input key={++counter} type="checkbox" />{oneModel}</li>
                                        ))
                                    }
                                })}
                        </ul>
                    </li>
                    <li>יצרן
                        <input className="search-bar-input" placeholder="בחרו יצרן" onClick={() => onOffDropList(".maker")}></input>
                        <ul className="searchBarDropDown maker hidden" onChange={(e) => {
                            updateSearchParams(e, "maker", props.carSearchParmas.maker)
                        }}>
                            {makersAndModels.map((oneMakerModel) => (
                                <li><input key={oneMakerModel.maker} type="checkbox" />{oneMakerModel.maker}</li>
                            ))}
                        </ul>
                    </li>
                </ul>

            </form>
        </div >
    )
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(SearchBar);