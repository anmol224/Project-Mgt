import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Header from "./Components/Header";

import Home from "./pages/Home"
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
const {ApolloClient,InMemoryCache,ApolloProvider} =require('@apollo/client')
const client=new ApolloClient({
  uri:"http://localhost:5000/graphql",
  cache:new InMemoryCache()
})


function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Router>
    <Header/>
    
    <div className="container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<NotFound/>} />
        <Route path="/projects/:id"  element={<Project/>}/>
      </Routes>
      
    </div>
    </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
