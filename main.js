const root = document.querySelector('.react-root');

let Greeting = ({ person }) =>
    <h1 className="greeting">Hello {person}!</h1>
let Title = () => <h1>React</h1>
let Footer = () => <footer>Copyright 2018</footer>

let DeleteBlogButton = ({ blog, removeBlog }) =>
    <button
        className="big-red"
        onClick={() => removeBlog(blog)}
    >Remove Blog
    </button>

let EditBlogButton = ({ blog, editBlog }) =>
    <button
        className="big-red"
        onClick={() => editBlog(blog)}
    >Edit Blog
    </button>

let EditBlogForm = ({ blog, blogBeingEdited, updateTitle, updateBody, saveBlog }) =>
    <form>
        <input key="1" value={blogBeingEdited.title} onChange={(event) => updateTitle(blogBeingEdited, event.target.value)} />
        <input key="2" value={blogBeingEdited.body} onChange={(event) => updateBody(blogBeingEdited, event.target.value) } />
        <button key="3" onClick={() => saveBlog(blogBeingEdited) }>Save</button>
    </form>

let BlogRow = ({ blog, blogBeingEdited, removeBlog, editBlog, updateTitle, updateBody, saveBlog }) =>
    <div className='blog-row'>
        <h1>{blog.title}</h1>
        <p>{blog.body}</p>
        <DeleteBlogButton blog={blog} removeBlog={removeBlog} />
        <EditBlogButton blog={blog} editBlog={editBlog} />
        {
            blogBeingEdited && blog.id === blogBeingEdited.id &&
                <EditBlogForm
                    blog={blog}
                    blogBeingEdited={blogBeingEdited}
                    updateTitle={updateTitle}
                    updateBody={updateBody}
                    saveBlog={saveBlog}
                />
        }
    </div>

let BlogList = ({
    blogs,
    blogBeingEdited,
    removeBlog,
    editBlog,
    updateTitle,
    updateBody,
    saveBlog
}) =>
    <div className="blog-list">
        {
            blogs.map(blog => <BlogRow key={blog.id} blog={blog} blogBeingEdited={blogBeingEdited} removeBlog={removeBlog} editBlog={editBlog} updateTitle={updateTitle} updateBody={updateBody} saveBlog={saveBlog} />)
        }
    </div>

class BlogListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            blogBeingEdited: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(blogs => {
                this.setState({ blogs })
            })
    }

    render() {
        // let blogs = this.state.blogs;
        // let blogBeingEdited = this.state.blogBeingEdited;
        let { blogs, blogBeingEdited } = this.state;

        let removeBlog = (blogToDelete) => {
            let { id } = blogToDelete;
            let prunedBlogs = this.state.blogs.filter((blog) => id !== blog.id);
            this.setState({
                blogs: prunedBlogs
            });
        };

        let editBlog = (blogToEdit) => {
            this.setState({
                blogBeingEdited: Object.assign({}, blogToEdit)
            });
        };

        let updateTitle = (blogToEdit, title) => {
            this.setState({
                blogBeingEdited: Object.assign({}, blogToEdit, { title })
            });
        };

        let updateBody = (blogToEdit, body) => {
            this.setState({
                blogBeingEdited: Object.assign({}, blogToEdit, { body })
            });
        };

        let saveBlog = (blogToEdit) => {
            let blogs = this.state.blogs.slice();
            let blog = blogs.find(blog => blog.id === blogToEdit.id);
            Object.assign(blog, blogToEdit);
            this.setState({
                blogs,
                blogBeingEdited: null
            });
        };

        let refresh = () => {
            this.fetchData();
        }

        return (
            <div>
                <Title />
                <Greeting person="Joel" />
                <button className="big-red" onClick={refresh}>Refresh</button>
                <BlogList
                    blogs={blogs}
                    blogBeingEdited={blogBeingEdited}
                    removeBlog={removeBlog}
                    editBlog={editBlog}
                    updateTitle={updateTitle}
                    updateBody={updateBody}
                    saveBlog={saveBlog}
                />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<BlogListPage />, root);


