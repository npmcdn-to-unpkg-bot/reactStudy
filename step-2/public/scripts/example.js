//注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头
var CommentBox = React.createClass({
    render: function () {
        return (<div className="commentBox">
            Hello,World! I am CommentBox.
        </div>);
    }
})
React.render(<CommentBox />, document.getElementById('content'));
