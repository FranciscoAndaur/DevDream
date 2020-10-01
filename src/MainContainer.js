import React from 'react'
import DreamCard from './Components/Main/RIght/DreamCard';


class MainContainer extends React.Component {
    mapDreams() {
        return this.props.posts.reverse().map((dream) => (
            <DreamCard
            key={dream.id} 
            dream={dream}
            user={this.props.currentUser}
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