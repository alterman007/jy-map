import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        iShowPrevButton: state.cmpStatus.iShowPrevButton
    }
}

const PrevButton = ({iShowPrevButton, prevHandleClick}) => {
    return (
        <>
        {
            iShowPrevButton && 
            <button  
                onClick={prevHandleClick}
                style={{
                    background: "#68e0fb",
                    borderRadius: 10,
                    outline: 'none',
                    fontSize: 18,
                    width: 80,
                    textAlign:'center',
                    letterSpacing: 2,
                    marginLeft: 20,
                    cursor: 'pointer',
                    border: 'none'
                }}
            >上一级</button>
        }
        </>
    )
}

export default connect(mapStateToProps)(PrevButton);