import React from 'react'
import DreamCard from './Components/Main/RIght/DreamCard';


class MainContainer extends React.Component {
    mapDreams() {
        return this.props.comment.map((comment) => (
            <DreamCard
            key={comment.id} 
            comment={comment}
            
            />
        ))
    }

    render() { 
        
    return(
        <>
        {this.mapDreams()}
        </>
    )
    }
}
export default MainContainer