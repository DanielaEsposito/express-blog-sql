const connection=require("../db/confDb")





//index
function index(req, res) {
    const sql= 'SELECT * FROM posts'
    connection.query(sql,(err, results)=>{
        if (err)return res.status(500).json ({
            error:'Database query failed'
            
        })
        res.json(results);
        console.log(res);
    })


    }
//show
function show (req,res){
    
 
 
const id = parseInt(req.params.id);
 const sql ="SELECT * FROM `posts` WHERE `id` = ? ";
 connection.query(sql,[id],(err, results)=>{
     if(err){
        console.log(err);
        return res.tatus(500).json({
        error: "Database queri failed"})  ;     
     }
     if(results.lenght === 0){
        return res.status(404).json({error: "post not found"});
     }

     res.json(results[0]);
 })
;




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
   const sql= "DELETE FROM `posts` WHERE `id`=? "
   connection.query(sql,[id],(err)=>{
    if(err){
        console.log(err);
        return res.tatus(500).json({
        error: "Database queri failed"})  ;     
     };
     res.status(204)
   })

}
module.exports ={index, show, create, modify, update, destroy};