/**
 *注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头
 * 1. React.createClass() 来创建一个新的 React 组件.
 *    render 方法返回Reac组件树，这里的<div>不是真正的DOM节点，是React的div组件的实例。
 *    可以理解这些标签是标记或者数据，（这是数据虚拟DOM？）
 * 2. ReactDOM.render() 实例化根组件，启动框架，把标记注入到第二个参数指定的原生的 DOM 元素中
 */
// 基于jsx的语法
var CommentBox = React.createClass({
    
    render: function () {
        return (<div className="commentBox">
            <h1>Comments</h1>
            <CommentList list={this.props.comments} />
            <CommentForm/>
        </div>);
    }
})

/* 转换为纯js语法

 var CommentBox = React.createClass({displayName: 'CommentBox',
 render: function() {
 return (
 React.createElement('div', {className: "commentBox"},
 "Hello, world! I am a CommentBox."
 )
 );
 }
 });
 ReactDOM.render(
 React.createElement(CommentBox, null),
 document.getElementById('content')
 );*/

var CommentList = React.createClass({
    render: function () {
        console.log(this.props.list);
        var commentNodes = this.props.list.map(function (item) {
            return(
                <Comment author={item.author}>
                    {item.text}
                </Comment>
            )
        })
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
})

var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                {this.props.children.toString()}
            </div>
        )
    }
})

var CommentForm = React.createClass({
    render: function () {
        return (<div className="commentForm">
            Hello, world! I am a CommentForm.
        </div>);
    }
});

var data = [
    {author: "wahaha", text: "This is a comment from wahaha"},
    {author: "neo", text: "This is another comment from neo"}
];

ReactDOM.render(
    <CommentBox url="/api/comments" />, 
    document.getElementById('content')
);