const root = document.querySelector('.react-root');
const h = React.createElement;
// h requires component or function and the data being passed in

let Greeting = ({ person }) => h('h1', { className: 'greeting' }, `${person}`);
let Title = () => h('h4', null, 'React');
let Footer = () => h('footer', null, 'Copyright 2018');

let allBlogs = [
    { id: '1', title: "Hello World", body: "Lora Ipsum", isBeingEdited: false },
    { id: '2', title: "Goodbye World", body: "More Stuff", isBeingEdited: false },
];

let removeBlog = (blogToDelete) => {
    let { id } = blogToDelete;
    allBlogs = allBlogs.filter((blog) => id !== blog.id);
    console.log('I would like to delete ' + id);
    update();
};

let editBlog = (blogToEdit) => {
    let blog = allBlogs.find(blog => blog.id === blogToEdit.id);
    blog.isBeingEdited = !blog.isBeingEdited;
    console.log('I would like to edit ' + blogToEdit.id);
    update();
};

// let addTitle = (blotToAdd) => {
//     let blog = allBlogs
// }

let updateTitle = (blogToEdit, title) => {
    let blog = allBlogs.find(blog => blog.id === blogToEdit.id);
    blog.title = title;
    console.log('I would like to edit ' + blogToEdit.id);
    update();
};

let updateBody = (blogToEdit, body) => {
    let blog = allBlogs.find(blog => blog.id === blogToEdit.id);
    blog.body = body;
    console.log('I would like to edit ' + blogToEdit.id);
    update();
};

let DeleteBlogButton = (blog) =>
    h('button', { 
        className: 'big-red',
        onClick: () => removeBlog(blog)
    }, 'Remove Blog');

let EditBlogButton = (blog) =>
    h('button', { 
        className: 'big-red',
        onClick: () => editBlog(blog)
    }, 'Edit Blog');

let AddBlogButton = (blog) =>
    h('button', { 
        className: 'big-red',
        onClick: () => addBlog(blog)
    }, 'Add Blog');

let EditBlogForm = (blog) =>
    h('form', null, [
        h('input', { value: blog.title, onChange: (event) => updateTitle(blog, event.target.value) }),
        h('input', { value: blog.body, onChange: (event) => updateBody(blog, event.target.value) }),
    ]);

// let AddBlogForm = (blog) =>
//     h('form', null, [
//         h('input', { value: blog.title }),
//         h('input', { value: blog.body }),
//     ])

let BlogRow = (blog) => 
    h('div', null, [
        h('h6', null, blog.title),
        h(DeleteBlogButton, blog),
        h(EditBlogButton, blog),
        h(AddBlogButton, blog),
        blog.isBeingEdited && h(EditBlogForm, blog),
        h('p', null, blog.body),
    ]);
// ReactDOM.render(h(BlogRow, allBlogs[0]), root);

let BlogList = ({ blogs }) => 
    h('div', { className: 'blog-list' },
        allBlogs.map(blog => h(BlogRow, blog))
    );
// ReactDOM.render(h(BlogList, BlogRow), root);

let Page = ( { blogs }) => h('div', null, [
    Title(),
    h(Greeting, { person: 'Joel' }, []),
    h(BlogList, { blogs }),
    h(Footer),
]);
// ReactDOM.render(h(Page, { blogs: allBlogs }, []), root);

let update = () => {
    ReactDOM.render(h(Page, { blogs: allBlogs }, []), root);
}
update();