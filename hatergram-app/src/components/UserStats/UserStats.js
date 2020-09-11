import React from 'react'

import "./UserStats.css"

function UserStats({posts, followers, following}) {
    return (
        <div className="userstats__stats">
            <div>
                <h1>{posts.length}</h1>
                <h1>Posts</h1>
            </div>
            <div>
                <h1>{following.length}</h1>
                <h1>Following</h1>
            </div>
            <div>
                <h1>{followers.length}</h1>
                <h1>Followed</h1>
            </div>
        </div>
    )
}

export default UserStats
