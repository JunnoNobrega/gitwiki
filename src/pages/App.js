import { useState } from 'react'
import gitLogo from '../assets/github-mark-white.png'
import Input from '../components/Input' 
import Button from '../components/Button' 
import ItemRepo from '../components/ItemRepo'
import {api} from '../services/api'

import {Container} from './styles'

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () =>{
    if(currentRepo === ""){
      alert("Preencha os campos de busca.")
      return;
    }

    try {
          const {data} = await api.get(`repos/${currentRepo}`)
          if(data.id){
            
            const isExist = repos.find(repo => repo.id === data.id);

            if(!isExist){
              setRepos(prev => [...prev, data])
              setCurrentRepo('')
              return
              
            }
            alert("Repositório já existe! ")
          }
          
        } catch (error) {
        console.log(error)
        alert("Repositório não encontrado!")
        return
    }
  }
  const handleRemoveRepo = async (id) => {
    console.log("Removento ", id)
    const removeItem = repos.filter(repo => repo.id !== id)
    setRepos(removeItem)


  }


  return (
    <Container className="App">
      
        <img src={gitLogo} width={72} height={72} alt='Logo Github'/>
        <Input value={currentRepo} onChange={(e) =>setCurrentRepo(e.target.value)}/>
        <Button onClick={handleSearchRepo}/>
        {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo = {repo}/>)}
        
    </Container>
  );
}

export default App;
