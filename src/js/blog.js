const blogs = $('.blog_container');
const init = async (category) => {
    try {
        const response = await fetch(
            `https://techmaster.vn/v1/posts?category=${category}&limit=6`
        );
        const data = await response.json();
        data.forEach((blog) => {
            const blogElement = `
                <div class="blog">
                <a
                href="https://techmaster.vn/posts/${blog.Id}/${blog.Slug}"
                >
                <div class="thumbnail">
                    <img
                    src="${blog.Thumbnail}"
                    alt="${blog.Title}"
                    onerror="this.onerror=null;this.src='/'"
                    />
                </div>
                <div class="content">
                    <div class="title">
                        ${blog.Title}
                    </div>
                    <div class="summary">
                    ${blog.Description}
                    </div>
                </div>
                </a>
            </div>
            `;
            blogs.append(blogElement);
        });
    } catch (error) {
        console.log(error);
    }
};

init('557');