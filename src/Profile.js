import React from 'react'

class Profile extends React.Component {
    state = {
        name: this.props.currentUser.name,
        email: this.props.currentUser.email
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        // TODO: make a fetch request to edit the current user
        fetch("http://localhost:3000/profile", {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
            .then(r => r.json())
            .then(updatedUser => {
                // then update that user in state in our App component
                this.props.updateUser(updatedUser)
            })
    }

    render() {
        const { name, email } = this.state
        // const { name} = this.props.currentUser

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>{name}'s Profile</h1>

                <label>name</label>
                <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={this.handleChange}
                />

                <label>email</label>
                <textarea
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                />

                <input type="submit" value="Update" />
            </form>
        )
    }
}

export default Profile