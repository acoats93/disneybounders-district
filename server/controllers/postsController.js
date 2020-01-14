async function allPosts(req, res) {
    const db = req.app.get("db");
    const posts = await db.posts.getAllPosts();
    res.status(200).json(posts)
}

async function addPost(req, res) {
    const { caption, date_posted, img } = req.body;
    const user_id = req.session.user.user_id;
    const db = req.app.get("db");
    const addedPost = await db.posts.addPost([caption, date_posted, img, user_id]);
    console.log(addedPost)
    res.status(200).json(addedPost)
}

async function editPost(req, res) {
    const { caption } = req.body;
    const post_id = +req.params.post_id;
    const user_id = req.session.user.user_id;
    const db = req.app.get("db");
    const editedPost = await db.posts.editPost([
        caption,
        post_id,
        user_id
    ])
    res.status(200).json(editedPost);
}

async function deletePost(req, res) {
    const post_id = +req.params.post_id;
    const user_id = req.session.user.user_id;
    const db = req.app.get("db");
    const updatedPosts = await db.posts.deletePost([post_id, user_id])
    res.status(200).json(updatedPosts);
}

async function allMyPosts(req, res) {
    const user_id = req.session.user.user_id;
    const db = req.app.get("db");
    const posts = await db.posts.getAllMyPosts(user_id)
    res.status(200).json(posts);
}

module.exports = {
    allPosts,
    addPost,
    editPost,
    deletePost,
    allMyPosts
}