document.addEventListener('DOMContentLoaded', ()=> {
    updatePosts();
})

function updatePosts() {
    fetch("http://192.168.1.11:3000/api/all").then(res=>{
      return res.json()
    }).then(json => {
        let postElements = '';
        let posts = JSON.parse(json);
        posts.forEach((post)=> {
            let postElement = `<div id=${post.id} class="card mb-4">
            <div class="card-header">
                <h3 class="card-title mt-">${post.title}</h3>
            </div>
            <div class="card-body">
                <div class="card-text">${post.description}</div><br>
            </div>
        </div>
            <div class="card-footer">
                <span class="id"> ID Post: ${post.id}</span>
            </div>
            </div>`;
        postElements += postElement;
        })

        document.getElementById("posts").innerHTML = postElements;
    })
}

function newPost(){
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    if(title === "" || description === "") {
        document.body.innerHTML += `
        <div class="topo">
                <div class="alert alert-danger alert dismissible fade show id="error">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    <strong>O campo do ID não pode estar vazio! 
                </div>
            </div>`;
    } else {

    let post = {title, description};

    const options = {method: "POST",
        headers: new Headers({ 'content-type' : 'application/json' }),
        body: JSON.stringify(post)
    }

    fetch("http://192.168.1.11:3000/api/new", options).then(res => {
        console.log(res);
        updatePosts();
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("del").value = "";
        })
    }
    
}

function deletePost() {
    let id = document.getElementById("del").value;

    if(id === "") {
        document.body.innerHTML += `
        <div class="topo">
            <div class="alert alert-danger alert dismissible fade show id="error">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>O campo do ID não pode estar vazio! 
            </div>
        </div>`;
    } else {
        let myDelets = {
            id
        }

        let options = {
            method: "DELETE",
            headers: new Headers({
                "content-type": "application/json"
            }),
            body: JSON.stringify(myDelets)
        }
        fetch("http://192.168.1.11:3000/api/deletePost", options).then(res =>{
            console.log(res)
            document.getElementById("del").value = "";
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
                updatePosts();
        })
    }
}