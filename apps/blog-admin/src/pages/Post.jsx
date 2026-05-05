export default function Post() {
    return (
        <>
            <article>
                <h1>Edit Post</h1>
                <form action="">
                    <label htmlFor="title">
                        Post Title
                        <input type="text" name="title" id="" />
                    </label>
                    <label htmlFor="content">
                        Post Content
                        <textarea name="content" id="content"></textarea>
                    </label>
                    <label htmlFor="published">
                        <input
                            type="checkbox"
                            name="published"
                            id="published"
                        />{" "}
                        Publish?
                    </label>
                    <input type="submit" value="Save" />
                </form>
                <div></div>
            </article>
        </>
    );
}
