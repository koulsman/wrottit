export default function Posts({community, title, user, content, images}) {
    return (
       
        <div>
            <p className="community">
              {community}
            </p>
            <h1 className="title">
             {title}
            </h1>
            <p className="user">
            {user}
            </p>
            <div className="content">
            {content}
            </div>
            <div className= "images">
            {images}
            </div>
        </div>
        
    )
}