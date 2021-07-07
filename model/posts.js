module.exports = {
    posts: [
        {
            id: "abcde4DF",
            title: "Campeonato de League of Legends",
            description: "Campeonato será realizado na sala de informática, no prédio 03, na sala 502"
        },
    ],

    getAll(){
        return this.posts;
    },

    newPost(title, description){
        this.posts.push({id: generateID(), title, description});
    },

    deletePost(id) {
        this.posts.forEach((item, i) => {
            if (item.id == id) {
                this.posts.splice(i, 1)
            }
            console.log(this.posts);
        })
    }
}

let generateID = () => {
    return Math.random().toString(36).substring(2,9);
}