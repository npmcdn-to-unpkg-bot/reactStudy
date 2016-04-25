/**
 *注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头
 * 1. React.createClass() 来创建一个新的 React 组件.
 *    render 方法返回Reac组件树，这里的<div>不是真正的DOM节点，是React的div组件的实例。
 *    可以理解这些标签是标记或者数据，（这是数据虚拟DOM？）
 * 2. ReactDOM.render() 实例化根组件，启动框架，把标记注入到第二个参数指定的原生的 DOM 元素中
 * 3. 自定义事件 CommentSubmit  添加监听事件是使用 onCommentSubmit=callback.
 * 
 */
// 基于jsx的语法
var CommentBox = React.createClass({
    //getInitialState() 在组件的生命周期中仅执行一次，用于设置组件的初始化 state 。
    getInitialState:function () {
        return {comments:[]}
    },
    handleCommentSubmit:function (comment) {
        var comments  = this.state.comments;
        comments.push(comment);
        this.setState({comments:comments}); 
    },
    //componentDidMount 是一个组件渲染的时候被 React 自动调用的方法
    componentDidMount:function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({comments: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (<div className="commentBox">
            <h1>Comments</h1>
            <CommentList list={this.state.comments} />
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
/**
 *  1.React 使用驼峰命名规范的方式给组件绑定事件处理器。我们给表单绑定一个onSubmit处理器.
 *  2. ref 属性给子组件命名，通过 this.refs 引用 DOM 节点。i.e: ref="author"
 *  
 */
var CommentForm = React.createClass({
    handleSubmit:function (e) {
        e.preventDefault();
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if(!author || !text){
            return;
        }
        this.props.onCommentSubmit({author:author,text:text});
        this.refs.author.value = "";
        this.refs.text.value = "";
    },
    render: function () {
        return ( 
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="提交" />
            </form>
        );
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