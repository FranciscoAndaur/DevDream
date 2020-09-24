import React from 'react'
import DreamCard from './Components/Main/RIght/DreamCard';


class MainContainer extends React.Component {
    mapDreams() {
        return this.props.posts.map((post) => (
            <DreamCard
            key={post.id} 
            post={post}
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