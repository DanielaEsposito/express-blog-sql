const connection=require("../db/confDb")





//index
function index(req, res) {
    const sql= 'SELECT * FROM posts'
    connection.query(sql,(err, results)=>{
        if (err)return res.status(500).json ({
            error:'Database query failed'
            
        })
        res.json(results);
        console.log(results);
    })


    }
//show
function show (req,res){
    
 //pippo.get();
 
  const id = parseInt(req.params.id);
  const post= postsData.find((post)=> post.id === id);
   // errore di prova
   //const post = Data.find(post=> post.title === title);
   if(!post){
    const err = new Error("id post not found");
    err.code = 404;
    throw err;
    }
//console.log(post);
;

res.json(post);



}
// create

function create (req,res){
    
    const {title, img , content, tags,category,published} = req.body;
    const id = postsData.at(-1).id + 1;
    console.log(req.body);
    
    if(
        !title || 
        !img  || 
        !content ||
        // controllo prima se il dato che arriva è un array 
        !tags?.length
     ){
    
        return res.status(400).json({error: "not valid"});
        }

    const newPost={ id, title, content , img , tags, category, published }

    postsData.push(newPost);
    res.json(newPost);
    console.log(newPost);
    
    

}
// update

function update(req,res){
   //cerco la pizza da modificare
const id = parseInt(req.params.id);
let post =postsData.find((post)=> post.id === id);
//controllo errore
if (!post){
    return res.status(404).json({error: "not found"});
}
//recupero i nuovi parametri
const {title, img, tags, content} =req.body;
// if(!title || !img || !contenuto || !tags?.length ){
//     return res.status(400).json({error: "not valid"});
// }
//aggiorno il post
post.title = title,
post.img = img,
post.contenuto = content,
post.tags =tags

res.json(post)

}

//modify
function modify (req,res){
    
    const id = parseInt(req.params.id);
    const post = postsData.find((post)=> post.id === id);
    const {title, contenuto, img, tags}= req.body;
    if(title){
        post.title=title
    }
    if(contenuto){
        post.contenuto=contenuto
    }
    if(img){
        post.img=img
    }
    if(tags?.lenght){
        post.tags=tags
    }
    res.json(post);

}

// destroy

function destroy(req,res){
   const id = parseInt(req.params.id);
   const post = postsData.find(post=> post.id === id);
   if(!post){
    return res.status(404).json({
        error: "not found...you can't delete!!"
    });
   } 
   const postIndex= postsData.indexOf(post);;
   postsData.splice(postIndex, 1);
   res.send(postsData);
   console.log(postsData);
   

}
module.exports ={index, show, create, modify, update, destroy};