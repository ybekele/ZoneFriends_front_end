import React, { Component } from 'react';
import { CardImg, CardSubtitle, CustomInput, InputGroup, InputGroupAddon, Input, Form, FormGroup, Collapse, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Post from './Post'
<<<<<<< HEAD
import Markdown from 'markdown-to-jsx';
=======
import FileBase64 from 'react-file-base64';
>>>>>>> master

//var host_url = 'http://127.0.0.1:8000';
var host_url = 'https://project-cmput404.herokuapp.com';
var post_url = host_url+'/api/author/posts/';
var user_url = host_url+'/api/authors/';
var getposts_url = host_url+'/api/author/posts/'; 

var global_state = null;
class Homepage extends Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.get_posts = this.get_posts.bind(this);
<<<<<<< HEAD
        this.get_events = this.getGithubEvent.bind(this);
        this.state = { collapse: false, posts: [] };
        // this.get_posts();
=======
        this.state = { collapse: false, posts:[],files: [] };
>>>>>>> master
    }

     
    global_state = this.props.author_state; 

    render_post(i){
        if (this.state.posts.length == 0 || i > this.state.posts.length-1){
            return <div></div>
        } else{
            return (
                <div className = 'cardstyle'>
                    <Post id='cardstyle' author_state={this.props.author_state} value={this.state.posts[i]}/>
                </div>
            )
            
        }
    }
    componentDidMount(){
        this.get_posts()
    }
    
    getFiles(files){
        this.setState({ files: files })
    }
    

    send_post(){
        
        
        var data = {
            "permission": document.getElementById("exampleCustomSelect").value,
            "content": document.getElementById("contentText").value,
            "contentType": document.getElementById("textType").value,
            "title": document.getElementById("titleText").value,
            "images":null,
            "contentType":document.getElementById("textType").value
          };
        
        if (this.state.files){
            console.log(this.state.files)
            data['images']=this.state.files
        }
        console.log(data);
        console.log("this is the token " + this.props.author_state.token);
        console.log("this is the username " + this.props.author_state.username);
        console.log("this is the props author state " + this.props.author_state);
        console.log("this is the props " + this.props);
        fetch(post_url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'token '+this.props.author_state.token,
        }
        })
        .then(res => res.json())
        .then(response => {
        console.log('Success:', JSON.stringify(response));
        if (response.hasOwnProperty("success")){
<<<<<<< HEAD
            
            console.log(response);
=======
>>>>>>> master
            this.get_posts()
        }
    
        })
        .catch(error => console.error('Error:', error));
    }

    get_posts() {
        console.log("in get posts " + this.props.author_state.token); 
    
        fetch(getposts_url, {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'token ' + this.props.author_state.token,
            }
        })
        .then(res => res.json())
        .then(response => {
            if(response.hasOwnProperty("posts")){
                this.setState({posts: response['posts']});
            }
        })
        .catch(error => console.error('Error:', error));
    }
    
    get_events(){
        console.log('this is using author state' + this.props.author_state.token);
        console.log('this is using global state ' + global_state);
        console.log('this is using global state name ' + global_state.username);
        console.log("asfasfsfdfasfsfs");
        console.log('this is the state ' + this.props.author_state);
        console.log('this is the author ' + this.props.author_state.username);
        // Nested function that gets github of user
        var name = this.props.author_state.username;
        var user_token = this.props.author_state.token; 
        console.log('in get events global state' + global_state.username);
            function get_git(global_state) {
                fetch(user_url+'/'+global_state.username+'/', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + global_state.token,
                    'username': global_state.username, 
                }
                })
                .then(res => res.json())
                .then(response => {
                console.log('Success:', JSON.stringify(response));
                if (response.hasOwnProperty("githubUrl")){
                    //this.setState({login:true, githubUrl: response["githubUrl"]});
                    console.log(global_state.token);
                    author_git = response["githubUrl"];
                } else{
                    document.getElementById('alert').innerHTML = JSON.stringify(response);
                    console.log("couldn't find git for" + global_state.username)
                    author_git = null; 
                }
            
                })
                .catch(error => console.error('Error:', error));
                return author_git
            }
  
      var author_git = get_git(); 
      if (author_git === false) { 
        console.log("couldn't pass author's git");
        return; 
      }
  
      else {
        fetch('https://api.github.com/users/' + author_git + '/events', {
        method: 'GET', // or 'PUT'
        headers:{
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
      })
      .catch(error => console.error('Error:', error));
  
      } 
  }
    
    getGithubEvent(){
        fetch('https://api.github.com/users/abramhindle/events', {
        method: 'GET', // or 'PUT'
        headers:{
          'Content-Type': 'application/json',
        }
        })
        .then(res => res.json())
        .then(response => {
        console.log(response);
        for (var i = 0; i< 10; i++){
            this.state.posts.push({
                "postid": "",
                "publicationDate": "",
                "title": "Github Event",
                "source": "",
                "origin": "",
                "contentType": "",
                "author": {
                  "url": "",
                  "pk": "",
                  "firstName": null,
                  "lastName": "",
                  "userName": response[i].actor.login,
                  "hostName": "",
                  "githubUrl": ""
                },
                "content": response[i].type + " on url: "+response[i].repo.url,
                "permission": "",
                "categories": [],
                "unlisted": false,
                "visibleTo": []
            }) 
        };
        this.setState({});
        console.log(this.state.posts);
        })
      . catch(error => console.error('Error:', error));
    }


    toggle() {
        window.scrollTo(0, 0);
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render(){
        if(this.state.posts.length > 0){
            console.log("im here")
            console.log(this.state.posts)
            var posts= this.state.posts.map(post =>{
            return(
                <Col sm="6">
                    <Post id='cardstyle' value={post}/>
                </Col>
            )})
        }
        else{
            var posts="NO POSTS";
        }
        return(
            <center>
                <Button id='post' size='sm' color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Make Post!</Button>
               
                
                <Col sm="9">
                    <Collapse isOpen={this.state.collapse}>
                    <Form className="postForm">
                        <FormGroup>
                                <FileBase64 multiple={ true } onDone={ this.getFiles.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                                <option value="">Who can view?</option>
                                <option value="M">Me only</option>
                                <option value="L">Another author</option>
                                <option value="F">My friends</option>
                                <option value="FF">Friends of friends</option>
                                <option value="FH">Only friends on my host</option>
                                <option value="P">Public</option>
                            </CustomInput>
                            <CustomInput type="select" id="textType" name="customSelect">
                                <option value="">Type of Post?</option>
                                <option value="text/plain">Simple Plain Text</option>
                                <option value="text/markdown">Markdown</option>
                                <option value="application/base64">application/base64</option>
                                <option value="image/png;base64">image/png;base64</option>
                                <option value="image/jpeg;base64">image/jpeg;base64</option>
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                        <CustomInput type="select" id="textType" name="customSelect">
                                <option value="">What Type of Text?</option>
                                <option value="text/plain">Simple Plain Text</option>
                                <option value="text/markdown">Markdown</option>
                            </CustomInput>

                        </FormGroup>
                        
                        <FormGroup>
                            <Input type="textarea" name="text" id="titleText" placeholder="What's your title?" />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <Input type="textarea" name="text" id="contentText" placeholder="Tell us something!" />
                                <InputGroupAddon addonType="append">
                                <Button color="secondary" onClick={()=> {this.send_post();}}>Post!</Button>
                                </InputGroupAddon>
                            </InputGroup> 
                        </FormGroup>
                    </Form>
                    
                    </Collapse>

<<<<<<< HEAD
                    <h4>Your available posts:</h4>
                    
                    <Button id='get_posts' size='sm' color="primary" onClick={this.get_posts} style={{ marginBottom: '1rem' }}>Get Posts</Button>
                    <Button id='get_stream' size='sm' color="primary" onClick={this.get_events} style={{ marginBottom: '1rem' }}>Get Git Events</Button>
                    <Col sm="6">
                        <div>
                            {this.render_post(0)}
                            {this.render_post(1)}
                            {this.render_post(2)}
                            {this.render_post(3)}
                            {this.render_post(4)}
                            {this.render_post(5)}
                            {this.render_post(6)}
                            {this.render_post(7)}
                            {this.render_post(8)}
                            {this.render_post(9)}
                        </div>
                        
                    </Col>
=======
                    <h4>Your Stream:</h4>
                    
                    {posts}
>>>>>>> master
                    
                </Col>
            </center>
            
        );
        
    }
}

export default Homepage;
