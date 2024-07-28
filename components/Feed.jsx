'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"
import { useSession } from "next-auth/react";

const PromptioCardList = ({data,  handleTagClick}) =>{
 
  //  console.log(data)
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
 

const Feed = () => {

 const {data: session} = useSession();

 const [searchTimeout, setSearchTimeout] = useState(null);
 const [searchedResults, setSearchedResults] = useState([]);
 const [searchText, setSearchText] = useState("");
 const [posts, setPosts] = useState([]);
  
console.log(session?.user.id)

 const fetchPosts = async()=>{
  // ------all------
  const response = await fetch("/api/prompt");
// -----specific user--------
// const response = await fetch(`/api/user/${session?.user.id}/posts`);
  const data = await response.json();
  console.log(data)
  
  setPosts(data);

}

 useEffect(()=>{
 
  if(session?.user.id){
    fetchPosts();
  }
 
 }, [])
 
 const filterPrompts = (searchtextword)=>{
  // make word in case senstive
  const regex = new RegExp(searchtextword, "i");
   return posts.filter((item)=>
    regex.test(item.creator.username) ||
   regex.test(item.tag) ||
   regex.test(item.prompt)

  )

}

 const handleSearchChange = (e) =>{
  clearTimeout(searchTimeout);
  setSearchText(e.target.value);

  // debounce method
  setSearchTimeout(
    setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
      console.log(searchedResults)
    }, 500)
  );

 }

  return (
     <section className="feed">
     {/* <p className="text-gray-500 font-satoshi font-semibold">Hello! {session?.user.name}</p> */}
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>


 { searchText?
  ( <PromptioCardList  
          // data={posts}
          data={searchedResults}
          handleTagClick={()=>{}}
         />)
  :(<p className="text-gray-500 font-satoshi font-semibold">Hello! {session?.user.name}, get get your required posts</p> )

 }
       
     </section>
  )
}

export default Feed
